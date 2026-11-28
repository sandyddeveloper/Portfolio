"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import BackgroundCubesGridSection from "@/components/LoadingBackground";
import { MainPage } from "@/components/MainPage";
import ElectricLogo from "@/components/ElectricLogo";
import AudioAlertBox from "@/components/AudioAlertBox";
import { ThemeProvider } from "@/context/ThemeContext";
import {
  playElectricHum,
  playLightningFlashSound,
  unlockAudio,
  setSoundEnabled,
} from "@/lib/soundEffects";

type AppState =
  | "LOADING"         // 0% -> 100% -> WELCOME (3s + 600ms)
  | "EXPANDING"       // Button physically expands in pill shape to full screen (850ms)
  | "ELECTRIC_INTRO"  // Fullscreen ElectricLogo charges up with electric sound (3000ms)
  | "FLASH"           // Intense lightning flash with thunder crack sound (280ms)
  | "BLACKOUT"        // Sudden blackout stillness (350ms)
  | "MAIN";           // Clean minimalist main page reveals

export default function Home() {
  // Starts directly on the Loading screen, but loader waits until user gives sound choice
  const [appState, setAppState] = useState<AppState>("LOADING");
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(true);
  const [showAlertBox, setShowAlertBox] = useState<boolean>(true);
  const [loaderStarted, setLoaderStarted] = useState<boolean>(false);

  // Preload all hero, about, and project images silently during the intro sequence
  // so MainPage renders instantaneously with zero image pop-in
  useEffect(() => {
    const assetsToPreload = [
      "/santhosh_hero.png",
      "/about/backend.jpg",
      "/about/developer.jpg",
      "/about/workspace.jpg",
      "/projects/fintech.jpg",
      "/projects/cloud-infra.jpg",
      "/projects/ai-agent.jpg",
    ];
    assetsToPreload.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  // Handle user choice from top alert box (SOUND ON or MUTE)
  const handleAlertChoice = (enabled: boolean) => {
    setShowAlertBox(false);
    setSoundEnabledState(enabled);
    setSoundEnabled(enabled);
    if (enabled) {
      unlockAudio();
    }
    // Start the loader now that user gave sound choice
    setLoaderStarted(true);
  };

  // If user directly clicks the loading button before answering alert box
  const handleUserDirectStart = () => {
    setShowAlertBox(false);
    setLoaderStarted(true);
  };

  // Toggle sound anytime from top-bar controls
  const handleToggleSound = () => {
    setSoundEnabledState((prev) => {
      const next = !prev;
      setSoundEnabled(next);
      if (next) {
        unlockAudio();
      }
      return next;
    });
  };

  // Step 1: When WELCOME finishes, trigger the button expansion
  const handleIntroComplete = () => {
    setShowAlertBox(false);
    setAppState("EXPANDING");
  };

  // Step 2: After button expands (850ms) -> show Fullscreen ElectricLogo
  useEffect(() => {
    if (appState !== "EXPANDING") return;

    const timer = setTimeout(() => {
      setAppState("ELECTRIC_INTRO");
    }, 850);

    return () => clearTimeout(timer);
  }, [appState]);

  // Step 3: ElectricLogo charges up with electric sound for 3.0 seconds -> then trigger flash
  useEffect(() => {
    if (appState !== "ELECTRIC_INTRO") return;

    // Start authentic high-voltage electric humming & crackling sound (if enabled)
    const stopHum = playElectricHum(3.0);

    const timer = setTimeout(() => {
      setAppState("FLASH");
    }, 3000);

    return () => {
      stopHum();
      clearTimeout(timer);
    };
  }, [appState]);

  // Step 4: Flash with explosive lightning crack & thunder boom (280ms) -> sudden blackout
  useEffect(() => {
    if (appState !== "FLASH") return;

    // Trigger explosive lightning crack & thunder boom (if enabled)
    playLightningFlashSound();

    const timer = setTimeout(() => {
      setAppState("BLACKOUT");
    }, 320);

    return () => clearTimeout(timer);
  }, [appState]);

  // Step 5: Blackout lasts 350ms -> reveals clean main page
  useEffect(() => {
    if (appState !== "BLACKOUT") return;

    const timer = setTimeout(() => {
      setAppState("MAIN");
    }, 350);

    return () => clearTimeout(timer);
  }, [appState]);

  const handleReplayIntro = () => {
    setShowAlertBox(false);
    setLoaderStarted(true);
    setAppState("LOADING");
  };

  return (
    <div className="relative min-h-screen w-full bg-[#000000] overflow-x-clip">
      {/* Top alert box asking for sound choice using loading screen theme */}
      <AnimatePresence>
        {showAlertBox && appState === "LOADING" && (
          <AudioAlertBox onSelect={handleAlertChoice} />
        )}
      </AnimatePresence>

      {/* 1. Intro Preloader Stage */}
      {appState === "LOADING" && (
        <div className="relative z-10 w-full min-h-screen">
          <BackgroundCubesGridSection
            onIntroComplete={handleIntroComplete}
            isExpanding={false}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            autoStart={loaderStarted}
            onUserStart={handleUserDirectStart}
          />
        </div>
      )}

      {/* 2. Seamless Dimensional Button Expansion (Morphs button from 250x48 to Fullscreen) */}
      {appState === "EXPANDING" && (
        <div className="relative z-10 w-full min-h-screen">
          <BackgroundCubesGridSection
            isExpanding={true}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
          />

          {/* Expanding Button Portal: stays STRICTLY in the button's rounded-full pill shape */}
          <motion.div
            key="expanding-button-portal"
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none w-[250px] h-[48px] rounded-full bg-[#000000] border border-violet-500/80 shadow-[0_0_35px_rgba(139,92,246,0.8)] flex items-center justify-center overflow-hidden will-change-transform"
            initial={{
              scale: 1,
            }}
            animate={{
              scale: 75,
            }}
            transition={{
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1], // Smooth organic ease-in-out
            }}
          >
            {/* WELCOME text inside the pill dissolves as the pill swells */}
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 1.15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="font-mono text-[20px] tracking-wider text-white whitespace-nowrap flex items-center"
            >
              WELCOME
              <span className="inline-block w-[7.5px] h-[15px] bg-white ml-1.5 align-middle" />
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* 3. Enhanced ElectricLogo Fullscreen Showcase on Pure Black Background */}
      {appState === "ELECTRIC_INTRO" && (
        <motion.div
          key="electric-intro-stage"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            x: [0, -1, 1.5, -2, 2.5, -1.5, 1, 0],
            y: [0, 1, -1.5, 2, -1.5, 2, -0.5, 0],
          }}
          transition={{
            opacity: { duration: 0.4 },
            x: { delay: 2.1, duration: 0.9, ease: "linear" },
            y: { delay: 2.1, duration: 0.9, ease: "linear" },
          }}
          className="fixed inset-0 w-screen h-screen z-40 bg-[#000000] border-none outline-none select-none overflow-hidden"
        >
          {/* Pulsing ambient high-voltage plasma field behind the logo */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(99, 102, 241, 0.1) 45%, transparent 70%)",
            }}
            animate={{
              scale: [0.92, 1.18, 0.96, 1.25, 1.05],
              opacity: [0.45, 0.85, 0.6, 0.95, 0.7],
            }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          />

          {/* ElectricLogo WebGL Shader with maximum electrical intensity and crackling arcs */}
          <ElectricLogo
            color="#ffffff"
            glowColor="#a855f7"
            scale={0.52}
            intensity={2.6}
            glow={2.0}
            thickness={1.6}
            arcs={10}
            crackle={2.2}
            flicker={0.7}
            theme="dark"
            interactive={true}
            className="w-full h-full absolute inset-0 border-none outline-none"
          />
        </motion.div>
      )}

      {/* 4. Multi-Strobe Photorealistic Lightning Flash with Supersonic Shockwave */}
      {appState === "FLASH" && (
        <motion.div
          key="lightning-flash"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.45, 1, 0.6, 0] }}
          transition={{
            duration: 0.32,
            times: [0, 0.08, 0.28, 0.48, 0.75, 1],
            ease: "easeInOut",
          }}
          className="fixed inset-0 z-50 pointer-events-none bg-white flex items-center justify-center overflow-hidden"
        >
          {/* Core White-Hot Energy with Violet Aura */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(220,195,255,0.9) 45%, rgba(147,51,234,0.7) 100%)",
            }}
          />

          {/* Supersonic Shockwave Ring of Light radiating from center */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white pointer-events-none"
            style={{
              boxShadow:
                "0 0 90px 30px rgba(168, 85, 247, 0.95), inset 0 0 60px rgba(255, 255, 255, 0.9)",
            }}
            initial={{ width: 40, height: 40, opacity: 1 }}
            animate={{ width: "190vmax", height: "190vmax", opacity: 0 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
          />
        </motion.div>
      )}

      {/* 5. Total Pitch-Black Blackout */}
      {appState === "BLACKOUT" && (
        <div
          key="pitch-blackout"
          className="fixed inset-0 z-50 pointer-events-none bg-[#000000]"
        />
      )}

      {/* 6. Clean Minimalist Main Page Reveal with GlowCursor */}
      <AnimatePresence mode="wait">
        {appState === "MAIN" && (
          <motion.div
            key="main-portfolio-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-20 w-full min-h-screen"
          >
            <ThemeProvider>
              <MainPage
                onReplayIntro={handleReplayIntro}
                soundEnabled={soundEnabled}
                onToggleSound={handleToggleSound}
              />
            </ThemeProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

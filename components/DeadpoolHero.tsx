"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Play, ChevronRight, X } from "lucide-react";

interface DeadpoolHeroProps {
  onBookNow?: () => void;
  onExplore?: () => void;
}

export function DeadpoolHero({ onBookNow, onExplore }: DeadpoolHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [avatarMode, setAvatarMode] = useState<"3d" | "photo">("3d");

  // Smooth mouse parallax physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Multilayer parallax transforms
  const bgCircleX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const bgCircleY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  const textX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const textY = useTransform(smoothY, [-0.5, 0.5], [-6, 6]);

  const characterX = useTransform(smoothX, [-0.5, 0.5], [24, -24]);
  const characterY = useTransform(smoothY, [-0.5, 0.5], [14, -14]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const PORTFOLIO_ROLES = [
    {
      title: "BACKEND DEVELOPER",
      detail: "FastAPI • Node.js • PostgreSQL",
    },
    {
      title: "PYTHON DEVELOPER",
      detail: "Django • Pipelines • Async IO",
    },
    {
      title: "FULL STACK CODER",
      detail: "Next.js • React • TypeScript",
    },
    {
      title: "SOFTWARE ENGINEER",
      detail: "System Design • Docker • Cloud",
    },
  ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[92vh] sm:min-h-screen bg-[#060608] text-white overflow-hidden flex flex-col justify-between select-none pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 px-3 sm:px-8"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 45%, rgba(220, 38, 38, 0.12) 0%, transparent 60%),
          radial-gradient(circle at 50% 100%, rgba(10, 10, 14, 0.95) 0%, #060608 100%)
        `,
      }}
    >
      {/* Subtle Viewfinder HUD Grid & Tick Marks */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Subtle Crosshairs */}
        <div className="absolute top-1/2 left-4 -translate-y-1/2 w-4 h-[1px] bg-white/20" />
        <div className="absolute top-1/2 right-4 -translate-y-1/2 w-4 h-[1px] bg-white/20" />
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[1px] h-4 bg-white/20" />

        {/* Faint Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* =========================================================================
          SUB-HEADER META ROW: BADGES (LEFT) & RELEASE DATE (RIGHT)
         ========================================================================= */}
      <div className="relative z-30 w-full max-w-7xl mx-auto flex items-center justify-between pt-1 sm:pt-2">
        {/* Category Badges */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {["BACKEND", "PYTHON", "FULL STACK"].map((badge) => (
            <span
              key={badge}
              className="px-2.5 sm:px-3 py-0.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-[9px] sm:text-[11px] font-mono tracking-wider font-medium text-neutral-300 hover:border-red-500/60 hover:text-white transition-colors"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Status / Availability & 3D Avatar Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setAvatarMode((prev) => (prev === "3d" ? "photo" : "3d"))}
            className="px-2.5 sm:px-3 py-1 rounded-full border border-red-500/40 bg-red-950/40 hover:bg-red-900/60 backdrop-blur-md text-[9px] sm:text-[11px] font-mono tracking-wider font-medium text-red-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_15px_rgba(220,38,38,0.25)] select-none pointer-events-auto"
            title="Switch between 3D Hero Model and Real Photo"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block animate-pulse" />
            <span>{avatarMode === "3d" ? "3D HERO MODEL" : "REAL PHOTO"}</span>
          </button>

          <div className="text-[10px] sm:text-xs font-mono tracking-[0.2em] uppercase text-neutral-400 hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            AVAILABLE FOR HIRE • 2026
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. MAIN HERO STAGE (CENTERPIECE)
             - Roman Numeral III on Top
             - Cast Row across
             - Glowing Red Circle Target with Reticle
             - Giant "DEADPOOL" Typography (Behind character)
             - Horizontal Perforated Cinema Film Strip
             - Cutout Deadpool with Crossed Arms (In Front)
         ========================================================================= */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex-1 flex flex-col items-center justify-center py-2 sm:py-6">
        {/* Roman Numeral III & Reticle Header */}
        <div className="relative z-10 flex flex-col items-center justify-center mb-1 sm:mb-2">
          {/* Subtle vertical camera guideline */}
          <div className="w-[1px] h-6 sm:h-8 bg-gradient-to-b from-white/30 to-red-500/80 mb-1" />

          {/* Roman Numeral III */}
          <div className="flex items-center gap-1.5 px-3 py-0.5 rounded border border-white/10 bg-black/60 backdrop-blur-sm">
            <span className="w-1 h-3.5 sm:h-4 bg-white inline-block" />
            <span className="w-1 h-3.5 sm:h-4 bg-white inline-block" />
            <span className="w-1 h-3.5 sm:h-4 bg-white inline-block" />
          </div>
        </div>

        {/* Developer Roles Row Across the Top of the Title */}
        <div className="relative z-20 w-full max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-center px-4 mb-1 sm:mb-2">
          {PORTFOLIO_ROLES.map((role) => (
            <div
              key={role.title}
              onMouseEnter={() => setActiveRole(role.title)}
              onMouseLeave={() => setActiveRole(null)}
              className="group cursor-pointer py-1"
            >
              <h4 className="text-[10px] min-[400px]:text-[11.5px] sm:text-xs lg:text-[13px] font-sans font-bold tracking-[0.1em] sm:tracking-[0.16em] uppercase text-neutral-200 group-hover:text-red-400 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] whitespace-nowrap">
                {role.title}
              </h4>
              {/* Role tech stack detail */}
              <p
                className={`text-[8px] min-[400px]:text-[8.5px] sm:text-[9.5px] font-mono tracking-wide text-red-500/90 transition-all duration-200 mt-0.5 whitespace-nowrap ${activeRole === role.title ? "opacity-100 text-red-400 scale-105" : "opacity-80"
                  }`}
              >
                {role.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Central Graphic Composition Container */}
        <div className="relative w-full flex items-center justify-center min-h-[380px] sm:min-h-[500px] lg:min-h-[580px]">
          {/* A. Glowing Red Circle Target with Outer Reticle Rings (Behind) */}
          <motion.div
            style={{ x: bgCircleX, y: bgCircleY }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 flex items-center justify-center"
          >
            {/* Outer Concentric Reticle Ring 1 */}
            <div className="w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] lg:w-[620px] lg:h-[620px] rounded-full border border-white/[0.08] absolute" />

            {/* Outer Concentric Reticle Ring 2 with Crosshairs */}
            <div className="w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] lg:w-[520px] lg:h-[520px] rounded-full border border-white/[0.06] border-dashed absolute" />

            {/* Core Solid Red Target Circle */}
            <div className="w-[220px] h-[220px] sm:w-[340px] sm:h-[340px] lg:w-[420px] lg:h-[420px] rounded-full bg-[#dc2626] shadow-[0_0_90px_rgba(220,38,38,0.55),inset_0_0_40px_rgba(0,0,0,0.4)] relative overflow-hidden">
              {/* Subtle inner sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/20" />
            </div>
          </motion.div>

          {/* B. Giant Typography - Split into Left Wing, Center Corridor, and Right Wing */}
          <motion.div
            style={{ x: textX, y: textY }}
            className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 select-none pointer-events-none"
          >
            <div className="w-full grid grid-cols-[1fr_auto_1fr] items-center leading-none text-white">
              {/* Left Wing: SANTHOSH (Bebas Neue condensed typography) */}
              <div className="flex items-center justify-end pr-2 sm:pr-4 md:pr-6 min-w-0">
                <span className="font-bebas text-[clamp(1.8rem,5.2vw,6.5rem)] font-normal text-white drop-shadow-[0_15px_30px_rgba(0,0,0,0.95)] tracking-[0.02em] uppercase whitespace-nowrap text-right">
                  SANTHOSH
                </span>
              </div>

              {/* Center Corridor for Deadpool: Perfectly sized to clear his head, neck and crossed arms */}
              <div
                className="w-[100px] min-[400px]:w-[130px] sm:w-[170px] md:w-[210px] lg:w-[240px] shrink-0"
                aria-hidden="true"
              />

              {/* Right Wing: RAJ + [2026] */}
              <div className="flex items-center justify-start pl-2 sm:pl-4 md:pl-6 min-w-0">
                <div className="relative flex items-center gap-1.5 sm:gap-2.5">
                  <span className="font-bebas text-[clamp(1.8rem,5.2vw,6.5rem)] font-normal text-white drop-shadow-[0_15px_30px_rgba(0,0,0,0.95)] tracking-[0.04em] uppercase whitespace-nowrap text-left">
                    RAJ
                  </span>
                  <span className="text-[8px] sm:text-[10px] md:text-[11px] font-mono tracking-[0.25em] text-neutral-400 [writing-mode:vertical-lr] select-none opacity-80 pt-0.5">
                    [2026]
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* C. Horizontal Perforated Cinema Film Strip Track (Behind Character) */}
          <div className="absolute top-[68%] sm:top-[66%] left-0 right-0 z-[15] pointer-events-none -translate-y-1/2 w-full overflow-hidden">
            <div className="relative w-full h-8 sm:h-12 bg-[#0c0c10]/95 border-y border-white/10 backdrop-blur-md flex flex-col justify-between py-1 shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
              {/* Top Film Sprocket Perforations */}
              <div className="w-full flex items-center justify-between px-2 gap-2 overflow-hidden opacity-40">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div
                    key={`top-sprocket-${i}`}
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/70 rounded-[1px] shrink-0"
                  />
                ))}
              </div>

              {/* Center Subtle Film Frame Markers - Developer Portfolio Context */}
              <div className="w-full flex items-center justify-between px-4 text-[7px] sm:text-[8px] font-mono tracking-[0.4em] text-white/40 uppercase">
                <span>PYTHON 3.12 • FASTAPI</span>
                <span className="hidden sm:inline">POSTGRESQL • REDIS • DOCKER</span>
                <span>BUILD 03 • PRODUCTION ENGINE</span>
                <span className="hidden md:inline">LATENCY &lt; 15MS • 60.00 FPS</span>
                <span className="text-red-500/90 font-bold">LIVE ●</span>
              </div>

              {/* Bottom Film Sprocket Perforations */}
              <div className="w-full flex items-center justify-between px-2 gap-2 overflow-hidden opacity-40">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div
                    key={`bot-sprocket-${i}`}
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/70 rounded-[1px] shrink-0"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* D. Foreground Cutout: Santhosh Raj Character (Z-20 Breaking plane) */}
          <motion.div
            style={{ x: characterX, y: characterY }}
            className="absolute bottom-[-15px] sm:bottom-[-20px] left-1/2 -translate-x-1/2 z-20 pointer-events-none w-[300px] sm:w-[440px] md:w-[520px] lg:w-[580px] max-w-[92vw] flex items-end justify-center"
          >
            <img
              src={avatarMode === "3d" ? "/santhosh_hero.png" : "/santhosh_photo.png"}
              alt="Santhosh Raj"
              className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)] drop-shadow-[0_0_40px_rgba(220,38,38,0.25)] select-none pointer-events-none filter brightness-105 contrast-105 transition-all duration-300"
              loading="eager"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default DeadpoolHero;

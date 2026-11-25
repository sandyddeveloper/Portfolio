"use client";

import React, { useRef, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

export function TechStack3DBackground() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video plays smoothly across all browsers
    video.defaultMuted = true;
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay may be restricted until user interaction
      });
    }
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 flex items-center justify-center"
      aria-hidden="true"
    >
      {/* 
        Background 3D Model Video from public/video.webm
        Dark mode: Hue-rotated to glowing crimson red on #050505
        Light mode: Inverted + hue-rotated back to electric purple on white, blended seamlessly into #faf5ff
      */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`w-full h-full object-cover scale-105 pointer-events-none transition-all duration-500 ${
          isDark
            ? "opacity-90 [filter:hue-rotate(96deg)_saturate(1.35)_contrast(1.08)]"
            : "opacity-35 mix-blend-multiply [filter:invert(1)_hue-rotate(180deg)_saturate(1.6)_contrast(1.15)]"
        }`}
        src="/video.webm"
      />

      {/* Radiant Central Aura Glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] blur-[130px] rounded-full pointer-events-none transition-colors duration-500 ${
          isDark
            ? "bg-gradient-to-tr from-red-600/30 via-red-500/15 to-transparent"
            : "bg-gradient-to-tr from-purple-500/20 via-violet-400/15 to-transparent"
        }`}
      />

      {/* Soft Vignette Mask to blend video edges seamlessly into the page background */}
      {isDark ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] pointer-events-none opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#050505_95%)] pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf5ff] via-transparent to-[#faf5ff] pointer-events-none opacity-95" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#faf5ff] via-transparent to-[#faf5ff] pointer-events-none opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#faf5ff_90%)] pointer-events-none" />
        </>
      )}
    </div>
  );
}

export default TechStack3DBackground;

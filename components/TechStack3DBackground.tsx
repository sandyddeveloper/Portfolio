"use client";

import React, { useRef, useEffect } from "react";

export function TechStack3DBackground() {
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
        Recolored to glowing crimson red to match the portfolio theme
      */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover opacity-90 scale-105 pointer-events-none [filter:hue-rotate(96deg)_saturate(1.35)_contrast(1.08)]"
        src="/video.webm"
      />

      {/* Radiant Central Crimson Aura Glow Pulsing softly */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-gradient-to-tr from-red-600/30 via-red-500/15 to-transparent blur-[130px] rounded-full pointer-events-none" />

      {/* Soft Vignette Mask to blend video edges seamlessly into the page background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] pointer-events-none opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#050505_95%)] pointer-events-none" />
    </div>
  );
}

export default TechStack3DBackground;

"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useTheme } from "@/context/ThemeContext";
import { isHireEnabled } from "@/lib/config";

interface DeadpoolHeroProps {
  onBookNow?: () => void;
  onExplore?: () => void;
}

export function DeadpoolHero({ onBookNow, onExplore }: DeadpoolHeroProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const currentYear = new Date().getFullYear();

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
      className={`relative w-full min-h-[92vh] sm:min-h-screen overflow-hidden flex flex-col justify-between select-none pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 px-3 sm:px-8 transition-colors duration-500 ${
        isDark ? "bg-[#060608] text-white" : "bg-[#fdfaff] text-slate-900"
      }`}
      style={{
        backgroundImage: isDark
          ? `
            radial-gradient(circle at 50% 45%, rgba(220, 38, 38, 0.12) 0%, transparent 60%),
            radial-gradient(circle at 50% 100%, rgba(10, 10, 14, 0.95) 0%, #060608 100%)
          `
          : `
            radial-gradient(circle at 50% 45%, rgba(124, 58, 237, 0.12) 0%, transparent 60%),
            radial-gradient(circle at 50% 100%, rgba(250, 245, 255, 0.95) 0%, #fdfaff 100%)
          `,
      }}
    >
      {/* Subtle Viewfinder HUD Grid & Tick Marks */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Subtle Crosshairs */}
        <div
          className={`absolute top-1/2 left-4 -translate-y-1/2 w-4 h-[1px] ${
            isDark ? "bg-white/20" : "bg-purple-900/20"
          }`}
        />
        <div
          className={`absolute top-1/2 right-4 -translate-y-1/2 w-4 h-[1px] ${
            isDark ? "bg-white/20" : "bg-purple-900/20"
          }`}
        />
        <div
          className={`absolute top-8 left-1/2 -translate-x-1/2 w-[1px] h-4 ${
            isDark ? "bg-white/20" : "bg-purple-900/20"
          }`}
        />

        {/* Faint Grid Lines */}
        <div
          className={`absolute inset-0 bg-[size:4rem_4rem] ${
            isDark
              ? "bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)]"
              : "bg-[linear-gradient(to_right,#7c3aed0a_1px,transparent_1px),linear-gradient(to_bottom,#7c3aed0a_1px,transparent_1px)]"
          }`}
        />
      </div>

      {/* =========================================================================
          SUB-HEADER META ROW: BADGES (LEFT) & RELEASE DATE (RIGHT)
         ========================================================================= */}
      <div className="relative z-40 w-full max-w-7xl mx-auto flex items-center justify-between pt-1 sm:pt-2 px-1 sm:px-0">
        {/* Category Badges */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {["BACKEND", "FULL STACK"].map((badge) => (
            <span
              key={badge}
              className={`px-2 sm:px-3 py-0.5 rounded-full border backdrop-blur-md text-[9px] sm:text-[11px] font-mono tracking-wider font-medium transition-colors ${
                isDark
                  ? "border-white/20 bg-black/40 text-neutral-300 hover:border-red-500/60 hover:text-white"
                  : "border-purple-200 bg-white/80 text-purple-900 hover:border-purple-500/60 hover:text-purple-950 shadow-sm"
              }`}
            >
              {badge}
            </span>
          ))}
          <span
            className={`hidden min-[480px]:inline px-2.5 sm:px-3 py-0.5 rounded-full border backdrop-blur-md text-[9px] sm:text-[11px] font-mono tracking-wider font-medium ${
              isDark
                ? "border-white/20 bg-black/40 text-neutral-300"
                : "border-purple-200 bg-white/80 text-purple-900 shadow-sm"
            }`}
          >
            PYTHON
          </span>
        </div>

        {/* Status / Availability */}
        <button
          type="button"
          onClick={onBookNow}
          className={`text-[9px] sm:text-xs font-mono tracking-[0.14em] sm:tracking-[0.2em] uppercase flex items-center gap-1.5 sm:gap-2 cursor-pointer transition-colors whitespace-nowrap ${
            isDark
              ? "text-neutral-400 hover:text-white"
              : "text-slate-600 hover:text-purple-700 font-medium"
          }`}
          title={isHireEnabled ? "Open contact & hire sidebar" : "Open contact sidebar"}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse shrink-0" />
          <span className="hidden min-[380px]:inline">
            {isHireEnabled ? "AVAILABLE FOR HIRE • " : "LET'S CONNECT • "}
          </span>
          {currentYear}
        </button>
      </div>

      {/* =========================================================================
          3. MAIN HERO STAGE (CENTERPIECE)
             - Roman Numeral III on Top
             - Cast Row across
             - Glowing Circle Target with Reticle (Red in dark, Purple in light)
             - Giant "SANTHOSH RAJ" Typography (Z-30 - Always 100% visible)
             - Horizontal Perforated Cinema Film Strip
             - Cutout 3D Hero Model with Crossed Arms (In Front)
         ========================================================================= */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex-1 flex flex-col items-center justify-center py-2 sm:py-6">
        {/* Roman Numeral III & Reticle Header */}
        <button
          type="button"
          onClick={onExplore}
          className="relative z-10 flex flex-col items-center justify-center mb-1 sm:mb-2 cursor-pointer group"
          title="Explore sections"
        >
          {/* Subtle vertical camera guideline */}
          <div
            className={`w-[1px] h-6 sm:h-8 mb-1 group-hover:h-10 transition-all duration-300 ${
              isDark
                ? "bg-gradient-to-b from-white/30 to-red-500/80"
                : "bg-gradient-to-b from-purple-900/30 to-purple-600/80"
            }`}
          />

          {/* Roman Numeral III */}
          <div
            className={`flex items-center gap-1.5 px-3 py-0.5 rounded border backdrop-blur-sm transition-colors ${
              isDark
                ? "border-white/10 bg-black/60 group-hover:border-red-500/50"
                : "border-purple-200 bg-white/80 group-hover:border-purple-500 shadow-sm"
            }`}
          >
            <span
              className={`w-1 h-3.5 sm:h-4 inline-block ${
                isDark ? "bg-white" : "bg-purple-900"
              }`}
            />
            <span
              className={`w-1 h-3.5 sm:h-4 inline-block ${
                isDark ? "bg-white" : "bg-purple-900"
              }`}
            />
            <span
              className={`w-1 h-3.5 sm:h-4 inline-block ${
                isDark ? "bg-white" : "bg-purple-900"
              }`}
            />
          </div>
        </button>

        {/* Developer Roles Row Across the Top of the Title */}
        <div className="relative z-20 w-full max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-4 text-center px-2 sm:px-4 mb-1 sm:mb-2">
          {PORTFOLIO_ROLES.map((role) => (
            <div
              key={role.title}
              onMouseEnter={() => setActiveRole(role.title)}
              onMouseLeave={() => setActiveRole(null)}
              className="group cursor-pointer py-1"
            >
              <h4
                className={`text-[10px] min-[400px]:text-[11.5px] sm:text-xs lg:text-[13px] font-sans font-bold tracking-[0.1em] sm:tracking-[0.16em] uppercase transition-colors whitespace-nowrap ${
                  isDark
                    ? "text-neutral-200 group-hover:text-red-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                    : "text-slate-800 group-hover:text-purple-600 drop-shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
                }`}
              >
                {role.title}
              </h4>
              {/* Role tech stack detail */}
              <p
                className={`text-[8px] min-[400px]:text-[8.5px] sm:text-[9.5px] font-mono tracking-wide transition-all duration-200 mt-0.5 whitespace-nowrap ${
                  isDark
                    ? activeRole === role.title
                      ? "opacity-100 text-red-400 scale-105"
                      : "opacity-80 text-red-500/90"
                    : activeRole === role.title
                    ? "opacity-100 text-purple-600 scale-105 font-bold"
                    : "opacity-85 text-purple-700/80 font-medium"
                }`}
              >
                {role.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Central Graphic Composition Container */}
        <div className="relative w-full flex items-center justify-center min-h-[380px] sm:min-h-[500px] lg:min-h-[580px]">
          {/* A. Glowing Circle Target with Outer Reticle Rings (Behind) - Crimson in Dark, Electric Purple in Light */}
          <motion.div
            style={{ x: bgCircleX, y: bgCircleY }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 flex items-center justify-center"
          >
            {/* Outer Concentric Reticle Ring 1 */}
            <div
              className={`w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] lg:w-[620px] lg:h-[620px] rounded-full border absolute ${
                isDark ? "border-white/[0.08]" : "border-purple-300/40"
              }`}
            />

            {/* Outer Concentric Reticle Ring 2 with Crosshairs */}
            <div
              className={`w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] lg:w-[520px] lg:h-[520px] rounded-full border border-dashed absolute ${
                isDark ? "border-white/[0.06]" : "border-purple-300/30"
              }`}
            />

            {/* Core Solid Target Circle: Red in dark, Purple in light */}
            <div
              className={`w-[220px] h-[220px] sm:w-[340px] sm:h-[340px] lg:w-[420px] lg:h-[420px] rounded-full relative overflow-hidden transition-all duration-500 ${
                isDark
                  ? "bg-[#dc2626] shadow-[0_0_90px_rgba(220,38,38,0.55),inset_0_0_40px_rgba(0,0,0,0.4)]"
                  : "bg-[#7c3aed] shadow-[0_0_90px_rgba(124,58,237,0.55),inset_0_0_40px_rgba(0,0,0,0.18)]"
              }`}
            >
              {/* Subtle inner sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/20" />
            </div>
          </motion.div>

          {/* B. Giant Typography - Split into Left Wing, Center Corridor, and Right Wing
                 Z-30: LIFTED ABOVE CHARACTER SHOULDERS SO SANTHOSH AND RAJ ARE 100% VISIBLE */}
          <motion.div
            style={{ x: textX, y: textY }}
            className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 select-none pointer-events-none"
          >
            <div
              className={`w-full grid grid-cols-[1fr_auto_1fr] items-center leading-none ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {/* Left Wing: SANTHOSH (Bebas Neue condensed typography) */}
              <div className="flex items-center justify-end pr-2 sm:pr-4 md:pr-6 min-w-0">
                <span
                  className={`font-bebas text-[clamp(2rem,5.6vw,6.8rem)] font-normal tracking-[0.02em] uppercase whitespace-nowrap text-right ${
                    isDark
                      ? "text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.98)] drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)]"
                      : "text-slate-900 drop-shadow-[0_4px_16px_rgba(124,58,237,0.25)] drop-shadow-[0_10px_25px_rgba(0,0,0,0.15)]"
                  }`}
                >
                  SANTHOSH
                </span>
              </div>

              {/* Center Corridor: Sized so face, chin, neck, and center hoodie chest remain completely open */}
              <div
                className="w-[100px] min-[400px]:w-[140px] sm:w-[190px] md:w-[230px] lg:w-[260px] shrink-0"
                aria-hidden="true"
              />

              {/* Right Wing: RAJ K + Dynamic Year (Z-30 layer ensures RAJ is never blocked) */}
              <div className="flex items-center justify-start pl-2 sm:pl-4 md:pl-6 min-w-0">
                <div className="relative flex items-center gap-1.5 sm:gap-2.5">
                  <span
                    className={`font-bebas text-[clamp(2rem,5.6vw,6.8rem)] font-normal tracking-[0.08em] sm:tracking-[0.14em] uppercase whitespace-nowrap text-left ${
                      isDark
                        ? "text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.98)] drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)]"
                        : "text-slate-900 drop-shadow-[0_4px_16px_rgba(124,58,237,0.25)] drop-shadow-[0_10px_25px_rgba(0,0,0,0.15)]"
                    }`}
                  >
                    RAJ K
                  </span>
                  <span
                    className={`text-[8px] sm:text-[10px] md:text-[11px] font-mono tracking-[0.25em] [writing-mode:vertical-lr] select-none opacity-85 pt-0.5 ${
                      isDark ? "text-neutral-400" : "text-purple-700 font-bold"
                    }`}
                  >
                    [{currentYear}]
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* C. Horizontal Perforated Cinema Film Strip Track (Behind Character) */}
          <div className="absolute top-[68%] sm:top-[66%] left-0 right-0 z-[15] pointer-events-none -translate-y-1/2 w-full overflow-hidden">
            <div
              className={`relative w-full h-8 sm:h-12 border-y backdrop-blur-md flex flex-col justify-between py-1 transition-colors duration-300 ${
                isDark
                  ? "bg-[#0c0c10]/95 border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.8)]"
                  : "bg-white/90 border-purple-200/80 shadow-[0_4px_25px_rgba(124,58,237,0.08)]"
              }`}
            >
              {/* Top Film Sprocket Perforations */}
              <div className="w-full flex items-center justify-between px-2 gap-2 overflow-hidden opacity-40">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div
                    key={`top-sprocket-${i}`}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-[1px] shrink-0 ${
                      isDark ? "bg-white/70" : "bg-purple-900/30"
                    }`}
                  />
                ))}
              </div>

              {/* Center Subtle Film Frame Markers - Developer Portfolio Context */}
              <div
                className={`w-full flex items-center justify-between px-3 sm:px-4 text-[6.5px] sm:text-[8px] font-mono tracking-[0.2em] sm:tracking-[0.4em] uppercase ${
                  isDark ? "text-white/50" : "text-purple-950/60 font-medium"
                }`}
              >
                <span>PYTHON 3.12</span>
                <span className="hidden min-[400px]:inline">FASTAPI</span>
                <span className="hidden sm:inline">POSTGRESQL • REDIS • DOCKER</span>
                <span>CLEAN CODE</span>
                <span className="hidden md:inline">NEXT.JS • TYPESCRIPT</span>
                <span
                  className={`font-bold ${
                    isDark ? "text-red-500" : "text-purple-600"
                  }`}
                >
                  ACTIVE ●
                </span>
              </div>

              {/* Bottom Film Sprocket Perforations */}
              <div className="w-full flex items-center justify-between px-2 gap-2 overflow-hidden opacity-40">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div
                    key={`bot-sprocket-${i}`}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-[1px] shrink-0 ${
                      isDark ? "bg-white/70" : "bg-purple-900/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* D. Foreground Cutout: Santhosh Raj 3D Hero Model (Z-20 Breaking plane) */}
          <motion.div
            style={{ x: characterX, y: characterY }}
            className="absolute bottom-[-15px] sm:bottom-[-20px] left-1/2 -translate-x-1/2 z-20 pointer-events-none w-[300px] sm:w-[440px] md:w-[520px] lg:w-[580px] max-w-[92vw] flex items-end justify-center"
          >
            <img
              src="/santhosh_hero.png"
              alt="Santhosh Raj 3D Hero Model"
              className={`w-full h-auto object-contain select-none pointer-events-none filter brightness-105 contrast-105 ${
                isDark
                  ? "drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)] drop-shadow-[0_0_40px_rgba(220,38,38,0.25)]"
                  : "drop-shadow-[0_20px_45px_rgba(0,0,0,0.3)] drop-shadow-[0_0_40px_rgba(124,58,237,0.3)]"
              }`}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default DeadpoolHero;

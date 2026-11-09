"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface AudioAlertBoxProps {
  onSelect: (enabled: boolean) => void;
  className?: string;
}

export function AudioAlertBox({ onSelect, className }: AudioAlertBoxProps) {
  return (
    <motion.div
      initial={{ y: -70, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: -70, opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 select-none",
        "flex flex-col items-center pointer-events-auto",
        className
      )}
    >
      {/* 1. Main Alert Pill Box with SOUND ON / MUTE buttons */}
      <div
        className={cn(
          "flex items-center gap-3 sm:gap-4 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full",
          "bg-black/90 backdrop-blur-xl border border-violet-500/40",
          "shadow-[0_0_30px_rgba(139,92,246,0.35),inset_0_0_12px_rgba(139,92,246,0.12)]"
        )}
      >
        {/* Equalizer animation indicator */}
        <div className="flex items-center gap-1 pl-0.5">
          <motion.span
            animate={{ height: ["8px", "18px", "8px"] }}
            transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
            className="w-0.5 bg-violet-400 rounded-full"
          />
          <motion.span
            animate={{ height: ["14px", "22px", "10px"] }}
            transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut", delay: 0.2 }}
            className="w-0.5 bg-violet-300 rounded-full"
          />
          <motion.span
            animate={{ height: ["18px", "8px", "16px"] }}
            transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut", delay: 0.4 }}
            className="w-0.5 bg-violet-400 rounded-full"
          />
        </div>

        {/* Alert text */}
        <span className="font-mono text-[12px] sm:text-[13px] tracking-wider text-neutral-200 uppercase whitespace-nowrap">
          Enable Sound FX?
        </span>

        {/* Action Buttons: SOUND ON & MUTE */}
        <div className="flex items-center gap-2">
          {/* SOUND ON */}
          <button
            type="button"
            onClick={() => onSelect(true)}
            className="px-3.5 py-1 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-mono text-[11px] sm:text-[12px] tracking-wider font-semibold shadow-[0_0_15px_rgba(139,92,246,0.7)] transition-all cursor-pointer flex items-center gap-1.5 hover:scale-105 active:scale-95"
          >
            <span>SOUND ON</span>
          </button>

          {/* MUTE / SOUND OFF */}
          <button
            type="button"
            onClick={() => onSelect(false)}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-neutral-400 hover:text-white font-mono text-[11px] sm:text-[12px] tracking-wider transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            MUTE
          </button>
        </div>
      </div>

      {/* 2. Animated Arrow swaying between SOUND ON and MUTE + Prompt Badge */}
      <div className="flex flex-col items-center mt-2.5">
        {/* Animated pointing arrow that bounces and sways between sound on and off */}
        <motion.div
          animate={{
            y: [0, -6, 0, -4, 0],
            x: [-24, 24, -18, 20, -24],
            rotate: [-12, 12, -8, 10, -12],
          }}
          transition={{
            duration: 3.0,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onSelect(true)}
          title="Click to start the experience"
        >
          {/* Glowing neon arrow pointing up toward the sound options */}
          <svg
            className="w-5 h-5 text-violet-400 drop-shadow-[0_0_10px_rgba(167,139,250,0.9)] -mb-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </motion.div>

        {/* Prompt Cue Badge: "Please click to start the experience" */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          onClick={() => onSelect(true)}
          className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/85 border border-violet-500/40 shadow-[0_0_20px_rgba(139,92,246,0.35)] backdrop-blur-xl cursor-pointer hover:border-violet-400 transition-all hover:scale-105 active:scale-95"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-400 shadow-[0_0_6px_rgba(167,139,250,1)]" />
          </span>
          <span className="text-[11px] sm:text-[12px] font-mono tracking-wider text-violet-200 uppercase whitespace-nowrap">
            Please click to start the experience
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AudioAlertBox;

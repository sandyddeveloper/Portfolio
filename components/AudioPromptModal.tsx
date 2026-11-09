"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface AudioPromptModalProps {
  onSelectAudio: (enabled: boolean) => void;
  className?: string;
}

export function AudioPromptModal({
  onSelectAudio,
  className,
}: AudioPromptModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden select-none",
        className
      )}
    >
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-violet-600/20 via-fuchsia-600/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

      {/* Main Dialog Container */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: -10 }}
        transition={{
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1], // Apple-style spring ease
        }}
        className="relative w-full max-w-md rounded-3xl border border-white/10 bg-neutral-950/90 p-7 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.9),0_0_30px_rgba(139,92,246,0.15)] overflow-hidden"
      >
        {/* Subtle top edge specular highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />

        {/* Header Icon with Animated Glow */}
        <div className="flex justify-center mb-6">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-900/30 border border-violet-500/30 shadow-[0_0_25px_rgba(168,85,247,0.35)]">
            {/* Audio Waves Animated Effect */}
            <div className="flex items-center gap-1">
              <motion.span
                animate={{ height: ["10px", "22px", "12px", "24px", "10px"] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                className="w-1 bg-violet-400 rounded-full"
              />
              <motion.span
                animate={{ height: ["16px", "28px", "14px", "30px", "16px"] }}
                transition={{ repeat: Infinity, duration: 1.0, ease: "easeInOut", delay: 0.15 }}
                className="w-1 bg-violet-300 rounded-full"
              />
              <motion.span
                animate={{ height: ["22px", "12px", "26px", "10px", "22px"] }}
                transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut", delay: 0.3 }}
                className="w-1 bg-violet-400 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Modal Text Content */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-300 text-[11px] font-mono tracking-widest uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse shadow-[0_0_6px_rgba(168,85,247,0.9)]" />
            Audio Experience
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
            Experience With Sound?
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-sm mx-auto">
            This portfolio features high-voltage sound effects and lightning transitions designed for an immersive experience.
          </p>
        </div>

        {/* Action Choice Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* SOUND ON Button */}
          <button
            type="button"
            onClick={() => onSelectAudio(true)}
            className="w-full sm:flex-1 py-3 px-5 rounded-xl font-medium text-sm flex items-center justify-center gap-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:shadow-[0_0_35px_rgba(139,92,246,0.7)] transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 select-none group"
          >
            <svg
              className="w-4 h-4 text-white group-hover:scale-110 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
            <span>SOUND ON</span>
          </button>

          {/* SOUND OFF Button */}
          <button
            type="button"
            onClick={() => onSelectAudio(false)}
            className="w-full sm:flex-1 py-3 px-5 rounded-xl font-medium text-sm flex items-center justify-center gap-2.5 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/10 hover:border-white/20 transition-all cursor-pointer select-none group"
          >
            <svg
              className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
            <span>SOUND OFF</span>
          </button>
        </div>

        {/* Footer Note */}
        <p className="mt-5 text-center text-xs text-neutral-500 font-mono">
          You can toggle sound anytime using the top-bar icon
        </p>
      </motion.div>
    </motion.div>
  );
}

export default AudioPromptModal;

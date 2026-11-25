"use client";

import React from "react";
import { motion } from "motion/react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "Light mode (Purple + White)" : "Dark mode (Red + Black)"}`}
      className={`group relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full border transition-all duration-300 cursor-pointer select-none ${
        isDark
          ? "bg-[#0c0c10]/90 border-white/10 hover:border-red-500/50 shadow-[0_0_15px_rgba(0,0,0,0.7)] hover:shadow-[0_0_20px_rgba(220,38,38,0.35)]"
          : "bg-white/90 border-purple-200 hover:border-purple-500/50 shadow-[0_0_15px_rgba(124,58,237,0.15)] hover:shadow-[0_0_25px_rgba(124,58,237,0.3)]"
      } ${className}`}
    >
      {/* Ambient Glow */}
      <span
        className={`absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none opacity-0 group-hover:opacity-100 ${
          isDark
            ? "bg-red-500/10"
            : "bg-purple-600/10"
        }`}
      />

      {/* Animated Icon Container */}
      <div className="relative w-4.5 h-4.5 sm:w-5 sm:h-5 flex items-center justify-center">
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-neutral-300 group-hover:text-red-400 transition-colors" />
          ) : (
            <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-purple-600 group-hover:text-purple-700 transition-colors" />
          )}
        </motion.div>
      </div>
    </button>
  );
}

export default ThemeToggle;

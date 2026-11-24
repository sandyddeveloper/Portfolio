"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface AudioVisualizerProps {
  className?: string;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
}

// 24 uniform intervals across a 2.4s cycle (one keyframe every 0.1s)
const TIMES = Array.from({ length: 25 }, (_, i) => i / 24);

// Center X positions for the ball: hops from Bar 0 -> 1 -> 2 -> 3 -> 2 -> 1 -> 0
// Offset by -3.5px so a 7px wide ball is centered exactly over each 3px bar (centers at 7, 23, 39, 55px)
const BALL_X = [
  3.5, 7.5, 11.5, 15.5, 19.5, 23.5, 27.5, 31.5, 35.5, 39.5, 43.5, 47.5, 51.5,
  47.5, 43.5, 39.5, 35.5, 31.5, 27.5, 23.5, 19.5, 15.5, 11.5, 7.5, 3.5,
];

// Exact parabolic vertical flight trajectory (Y position of ball top):
// Lands directly on bar top at 5.5px (ball bottom at 12.5px touches bar top at 12.5px)
// Arcs upward smoothly to peak at -6.5px in mid-air
const BALL_Y = [
  5.5, -3.5, -6.5, -3.5, 5.5, -3.5, -6.5, -3.5, 5.5, -3.5, -6.5, -3.5, 5.5,
  -3.5, -6.5, -3.5, 5.5, -3.5, -6.5, -3.5, 5.5, -3.5, -6.5, -3.5, 5.5,
];

// Squash and stretch physics:
// Stretches in mid-air (scaleY 1.1, scaleX 0.95), squashes on impact (scaleY 0.85, scaleX 1.2)
const BALL_SCALE_X = [
  1.2, 1.01, 0.95, 1.01, 1.2, 1.01, 0.95, 1.01, 1.2, 1.01, 0.95, 1.01, 1.2,
  1.01, 0.95, 1.01, 1.2, 1.01, 0.95, 1.01, 1.2, 1.01, 0.95, 1.01, 1.2,
];

const BALL_SCALE_Y = [
  0.85, 1.04, 1.1, 1.04, 0.85, 1.04, 1.1, 1.04, 0.85, 1.04, 1.1, 1.04, 0.85,
  1.04, 1.1, 1.04, 0.85, 1.04, 1.1, 1.04, 0.85, 1.04, 1.1, 1.04, 0.85,
];

// Synchronized bar vertical oscillation (all 4 bars have FIXED equal height = 24px)
// They translate up and down in harmonic see-saw phase (±6.5px):
// When the ball lands on a bar, that bar is at its lowest point (+6.5px)
// When the ball launches, the bar rebounds up to -6.5px
const BAR_0_Y = [
  6.5, 4.59, 0.0, -4.6, -6.5, -4.6, 0.0, 4.6, 6.5, 4.6, 0.0, -4.6, -6.5,
  -4.6, 0.0, 4.6, 6.5, 4.6, 0.0, -4.6, -6.5, -4.6, 0.0, 4.59, 6.5,
];

const BAR_1_Y = [
  -6.5, -4.6, 0.0, 4.6, 6.5, 4.6, 0.0, -4.6, -6.5, -4.6, 0.0, 4.6, 6.5,
  4.6, 0.0, -4.6, -6.5, -4.6, 0.0, 4.6, 6.5, 4.6, 0.0, -4.6, -6.5,
];

const BAR_2_Y = [
  6.5, 4.59, 0.0, -4.6, -6.5, -4.6, 0.0, 4.6, 6.5, 4.6, 0.0, -4.6, -6.5,
  -4.6, 0.0, 4.6, 6.5, 4.6, 0.0, -4.6, -6.5, -4.6, 0.0, 4.59, 6.5,
];

const BAR_3_Y = [
  -6.5, -4.6, 0.0, 4.6, 6.5, 4.6, 0.0, -4.6, -6.5, -4.6, 0.0, 4.6, 6.5,
  4.6, 0.0, -4.6, -6.5, -4.6, 0.0, 4.6, 6.5, 4.6, 0.0, -4.6, -6.5,
];

export function AudioVisualizer({
  className,
  soundEnabled = true,
  onToggleSound,
}: AudioVisualizerProps) {
  return (
    <div
      onClick={onToggleSound}
      className={cn(
        "fixed top-3.5 right-3.5 sm:top-8 sm:right-10 z-50 select-none flex items-center justify-center p-1.5 sm:p-2 rounded-full cursor-pointer transition-all hover:scale-105 active:scale-95 group",
        className
      )}
      title={soundEnabled ? "Sound ON (Click to mute)" : "Sound MUTED (Click to enable)"}
    >
      {/* Visualizer Stage Container */}
      <div className="relative w-[62px] h-[36px] flex items-center">
        {/* Glowing Purple Bouncing Dot */}
        <motion.div
          className="absolute z-20 pointer-events-none"
          animate={
            soundEnabled
              ? {
                  x: BALL_X,
                  y: BALL_Y,
                  scaleX: BALL_SCALE_X,
                  scaleY: BALL_SCALE_Y,
                }
              : {
                  x: 23.5,
                  y: 5.5,
                  scaleX: 1,
                  scaleY: 1,
                }
          }
          transition={
            soundEnabled
              ? {
                  repeat: Infinity,
                  duration: 2.4,
                  times: TIMES,
                  ease: "linear",
                }
              : { duration: 0.3 }
          }
          style={{ originX: 0.5, originY: 1 }}
        >
          {/* Soft radiant violet outer glow */}
          <div
            className={cn(
              "absolute -inset-1.5 rounded-full transition-opacity",
              soundEnabled
                ? "bg-[#a855f7]/40 blur-[3px]"
                : "bg-neutral-600/20 blur-[1px]"
            )}
          />
          {/* Solid vibrant purple core */}
          <div
            className={cn(
              "relative w-[7px] h-[7px] rounded-full transition-all",
              soundEnabled
                ? "bg-[#a855f7] shadow-[0_0_10px_rgba(168,85,247,0.9)]"
                : "bg-neutral-500 shadow-none"
            )}
          />
        </motion.div>

        {/* Bar 0 (center at 7px) */}
        <motion.div
          className={cn(
            "absolute left-[5.5px] top-[6px] w-[3px] h-[24px] rounded-full transition-colors",
            soundEnabled ? "bg-black" : "bg-neutral-700"
          )}
          animate={soundEnabled ? { y: BAR_0_Y } : { y: 0 }}
          transition={
            soundEnabled
              ? {
                  repeat: Infinity,
                  duration: 2.4,
                  times: TIMES,
                  ease: "linear",
                }
              : { duration: 0.3 }
          }
        />

        {/* Bar 1 (center at 23px) */}
        <motion.div
          className={cn(
            "absolute left-[21.5px] top-[6px] w-[3px] h-[24px] rounded-full transition-colors",
            soundEnabled ? "bg-black" : "bg-neutral-700"
          )}
          animate={soundEnabled ? { y: BAR_1_Y } : { y: 0 }}
          transition={
            soundEnabled
              ? {
                  repeat: Infinity,
                  duration: 2.4,
                  times: TIMES,
                  ease: "linear",
                }
              : { duration: 0.3 }
          }
        />

        {/* Bar 2 (center at 39px) */}
        <motion.div
          className={cn(
            "absolute left-[37.5px] top-[6px] w-[3px] h-[24px] rounded-full transition-colors",
            soundEnabled ? "bg-black" : "bg-neutral-700"
          )}
          animate={soundEnabled ? { y: BAR_2_Y } : { y: 0 }}
          transition={
            soundEnabled
              ? {
                  repeat: Infinity,
                  duration: 2.4,
                  times: TIMES,
                  ease: "linear",
                }
              : { duration: 0.3 }
          }
        />

        {/* Bar 3 (center at 55px) */}
        <motion.div
          className={cn(
            "absolute left-[53.5px] top-[6px] w-[3px] h-[24px] rounded-full transition-colors",
            soundEnabled ? "bg-black" : "bg-neutral-700"
          )}
          animate={soundEnabled ? { y: BAR_3_Y } : { y: 0 }}
          transition={
            soundEnabled
              ? {
                  repeat: Infinity,
                  duration: 2.4,
                  times: TIMES,
                  ease: "linear",
                }
              : { duration: 0.3 }
          }
        />
      </div>
    </div>
  );
}

export default AudioVisualizer;

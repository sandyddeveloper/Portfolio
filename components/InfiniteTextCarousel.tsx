"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface InfiniteTextCarouselProps {
  sentences?: string[];
  duration?: number; // duration in seconds for full loop
  direction?: "left" | "right";
  className?: string;
  textClassName?: string;
  children?: React.ReactNode;
}

const DEFAULT_SENTENCES = [
  "SOFTWARE ENGINEER",
  "FULL STACK DEVELOPER",
  "CREATIVE CODER",
];

export function InfiniteTextCarousel({
  sentences = DEFAULT_SENTENCES,
  duration = 24,
  direction = "left",
  className,
  textClassName,
  children,
}: InfiniteTextCarouselProps) {
  // Duplicate array 6 times to ensure seamless infinite looping on any screen size (up to 4K ultra-wide)
  const repeatedSentences = [
    ...sentences,
    ...sentences,
    ...sentences,
    ...sentences,
    ...sentences,
    ...sentences,
  ];

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden flex items-center justify-center py-10 select-none",
        className
      )}
    >
      {/* 1. Scrolling text track in normal flow — sets the container height and aligns edge-to-edge */}
      <div className="w-full flex items-center overflow-hidden pointer-events-none select-none z-0">
        <motion.div
          className="flex whitespace-nowrap items-center gap-14 sm:gap-20 md:gap-24"
          initial={{ x: direction === "left" ? "0%" : "-50%" }}
          animate={{ x: direction === "left" ? "-50%" : "0%" }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            duration,
          }}
        >
          {repeatedSentences.map((text, idx) => (
            <span
              key={idx}
              className={cn(
                "font-black tracking-tight text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-black text-[#000000] uppercase leading-[0.75] select-none inline-flex items-center",
                textClassName
              )}
            >
              {text}
            </span>
          ))}
        </motion.div>
      </div>

      {/* 2. Button placed dead-center horizontally and vertically over the text */}
      {children && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}

export default InfiniteTextCarousel;

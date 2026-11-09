"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { HoverBorderGradient } from "@/components/ui/HoverBorderGradient";
import { unlockAudio } from "@/lib/soundEffects";

interface LoadingButtonProps {
  initialProgress?: number;
  duration?: number; // Duration for 0 to 100% in ms: default 3000ms (3 sec)
  autoStart?: boolean;
  onComplete?: () => void;
  onUserStart?: () => void;
  isExpanding?: boolean;
  className?: string;
}

type AnimationStage =
  | "IDLE"
  | "COUNTING"
  | "COLLAPSING_PERCENT"
  | "REVERSE_MORPH"
  | "COMPLETED";

// Exact 7-character frames transitioning LOADING to WELCOME in reverse
const REVERSE_MORPH_FRAMES = [
  "LOADING",
  "LOADI_E",
  "LOAD_ME",
  "LOA_OME",
  "LO_COME",
  "L_LCOME",
  "_ELCOME",
  "WELCOME",
];

export default function LoadingButton({
  initialProgress = 0,
  duration = 3000, // Exactly 3 seconds
  autoStart = false, // Held in IDLE until user chooses sound on/off
  onComplete,
  onUserStart,
  isExpanding = false,
  className,
}: LoadingButtonProps) {
  const [progress, setProgress] = useState<number>(initialProgress);
  const [stage, setStage] = useState<AnimationStage>(
    initialProgress >= 100 ? "COMPLETED" : autoStart ? "COUNTING" : "IDLE"
  );
  const [morphIndex, setMorphIndex] = useState<number>(0);
  const [percentVisible, setPercentVisible] = useState<boolean>(
    initialProgress < 100
  );

  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const addTimer = useCallback((fn: () => void, delay: number) => {
    const timer = setTimeout(fn, delay);
    timersRef.current.push(timer);
    return timer;
  }, []);

  const startLoading = useCallback(() => {
    clearAllTimers();
    setProgress(0);
    setMorphIndex(0);
    setPercentVisible(true);
    setStage("COUNTING");
  }, [clearAllTimers]);

  // Start counting when autoStart switches to true
  useEffect(() => {
    if (autoStart && stage === "IDLE") {
      startLoading();
    }
  }, [autoStart, stage, startLoading]);

  // 1. Progress 0% to 100% within 3 seconds
  useEffect(() => {
    if (stage !== "COUNTING") return;

    let animationFrameId: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progressRatio = Math.min(1, elapsed / duration);
      const currentProgress = Math.min(100, Math.floor(progressRatio * 100));

      setProgress(currentProgress);

      if (progressRatio < 1) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        // Short pause at 100%, then smoothly collapse percent
        addTimer(() => {
          setStage("COLLAPSING_PERCENT");
          setPercentVisible(false);
        }, 250);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearAllTimers();
    };
  }, [stage, duration, addTimer, clearAllTimers]);

  // 2. After percent collapses, start the reverse morph
  useEffect(() => {
    if (stage !== "COLLAPSING_PERCENT") return;

    // Allow 300ms for percentage collapse transition to finish smoothly
    addTimer(() => {
      setStage("REVERSE_MORPH");
      setMorphIndex(1); // Start with LOADI_E
    }, 300);

    return () => clearAllTimers();
  }, [stage, addTimer, clearAllTimers]);

  // 3. Step through reverse morph frames: LOADI_E -> LOAD_ME -> ... -> WELCOME
  useEffect(() => {
    if (stage !== "REVERSE_MORPH") return;

    if (morphIndex < REVERSE_MORPH_FRAMES.length - 1) {
      addTimer(() => {
        setMorphIndex((prev) => prev + 1);
      }, 110); // 110ms per character step
    } else {
      // Reached WELCOME
      addTimer(() => {
        setStage("COMPLETED");
      }, 150);
    }

    return () => clearAllTimers();
  }, [stage, morphIndex, addTimer, clearAllTimers]);

  // 4. Once WELCOME is reached, pause 600ms then trigger onComplete to expand into main page
  useEffect(() => {
    if (stage !== "COMPLETED") return;

    const timer = setTimeout(() => {
      onComplete?.();
    }, 600);

    return () => clearTimeout(timer);
  }, [stage, onComplete]);

  // Render individual letters, highlighting the cursor '_' with a glowing pulse
  const renderMorphedWord = (word: string) => {
    return word.split("").map((char, index) => {
      if (char === "_") {
        return (
          <span
            key={index}
            className="text-white font-bold bg-white/20 px-0.5 rounded-xs animate-pulse inline-block"
          >
            _
          </span>
        );
      }
      return (
        <span key={index} className="text-white font-medium">
          {char}
        </span>
      );
    });
  };

  const currentWord =
    stage === "COMPLETED"
      ? "WELCOME"
      : stage === "REVERSE_MORPH"
        ? REVERSE_MORPH_FRAMES[morphIndex]
        : "LOADING";

  return (
    <div className={cn("flex justify-center text-center", className)}>
      <HoverBorderGradient
        containerClassName="rounded-full shadow-2xl"
        as="button"
        onClick={() => {
          unlockAudio();
          onUserStart?.();
          if (stage === "COMPLETED") {
            onComplete?.();
          } else {
            startLoading();
          }
        }}
        onPointerDown={() => {
          unlockAudio();
        }}
        title={stage === "COMPLETED" ? "Click to enter portfolio" : undefined}
        gradientColor="#8b5cf6"
        className="relative overflow-hidden bg-black text-white flex items-center justify-center min-w-[230px] sm:min-w-[250px] h-[48px] px-6 py-2 transition-all cursor-pointer select-none"
      >
        {/* Subtle interior progress glow (fades out when reaching welcome) */}
        <div
          className={cn(
            "absolute inset-y-0 left-0 bg-white/[0.04] pointer-events-none rounded-[inherit] transition-opacity duration-500",
            stage === "COMPLETED" ? "opacity-0" : "opacity-100"
          )}
          style={{ width: `${progress}%` }}
        />

        {/* Unified text row — zero layout jump */}
        <div
          className={cn(
            "relative z-10 flex items-center justify-center select-none font-mono text-[20px] tracking-wider transition-all duration-300",
            isExpanding && "opacity-0 scale-105 blur-[2px]"
          )}
        >
          {/* Left/Center word */}
          <span className="inline-block">{renderMorphedWord(currentWord)}</span>

          {/* Right percentage with solid block cursor — collapses smoothly at 100% */}
          <div
            className={cn(
              "flex items-center transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap",
              percentVisible
                ? "max-w-[70px] opacity-100 ml-4"
                : "max-w-0 opacity-0 ml-0"
            )}
          >
            <span className="text-neutral-400 font-sans text-[15px] font-normal tabular-nums">
              {progress}%
            </span>
            <span
              className="inline-block w-[7.5px] h-[15px] bg-white ml-1 align-middle"
              aria-hidden="true"
            />
          </div>

          {/* Terminal block cursor on WELCOME */}
          {stage === "COMPLETED" && (
            <span
              className="inline-block w-[7.5px] h-[15px] bg-white ml-1.5 align-middle animate-pulse"
              aria-hidden="true"
            />
          )}
        </div>
      </HoverBorderGradient>
    </div>
  );
}

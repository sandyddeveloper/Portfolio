"use client";

import { BackgroundCubesGrid } from "@/components/ui/BackgroundCubesGrid";
import LoadingButton from "./LoadingButton";
import { InfiniteTextCarousel } from "./InfiniteTextCarousel";
import { AudioVisualizer } from "./AudioVisualizer";
import { Logo } from "./Logo";

interface LoadingBackgroundProps {
  onIntroComplete?: () => void;
  isExpanding?: boolean;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  autoStart?: boolean;
  onUserStart?: () => void;
}

export default function BackgroundCubesGridSection({
  onIntroComplete,
  isExpanding = false,
  soundEnabled = true,
  onToggleSound,
  autoStart = false,
  onUserStart,
}: LoadingBackgroundProps) {
  return (
    <div className="relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      <BackgroundCubesGrid className="-z-10" />

      {/* Top left title logo */}
      <Logo />

      {/* Top right animated visualizer in infinite loops */}
      <AudioVisualizer
        soundEnabled={soundEnabled}
        onToggleSound={onToggleSound}
      />

      {/* Full viewport-width seamless carousel with button dead-center */}
      <div className="w-full relative z-10 flex items-center justify-center my-auto">
        <InfiniteTextCarousel
          sentences={[
            "SOFTWARE ENGINEER",
            "FULL STACK DEVELOPER",
            "CREATIVE CODER"
          ]}
          duration={44}
        >
          <LoadingButton
            onComplete={onIntroComplete}
            isExpanding={isExpanding}
            autoStart={autoStart}
            onUserStart={onUserStart}
          />
        </InfiniteTextCarousel>
      </div>
    </div>
  );
}

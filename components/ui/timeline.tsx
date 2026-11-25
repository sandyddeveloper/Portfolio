"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  title?: string;
  description?: string;
  className?: string;
}

export const Timeline = ({
  data,
  title = "Experience & Milestones",
  description = "Where I've worked, the teams I've contributed to, and what I built along the way.",
  className,
}: TimelineProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    const observer = new ResizeObserver(updateHeight);
    if (ref.current) observer.observe(ref.current);

    return () => {
      window.removeEventListener("resize", updateHeight);
      observer.disconnect();
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 60%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div
      className={cn(
        "w-full bg-transparent font-sans md:px-10 transition-colors duration-500",
        isDark
          ? "text-white selection:bg-red-500/20 selection:text-white"
          : "text-slate-900 selection:bg-purple-500/20 selection:text-purple-950",
        className
      )}
      ref={containerRef}
    >
      <div className="max-w-6xl mx-auto pt-8 sm:pt-16 pb-6 sm:pb-12 px-3 sm:px-8 lg:px-10">
        <h2
          className={`text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight max-w-4xl leading-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`text-xs sm:text-base max-w-2xl mt-2 sm:mt-3 leading-relaxed ${
              isDark ? "text-neutral-400" : "text-slate-600"
            }`}
          >
            {description}
          </p>
        )}
      </div>

      <div ref={ref} className="relative max-w-6xl mx-auto pb-20 sm:pb-28">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-6 sm:pt-10 md:pt-24 md:gap-10 group"
          >
            {/* Sticky Timeline Dot & Year / Title */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-20 sm:top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div
                className={`h-7 w-7 sm:h-10 sm:w-10 absolute left-0.5 sm:left-3 md:left-3 rounded-full flex items-center justify-center transition-colors ${
                  isDark
                    ? "bg-[#050505] border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                    : "bg-white border border-purple-200 shadow-[0_0_15px_rgba(124,58,237,0.15)]"
                }`}
              >
                <div
                  className={`h-2.5 w-2.5 sm:h-4 sm:w-4 rounded-full border transition-all duration-300 ${
                    isDark
                      ? "bg-neutral-800 border-neutral-600 group-hover:bg-red-500 group-hover:border-red-400 group-hover:shadow-[0_0_12px_rgba(239,68,68,0.8)]"
                      : "bg-purple-100 border-purple-300 group-hover:bg-purple-600 group-hover:border-purple-500 group-hover:shadow-[0_0_12px_rgba(124,58,237,0.8)]"
                  }`}
                />
              </div>
              <h3
                className={`hidden md:block text-xl md:pl-20 md:text-4xl font-extrabold tracking-tight ${
                  isDark ? "text-neutral-300" : "text-slate-800"
                }`}
              >
                {item.title}
              </h3>
            </div>

            {/* Content Area */}
            <div className="relative pl-10 sm:pl-20 pr-1 sm:pr-4 md:pl-4 w-full">
              <h3
                className={`md:hidden block text-base sm:text-2xl mb-2 text-left font-bold ${
                  isDark ? "text-neutral-200" : "text-slate-800"
                }`}
              >
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* Vertical Track Line */}
        <div
          style={{
            height: `${height}px`,
          }}
          className={`absolute md:left-8 left-4 sm:left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] to-transparent to-[95%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] ${
            isDark ? "via-neutral-800" : "via-purple-200"
          }`}
        >
          {/* Animated Glowing Gradient Tracking Beam */}
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className={`absolute inset-x-0 top-0 w-[2px] rounded-full from-[0%] via-[35%] ${
              isDark
                ? "bg-gradient-to-t from-red-600 via-red-500 to-transparent shadow-[0_0_16px_#ef4444,0_0_28px_#dc2626]"
                : "bg-gradient-to-t from-purple-600 via-violet-500 to-transparent shadow-[0_0_16px_#a855f7,0_0_28px_#7c3aed]"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;

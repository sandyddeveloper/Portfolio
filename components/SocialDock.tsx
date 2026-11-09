"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export interface SocialItem {
  id: string;
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface SocialDockProps {
  items?: SocialItem[];
  className?: string;
  position?: "bottom-left" | "left" | "right" | "bottom";
}

const DEFAULT_SOCIALS: SocialItem[] = [
  {
    id: "github",
    name: "GitHub",
    href: "https://github.com/",
    icon: (
      <svg className="w-4.5 h-4.5 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    href: "https://linkedin.com/",
    icon: (
      <svg className="w-4.5 h-4.5 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.76-1.75 1.76m1.39 9.74v-8.37H5.07v8.37h2.78z" />
      </svg>
    ),
  },
  {
    id: "x",
    name: "X (Twitter)",
    href: "https://x.com/",
    icon: (
      <svg className="w-4 h-4 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    name: "Instagram",
    href: "https://instagram.com/",
    icon: (
      <svg className="w-4.5 h-4.5 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
];

export function SocialDock({
  items = DEFAULT_SOCIALS,
  className,
  position = "bottom-left",
}: SocialDockProps) {
  const [isDockHovered, setIsDockHovered] = useState(false);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [footerOffset, setFooterOffset] = useState<number>(0);
  const [isPastFooter, setIsPastFooter] = useState<boolean>(false);

  useEffect(() => {
    let ticking = false;

    const checkFooterCollision = () => {
      const footer = document.getElementById("footer") || document.querySelector("footer");
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Distance from the bottom of the viewport to the top boundary of the footer
      const overlap = windowHeight - footerRect.top;

      if (overlap > -40) {
        // Stop before footer: push dock up so it never enters the footer
        setFooterOffset(Math.max(0, overlap));
        // Once the footer starts entering the screen, hide the dock completely
        setIsPastFooter(overlap > 20);
      } else {
        setFooterOffset(0);
        setIsPastFooter(false);
      }
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkFooterCollision();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    checkFooterCollision();

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  const isHorizontal = position === "bottom";

  return (
    <motion.aside
      aria-label="Social links dock"
      initial={{ opacity: 1, y: 0 }}
      animate={{
        opacity: isPastFooter ? 0 : 1,
        y: isPastFooter ? 20 : 0,
        scale: isPastFooter ? 0.9 : 1,
      }}
      transition={{
        duration: 0.24,
        ease: "easeOut",
      }}
      style={{
        bottom: footerOffset > 0 ? `${footerOffset + 24}px` : undefined,
        pointerEvents: isPastFooter ? "none" : "auto",
      }}
      className={cn(
        "fixed z-40 select-none",
        position === "bottom-left" && (footerOffset > 0 ? "left-2.5 sm:left-7" : "left-2.5 sm:left-7 bottom-4 sm:bottom-8"),
        position === "left" && "left-2.5 sm:left-7 top-1/2 -translate-y-1/2",
        position === "right" && "right-2.5 sm:right-7 top-1/2 -translate-y-1/2",
        position === "bottom" && (footerOffset > 0 ? "left-1/2 -translate-x-1/2" : "bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2"),
        className
      )}
      onMouseEnter={() => setIsDockHovered(true)}
      onMouseLeave={() => {
        setIsDockHovered(false);
        setHoveredItemId(null);
      }}
    >
      {/* Pill Capsule Container */}
      <div
        className={cn(
          "relative flex items-center rounded-full",
          isHorizontal
            ? "flex-row py-2 sm:py-3 px-3 sm:px-6"
            : "flex-col py-2.5 sm:py-5 px-1.5 sm:px-3.5"
        )}
      >
        {/* 
          GLOWING ORANGE PILL CAPSULE
          Bright neon orange with ambient radiance
        */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: isDockHovered ? 1 : 0,
            scale: isDockHovered ? 1 : 0.9,
          }}
          transition={{
            duration: 0.28,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={cn(
            "absolute inset-0 rounded-full pointer-events-none",
            "bg-[#dc2626]", // Vibrant crimson red matching the portfolio theme
            "shadow-[0_0_28px_8px_rgba(220,38,38,0.7),0_0_55px_18px_rgba(239,68,68,0.4)]" // Glowing neon crimson radiance
          )}
        />

        {/* Stack of Social Icons */}
        <div
          className={cn(
            "relative z-10 flex items-center",
            isHorizontal ? "flex-row gap-3 sm:gap-7" : "flex-col gap-2.5 sm:gap-6"
          )}
        >
          {items.map((item) => {
            const isItemHovered = hoveredItemId === item.id;

            return (
              <div key={item.id} className="relative flex items-center justify-center">
                <motion.a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  onMouseEnter={() => setHoveredItemId(item.id)}
                  onMouseLeave={() => setHoveredItemId(null)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{
                    type: "spring",
                    stiffness: 450,
                    damping: 20,
                  }}
                  className={cn(
                    "w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200",
                    isDockHovered
                      ? "text-black" // Solid black inside the orange pill
                      : "text-white/90 hover:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" // Solid white when unhovered
                  )}
                >
                  {item.icon}
                </motion.a>

                {/* Interactive Tooltip on hover */}
                <AnimatePresence>
                  {isItemHovered && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: isHorizontal ? "-50%" : 8,
                        y: isHorizontal ? 6 : 0,
                        scale: 0.9,
                      }}
                      animate={{
                        opacity: 1,
                        x: isHorizontal ? "-50%" : 0,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        x: isHorizontal ? "-50%" : 6,
                        y: isHorizontal ? 4 : 0,
                        scale: 0.9,
                      }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className={cn(
                        "absolute pointer-events-none z-50 whitespace-nowrap",
                        isHorizontal ? "bottom-full mb-3 left-1/2" : "left-full ml-3.5"
                      )}
                    >
                      <div className="px-3 py-1.5 rounded-lg bg-[#0e0e12]/95 border border-red-500/40 text-white text-xs font-medium tracking-wide shadow-[0_10px_25px_rgba(0,0,0,0.7)] backdrop-blur-md flex items-center gap-1.5">
                        <span>{item.name}</span>
                        <svg
                          className="w-3 h-3 text-red-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </motion.aside>
  );
}

export default SocialDock;

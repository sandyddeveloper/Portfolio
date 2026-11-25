"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { isHireEnabled } from "@/lib/config";

interface AboutSectionProps {
  onGetInTouch?: () => void;
}

export function AboutSection({ onGetInTouch }: AboutSectionProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const cards = [
    {
      id: "architecture",
      category: "CORE FOCUS",
      title: "Backend & Systems",
      detail: "FastAPI | Django | Redis | PostgreSQL",
      image: "/about/backend.jpg",
      alt: "Backend server hardware and architecture rack",
    },
    {
      id: "focus",
      category: "FULL STACK",
      title: "Frontend & Web Apps",
      detail: "React | Next.js | TypeScript | Tailwind",
      image: "/about/developer.jpg",
      alt: "Software engineer working at desktop setup",
    },
    {
      id: "workspace",
      category: "DELIVERY",
      title: "DevOps & Tooling",
      detail: "Docker | Git | CI/CD | Linux",
      image: "/about/workspace.jpg",
      alt: "Clean modern developer workspace and notebooks",
    },
  ];

  return (
    <section
      id="about"
      className={`relative w-full py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 select-none overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-[#050505] text-white" : "bg-white text-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* =========================================================================
            TOP SECTION: 2-COLUMN HEADER
            Left: Kicker + Big Headline
            Right: Bio Description + Action Footer ("Get in touch")
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 sm:mb-16 lg:mb-20">
          {/* Left Column (Span 7) */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span
                className={`font-semibold tracking-wide text-sm sm:text-base inline-block ${
                  isDark ? "text-red-500" : "text-purple-600"
                }`}
              >
                A Bit About Me
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.12] ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Building solid backends and clean web apps that just work.
            </motion.h2>
          </div>

          {/* Right Column (Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full pt-1 sm:pt-3 space-y-6 sm:space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-base sm:text-lg md:text-xl font-normal leading-relaxed ${
                isDark ? "text-neutral-300" : "text-slate-600"
              }`}
            >
              I&apos;m a full stack and backend developer. I spend most of my time writing Python
              services, designing clean database schemas, and building responsive frontends in
              Next.js. I care about writing code that stays fast, is easy to debug, and doesn&apos;t break in production.
            </motion.p>

            {/* Bottom Row: Subtext & Get In Touch Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`flex items-center justify-between gap-4 pt-2 border-t ${
                isDark ? "border-white/10" : "border-purple-100"
              }`}
            >
              {/* Subtext */}
              <div
                className={`text-xs sm:text-sm font-medium leading-snug ${
                  isDark ? "text-neutral-400" : "text-slate-500"
                }`}
              >
                <p>{isHireEnabled ? "Have a role or project in mind?" : "Have a project or idea in mind?"}</p>
                <p className={isDark ? "text-neutral-200" : "text-purple-900 font-semibold"}>
                  Let&apos;s talk.
                </p>
              </div>

              {/* Get In Touch Pill Button */}
              <button
                type="button"
                onClick={onGetInTouch}
                className={`group relative inline-flex items-center gap-3 sm:gap-4 rounded-full pl-4 sm:pl-5 pr-1.5 py-1.5 font-medium text-white transition-all duration-300 cursor-pointer select-none ${
                  isDark
                    ? "bg-[#dc2626] hover:bg-[#ef4444] shadow-[0_0_25px_rgba(220,38,38,0.45)] hover:shadow-[0_0_35px_rgba(239,68,68,0.7)]"
                    : "bg-[#7c3aed] hover:bg-[#8b5cf6] shadow-[0_0_25px_rgba(124,58,237,0.45)] hover:shadow-[0_0_35px_rgba(124,58,237,0.7)]"
                }`}
              >
                <span className="font-sans text-xs sm:text-sm font-semibold tracking-wide text-white">
                  Get in touch
                </span>
                <span
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 ${
                    isDark ? "text-red-600" : "text-purple-600"
                  }`}
                >
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                </span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM SECTION: 3 ROUNDED IMAGE SHOWCASE CARDS
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 * idx }}
              className={`group relative rounded-3xl overflow-hidden transition-all duration-500 ${
                isDark
                  ? "aspect-[4/3] sm:aspect-[3/4] bg-[#0d0d12] border border-white/[0.08] hover:border-red-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_50px_rgba(220,38,38,0.2)]"
                  : "flex flex-col bg-white border border-purple-200/80 hover:border-purple-400 p-3 shadow-[0_15px_40px_rgba(124,58,237,0.08)] hover:shadow-[0_22px_50px_rgba(124,58,237,0.16)]"
              }`}
            >
              {isDark ? (
                <>
                  {/* Dark Mode: Full-bleed image with dark vignette & overlay text */}
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.98] contrast-[1.05]"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-red-600/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7 flex flex-col justify-end">
                    <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase mb-1.5 sm:mb-2 text-red-400">
                      {card.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-200 font-mono mt-1 opacity-90">
                      {card.detail}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* Light Mode: Clean White & Lavender Editorial Card */}
                  <div className="relative w-full aspect-[4/3] sm:aspect-[4/3.6] rounded-2xl overflow-hidden bg-purple-50">
                    <img
                      src={card.image}
                      alt={card.alt}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[1.08] contrast-[0.95]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/15 via-transparent to-white/10 pointer-events-none" />
                  </div>

                  <div className="pt-4 pb-2 px-2.5 flex flex-col justify-end">
                    <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase mb-1 text-purple-600">
                      {card.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug group-hover:text-purple-900 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-mono mt-1">
                      {card.detail}
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;

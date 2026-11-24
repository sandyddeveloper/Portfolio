"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

interface AboutSectionProps {
  onGetInTouch?: () => void;
}

export function AboutSection({ onGetInTouch }: AboutSectionProps) {
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
      className="relative w-full bg-[#050505] text-white py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 select-none overflow-hidden"
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
              <span className="text-red-500 font-medium tracking-wide text-sm sm:text-base inline-block">
                A Bit About Me
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.12]"
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
              className="text-neutral-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed"
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
              className="flex items-center justify-between gap-4 pt-2 border-t border-white/10"
            >
              {/* Subtext */}
              <div className="text-xs sm:text-sm text-neutral-400 font-medium leading-snug">
                <p>Have a role or project in mind?</p>
                <p className="text-neutral-200">Let&apos;s talk.</p>
              </div>

              {/* Get In Touch Pill Button */}
              <button
                type="button"
                onClick={onGetInTouch}
                className="group relative inline-flex items-center gap-3 sm:gap-4 rounded-full bg-[#dc2626] hover:bg-[#ef4444] pl-4 sm:pl-5 pr-1.5 py-1.5 font-medium text-white shadow-[0_0_25px_rgba(220,38,38,0.45)] hover:shadow-[0_0_35px_rgba(239,68,68,0.7)] transition-all duration-300 cursor-pointer select-none"
              >
                <span className="font-sans text-xs sm:text-sm font-semibold tracking-wide text-white">
                  Get in touch
                </span>
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center text-red-600 transition-transform duration-300 group-hover:translate-x-0.5">
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
              className="group relative rounded-3xl overflow-hidden bg-[#0d0d12] border border-white/[0.08] hover:border-red-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_50px_rgba(220,38,38,0.2)] transition-all duration-500 aspect-[4/3] sm:aspect-[3/4]"
            >
              {/* Card Photo with smooth zoom */}
              <img
                src={card.image}
                alt={card.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.98] contrast-[1.05]"
                loading="lazy"
              />

              {/* Gradient Vignette Overlay for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Subtle Ambient Red Sheen on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Bottom Card Content */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 lg:p-7 flex flex-col justify-end">
                {/* Category kicker */}
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase text-red-400 mb-1">
                  {card.category}
                </span>

                {/* Card Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-red-100 transition-colors">
                  {card.title}
                </h3>

                {/* Subtitle / Tech detail */}
                <p className="text-xs sm:text-sm text-neutral-300 font-mono tracking-wide mt-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                  {card.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;

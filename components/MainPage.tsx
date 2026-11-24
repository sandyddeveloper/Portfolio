"use client";

import React, { useState } from "react";
import { GlowCursor } from "./GlowCursor";
import { GooeyNav, GooeyNavItem } from "./GooeyNav";
import { ContactSidebar } from "./ContactSidebar";
import { SocialDock } from "./SocialDock";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { TechStackGrid } from "./TechStackGrid";
import { DeadpoolHero } from "./DeadpoolHero";
import { AboutSection } from "./AboutSection";
import { ProjectShowcase } from "./ProjectShowcase";
import { Footer } from "./Footer";

interface MainPageProps {
  onReplayIntro?: () => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
}

const DESKTOP_NAV_ITEMS: GooeyNavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const MOBILE_NAV_ITEMS: GooeyNavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
];

export function MainPage({}: MainPageProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  return (
    <GlowCursor
      color="#a855f7"
      secondaryColor="#6366f1"
      intensity={1.4}
      trailWidth={3.5}
      linger={1.5}
      glow={1.3}
      hotspot={0.85}
      followSpeed={0.75}
      clickBurst={true}
      quality="high"
      theme="dark"
      replaceSystemCursor={true}
      showCursorDot={true}
      className="w-full min-h-screen"
    >
      <div id="home" className="relative min-h-screen w-full bg-[#050505] text-white selection:bg-white/20 selection:text-white overflow-x-hidden font-sans flex flex-col justify-between">
        {/* Subtle Ambient Radial Glow */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-gradient-to-b from-white/[0.04] via-violet-500/[0.02] to-transparent blur-[140px] rounded-full" />
        </div>

        {/* Top Header - Responsive Navbar centered + Hire button on the right */}
        <header className="fixed top-0 left-0 right-0 z-40 pt-2 sm:pt-6 px-2 sm:px-8 pointer-events-none">
          <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto relative gap-1.5 sm:gap-4">
            {/* Left balance spacer so navbar stays dead-center on desktop */}
            <div className="w-10 sm:w-40 hidden md:block" aria-hidden="true" />

            {/* Desktop Centered GooeyNav */}
            <div className="hidden md:flex flex-1 justify-center min-w-0">
              <GooeyNav
                items={DESKTOP_NAV_ITEMS}
                activeIndex={activeTab}
                onChange={(index) => {
                  setActiveTab(index);
                  if (DESKTOP_NAV_ITEMS[index].label === "Contact") {
                    setIsContactOpen(true);
                  }
                }}
                size="lg"
                theme="dark"
                color="#ffffff"
                activeTextColor="#000000"
                colors={["#ffffff", "#f4f4f5", "#e4e4e7", "#d4d4d8"]}
                frame={true}
                animationTime={550}
                gooeyness={0.62}
                spread={60}
                particleCount={18}
              />
            </div>

            {/* Mobile Compact GooeyNav */}
            <div className="flex md:hidden flex-1 justify-start sm:justify-center min-w-0 pr-1">
              <GooeyNav
                items={MOBILE_NAV_ITEMS}
                size="sm"
                theme="dark"
                color="#ffffff"
                activeTextColor="#000000"
                colors={["#ffffff", "#f4f4f5"]}
                frame={true}
                animationTime={450}
                gooeyness={0.5}
                spread={35}
                particleCount={12}
                onChange={(index) => {
                  const targetItem = MOBILE_NAV_ITEMS[index];
                  if (targetItem?.href) {
                    const el = document.querySelector(targetItem.href);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              />
            </div>

            {/* Right side Hire Me Button (Icon pill on mobile, full expanding on desktop) */}
            <div className="w-auto md:w-40 flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="group relative inline-flex h-9 w-9 sm:h-12 sm:w-auto items-center justify-center sm:justify-between rounded-full bg-neutral-950/90 border border-white/10 sm:pl-5 sm:pr-1 sm:py-1 font-medium text-white shadow-[0_0_20px_rgba(0,0,0,0.6)] hover:border-red-500/50 hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all duration-300 cursor-pointer select-none"
                title="Open contact & hire sidebar"
                aria-label="Open contact and hire sidebar"
              >
                {/* Desktop Text Label */}
                <span className="hidden sm:inline relative z-10 font-sans text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap text-white group-hover:text-black transition-colors duration-300 pr-2 sm:pr-3">
                  Hire Me
                </span>

                {/* Expanding Glowing Crimson Red Circle / Pill */}
                <div className="absolute inset-0 sm:inset-auto sm:right-1 sm:top-1/2 sm:-translate-y-1/2 rounded-full bg-[#dc2626] sm:h-10 sm:w-10 shadow-[0_0_15px_rgba(220,38,38,0.7)] transition-all duration-300 ease-out sm:group-hover:w-[calc(100%-8px)] sm:group-hover:bg-[#ef4444] sm:group-hover:shadow-[0_0_30px_rgba(239,68,68,0.85)] pointer-events-none" />

                {/* Arrow Icon */}
                <div className="relative z-10 flex h-full w-full sm:h-10 sm:w-10 items-center justify-center pointer-events-none">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white sm:text-black transition-transform duration-300 sm:group-hover:translate-x-0.5"
                  >
                    <path
                      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Floating Social Dock at Bottom Left */}
        <SocialDock position="bottom-left" />

        {/* Contact & Hire Sidebar Drawer */}
        <ContactSidebar
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />

        {/* Cinematic Deadpool III Hero Section */}
        <div id="home" className="w-full">
          <DeadpoolHero
            onBookNow={() => setIsContactOpen(true)}
            onExplore={() => {
              const el = document.getElementById("about");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </div>

        {/* About Section - Directly next to Hero Section */}
        <AboutSection onGetInTouch={() => setIsContactOpen(true)} />

        {/* Project Showcase Section - Pinned Horizontal GSAP Scroll */}
        <ProjectShowcase />

        {/* Main Content Stage */}
        <main className="relative z-10 flex-1 flex flex-col items-center justify-start pt-12 sm:pt-20 pb-8 sm:pb-12 px-2 sm:px-8 space-y-16 sm:space-y-24">
          <div id="experience" className="w-full max-w-6xl mx-auto scroll-mt-24">
            <ExperienceTimeline />
          </div>
          <div id="skills" className="w-full max-w-6xl mx-auto scroll-mt-24">
            <TechStackGrid />
          </div>
        </main>

        {/* Footer */}
        <Footer onOpenContact={() => setIsContactOpen(true)} />
      </div>
    </GlowCursor>
  );
}

export default MainPage;

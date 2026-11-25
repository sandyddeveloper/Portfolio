"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { PROJECTS } from "@/data/project";

type StageTab = "overview" | "architecture";

export function ProjectShowcase() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [stageTab, setStageTab] = useState<StageTab>("overview");
  const [hoveredNdaId, setHoveredNdaId] = useState<string | null>(null);

  const activeProject = PROJECTS[selectedIndex] ?? PROJECTS[0];

  const handleSelectProject = (index: number) => {
    setSelectedIndex(index);
    setStageTab("overview");
    setHoveredNdaId(null);
  };

  const handlePrev = () => {
    handleSelectProject(
      selectedIndex === 0 ? PROJECTS.length - 1 : selectedIndex - 1
    );
  };

  const handleNext = () => {
    handleSelectProject(
      selectedIndex === PROJECTS.length - 1 ? 0 : selectedIndex + 1
    );
  };

  return (
    <section
      id="projects"
      className={`relative w-full py-20 sm:py-28 lg:py-32 px-4 sm:px-8 lg:px-12 select-none overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-[#050505] text-white" : "bg-[#faf5ff] text-slate-900"
      }`}
    >
      {/* Subtle Ambient Background Glow */}
      <div
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[680px] h-[420px] blur-[170px] rounded-full pointer-events-none transition-colors duration-700 ${
          isDark ? "bg-red-600/[0.04]" : "bg-purple-600/[0.06]"
        }`}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* =========================================================================
            MINIMALIST SECTION HEADER
           ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <span
                className={`w-1.5 h-1.5 rounded-full inline-block animate-pulse ${
                  isDark ? "bg-red-500" : "bg-purple-600"
                }`}
              />
              <span
                className={`text-[11px] font-mono font-bold tracking-[0.22em] uppercase ${
                  isDark ? "text-red-500" : "text-purple-600"
                }`}
              >
                Selected Work • {new Date().getFullYear()}
              </span>
            </div>
            <h2
              className={`text-3xl sm:text-5xl font-bold tracking-tight leading-none ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Featured Projects
              <span className={isDark ? "text-red-500" : "text-purple-600"}>.</span>
            </h2>
          </div>

          <p
            className={`max-w-sm text-xs sm:text-sm leading-relaxed ${
              isDark ? "text-neutral-400" : "text-slate-600"
            }`}
          >
            Select a project to explore its overview, tech stack, and backend architecture.
          </p>
        </div>

        {/* =========================================================================
            MOBILE SEGMENTED PROJECT SELECTOR (Under lg)
           ========================================================================= */}
        <div className="flex lg:hidden items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-none">
          {PROJECTS.map((proj, idx) => {
            const isActive = idx === selectedIndex;
            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => handleSelectProject(idx)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono border transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? isDark
                      ? "bg-[#dc2626] border-red-500 text-white font-semibold shadow-[0_0_20px_rgba(220,38,38,0.35)]"
                      : "bg-[#7c3aed] border-purple-500 text-white font-semibold shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                    : isDark
                    ? "bg-white/[0.03] border-white/10 text-neutral-400"
                    : "bg-white border-purple-200 text-slate-600"
                }`}
              >
                <span>{proj.number}</span>
                <span className={proj.isConfidential ? "blur-[4px]" : ""}>
                  {proj.title}
                </span>
                {proj.isConfidential && <Lock className="w-3 h-3 opacity-80" />}
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            2-COLUMN INTERACTIVE STAGE: LEFT INDEX RAIL + RIGHT FOCUSED STAGE
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* LEFT RAIL: Minimal 3-Item Project Index (Desktop) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-3">
            {PROJECTS.map((proj, idx) => {
              const isActive = idx === selectedIndex;
              return (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => handleSelectProject(idx)}
                  className={`group w-full text-left rounded-2xl p-4 sm:p-5 border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                    isActive
                      ? isDark
                        ? "bg-[#0d0d13] border-red-500/50 shadow-[0_12px_35px_rgba(220,38,38,0.12)]"
                        : "bg-white border-purple-400 shadow-[0_12px_35px_rgba(124,58,237,0.12)]"
                      : isDark
                      ? "bg-[#09090d]/70 border-white/[0.06] hover:border-white/20"
                      : "bg-white/70 border-purple-100 hover:border-purple-300"
                  }`}
                >
                  {/* Active Accent Strip */}
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectRail"
                      className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-full ${
                        isDark ? "bg-red-500" : "bg-purple-600"
                      }`}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isActive
                          ? isDark
                            ? "text-red-500"
                            : "text-purple-600"
                          : isDark
                          ? "text-neutral-500"
                          : "text-slate-400"
                      }`}
                    >
                      {proj.number}
                    </span>

                    {proj.company && (
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                          isDark
                            ? "bg-white/[0.03] border-white/10 text-neutral-400"
                            : "bg-purple-50 border-purple-200/80 text-purple-800"
                        }`}
                      >
                        @ {proj.company}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <h3
                      className={`text-base font-bold tracking-tight transition-colors ${
                        proj.isConfidential ? "blur-[5px] select-none opacity-80" : ""
                      } ${
                        isActive
                          ? isDark
                            ? "text-white"
                            : "text-slate-900"
                          : isDark
                          ? "text-neutral-300 group-hover:text-white"
                          : "text-slate-700 group-hover:text-slate-900"
                      }`}
                    >
                      {proj.title}
                    </h3>
                    {proj.isConfidential && (
                      <Lock
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isDark ? "text-red-400" : "text-purple-600"
                        }`}
                      />
                    )}
                  </div>

                  <p
                    className={`text-[11px] font-mono uppercase tracking-wider mt-1.5 truncate ${
                      isDark ? "text-neutral-500" : "text-slate-500"
                    }`}
                  >
                    {proj.category}
                  </p>
                </button>
              );
            })}

            {/* Subtle Prev / Next Controls */}
            <div className="flex items-center justify-between pt-2 px-1">
              <span
                className={`text-xs font-mono ${
                  isDark ? "text-neutral-500" : "text-slate-500"
                }`}
              >
                {activeProject.number} of {String(PROJECTS.length).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous project"
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                    isDark
                      ? "border-white/10 bg-white/[0.03] text-neutral-300 hover:border-red-500/50 hover:text-white"
                      : "border-purple-200 bg-white text-slate-700 hover:border-purple-400 hover:text-purple-900"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next project"
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                    isDark
                      ? "border-white/10 bg-white/[0.03] text-neutral-300 hover:border-red-500/50 hover:text-white"
                      : "border-purple-200 bg-white text-slate-700 hover:border-purple-400 hover:text-purple-900"
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT STAGE: Clean, Uncluttered Active Project Card */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.article
                key={activeProject.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`rounded-3xl border overflow-hidden transition-colors duration-500 ${
                  isDark
                    ? "bg-[#0a0a0e]/95 border-white/[0.08] shadow-[0_24px_70px_rgba(0,0,0,0.75)]"
                    : "bg-white border-purple-200/80 shadow-[0_20px_60px_rgba(124,58,237,0.08)]"
                }`}
              >
                {/* Clean Meta Bar Above Image (No clutter on the photo itself) */}
                <div
                  className={`flex flex-wrap items-center justify-between gap-2 px-5 sm:px-7 py-3.5 border-b text-[11px] font-mono ${
                    isDark
                      ? "border-white/[0.06] text-neutral-400"
                      : "border-purple-100 text-slate-500"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`font-bold ${
                        isDark ? "text-red-500" : "text-purple-600"
                      }`}
                    >
                      {activeProject.number} / {String(PROJECTS.length).padStart(2, "0")}
                    </span>
                    {activeProject.company && (
                      <>
                        <span>•</span>
                        <span
                          className={
                            isDark
                              ? "text-neutral-200 font-semibold"
                              : "text-purple-900 font-semibold"
                          }
                        >
                          @ {activeProject.company}
                        </span>
                      </>
                    )}
                  </div>

                  <span className="uppercase tracking-wider truncate max-w-[240px] sm:max-w-none">
                    {activeProject.category}
                  </span>
                </div>

                {/* Clean Visual Banner */}
                <div className="p-4 sm:p-6 pb-0">
                  <div
                    className={`relative w-full aspect-[16/9] sm:aspect-[2/1] rounded-2xl overflow-hidden border ${
                      isDark
                        ? "border-white/[0.06] bg-[#0e0e14]"
                        : "border-purple-100 bg-purple-50"
                    }`}
                  >
                    <img
                      src={activeProject.image}
                      alt={
                        activeProject.isConfidential
                          ? "Confidential Project Visual"
                          : activeProject.title
                      }
                      className={`w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03] ${
                        isDark
                          ? "filter brightness-[0.9] contrast-[1.05]"
                          : "filter brightness-[1.03] contrast-[0.98]"
                      }`}
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Content Stage */}
                <div className="p-5 sm:p-7 space-y-6">
                  {/* Title, Tagline & Overview/Architecture Micro-Switcher */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1">
                      {activeProject.isConfidential ? (
                        <div
                          className="relative inline-flex items-center gap-3 cursor-help"
                          onMouseEnter={() => setHoveredNdaId(activeProject.id)}
                          onMouseLeave={() => setHoveredNdaId(null)}
                          onClick={() =>
                            setHoveredNdaId((prev) =>
                              prev === activeProject.id ? null : activeProject.id
                            )
                          }
                        >
                          <h3
                            aria-label="Confidential project name"
                            className={`text-2xl sm:text-3xl font-bold tracking-tight select-none blur-[9px] opacity-75 ${
                              isDark ? "text-white" : "text-slate-900"
                            }`}
                          >
                            {activeProject.title}
                          </h3>

                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider uppercase border shrink-0 ${
                              isDark
                                ? "bg-red-500/10 border-red-500/30 text-red-400"
                                : "bg-purple-100 border-purple-300 text-purple-700"
                            }`}
                          >
                            <Lock className="w-3 h-3" />
                            <span>NDA</span>
                          </span>

                          <AnimatePresence>
                            {hoveredNdaId === activeProject.id && (
                              <motion.div
                                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 6, scale: 0.96 }}
                                transition={{ duration: 0.18, ease: "easeOut" }}
                                className={`absolute left-0 bottom-full mb-3 z-40 w-[min(320px,80vw)] rounded-xl p-3 sm:p-3.5 border shadow-xl backdrop-blur-xl pointer-events-none ${
                                  isDark
                                    ? "bg-[#121218]/95 border-red-500/40 text-neutral-100 shadow-[0_12px_35px_rgba(0,0,0,0.85)]"
                                    : "bg-white/95 border-purple-300 text-slate-800 shadow-[0_12px_35px_rgba(124,58,237,0.18)]"
                                }`}
                              >
                                <div className="flex items-start gap-2.5">
                                  <Lock
                                    className={`w-4 h-4 mt-0.5 shrink-0 ${
                                      isDark ? "text-red-400" : "text-purple-600"
                                    }`}
                                  />
                                  <p className="text-xs sm:text-[13px] font-sans font-medium leading-snug">
                                    {activeProject.confidentialMessage ||
                                      "Sorry, as per company policy, the project name cannot be revealed."}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <h3
                          className={`text-2xl sm:text-3xl font-bold tracking-tight ${
                            isDark ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {activeProject.title}
                        </h3>
                      )}

                      <p
                        className={`text-xs sm:text-sm font-mono ${
                          isDark ? "text-neutral-400" : "text-purple-900/70"
                        }`}
                      >
                        {activeProject.tagline}
                      </p>
                    </div>

                    {/* Clean 2-Tab Micro-Switcher: Overview | Architecture */}
                    {activeProject.highlights &&
                      activeProject.highlights.length > 0 && (
                        <div
                          className={`inline-flex p-1 rounded-full border shrink-0 self-start ${
                            isDark
                              ? "bg-white/[0.03] border-white/10"
                              : "bg-purple-50/70 border-purple-200/80"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => setStageTab("overview")}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                              stageTab === "overview"
                                ? isDark
                                  ? "bg-[#dc2626] text-white shadow-sm"
                                  : "bg-[#7c3aed] text-white shadow-sm"
                                : isDark
                                ? "text-neutral-400 hover:text-white"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            Overview
                          </button>
                          <button
                            type="button"
                            onClick={() => setStageTab("architecture")}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                              stageTab === "architecture"
                                ? isDark
                                  ? "bg-[#dc2626] text-white shadow-sm"
                                  : "bg-[#7c3aed] text-white shadow-sm"
                                : isDark
                                ? "text-neutral-400 hover:text-white"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            Architecture ({activeProject.highlights.length})
                          </button>
                        </div>
                      )}
                  </div>

                  {/* Tab Content Area */}
                  <AnimatePresence mode="wait">
                    {stageTab === "overview" ? (
                      <motion.div
                        key="tab-overview"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="space-y-6"
                      >
                        {/* Clean Readable Summary */}
                        <p
                          className={`text-sm sm:text-[15px] leading-relaxed max-w-prose ${
                            isDark ? "text-neutral-300" : "text-slate-600"
                          }`}
                        >
                          {activeProject.description}
                        </p>

                        {/* Minimal Horizontal Metrics Strip */}
                        <div
                          className={`grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y ${
                            isDark ? "border-white/[0.08]" : "border-purple-100"
                          }`}
                        >
                          {activeProject.metrics.map((metric, mIdx) => (
                            <div key={mIdx}>
                              <div
                                className={`font-mono text-sm sm:text-base font-bold tracking-tight ${
                                  isDark ? "text-white" : "text-slate-900"
                                }`}
                              >
                                {metric.value}
                              </div>
                              <div
                                className={`text-[10px] font-mono uppercase tracking-wider mt-0.5 ${
                                  isDark ? "text-neutral-400" : "text-slate-500"
                                }`}
                              >
                                {metric.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Tech Stack Labels with Logos */}
                        <div className="flex flex-wrap items-center gap-2">
                          {activeProject.tech.map((t) => (
                            <span
                              key={t.name}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-mono font-medium border transition-colors ${
                                isDark
                                  ? "bg-white/[0.04] border-white/[0.09] text-neutral-200 hover:border-red-500/40"
                                  : "bg-purple-50/80 border-purple-200/80 text-purple-950 hover:border-purple-400 shadow-2xs"
                              }`}
                            >
                              {t.iconSrc && (
                                <img
                                  src={t.iconSrc}
                                  alt={t.name}
                                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain shrink-0 pointer-events-none"
                                  loading="lazy"
                                />
                              )}
                              <span>{t.name}</span>
                            </span>
                          ))}
                        </div>

                        {/* Action Links (if provided) */}
                        {(activeProject.liveUrl || activeProject.githubUrl) && (
                          <div className="flex flex-wrap items-center gap-3 pt-1">
                            {activeProject.liveUrl && (
                              <a
                                href={activeProject.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-white text-xs sm:text-sm font-semibold transition-all duration-300 ${
                                  isDark
                                    ? "bg-[#dc2626] hover:bg-[#ef4444]"
                                    : "bg-[#7c3aed] hover:bg-[#8b5cf6]"
                                }`}
                              >
                                <span>Live Demo</span>
                                <ArrowUpRight className="w-4 h-4" />
                              </a>
                            )}
                            {activeProject.githubUrl && (
                              <a
                                href={activeProject.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all duration-300 ${
                                  isDark
                                    ? "bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-neutral-200"
                                    : "bg-white hover:bg-purple-50 border-purple-200 text-slate-700"
                                }`}
                              >
                                <span>Source Code</span>
                              </a>
                            )}
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="tab-architecture"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className={`divide-y ${
                          isDark ? "divide-white/[0.07]" : "divide-purple-100"
                        }`}
                      >
                        {activeProject.highlights?.map((item, hIdx) => (
                          <div key={hIdx} className="py-3.5 first:pt-1 last:pb-1">
                            <div className="flex items-baseline gap-3">
                              <span
                                className={`text-xs font-mono font-bold shrink-0 ${
                                  isDark ? "text-red-500" : "text-purple-600"
                                }`}
                              >
                                {String(hIdx + 1).padStart(2, "0")}
                              </span>
                              <div className="space-y-1">
                                <h4
                                  className={`text-sm sm:text-base font-semibold tracking-tight ${
                                    isDark ? "text-white" : "text-slate-900"
                                  }`}
                                >
                                  {item.title}
                                </h4>
                                <p
                                  className={`text-xs sm:text-sm leading-relaxed ${
                                    isDark ? "text-neutral-400" : "text-slate-600"
                                  }`}
                                >
                                  {item.summary}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectShowcase;

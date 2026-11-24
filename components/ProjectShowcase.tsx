"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface Project {
  id: string;
  number: string;
  category: string;
  type: "all" | "backend" | "fullstack" | "data" | "security";
  title: string;
  tagline: string;
  description: string;
  image: string;
  metrics: { label: string; value: string }[];
  tech: string[];
  liveUrl: string;
  githubUrl: string;
}

const PROJECTS: Project[] = [
  {
    id: "pulsestream",
    number: "01",
    category: "BACKEND & DISTRIBUTED SYSTEMS",
    type: "backend",
    title: "PulseStream",
    tagline: "Asynchronous Event Ingestion Engine",
    description:
      "An event ingestion service built to handle bursty webhook traffic without dropping requests. Buffers incoming requests through Redis queues and processes them asynchronously with Celery workers, keeping p99 response times under 12ms.",
    image: "/projects/cloud-infra.jpg",
    metrics: [
      { label: "Throughput", value: "14.5k req/s" },
      { label: "P99 Latency", value: "< 12ms" },
    ],
    tech: ["FastAPI", "Python 3.12", "Redis", "PostgreSQL", "Docker", "Celery"],
    liveUrl: "https://github.com/",
    githubUrl: "https://github.com/",
  },
  {
    id: "nexus-commerce",
    number: "02",
    category: "FULL STACK WEB PLATFORM",
    type: "fullstack",
    title: "Nexus Commerce",
    tagline: "Full Stack Headless Storefront & Inventory",
    description:
      "A fast, modern e-commerce web app built with Next.js 16 and PostgreSQL. Features instant search, optimistic cart updates, an admin sales dashboard, and reliable Stripe webhook handling for orders.",
    image: "/projects/fintech.jpg",
    metrics: [
      { label: "Lighthouse", value: "99 / 100" },
      { label: "First Paint", value: "0.6s" },
    ],
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "PostgreSQL", "Stripe"],
    liveUrl: "https://github.com/",
    githubUrl: "https://github.com/",
  },
  {
    id: "datacraft",
    number: "03",
    category: "DATA PIPELINES & AUTOMATION",
    type: "data",
    title: "DataCraft",
    tagline: "Automated ETL & Data Migration Tool",
    description:
      "A data processing tool written in Python to parse, validate, and clean messy CSV and JSON feeds before importing them into relational databases. Includes automated retry logic and error logging.",
    image: "/projects/ai-agent.jpg",
    metrics: [
      { label: "Sync Speed", value: "85k rows/s" },
      { label: "Data Volume", value: "850GB+" },
    ],
    tech: ["Python", "Pandas", "MySQL", "Redis", "REST APIs", "Docker"],
    liveUrl: "https://github.com/",
    githubUrl: "https://github.com/",
  },
  {
    id: "devvault",
    number: "04",
    category: "DEVELOPER TOOLS & SECURITY",
    type: "security",
    title: "DevVault",
    tagline: "Encrypted Secrets Manager & CLI",
    description:
      "A developer utility for syncing encrypted environment variables with teammates without sending raw keys over chat. Features client-side AES-256 encryption, access logs, and a command-line interface.",
    image: "/projects/chatbot.jpg",
    metrics: [
      { label: "Encryption", value: "AES-256" },
      { label: "Sync Latency", value: "< 4ms" },
    ],
    tech: ["Node.js", "TypeScript", "Docker", "PostgreSQL", "AES-256", "Tailwind CSS"],
    liveUrl: "https://github.com/",
    githubUrl: "https://github.com/",
  },
];

const FILTER_TABS = [
  { id: "all", label: "All Projects" },
  { id: "backend", label: "Backend" },
  { id: "fullstack", label: "Full Stack" },
  { id: "data", label: "Data & ETL" },
  { id: "security", label: "Security & Tools" },
] as const;

export function ProjectShowcase() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredProjects =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.type === activeFilter);

  return (
    <section
      id="projects"
      className="relative w-full bg-[#050505] text-white py-20 sm:py-28 lg:py-36 px-4 sm:px-8 lg:px-12 select-none overflow-hidden"
    >
      {/* Subtle Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[700px] h-[500px] bg-red-600/[0.03] blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[700px] h-[500px] bg-red-600/[0.02] blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* =========================================================================
            SECTION HEADER
           ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 lg:mb-20">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-red-500 uppercase">
                Featured Work • {new Date().getFullYear()}
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Things I&apos;ve Built &amp; Shipped<span className="text-red-500">.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-neutral-400 leading-relaxed">
            A look at some of the backend services, data pipelines, and full-stack web applications I&apos;ve designed, coded, and deployed.
          </p>
        </div>

        {/* =========================================================================
            CATEGORY FILTER TABS
           ========================================================================= */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-10 sm:mb-16 scrollbar-none px-1 [webkit-overflow-scrolling:touch]">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`relative px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-mono tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? "text-white font-semibold shadow-[0_0_20px_rgba(220,38,38,0.35)]"
                    : "text-neutral-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterBg"
                    className="absolute inset-0 rounded-full bg-[#dc2626] border border-red-500/60"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            ALTERNATING PROJECT SHOWCASE LIST
           ========================================================================= */}
        <div className="space-y-20 sm:space-y-28 lg:space-y-36">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
                >
                  {/* Visual Image Showcase (Span 7) */}
                  <div
                    className={`lg:col-span-7 ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] rounded-3xl overflow-hidden border border-white/[0.09] bg-[#0c0c11] shadow-[0_30px_80px_rgba(0,0,0,0.85)] hover:border-red-500/40 hover:shadow-[0_25px_60px_rgba(220,38,38,0.2)] transition-all duration-500">
                      {/* Project Image with Smooth Hover Zoom */}
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.95] contrast-[1.05]"
                        loading="lazy"
                      />

                      {/* Ambient Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                      {/* Top Status Bar Inside Image */}
                      <div className="absolute top-3 sm:top-4 inset-x-3 sm:inset-x-4 flex items-center justify-between text-xs font-mono">
                        <span className="px-2.5 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-neutral-300 font-semibold tracking-wider text-[11px] sm:text-xs">
                          {project.number} / 04
                        </span>

                        <span className="px-2.5 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-red-400 font-medium tracking-widest text-[9.5px] sm:text-xs uppercase truncate max-w-[180px] sm:max-w-none">
                          {project.category}
                        </span>
                      </div>

                      {/* Bottom Status Pill Inside Image */}
                      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 flex items-center gap-2 px-3 py-1 sm:py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] sm:text-xs font-mono text-neutral-300">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                        <span>Shipped &amp; Tested</span>
                      </div>
                    </div>
                  </div>

                  {/* Project Details & Specification (Span 5) */}
                  <div
                    className={`lg:col-span-5 space-y-5 sm:space-y-6 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    {/* Category Kicker */}
                    <div className="flex items-center gap-2 font-mono text-xs text-red-500 font-semibold tracking-[0.2em] uppercase">
                      <span>✦</span>
                      <span>{project.category}</span>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight group-hover:text-red-50 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm sm:text-base font-mono text-neutral-400 mt-1.5">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Clear Description */}
                    <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed">
                      {project.description}
                    </p>

                    {/* High-Impact Performance Metrics Chips */}
                    <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/[0.08]">
                      {project.metrics.map((metric, mIdx) => (
                        <div key={mIdx} className="flex flex-col">
                          <span className="font-mono text-base sm:text-lg font-bold text-white tracking-tight">
                            {metric.value}
                          </span>
                          <span className="text-[10px] sm:text-xs font-mono text-neutral-400 uppercase tracking-wider mt-0.5">
                            {metric.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 text-xs font-mono font-medium tracking-wide"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 pt-2">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none justify-center inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-[#dc2626] hover:bg-[#ef4444] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] transition-all duration-300 cursor-pointer text-center"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none justify-center inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-neutral-200 hover:text-white text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer text-center"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          />
                        </svg>
                        <span>Source Code</span>
                      </a>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default ProjectShowcase;

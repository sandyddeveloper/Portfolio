"use client";

import React from "react";
import { Timeline, TimelineEntry } from "@/components/ui/timeline";

export function ExperienceTimeline() {
  const data: TimelineEntry[] = [
    {
      title: "2026 – Present",
      content: (
        <div className="relative group">
          {/* Card Container */}
          <div className="relative rounded-2xl bg-[#0d0d12]/90 border border-white/[0.08] p-4 sm:p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-red-500/40 hover:shadow-[0_20px_50px_rgba(220,38,38,0.15)] transition-all duration-300">
            {/* Header: Role & Company */}
            <div className="mb-3 sm:mb-4">
              <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
                Full Stack Developer
              </h4>
              <div className="mt-1">
                <span className="text-base font-semibold text-red-400">
                  datamoo.ai
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              Building full-stack web applications and AI-driven features at datamoo.ai. I work across the stack—crafting clean, responsive user interfaces in Next.js and writing reliable backend services and APIs in Python and Node.js.
            </p>

            {/* Key Accomplishments */}
            <div className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
              <div className="flex items-start gap-2.5">
                <span className="text-red-500 mt-1 font-bold">▹</span>
                <span>
                  Built interactive analytics dashboards and user workflows in Next.js, React, and Tailwind CSS.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-red-500 mt-1 font-bold">▹</span>
                <span>
                  Developed REST APIs, background job workers, and database models using Python, FastAPI, and PostgreSQL.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-red-500 mt-1 font-bold">▹</span>
                <span>
                  Configured Redis caching to reduce database load, improved SQL query performance, and helped containerize services with Docker.
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Dec 2025 – Apr 2026",
      content: (
        <div className="relative group">
          {/* Card Container */}
          <div className="relative rounded-2xl bg-[#0d0d12]/90 border border-white/[0.08] p-4 sm:p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-red-500/40 hover:shadow-[0_20px_50px_rgba(220,38,38,0.15)] transition-all duration-300">
            {/* Header: Role & Company */}
            <div className="mb-3 sm:mb-4">
              <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
                Software Developer Intern
              </h4>
              <div className="mt-1">
                <span className="text-base font-semibold text-red-400">
                  datamoo.ai
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              Helped build and test new product features across the frontend and backend. Built reusable React components, integrated RESTful APIs, and wrote automated scripts for data handling.
            </p>

            {/* Key Accomplishments */}
            <div className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
              <div className="flex items-start gap-2.5">
                <span className="text-red-500 mt-1 font-bold">▹</span>
                <span>
                  Developed modular UI screens in React and connected them with backend Python endpoints.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-red-500 mt-1 font-bold">▹</span>
                <span>
                  Created data transformation scripts and resolved API bottlenecks across high-traffic data tables.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-red-500 mt-1 font-bold">▹</span>
                <span>
                  Took part in daily agile standups, code reviews, and wrote automated unit tests.
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Apr 2024 – Oct 2024",
      content: (
        <div className="relative group">
          {/* Card Container */}
          <div className="relative rounded-2xl bg-[#0d0d12]/90 border border-white/[0.08] p-4 sm:p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-red-500/40 hover:shadow-[0_20px_50px_rgba(220,38,38,0.15)] transition-all duration-300">
            {/* Header: Role & Company */}
            <div className="mb-3 sm:mb-4">
              <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
                Python Developer Intern
              </h4>
              <div className="mt-1">
                <span className="text-base font-semibold text-red-400">
                  Shiash Info Solutions Private Limited
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              Focused on backend scripting and automation. Built data parsing routines, wrote SQL queries for MySQL databases, and helped debug backend utilities for internal client tools.
            </p>

            {/* Key Accomplishments */}
            <div className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
              <div className="flex items-start gap-2.5">
                <span className="text-red-500 mt-1 font-bold">▹</span>
                <span>
                  Wrote Python scripts to automate batch data extraction, cleaning, and file generation.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-red-500 mt-1 font-bold">▹</span>
                <span>
                  Designed relational database schemas, wrote optimized SQL queries, and maintained data integrity.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-red-500 mt-1 font-bold">▹</span>
                <span>
                  Assisted senior engineers in troubleshooting API issues and writing clear technical documentation.
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="experience" className="relative w-full overflow-hidden py-10">
      <Timeline
        data={data}
        title="Experience & Milestones"
        description="Where I've worked, the teams I've contributed to, and what I built along the way."
      />
    </section>
  );
}

export default ExperienceTimeline;

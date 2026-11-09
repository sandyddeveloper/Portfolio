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
              Leading the development of end-to-end full-stack architectures and intelligent AI-driven applications at datamoo.ai. Engineering responsive frontend interfaces, reactive data streams, and robust backend microservices.
            </p>

            {/* Key Accomplishments */}
            <div className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
              <div className="flex items-start gap-2.5">
                <span className="text-red-500 mt-1 font-bold">▹</span>
                <span>
                  Engineered scalable web applications and real-time AI dashboards using Next.js, React, and TypeScript.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-red-500 mt-1 font-bold">▹</span>
                <span>
                  Architected high-throughput backend services and asynchronous API endpoints in Python & Node.js.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-red-500 mt-1 font-bold">▹</span>
                <span>
                  Collaborated on database design, caching optimization, and production cloud infrastructure deployments.
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
              Contributed to core product features and frontend-to-backend integrations at datamoo.ai. Developed modular UI components, consumed RESTful services, and optimized data delivery pipelines for analytics platforms.
            </p>

            {/* Key Accomplishments */}
            <div className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
              <div className="flex items-start gap-2.5">
                <span className="text-red-500 mt-1 font-bold">▹</span>
                <span>
                  Developed scalable user interfaces and automated workflow triggers using React and Python.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-red-500 mt-1 font-bold">▹</span>
                <span>
                  Integrated RESTful APIs, optimized data transformation schemas, and resolved latency bottlenecks.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-red-500 mt-1 font-bold">▹</span>
                <span>
                  Participated in daily agile standups, peer code reviews, and automated testing suites.
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
              Engineered backend Python solutions, automated batch data processing, and built database interaction layers at Shiash Info Solutions. Focused on clean code patterns, script automation, and performance reliability.
            </p>

            {/* Key Accomplishments */}
            <div className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
              <div className="flex items-start gap-2.5">
                <span className="text-red-500 mt-1 font-bold">▹</span>
                <span>
                  Developed Python scripts for automated ETL processing, data parsing, and file management.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-red-500 mt-1 font-bold">▹</span>
                <span>
                  Designed and optimized relational database schemas and SQL queries in MySQL.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-red-500 mt-1 font-bold">▹</span>
                <span>
                  Implemented core API utilities and assisted in debugging and testing enterprise modules.
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
        description="A timeline of my journey from Python automation intern to Full Stack Developer building production web platforms."
      />
    </section>
  );
}

export default ExperienceTimeline;

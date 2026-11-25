"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { TechStack3DBackground } from "./TechStack3DBackground";
import { useTheme } from "@/context/ThemeContext";

interface TechItem {
  name: string;
  iconSrc: string;
}

// Exactly 42 technologies using real downloaded logos in public/tech/
// Arranged in an inverted pyramid wedge: 12 -> 10 -> 8 -> 6 -> 4 -> 2
const TECH_ROWS: TechItem[][] = [
  // ROW 1: 12 Items - Languages & Frontend Frameworks
  [
    { name: "Python", iconSrc: "/tech/python.svg" },
    { name: "JavaScript", iconSrc: "/tech/javascript.svg" },
    { name: "TypeScript", iconSrc: "/tech/typescript.svg" },
    { name: "HTML5", iconSrc: "/tech/html5.svg" },
    { name: "CSS3", iconSrc: "/tech/css3.svg" },
    { name: "React", iconSrc: "/tech/react.svg" },
    { name: "Next.js", iconSrc: "/tech/nextjs.svg" },
    { name: "Vite", iconSrc: "/tech/vite.svg" },
    { name: "Tailwind", iconSrc: "/tech/tailwind.svg" },
    { name: "Bootstrap", iconSrc: "/tech/bootstrap.svg" },
    { name: "shadcn/ui", iconSrc: "/tech/shadcn.svg" },
    { name: "Aceternity", iconSrc: "/tech/aceternity.svg" },
  ],

  // ROW 2: 10 Items - Backend, Services, Data & APIs
  [
    { name: "Node.js", iconSrc: "/tech/nodejs.svg" },
    { name: "Django", iconSrc: "/tech/django.svg" },
    { name: "Flask", iconSrc: "/tech/flask.svg" },
    { name: "Celery", iconSrc: "/tech/celery.svg" },
    { name: "Redis", iconSrc: "/tech/redis.svg" },
    { name: "Pandas", iconSrc: "/tech/pandas.svg" },
    { name: "NumPy", iconSrc: "/tech/numpy.svg" },
    { name: "OpenCV", iconSrc: "/tech/opencv.svg" },
    { name: "REST API", iconSrc: "/tech/restapi.svg" },
    { name: "3rd-Party APIs", iconSrc: "/tech/apis.svg" },
  ],

  // ROW 3: 8 Items - Databases, Tools & Containerization
  [
    { name: "SQL", iconSrc: "/tech/sql.svg" },
    { name: "PostgreSQL", iconSrc: "/tech/postgresql.svg" },
    { name: "pgAdmin", iconSrc: "/tech/pgadmin.svg" },
    { name: "Workbench", iconSrc: "/tech/workbench.svg" },
    { name: "Firebase", iconSrc: "/tech/firebase.svg" },
    { name: "Docker", iconSrc: "/tech/docker.svg" },
    { name: "Git", iconSrc: "/tech/git.svg" },
    { name: "GitHub", iconSrc: "/tech/github.svg" },
  ],

  // ROW 4: 6 Items - AI, Automation & Workflows
  [
    { name: "OpenAI", iconSrc: "/tech/openai.svg" },
    { name: "Gemini", iconSrc: "/tech/gemini.svg" },
    { name: "Chatbots", iconSrc: "/tech/chatbots.svg" },
    { name: "Automation", iconSrc: "/tech/automation.svg" },
    { name: "ETL", iconSrc: "/tech/etl.svg" },
    { name: "Pipelines", iconSrc: "/tech/pipelines.svg" },
  ],

  // ROW 5: 4 Items - Dev Tools & IDEs
  [
    { name: "Postman", iconSrc: "/tech/postman.svg" },
    { name: "Bruno", iconSrc: "/tech/bruno.svg" },
    { name: "VS Code", iconSrc: "/tech/vscode.svg" },
    { name: "Antigravity", iconSrc: "/tech/antigravity.svg" },
  ],

  // ROW 6: 2 Items - Deployment & Delivery
  [
    { name: "Vercel", iconSrc: "/tech/vercel.svg" },
    { name: "CI/CD", iconSrc: "/tech/cicd.svg" },
  ],
];

export function TechStackGrid() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <section
      id="skills"
      className="relative w-full py-12 sm:py-20 px-1 sm:px-4 select-none overflow-hidden min-h-[640px] sm:min-h-[920px] flex flex-col items-center justify-center transition-colors duration-500"
    >
      {/* 
        3D BACKGROUND ANIMATION:
        Using public/video.webm with the purple gravitational funnel grid and 3D holographic orb
      */}
      <TechStack3DBackground />

      {/* Header: Exact TECH STACK Title matching video */}
      <div className="relative z-10 text-center mb-6 sm:mb-14">
        <h2
          className={`text-3xl sm:text-6xl md:text-7xl font-black tracking-widest uppercase ${
            isDark
              ? "text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
              : "text-slate-900 drop-shadow-[0_4px_25px_rgba(124,58,237,0.18)]"
          }`}
        >
          TECH STACK
        </h2>
        <div
          className={`w-16 sm:w-24 h-1 mx-auto mt-3 sm:mt-4 rounded-full ${
            isDark
              ? "bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_12px_rgba(239,68,68,0.85)]"
              : "bg-gradient-to-r from-transparent via-purple-600 to-transparent shadow-[0_0_12px_rgba(124,58,237,0.85)]"
          }`}
        />
      </div>

      {/* 
        INVERTED PYRAMID WEDGE CONTAINER (DESKTOP) & TOUCH-FRIENDLY GRID (MOBILE)
      */}
      <div className="relative z-10 w-full py-2 sm:py-4 px-1 sm:px-2">
        {/* Mobile Responsive Touch Grid (Under md) */}
        <div className="md:hidden w-full max-w-xl mx-auto px-2">
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-2.5">
            {TECH_ROWS.flat().map((tech) => (
              <motion.div
                key={tech.name}
                whileTap={{ scale: 0.94 }}
                className={`group relative flex flex-col items-center justify-center p-2 rounded-xl backdrop-blur-xl transition-colors ${
                  isDark
                    ? "bg-[#0d0d14]/85 border border-white/[0.08] shadow-md hover:border-red-500/50"
                    : "bg-white/90 border border-purple-200 shadow-sm hover:border-purple-500/50"
                }`}
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center">
                  <img
                    src={tech.iconSrc}
                    alt={tech.name}
                    className="w-full h-full object-contain pointer-events-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]"
                    loading="lazy"
                  />
                </div>
                <span
                  className={`text-[10px] font-sans font-medium tracking-tight mt-1 truncate max-w-full text-center ${
                    isDark ? "text-neutral-300" : "text-slate-800"
                  }`}
                >
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop Inverted Pyramid Wedge (md and above) */}
        <div className="hidden md:flex w-full max-w-6xl mx-auto flex-col items-center gap-3.5 md:gap-4">
          {TECH_ROWS.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex items-center justify-center gap-2.5 md:gap-3 lg:gap-3.5 flex-nowrap"
            >
              {row.map((tech) => {
                const isHovered = hoveredTech === tech.name;

                return (
                  <motion.div
                    key={tech.name}
                    onMouseEnter={() => setHoveredTech(tech.name)}
                    onMouseLeave={() => setHoveredTech(null)}
                    whileHover={{ scale: 1.18, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 22,
                    }}
                    className={cn(
                      "group relative flex flex-col items-center justify-center cursor-pointer select-none",
                      "w-16 h-16 md:w-[72px] md:h-[72px] lg:w-[82px] lg:h-[82px]",
                      "rounded-2xl backdrop-blur-xl transition-all duration-300",
                      isDark
                        ? [
                            "bg-[#0d0d14]/80 border border-white/[0.08]",
                            "shadow-[0_4px_20px_rgba(0,0,0,0.6)]",
                            isHovered
                              ? "z-30 border-red-500/90 shadow-[0_0_25px_rgba(239,68,68,0.7),0_0_50px_rgba(220,38,38,0.4)] bg-white/[0.08]"
                              : "hover:border-white/20",
                          ]
                        : [
                            "bg-white/90 border border-purple-100",
                            "shadow-[0_4px_20px_rgba(124,58,237,0.08)]",
                            isHovered
                              ? "z-30 border-purple-600 shadow-[0_0_25px_rgba(124,58,237,0.45),0_0_50px_rgba(168,85,247,0.25)] bg-purple-50"
                              : "hover:border-purple-300",
                          ]
                    )}
                  >
                    {/* Subtle Inner Glass Reflection */}
                    <div
                      className={`absolute inset-0 rounded-2xl pointer-events-none ${
                        isDark
                          ? "bg-gradient-to-b from-white/[0.08] to-transparent"
                          : "bg-gradient-to-b from-purple-500/[0.06] to-transparent"
                      }`}
                    />

                    {/* Real Logo Image */}
                    <div className="relative z-10 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center">
                      <img
                        src={tech.iconSrc}
                        alt={tech.name}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 pointer-events-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                        loading="lazy"
                      />
                    </div>

                    {/* Name Label */}
                    <span
                      className={cn(
                        "relative z-10 text-[9.5px] md:text-[10px] lg:text-[10.5px] font-sans font-medium tracking-tight mt-1.5 transition-colors duration-200 truncate max-w-[54px] md:max-w-[66px] text-center",
                        isDark
                          ? isHovered
                            ? "text-white font-semibold"
                            : "text-neutral-400"
                          : isHovered
                          ? "text-purple-950 font-bold"
                          : "text-slate-600"
                      )}
                    >
                      {tech.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechStackGrid;

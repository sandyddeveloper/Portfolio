
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowUpRight as Github } from "lucide-react";

interface Project {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
}

const PROJECTS: Project[] = [
  {
    id: "pulsestream",
    number: "01",
    category: "BACKEND ENGINEERING",
    title: "PulseStream",
    description:
      "An asynchronous event processing system designed to handle webhook ingestion, background tasks, distributed queues and reliable event processing.",
    image: "/projects/cloud-infra.jpg",
    tech: ["FastAPI", "Python", "Redis", "PostgreSQL", "Celery"],
    liveUrl: "https://github.com/",
    githubUrl: "https://github.com/",
  },
  {
    id: "nexus-commerce",
    number: "02",
    category: "FULL STACK DEVELOPMENT",
    title: "Nexus Commerce",
    description:
      "A modern commerce platform featuring product management, inventory tracking, responsive interfaces and payment integration.",
    image: "/projects/fintech.jpg",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    liveUrl: "https://github.com/",
    githubUrl: "https://github.com/",
  },
  {
    id: "datacraft",
    number: "03",
    category: "DATA ENGINEERING",
    title: "DataCraft",
    description:
      "A data processing and migration tool that transforms different data sources into structured relational databases with validation and error handling.",
    image: "/projects/ai-agent.jpg",
    tech: ["Python", "Pandas", "MySQL", "Redis", "Docker"],
    liveUrl: "https://github.com/",
    githubUrl: "https://github.com/",
  },
  {
    id: "devvault",
    number: "04",
    category: "DEVELOPER TOOLS",
    title: "DevVault",
    description:
      "A developer-focused secrets management tool for securely managing environment variables, team access and configuration synchronization.",
    image: "/projects/chatbot.jpg",
    tech: ["Node.js", "TypeScript", "PostgreSQL", "Docker"],
    liveUrl: "https://github.com/",
    githubUrl: "https://github.com/",
  },
];

export function ProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".project-row");

      rows.forEach((row) => {
        gsap.fromTo(
          row,
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full bg-[#080808] text-white py-24 sm:py-32"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 sm:mb-24">

          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 mb-5">
              Selected Work / 2026
            </p>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight">
              Things I&apos;ve built<span className="text-neutral-500">.</span>
            </h2>
          </div>

          <p className="max-w-xs text-sm text-neutral-500 leading-relaxed">
            A collection of projects, experiments and engineering work
            focused on building useful software.
          </p>
        </div>

        {/* Projects */}
        <div className="border-t border-white/10">

          {PROJECTS.map((project, index) => (
            <article
              key={project.id}
              className="project-row group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 py-12 sm:py-16 border-b border-white/10"
            >

              {/* Project Image */}
              <div
                className={`relative overflow-hidden bg-[#111] aspect-[16/10] rounded-sm ${index % 2 !== 0 ? "lg:order-2" : ""
                  }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />

                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Project Details */}
              <div className="flex flex-col justify-center">

                {/* Category & Number */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-mono tracking-[0.15em] text-neutral-500 uppercase">
                    {project.category}
                  </span>

                  <span className="text-sm font-mono text-neutral-600">
                    {project.number} / 04
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-5 group-hover:text-neutral-300 transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-neutral-400 leading-7 max-w-lg">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-x-5 gap-y-3 mt-8">
                  {project.tech.map((technology) => (
                    <span
                      key={technology}
                      className="text-xs font-mono text-neutral-500"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-7 mt-10 pt-7 border-t border-white/10">

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-white hover:text-neutral-400 transition-colors"
                  >
                    Live Demo
                    <ArrowUpRight size={16} />
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    <Github size={16} />
                    Source Code
                  </a>

                </div>
              </div>
            </article>
          ))}

        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 pt-8 text-xs font-mono text-neutral-600">
          <span>© 2026 Santhosh Raj</span>
          <span>Designed with simplicity in mind.</span>
        </div>

      </div>
    </section>
  );
}

export default ProjectShowcase;

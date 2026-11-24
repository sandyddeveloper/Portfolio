"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-3.5 left-3.5 sm:top-8 sm:left-10 z-50 select-none flex items-center p-1.5 sm:p-2",
        className
      )}
    >
      <Link
        href="/"
        className="group relative flex items-center gap-1.5 text-black text-[#000000] dark:text-white no-underline transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
        aria-label="SanthoshRajK Home"
      >
        {/* Main Logo Text */}
        <span className="font-bold text-lg sm:text-2xl tracking-tight font-sans text-[#000000]">
          SanthoshRajK
        </span>
      </Link>
    </motion.div>
  );
}

export default Logo;

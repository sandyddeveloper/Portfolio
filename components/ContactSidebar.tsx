"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { PaperPlaneContact } from "./PaperPlaneContact";
import { useTheme } from "@/context/ThemeContext";
import { isHireEnabled } from "@/lib/config";

interface ContactSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactSidebar({ isOpen, onClose }: ContactSidebarProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Slide-over Drawer Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
              mass: 0.8,
            }}
            className={cn(
              "relative z-10 w-full max-w-xl h-full overflow-y-auto backdrop-blur-2xl transition-colors duration-500",
              "flex flex-col justify-between p-4 sm:p-8",
              isDark
                ? "bg-[#09090d]/95 border-l border-white/[0.08] shadow-[-20px_0_60px_rgba(0,0,0,0.85)] text-white"
                : "bg-white/95 border-l border-purple-200 shadow-[-20px_0_60px_rgba(124,58,237,0.15)] text-slate-900"
            )}
            role="dialog"
            aria-modal="true"
            aria-label={isHireEnabled ? "Contact and Hire Drawer" : "Contact Drawer"}
          >
            {/* Header: Title on left, Close button on right */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-2.5">
                <h2
                  className={`text-2xl sm:text-3xl font-bold tracking-tight leading-tight ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  Let&apos;s Connect
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className={`w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center transition-all cursor-pointer hover:rotate-90 ${
                    isDark
                      ? "text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10"
                      : "text-slate-600 hover:text-purple-600 bg-purple-50 hover:bg-purple-100 border border-purple-200"
                  }`}
                  aria-label="Close contact sidebar"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <p
                className={`text-sm leading-relaxed mb-4 ${
                  isDark ? "text-neutral-400" : "text-slate-600"
                }`}
              >
                {isHireEnabled
                  ? "Have an open role, an interesting project, or just want to chat about engineering? Drop a note below and I'll get right back to you."
                  : "Have an interesting project, or just want to chat about engineering? Drop a note below and I'll get right back to you."}
              </p>
            </div>

            {/* Aceternity Paper Plane Send Component */}
            <div className="my-auto py-2">
              <PaperPlaneContact
                recipientName="Santhosh"
                onClose={onClose}
              />
            </div>

            {/* Bottom minimal note */}
            <div className="pt-4 text-center">
              <span
                className={`text-[11px] font-mono tracking-wider ${
                  isDark ? "text-neutral-500" : "text-purple-900/60 font-semibold"
                }`}
              >
                DIRECT INBOX • TYPICALLY REPLIES WITHIN 24 HOURS
              </span>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ContactSidebar;

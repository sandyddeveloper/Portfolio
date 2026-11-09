"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { PaperPlaneContact } from "./PaperPlaneContact";

interface ContactSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactSidebar({ isOpen, onClose }: ContactSidebarProps) {
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
              "relative z-10 w-full max-w-xl h-full overflow-y-auto",
              "bg-[#09090d]/95 backdrop-blur-2xl border-l border-white/[0.08]",
              "shadow-[-20px_0_60px_rgba(0,0,0,0.85)]",
              "flex flex-col justify-between p-6 sm:p-8"
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Contact and Hire Drawer"
          >
            {/* Header: Title on left, Close button on right */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-2.5">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                  Let&apos;s Build Together
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer hover:rotate-90"
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
              <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                Have an open role, ambitious project, or creative tech idea? Type your message below and watch it fly directly to my desk.
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
              <span className="text-[11px] font-mono text-neutral-600 tracking-wider">
                DIRECT DESK DISPATCH • REPLIES WITHIN 24 HOURS
              </span>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ContactSidebar;

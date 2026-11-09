"use client";

import React from "react";

interface FooterProps {
  onOpenContact?: () => void;
}

export function Footer({}: FooterProps) {
  return (
    <>
      <footer
        id="footer"
        className="relative flex flex-col justify-end bg-black pt-8 sm:pt-14 px-3 sm:px-6 md:px-8 overflow-hidden w-full select-none z-10 border-t border-white/[0.06]"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-purple-600/[0.07] blur-[140px] rounded-full pointer-events-none" />

        <div className="w-full relative z-10 flex flex-col items-center text-center">
          {/* Sub-Footer Copyright */}
          <div className="w-full flex items-center justify-center relative z-10 pb-3">
            <p className="text-[11px] sm:text-sm text-white/50 tracking-wider font-medium">
              © 2026 SanthoshRajK. All rights reserved.
            </p>
          </div>

          {/* Signature Typography Watermark (Fitted edge-to-edge across all mobile and desktop screens) */}
          <div className="w-full flex justify-center mt-3 sm:mt-8 mb-[-1%] overflow-hidden">
            <h1 className="w-full text-center font-extrabold tracking-tighter leading-[0.70] text-zinc-900 text-[clamp(2.75rem,14vw,20rem)] pointer-events-none select-none uppercase transition-colors duration-500 hover:text-zinc-800 whitespace-nowrap">
              SANTHOSH
            </h1>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;

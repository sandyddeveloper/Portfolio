"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface PaperPlaneContactProps {
  recipientName?: string;
  onClose?: () => void;
  className?: string;
}

type AnimationStep =
  | "IDLE"          // Typing note
  | "SHEET"         // Postcard sheet rises up cleanly
  | "FOLD_CORNERS"  // Top corners fold down into clean triangular roof
  | "FOLD_WINGS"    // Wings fold inward into the iconic 3D paper airplane
  | "FLYING"        // Aerodynamic flight along the high swooping arc
  | "LANDED"        // Dives into button -> "Sent"
  | "RECEIPT";      // Confirmation receipt

// Tactile audio cues (subtle, synthesized, non-blocking)
function playTone(type: "fold" | "whoosh" | "ding") {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (type === "fold") {
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buf;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1000, now);
      filter.Q.setValueAtTime(2, now);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);
    } else if (type === "whoosh") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.35);
      osc.frequency.exponentialRampToValueAtTime(160, now + 1.3);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.045, now + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.3);
    } else if (type === "ding") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(1320, now + 0.06);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
    }
  } catch {
    // Ignore audio errors
  }
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function PaperPlaneContact({
  recipientName = "Santhosh",
  onClose,
  className,
}: PaperPlaneContactProps) {
  const [note, setNote] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<AnimationStep>("IDLE");
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const sendBtnRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Dynamic Flight Curve State
  const [flightPathD, setFlightPathD] = useState("");
  const [totalPathLength, setTotalPathLength] = useState(0);
  const [planeCoords, setPlaneCoords] = useState<{
    x: number;
    y: number;
    angle: number;
    scale: number;
    opacity: number;
  }>({
    x: 0,
    y: 0,
    angle: 0,
    scale: 1,
    opacity: 0,
  });
  const [contrailOffset, setContrailOffset] = useState(0);

  const flightPathSvgRef = useRef<SVGPathElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Date and time initialization
  useEffect(() => {
    const updateTimeAndDate = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
      setCurrentDate(
        now.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }).toUpperCase()
      );
    };

    updateTimeAndDate();
    const interval = setInterval(updateTimeAndDate, 30000);
    return () => clearInterval(interval);
  }, []);

  // Compute the exact graceful flight curve from the left launch position into the Send button
  const computeFlightTrajectory = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    let targetX = containerRect.width - 65;
    let targetY = 350;

    if (sendBtnRef.current) {
      const btnRect = sendBtnRef.current.getBoundingClientRect();
      targetX = btnRect.left - containerRect.left + btnRect.width / 2;
      targetY = btnRect.top - containerRect.top + btnRect.height / 2;
    }

    // Launch starts from left-center where the folded plane stands: x ~ 100, y ~ 150
    const startX = Math.max(containerRect.width * 0.22, 90);
    const startY = 150;

    // High soaring roller-coaster arc like the original video:
    // Sweeps forward & climbs to crest at top-right, then curves down into button
    const cp1X = startX + (targetX - startX) * 0.45;
    const cp1Y = -15; // Climbs high above the card

    const cp2X = targetX + 45;
    const cp2Y = 60;

    const path = `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${cp1X.toFixed(1)} ${cp1Y.toFixed(1)}, ${cp2X.toFixed(1)} ${cp2Y.toFixed(1)}, ${targetX.toFixed(1)} ${targetY.toFixed(1)}`;
    setFlightPathD(path);
  }, []);

  // Flight Engine (Samples curve tangent at 60fps for true aerodynamic banking)
  const startFlightEngine = useCallback(() => {
    computeFlightTrajectory();
    playTone("whoosh");

    setTimeout(() => {
      const pathEl = flightPathSvgRef.current;
      if (!pathEl) return;
      const len = pathEl.getTotalLength();
      setTotalPathLength(len);
      setContrailOffset(len);

      const duration = 1850; // 1.85s smooth glider flight
      const startTime = performance.now();

      const animate = (time: number) => {
        const elapsed = time - startTime;
        const rawProgress = Math.min(elapsed / duration, 1);
        const easeProgress = easeInOutCubic(rawProgress);

        const currentDist = easeProgress * len;
        const pt = pathEl.getPointAtLength(currentDist);
        const lookAhead = Math.min(currentDist + 4, len);
        const nextPt = pathEl.getPointAtLength(lookAhead);

        const dx = nextPt.x - pt.x;
        const dy = nextPt.y - pt.y;
        const tangentAngle = Math.atan2(dy, dx) * (180 / Math.PI);

        let scale = 0.95;
        let opacity = 1;

        // Smoothly shrink into the Send button at the very end
        if (rawProgress > 0.75) {
          const exitT = (rawProgress - 0.75) / 0.25;
          scale = 0.95 * (1 - exitT * 0.92);
          if (rawProgress > 0.92) {
            opacity = 1 - (rawProgress - 0.92) / 0.08;
          }
        }

        setPlaneCoords({
          x: pt.x,
          y: pt.y,
          angle: tangentAngle,
          scale,
          opacity,
        });

        // Contrail continuously connects from launch point to plane's tail
        setContrailOffset(len * (1 - easeProgress));

        if (rawProgress < 1) {
          animFrameRef.current = requestAnimationFrame(animate);
        } else {
          playTone("ding");
          setStep("LANDED");
          setTimeout(() => {
            setStep("RECEIPT");
          }, 700);
        }
      };

      animFrameRef.current = requestAnimationFrame(animate);
    }, 40);
  }, [computeFlightTrajectory]);

  // Clean up
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // MASTER TIMELINE:
  // 1. Postcard Sheet Rises (0 to 800ms)
  // 2. Corner Fold: Top corners fold down into triangle (800ms to 1700ms)
  // 3. Wing Fold: Wings fold inward into the iconic 3D paper airplane (1700ms to 2600ms)
  // 4. Flight: Glider flight along the glorious arc into the button (2600ms to 4450ms)
  // 5. Landed -> Receipt
  const handleSend = () => {
    if (!note.trim()) return;

    // Stage 1: Sheet emerges
    setStep("SHEET");
    playTone("fold");

    // Stage 2: Corner Fold
    setTimeout(() => {
      setStep("FOLD_CORNERS");
      playTone("fold");
    }, 900);

    // Stage 3: Wing Fold into 3D Paper Airplane
    setTimeout(() => {
      setStep("FOLD_WINGS");
      playTone("fold");
    }, 1800);

    // Stage 4: Launch Flight
    setTimeout(() => {
      setStep("FLYING");
      startFlightEngine();
    }, 2700);
  };

  const handleWriteAnother = () => {
    setNote("");
    setEmail("");
    setStep("IDLE");
    setTimeout(() => textareaRef.current?.focus(), 150);
  };

  const handleEditAndResend = () => {
    setStep("IDLE");
    setTimeout(() => textareaRef.current?.focus(), 150);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full max-w-lg mx-auto select-none", className)}
    >
      {/* 
        3D ORIGAMI ARENA (260px tall)
        Displays the postcard sheet folding cleanly into the 3D paper airplane
      */}
      <div className="relative w-full h-[260px] pointer-events-none flex items-center justify-center overflow-visible">
        <AnimatePresence mode="wait">
          {/* 
            STAGE 1: Clean Flat Postcard Sheet (Frame 00:01 & 00:02)
            White paper, single dashed inset border, uppercase date, user note, and AIR MAIL stamp
          */}
          {step === "SHEET" && (
            <motion.div
              key="stage-sheet"
              initial={{ opacity: 0, y: 70, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[280px] h-[210px] bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-4 border border-neutral-200 overflow-hidden"
            >
              {/* Single clean dashed border inset around perimeter (NO crosshairs) */}
              <div className="absolute inset-2.5 border border-dashed border-neutral-300 rounded-lg pointer-events-none" />

              {/* Header: Date + AIR MAIL Stamp with wavy lines */}
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block font-bold">
                    {currentDate || "NOVEMBER 1, 2026"}
                  </span>
                  {email && (
                    <span className="text-[10px] font-mono text-neutral-400 block mt-0.5 truncate max-w-[150px]">
                      From: {email}
                    </span>
                  )}
                </div>

                {/* Stamp & Cancellation Waves */}
                <div className="flex items-center gap-1.5">
                  <svg
                    width="26"
                    height="18"
                    viewBox="0 0 28 20"
                    fill="none"
                    className="text-neutral-400 stroke-current opacity-70"
                  >
                    <path
                      d="M0 5C4 2 8 8 12 5C16 2 20 8 24 5C26 3.5 27 3.5 28 5"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0 11C4 8 8 14 12 11C16 8 20 14 24 11C26 9.5 27 9.5 28 11"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0 17C4 14 8 20 12 17C16 14 20 20 24 17C26 15.5 27 15.5 28 17"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Stamp */}
                  <div className="w-9 h-11 bg-[#2563eb] rounded flex flex-col items-center justify-center text-white shadow-sm border border-blue-400/50 p-1">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    <span className="text-[6px] font-black uppercase tracking-tight mt-0.5">
                      AIR MAIL
                    </span>
                  </div>
                </div>
              </div>

              {/* Note Content printed on the letter */}
              <div className="relative z-10 mt-3 font-sans text-xs text-neutral-800 font-medium leading-relaxed max-h-[110px] overflow-hidden break-words line-clamp-4">
                {note}
              </div>
            </motion.div>
          )}

          {/* 
            STAGE 2: Corner Fold into Classic Origami House Shape (Frame 00:03)
            Top corners fold diagonally down meeting at center crease, bottom rectangle remains clean
          */}
          {step === "FOLD_CORNERS" && (
            <motion.div
              key="stage-corners"
              initial={{ opacity: 0.9, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="relative w-[280px] h-[210px] flex items-center justify-center filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.55)]"
            >
              <svg width="280" height="210" viewBox="0 0 280 210">
                {/* 1. Bottom Sheet Body (Clean rectangle with dashed border and user note) */}
                <rect
                  x="20"
                  y="105"
                  width="240"
                  height="95"
                  rx="6"
                  fill="#ffffff"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
                <rect
                  x="26"
                  y="111"
                  width="228"
                  height="83"
                  rx="4"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="1"
                  strokeDasharray="4 3"
                />
                <foreignObject x="30" y="115" width="220" height="75">
                  <div className="text-[11px] font-sans text-neutral-800 font-medium leading-tight line-clamp-3 p-1">
                    {note}
                  </div>
                </foreignObject>

                {/* 2. Top Folded Triangle Roof */}
                {/* Left corner flap */}
                <polygon
                  points="140,15 20,105 140,105"
                  fill="#ffffff"
                  stroke="#cbd5e1"
                  strokeWidth="0.8"
                />
                {/* Right corner flap (subtle ambient paper shade) */}
                <polygon
                  points="140,15 260,105 140,105"
                  fill="#f1f5f9"
                  stroke="#cbd5e1"
                  strokeWidth="0.8"
                />

                {/* Center crease line */}
                <line
                  x1="140"
                  y1="15"
                  x2="140"
                  y2="200"
                  stroke="#94a3b8"
                  strokeWidth="1.2"
                  strokeDasharray="3 2"
                />
              </svg>
            </motion.div>
          )}

          {/* 
            STAGE 3: 3D Paper Airplane Geometry (Frame 00:04)
            The iconic dart airplane: sharp apex, center spine crease, direct-lit & shaded wings
          */}
          {step === "FOLD_WINGS" && (
            <motion.div
              key="stage-airplane"
              initial={{ opacity: 0, scale: 0.9, rotateX: 25 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.45 }}
              style={{ perspective: 1000 }}
              className="relative w-[280px] h-[210px] flex items-center justify-center filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.65)]"
            >
              <svg width="220" height="200" viewBox="0 0 220 200">
                {/* Left Wing (Direct light white) */}
                <polygon
                  points="110,15 25,185 110,160"
                  fill="#ffffff"
                  stroke="#e2e8f0"
                  strokeWidth="0.8"
                />
                {/* Right Wing (Shaded cool paper) */}
                <polygon
                  points="110,15 195,185 110,160"
                  fill="#edf2f7"
                  stroke="#cbd5e1"
                  strokeWidth="0.8"
                />
                {/* Center Keel Bottom (Fold shadow) */}
                <polygon
                  points="110,160 25,185 110,175"
                  fill="#cbd5e1"
                />
                <polygon
                  points="110,160 195,185 110,175"
                  fill="#94a3b8"
                />
                {/* Center Spine Crease Line */}
                <line
                  x1="110"
                  y1="15"
                  x2="110"
                  y2="175"
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 
        STAGE 4: FULL-CANVAS AERODYNAMIC FLIGHT OVERLAY (Frame 00:05 to 00:07)
        Launches from the left, swoops in a high roller-coaster arc across the top right,
        and dives smoothly into the Send button with real-time glowing contrail
      */}
      {step === "FLYING" && (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-visible">
          <svg className="absolute inset-0 w-full h-full overflow-visible">
            <defs>
              <linearGradient id="contrail-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
                <stop offset="25%" stopColor="#38bdf8" stopOpacity="0.4" />
                <stop offset="65%" stopColor="#60a5fa" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="1" />
              </linearGradient>
              <filter id="contrail-blur" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Reference trajectory path */}
            <path
              ref={flightPathSvgRef}
              d={flightPathD}
              fill="none"
              stroke="transparent"
            />

            {/* Glowing Blue Contrail Ribbon */}
            {totalPathLength > 0 && (
              <path
                d={flightPathD}
                fill="none"
                stroke="url(#contrail-glow)"
                strokeWidth="3.2"
                strokeLinecap="round"
                filter="url(#contrail-blur)"
                strokeDasharray={totalPathLength}
                strokeDashoffset={contrailOffset}
              />
            )}

            {/* Crisp laser core */}
            {totalPathLength > 0 && (
              <path
                d={flightPathD}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1"
                strokeLinecap="round"
                strokeDasharray={totalPathLength}
                strokeDashoffset={contrailOffset}
                opacity={0.85}
              />
            )}
          </svg>

          {/* 
            THE EXACT 3D PAPER AIRPLANE IN FLIGHT (NOT A GENERIC TRIANGLE!)
            Dynamically banking and diving along the curve's velocity vector!
          */}
          <div
            style={{
              position: "absolute",
              left: `${planeCoords.x}px`,
              top: `${planeCoords.y}px`,
              transform: `translate(-50%, -50%) rotate(${planeCoords.angle + 90}deg) scale(${planeCoords.scale})`,
              opacity: planeCoords.opacity,
              transition: "transform 0.016s linear",
              transformOrigin: "center center",
            }}
          >
            <svg
              width="44"
              height="44"
              viewBox="0 0 100 100"
              className="filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
            >
              {/* Left Wing (Light) */}
              <polygon points="50,10 5,85 50,70" fill="#ffffff" />
              {/* Right Wing (Shaded) */}
              <polygon points="50,10 95,85 50,70" fill="#e2e8f0" />
              {/* Underside fold */}
              <polygon points="50,70 5,85 50,88" fill="#cbd5e1" />
              <polygon points="50,70 95,85 50,88" fill="#94a3b8" />
              {/* Center spine */}
              <line x1="50" y1="10" x2="50" y2="88" stroke="#cbd5e1" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      )}

      {/* 
        STAGE 5 & 6: Main Card Container 
        Smoothly morphs from Message Composer into Confirmation Receipt
      */}
      <div className="relative z-10 w-full">
        <AnimatePresence mode="wait">
          {step !== "RECEIPT" ? (
            /* COMPOSER CARD (Frame 00:00 & 00:01) */
            <motion.div
              key="composer-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "w-full rounded-2xl bg-[#09090b] border border-white/[0.08]",
                "shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-4 sm:p-5 flex flex-col justify-between"
              )}
            >
              {/* Email field (enlarged for better typing experience) */}
              <div className="mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address (so I can reply)..."
                  disabled={step !== "IDLE"}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.08] focus:border-white/30 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none transition-all font-sans shadow-inner"
                />
              </div>

              {/* Note Textarea */}
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Say hello, propose a project, or drop a note..."
                  disabled={step !== "IDLE"}
                  className="w-full bg-transparent text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none resize-none font-sans leading-relaxed min-h-[75px]"
                />
              </div>

              {/* Bottom bar with 'On its way to Santhosh' & Send Button */}
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400 font-sans">
                    On its way to {recipientName}
                  </span>
                </div>

                {/* White Send / Sending / Sent Action Button */}
                <button
                  ref={sendBtnRef}
                  type="button"
                  onClick={handleSend}
                  disabled={step !== "IDLE" || !note.trim()}
                  className={cn(
                    "relative font-medium text-xs sm:text-sm px-4 py-2 rounded-xl transition-all select-none flex items-center gap-2 cursor-pointer",
                    step === "IDLE" &&
                      "bg-white hover:bg-neutral-200 text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.25)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed",
                    step !== "IDLE" && step !== "LANDED" &&
                      "bg-white text-black font-semibold cursor-wait opacity-95",
                    step === "LANDED" &&
                      "bg-white text-black font-semibold shadow-[0_0_30px_rgba(255,255,255,0.6)] scale-105"
                  )}
                >
                  {step === "IDLE" && (
                    <>
                      <span>Send</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-black"
                      >
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" />
                      </svg>
                    </>
                  )}

                  {step !== "IDLE" && step !== "LANDED" && (
                    <>
                      <span>Sending</span>
                      <span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    </>
                  )}

                  {step === "LANDED" && (
                    <>
                      <span>Sent</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-black"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ) : (
            /* CONFIRMATION RECEIPT CARD (Frame 00:09 - 00:12) */
            <motion.div
              key="receipt-card"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "w-full rounded-2xl bg-[#09090b] border border-white/[0.08]",
                "shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-5 flex flex-col justify-between"
              )}
            >
              {/* Header: Sent to 🌐 Santhosh + Timestamp */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
                  <span className="text-neutral-400 font-normal">Sent to</span>
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs">
                    🌐
                  </span>
                  <span>{recipientName}</span>
                </div>

                <span className="text-xs font-mono text-neutral-400">
                  {currentTime || "4:40 PM"}
                </span>
              </div>

              {/* Explanatory receipt text */}
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-5">
                He reads every note himself, usually within a day, and replies from his own inbox. Keep an eye on your email.
              </p>

              {/* Action Buttons: Write another & Edit and resend */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleWriteAnother}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs sm:text-sm font-semibold shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all active:scale-95 cursor-pointer text-center"
                >
                  Write another
                </button>

                <button
                  type="button"
                  onClick={handleEditAndResend}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#18181b] hover:bg-[#27272a] text-neutral-300 hover:text-white border border-white/10 text-xs sm:text-sm font-medium transition-all active:scale-95 cursor-pointer text-center"
                >
                  Edit & resend
                </button>

                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="py-2.5 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 text-xs sm:text-sm font-medium transition-all active:scale-95 cursor-pointer text-center"
                  >
                    Done
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default PaperPlaneContact;

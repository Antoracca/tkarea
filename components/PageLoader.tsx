"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [phase, setPhase] = useState<"in" | "hold" | "exit" | "gone">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 80);
    const t2 = setTimeout(() => setPhase("exit"), 2200);
    const t3 = setTimeout(() => setPhase("gone"), 3100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === "gone") return null;

  const exiting = phase === "exit";

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none pointer-events-none"
      style={{ background: "#080809" }}
      initial={{ y: 0 }}
      animate={{ y: exiting ? "-100%" : 0 }}
      transition={exiting
        ? { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
        : { duration: 0 }
      }
    >

      {/* ── Grille routière en fond ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* ── Halo orange derrière le logo ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,77,0,0.12) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* ── Zone centrale ── */}
      <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>

        {/* Ring SVG externe — pointillés de route tournants */}
        <motion.svg
          width="220" height="220"
          viewBox="0 0 220 220"
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          style={{ transformOrigin: "110px 110px" }}
        >
          {/* Piste statique tenue */}
          <circle
            cx="110" cy="110" r="100"
            fill="none"
            stroke="rgba(255,77,0,0.08)"
            strokeWidth="1"
            strokeDasharray="6 10"
          />
          {/* Arc orange animé */}
          <circle
            cx="110" cy="110" r="100"
            fill="none"
            stroke="#FF4D00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="80 550"
            strokeDashoffset="0"
            opacity="0.9"
          />
        </motion.svg>

        {/* Ring SVG interne — contre-rotation */}
        <motion.svg
          width="160" height="160"
          viewBox="0 0 160 160"
          className="absolute"
          style={{ top: 30, left: 30, transformOrigin: "80px 80px" }}
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
        >
          <circle
            cx="80" cy="80" r="72"
            fill="none"
            stroke="rgba(255,77,0,0.05)"
            strokeWidth="1"
            strokeDasharray="3 14"
          />
          <circle
            cx="80" cy="80" r="72"
            fill="none"
            stroke="rgba(255,77,0,0.35)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="30 480"
          />
        </motion.svg>

        {/* ── Monogramme TK ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col items-center gap-1"
        >
          {/* Cercle fond */}
          <div
            className="absolute"
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,77,0,0.15) 0%, transparent 75%)",
            }}
          />
          <span
            className="relative text-white font-black leading-none"
            style={{
              fontSize: 72,
              letterSpacing: "-0.06em",
              fontFamily: "'Syne', system-ui, sans-serif",
              textShadow: "0 0 40px rgba(255,77,0,0.3)",
            }}
          >
            TK
          </span>
          <span
            className="relative font-black tracking-[0.45em] uppercase"
            style={{
              fontSize: 13,
              color: "#FF4D00",
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              marginTop: -4,
            }}
          >
            AREA
          </span>
        </motion.div>
      </div>

      {/* ── Road dashes — ligne de marquage qui se peint ── */}
      <motion.div
        className="flex items-center gap-[10px] mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            className="h-[3px] rounded-full"
            style={{ background: i % 2 === 0 ? "#FF4D00" : "rgba(255,77,0,0.25)" }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: i % 2 === 0 ? 32 : 16, opacity: 1 }}
            transition={{
              delay: 0.5 + i * 0.09,
              duration: 0.25,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>

      {/* ── Tagline ── */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="mt-5 font-semibold uppercase tracking-[0.28em] text-gray-600"
        style={{ fontSize: 10, fontFamily: "'Space Grotesk', system-ui" }}
      >
        Marquage · Signalétique · Signalisation
      </motion.p>

      {/* ── Barre de progression en bas ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.04]">
        <motion.div
          className="h-full"
          style={{
            background: "linear-gradient(90deg, #FF4D00, #ff7a33)",
            boxShadow: "0 0 8px rgba(255,77,0,0.6)",
          }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.0, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      {/* ── Coin bas-gauche : label version ── */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-4 left-5 text-[9px] font-mono text-white/10 tracking-widest uppercase"
      >
        tkarea.com
      </motion.span>

    </motion.div>
  );
}

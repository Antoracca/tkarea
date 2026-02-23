"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

const ChatModal = dynamic(() => import("./ChatModal"), { ssr: false });

/* ── Icône IA custom — bulle + TK + point live ── */
function AIIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      {/* Bulle de chat */}
      <path
        d="M24 3H4C2.9 3 2 3.9 2 5v15c0 1.1.9 2 2 2h5l4 3.5L17 22h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
        fill="rgba(255,255,255,0.18)"
        stroke="white"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Monogramme TK */}
      <text
        x="7.5" y="16"
        fill="white"
        fontFamily="system-ui, sans-serif"
        fontWeight="900"
        fontSize="9"
        letterSpacing="-0.5"
      >
        TK
      </text>
      {/* Étincelle IA — coin haut-droite */}
      <path
        d="M22 1l.8 2.4L25 4l-2.2.6L22 7l-.8-2.4L19 4l2.2-.6L22 1z"
        fill="white"
        opacity="0.9"
      />
    </svg>
  );
}

export default function GlobalChat() {
  const [open, setOpen] = useState(false);

  /* Écoute les events du bouton "Lancer la discussion" dans DevisExperience */
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("openChat", handler);
    return () => window.removeEventListener("openChat", handler);
  }, []);

  return (
    <>
      {/* ── FAB — présent sur toutes les pages, caché quand le chat est ouvert ── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            onClick={() => setOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.09, y: -3 }}
            whileTap={{ scale: 0.93 }}
            transition={{ type: "spring", damping: 18, stiffness: 300 }}
            aria-label="Ouvrir le chat IA TK Area"
            className="fixed bottom-6 right-6 z-[990] w-[58px] h-[58px] rounded-2xl flex items-center justify-center"
            style={{
              background: "linear-gradient(145deg, #FF5510, #c83200)",
              boxShadow:
                "0 8px 30px rgba(255,77,0,0.45), 0 2px 10px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.12)",
            }}
          >
            <AIIcon />

            {/* Point live — en ligne */}
            <span className="absolute -top-1 -right-1 flex items-center justify-center">
              <span className="absolute w-3.5 h-3.5 rounded-full bg-[#34C759] opacity-60 animate-ping" />
              <span className="relative w-3 h-3 rounded-full bg-[#34C759] border-[2px] border-white shadow-sm" />
            </span>

            {/* Tooltip desktop */}
            <span className="absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2 hidden md:block whitespace-nowrap bg-gray-900/90 text-white text-[11px] font-semibold px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
              Parlez à notre IA
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Modal ── */}
      <ChatModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

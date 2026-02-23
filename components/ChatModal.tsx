"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, X, Minimize2, Maximize2, Phone, Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
};

/* ═══════════════════════════════════════════════════════════════
   SUGGESTION CHIPS
   ═══════════════════════════════════════════════════════════════ */

const SUGGESTIONS = [
  "Vous faites le marquage PMR ?",
  "Quel est votre délai d'intervention ?",
  "Vous intervenez sur Angers ?",
  "Comment obtenir un devis ?",
];

/* ═══════════════════════════════════════════════════════════════
   AVATAR TK — identité visuelle TK Area
   ═══════════════════════════════════════════════════════════════ */

function TKAvatar({ size = 28 }: { size?: number }) {
  return (
    <div
      className="rounded-full bg-gradient-to-br from-tk-orange to-[#cc3d00] flex items-center justify-center shrink-0 shadow-sm shadow-orange-500/30"
      style={{ width: size, height: size }}
    >
      <span
        className="text-white font-black leading-none select-none"
        style={{ fontSize: size * 0.38, letterSpacing: "-0.04em", fontFamily: "system-ui" }}
      >
        TK
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MESSAGE BUBBLE
   ═══════════════════════════════════════════════════════════════ */

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  // Ne pas rendre les bulles vides (état transitoire avant streaming)
  if (!isUser && message.content === "") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", damping: 22, stiffness: 300 }}
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"} gap-2`}
    >
      {!isUser && <TKAvatar size={28} />}
      <div
        className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed ${
          isUser
            ? "bg-tk-orange text-white rounded-br-sm"
            : "bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100"
        }`}
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        {message.content}
        {message.streaming && message.content.length > 0 && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
            className="inline-block w-[2px] h-[13px] bg-current align-text-bottom ml-0.5 opacity-60"
          />
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TYPING DOTS — affiché UNIQUEMENT pendant le délai initial
   ═══════════════════════════════════════════════════════════════ */

function TypingDots() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      className="flex items-start gap-2"
    >
      <TKAvatar size={28} />
      <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="flex gap-1.5 items-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-gray-400"
              animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAT MODAL
   ═══════════════════════════════════════════════════════════════ */

export default function ChatModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // ── Scroll lock mobile ──
  // Sur iOS/Android, overflow:hidden seul ne bloque pas le scroll.
  // On fixe le body à la position courante pour geler la page derrière le modal.
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return; // desktop : pas besoin, pas de backdrop plein écran

    if (open && !minimized) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflowY = "scroll"; // évite le décalage de largeur
      document.body.dataset.scrollY = String(scrollY);
    } else {
      const savedY = parseInt(document.body.dataset.scrollY ?? "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflowY = "";
      delete document.body.dataset.scrollY;
      window.scrollTo(0, savedY);
    }

    return () => {
      // Nettoyage si le composant se démonte alors que le modal est ouvert
      const savedY = parseInt(document.body.dataset.scrollY ?? "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflowY = "";
      delete document.body.dataset.scrollY;
      if (savedY) window.scrollTo(0, savedY);
    };
  }, [open, minimized]);

  // Message de bienvenue — dépend UNIQUEMENT de `open`, pas de messages.length
  // Évite le bug où setMinimized(false) se déclenchait à chaque nouveau message
  useEffect(() => {
    if (!open) return;
    setMinimized(false);
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content:
            "Bonjour ! Je suis l'assistant TK Area. Je peux vous renseigner sur nos prestations de marquage, signalétique, signalisation routière, ou vous aider à préparer un devis. Comment puis-je vous aider ?",
        },
      ]);
    }
    setTimeout(() => inputRef.current?.focus(), 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Auto-scroll interne uniquement
  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    requestAnimationFrame(scrollToBottom);
  }, [messages, loading, scrollToBottom]);

  // Envoi du message + streaming
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;

      const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        content: text.trim(),
      };

      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setInput("");
      setLoading(true);

      // Placeholder vide — TypingDots l'affiche, pas MessageBubble (content === "")
      const assistantId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "", streaming: true },
      ]);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: newMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!res.ok) throw new Error("Erreur API");

        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break;
              try {
                const parsed = JSON.parse(data);
                if (parsed.text) {
                  accumulated += parsed.text;
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantId
                        ? { ...m, content: accumulated, streaming: true }
                        : m
                    )
                  );
                }
              } catch {
                // ignore parse errors
              }
            }
          }
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, streaming: false } : m
          )
        );
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content:
                    "Désolé, une erreur est survenue. Appelez-nous directement au 06 05 76 99 52.",
                  streaming: false,
                }
              : m
          )
        );
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  // Vrai indicateur de "réponse en cours" = message vide + streaming
  const isWaiting = messages.some((m) => m.streaming && m.content === "");

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop mobile — masqué si minimisé pour ne pas bloquer la page */}
          {!minimized && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[998] md:hidden"
            />
          )}

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className={`
              fixed z-[999] bg-[#F5F6FA] shadow-2xl overflow-hidden flex flex-col
              bottom-0 left-0 right-0 rounded-t-[24px]
              ${minimized ? "max-h-fit" : "max-h-[92dvh]"}
              md:bottom-6 md:right-6 md:left-auto md:rounded-2xl
              md:w-[420px] ${minimized ? "md:max-h-fit" : "md:max-h-[680px]"}
            `}
            style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.06)" }}
          >
            {/* ── Header — cliquable pour ré-ouvrir si minimisé ── */}
            <div
              className={`shrink-0 bg-gradient-to-r from-tk-orange to-[#e03500] px-4 py-3.5 flex items-center gap-3 ${minimized ? "cursor-pointer" : ""}`}
              onClick={() => minimized && setMinimized(false)}
            >
              <TKAvatar size={40} />
              <div className="flex-1 min-w-0">
                <p className="font-black text-white text-[15px] leading-tight">
                  Assistant TK Area
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#34C759] animate-pulse" />
                  <p className="text-white/80 text-[11px] font-medium">
                    {minimized ? "Cliquez pour rouvrir" : "En ligne · Répond en quelques secondes"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                <a
                  href="tel:0605769952"
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
                  title="Appeler TK Area"
                >
                  <Phone size={15} className="text-white" />
                </a>
                {/* Minimize / Maximize — desktop uniquement */}
                <button
                  onClick={() => setMinimized((v) => !v)}
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 hidden md:flex items-center justify-center transition-colors"
                  title={minimized ? "Agrandir" : "Réduire"}
                >
                  {minimized
                    ? <Maximize2 size={14} className="text-white" />
                    : <Minimize2 size={14} className="text-white" />
                  }
                </button>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
                  title="Fermer"
                >
                  <X size={15} className="text-white" />
                </button>
              </div>
            </div>

            {/* ── Body (masqué si minimisé) ── */}
            {!minimized && (
              <>
                {/* Messages */}
                <div
                  ref={scrollRef}
                  className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-4 flex flex-col gap-3"
                  style={{ scrollbarWidth: "none" }}
                >
                  <AnimatePresence initial={false}>
                    {messages.map((m) => (
                      <MessageBubble key={m.id} message={m} />
                    ))}
                  </AnimatePresence>

                  {/* TypingDots = seul indicateur de chargement initial */}
                  <AnimatePresence>
                    {isWaiting && <TypingDots />}
                  </AnimatePresence>
                </div>

                {/* Suggestions (seulement au début) */}
                {messages.length === 1 && !loading && (
                  <div className="shrink-0 px-4 pb-2 flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="text-[12px] font-semibold text-tk-orange bg-tk-orange/8 hover:bg-tk-orange/15 border border-tk-orange/20 rounded-full px-3 py-1.5 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input bar */}
                <div className="shrink-0 bg-white border-t border-gray-100 px-3 py-3">
                  <div className="flex items-end gap-2 bg-gray-50 rounded-2xl border border-gray-200 px-3 py-2 focus-within:border-tk-orange/40 focus-within:ring-2 focus-within:ring-tk-orange/10 transition-all">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={handleInput}
                      onKeyDown={handleKeyDown}
                      placeholder="Écrivez votre message..."
                      rows={1}
                      disabled={loading}
                      className="flex-1 min-w-0 bg-transparent text-[14px] text-gray-800 placeholder-gray-400 resize-none outline-none leading-relaxed disabled:opacity-60"
                      style={{
                        maxHeight: 120,
                        scrollbarWidth: "none",
                        fontFamily: "system-ui, sans-serif",
                      }}
                    />
                    <button
                      onClick={() => sendMessage(input)}
                      disabled={!input.trim() || loading}
                      className="w-8 h-8 rounded-full bg-tk-orange flex items-center justify-center shrink-0 mb-[1px] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-orange-600 active:scale-95 transition-all"
                    >
                      {loading ? (
                        <Loader2 size={15} className="text-white animate-spin" />
                      ) : (
                        <ArrowUp size={15} className="text-white" strokeWidth={3} />
                      )}
                    </button>
                  </div>
                  <p className="text-center text-[10px] text-gray-400 mt-2 font-medium">
                    Propulsé par IA · Réponse non contractuelle
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowRight, ArrowUp, Bot, Camera, CheckCircle2,
  MessageSquare, Plus, User
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useCallback, useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */

type ChatMessage = {
  id: number;
  text?: string;
  isUser: boolean;
  isImage?: boolean;
  imgUrl?: string;
  time: string;
  delivered?: boolean;
  read?: boolean;
};

type SequenceStep = {
  delay: number;
  action: string;
  text?: string;
  url?: string;
  typeSpeed?: number;
};

/* ═══════════════════════════════════════════════════════════════
   CONVERSATION SCRIPT — 15+ messages, realistic flow
   ═══════════════════════════════════════════════════════════════ */

// Image envoyée dans le chat (parking/chantier)
const CHAT_IMAGE_URL =
  "https://images.unsplash.com/photo-1561114601-5c8f97072146?q=80&w=400&auto=format&fit=crop";

// Photos variées pour la galerie iOS (chantiers, marquage, travaux)
const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1561114601-5c8f97072146?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1634157592347-0721c0cff74d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1666394311441-9a474a593c25?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1729613804984-bee09b370e3e?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1662313422955-ea8ca568b021?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563804096299-9c843f201838?q=80&w=400&auto=format&fit=crop",
];

const SCRIPT: SequenceStep[] = [
  { delay: 1200, action: "ai_typing" },
  { delay: 1400, action: "ai_msg", text: "Bonjour ! Je suis l'assistant TK Area. Comment puis-je vous aider ?" },
  { delay: 1800, action: "open_kb" },
  { delay: 0, action: "user_type", text: "Bonjour, est-ce que vous faites le marquage PMR ?", typeSpeed: 32 },
  { delay: 500, action: "user_send" },
  { delay: 900, action: "ai_typing" },
  { delay: 2200, action: "ai_msg", text: "Oui, nous sommes spécialisés en signalisation PMR conforme aux normes d'accessibilité. Places, cheminements, bandes podotactiles..." },
  { delay: 1600, action: "open_kb" },
  { delay: 0, action: "user_type", text: "Super ! Vous intervenez sur Angers ?", typeSpeed: 38 },
  { delay: 500, action: "user_send" },
  { delay: 700, action: "ai_typing" },
  { delay: 1800, action: "ai_msg", text: "Tout à fait, nos équipes couvrent le Grand Ouest. Angers fait partie de notre zone d'intervention habituelle." },
  { delay: 1400, action: "open_kb" },
  { delay: 0, action: "user_type", text: "C'est un parking d'environ 500m2 avec des marquages usés", typeSpeed: 34 },
  { delay: 500, action: "user_send" },
  { delay: 800, action: "ai_typing" },
  { delay: 2500, action: "ai_msg", text: "Compris. Pour cette surface, il faudra prévoir un nettoyage haute pression puis l'application de résine routière. Vous avez des photos du site ?" },
  { delay: 1400, action: "open_camera" },
  { delay: 1500, action: "select_photo" },
  { delay: 700, action: "user_image", url: CHAT_IMAGE_URL },
  { delay: 800, action: "open_kb" },
  { delay: 0, action: "user_type", text: "Est-ce que je peux terminer ce chantier comme ça ?", typeSpeed: 33 },
  { delay: 500, action: "user_send" },
  { delay: 1200, action: "ai_typing" },
  { delay: 3000, action: "ai_msg", text: "Le support semble exploitable. Un ragréage localisé sera nécessaire avant la mise en peinture. Comptez une journée d'intervention pour cette surface." },
  { delay: 1600, action: "open_kb" },
  { delay: 0, action: "user_type", text: "Il faut 2 places PMR et un cheminement piéton", typeSpeed: 35 },
  { delay: 500, action: "user_send" },
  { delay: 900, action: "ai_typing" },
  { delay: 2400, action: "ai_msg", text: "C'est noté. Je transmets votre dossier à notre bureau d'étude. Un agent vous contactera par mail sous 24h avec une proposition détaillée." },
  { delay: 1500, action: "open_kb" },
  { delay: 0, action: "user_type", text: "Parfait, merci beaucoup !", typeSpeed: 36 },
  { delay: 500, action: "user_send" },
  { delay: 700, action: "ai_typing" },
  { delay: 1500, action: "ai_msg", text: "Avec plaisir ! Votre demande est enregistrée. À très bientôt." },
  { delay: 6000, action: "reset" },
];

/* ═══════════════════════════════════════════════════════════════
   iOS STATUS BAR — high contrast, black icons on light bg
   ═══════════════════════════════════════════════════════════════ */

function IOSStatusBar() {
  return (
    <div className="absolute top-0 inset-x-0 z-50 pointer-events-none select-none">
      {/* Dynamic Island + green privacy dot ON the island */}
      <div className="flex justify-center pt-[14px] relative">
        <div className="w-[100px] h-[28px] bg-black rounded-full relative z-10">
          {/* Green dot — more to the left on the Dynamic Island */}
          <div
            className="absolute w-[7px] h-[7px] rounded-full bg-[#34C759] z-20"
            style={{
              top: "50%",
              right: 16,
              transform: "translateY(-50%)",
              boxShadow: "0 0 6px rgba(52,199,89,0.9)",
            }}
          />
        </div>
      </div>

      {/* Status icons row — pushed further down */}
      <div className="absolute top-[12px] inset-x-0 h-[56px] flex items-center justify-between px-[24px]">
        <span
          className="text-[15px] font-semibold text-black"
          style={{ fontFamily: "-apple-system, 'SF Pro Text', sans-serif" }}
        >
          9:41
        </span>
        <div className="flex items-center gap-[6px]">
          {/* Cellular bars */}
          <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
            <rect x="0" y="8" width="3" height="4" rx="0.7" fill="#1D1D1F" />
            <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.7" fill="#1D1D1F" />
            <rect x="9" y="3" width="3" height="9" rx="0.7" fill="#1D1D1F" />
            <rect x="13.5" y="0" width="3" height="12" rx="0.7" fill="#1D1D1F" />
          </svg>
          {/* WiFi icon */}
          <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
            <path d="M7.5 9.5a1 1 0 110 2 1 1 0 010-2z" fill="#1D1D1F" />
            <path d="M4.75 7.8c.75-.75 1.7-1.2 2.75-1.2s2 .45 2.75 1.2" stroke="#1D1D1F" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M2.25 5.2C3.5 3.95 5.4 3.2 7.5 3.2s4 .75 5.25 2" stroke="#1D1D1F" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M0 2.7C1.75 1 4.4 0 7.5 0S13.25 1 15 2.7" stroke="#1D1D1F" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          {/* Battery */}
          <div className="flex items-center">
            <div className="w-[24px] h-[11px] border-[1.5px] border-[#1D1D1F] rounded-[3px] p-[1.5px] flex items-center">
              <div className="bg-[#1D1D1F] h-full w-[78%] rounded-[1px]" />
            </div>
            <div className="w-[1.5px] h-[4px] bg-[#1D1D1F]/40 rounded-r-[1px] ml-[0.5px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   iOS KEYBOARD — AZERTY, no wifi icon, realistic keys only
   ═══════════════════════════════════════════════════════════════ */

function IOSKeyboard({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ y: visible ? 0 : "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}
      className="absolute bottom-0 inset-x-0 z-40"
      style={{ height: 260 }}
    >
      <div className="w-full h-full bg-[#D1D3D9] flex flex-col gap-[6px] px-[3px] pt-[8px] pb-[4px]">
        {/* Row 1 */}
        <div className="flex gap-[5px] px-[1px]">
          {"AZERTYUIOP".split("").map((k) => (
            <div key={k} className="flex-1 h-[42px] bg-white rounded-[5px] flex items-center justify-center text-[18px] text-black shadow-[0_1px_0_#898A8D]" style={{ fontFamily: "-apple-system, sans-serif" }}>
              {k}
            </div>
          ))}
        </div>
        {/* Row 2 */}
        <div className="flex gap-[5px] px-[14px]">
          {"QSDFGHJKLM".split("").map((k) => (
            <div key={k} className="flex-1 h-[42px] bg-white rounded-[5px] flex items-center justify-center text-[18px] text-black shadow-[0_1px_0_#898A8D]" style={{ fontFamily: "-apple-system, sans-serif" }}>
              {k}
            </div>
          ))}
        </div>
        {/* Row 3 — shift + letters + backspace */}
        <div className="flex gap-[5px] px-[1px]">
          {/* Shift key */}
          <div className="w-[38px] h-[42px] bg-[#ADB0B8] rounded-[5px] flex items-center justify-center shadow-[0_1px_0_#898A8D]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l8 9h-5v7H9v-7H4l8-9z" />
            </svg>
          </div>
          <div className="flex-1 flex gap-[5px]">
            {"WXCVBN".split("").map((k) => (
              <div key={k} className="flex-1 h-[42px] bg-white rounded-[5px] flex items-center justify-center text-[18px] text-black shadow-[0_1px_0_#898A8D]" style={{ fontFamily: "-apple-system, sans-serif" }}>
                {k}
              </div>
            ))}
          </div>
          {/* Backspace key */}
          <div className="w-[38px] h-[42px] bg-[#ADB0B8] rounded-[5px] flex items-center justify-center shadow-[0_1px_0_#898A8D]">
            <svg width="20" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
              <line x1="18" y1="9" x2="12" y2="15" />
              <line x1="12" y1="9" x2="18" y2="15" />
            </svg>
          </div>
        </div>
        {/* Row 4 — 123 + globe + space + return */}
        <div className="flex gap-[5px] px-[1px]">
          <div className="w-[52px] h-[42px] bg-[#ADB0B8] rounded-[5px] flex items-center justify-center text-[15px] font-medium text-black shadow-[0_1px_0_#898A8D]">123</div>
          {/* Globe icon (language switcher) — NOT wifi */}
          <div className="w-[36px] h-[42px] bg-[#ADB0B8] rounded-[5px] flex items-center justify-center shadow-[0_1px_0_#898A8D]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
            </svg>
          </div>
          <div className="flex-1 h-[42px] bg-white rounded-[5px] flex items-center justify-center text-[16px] text-black shadow-[0_1px_0_#898A8D]" style={{ fontFamily: "-apple-system, sans-serif" }}>
            espace
          </div>
          <div className="w-[72px] h-[42px] bg-[#ADB0B8] rounded-[5px] flex items-center justify-center text-[15px] font-medium text-black shadow-[0_1px_0_#898A8D]">retour</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   iOS PHOTO PICKER — with properly loaded images
   ═══════════════════════════════════════════════════════════════ */

function IOSPhotoPicker({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ y: visible ? 0 : "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}
      className="absolute bottom-0 inset-x-0 z-40 bg-white rounded-t-[14px] overflow-hidden"
      style={{ height: 280 }}
    >
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
        <span className="font-semibold text-black text-[15px]" style={{ fontFamily: "-apple-system, sans-serif" }}>Récents</span>
        <span className="text-[#007AFF] font-medium text-[15px]" style={{ fontFamily: "-apple-system, sans-serif" }}>Annuler</span>
      </div>
      <div className="p-[2px] grid grid-cols-3 gap-[2px]">
        {GALLERY_IMAGES.map((url, i) => (
          <div key={i} className="aspect-square relative overflow-hidden bg-gray-200">
            {i === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/25 flex items-center justify-center z-10"
              >
                <div className="w-[22px] h-[22px] bg-[#007AFF] rounded-full flex items-center justify-center border-[2px] border-white">
                  <CheckCircle2 size={12} className="text-white" />
                </div>
              </motion.div>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt="Photo galerie"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MESSAGE BUBBLE — iMessage style with proper word wrapping
   ═══════════════════════════════════════════════════════════════ */

function MessageBubble({ message, isLast }: { message: ChatMessage; isLast: boolean }) {
  const { isUser, text, isImage, imgUrl, time, read } = message;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className={`flex flex-col ${isUser ? "items-end" : "items-start"} w-full min-w-0`}
    >
      {isImage ? (
        <div className={`relative w-[65%] rounded-[18px] overflow-hidden shadow-sm ${isUser ? "rounded-br-[4px]" : "rounded-bl-[4px]"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgUrl!}
            alt="Photo envoyée"
            className="w-full h-auto aspect-[4/3] object-cover block"
            loading="eager"
          />
        </div>
      ) : (
        <div
          className={`max-w-[82%] px-[12px] py-[8px] min-w-0 ${
            isUser
              ? "bg-[#007AFF] text-white rounded-[18px] rounded-br-[4px]"
              : "bg-[#E5E5EA] text-black rounded-[18px] rounded-bl-[4px]"
          }`}
        >
          <p
            className="text-[15px] leading-[20px] min-w-0"
            style={{
              fontFamily: "-apple-system, 'SF Pro Text', sans-serif",
              overflowWrap: "anywhere",
              wordBreak: "break-word",
            }}
          >
            {text}
          </p>
        </div>
      )}
      {/* Timestamp + delivery status */}
      <div className={`flex items-center gap-1 mt-[2px] px-1 ${isUser ? "flex-row-reverse" : ""}`}>
        <span className="text-[10px] text-gray-400" style={{ fontFamily: "-apple-system, sans-serif" }}>{time}</span>
        {isUser && isLast && (
          <span className="text-[10px] text-gray-400" style={{ fontFamily: "-apple-system, sans-serif" }}>
            {read ? "Lu" : "Distribué"}
          </span>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TYPING INDICATOR — iMessage dots
   ═══════════════════════════════════════════════════════════════ */

function TypingIndicator({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 4 }}
          className="flex items-start w-full"
        >
          <div className="bg-[#E5E5EA] rounded-[18px] rounded-bl-[4px] px-[14px] py-[10px]">
            <div className="flex gap-[4px] items-center">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-[7px] h-[7px] rounded-full bg-[#8E8E93]"
                  animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.15, ease: "easeInOut" }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PHONE SCREEN — complete chat app UI
   ═══════════════════════════════════════════════════════════════ */

function PhoneScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [aiTyping, setAiTyping] = useState(false);
  const [inputText, setInputText] = useState("");
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [msgCounter, setMsgCounter] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(true);

  const getTime = useCallback(() => {
    const mins = 41 + Math.floor(msgCounter / 2);
    return `9:${mins < 10 ? "0" + mins : mins}`;
  }, [msgCounter]);

  // Internal-only auto-scroll — NEVER touches window
  const scrollChat = useCallback(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    requestAnimationFrame(scrollChat);
  }, [messages, aiTyping, inputText, keyboardOpen, cameraOpen, scrollChat]);

  // Sequence engine
  useEffect(() => {
    const step = SCRIPT[stepIdx];
    if (!step) return;

    activeRef.current = true;
    let timer: ReturnType<typeof setTimeout>;
    let typeTimer: ReturnType<typeof setTimeout>;

    if (step.action === "user_type") {
      const text = step.text || "";
      let i = 0;
      const typeNext = () => {
        if (!activeRef.current) return;
        if (i <= text.length) {
          setInputText(text.slice(0, i));
          i++;
          typeTimer = setTimeout(typeNext, step.typeSpeed || 38);
        } else {
          timer = setTimeout(() => {
            if (activeRef.current) setStepIdx((s) => s + 1);
          }, 400);
        }
      };
      typeTimer = setTimeout(typeNext, 200);
    } else {
      timer = setTimeout(() => {
        if (!activeRef.current) return;

        switch (step.action) {
          case "ai_typing":
            setAiTyping(true);
            break;
          case "ai_msg":
            setAiTyping(false);
            setMsgCounter((c) => c + 1);
            setMessages((prev) => [
              ...prev,
              { id: Date.now(), text: step.text, isUser: false, time: getTime() },
            ]);
            break;
          case "open_kb":
            setCameraOpen(false);
            setKeyboardOpen(true);
            break;
          case "user_send": {
            const captured = inputText;
            setKeyboardOpen(false);
            setMsgCounter((c) => c + 1);
            setMessages((prev) => [
              ...prev,
              { id: Date.now(), text: captured, isUser: true, time: getTime(), delivered: true, read: true },
            ]);
            setInputText("");
            break;
          }
          case "open_camera":
            setKeyboardOpen(false);
            setCameraOpen(true);
            break;
          case "select_photo":
            setCameraOpen(false);
            break;
          case "user_image":
            setMsgCounter((c) => c + 1);
            setMessages((prev) => [
              ...prev,
              { id: Date.now(), isUser: true, isImage: true, imgUrl: step.url, time: getTime(), delivered: true, read: true },
            ]);
            break;
          case "reset":
            setMessages([]);
            setInputText("");
            setKeyboardOpen(false);
            setCameraOpen(false);
            setAiTyping(false);
            setMsgCounter(0);
            setStepIdx(0);
            return;
        }

        if (step.action !== "reset") {
          setStepIdx((s) => s + 1);
        }
      }, step.delay);
    }

    return () => {
      activeRef.current = false;
      clearTimeout(timer);
      clearTimeout(typeTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIdx]);

  const bottomOverlay = keyboardOpen ? 260 : cameraOpen ? 280 : 0;

  return (
    <div
      className="w-full h-full flex flex-col relative overflow-hidden"
      style={{ background: "#F2F2F7", fontFamily: "-apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif" }}
    >
      <IOSStatusBar />

      {/* Safe area top spacer — below Dynamic Island */}
      <div className="h-[68px] shrink-0" />

      {/* iMessage Nav Bar */}
      <div className="shrink-0 flex items-center px-3 py-[6px] bg-[#F9F9F9]/95 backdrop-blur-sm border-b border-black/[0.08] relative z-20">
        <div className="flex items-center gap-[2px] w-[40px]">
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M9 1L1.5 8.5 9 16" stroke="#007AFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[15px] text-[#007AFF] font-normal">12</span>
        </div>
        <div className="flex-1 flex flex-col items-center gap-[1px]">
          <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center relative">
            <Bot size={14} className="text-white" />
            <div className="absolute -bottom-[1px] -right-[1px] w-[10px] h-[10px] bg-[#34C759] border-[2px] border-[#F9F9F9] rounded-full" />
          </div>
          <span className="text-[11px] font-semibold text-black leading-none">TK Area</span>
          <span className="text-[10px] text-[#8E8E93] leading-none">en ligne</span>
        </div>
        <div className="w-[40px] flex justify-end">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M1 12.5v4a2 2 0 002 2h4M13 18.5h4a2 2 0 002-2v-4M19 7.5v-4a2 2 0 00-2-2h-4M7 .5H3a2 2 0 00-2 2v4" stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Messages container — flex:1, internal scroll only */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-[10px] py-[6px] flex flex-col gap-[6px]"
        style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
      >
        {/* Day separator */}
        <div className="flex justify-center py-[6px]">
          <span className="text-[11px] font-medium text-[#8E8E93] bg-[#E5E5EA]/60 px-[10px] py-[3px] rounded-full">
            Aujourd&apos;hui
          </span>
        </div>

        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <MessageBubble key={m.id} message={m} isLast={i === messages.length - 1 && m.isUser} />
          ))}
        </AnimatePresence>

        <TypingIndicator visible={aiTyping} />

        {/* Spacer that pushes content above overlay */}
        <motion.div
          initial={false}
          animate={{ height: bottomOverlay > 0 ? bottomOverlay - 40 : 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}
          className="shrink-0 w-full"
        />
      </div>

      {/* ── Input bar — iMessage style with proper text wrapping ── */}
      <motion.div
        initial={false}
        animate={{ y: bottomOverlay > 0 ? -bottomOverlay : 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}
        className="shrink-0 bg-[#F9F9F9]/95 backdrop-blur-sm border-t border-black/[0.08] px-[8px] py-[6px] relative z-30"
      >
        <div className="flex items-end gap-[6px]">
          {/* Plus button */}
          <button className="w-[30px] h-[30px] rounded-full bg-[#E5E5EA] flex items-center justify-center shrink-0 mb-[2px]" aria-label="Plus">
            <Plus size={16} className="text-[#8E8E93]" strokeWidth={2.5} />
          </button>

          {/* Input field — flex:1 + min-w-0 + word wrap + max-height + scroll */}
          <div
            className="flex-1 min-w-0 bg-white rounded-[18px] border border-black/[0.1] px-[12px] py-[6px] flex items-end"
            style={{ maxHeight: 80 }}
          >
            <div
              className="flex-1 min-w-0 overflow-y-auto"
              style={{
                maxHeight: 66,
                scrollbarWidth: "none",
              }}
            >
              <p
                className={`text-[15px] leading-[20px] min-w-0 ${inputText ? "text-black" : "text-[#8E8E93]"}`}
                style={{
                  overflowWrap: "anywhere",
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                  fontFamily: "-apple-system, sans-serif",
                }}
              >
                {inputText || "iMessage"}
                {keyboardOpen && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.7 }}
                    className="inline-block w-[2px] h-[16px] bg-[#007AFF] align-text-bottom ml-[1px]"
                  />
                )}
              </p>
            </div>
          </div>

          {/* Send / Camera button — always visible */}
          {inputText ? (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-[30px] h-[30px] rounded-full bg-[#007AFF] flex items-center justify-center shrink-0 mb-[2px]"
              aria-label="Envoyer"
            >
              <ArrowUp size={16} className="text-white" strokeWidth={3} />
            </motion.button>
          ) : (
            <button className="w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0 mb-[2px]" aria-label="Camera">
              <Camera size={20} className="text-[#8E8E93]" strokeWidth={1.5} />
            </button>
          )}
        </div>
      </motion.div>

      {/* Home indicator */}
      <motion.div
        initial={false}
        animate={{ y: bottomOverlay > 0 ? -bottomOverlay : 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}
        className="shrink-0 h-[16px] flex justify-center items-end pb-[4px] bg-[#F9F9F9]/95 relative z-30"
      >
        <div className="w-[120px] h-[4px] bg-black/20 rounded-full" />
      </motion.div>

      {/* Overlays */}
      <IOSKeyboard visible={keyboardOpen} />
      <IOSPhotoPicker visible={cameraOpen} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   iPHONE FRAME — Pure CSS, single shell, responsive
   ═══════════════════════════════════════════════════════════════ */

function IPhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative" style={{ width: 320, height: 670 }}>
      {/* Outer shell — single frame, titanium look */}
      <div
        className="absolute inset-0 rounded-[52px]"
        style={{
          background: "linear-gradient(145deg, #2C2C2E 0%, #1C1C1E 50%, #2C2C2E 100%)",
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.08),
            inset 0 0 0 1px rgba(255,255,255,0.05),
            0 25px 60px rgba(0,0,0,0.5),
            0 8px 20px rgba(0,0,0,0.3)
          `,
        }}
      >
        {/* Side buttons — left */}
        <div className="absolute -left-[2.5px] top-[105px] w-[3px] h-[28px] rounded-l-[2px] bg-[#3A3A3C]" />
        <div className="absolute -left-[2.5px] top-[155px] w-[3px] h-[52px] rounded-l-[2px] bg-[#3A3A3C]" />
        <div className="absolute -left-[2.5px] top-[215px] w-[3px] h-[52px] rounded-l-[2px] bg-[#3A3A3C]" />
        {/* Side button — right (power) */}
        <div className="absolute -right-[2.5px] top-[170px] w-[3px] h-[72px] rounded-r-[2px] bg-[#3A3A3C]" />

        {/* Screen — inner area with content */}
        <div className="absolute top-[10px] left-[10px] right-[10px] bottom-[10px] rounded-[42px] overflow-hidden bg-black">
          {children}
        </div>
      </div>

      {/* Reflection highlight on glass */}
      <div
        className="absolute top-[12px] left-[14px] right-[55%] bottom-[60%] rounded-[40px] pointer-events-none z-10"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN SECTION — DevisExperience
   ═══════════════════════════════════════════════════════════════ */

export default function DevisExperience() {
  const phoneRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(phoneRef, { once: true, margin: "-100px" });
  const processSteps = [
    { num: "01", title: "Envoyez votre demande", description: "Décrivez votre projet via notre plateforme sécurisée et joignez vos plans ou photos.", lottie: "/Sending.lottie" },
    { num: "02", title: "Analyse experte", description: "Nos techniciens étudient votre dossier et vérifient les spécificités d'intervention.", lottie: "/speed.lottie" },
    { num: "03", title: "Devis sous 24h", description: "Recevez par e-mail une offre complète, détaillée et conforme aux normes en vigueur.", lottie: "/Mailsent.lottie" },
  ];

  return (
    <section id="assistance" className="relative overflow-hidden">
      {/* ── BLOC 1: CHATBOT IA ── */}
      <div className="relative bg-[#0a0a0c] py-24 md:py-36 overflow-hidden">
        {/* Background ambiance */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-[15%] -translate-y-1/2 w-[600px] h-[600px] bg-tk-orange/[0.07] rounded-full blur-[150px]" />
          <div className="absolute top-1/3 right-[10%] w-[400px] h-[400px] bg-blue-500/[0.04] rounded-full blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="container-custom relative z-10">
          {/*
            Mobile  : badge+titre → téléphone → description+CTA  (flex-col, ordre DOM naturel)
            Desktop : col gauche (badge+titre / description+CTA) | col droite (téléphone, row-span)
          */}
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-20 lg:items-center">

            {/* 1 — Badge + Titre (toujours en premier) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 lg:col-start-1 lg:row-start-1 text-center lg:text-left z-20"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] mb-6 mx-auto lg:mx-0">
                <div className="w-2 h-2 rounded-full bg-[#34C759] animate-pulse" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                  Assistant en ligne
                </span>
              </div>
              <h2 className="text-[34px] sm:text-[42px] lg:text-[52px] font-black text-white leading-[1.05] tracking-[-0.03em]">
                Une question ?
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-tk-orange via-orange-400 to-tk-orange">
                  Demandez-nous.
                </span>
              </h2>
            </motion.div>

            {/* 2 — Téléphone (après le titre sur mobile, colonne droite sur desktop) */}
            <motion.div
              ref={phoneRef}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="order-3 lg:order-none lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:row-span-2 flex justify-center w-full overflow-visible"
            >
              <div className="relative flex justify-center">
                <div className="absolute -inset-16 bg-gradient-to-tr from-tk-orange/15 via-tk-orange/5 to-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
                <div
                  className="relative z-10 scale-[0.78] sm:scale-[0.85] md:scale-90 lg:scale-100 origin-top"
                  style={{
                    transform: "perspective(1200px) rotateY(-8deg) rotateX(3deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <IPhoneFrame>
                    <PhoneScreen />
                  </IPhoneFrame>
                </div>
              </div>
            </motion.div>

            {/* 3 — Description + CTA (après le téléphone sur mobile, sous le titre sur desktop) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="order-2 lg:order-none lg:col-span-5 lg:col-start-1 lg:row-start-2 text-center lg:text-left z-20"
            >
              <p className="text-[16px] md:text-[17px] text-gray-400 leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                Dialogue instantané avec notre assistant expert. Réglementations PMR, résines adaptées, plans de circulation : obtenez des réponses précises avant même l&apos;intervention de nos techniciens.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <motion.button
                  onClick={() => window.dispatchEvent(new CustomEvent("openChat"))}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-tk-orange to-[#ff3300] text-white rounded-full font-bold uppercase tracking-wider text-[14px] shadow-[0_8px_32px_rgba(255,77,0,0.35)] hover:shadow-[0_12px_48px_rgba(255,77,0,0.45)] transition-all duration-300"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <MessageSquare size={17} />
                  Lancer la discussion
                </motion.button>
              </div>

            </motion.div>

          </div>
        </div>
      </div>

      {/* ── BLOC 2: AGENTS HUMAINS ── */}
      <div className="bg-white py-20 md:py-32">
        <div className="container-custom">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16 md:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tk-orange/10 border border-tk-orange/20 mb-5">
              <User size={13} className="text-tk-orange" />
              <span className="text-[11px] font-black uppercase tracking-widest text-tk-orange">Équipe Technique</span>
            </div>
            <h2 className="text-[32px] sm:text-4xl md:text-5xl font-black text-tk-black mb-4 leading-[1.1] tracking-tight">
              Analyse Pointue<br />par <span className="text-tk-orange">Nos Agents</span>
            </h2>
            <p className="text-gray-500 leading-relaxed text-base md:text-lg max-w-xl mx-auto">
              Au-delà de l&apos;assistance automatisée, nos experts cartographient personnellement votre dossier et dimensionnent l&apos;intervention avec précision.
            </p>
          </motion.div>

          {/* Steps — Lottie cards */}
          <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
            {/* Connecting line desktop */}
            <div className="hidden sm:block absolute top-[80px] left-[calc(16.6%+30px)] right-[calc(16.6%+30px)] h-px">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-tk-orange/30 to-transparent" />
              {/* Animated dash */}
              <motion.div
                className="absolute top-0 left-0 h-px bg-gradient-to-r from-tk-orange to-orange-400"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.3, ease: "easeInOut" }}
              />
            </div>

            {processSteps.map((step, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: idx * 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Step number badge */}
                <div className="absolute -top-2 right-[calc(50%-52px)] z-20">
                  <span className="text-[10px] font-black text-tk-orange/60 tracking-[0.15em]">{step.num}</span>
                </div>

                {/* Lottie circle */}
                <div className="relative z-10 w-[120px] h-[120px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] mb-5 flex items-center justify-center">
                  {/* Subtle ring */}
                  <div className="absolute inset-0 rounded-full border border-tk-orange/15 bg-white shadow-[0_4px_24px_rgba(255,77,0,0.07)] group-hover:shadow-[0_4px_32px_rgba(255,77,0,0.14)] transition-shadow duration-300" />
                  <div className="relative w-[88px] h-[88px] sm:w-[72px] sm:h-[72px] md:w-[88px] md:h-[88px]">
                    <DotLottieReact
                      src={step.lottie}
                      autoplay
                      loop
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </div>

                {/* Text */}
                <h3 className="text-[16px] md:text-[17px] font-black text-tk-black mb-2 leading-tight">{step.title}</h3>
                <p className="text-[13px] md:text-sm text-gray-500 leading-relaxed max-w-[200px]">{step.description}</p>

                {/* Arrow on mobile between steps */}
                {idx < processSteps.length - 1 && (
                  <div className="sm:hidden mt-5 mb-1 flex justify-center">
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                      <path d="M8 0v16M2 10l6 8 6-8" stroke="#FF4D00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
                    </svg>
                  </div>
                )}
              </motion.article>
            ))}
          </div>

          {/* Stats row — flat, no background */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-14 md:mb-16 py-8 border-y border-gray-100"
          >
            {/* Rating */}
            <div className="flex flex-col items-center sm:items-start gap-1">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[22px] font-black text-tk-black leading-none">4.9</span>
              </div>
              <p className="text-[12px] text-gray-400 font-medium">247 avis vérifiés</p>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-10 bg-gray-200" />

            {/* Metrics */}
            {[
              { value: "1 800+", label: "Chantiers réalisés" },
              { value: "100 %", label: "Sécurité certifiée" },
              { value: "< 24h", label: "Délai d'étude" },
            ].map((s, i) => (
              <div key={i} className="text-center sm:text-left">
                <div className="text-[26px] sm:text-[24px] md:text-[28px] font-black text-tk-orange leading-none">{s.value}</div>
                <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-gray-500 mb-6 font-medium text-[15px]">
              Prêt à démarrer ? Obtenez un chiffrage précis pour votre extérieur.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-tk-black to-gray-800 text-white rounded-full font-black uppercase tracking-wider text-[13px] md:text-[14px] shadow-xl transition-all border border-gray-700 hover:border-tk-orange"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              Obtenir un chiffrage <ArrowRight size={18} className="text-tk-orange" />
            </motion.a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

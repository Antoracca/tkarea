"use client";

import { useEffect, useRef, useState } from "react";
import { type LucideIcon, BadgeCheck, CalendarClock, Megaphone, Percent, PhoneCall, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

type AnnouncementTone = "default" | "offer" | "urgent" | "service";

type AnnouncementItem = {
  icon: LucideIcon;
  title: string;
  text: string;
  href?: string;
  tone?: AnnouncementTone;
};

const announcements: AnnouncementItem[] = [
  {
    icon: CalendarClock,
    title: "Disponibilit\u00E9s",
    text: "Cr\u00E9neaux d'intervention disponibles du 16 au 22 f\u00E9vrier 2026 sur Angers et Nantes.",
    tone: "default",
  },
  {
    icon: BadgeCheck,
    title: "Devis",
    text: "D\u00E9lai moyen de devis: 24h ouvr\u00E9es apr\u00E8s r\u00E9ception du plan de site.",
    href: "#contact",
    tone: "service",
  },
  {
    icon: ShieldCheck,
    title: "Conformit\u00E9",
    text: "Mise en conformit\u00E9 PMR et NF garantie avec contr\u00F4le final avant livraison.",
    tone: "service",
  },
  {
    icon: Percent,
    title: "Offre entreprises",
    text: "Offre T1 2026: -10% sur marquage complet parking, valable jusqu'au 31 mars 2026.",
    href: "#contact",
    tone: "offer",
  },
  {
    icon: PhoneCall,
    title: "Urgence",
    text: "Cellule intervention rapide: 06 05 76 99 52, r\u00E9ponse imm\u00E9diate du lundi au samedi.",
    href: "tel:0605769952",
    tone: "urgent",
  },
];

const toneStyles: Record<AnnouncementTone, string> = {
  default: "border-white/20 bg-white/[0.06] text-gray-100",
  offer: "border-tk-orange/45 bg-tk-orange/12 text-white",
  urgent: "border-red-400/45 bg-red-500/12 text-red-100",
  service: "border-sky-300/35 bg-sky-300/10 text-sky-50",
};

export default function AnnouncementTicker() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const reduceMotion = useReducedMotion();
  const items = [...announcements, ...announcements];

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const isScrollingDown = currentY > lastScrollY.current;

      if (currentY < 24) {
        setVisible(true);
      } else if (isScrollingDown && currentY > 96) {
        setVisible(false);
      } else if (!isScrollingDown) {
        setVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.aside
      aria-label="Annonces de l'agence"
      className="fixed left-0 right-0 top-[72px] z-40 md:top-[80px]"
      initial={false}
      animate={{
        y: visible ? 0 : -72,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.24, ease: "easeOut" }}
    >
      <div className="relative border-y border-white/10 bg-[#0D1119]/95 shadow-[0_14px_28px_rgba(0,0,0,0.35)] backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] items-center gap-2 px-2 py-2 md:gap-3 md:px-5">
          <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-tk-orange/40 bg-tk-orange/12 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-tk-orange md:px-3">
            <Megaphone size={12} />
            <span className="hidden sm:inline">Annonces agence</span>
            <span className="sm:hidden">Infos</span>
          </div>

          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
            <motion.div
              className="flex min-w-max items-center gap-2 py-0.5 md:gap-3"
              animate={reduceMotion ? { x: 0 } : { x: ["0%", "-50%"] }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 34,
                      ease: "linear",
                      repeat: Infinity,
                    }
              }
            >
              {items.map((item, index) => {
                const Icon = item.icon;
                const tone = item.tone ?? "default";
                return (
                  <a
                    key={`${item.title}-${index}`}
                    href={item.href ?? "#contact"}
                    className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-xs font-semibold transition-colors md:px-3 md:py-2 ${toneStyles[tone]}`}
                  >
                    <Icon size={14} className="shrink-0 opacity-90" />
                    <span className="hidden text-[10px] font-extrabold uppercase tracking-[0.12em] lg:inline">
                      {item.title}
                    </span>
                    <span className="whitespace-nowrap text-[11px] md:text-xs">{item.text}</span>
                  </a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

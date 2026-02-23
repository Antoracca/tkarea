"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();

  // Détection scroll pour changer le style (transparent → fond)
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["expertise", "agence", "realisations", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      setActiveSection(current || "");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const menuItems = [
    { label: "Expertise", href: "#expertise" },
    { label: "Agence", href: "#agence" },
    { label: "Réalisations", href: "#realisations" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* NAVBAR - Floating Glass Pill Design on scroll */}
      <motion.nav
        className={`
          fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out
          ${isScrolled
            ? 'top-4 md:top-6 w-[96%] max-w-7xl rounded-full bg-[#0a0a0c]/70 backdrop-blur-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10 py-2.5 md:py-3 px-5 md:px-8'
            : 'top-0 w-full bg-gradient-to-b from-black/80 via-black/30 to-transparent py-4 md:py-8 px-5 md:px-8 border-none backdrop-blur-none shadow-none'
          }
        `}
      >
        <div className="w-full">
          <div className="flex items-center justify-between">

            {/* LOGO + MARQUE */}
            <Link href="/" className="relative z-50 flex items-center gap-4 group">
              {/* Logo */}
              <div className="relative">
                <div className={`absolute inset-0 bg-tk-orange/30 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-full ${isScrolled ? 'h-10 w-10' : 'h-16 w-16'}`} />
                <motion.img
                  src="/logo1.png"
                  alt="TK ARÉA"
                  className="relative z-10 object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                  style={{
                    height: isScrolled ? '44px' : '64px',
                    width: isScrolled ? '44px' : '64px',
                  }}
                  animate={{
                    height: isScrolled ? '44px' : '64px',
                    width: isScrolled ? '44px' : '64px',
                  }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                />
              </div>

              {/* Texte TK AREA */}
              <div className="flex flex-col leading-tight">
                <motion.span
                  className="font-black uppercase tracking-tighter text-white"
                  style={{
                    fontSize: isScrolled ? '1.4rem' : '1.8rem',
                    textShadow: '0 4px 15px rgba(0,0,0,0.8)',
                  }}
                  animate={{
                    fontSize: isScrolled ? '1.4rem' : '1.8rem',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-white drop-shadow-lg">TK</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-tk-orange to-orange-400 drop-shadow-[0_0_10px_rgba(255,77,0,0.4)]"> AREA</span>
                </motion.span>
                <div className="overflow-hidden">
                  <motion.span
                    className="block text-[10px] text-gray-300 uppercase tracking-[0.2em] font-bold drop-shadow-md"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: isScrolled ? 1 : 0, height: isScrolled ? 'auto' : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Aménagement Urbain
                  </motion.span>
                </div>
              </div>
            </Link>

            {/* DESKTOP MENU */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-12">
              {menuItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative group py-2"
                  >
                    <span
                      className={`
                        text-[13px] font-black uppercase tracking-[0.15em] transition-all duration-300
                        ${isActive
                          ? 'text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]'
                          : 'text-gray-400 hover:text-white drop-shadow-[0_0_8px_rgba(255,255,255,0)] group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]'
                        }
                      `}
                    >
                      {item.label}
                    </span>

                    {/* Ligne Glow active/hover */}
                    <div className="absolute -bottom-1 left-0 right-0 h-[2px] overflow-hidden flex justify-center">
                      <motion.div
                        className="h-full rounded-full bg-tk-orange shadow-[0_0_10px_rgba(255,77,0,1)]"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{
                          width: isActive ? "80%" : 0,
                          opacity: isActive ? 1 : 0
                        }}
                        whileHover={{ width: "100%", opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    </div>
                  </Link>
                );
              })}

              {/* CTA Button Premium - Urgence */}
              <motion.a
                href="tel:0605769952"
                className="
                  relative flex items-center gap-3 px-6 py-2.5 rounded-full font-black text-xs
                  uppercase tracking-widest overflow-hidden group border border-tk-orange/50 
                  bg-gradient-to-r from-tk-orange/10 to-transparent text-white backdrop-blur-sm
                  shadow-[0_0_20px_rgba(255,77,0,0.15)] hover:shadow-[0_0_30px_rgba(255,77,0,0.4)] transition-all
                "
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Effet Scanner Lumineux */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-tk-orange/40 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />

                {/* Fond plein qui apparait au hover */}
                <div className="absolute inset-0 bg-tk-orange opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10 bg-tk-orange/20 group-hover:bg-white/20 p-1.5 rounded-full transition-colors duration-300">
                  <Phone size={14} className="text-tk-orange group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white mt-0.5">
                  Urgence 24/7
                </span>
              </motion.a>
            </div>

            {/* MOBILE MENU TOGGLE PREMIUM */}
            <motion.button
              onClick={() => setIsOpen(true)}
              className="lg:hidden relative z-50 flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-md"
              aria-label="Ouvrir le menu"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu size={22} strokeWidth={2.5} className="text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU - GLASSMORPHISM PROFOND */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop extra flou avec gradient vignette */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-50 bg-[#000000]/40 backdrop-blur-2xl"
              onClick={() => setIsOpen(false)}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(255,77,0,0.15),transparent_50%)]" />
            </motion.div>

            {/* Menu panel - Slide depuis la droite en mode Glass Dark */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-sm border-l border-white/10 bg-[#0a0a0c]/80 backdrop-blur-3xl shadow-[-20px_0_60px_rgba(0,0,0,0.8)]"
            >
              {/* Halos internes */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-tk-orange/20 rounded-full blur-[100px] pointer-events-none" />

              <div className="h-full flex flex-col p-8 relative z-10">
                {/* Header Mobile */}
                <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
                  {/* Logo + Marque */}
                  <div className="flex items-center gap-4">
                    <motion.img
                      src="/logo1.png"
                      alt="TK ARÉA"
                      className="h-12 w-12 object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    />
                    <div className="flex flex-col leading-tight">
                      <span className="text-xl font-black uppercase tracking-tighter text-white drop-shadow-lg">
                        TK <span className="text-transparent bg-clip-text bg-gradient-to-r from-tk-orange to-orange-400">AREA</span>
                      </span>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-tk-orange hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <X size={20} strokeWidth={2.5} />
                  </motion.button>
                </div>

                {/* Navigation links Mobile */}
                <nav className="flex-1 flex flex-col gap-6 pt-4">
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between text-3xl font-black uppercase tracking-tight text-gray-400 transition-colors hover:text-white"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.1 + (index * 0.1),
                        type: "spring",
                        stiffness: 150
                      }}
                    >
                      <span className="relative">
                        {item.label}
                        <span className="absolute -bottom-2 left-0 w-0 h-1 rounded-full bg-tk-orange transition-all duration-300 group-hover:w-1/2 shadow-[0_0_10px_rgba(255,77,0,0.8)]" />
                      </span>
                      <span className="text-tk-orange opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                        →
                      </span>
                    </motion.a>
                  ))}
                </nav>

                {/* Call To Action Mobile Premium */}
                <div className="mt-8 mb-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4 px-2">Besoin d'une intervention rapide ?</p>
                  <motion.a
                    href="tel:0605769952"
                    className="
                      relative flex items-center justify-center gap-3
                      bg-gradient-to-br from-tk-orange to-[#cc3d00] py-4 rounded-2xl
                      font-black text-sm text-white uppercase tracking-widest
                      shadow-[0_15px_30px_rgba(255,77,0,0.3)]
                      overflow-hidden border border-tk-orange/50
                    "
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-white/20 -translate-y-full transition-transform duration-500 hover:translate-y-0" />
                    <Phone size={18} className="relative z-10" />
                    <span className="relative z-10 mt-0.5 mt-0.5">Urgence 24/7</span>
                  </motion.a>
                </div>

                {/* Footer Mobile */}
                <motion.div
                  className="pt-6 flex items-center justify-center text-gray-500 text-[10px] font-medium tracking-widest uppercase gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="text-white">TK ARÉA</span>
                  <span>•</span>
                  <span>Opérationnel France</span>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

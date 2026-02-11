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
      {/* NAVBAR - Toujours visible, change juste de couleur */}
      <motion.nav
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${isScrolled
            ? 'glass-dark shadow-2xl py-3 md:py-4'
            : 'bg-transparent py-4 md:py-6'
          }
        `}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">

            {/* LOGO + MARQUE */}
            <Link href="/" className="relative z-50 flex items-center gap-4">
              {/* Logo */}
              <motion.img
                src="/logo1.png"
                alt="TK ARÉA"
                className="object-contain drop-shadow-2xl"
                style={{
                  height: isScrolled ? '48px' : '64px',
                  width: isScrolled ? '48px' : '64px',
                }}
                animate={{
                  height: isScrolled ? '48px' : '64px',
                  width: isScrolled ? '48px' : '64px',
                }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />

              {/* Texte TK AREA */}
              <div className="flex flex-col leading-none">
                <motion.span
                  className="font-black uppercase tracking-tighter text-white"
                  style={{
                    fontSize: isScrolled ? '1.5rem' : '2rem',
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                  }}
                  animate={{
                    fontSize: isScrolled ? '1.5rem' : '2rem',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-white">TK</span>
                  <span className="text-tk-orange"> AREA</span>
                </motion.span>
                <motion.span
                  className="text-[10px] text-gray-400 uppercase tracking-widest font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isScrolled ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Aménagement Urbain
                </motion.span>
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
                        text-sm font-bold uppercase tracking-wider transition-all duration-300
                        ${isActive
                          ? 'text-tk-orange drop-shadow-lg'
                          : 'text-white hover:text-tk-orange-light'
                        }
                      `}
                    >
                      {item.label}
                    </span>

                    {/* Underline animé */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 rounded-full"
                      style={{ backgroundColor: '#FF4D00' }}
                      initial={{ width: 0 }}
                      animate={{ width: isActive ? "100%" : 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </Link>
                );
              })}

              {/* CTA Button - Urgence */}
              <motion.a
                href="tel:0605769952"
                className="
                  relative flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm
                  uppercase tracking-wider overflow-hidden group
                  border-2 border-white text-white
                "
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone size={18} className="relative z-10" />
                <span className="relative z-10 transition-colors duration-300">
                  Urgence 24/7
                </span>

                {/* Hover background orange */}
                <motion.div
                  className="absolute inset-0"
                  style={{ backgroundColor: '#FF4D00' }}
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </div>

            {/* MOBILE MENU TOGGLE */}
            <motion.button
              onClick={() => setIsOpen(true)}
              className="lg:hidden relative z-50 p-2 text-white"
              aria-label="Ouvrir le menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Menu size={28} strokeWidth={2} />
            </motion.button>
          </div>
        </div>

        {/* Gradient border bottom (visible quand scrolled) */}
        {isScrolled && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,77,0,0.5), transparent)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          />
        )}
      </motion.nav>

      {/* MOBILE MENU - Full screen */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md"
              style={{ background: '#FF4D00' }}
            >
              <div className="h-full flex flex-col p-8">

                {/* Header */}
                <div className="flex items-center justify-between mb-16">
                  {/* Logo + Marque */}
                  <div className="flex items-center gap-3">
                    <motion.img
                      src="/logo1.png"
                      alt="TK ARÉA"
                      className="h-14 w-14 object-contain"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    />
                    <div className="flex flex-col leading-none">
                      <span className="text-2xl font-black uppercase tracking-tighter text-white">
                        TK <span className="text-tk-black">AREA</span>
                      </span>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-white"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <X size={32} strokeWidth={2.5} />
                  </motion.button>
                </div>

                {/* Navigation links */}
                <nav className="flex-1 flex flex-col gap-2">
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="
                        text-5xl font-black uppercase tracking-tight text-white
                        py-4 border-b border-white/20
                        hover:pl-4 transition-all duration-300
                      "
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.1 + (index * 0.1),
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </nav>

                {/* CTA urgent */}
                <motion.a
                  href="tel:0605769952"
                  className="
                    flex items-center justify-center gap-3
                    bg-white text-tk-orange py-5 rounded-2xl
                    font-bold text-lg uppercase tracking-wider
                    shadow-2xl
                  "
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02, boxShadow: "0 30px 60px -12px rgba(0,0,0,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone size={24} />
                  Urgence 24/7
                </motion.a>

                {/* Footer */}
                <motion.div
                  className="mt-8 pt-6 border-t border-white/20 flex items-center justify-between text-white text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="font-mono">© 2026 TK ARÉA</span>
                  <span className="font-mono">FRANCE</span>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

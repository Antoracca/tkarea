"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();

  // Détecter le scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Auto-hide navbar
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  // Détecter section active
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["expertise", "agence", "réalisations", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquer scroll menu mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuItems = ["Expertise", "Agence", "Réalisations", "Contact"];

  return (
    <>
      {/* NAVBAR AMÉLIORÉE */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
          background: isScrolled
            ? 'rgba(17, 17, 17, 0.95)'
            : 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
          backdropFilter: isScrolled ? 'blur(12px)' : 'blur(4px)',
          borderBottom: isScrolled ? '1px solid rgba(255, 77, 0, 0.3)' : 'none',
        }}
        className={`
          fixed w-full top-0 z-50 text-white
          transition-all duration-500
          ${isScrolled ? 'px-4 py-2 md:px-10 md:py-3 shadow-2xl' : 'px-4 py-4 md:px-10 md:py-6'}
        `}
      >
        <div className="flex justify-between items-center">
          {/* LOGO - S'adapte au scroll */}
          <Link href="/" className="z-50">
            <motion.img
              src="/logo1.png"
              alt="TK ARÉA"
              className="object-contain drop-shadow-2xl"
              style={{
                height: isScrolled ? '60px' : '96px',
                width: isScrolled ? '60px' : '96px',
              }}
              animate={{
                height: isScrolled ? '60px' : '96px',
                width: isScrolled ? '60px' : '96px',
              }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex gap-8 lg:gap-10 font-bold text-[11px] lg:text-xs tracking-widest uppercase items-center">
            {menuItems.map((item) => {
              const isActive = activeSection === item.toLowerCase();
              return (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative group"
                >
                  <span
                    className="transition-all duration-300 drop-shadow-lg"
                    style={{
                      color: isActive ? '#FF4D00' : 'white',
                      fontWeight: isActive ? '900' : '700'
                    }}
                  >
                    {item}
                  </span>

                  {/* Underline orange animé */}
                  <motion.div
                    style={{ backgroundColor: '#FF4D00' }}
                    className="absolute -bottom-1 left-0 h-0.5"
                    initial={{ width: 0 }}
                    animate={{ width: isActive ? "100%" : 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              );
            })}

            {/* Bouton Urgence - Blanc -> Orange au hover */}
            <motion.a
              href="tel:0605769952"
              className="relative border-2 px-5 py-2 rounded-full text-[11px] lg:text-xs font-black whitespace-nowrap overflow-hidden group"
              style={{
                borderColor: 'white',
                color: 'white',
              }}
              whileHover={{
                scale: 1.05,
                borderColor: '#FF4D00',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                🚨 Urgence 24/7
              </span>
              {/* Fond orange qui slide */}
              <motion.div
                style={{ backgroundColor: '#FF4D00' }}
                className="absolute inset-0"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </div>

          {/* MOBILE TOGGLE */}
          <motion.button
            className="md:hidden z-50 p-1 text-white"
            onClick={() => setIsOpen(true)}
            aria-label="Ouvrir le menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu size={24} strokeWidth={2.5} />
          </motion.button>
        </div>
      </motion.nav>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ backgroundColor: '#FF4D00' }}
            className="fixed inset-0 z-[60] flex flex-col justify-between p-6 overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <motion.img
                src="/logo1.png"
                alt="TK ARÉA"
                className="h-24 w-24 object-contain"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
              />
              <motion.button
                onClick={() => setIsOpen(false)}
                className="p-2 text-white"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={32} strokeWidth={3} />
              </motion.button>
            </div>

            {/* Menu items */}
            <div className="flex flex-col gap-4">
              {menuItems.map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.1 + (i * 0.1),
                    type: "spring"
                  }}
                  className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
                >
                  {item}
                </motion.a>
              ))}

              {/* Bouton appel */}
              <motion.a
                href="tel:0605769952"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{ backgroundColor: '#111111' }}
                className="mt-6 text-white py-4 rounded-xl text-center font-bold uppercase tracking-widest text-sm shadow-2xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                📞 Appeler Maintenant
              </motion.a>
            </div>

            {/* Footer */}
            <motion.div
              className="text-white font-mono text-[10px] border-t border-white/20 pt-4 flex justify-between mt-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span>© 2026 TK ARÉA</span>
              <span>FRANCE</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

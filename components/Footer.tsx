"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUp, Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const links = {
    services: [
      { label: "Marquage au sol", href: "#expertise" },
      { label: "Signalisation", href: "#expertise" },
      { label: "Aménagement urbain", href: "#expertise" },
    ],
    company: [
      { label: "À propos", href: "#agence" },
      { label: "Réalisations", href: "#realisations" },
      { label: "Contact", href: "#contact" },
    ],
    legal: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Politique de confidentialité", href: "/confidentialite" },
      { label: "CGV", href: "/cgv" },
    ]
  };

  return (
    <footer ref={footerRef} className="relative bg-[#050505] text-white overflow-hidden border-t border-white/5 pt-10">
      {/* Background decoration asphalte + glow subtil */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#050505]/80 to-[#0a0a0c]" />
      </div>

      {/* Halo radial centré en haut pour asseoir le logo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-tk-orange/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="container-custom relative z-10">
        {/* Main footer content */}
        <div className="py-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {/* Column 1: Brand */}
          <div className="flex flex-col">
            <Link href="/" className="inline-block mb-6 group">
              <div className="relative h-16 w-16 transition-transform duration-500 group-hover:scale-105">
                {/* Glow derrière le logo au hover */}
                <div className="absolute inset-0 bg-tk-orange/20 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-full" />
                <img
                  src="/logo1.png"
                  alt="TK ARÉA Logo"
                  className="relative z-10 h-full w-full object-contain filter drop-shadow-lg"
                />
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 mb-8 max-w-xs font-medium">
              L&apos;excellence du marquage au sol, de la signalisation routière et de l&apos;aménagement urbain. Intervention réactive sur tout le territoire national.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" }
              ].map((social, i) => (
                <motion.a
                  key={social.label}
                  href="#"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors hover:border-tk-orange/50 hover:bg-tk-orange/10"
                  aria-label={social.label}
                >
                  <social.icon size={18} className="text-gray-400 transition-colors group-hover:text-tk-orange" />
                  <div className="absolute inset-0 bg-tk-orange rounded-xl opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-20" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tk-orange/50" />
              Expertises
            </h3>
            <ul className="space-y-4">
              {links.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="group flex items-center text-sm font-medium text-gray-400 transition-colors hover:text-white"
                  >
                    <span className="w-0 overflow-hidden transition-all duration-300 group-hover:w-3 text-tk-orange mr-0 group-hover:mr-2">-</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tk-orange/50" />
              L&apos;Entreprise
            </h3>
            <ul className="space-y-4">
              {links.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="group flex items-center text-sm font-medium text-gray-400 transition-colors hover:text-white"
                  >
                    <span className="w-0 overflow-hidden transition-all duration-300 group-hover:w-3 text-tk-orange mr-0 group-hover:mr-2">-</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tk-orange/50" />
              Contact Direct
            </h3>
            <ul className="space-y-5">
              <li>
                <a href="tel:0605769952" className="group flex items-start gap-4">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-tk-orange/10 text-tk-orange transition-colors group-hover:bg-tk-orange group-hover:text-white">
                    <Phone size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-0.5">Téléphone</p>
                    <p className="text-sm font-semibold text-gray-300 transition-colors group-hover:text-white">06 05 76 99 52</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:info@tkarea.com" className="group flex items-start gap-4">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-tk-orange/10 text-tk-orange transition-colors group-hover:bg-tk-orange group-hover:text-white">
                    <Mail size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-0.5">Email</p>
                    <p className="text-sm font-semibold text-gray-300 transition-colors group-hover:text-white">info@tkarea.com</p>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-gray-400">
                  <MapPin size={14} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-0.5">Siège Social</p>
                  <address className="text-sm font-medium text-gray-400 not-italic leading-relaxed">
                    8 Rue Mélilot<br />
                    49080 Bouchemaine<br />
                    France
                  </address>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider texturé */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom bar */}
        <div className="pt-8 pb-24 md:pb-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs font-medium tracking-wide">
            © {new Date().getFullYear()} TK ARÉA. Tous droits réservés.
          </p>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {links.legal.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-gray-500 hover:text-white text-xs font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-tk-orange after:transition-all hover:after:w-full pb-1"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Back to top — desktop uniquement, visible seulement quand le footer est à l'écran */}
      <AnimatePresence>
        {footerVisible && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.7, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 12 }}
            transition={{ type: "spring", damping: 20, stiffness: 280 }}
            whileHover={{ y: -5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Retour en haut"
            className="hidden md:flex fixed bottom-10 left-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-tk-orange to-[#cc3d00] items-center justify-center text-white shadow-[0_10px_25px_rgba(255,77,0,0.4)] group overflow-hidden z-40 border border-white/20"
          >
            <div className="absolute inset-0 bg-white/20 -translate-y-[150%] transition-transform duration-500 group-hover:translate-y-0" />
            <ArrowUp size={22} className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}

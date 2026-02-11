"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUp, Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <footer className="relative bg-tk-black text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]
                      bg-tk-orange/10 rounded-full blur-[150px]" />

      <div className="container-custom relative z-10">
        {/* Main footer content */}
        <div className="py-20 grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Column 1: Brand */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <img
                src="/logo1.png"
                alt="TK ARÉA"
                className="h-16 w-16 object-contain"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              Expert en marquage au sol, signalisation routière et aménagement urbain.
              Intervention 24/7 partout en France.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-tk-orange
                           flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-tk-orange
                           flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-tk-orange
                           flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-lg font-black uppercase mb-6">Services</h3>
            <ul className="space-y-3">
              {links.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-tk-orange transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-lg font-black uppercase mb-6">Entreprise</h3>
            <ul className="space-y-3">
              {links.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-tk-orange transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-black uppercase mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-tk-orange mt-1 flex-shrink-0" />
                <a href="tel:0605769952" className="text-gray-400 hover:text-white transition-colors">
                  06 05 76 99 52
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-tk-orange mt-1 flex-shrink-0" />
                <a href="mailto:info@tkarea.fr" className="text-gray-400 hover:text-white transition-colors">
                  info@tkarea.fr
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-tk-orange mt-1 flex-shrink-0" />
                <address className="text-gray-400 not-italic">
                  2 Allée Melilot<br />
                  49080 Bouchemaine<br />
                  France
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Bottom bar */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 TK ARÉA. Tous droits réservés.
          </p>

          <div className="flex flex-wrap gap-6">
            {links.legal.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full gradient-orange
                   flex items-center justify-center shadow-2xl hover:scale-110
                   transition-transform z-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        aria-label="Retour en haut"
      >
        <ArrowUp size={24} />
      </motion.button>
    </footer>
  );
}

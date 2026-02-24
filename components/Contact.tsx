"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, Mail, MapPin, Phone, Send, ShieldCheck, Timer } from "lucide-react";
import Image from "next/image";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Le nom est requis";
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Le téléphone est requis";
    } else if (!/^[0-9\s+()-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Numéro invalide";
    }

    if (!formData.message.trim()) newErrors.message = "Le message est requis";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Formatage du message WhatsApp
      const waNumber = "23672421246"; // API Whatsapp officiel: 236 (Centrafrique) sans le 00 ni le +
      const text = `*NOUVELLE DEMANDE DE DEVIS* 🚧

*Contact :* ${formData.name}
*Email :* ${formData.email}
*Téléphone :* ${formData.phone}

*Description du Projet :*
${formData.message}
      `;

      const encodedText = encodeURIComponent(text);
      // Utilisation du endpoint officiel d'envoi. 'wa.me' pose parfois des soucis de redirection JS.
      const waUrl = `https://api.whatsapp.com/send/?phone=${waNumber}&text=${encodedText}&type=phone_number&app_absent=0`;

      // Ouverture de WhatsApp dans un nouvel onglet
      window.open(waUrl, '_blank');

      setStatus({ type: "success", text: "Super ! WhatsApp s'ouvre avec votre message pré-rempli." });

      // On vide le formulaire immédiatement pour confirmer l'action visuellement
      setFormData({ name: "", company: "", email: "", phone: "", message: "" });

      // On laisse le message de succès visible 8 secondes (car le client change d'onglet)
      setTimeout(() => {
        setStatus(null);
      }, 8000);

    } catch {
      setStatus({ type: "error", text: "Erreur lors de l'ouverture de WhatsApp." });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Téléphone",
      content: "06 05 76 99 52",
      link: "tel:0605769952",
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@tkarea.fr",
      link: "mailto:info@tkarea.fr",
    },
    {
      icon: MapPin,
      title: "Adresse",
      content: "2 Allée Mélilot, 49080 Bouchemaine",
      link: "https://maps.google.com/?q=2+All%C3%A9e+M%C3%A9lilot+49080+Bouchemaine",
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-[#0a0a0c] py-24 text-white md:py-32">
      {/* NOUVEAU FOND RUBIS/ASPHALTE AVEC TEXTURE DENSE */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(40,40,45,0.6),transparent_70%)]" />
        {/* Dégradé lourd pour noyer la texture dans les bords et laisser la structure centrale brillante */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-transparent" />
      </div>

      {/* Halos Lumineux dynamiques */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_0%_30%,rgba(255,77,0,0.15),transparent_40%),radial-gradient(circle_at_100%_80%,rgba(255,77,0,0.1),transparent_35%)]" />

      <div className="container-custom relative z-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">

          {/* COLONNE GAUCHE : INFOS */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tk-orange/15 border border-tk-orange/30 mb-8">
                <ShieldCheck size={14} className="text-tk-orange" />
                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-tk-orange">Intervention</span>
              </div>
              <h2 className="text-4xl font-black leading-tight md:text-5xl lg:text-5xl text-white mb-6 tracking-tight">
                Discutons de votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-tk-orange to-orange-400">chantier.</span>
              </h2>
              <p className="text-lg leading-relaxed text-gray-400 font-medium">
                Besoin d&apos;une ligne PMR, d&apos;un marquage industriel urgent ou d&apos;une simple remise en peinture ? Nos équipes organisent votre intervention sous 48h.
              </p>
            </div>

            <div className="space-y-4 relative">
              {/* Ligne de connexion visuelle verticale (optionnel mais très design sur desktop) */}
              <div className="hidden lg:block absolute left-[27px] top-6 bottom-6 w-px bg-gradient-to-b from-tk-orange/0 via-tk-orange/30 to-tk-orange/0 z-0" />

              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={info.title}
                    href={info.link}
                    target={info.link.startsWith("http") ? "_blank" : undefined}
                    rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ x: 8, backgroundColor: "rgba(255,255,255,0.08)" }}
                    className="relative z-10 flex items-center gap-5 rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm transition-all group hover:border-tk-orange/30 shadow-lg"
                  >
                    <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-tk-orange to-orange-600 text-white shrink-0 overflow-hidden group-hover:shadow-[0_0_20px_rgba(255,77,0,0.4)] transition-shadow">
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      <Icon size={24} className="relative z-10" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-tk-orange/80 mb-1">{info.title}</p>
                      <p className="text-base font-bold text-white leading-tight group-hover:text-tk-orange transition-colors">{info.content}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Badges de Réassurance */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-5 backdrop-blur-sm">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-tk-orange/20 text-tk-orange border border-tk-orange/20">
                  <Timer size={20} />
                </div>
                <p className="text-3xl font-black text-white mb-1">24h</p>
                <p className="text-[10px] uppercase font-bold tracking-[0.14em] text-gray-500">Chiffrage Express</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-5 backdrop-blur-sm">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-tk-orange/20 text-tk-orange border border-tk-orange/20">
                  <ShieldCheck size={20} />
                </div>
                <p className="text-3xl font-black text-white mb-1">100%</p>
                <p className="text-[10px] uppercase font-bold tracking-[0.14em] text-gray-500">Assurance Pro</p>
              </motion.div>
            </div>
          </motion.div>

          {/* COLONNE DROITE : FORMULAIRE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 relative z-10"
          >
            {/* Effet de lueur derrière le formulaire */}
            <div className="absolute inset-x-8 -inset-y-4 bg-tk-orange/5 blur-[80px] -z-10 rounded-[3rem]" />

            {isHydrated ? (
              <form onSubmit={handleSubmit} className="relative rounded-[2.5rem] border border-white/10 bg-[#121214]/80 p-6 md:p-10 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                <div className="absolute top-0 right-10 w-32 h-1 bg-gradient-to-r from-transparent via-tk-orange to-transparent opacity-50" />

                <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-6">
                  <div>
                    <h3 className="text-2xl font-black text-white md:text-3xl">Lancer l&apos;étude</h3>
                    <p className="text-gray-400 text-sm mt-2">Détaillez vos besoins pour un devis précis.</p>
                  </div>
                </div>

                <div className="grid gap-5 md:gap-6 md:grid-cols-2">
                  <div className="md:col-span-2 group">
                    <label htmlFor="name" className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-gray-400 group-focus-within:text-tk-orange transition-colors">
                      Nom complet / Société *
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Jean Dupont / Résidence Les Murets"
                      className={`w-full rounded-2xl border bg-black/40 px-5 py-4 text-[15px] font-medium text-white placeholder:text-gray-600 focus:outline-none transition-all ${errors.name ? "border-red-500/50 focus:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]" : "border-white/10 focus:border-tk-orange focus:bg-tk-orange/5"
                        }`}
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-red-400 uppercase tracking-wider">
                          <AlertCircle size={12} /> {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="group">
                    <label htmlFor="email" className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-gray-400 group-focus-within:text-tk-orange transition-colors">
                      Adresse Email *
                    </label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-tk-orange transition-colors" />
                      <input
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="contact@exemple.fr"
                        className={`w-full rounded-2xl border bg-black/40 pl-11 pr-4 py-4 text-[15px] font-medium text-white placeholder:text-gray-600 focus:outline-none transition-all ${errors.email ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-tk-orange focus:bg-tk-orange/5"
                          }`}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-red-400 uppercase tracking-wider">
                          <AlertCircle size={12} /> {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="group">
                    <label htmlFor="phone" className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-gray-400 group-focus-within:text-tk-orange transition-colors">
                      Téléphone *
                    </label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-tk-orange transition-colors" />
                      <input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        type="tel"
                        placeholder="06 12 34 56 78"
                        className={`w-full rounded-2xl border bg-black/40 pl-11 pr-4 py-4 text-[15px] font-medium text-white placeholder:text-gray-600 focus:outline-none transition-all ${errors.phone ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-tk-orange focus:bg-tk-orange/5"
                          }`}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.phone && (
                        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-red-400 uppercase tracking-wider">
                          <AlertCircle size={12} /> {errors.phone}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="md:col-span-2 group">
                    <label htmlFor="message" className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-gray-400 group-focus-within:text-tk-orange transition-colors">
                      Description du Projet *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Surfaces approximatives, dates souhaitées, type de marquage (parking, PMR, zébras)..."
                      className={`w-full resize-none rounded-2xl border bg-black/40 px-5 py-4 text-[15px] font-medium text-white placeholder:text-gray-600 focus:outline-none transition-all leading-relaxed ${errors.message ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-tk-orange focus:bg-tk-orange/5"
                        }`}
                    />
                    <AnimatePresence>
                      {errors.message && (
                        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-red-400 uppercase tracking-wider">
                          <AlertCircle size={12} /> {errors.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <AnimatePresence>
                  {status && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className={`mt-8 flex items-center gap-4 rounded-2xl border px-5 py-4 ${status.type === "success"
                        ? "border-green-500/30 bg-green-500/10 text-green-300"
                        : "border-red-500/30 bg-red-500/10 text-red-300"
                        }`}
                    >
                      <div className={`p-2 rounded-full shrink-0 ${status.type === "success" ? "bg-green-500/20" : "bg-red-500/20"}`}>
                        {status.type === "success" ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                      </div>
                      <p className="text-sm font-semibold pr-4">{status.text}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.02, backgroundColor: "#25D366" } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  className="mt-8 relative inline-flex w-full items-center justify-center gap-3 rounded-full bg-tk-orange px-8 py-5 font-black uppercase tracking-[0.2em] text-white transition-all shadow-[0_15px_30px_rgba(255,77,0,0.3)] hover:shadow-[0_20px_40px_rgba(37,211,102,0.5)] disabled:cursor-not-allowed disabled:opacity-70 disabled:shadow-none overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  {loading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-[3px] border-white/30 border-t-white" />
                      Redirection...
                    </>
                  ) : (
                    <>
                      {/* Logo simple WhatsApp-like (pour simplifier sans import externe supplémentaire) */}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 transition-transform group-hover:scale-110">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                      <span className="relative z-10 text-[13px] md:text-[14px]">Envoyer via WhatsApp</span>
                    </>
                  )}
                </motion.button>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-gray-500">
                  <ShieldCheck size={14} className="text-tk-orange/70" />
                  Données 100% sécurisées.
                </div>
              </form>
            ) : (
              // Squelette de chargement très premium
              <div className="rounded-[2.5rem] border border-white/5 bg-[#121214] p-6 md:p-10 backdrop-blur-xl">
                <div className="mb-10 flex items-center justify-between border-b border-white/5 pb-6">
                  <div>
                    <div className="h-4 w-24 animate-pulse rounded bg-white/5 mb-3" />
                    <div className="h-8 w-48 animate-pulse rounded bg-white/10" />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="h-[60px] w-full animate-pulse rounded-2xl bg-white/5" />
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="h-[60px] w-full animate-pulse rounded-2xl bg-white/5" />
                    <div className="h-[60px] w-full animate-pulse rounded-2xl bg-white/5" />
                  </div>
                  <div className="h-32 w-full animate-pulse rounded-2xl bg-white/5" />
                  <div className="h-[64px] w-full animate-pulse rounded-full bg-tk-orange/20 mt-8" />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

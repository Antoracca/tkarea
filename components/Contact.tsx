"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
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
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: "success", text: "Message envoyé. Nous vous recontactons sous 24h." });
        setFormData({ name: "", company: "", email: "", phone: "", message: "" });
        setErrors({});
      } else {
        setStatus({ type: "error", text: data.error || "Une erreur est survenue" });
      }
    } catch {
      setStatus({ type: "error", text: "Erreur de connexion. Veuillez réessayer." });
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
    <section id="contact" className="relative overflow-hidden bg-[#030303] py-24 text-white md:py-32">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2200&q=80"
          alt="Fond contact technique"
          fill
          className="object-cover opacity-15"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/85 to-black" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,77,0,0.22),transparent_32%),radial-gradient(circle_at_90%_80%,rgba(255,77,0,0.16),transparent_30%)]" />

      <div className="container-custom relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="rounded-[2rem] border border-white/15 bg-white/[0.05] p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-tk-orange">Contact</p>
              <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
                Parlons de votre prochain chantier
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-300 md:text-base">
                Besoin d&apos;une intervention planifiée ou urgente. Nous revenons vers vous rapidement avec un cadrage
                clair, un délai et une proposition actionnable.
              </p>

              <div className="mt-6 space-y-3">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.a
                      key={info.title}
                      href={info.link}
                      target={info.link.startsWith("http") ? "_blank" : undefined}
                      rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ delay: index * 0.08 }}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-4 transition-colors hover:border-tk-orange/50"
                    >
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-tk-orange text-white">
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400">{info.title}</p>
                        <p className="text-sm font-semibold text-white md:text-base">{info.content}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-tk-orange/20 text-tk-orange">
                    <Timer size={18} />
                  </div>
                  <p className="text-2xl font-black text-white">24h</p>
                  <p className="text-xs uppercase tracking-[0.14em] text-gray-400">Réponse moyenne</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-tk-orange/20 text-tk-orange">
                    <ShieldCheck size={18} />
                  </div>
                  <p className="text-2xl font-black text-white">100%</p>
                  <p className="text-xs uppercase tracking-[0.14em] text-gray-400">Conformité</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-7"
          >
            {isHydrated ? (
              <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/15 bg-white/[0.05] p-6 md:p-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-tk-orange">Formulaire</p>
                  <h3 className="mt-2 text-2xl font-black text-white md:text-3xl">Demande de devis</h3>
                </div>
                <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-gray-300">
                  Réponse rapide
                </span>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-gray-300">
                    Nom complet *
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Jean Dupont"
                    className={`w-full rounded-xl border bg-black/40 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none ${
                      errors.name ? "border-red-500" : "border-white/15 focus:border-tk-orange"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-2 flex items-center gap-2 text-xs text-red-400">
                      <AlertCircle size={14} />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-gray-300">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="email@exemple.fr"
                    className={`w-full rounded-xl border bg-black/40 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none ${
                      errors.email ? "border-red-500" : "border-white/15 focus:border-tk-orange"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-2 flex items-center gap-2 text-xs text-red-400">
                      <AlertCircle size={14} />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-gray-300">
                    Téléphone *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel"
                    placeholder="06 12 34 56 78"
                    className={`w-full rounded-xl border bg-black/40 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none ${
                      errors.phone ? "border-red-500" : "border-white/15 focus:border-tk-orange"
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-2 flex items-center gap-2 text-xs text-red-400">
                      <AlertCircle size={14} />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="company" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-gray-300">
                    Entreprise (optionnel)
                  </label>
                  <input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    type="text"
                    placeholder="Nom de votre entreprise"
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-tk-orange focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="message" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-gray-300">
                    Votre projet *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Expliquez votre besoin en quelques lignes..."
                    className={`w-full resize-none rounded-xl border bg-black/40 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none ${
                      errors.message ? "border-red-500" : "border-white/15 focus:border-tk-orange"
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-2 flex items-center gap-2 text-xs text-red-400">
                      <AlertCircle size={14} />
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              {status && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-5 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
                    status.type === "success"
                      ? "border-green-500/30 bg-green-500/10 text-green-300"
                      : "border-red-500/30 bg-red-500/10 text-red-300"
                  }`}
                >
                  {status.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  <span>{status.text}</span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-tk-orange px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white transition-all hover:shadow-2xl hover:shadow-tk-orange/40 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Envoi en cours
                  </>
                ) : (
                  <>
                    Envoyer le message
                    <Send size={16} />
                  </>
                )}
              </motion.button>

              <p className="mt-4 text-center text-xs text-gray-400">Devis gratuit, retour sous 24h</p>
              </form>
            ) : (
              <div className="rounded-[2rem] border border-white/15 bg-white/[0.05] p-6 md:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-tk-orange">Formulaire</p>
                    <h3 className="mt-2 text-2xl font-black text-white md:text-3xl">Demande de devis</h3>
                  </div>
                  <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-gray-300">
                    Réponse rapide
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="h-12 w-full animate-pulse rounded-xl bg-white/10" />
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="h-12 w-full animate-pulse rounded-xl bg-white/10" />
                    <div className="h-12 w-full animate-pulse rounded-xl bg-white/10" />
                  </div>
                  <div className="h-12 w-full animate-pulse rounded-xl bg-white/10" />
                  <div className="h-32 w-full animate-pulse rounded-xl bg-white/10" />
                  <div className="h-12 w-full animate-pulse rounded-full bg-tk-orange/50" />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

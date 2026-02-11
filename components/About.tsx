"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock3, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { useRef } from "react";

const trustedBy = ["Collectivites", "BTP", "Industrie", "Logistique", "Immobilier", "Voirie"];

const quickStats = [
  { value: "10+", label: "ans experience" },
  { value: "24/7", label: "support terrain" },
  { value: "100%", label: "conformite suivie" },
];

const highlights = [
  {
    icon: ShieldCheck,
    title: "Conformite assuree",
    text: "Normes NF et PMR integrees dans chaque phase du chantier.",
    metric: "100%",
  },
  {
    icon: Clock3,
    title: "Intervention rapide",
    text: "Equipe mobilisable en urgence avec un pilotage operationnel clair.",
    metric: "24/7",
  },
  {
    icon: Sparkles,
    title: "Rendu professionnel",
    text: "Marquage lisible, signalisation propre et finitions soignees.",
    metric: "10+ ans",
  },
];

const processSteps = ["Diagnostic terrain", "Plan action", "Execution", "Controle final"];
const tickerItems = [
  "Devis sous 24h",
  "Diagnostic circulation offert",
  "Creneaux de nuit disponibles",
  "Accompagnement collectivites",
  "Intervention urgente sur appel",
  "Contact: 06 05 76 99 52",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const visualY = useTransform(scrollYProgress, [0, 1], [0, -42]);

  return (
    <section id="agence" ref={sectionRef} className="relative overflow-hidden bg-[#f3f6fb] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(255,77,0,0.18),transparent_40%),radial-gradient(circle_at_90%_0%,rgba(10,10,10,0.08),transparent_34%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,10,10,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-10 md:mb-14"
        >
          <div className="inline-block">
            <div className="relative">
              <span className="relative z-10 text-xs font-black uppercase tracking-[0.28em] text-[#121212] md:text-sm">
                AGENCE
              </span>
              <span className="absolute -bottom-1 left-0 h-3 w-full rounded-full bg-gradient-to-r from-tk-orange via-[#ff8947] to-transparent" />
            </div>
          </div>

          <h2 className="mt-5 max-w-5xl text-heading-1 text-[#0d0d0f]">
            Une equipe qui transforme vos contraintes terrain en <span className="text-tk-orange">resultats visibles</span>
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {quickStats.map((item) => (
              <div key={item.label} className="rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5">
                <p className="text-xl font-black text-[#0f1012]">{item.value}</p>
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-[#5a5f6a]">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-6"
          >
            <p className="text-base leading-relaxed text-[#3d4048] md:text-lg">
              TK AREA accompagne les projets de marquage, signalisation et amenagement avec une methode simple:
              analyser, securiser, executer, controler. Vous gagnez du temps, de la clarte et un rendu professionnel.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "Pilotage operationnel du demarrage a la livraison",
                "Coordination equipe, materiel et contraintes de site",
                "Suivi qualite final avec verification terrain",
              ].map((point, index) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: 0.08 * index }}
                  className="flex items-start gap-3 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5"
                >
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-tk-orange" />
                  <p className="text-sm text-[#2e323b]">{point}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-tk-orange px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-tk-orange/35"
              >
                Parler du projet
                <ArrowRight size={16} />
              </a>
              <a
                href="#realisations"
                className="inline-flex items-center justify-center rounded-full border border-[#131313]/20 bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-[#141417] transition-all hover:border-[#141417]/35"
              >
                Voir nos realisations
              </a>
            </div>

            <div className="mt-7 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/6 md:p-5">
              <div className="mb-3 flex items-center gap-2">
                <Workflow size={16} className="text-tk-orange" />
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#343944]">Methode agence</p>
              </div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                {processSteps.map((step, idx) => (
                  <div key={step} className="rounded-lg bg-[#f4f6fb] px-3 py-2 text-xs font-bold text-[#2c313a]">
                    {idx + 1}. {step}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ y: visualY }}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-6"
          >
            <article className="relative overflow-hidden rounded-2xl md:rounded-[2rem] bg-[#101113] p-3 md:p-2 shadow-2xl">
              <div className="relative overflow-hidden rounded-xl md:rounded-[1.5rem]">
                {/* Image avec meilleur ratio mobile */}
                <div className="relative aspect-[4/5] sm:aspect-[16/11] md:aspect-[16/10]">
                  <Image
                    src="/equipe.png"
                    alt="Equipe TK AREA en action sur un chantier"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 46vw"
                  />
                  {/* Gradient overlay amélioré */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Effet de vignette pour mobile */}
                  <div className="absolute inset-0 md:hidden bg-gradient-to-b from-black/20 via-transparent to-black/90" />
                </div>
              </div>

              {/* Badge "Equipe" - Plus grand et mieux positionné sur mobile */}
              <div className="absolute left-4 top-4 md:left-5 md:top-5 rounded-full bg-white px-5 py-2.5 md:px-4 md:py-2 text-xs md:text-[11px] font-black uppercase tracking-[0.16em] text-[#0f0f10] shadow-xl">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tk-orange animate-pulse" />
                  Équipe TK AREA
                </span>
              </div>

              {/* Stats cards - Stack vertical sur mobile pour meilleure lisibilité */}
              <div className="absolute bottom-4 left-4 right-4 md:bottom-4 md:left-4 md:right-4 grid grid-cols-1 xs:grid-cols-2 gap-2.5 md:gap-3">
                <div className="rounded-xl md:rounded-2xl border border-white/20 bg-black/70 md:bg-black/55 p-4 md:p-4 backdrop-blur-md">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-tk-orange">Expérience</p>
                  <p className="mt-1.5 text-3xl md:text-2xl font-black text-white">10+ ans</p>
                </div>
                <div className="rounded-xl md:rounded-2xl border border-white/20 bg-black/70 md:bg-black/55 p-4 md:p-4 backdrop-blur-md">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-tk-orange">Couverture</p>
                  <p className="mt-1.5 text-3xl md:text-2xl font-black text-white">Grand Ouest</p>
                </div>
              </div>
            </article>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 md:p-6"
        >
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#444955]">Ils nous font confiance</p>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {trustedBy.map((item) => (
              <div
                key={item}
                className="flex items-center justify-center rounded-xl border border-[#151515]/10 bg-[#f8f9fc] px-3 py-3 text-center text-xs font-bold uppercase tracking-[0.11em] text-[#1a1c20] md:text-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-tk-orange text-white">
                    <Icon size={18} />
                  </div>
                  <span className="text-lg font-black text-[#121212]">{item.metric}</span>
                </div>
                <h3 className="text-lg font-black text-[#121212]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4b4f59]">{item.text}</p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 grid gap-4 md:gap-4 lg:grid-cols-12"
        >
          <article className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-[#101113] lg:col-span-8">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] md:aspect-[16/8]">
              <Image
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1800&q=80"
                alt="Preparation equipe en atelier"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 62vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
              <p className="text-xs md:text-xs font-bold uppercase tracking-[0.16em] text-tk-orange">Méthode</p>
              <h3 className="mt-2 text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">Une exécution carrée, sans perte de temps</h3>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-white p-5 md:p-6 lg:p-7 shadow-sm ring-1 ring-black/6 lg:col-span-4">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-tk-orange">Contact direct</p>
            <h3 className="mt-3 text-xl md:text-2xl font-black text-[#121212] leading-tight">Une question ? On avance vite.</h3>
            <p className="mt-3 text-sm md:text-sm leading-relaxed text-[#4a4f59]">
              Partagez votre besoin et nous revenons avec un cadrage clair, un délai réaliste et une proposition
              concrète.
            </p>
            <div className="mt-5 md:mt-6 space-y-2.5 md:space-y-2 rounded-xl md:rounded-2xl bg-[#f5f6fa] p-4 md:p-4">
              <a href="tel:0605769952" className="block text-base md:text-sm font-bold text-[#17191d] hover:text-tk-orange transition-colors">
                📞 06 05 76 99 52
              </a>
              <a href="mailto:info@tkarea.fr" className="block text-sm text-[#4a4f59] hover:text-tk-orange transition-colors">
                ✉️ info@tkarea.fr
              </a>
              <p className="text-sm text-[#4a4f59]">📍 2 Allée Mélilot, 49080 Bouchemaine</p>
            </div>
            <a
              href="#contact"
              className="mt-5 md:mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-tk-orange hover:gap-3 transition-all"
            >
              Contacter agence
              <ArrowRight size={16} />
            </a>
          </article>
        </motion.div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-[#1b1c1f]/10 bg-white py-3 shadow-sm">
          <motion.div
            className="flex min-w-max items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          >
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <div key={`${item}-${idx}`} className="mx-4 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-tk-orange" />
                <span className="text-sm font-semibold text-[#22262d]">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-b from-transparent via-tk-orange/25 to-[#050505]" />
    </section>
  );
}

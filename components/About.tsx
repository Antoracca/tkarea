"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock3, ShieldCheck, Award, Workflow } from "lucide-react";
import { useRef } from "react";

const partners = [
  { name: "Eiffage", logo: "https://commons.wikimedia.org/wiki/Special:FilePath/Eiffage_logo.svg" },
  { name: "Vinci", logo: "/logovinci.png" },
  { name: "Bouygues", logo: "https://commons.wikimedia.org/wiki/Special:FilePath/Bouygues_logo.svg" },
  { name: "Airbus", logo: "https://commons.wikimedia.org/wiki/Special:FilePath/Airbus_Logo_2017.svg" },
  { name: "Manitou", logo: "https://companieslogo.com/img/orig/MTU.PA_BIG-312f1726.png?t=1720244493" },
  { name: "Spie", logo: "https://companieslogo.com/img/orig/SPIE.PA_BIG-168c2800.png?t=1750695705" },
  { name: "EDF", logo: "https://companieslogo.com/img/orig/EDF.PA_BIG-9c97fdce.png?t=1720244491" },
  { name: "Lidl", logo: "https://companieslogo.com/img/orig/lidl-retail-8f969d52.png?t=1720244494" },
];

const quickStats = [
  { value: "10+", label: "ans d'expérience" },
  { value: "24/7", label: "support terrain" },
  { value: "100%", label: "conformité suivie" },
];

const highlights = [
  {
    icon: ShieldCheck,
    title: "Conformité assurée",
    text: "Normes NF et PMR intégrées dans chaque phase du chantier.",
    metric: "100%",
  },
  {
    icon: Clock3,
    title: "Intervention rapide",
    text: "Équipe mobilisable en urgence avec un pilotage opérationnel clair.",
    metric: "24/7",
  },
  {
    icon: Award,
    title: "Rendu professionnel",
    text: "Marquage lisible, signalisation propre et finitions soignées.",
    metric: "10+ ans",
  },
];

const processSteps = ["Diagnostic terrain", "Plan d'action", "Exécution", "Contrôle final"];
const tickerItems = [
  "Devis sous 24h",
  "Diagnostic circulation offert",
  "Créneaux de nuit disponibles",
  "Accompagnement collectivités",
  "Intervention urgente sur appel",
  "Contact : 06 05 76 99 52",
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
            Une équipe qui transforme vos contraintes terrain en <span className="text-transparent bg-clip-text bg-gradient-to-r from-tk-orange to-[#ff8947]">résultats visibles</span>
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {quickStats.map((item, idx) => (
              <motion.div
                key={item.label}
                className="rounded-xl bg-white/60 backdrop-blur-md px-4 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 transition-transform duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
              >
                <p className="text-xl font-black text-[#0f1012]">{item.value}</p>
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-[#5a5f6a]">{item.label}</p>
              </motion.div>
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
              TK AREA accompagne les projets de marquage, signalisation, signalétique et aménagement urbain avec une méthode simple :
              analyser, sécuriser, exécuter, contrôler. Vous gagnez du temps, de la clarté et un rendu professionnel.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "Pilotage opérationnel du démarrage à la livraison",
                "Coordination équipe, matériel et contraintes de site",
                "Suivi qualité final avec vérification terrain",
              ].map((point, index) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: 0.08 * index }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 rounded-xl bg-white/70 backdrop-blur-sm px-4 py-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-white/60 cursor-default"
                >
                  <CheckCircle2 size={18} className="shrink-0 text-tk-orange drop-shadow-sm" />
                  <p className="text-sm font-medium text-[#2e323b]">{point}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-tk-orange px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white transition-all hover:scale-105 hover:shadow-[0_10px_25px_rgba(255,77,0,0.4)]"
              >
                Parler du projet
                <ArrowRight size={16} />
              </a>
              <a
                href="#realisations"
                className="inline-flex items-center justify-center rounded-full border-2 border-[#131313]/10 bg-white/50 backdrop-blur-md px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-[#141417] transition-all hover:border-[#141417]/80 hover:bg-white"
              >
                Voir nos réalisations
              </a>
            </div>

            <div className="mt-7 rounded-2xl bg-white/80 backdrop-blur-lg p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
              <div className="mb-4 flex items-center gap-2">
                <Workflow size={18} className="text-tk-orange" />
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#343944]">Méthode agence</p>
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {processSteps.map((step, idx) => (
                  <div key={step} className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#f4f6fb] to-white px-3 py-2.5 text-xs font-bold text-[#2c313a] shadow-sm border border-black/5 group">
                    <div className="absolute inset-0 bg-tk-orange/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative z-10 text-tk-orange mr-1">{idx + 1}.</span>
                    <span className="relative z-10">{step}</span>
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
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#444955] mb-5">Ils nous font confiance</p>
          <div className="relative overflow-hidden">
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <motion.div
              className="flex min-w-max items-center gap-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            >
              {[...partners, ...partners].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="flex-shrink-0 flex flex-col items-center justify-center gap-2 px-6 py-4 bg-[#f8f9fc] rounded-xl border border-[#e8eaef] w-36 h-20 group hover:border-tk-orange/30 hover:bg-orange-50 transition-all duration-300 cursor-default"
                >
                  <img
                    src={partner.logo}
                    alt={`Logo ${partner.name}`}
                    className="h-7 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#9aa0aa] group-hover:text-[#4a4f5a] transition-colors duration-300 text-center leading-tight">{partner.name}</span>
                </div>
              ))}
            </motion.div>
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
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-md p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white transition-all duration-300 hover:shadow-[0_20px_40px_rgba(255,77,0,0.1)]"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-tk-orange/5 rounded-full blur-2xl -translate-y-10 translate-x-10 group-hover:bg-tk-orange/10 transition-colors duration-500" />
                <div className="mb-5 flex items-center justify-between relative z-10">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-tk-orange to-[#ff6a1a] text-white shadow-lg shadow-tk-orange/20">
                    <Icon size={22} className="group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#121212] to-[#4a4f59]">{item.metric}</span>
                </div>
                <h3 className="text-lg font-black text-[#121212] relative z-10">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4b4f59] relative z-10">{item.text}</p>
              </motion.article>
            );
          })}
        </div>

        {/* ── SECTION ROUTE — image plein largeur, texte gauche + droite ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 relative overflow-hidden rounded-2xl md:rounded-3xl"
          style={{ minHeight: 280 }}
        >
          {/* Image de fond — route jaune vers l'infini */}
          <Image
            src="https://images.unsplash.com/photo-1661666095235-dc13a42b0d78?q=80&w=1400&auto=format&fit=crop"
            alt="Route marquée vers l'horizon"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />

          {/* Voile sombre pour lisibilité du texte */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/75" />

          {/* Contenu — texte gauche / texte droite */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between h-full px-7 py-10 md:px-12 md:py-12 gap-8 sm:gap-0">

            {/* Gauche */}
            <div className="text-center sm:text-left max-w-xs">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-tk-orange mb-2">Notre terrain</p>
              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                Chaque mètre carré<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-tk-orange to-orange-300">compte.</span>
              </h3>
              <p className="mt-3 text-sm text-white/60 leading-relaxed max-w-[220px] mx-auto sm:mx-0">
                Du bitume à la signalisation, nous intervenons partout où la précision fait la différence.
              </p>
            </div>

            {/* Séparateur vertical — desktop seulement */}
            <div className="hidden sm:block h-20 w-px bg-white/15" />

            {/* Droite */}
            <div className="text-center sm:text-right max-w-xs">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-tk-orange mb-2">Notre bilan</p>
              <div className="flex flex-col gap-3">
                {[
                  { val: "1 800+", lbl: "chantiers réalisés" },
                  { val: "Grand Ouest", lbl: "zone d'intervention" },
                  { val: "< 24h", lbl: "délai d'étude" },
                ].map((s) => (
                  <div key={s.val} className="flex items-baseline gap-2 justify-center sm:justify-end">
                    <span className="text-xl font-black text-white">{s.val}</span>
                    <span className="text-xs text-white/50 font-medium">{s.lbl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

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

          <article className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-white/90 backdrop-blur-xl p-5 md:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white lg:col-span-4">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-tk-orange">Contact direct</p>
            <h3 className="mt-3 text-xl md:text-2xl font-black text-[#121212] leading-tight">Une question ? On avance vite.</h3>
            <p className="mt-3 text-sm md:text-sm leading-relaxed text-[#4a4f59]">
              Partagez votre besoin et nous revenons avec un cadrage clair, un délai réaliste et une proposition
              concrète.
            </p>
            <div className="mt-5 md:mt-6 space-y-2.5 md:space-y-2 rounded-xl md:rounded-2xl bg-[#f5f6fa]/80 p-4 md:p-4 border border-[#e5e7eb]">
              <a href="tel:0605769952" className="flex items-center gap-2 text-base md:text-sm font-bold text-[#17191d] hover:text-tk-orange transition-colors">
                <span className="text-lg">📞</span> 06 05 76 99 52
              </a>
              <a href="mailto:info@tkarea.com" className="flex items-center gap-2 text-sm text-[#4a4f59] hover:text-tk-orange transition-colors">
                <span className="text-lg">✉️</span> info@tkarea.com
              </a>
              <p className="flex items-center gap-2 text-sm text-[#4a4f59]">
                <span className="text-lg">📍</span> 8 Rue Mélilot, 49080 Bouchemaine
              </p>
            </div>
            <a
              href="#contact"
              className="mt-6 md:mt-8 flex items-center justify-center w-full gap-2 rounded-xl bg-[#121212] py-4 text-sm font-black uppercase tracking-[0.14em] text-white hover:bg-tk-orange transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Contacter l&apos;agence
              <ArrowRight size={18} />
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

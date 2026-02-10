"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock3, ShieldCheck, Sparkles } from "lucide-react";
import { useRef } from "react";

const trustedBy = [
  "Collectivités",
  "BTP",
  "Industrie",
  "Logistique",
  "Immobilier",
  "Voirie",
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
    icon: Sparkles,
    title: "Rendu professionnel",
    text: "Marquage lisible, signalisation propre et finitions soignées.",
    metric: "10+ ans",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const visualY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section id="agence" ref={sectionRef} className="relative overflow-hidden bg-[#f4f6fb] py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(255,77,0,0.16),transparent_40%),radial-gradient(circle_at_90%_0%,rgba(10,10,10,0.08),transparent_32%)]" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,10,10,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
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
            Une équipe qui transforme vos contraintes terrain en <span className="text-tk-orange">résultats visibles</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-6"
          >
            <p className="text-base leading-relaxed text-[#3d4048] md:text-lg">
              TK ARÉA accompagne les projets de marquage, signalisation et aménagement avec une méthode simple:
              analyser, sécuriser, exécuter, contrôler. Vous gagnez du temps, de la clarté et un rendu professionnel.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "Pilotage opérationnel du démarrage à la livraison",
                "Coordination équipe, matériel et contraintes de site",
                "Suivi qualité final avec vérification terrain",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-tk-orange" />
                  <p className="text-sm text-[#2e323b]">{point}</p>
                </div>
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
                Voir nos réalisations
              </a>
            </div>
          </motion.div>

          <motion.div
            style={{ y: visualY }}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-6"
          >
            <article className="relative overflow-hidden rounded-[2rem] bg-[#101113] p-2 shadow-[0_30px_80px_-35px_rgba(10,10,10,0.65)]">
              <div className="relative overflow-hidden rounded-[1.5rem]">
                <div className="relative aspect-[16/12] md:aspect-[16/10]">
                  <Image
                    src="/equipe.png"
                    alt="Équipe TK ARÉA"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 46vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>
              </div>

              <div className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#0f0f10]">
                Équipe TK ARÉA
              </div>

              <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/15 bg-black/55 p-4 backdrop-blur-md">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-tk-orange">Expérience</p>
                  <p className="mt-1 text-2xl font-black text-white">10+ ans</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-black/55 p-4 backdrop-blur-md">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-tk-orange">Couverture</p>
                  <p className="mt-1 text-2xl font-black text-white">Grand Ouest</p>
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
          className="mt-8 grid gap-4 lg:grid-cols-12"
        >
          <article className="group relative overflow-hidden rounded-3xl bg-[#101113] lg:col-span-8">
            <div className="relative aspect-[16/11] md:aspect-[16/8]">
              <Image
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1800&q=80"
                alt="Préparation d’équipe en atelier"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 62vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-tk-orange">Méthode</p>
              <h3 className="mt-1 text-2xl font-black text-white md:text-3xl">Une exécution carrée, sans perte de temps</h3>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/6 lg:col-span-4 md:p-7">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-tk-orange">Contact direct</p>
            <h3 className="mt-3 text-2xl font-black text-[#121212]">Une question? On avance vite.</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#4a4f59]">
              Partagez votre besoin et nous revenons avec un cadrage clair, un délai réaliste et une proposition
              concrète.
            </p>
            <div className="mt-6 space-y-2 rounded-2xl bg-[#f5f6fa] p-4">
              <p className="text-sm font-semibold text-[#17191d]">06 05 76 99 52</p>
              <p className="text-sm text-[#4a4f59]">info@tkarea.fr</p>
              <p className="text-sm text-[#4a4f59]">2 Allée Melilot, 49080 Bouchemaine</p>
            </div>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-tk-orange"
            >
              Contacter l’agence
              <ArrowRight size={15} />
            </a>
          </article>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-b from-transparent via-tk-orange/25 to-[#050505]" />
    </section>
  );
}

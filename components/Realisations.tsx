"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Layers3, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

type Category = "Tous" | "Marquage" | "Signalisation" | "Amenagement" | "Logistique";

type PortfolioItem = {
  id: string;
  title: string;
  category: Exclude<Category, "Tous">;
  image: string;
  location: string;
  result: string;
  summary: string;
  featured?: boolean;
};

type FlyerItem = {
  id: string;
  title: string;
  image: string;
  format: string;
  summary: string;
};

const categories: Category[] = ["Tous", "Marquage", "Signalisation", "Amenagement", "Logistique"];

const portfolioItems: PortfolioItem[] = [
  {
    id: "p1",
    title: "Signalisation complete de zone chantier",
    category: "Signalisation",
    image: "/imageposefeusignalisation.png",
    location: "Maine-et-Loire",
    result: "Mise en securite rapide et conforme",
    summary: "Installation des points de signalisation critiques avec lecture immediate pour les usagers.",
    featured: true,
  },
  {
    id: "p2",
    title: "Flotte mobile pour interventions urgentes",
    category: "Logistique",
    image: "/camion2orange.png",
    location: "Angers",
    result: "Equipe deployable sous 2h",
    summary: "Vehicules equipes et organisation terrain pour assurer une intervention fluide.",
  },
  {
    id: "p3",
    title: "Marquage route et axes de circulation",
    category: "Marquage",
    image: "/tracageroute.png",
    location: "Grand Ouest",
    result: "Lisibilite renforcee",
    summary: "Marquage structure avec une finition durable pour routes et acces logistiques.",
  },
  {
    id: "p4",
    title: "Amenagement de voirie urbaine",
    category: "Amenagement",
    image: "/traveauxbitume.png",
    location: "Bouchemaine",
    result: "Flux pietons et vehicules mieux organises",
    summary: "Structuration des zones de passage avec vision securite et usage quotidien.",
  },
  {
    id: "p5",
    title: "Support d equipe sur chantier actif",
    category: "Logistique",
    image: "/techandvehicule.png",
    location: "Pays de la Loire",
    result: "Coordination terrain optimisee",
    summary: "Synchronisation des equipes, materiel et delais avec suivi operationnel.",
  },
  {
    id: "p6",
    title: "Dispositif de balisage temporaire",
    category: "Signalisation",
    image: "/camionnette.png",
    location: "Nantes",
    result: "Mise en place rapide",
    summary: "Balisage provisoire pour garder la circulation active pendant les travaux.",
  },
];

const flyerItems: FlyerItem[] = [
  {
    id: "f1",
    title: "Flyer institutionnel",
    image: "/flyers1.jpeg",
    format: "A5 premium",
    summary: "Support clair pour presenter les services et la valeur terrain de TK AREA.",
  },
  {
    id: "f2",
    title: "Flyer offres terrain",
    image: "/flyers2.jpeg",
    format: "A5 diffusion",
    summary: "Mise en avant des offres, contact rapide et proposition commerciale directe.",
  },
];

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-3xl border border-white/12 ${
        item.featured ? "aspect-[16/10] md:aspect-[16/8]" : "aspect-[4/5]"
      }`}
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes={item.featured ? "(max-width: 768px) 100vw, 68vw" : "(max-width: 768px) 100vw, 33vw"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-white backdrop-blur-sm">
        {item.category}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-tk-orange">{item.location}</p>
        <h3 className="mt-1 text-xl font-black text-white md:text-2xl">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-200">{item.summary}</p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
          <CheckCircle2 size={14} className="text-tk-orange" />
          {item.result}
        </div>
      </div>
    </motion.article>
  );
}

function FlyerCard({ item }: { item: FlyerItem }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-3xl border border-white/12 bg-black/20"
    >
      <div className="relative aspect-[5/6]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-lg font-black text-white">{item.title}</h3>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-tk-orange">{item.format}</p>
        <p className="mt-2 text-sm text-gray-200">{item.summary}</p>
      </div>
    </motion.article>
  );
}

export default function Realisations() {
  const [activeView, setActiveView] = useState<"portfolio" | "flyers">("portfolio");
  const [activeCategory, setActiveCategory] = useState<Category>("Tous");

  const filteredItems = useMemo(
    () => (activeCategory === "Tous" ? portfolioItems : portfolioItems.filter((item) => item.category === activeCategory)),
    [activeCategory]
  );

  const featured = filteredItems.find((item) => item.featured) ?? filteredItems[0];
  const list = filteredItems.filter((item) => item.id !== featured?.id);

  return (
    <section id="realisations" className="relative overflow-hidden bg-[#070707] py-24 md:py-32">
      <div className="absolute inset-0">
        <Image src="/tracageroute.png" alt="Fond route" fill className="object-cover opacity-15" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/82 to-black" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,77,0,0.20),transparent_36%),radial-gradient(circle_at_84%_72%,rgba(255,77,0,0.14),transparent_30%)]" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-10 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-tk-orange/30 bg-tk-orange/10 px-4 py-2">
              <Layers3 size={15} className="text-tk-orange" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-tk-orange">Portfolio TK AREA</span>
            </div>
            <h2 className="text-heading-1 text-white">
              Nos <span className="text-tk-orange">realisations</span> et section <span className="text-white/80">flyers</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
              Une presentation plus claire et plus forte: portfolio terrain, flyers dedies, et CTA visible pour convertir.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setActiveView("portfolio")}
              className={`rounded-full border px-6 py-3 text-xs font-black uppercase tracking-[0.18em] transition-all ${
                activeView === "portfolio"
                  ? "border-tk-orange bg-tk-orange text-white shadow-lg shadow-tk-orange/35"
                  : "border-white/20 bg-white/5 text-gray-300 hover:border-white/40 hover:bg-white/10"
              }`}
            >
              Portfolio
            </button>
            <button
              type="button"
              onClick={() => setActiveView("flyers")}
              className={`rounded-full border px-6 py-3 text-xs font-black uppercase tracking-[0.18em] transition-all ${
                activeView === "flyers"
                  ? "border-tk-orange bg-tk-orange text-white shadow-lg shadow-tk-orange/35"
                  : "border-white/20 bg-white/5 text-gray-300 hover:border-white/40 hover:bg-white/10"
              }`}
            >
              Flyers
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeView === "portfolio" ? (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-7 flex flex-wrap gap-2.5">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] transition-all ${
                      activeCategory === category
                        ? "bg-white text-black"
                        : "border border-white/20 bg-white/5 text-gray-300 hover:border-white/35 hover:bg-white/10"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {featured ? (
                <>
                  <PortfolioCard item={featured} />
                  <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {list.map((item) => (
                      <PortfolioCard key={item.id} item={item} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="rounded-2xl border border-white/15 bg-white/5 p-8 text-center text-gray-300">
                  Aucune realisation disponible pour ce filtre.
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="flyers"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 lg:grid-cols-12"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-8">
                {flyerItems.map((item) => (
                  <FlyerCard key={item.id} item={item} />
                ))}
              </div>

              <aside className="rounded-3xl border border-white/15 bg-white/[0.05] p-6 lg:col-span-4 md:p-7">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-tk-orange/30 bg-tk-orange/10 px-3 py-1.5">
                  <Sparkles size={14} className="text-tk-orange" />
                  <span className="text-[11px] font-black uppercase tracking-[0.16em] text-tk-orange">Direction creative</span>
                </div>
                <h3 className="text-2xl font-black text-white">Flyers dedies</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-300">
                  Presentation simple et lisible de vos flyers avec format, usage et impact visuel direct.
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    "Lecture claire mobile et desktop",
                    "Bloc offre immediatement visible",
                    "Contact et call-to-action integres",
                    "Mise en page coherente avec votre branding",
                  ].map((line) => (
                    <div key={line} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-tk-orange" />
                      <p className="text-sm text-gray-200">{line}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid gap-5 rounded-[2rem] border border-white/15 bg-white/[0.05] p-6 md:grid-cols-2 md:items-center md:p-8"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-tk-orange">Call To Action</p>
            <h3 className="mt-3 text-2xl font-black text-white md:text-3xl">Besoin d&apos;une execution rapide et propre ?</h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-300 md:text-base">
              Nous revenons avec une proposition claire, un delai realiste et un plan d&apos;action terrain.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-tk-orange px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-tk-orange/40"
            >
              Demander un devis
              <ArrowRight size={16} />
            </a>
            <a
              href="tel:0605769952"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white transition-all hover:border-white/45 hover:bg-white/10"
            >
              Urgence 24/7
            </a>
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-tk-orange/20 to-[#050505]" />
    </section>
  );
}

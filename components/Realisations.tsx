"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Eye, Layers } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Véhicules & Logistique",
    category: "Marquage",
    image: "/camion2orange.png",
    description: "Flotte de véhicules spécialisés pour interventions rapides sur chantier",
    size: "large",
    stats: "15+ véhicules",
  },
  {
    id: 2,
    title: "Flotte Utilitaire",
    category: "Signalisation",
    image: "/camionnette.png",
    description: "Camionnettes équipées pour la pose de signalisation routière",
    size: "medium",
    stats: "Équipement complet",
  },
  {
    id: 3,
    title: "Chantier en Cours",
    category: "Aménagement",
    image: "/vudecotétraveaux.png",
    description: "Vue d'ensemble d'un chantier d'aménagement urbain en cours",
    size: "medium",
    stats: "5 000m² traités",
  },
  {
    id: 4,
    title: "Communication & Visibilité",
    category: "Marquage",
    image: "/flyers1.jpeg",
    description: "Supports de communication professionnels pour nos clients",
    size: "small",
    stats: "Design pro",
  },
  {
    id: 5,
    title: "Services & Offres",
    category: "Signalisation",
    image: "/flyers2.jpeg",
    description: "Présentation détaillée de nos services de signalisation",
    size: "small",
    stats: "Catalogue complet",
  },
  {
    id: 6,
    title: "Affichage & Signalétique",
    category: "Aménagement",
    image: "/poseaffivhes.jpg",
    description: "Pose d'affiches et signalétique urbaine professionnelle",
    size: "wide",
    stats: "Pose certifiée",
  },
];

const categories = ["Tous", "Marquage", "Signalisation", "Aménagement"];

function getGridClass(size: string) {
  const layouts: Record<string, string> = {
    large: "col-span-2 md:col-span-2 row-span-2",
    medium: "col-span-1 md:col-span-1 row-span-2",
    small: "col-span-1 md:col-span-1 row-span-1",
    wide: "col-span-2 md:col-span-2 row-span-1",
  };
  return layouts[size] || layouts.small;
}

export default function Realisations() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredProjects =
    activeCategory === "Tous" ? projects : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="realisations" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#0a0a0a] to-[#060606]" />

      <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-tk-orange/6 blur-[200px]" />
      <div className="absolute bottom-1/4 left-0 h-[400px] w-[400px] rounded-full bg-tk-orange/4 blur-[150px]" />
      <div className="absolute right-0 top-1/3 h-[300px] w-[300px] rounded-full bg-tk-orange/3 blur-[120px]" />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container-custom relative z-10">
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 flex items-center gap-3"
            >
              <div className="h-3 w-3 rounded-full bg-tk-orange animate-pulse-orange" />
              <span className="text-sm font-bold uppercase tracking-widest text-tk-orange">Portfolio</span>
              <div className="h-px w-12 bg-tk-orange/30" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-heading-1 mb-4 text-white"
            >
              Nos <span className="text-tk-orange">Réalisations</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg leading-relaxed text-gray-500"
            >
              Chaque projet est une démonstration de notre savoir-faire. Découvrez nos interventions récentes.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-400 ${
                  activeCategory === category
                    ? "bg-tk-orange text-white shadow-lg shadow-tk-orange/25"
                    : "border border-white/[0.06] bg-white/[0.03] text-gray-500 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div
          layout
          className="grid auto-rows-[160px] grid-cols-2 gap-4 md:auto-rows-[200px] md:grid-cols-4 md:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                onHoverStart={() => setHoveredId(project.id)}
                onHoverEnd={() => setHoveredId(null)}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl ${getGridClass(project.size)}`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-[1.2s] group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    hoveredId === project.id
                      ? "bg-gradient-to-t from-tk-black via-tk-black/70 to-tk-black/30"
                      : "bg-gradient-to-t from-tk-black/80 via-transparent to-transparent"
                  }`}
                />

                <div className="absolute left-3 top-3 md:left-4 md:top-4">
                  <div
                    className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md transition-all duration-300 md:text-xs ${
                      hoveredId === project.id
                        ? "bg-tk-orange text-white"
                        : "border border-white/10 bg-white/10 text-white/70"
                    }`}
                  >
                    {project.category}
                  </div>
                </div>

                <motion.div
                  className="absolute right-3 top-3 md:right-4 md:top-4"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{
                    opacity: hoveredId === project.id ? 1 : 0,
                    x: hoveredId === project.id ? 0 : 10,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-md md:text-xs">
                    <Layers size={12} />
                    {project.stats}
                  </div>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <div className={`transition-all duration-500 ${hoveredId === project.id ? "translate-y-0" : "translate-y-2"}`}>
                    <h3 className="mb-1 text-base font-black leading-tight text-white md:text-xl">{project.title}</h3>
                    <motion.p
                      className="overflow-hidden text-xs leading-relaxed text-gray-400 md:text-sm"
                      initial={false}
                      animate={{
                        height: hoveredId === project.id ? "auto" : 0,
                        opacity: hoveredId === project.id ? 1 : 0,
                        marginTop: hoveredId === project.id ? 4 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.description}
                    </motion.p>
                  </div>
                </div>

                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  initial={false}
                  animate={{
                    opacity: hoveredId === project.id ? 1 : 0,
                    scale: hoveredId === project.id ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-tk-orange/90 shadow-lg shadow-tk-orange/30 backdrop-blur-sm md:h-14 md:w-14">
                    <Eye size={20} className="text-white" />
                  </div>
                </motion.div>

                <div
                  className={`pointer-events-none absolute inset-0 rounded-2xl border-2 transition-all duration-500 md:rounded-3xl ${
                    hoveredId === project.id ? "border-tk-orange/50" : "border-transparent"
                  }`}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-16 flex flex-col items-center justify-between gap-8 md:mt-20 md:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex gap-8 md:gap-12"
          >
            {[
              { value: "100+", label: "Projets livrés" },
              { value: "50+", label: "Villes couvertes" },
              { value: "100%", label: "Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <div className="text-2xl font-black text-white md:text-3xl">{stat.value}</div>
                <div className="text-xs font-bold uppercase tracking-wider text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 rounded-full bg-tk-orange px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-tk-orange/25 transition-shadow duration-300 hover:shadow-xl hover:shadow-tk-orange/40"
          >
            Discutons de votre projet
            <ArrowUpRight size={20} />
          </motion.a>
        </div>
      </div>
    </section>
  );
}

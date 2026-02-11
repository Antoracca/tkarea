"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Award, CheckCircle2, Download, Eye, MapPin, Maximize2, Phone, TrendingUp, X, Zap } from "lucide-react";
import { useState } from "react";

type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  location: string;
  result: string;
  description: string;
  size?: "large" | "medium" | "small";
};

type FlyerItem = {
  id: string;
  title: string;
  image: string;
  description: string;
  details: string[];
};

const portfolioItems: PortfolioItem[] = [
  {
    id: "p1",
    title: "Signalisation complète zone chantier",
    category: "Signalisation",
    image: "/imageposefeusignalisation.png",
    location: "Maine-et-Loire",
    result: "100% Conforme NF",
    description: "Installation rapide avec sécurisation immédiate des usagers",
    size: "large",
  },
  {
    id: "p2",
    title: "Marquage au sol haute performance",
    category: "Marquage",
    image: "/tracageroute.png",
    location: "Grand Ouest",
    result: "Durabilité 10 ans",
    description: "Traçage routier avec peinture thermoplastique certifiée",
    size: "medium",
  },
  {
    id: "p3",
    title: "Aménagement voirie urbaine",
    category: "Aménagement",
    image: "/traveauxbitume.png",
    location: "Bouchemaine",
    result: "PMR Accessible",
    description: "Réorganisation complète des flux piétons et véhicules",
    size: "medium",
  },
  {
    id: "p4",
    title: "Flotte mobile intervention urgente",
    category: "Logistique",
    image: "/camion2orange.png",
    location: "Angers",
    result: "Dispo 24/7",
    description: "Équipe mobilisable en moins de 2h partout dans le Grand Ouest",
    size: "small",
  },
];

const flyerItems: FlyerItem[] = [
  {
    id: "f1",
    title: "Plaquette services TK ARÉA",
    image: "/flyers1.jpeg",
    description: "Présentation complète de nos services et expertises",
    details: [
      "Format A5 premium",
      "Impression haute qualité",
      "Présentation claire des services",
      "Contact et coordonnées visibles",
    ],
  },
  {
    id: "f2",
    title: "Offres commerciales terrain",
    image: "/flyers2.jpeg",
    description: "Nos offres spéciales et tarifs pour entreprises",
    details: [
      "Format A5 diffusion",
      "Offres spéciales détaillées",
      "Call-to-action direct",
      "QR Code pour devis rapide",
    ],
  },
];

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const sizeClasses = {
    large: "md:col-span-2 md:row-span-2 aspect-[16/10] md:aspect-[16/11]",
    medium: "md:col-span-1 md:row-span-1 aspect-[4/3]",
    small: "md:col-span-1 md:row-span-1 aspect-[4/3]",
  };

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className={`group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 ${
        sizeClasses[item.size || "medium"]
      }`}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Gradient overlay léger */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Category badge */}
      <div className="absolute left-4 top-4 rounded-full bg-white/95 backdrop-blur-sm px-4 py-1.5 shadow-lg">
        <span className="text-xs font-black uppercase tracking-wider text-tk-orange">
          {item.category}
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 lg:p-6">
        <div className="flex items-start justify-between gap-3 mb-2 md:mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1.5">
              <MapPin size={12} className="text-tk-orange shrink-0" />
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-tk-orange truncate">
                {item.location}
              </p>
            </div>
            <h3 className="text-base md:text-lg lg:text-xl font-black text-white leading-tight">
              {item.title}
            </h3>
          </div>
        </div>

        <p className="text-xs md:text-sm text-gray-200 mb-2.5 md:mb-3 leading-relaxed line-clamp-2">
          {item.description}
        </p>

        <div className="inline-flex items-center gap-1.5 md:gap-2 rounded-full bg-tk-orange px-3 md:px-4 py-1.5 md:py-2 shadow-lg">
          <CheckCircle2 size={12} className="text-white shrink-0" />
          <span className="text-[10px] md:text-xs font-bold text-white whitespace-nowrap">{item.result}</span>
        </div>
      </div>

      {/* Hover icon */}
      <motion.div
        className="absolute right-4 top-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        whileHover={{ scale: 1.1 }}
      >
        <Eye size={18} className="text-tk-orange" />
      </motion.div>
    </motion.article>
  );
}

function FlyerCard({ item, onClick }: { item: FlyerItem; onClick: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative"
    >
      {/* Card container avec effet 3D */}
      <div className="relative rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500">

        {/* Mockup image avec effet 3D */}
        <motion.div
          className="relative aspect-[5/7] rounded-xl overflow-hidden shadow-2xl bg-gray-50"
          whileHover={{ scale: 1.02, rotateY: 2, rotateX: -2 }}
          transition={{ duration: 0.3 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative w-full h-full flex items-center justify-center p-2">
            <div className="relative w-full h-full scale-110">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority={true}
                loading="eager"
                quality={95}
              />
            </div>
          </div>

          {/* Overlay avec bouton zoom */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
            <motion.button
              onClick={onClick}
              className="opacity-0 group-hover:opacity-100 bg-white rounded-full p-4 shadow-2xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Maximize2 size={24} className="text-tk-orange" />
            </motion.button>
          </div>
        </motion.div>

        {/* Info */}
        <div className="mt-6">
          <h3 className="text-xl md:text-2xl font-black text-tk-black mb-2">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            {item.description}
          </p>

          {/* Details */}
          <div className="space-y-2 mb-5">
            {item.details.map((detail, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                <div className="w-1.5 h-1.5 rounded-full bg-tk-orange" />
                <span className="font-medium">{detail}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <motion.button
              onClick={onClick}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-tk-orange text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye size={16} />
              Voir en détail
            </motion.button>
            <motion.a
              href={item.image}
              download={`TK-AREA-${item.title.replace(/\s+/g, '-')}.jpg`}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-tk-orange text-tk-orange rounded-xl font-bold text-sm hover:bg-tk-orange hover:text-white transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download size={16} />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function FlyerModal({ item, onClose }: { item: FlyerItem | null; onClose: () => void }) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative max-w-4xl w-full my-8 bg-white rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <motion.button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 w-10 h-10 rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-tk-orange transition-all"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={20} />
          </motion.button>

          {/* Image fullscreen - Scrollable */}
          <div className="relative w-full bg-white overflow-auto max-h-[70vh] md:max-h-[75vh]">
            <div className="relative w-full min-h-[500px] p-4 md:p-8">
              <Image
                src={item.image}
                alt={item.title}
                width={800}
                height={1200}
                className="w-full h-auto object-contain"
                priority
                loading="eager"
                quality={100}
              />
            </div>
          </div>

          {/* Info bar */}
          <div className="p-4 md:p-6 bg-gradient-to-r from-tk-orange to-tk-orange-light">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-black text-white mb-1">{item.title}</h3>
                <p className="text-sm text-white/90">{item.description}</p>
              </div>
              <motion.a
                href={item.image}
                download={`TK-AREA-${item.title.replace(/\s+/g, '-')}.jpg`}
                className="px-6 py-3 bg-white text-tk-orange rounded-xl font-bold flex items-center gap-2 hover:shadow-xl transition-all whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={18} />
                Télécharger
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Realisations() {
  const [activeView, setActiveView] = useState<"portfolio" | "flyers">("portfolio");
  const [selectedFlyer, setSelectedFlyer] = useState<FlyerItem | null>(null);

  const stats = [
    { icon: Award, value: "100+", label: "Projets réalisés" },
    { icon: TrendingUp, value: "100%", label: "Conformité NF" },
    { icon: Zap, value: "24/7", label: "Disponibilité" },
  ];

  return (
    <section id="realisations" className="relative bg-gradient-to-b from-white via-gray-50 to-white py-24 md:py-32 overflow-hidden">

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-tk-orange/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-tk-orange/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tk-orange/10 border border-tk-orange/20 mb-6"
          >
            <Award size={16} className="text-tk-orange" />
            <span className="text-xs font-black uppercase tracking-wider text-tk-orange">
              Notre Portfolio
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-tk-black mb-6 leading-tight">
            Nos <span className="text-tk-orange">Réalisations</span>
            <br />
            <span className="text-gray-500">qui parlent d'elles-mêmes</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Découvrez nos projets terrain et notre identité visuelle professionnelle
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-3 md:gap-6 mb-12 max-w-3xl mx-auto"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-xl md:rounded-2xl p-3 md:p-5 lg:p-6 shadow-lg hover:shadow-2xl text-center transition-shadow"
                whileHover={{ y: -4 }}
              >
                <Icon size={20} className="text-tk-orange mx-auto mb-2 md:mb-3" />
                <div className="text-xl md:text-3xl lg:text-4xl font-black text-tk-black mb-1 leading-tight">
                  {stat.value}
                </div>
                <div className="text-[9px] md:text-xs lg:text-sm font-bold text-gray-600 uppercase tracking-wider leading-tight">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Toggle buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-12"
        >
          <motion.button
            onClick={() => setActiveView("portfolio")}
            className={`px-8 py-4 rounded-xl font-black uppercase tracking-wider text-sm transition-all ${
              activeView === "portfolio"
                ? "bg-tk-orange text-white shadow-xl shadow-tk-orange/30"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Portfolio Terrain
          </motion.button>
          <motion.button
            onClick={() => setActiveView("flyers")}
            className={`px-8 py-4 rounded-xl font-black uppercase tracking-wider text-sm transition-all ${
              activeView === "flyers"
                ? "bg-tk-orange text-white shadow-xl shadow-tk-orange/30"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Plaquettes & Flyers
          </motion.button>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeView === "portfolio" ? (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-fr"
            >
              {portfolioItems.map((item) => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="flyers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
                {flyerItems.map((item) => (
                  <FlyerCard
                    key={item.id}
                    item={item}
                    onClick={() => setSelectedFlyer(item)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 rounded-3xl bg-gradient-to-br from-tk-orange to-tk-orange-dark p-8 md:p-12 text-center shadow-2xl"
        >
          <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
            Prêt à démarrer votre projet ?
          </h3>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour un devis gratuit sous 24h ou une intervention d'urgence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-tk-orange rounded-xl font-black uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Demander un devis
              <ArrowRight size={20} />
            </motion.a>
            <motion.a
              href="tel:0605769952"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-tk-black text-white rounded-xl font-black uppercase tracking-wider hover:bg-tk-black/90 transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone size={18} className="shrink-0" />
              Urgence 24/7
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Flyer Modal */}
      {selectedFlyer && (
        <FlyerModal item={selectedFlyer} onClose={() => setSelectedFlyer(null)} />
      )}
    </section>
  );
}

"use client";

import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { ArrowRight, Award, CheckCircle2, Download, Eye, MapPin, Maximize2, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

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
    title: "Signalisation complète de zone",
    category: "Signalisation",
    image: "https://uploads.prod01.london.platform-os.com/instances/700/assets/tiloeduc-20210601.png?updated=1622560935",
    location: "Maine-et-Loire",
    result: "100% Conforme NF",
    description: "Installation rapide avec sécurisation immédiate des usagers",
    size: "large",
  },
  {
    id: "p2",
    title: "Marquage au sol haute performance",
    category: "Marquage",
    image: "https://jhm.fr/wp-content/uploads/2024/08/839210.HR_.jpg",
    location: "Grand Ouest",
    result: "Durabilité 10 ans",
    description: "Traçage routier avec peinture thermoplastique certifiée",
    size: "medium",
  },
  {
    id: "p3",
    title: "Aménagement de voirie urbaine",
    category: "Aménagement",
    image: "https://metropole.toulouse.fr/sites/toulouse-fr/files/styles/facebook/public/2022-11/30-01-18_proprete.jpg.webp?itok=R2Yn7usb",
    location: "Bouchemaine",
    result: "PMR Accessible",
    description: "Réorganisation complète des flux piétons et véhicules",
    size: "medium",
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
    large: "md:col-span-2 md:row-span-2 aspect-[4/5] sm:aspect-[16/10] md:aspect-[16/11]",
    medium: "md:col-span-1 md:row-span-1 aspect-[4/5] sm:aspect-[4/3] md:aspect-[4/3]",
    small: "md:col-span-1 md:row-span-1 aspect-[4/5] sm:aspect-[4/3] md:aspect-[4/3]",
  };

  return (
    <motion.article
      initial={false}
      // Removed initial opacity for mobile robustness, since Coverflow handles its own opacity
      className={`group relative overflow-hidden rounded-2xl bg-black shadow-lg hover:shadow-2xl transition-all duration-500 w-full h-full md:h-auto ${sizeClasses[item.size || "medium"]
        }`}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-40"
        />
        {/* Gradient overlay permanent & dynamique au hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Category badge - Always visible */}
      <div className="absolute left-4 top-4 md:left-5 md:top-5 rounded-full bg-white/95 backdrop-blur-sm px-3 md:px-4 py-1.5 shadow-lg z-20">
        <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-tk-orange">
          {item.category}
        </span>
      </div>

      {/* Content - Cinematic Slide Up Effect (Toujours visible sur mobile, hover sur desktop) */}
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 translate-y-0 md:translate-y-[4.5rem] md:group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-20 flex flex-col justify-end">
        <div className="flex items-center gap-1.5 mb-2">
          <MapPin size={12} className="text-tk-orange shrink-0" />
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-tk-orange truncate">
            {item.location}
          </p>
        </div>

        <h3 className="text-lg md:text-xl lg:text-2xl font-black text-white leading-tight mb-3">
          {item.title}
        </h3>

        {/* Détails cachés qui remontent */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <p className="text-xs md:text-sm text-gray-300 mb-4 leading-relaxed line-clamp-2">
            {item.description}
          </p>

          <div className="inline-flex items-center gap-1.5 md:gap-2 rounded-full bg-tk-orange px-3 md:px-4 py-1.5 md:py-2 shadow-lg w-fit">
            <CheckCircle2 size={12} className="text-white shrink-0" />
            <span className="text-[10px] md:text-xs font-bold text-white whitespace-nowrap">{item.result}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function FlyerCard({ item, onClick }: { item: FlyerItem; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col items-center gap-5"
    >
      {/* Image directe sans card */}
      <motion.div
        className="relative w-full max-w-xs mx-auto rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
        whileHover={{ scale: 1.03, rotateY: 2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.3 }}
        onClick={onClick}
        style={{ transformStyle: "preserve-3d" }}
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-auto object-contain"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center rounded-2xl">
          <div className="opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl transition-opacity duration-300">
            <Maximize2 size={22} className="text-tk-orange" />
          </div>
        </div>
      </motion.div>

      {/* Titre + download sous l'image */}
      <div className="text-center">
        <h3 className="text-base font-black text-tk-black mb-1">{item.title}</h3>
        <p className="text-xs text-gray-500 mb-3 max-w-[220px] mx-auto">{item.description}</p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onClick}
            className="flex items-center gap-1.5 px-4 py-2 bg-tk-orange text-white rounded-full font-bold text-xs hover:shadow-lg transition-all"
          >
            <Eye size={13} />
            Voir
          </button>
          <a
            href={item.image}
            download={`TK-AREA-${item.title.replace(/\s+/g, '-')}.jpg`}
            className="flex items-center gap-1.5 px-4 py-2 border border-tk-orange text-tk-orange rounded-full font-bold text-xs hover:bg-tk-orange hover:text-white transition-all"
          >
            <Download size={13} />
            PDF
          </a>
        </div>
      </div>
    </motion.div>
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
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-contain"
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
  const [mobileIndex, setMobileIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipe = info.offset.x;
    if (swipe < -50 && mobileIndex < portfolioItems.length - 1) {
      setMobileIndex((prev) => prev + 1);
    } else if (swipe > 50 && mobileIndex > 0) {
      setMobileIndex((prev) => prev - 1);
    }
  };

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
            Interventions <span className="text-tk-orange">Types</span>
            <br />
            <span className="text-gray-500">en attendant les vôtres</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Découvrez nos projets terrain et notre identité visuelle professionnelle
          </p>
        </motion.div>

        {/* Toggle Switcher iOS Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="relative flex items-center p-1.5 bg-gray-100/80 backdrop-blur-md rounded-full shadow-inner border border-gray-200/50">
            {/* Pilule coulissante */}
            <motion.div
              className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.08)]"
              animate={{ x: activeView === "portfolio" ? 0 : "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
            {/* Boutons invisibles par-dessus */}
            <button
              onClick={() => setActiveView("portfolio")}
              className={`relative z-10 px-4 sm:px-8 py-3.5 font-black uppercase tracking-wider text-[10px] sm:text-sm transition-colors duration-300 w-40 sm:w-48 text-center ${activeView === "portfolio" ? "text-tk-orange" : "text-gray-500 hover:text-gray-900"
                }`}
            >
              Sur le terrain
            </button>
            <button
              onClick={() => setActiveView("flyers")}
              className={`relative z-10 px-4 sm:px-8 py-3.5 font-black uppercase tracking-wider text-[10px] sm:text-sm transition-colors duration-300 w-40 sm:w-48 text-center ${activeView === "flyers" ? "text-tk-orange" : "text-gray-500 hover:text-gray-900"
                }`}
            >
              Plaquettes
            </button>
          </div>
        </motion.div>

        {/* Content */}
        {mounted && (
          <AnimatePresence mode="wait">
            {activeView === "portfolio" ? (
              <motion.div
                key="portfolio"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative w-full"
              >
                {/* Desktop Grid View */}
                <div
                  className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr"
                >
                  {portfolioItems.map((item) => (
                    <PortfolioCard key={item.id} item={item} />
                  ))}
                </div>

                {/* Mobile 3D Coverflow View */}
                <div
                  className="relative w-full h-[60vh] md:hidden flex items-center justify-center"
                  style={{ perspective: "1200px" }}
                >
                  {portfolioItems.map((item, index) => {
                    const isCenter = index === mobileIndex;
                    const isLeft = index < mobileIndex;
                    const offset = index - mobileIndex;
                    const isVisible = Math.abs(offset) <= 1;

                    return (
                      <motion.div
                        key={item.id}
                        className="absolute w-[72vw] aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.35),_0_0_0_2px_rgba(255,255,255,0.05)] bg-black cursor-grab active:cursor-grabbing"
                        initial={false}
                        animate={{
                          x: offset * 45, // Shift in pixels
                          y: !isCenter ? 15 : 0, // Push side cards down slightly
                          scale: isCenter ? 1 : 0.85,
                          rotateY: isCenter ? 0 : isLeft ? 35 : -35,
                          zIndex: isCenter ? 30 : 20 - Math.abs(offset),
                          opacity: isVisible ? (isCenter ? 1 : 0.4) : 0,
                        }}
                        transition={{ type: "spring", stiffness: 250, damping: 25 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.1}
                        onDragEnd={handleDragEnd}
                        onClick={() => setMobileIndex(index)}
                        style={{ pointerEvents: isVisible ? "auto" : "none" }}
                      >
                        <div className="absolute inset-0 w-full h-full">
                          <PortfolioCard item={item} />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="flyers"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-3xl mx-auto">
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
        )}

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
            Contactez-nous pour un devis gratuit sous 24h ou une intervention d&apos;urgence
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
      {mounted && selectedFlyer && (
        <FlyerModal item={selectedFlyer} onClose={() => setSelectedFlyer(null)} />
      )}
    </section>
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, PaintRoller, TriangleAlert, Building2 } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const services = [
  {
    id: "01",
    title: "MARQUAGE AU SOL",
    slug: "marquage",
    icon: PaintRoller,
    description: "Traçage routier, industriel et sportif haute performance avec matériel de dernière génération.",
    features: [
      "Marquage routier conforme NF",
      "Traçage industriel et logistique",
      "Terrains de sport",
      "Peintures thermoplastiques"
    ],
    images: [
      "https://jhm.fr/wp-content/uploads/2024/08/839210.HR_.jpg",
      "https://www.groupe-helios.com/wp-content/uploads/2024/12/imaginer-les-mobilites-de-demain-spraygrip-marquage-urbain-marquage-au-sol-2.jpg",
      "https://www.ste-lsp.com/wp-content/uploads/2023/05/photo-7-1.jpg"
    ],
    color: "#FF4D00",
    statValue: "100%",
    statLabel: "Conformité NF"
  },
  {
    id: "02",
    title: "SIGNALISATION",
    slug: "signalisation",
    icon: TriangleAlert,
    description: "Panneaux, balises et mâts conformes aux normes NF pour une sécurité optimale.",
    features: [
      "Panneaux verticaux",
      "Balises de protection",
      "Mâts certifiés",
      "Signalisation temporaire"
    ],
    images: [
      "https://inforisque.fr/fiches-pratiques/images/signaletique-projetee-top.jpg",
      "https://www.signaletique-express.fr/img/psblog/b/lg-b-definition-de-la-signaletique.png",
      "https://m3.direct-signaletique.com/img/cms/securit%C3%A9.jpg"
    ],
    color: "#FF6B2C",
    statValue: "24/7",
    statLabel: "Mise en sécurité"
  },
  {
    id: "03",
    title: "AMÉNAGEMENT URBAIN",
    slug: "amenagement",
    icon: Building2,
    description: "Mobilier urbain, sécurisation piétonne et solutions d'accessibilité PMR.",
    features: [
      "Mobilier urbain design",
      "Ralentisseurs zones 30",
      "Aménagements PMR",
      "Bornes de protection"
    ],
    images: [
      "https://metropole.toulouse.fr/sites/toulouse-fr/files/styles/facebook/public/2022-11/30-01-18_proprete.jpg.webp?itok=R2Yn7usb",
      "https://www.mairie-lognes.fr/medias/2019/08/ST.jpg",
      "https://pro.choisirmonmetier-paysdelaloire.fr/documents/imagesROME/img_metier_K2303.jpg",
      "https://www.sepur.com/wp-content/webpc-passthru.php?src=https://www.sepur.com/wp-content/uploads/2022/03/pu-plateau00016-scaled.jpg&nocache=1",
      "https://khelcombusiness.com/wp-content/uploads/2019/09/photoralentisseur-pourvoiesprivees.jpg"
    ],
    color: "#FFB366",
    statValue: "PMR",
    statLabel: "Accessibilité totale"
  }
];

function ServiceItem({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (service.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % service.images.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, [service.images.length]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: imgProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const imageY = useTransform(imgProgress, [0, 1], ["-2%", "2%"]);

  const isEven = index % 2 === 0;
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className={`relative py-16 md:py-28 ${isEven ? '' : 'md:mt-20'}`}
    >
      <div className="container-custom">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`relative ${isEven ? '' : 'lg:col-start-2'}`}
          >
            {/* Ambient Glow behind text for better separation / premium feel */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full blur-[100px] -z-10 pointer-events-none opacity-[0.15]"
              style={{ backgroundColor: service.color }}
            />
            {/* Giant number background */}
            <div className="absolute -top-10 md:-top-20 left-0 text-[150px] md:text-[250px] font-black leading-none pointer-events-none select-none -z-10">
              <span style={{
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
                backgroundImage: `linear-gradient(to bottom, ${service.color}25, transparent)`
              }}>
                {service.id}
              </span>
            </div>

            {/* Icon badge */}
            <motion.div
              className="inline-flex items-center gap-3 mb-6 px-5 py-3 rounded-full"
              style={{ backgroundColor: `${service.color}15` }}
              whileHover={{ scale: 1.05 }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: service.color }}
              >
                <Icon size={20} className="text-white" />
              </div>
              <span className="font-bold uppercase text-sm tracking-wider" style={{ color: service.color }}>
                Service {service.id}
              </span>
            </motion.div>

            {/* Title */}
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-6 leading-tight text-tk-black">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              {service.description}
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-8">
              {service.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="flex items-start gap-3 group cursor-default"
                >
                  <div
                    className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-[1.5]"
                    style={{
                      backgroundColor: service.color,
                      boxShadow: `0 0 12px ${service.color}`
                    }}
                  />
                  <span className="text-sm text-gray-700 font-medium group-hover:text-tk-black transition-colors duration-300">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold uppercase
                         tracking-wider text-sm group relative overflow-hidden"
              style={{ backgroundColor: service.color }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 text-white">Demander un devis</span>
              <motion.div
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
                whileHover={{ rotate: 45 }}
              >
                <ArrowUpRight size={18} className="text-white" />
              </motion.div>
            </motion.a>
          </motion.div>

          {/* Image Side */}
          <motion.div
            style={{ y }}
            className={`relative ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Main image container */}
              <div ref={imgRef} className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] group w-full bg-tk-black/5">
                <motion.div style={{ y: imageY }} className="absolute inset-0 w-full h-full flex items-center justify-center">
                  {service.images.map((imgUrl, idx) => {
                    const isSignalisation = service.slug === "signalisation";

                    if (!isSignalisation) {
                      // Original cover behavior requested for Marquage
                      return (
                        <motion.img
                          key={`${service.slug}-${idx}`}
                          src={imgUrl}
                          alt={`${service.title} - Image ${idx + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: currentImageIndex === idx ? 1 : 0 }}
                          transition={{ duration: 1 }}
                        />
                      );
                    }

                    // New padded/blurred behavior strictly localized to Signalisation
                    return (
                      <motion.div
                        key={`${service.slug}-${idx}`}
                        className="absolute inset-0 w-full h-full overflow-hidden rounded-3xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: currentImageIndex === idx ? 1 : 0 }}
                        transition={{ duration: 1 }}
                      >
                        {/* Fond flouté pour remplir le cadre colorimétriquement sans marges blanches */}
                        <img
                          src={imgUrl}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-50 scale-125"
                        />

                        {/* Image principale dézoomée, affichée entièrement au centre */}
                        <img
                          src={imgUrl}
                          alt={`${service.title} - Image ${idx + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-contain p-2 md:p-6 drop-shadow-2xl transition-transform duration-1000 group-hover:scale-[1.03]"
                        />
                      </motion.div>
                    );
                  })}
                </motion.div>
                {/* Subtle dark overlay for contrast */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating geometric shape */}
              <motion.div
                className="absolute -z-10 rounded-3xl"
                style={{
                  backgroundColor: `${service.color}15`,
                  [isEven ? 'right' : 'left']: '-8%',
                  top: '10%',
                  width: '90%',
                  height: '90%',
                }}
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Decorative circle */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  backgroundColor: service.color,
                  [isEven ? 'left' : 'right']: '-6%',
                  bottom: '-6%',
                  width: '120px',
                  height: '120px',
                  opacity: 0.1,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Stats badge floating - Glassmorphism (Plus petit et plus bas) */}
              <motion.div
                className="absolute -bottom-8 -right-4 md:-bottom-12 md:-right-4 scale-90 md:scale-75 origin-bottom-right backdrop-blur-xl bg-white/85 border border-white/40 rounded-2xl p-5 md:p-6 shadow-[0_20px_40px_rgba(0,0,0,0.12)] z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                whileHover={{ y: -5, scale: 0.95 }}
              >
                <div className="text-3xl md:text-4xl font-black" style={{ color: service.color }}>
                  {service.statValue}
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-700 font-bold mt-1 max-w-[120px]">
                  {service.statLabel}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section
      id="expertise"
      className="relative py-24 md:py-32 bg-white overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent z-0" />

      {/* Background elements */}
      <div className="hidden md:block absolute top-1/4 right-0 w-[500px] h-[500px] bg-tk-orange/5 rounded-full blur-[150px]" />
      <div className="hidden md:block absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-tk-orange/5 rounded-full blur-[150px]" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="max-w-4xl mb-20 text-center mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="w-12 h-px bg-tk-orange" />
            <span className="text-tk-orange font-bold uppercase tracking-widest text-sm">
              Notre Expertise
            </span>
            <div className="w-12 h-px bg-tk-orange" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-tk-black mb-6 leading-tight"
          >
            Des Solutions <span className="text-tk-orange">Complètes</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
          >
            De la conception à la réalisation, nous maîtrisons l&apos;ensemble de la chaîne
            de l&apos;aménagement urbain et routier.
          </motion.p>
        </div>
      </div>

      {/* Services items */}
      {services.map((service, index) => (
        <ServiceItem key={service.slug} service={service} index={index} />
      ))}

      {/* Bottom CTA section */}
      <div className="container-custom relative z-10 mt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-tk-orange to-tk-orange-dark" />
          <div className="relative p-12 md:p-16 text-center text-white">
            <h3 className="text-3xl md:text-4xl font-black mb-4">
              Prêt à démarrer votre projet ?
            </h3>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Demandez votre devis gratuit et personnalisé en moins de 24h.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-tk-orange
                         rounded-full font-bold uppercase tracking-wider text-sm
                         hover:bg-tk-black hover:text-white transition-all duration-300"
            >
              Contactez-nous
              <ArrowUpRight size={20} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Transition éclatante vers À Propos */}
      {/* Léger fond grisé pour que l'éclat blanc et pur ressorte mieux */}
      <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-b from-transparent to-black/5 pointer-events-none" />

      <div className="absolute bottom-0 left-0 right-0 w-full z-10 pointer-events-none">
        <div className="relative w-full h-[100px] md:h-[180px] overflow-visible flex items-end justify-center">
          {/* L'éclat blanc (Halo lumineux géant vibrant) */}
          <motion.div
            animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-[800px] md:w-[1200px] h-[300px] bg-white blur-[50px] rounded-[100%] z-0"
          />
          {/* Transition wave in About's background color (#f3f6fb) */}
          <svg
            className="relative block w-full h-[60px] md:h-[120px] z-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C75.29,32.74,159.27,47.28,242,50.8,268.62,51.92,295.12,54.77,321.39,56.44Z"
              fill="#f3f6fb"
              className="drop-shadow-[0_-15px_30px_rgba(255,255,255,1)]"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Ruler, SignpostBig, Trees } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";

const services = [
  {
    id: "01",
    title: "MARQUAGE AU SOL",
    slug: "marquage",
    icon: Ruler,
    description: "Traçage routier, industriel et sportif haute performance avec matériel de dernière génération.",
    features: [
      "Marquage routier conforme NF",
      "Traçage industriel et logistique",
      "Terrains de sport",
      "Peintures thermoplastiques"
    ],
    image: "/actiontech.png",
    color: "#FF4D00"
  },
  {
    id: "02",
    title: "SIGNALISATION",
    slug: "signalisation",
    icon: SignpostBig,
    description: "Panneaux, balises et mâts conformes aux normes NF pour une sécurité optimale.",
    features: [
      "Panneaux verticaux",
      "Balises de protection",
      "Mâts certifiés",
      "Signalisation temporaire"
    ],
    image: "/imageposefeusignalisation.png",
    color: "#FF6B2C"
  },
  {
    id: "03",
    title: "AMÉNAGEMENT URBAIN",
    slug: "amenagement",
    icon: Trees,
    description: "Mobilier urbain, sécurisation piétonne et solutions d'accessibilité PMR.",
    features: [
      "Mobilier urbain design",
      "Ralentisseurs zones 30",
      "Aménagements PMR",
      "Bornes de protection"
    ],
    image: "/traveauxbitume.png",
    color: "#FFB366"
  }
];

function ServiceItem({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

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
            className={isEven ? '' : 'lg:col-start-2'}
          >
            {/* Giant number background */}
            <div className="absolute -top-10 md:-top-20 left-0 text-[150px] md:text-[250px] font-black text-tk-orange/5 leading-none pointer-events-none select-none">
              {service.id}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {service.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: service.color }}
                  />
                  <span className="text-sm text-gray-700 font-medium">{feature}</span>
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
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-transparent" />
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

              {/* Stats badge floating */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 md:p-6 shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                whileHover={{ y: -8 }}
              >
                <div className="text-3xl md:text-4xl font-black" style={{ color: service.color }}>
                  100%
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-600 font-bold">
                  Conformité NF
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

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white z-10" />
    </section>
  );
}

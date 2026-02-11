"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Award, Clock, ChevronDown } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const stats = [
    { icon: <MapPin size={20} />, value: "100+", label: "Projets" },
    { icon: <Award size={20} />, value: "100%", label: "Conformité NF" },
    { icon: <Clock size={20} />, value: "24/7", label: "Disponibilité" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-tk-black"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale, opacity: 0.35 }}
      >
        <Image
          src="/tracageroute.png"
          alt="Traçage routier TK ARÉA"
          fill
          className="object-cover"
          style={{ filter: 'grayscale(40%) contrast(1.1)' }}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-tk-black via-tk-black/70 to-tk-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-tk-black via-transparent to-tk-black/80" />
      </motion.div>

      {/* Animated gradient orbs */}
      <div className="hidden md:block absolute top-1/4 left-1/4 w-96 h-96 bg-tk-orange/15 rounded-full blur-[120px] animate-pulse-orange" />
      <div className="hidden md:block absolute bottom-1/4 right-1/4 w-96 h-96 bg-tk-orange/8 rounded-full blur-[120px] animate-float" />
      <div className="hidden md:block absolute top-1/2 right-1/3 w-64 h-64 bg-tk-orange/5 rounded-full blur-[80px] animate-float" style={{ animationDelay: '1.5s' }} />

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container-custom pt-32 pb-20 md:pt-40 md:pb-32"
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left: Typography */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-12 h-px bg-tk-orange" />
              <span className="text-tk-orange font-bold uppercase tracking-widest text-sm">
                Expert en Aménagement Urbain
              </span>
            </motion.div>

            {/* Main title */}
            <h1 className="text-display text-white mb-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="overflow-hidden"
              >
                <span className="block">TRAÇONS</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="overflow-hidden"
              >
                <span className="block text-tk-orange">L&apos;AVENIR</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="overflow-hidden"
              >
                <span className="block">DE VOS ROUTES</span>
              </motion.div>
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-12 max-w-2xl"
            >
              Marquage au sol, signalisation routière et aménagement urbain.
              <span className="text-tk-orange font-bold"> Excellence technique</span> et
              <span className="text-tk-orange font-bold"> intervention d&apos;urgence 24/7</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#contact"
                className="btn-primary group"
              >
                <span>Démarrer un projet</span>
              </a>

              <a
                href="tel:0605769952"
                className="btn-secondary !border-white !text-white hover:!bg-white hover:!text-tk-black"
              >
                Appel d&apos;urgence
              </a>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-16 grid grid-cols-3 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col gap-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="flex items-center gap-2 text-tk-orange">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Visual element */}
          <div className="lg:col-span-5 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              {/* Main image card */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <Image
                  src="/gerant.png"
                  alt="Gérant TK ARÉA"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 0vw, 40vw"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-tk-black/80 via-transparent to-transparent" />

                {/* Floating badge */}
                <motion.div
                  className="absolute bottom-8 left-8 right-8 glass-dark p-6 rounded-2xl"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full gradient-orange flex items-center justify-center">
                      <Award size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">
                        Certifié NF & PMR
                      </div>
                      <div className="text-gray-400 text-sm">
                        Conformité garantie
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-24 h-24 gradient-orange rounded-full opacity-50 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/10 rounded-full opacity-30 blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-xs text-gray-500 uppercase tracking-widest">Découvrir</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-tk-orange" />
        </motion.div>
      </motion.div>

      {/* Modern transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="relative h-32 md:h-40">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white" />
          <svg
            viewBox="0 0 1440 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <path d="M0,80 L0,160 L1440,160 L1440,0 Z" fill="white" fillOpacity="0.03" />
            <path d="M0,100 L0,160 L1440,160 L1440,20 Z" fill="white" fillOpacity="0.05" />
            <path d="M0,120 L0,160 L1440,160 L1440,40 Z" fill="white" fillOpacity="0.1" />
            <path d="M0,140 L0,160 L1440,160 L1440,60 Z" fill="white" />
          </svg>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-tk-orange to-transparent opacity-30" />
        </div>
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </section>
  );
}

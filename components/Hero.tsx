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

  const y = useTransform(scrollYProgress, [0, 1], ["0px", "100px"]); // Strong reduction of Y parallax to prevent content from sinking into the bottom SVG transition
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
      {/* Background Video with parallax and dark overlays */}
      <motion.div
        className="absolute inset-0 z-0 h-full w-full"
        style={{ scale }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover max-md:object-[25%_center] md:object-center"
        >
          <source src="/video/paysageroute.mp4" type="video/mp4" />
        </video>
        {/*
          Double overlay setup:
          1. Base dark overlay to assure text readability anywhere
          2. Top/bottom gradients to blend into adjacent sections smoothly
          3. Side gradient to emphasize the left text block
        */}
        <div className="absolute inset-0 bg-tk-black/60" /> {/* Base darkness */}
        <div className="absolute inset-0 bg-gradient-to-b from-tk-black/80 via-transparent to-tk-black/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-tk-black/80 via-tk-black/40 to-transparent" />
      </motion.div>

      {/* Animated gradient orbs */}
      <div className="hidden md:block absolute top-1/4 left-1/4 w-96 h-96 bg-tk-orange/15 rounded-full blur-[120px] animate-pulse-orange" />
      <div className="hidden md:block absolute bottom-1/4 right-1/4 w-96 h-96 bg-tk-orange/8 rounded-full blur-[120px] animate-float" />
      <div className="hidden md:block absolute top-1/2 right-1/3 w-64 h-64 bg-tk-orange/5 rounded-full blur-[80px] animate-float" style={{ animationDelay: '1.5s' }} />

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container-custom pt-[140px] md:pt-40 pb-40 lg:pb-64 flex flex-col justify-center min-h-screen"
      >
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">

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
            <h1 className="text-display text-white mb-4 md:mb-8 tracking-tighter leading-none md:leading-normal relative">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="pb-2 md:pb-4 relative z-10"
              >
                <span className="block font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                  TRAÇONS
                </span>
              </motion.div>

              {/* Graphic Highlight : Pont Visuel Strictement Intercalaire */}
              <div className="relative w-full max-w-sm md:max-w-md h-12 md:h-16 mt-4 mb-4 md:mt-6 md:mb-6 z-0">
                <motion.svg
                  viewBox="0 0 400 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <defs>
                    <linearGradient id="premium-swoosh" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FF4D00" stopOpacity="0" />
                      <stop offset="20%" stopColor="#FF4D00" />
                      <stop offset="80%" stopColor="#FFB000" />
                      <stop offset="100%" stopColor="#FFB000" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Courbe Supérieure (Principale) */}
                  <motion.path
                    d="M 20 15 Q 200 60, 380 35"
                    stroke="url(#premium-swoosh)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.8, ease: "easeInOut", delay: 1 }}
                    style={{ filter: "drop-shadow(0px 4px 6px rgba(255, 100, 0, 0.4))" }}
                  />
                  {/* Courbe Inférieure (Subtile) */}
                  <motion.path
                    d="M 40 30 Q 180 65, 340 45"
                    stroke="url(#premium-swoosh)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.8, ease: "easeInOut", delay: 1.2 }}
                    style={{ opacity: 0.7 }}
                  />
                </motion.svg>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="overflow-hidden relative z-10"
              >
                <span className="block font-black text-transparent bg-clip-text bg-gradient-to-r from-tk-orange to-tk-orange-light pl-4 md:pl-12">L&apos;AVENIR</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="overflow-visible drop-shadow-lg relative z-10"
              >
                <span className="block font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 pl-4 md:pl-12">DE VOS ROUTES</span>
              </motion.div>
            </h1>

            {/* Text description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg md:text-2xl text-gray-300 md:text-gray-400 leading-relaxed md:leading-relaxed mb-10 max-w-2xl"
            >
              Marquage au sol, signalétique & signalisation routière — du chantier à l&apos;espace public.
              <span className="text-tk-orange font-bold"> Excellence technique</span> et
              <br className="hidden md:block" />
              <span className="text-tk-orange font-bold"> intervention d&apos;urgence 24/7</span>.
            </motion.p>

            {/* Les badges visibles uniquements sur mobile sont supprimés d'ici pour être intégrés dans une mega-carte de stats en bas */}

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#contact"
                className="btn-primary group relative overflow-hidden shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:shadow-[0_0_30px_rgba(255,107,0,0.5)] transition-shadow duration-300"
              >
                <span className="relative z-10">Démarrer un projet</span>
                <div className="absolute inset-0 -translate-x-full group-hover:animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </a>

              <a
                href="tel:0605769952"
                className="btn-secondary !border-white/50 !text-white hover:!border-white hover:!bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                Appel d&apos;urgence
              </a>
            </motion.div>

            {/* Custom Responsive Stats bar (1 line on mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-14 md:mt-20 flex justify-between md:grid md:grid-cols-3 gap-2 sm:gap-6 md:gap-8 mb-8 md:mb-16 relative z-20 w-full max-w-sm md:max-w-none mx-auto md:mx-0"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center md:items-start gap-1 md:gap-2 flex-1"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="flex items-center gap-1 md:gap-2 text-tk-orange">
                    <div className="scale-75 md:scale-100">{stat.icon}</div>
                  </div>
                  <div className="font-black text-white whitespace-nowrap" style={{ fontSize: 'clamp(1.1rem, 4vw, 2.25rem)' }}>
                    {stat.value}
                  </div>
                  <div className="whitespace-nowrap uppercase tracking-wider text-gray-400" style={{ fontSize: 'clamp(0.55rem, 2vw, 0.875rem)' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>

          {/* Right: Visual element (Desktop seulement) */}
          <div className="lg:col-span-5 hidden lg:block relative z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              {/* Floating badge - Version Originale Demandée par le Client */}
              <motion.div
                className="absolute -top-6 -left-6 md:-top-8 md:-left-12 backdrop-blur-xl bg-tk-black/80 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-4 md:p-5 rounded-2xl z-30"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full gradient-orange flex items-center justify-center shadow-[0_0_20px_rgba(255,77,0,0.6)]">
                    <Award size={24} className="text-white" />
                  </div>
                  <div className="min-w-0 pr-4">
                    <div className="text-white font-bold text-lg">
                      Certifié NF & PMR
                    </div>
                    <div className="text-tk-orange text-sm font-semibold tracking-wide uppercase">
                      Conformité garantie
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Main image card */}
              <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10 group mt-4 md:mt-0">
                <Image
                  src="https://images.unsplash.com/photo-1513715222050-1aefe23d3fd1?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8"
                  alt="Lignes de marquage routier TK ARÉA"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 1024px) 0vw, 40vw"
                  priority
                />
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
      <div className="absolute bottom-[-2px] left-0 right-0 z-0 pointer-events-none">
        <div className="relative h-20 md:h-40 lg:h-56">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white" />
          <svg
            viewBox="0 0 1440 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <path d="M0,120 L0,240 L1440,240 L1440,0 Z" fill="white" fillOpacity="0.03" />
            <path d="M0,150 L0,240 L1440,240 L1440,30 Z" fill="white" fillOpacity="0.05" />
            <path d="M0,180 L0,240 L1440,240 L1440,60 Z" fill="white" fillOpacity="0.1" />
            <path d="M0,210 L0,240 L1440,240 L1440,90 Z" fill="white" />
          </svg>
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

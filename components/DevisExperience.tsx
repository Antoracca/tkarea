"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Battery, CheckCircle2, Send, ShieldCheck, Signal, Star, Wifi } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

type Step = {
  id: number;
  action: "typing" | "clicking" | "waiting" | "success";
  text?: string;
  label: string;
  cursorX: number;
  cursorY: number;
  duration: number;
};

const demoSteps: Step[] = [
  {
    id: 1,
    action: "typing",
    text: "Bonjour, je souhaite un devis pour le marquage d'un parking de 120 places avec signalisation PMR.",
    label: "Saisie de la demande",
    cursorX: 50,
    cursorY: 180,
    duration: 3000,
  },
  {
    id: 2,
    action: "clicking",
    label: "Clic sur Envoyer",
    cursorX: 50,
    cursorY: 320,
    duration: 800,
  },
  {
    id: 3,
    action: "waiting",
    label: "Traitement en cours...",
    cursorX: 50,
    cursorY: 380,
    duration: 2000,
  },
  {
    id: 4,
    action: "success",
    label: "Devis reçu !",
    cursorX: 50,
    cursorY: 420,
    duration: 2500,
  },
];

const testimonials = [
  {
    name: "Amina B.",
    role: "Responsable exploitation",
    company: "LogiWest",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
    quote: "Demande envoyée à 09h, devis validé avant midi. Processus limpide, sans aller-retour inutile.",
  },
  {
    name: "Julien M.",
    role: "Directeur technique",
    company: "MétroBat",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    quote: "Très bonne visibilité sur les étapes: réception, analyse, validation, intervention. C'est carré.",
  },
];

function iPhoneMockup() {
  const [stepIndex, setStepIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);

  const currentStep = demoSteps[stepIndex];
  const isTyping = currentStep.action === "typing";
  const isClicking = currentStep.action === "clicking";
  const isSuccess = currentStep.action === "success";

  // Typing animation
  useEffect(() => {
    if (isTyping && currentStep.text) {
      setShowKeyboard(true);
      let charIndex = 0;
      setTypedText("");

      const typingInterval = setInterval(() => {
        if (charIndex < currentStep.text!.length) {
          setTypedText(currentStep.text!.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setShowKeyboard(false);
            setTimeout(() => {
              setStepIndex((prev) => (prev + 1) % demoSteps.length);
            }, 500);
          }, 500);
        }
      }, 30);

      return () => clearInterval(typingInterval);
    } else if (!isTyping) {
      setTimeout(() => {
        setStepIndex((prev) => (prev + 1) % demoSteps.length);
      }, currentStep.duration);
    }
  }, [stepIndex, isTyping, currentStep]);

  // Reset when loop
  useEffect(() => {
    if (stepIndex === 0) {
      setTypedText("");
      setShowKeyboard(false);
    }
  }, [stepIndex]);

  const currentTime = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="relative mx-auto w-full max-w-[380px]">
      {/* iPhone 15 Mockup */}
      <div className="relative rounded-[3rem] bg-[#1d1d1f] p-3 shadow-2xl ring-1 ring-white/10">
        {/* Dynamic Island */}
        <div className="absolute left-1/2 top-3 z-50 h-8 w-32 -translate-x-1/2 rounded-full bg-black" />

        {/* Screen */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white">

          {/* Status Bar */}
          <div className="flex items-center justify-between bg-gradient-to-b from-gray-50 to-white px-8 pt-4 pb-2">
            <span className="text-sm font-semibold text-black">{currentTime}</span>
            <div className="flex items-center gap-1.5">
              <Signal size={14} className="text-black" />
              <Wifi size={14} className="text-black" />
              <Battery size={16} className="text-black" />
            </div>
          </div>

          {/* App Content */}
          <div className="relative min-h-[640px] bg-gradient-to-b from-white to-gray-50 p-4">

            {/* App Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-black text-tk-black">TK ARÉA</h2>
              <p className="text-sm text-gray-600">Demande de devis</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-3 mb-4">
              <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-200">
                <label className="text-xs font-bold text-tk-orange uppercase tracking-wider mb-1 block">
                  Nom du chantier
                </label>
                <input
                  type="text"
                  value="Parking clients - Zone Ouest"
                  readOnly
                  className="w-full text-sm text-gray-900 bg-transparent outline-none"
                />
              </div>

              <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-200">
                <label className="text-xs font-bold text-tk-orange uppercase tracking-wider mb-1 block">
                  Ville
                </label>
                <input
                  type="text"
                  value="Bouchemaine"
                  readOnly
                  className="w-full text-sm text-gray-900 bg-transparent outline-none"
                />
              </div>

              {/* Textarea with typing animation */}
              <motion.div
                className={`rounded-xl bg-white p-4 shadow-sm border-2 transition-all ${
                  isTyping ? "border-tk-orange" : "border-gray-200"
                }`}
                animate={isTyping ? { scale: [1, 1.01, 1] } : {}}
                transition={{ repeat: isTyping ? Infinity : 0, duration: 2 }}
              >
                <label className="text-xs font-bold text-tk-orange uppercase tracking-wider mb-2 block">
                  Votre demande
                </label>
                <div className="min-h-[80px] text-sm text-gray-900 leading-relaxed">
                  {typedText}
                  {isTyping && (
                    <motion.span
                      className="inline-block w-0.5 h-4 bg-tk-orange ml-0.5"
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                    />
                  )}
                </div>
              </motion.div>
            </div>

            {/* Send Button */}
            <motion.button
              className={`w-full rounded-xl py-4 font-bold uppercase tracking-wider text-sm transition-all shadow-lg ${
                isClicking
                  ? "bg-tk-orange text-white scale-95"
                  : "bg-tk-orange text-white"
              }`}
              animate={isClicking ? { scale: [1, 0.95, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center gap-2">
                <Send size={16} />
                Envoyer la demande
              </div>
            </motion.button>

            {/* Response Area */}
            <AnimatePresence>
              {stepIndex >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -20, height: 0 }}
                  className="mt-4 rounded-xl bg-gradient-to-br from-tk-orange/10 to-tk-orange/5 p-4 border border-tk-orange/20"
                >
                  {stepIndex === 2 && (
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="w-5 h-5 border-3 border-tk-orange border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      />
                      <p className="text-sm font-semibold text-gray-700">
                        Traitement en cours...
                      </p>
                    </div>
                  )}

                  {isSuccess && (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle2 size={20} />
                        <p className="font-bold">Demande reçue !</p>
                      </div>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>📋 Numéro: <span className="font-bold">#D-8492</span></p>
                        <p>💰 Devis: <span className="font-bold">4 380 EUR</span></p>
                        <p>📅 Intervention: <span className="font-bold">Demain 07h30</span></p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress indicator */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {currentStep.label}
                </span>
                <span className="text-xs font-bold text-tk-orange">
                  {Math.round(((stepIndex + 1) / demoSteps.length) * 100)}%
                </span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-tk-orange rounded-full"
                  animate={{ width: `${((stepIndex + 1) / demoSteps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          {/* iOS Keyboard */}
          <AnimatePresence>
            {showKeyboard && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute bottom-0 left-0 right-0 bg-[#D1D5DB] p-2 rounded-b-[2.5rem]"
              >
                <div className="grid grid-cols-10 gap-1 mb-1">
                  {['A','Z','E','R','T','Y','U','I','O','P'].map((key) => (
                    <motion.div
                      key={key}
                      className="col-span-1 bg-white rounded-md p-2 text-center text-xs font-semibold shadow-sm"
                      whileTap={{ scale: 0.95 }}
                    >
                      {key}
                    </motion.div>
                  ))}
                </div>
                <div className="grid grid-cols-10 gap-1 mb-1 px-2">
                  {['Q','S','D','F','G','H','J','K','L','M'].map((key) => (
                    <motion.div
                      key={key}
                      className="col-span-1 bg-white rounded-md p-2 text-center text-xs font-semibold shadow-sm"
                      whileTap={{ scale: 0.95 }}
                    >
                      {key}
                    </motion.div>
                  ))}
                </div>
                <div className="grid grid-cols-10 gap-1">
                  <div className="col-span-2 bg-[#ADB5BD] rounded-md p-2 text-center text-[10px] font-bold shadow-sm">
                    ⇧
                  </div>
                  {['W','X','C','V','B','N'].map((key) => (
                    <motion.div
                      key={key}
                      className="col-span-1 bg-white rounded-md p-2 text-center text-xs font-semibold shadow-sm"
                      whileTap={{ scale: 0.95 }}
                    >
                      {key}
                    </motion.div>
                  ))}
                  <div className="col-span-2 bg-[#ADB5BD] rounded-md p-2 text-center text-[10px] font-bold shadow-sm">
                    ⌫
                  </div>
                </div>
                <div className="mt-1 bg-white rounded-lg p-3 text-center text-xs shadow-sm">
                  espace
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Animated Cursor */}
          <motion.div
            className="absolute pointer-events-none z-50"
            animate={{
              x: currentStep.cursorX,
              y: currentStep.cursorY,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <motion.div
              className="w-8 h-8 rounded-full bg-tk-orange/30 border-2 border-tk-orange"
              animate={isClicking ? { scale: [1, 0.8, 1.2, 1] } : { scale: 1 }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              className="absolute inset-0 w-8 h-8 rounded-full bg-tk-orange/20"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function DevisExperience() {
  return (
    <section id="devis-live" className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-24 md:py-32">

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-tk-orange/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-tk-orange/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tk-orange/10 border border-tk-orange/20 mb-6"
          >
            <ShieldCheck size={16} className="text-tk-orange" />
            <span className="text-xs font-black uppercase tracking-wider text-tk-orange">
              Simulation Devis en Direct
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-tk-black mb-6 leading-tight">
            Du <span className="text-tk-orange">premier message</span>
            <br />
            <span className="text-gray-500">à l'intervention confirmée</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Regardez comment votre demande est traitée en temps réel, de la saisie jusqu'à la confirmation d'intervention
          </p>
        </motion.div>

        {/* iPhone Demo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          {iPhoneMockup()}
        </motion.div>

        {/* Testimonials */}
        <div className="grid gap-6 md:grid-cols-2 mb-16">
          {testimonials.map((item, idx) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image src={item.avatar} alt={item.name} fill className="object-cover" sizes="48px" />
                </div>
                <div>
                  <p className="text-sm font-black text-tk-black">{item.name}</p>
                  <p className="text-xs text-gray-600">
                    {item.role} - {item.company}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-tk-orange mb-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-gray-700">{item.quote}</p>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-lg text-gray-600 mb-6">
            Prêt à recevoir votre devis en moins de 24h ?
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-tk-orange text-white rounded-xl font-black uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Demander un devis
            <ArrowRight size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

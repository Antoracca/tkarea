"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bot, CheckCircle2, Clock, MessageSquare, Send, ShieldCheck, Sparkles, TrendingUp, User, Zap } from "lucide-react";
import { useEffect, useState } from "react";

type Step = {
  id: number;
  action: "typing" | "sending" | "processing" | "response" | "complete";
  duration: number;
};

const demoSteps: Step[] = [
  { id: 1, action: "typing", duration: 2500 },
  { id: 2, action: "sending", duration: 600 },
  { id: 3, action: "processing", duration: 1200 },
  { id: 4, action: "response", duration: 2500 },
  { id: 5, action: "complete", duration: 2000 },
];

// iPhone Status Bar Icons (realistic SVG)
function StatusBarIcons() {
  const currentTime = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-2">
      <span className="text-[15px] font-semibold text-black">{currentTime}</span>
      <div className="flex items-center gap-1">
        {/* 5G Signal */}
        <div className="flex items-end gap-[1px] h-[11px]">
          <div className="w-[3px] h-[3px] bg-black rounded-full" />
          <div className="w-[3px] h-[5px] bg-black rounded-full" />
          <div className="w-[3px] h-[7px] bg-black rounded-full" />
          <div className="w-[3px] h-[9px] bg-black rounded-full" />
          <div className="w-[3px] h-[11px] bg-black rounded-full" />
        </div>

        {/* Wifi */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none" className="ml-[5px]">
          <path d="M7.5 11C8.05 11 8.5 10.55 8.5 10C8.5 9.45 8.05 9 7.5 9C6.95 9 6.5 9.45 6.5 10C6.5 10.55 6.95 11 7.5 11Z" fill="black"/>
          <path d="M7.5 7.5C8.88 7.5 10.18 8.04 11.15 8.93L12.22 7.72C10.94 6.56 9.28 5.92 7.5 5.92C5.72 5.92 4.06 6.56 2.78 7.72L3.85 8.93C4.82 8.04 6.12 7.5 7.5 7.5Z" fill="black"/>
          <path d="M7.5 3.83C9.91 3.83 12.16 4.73 13.88 6.28L15 5.04C12.93 3.18 10.3 2.17 7.5 2.17C4.7 2.17 2.07 3.18 0 5.04L1.12 6.28C2.84 4.73 5.09 3.83 7.5 3.83Z" fill="black"/>
        </svg>

        {/* Battery */}
        <div className="flex items-center gap-[2px] ml-[5px]">
          <div className="relative">
            <div className="w-[22px] h-[11px] border-[1.5px] border-black rounded-[2.5px]" />
            <div className="absolute top-[2px] left-[2px] w-[17px] h-[6px] bg-black rounded-[1px]" />
          </div>
          <div className="w-[1.5px] h-[4px] bg-black rounded-r-[1px]" />
        </div>
      </div>
    </div>
  );
}

function iPhoneMockup() {
  const [stepIndex, setStepIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const currentStep = demoSteps[stepIndex];
  const userMessage = "Bonjour, je souhaite un devis pour marquage parking 120 places + signalisation PMR à Angers.";
  const aiMessage = "Parfait ! J'ai analysé votre demande. Pour un parking de 120 places avec signalisation PMR conforme à Angers, je vous propose un devis de 4 280 EUR TTC. Intervention possible dès demain matin 07h30. Confirmez-vous ?";

  // Animation controller
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (currentStep.action === "typing") {
      // Typing animation
      let charIndex = 0;
      setTypedText("");
      interval = setInterval(() => {
        if (charIndex <= userMessage.length) {
          setTypedText(userMessage.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => setStepIndex(1), 300);
        }
      }, 35);
    } else if (currentStep.action === "response") {
      // AI typing response
      let charIndex = 0;
      setAiResponse("");
      interval = setInterval(() => {
        if (charIndex <= aiMessage.length) {
          setAiResponse(aiMessage.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => setStepIndex(4), 500);
        }
      }, 20);
    } else {
      // Other steps
      const timer = setTimeout(() => {
        if (stepIndex < demoSteps.length - 1) {
          setStepIndex(stepIndex + 1);
        } else {
          // Loop restart
          setTypedText("");
          setAiResponse("");
          setTimeout(() => setStepIndex(0), 1500);
        }
      }, currentStep.duration);
      return () => clearTimeout(timer);
    }

    return () => clearInterval(interval);
  }, [stepIndex, currentStep, userMessage, aiMessage]);

  return (
    <div className="relative mx-auto w-full max-w-[380px]">
      {/* iPhone 15 Pro Mockup - FIXED HEIGHT */}
      <div className="relative rounded-[3rem] bg-[#1d1d1f] p-3 shadow-[0_25px_70px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
        {/* Dynamic Island */}
        <div className="absolute left-1/2 top-[6px] z-50 h-[30px] w-[126px] -translate-x-1/2 rounded-full bg-black shadow-inner" />

        {/* Screen - FIXED HEIGHT to prevent layout shift */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white h-[720px]">
          {/* Status Bar */}
          <StatusBarIcons />

          {/* App Content - ABSOLUTE positioning for stability */}
          <div className="absolute inset-0 top-[50px] bg-gradient-to-b from-white to-gray-50 overflow-y-auto">
            <div className="p-4 min-h-full flex flex-col">
              {/* App Header */}
              <div className="mb-4 flex items-center justify-between shrink-0">
                <div>
                  <h2 className="text-2xl font-black text-tk-black">TK ARÉA</h2>
                  <p className="text-xs text-gray-600">Devis instantané IA</p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-tk-orange/10 border border-tk-orange/30">
                  <div className="w-2 h-2 rounded-full bg-tk-orange animate-pulse" />
                  <span className="text-[10px] font-bold text-tk-orange uppercase tracking-wider">IA Active</span>
                </div>
              </div>

              {/* Chat Messages - FIXED container height */}
              <div className="flex-1 space-y-3 mb-4">
                {/* User Message */}
                <AnimatePresence mode="wait">
                  {stepIndex >= 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-end"
                    >
                      <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-tk-orange px-4 py-3 shadow-lg">
                        <p className="text-sm text-white leading-relaxed">
                          {typedText}
                          {currentStep.action === "typing" && typedText.length < userMessage.length && (
                            <motion.span
                              className="inline-block w-0.5 h-3.5 bg-white ml-0.5"
                              animate={{ opacity: [1, 0] }}
                              transition={{ repeat: Infinity, duration: 0.7 }}
                            />
                          )}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Processing State */}
                <AnimatePresence>
                  {stepIndex === 2 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex justify-start"
                    >
                      <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-gray-100 px-4 py-3 border border-gray-200">
                        <div className="flex items-center gap-2">
                          <motion.div
                            className="w-7 h-7 rounded-full bg-gradient-to-br from-tk-orange to-tk-orange-dark flex items-center justify-center"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                          >
                            <Bot size={14} className="text-white" />
                          </motion.div>
                          <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 rounded-full bg-tk-orange"
                                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-600 font-medium">Analyse en cours...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* AI Response */}
                <AnimatePresence>
                  {stepIndex >= 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-3 border border-gray-200 shadow-md">
                        <div className="flex items-start gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-tk-orange to-tk-orange-dark flex items-center justify-center shrink-0">
                            <Bot size={12} className="text-white" />
                          </div>
                          <p className="text-[11px] font-bold text-gray-700">Assistant IA TK ARÉA</p>
                        </div>
                        <p className="text-sm text-gray-800 leading-relaxed">
                          {aiResponse}
                          {currentStep.action === "response" && aiResponse.length < aiMessage.length && (
                            <motion.span
                              className="inline-block w-0.5 h-3.5 bg-tk-orange ml-0.5"
                              animate={{ opacity: [1, 0] }}
                              transition={{ repeat: Infinity, duration: 0.7 }}
                            />
                          )}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Success Badge */}
                <AnimatePresence>
                  {stepIndex === 4 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-2"
                    >
                      <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 size={18} className="text-green-600 shrink-0" />
                          <p className="font-black text-sm text-green-700">Devis Confirmé</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <div className="bg-white/60 rounded-lg p-2">
                            <span className="text-gray-600 block">Réf.</span>
                            <span className="font-bold text-gray-900">#D-8492</span>
                          </div>
                          <div className="bg-white/60 rounded-lg p-2">
                            <span className="text-gray-600 block">Montant</span>
                            <span className="font-bold text-tk-orange">4 280€</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Input Area - Fixed at bottom */}
              <div className="shrink-0 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-100 rounded-full px-4 py-3 border border-gray-200">
                    <p className="text-xs text-gray-400">Écrivez votre demande...</p>
                  </div>
                  <motion.button
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                      currentStep.action === "sending" ? "bg-tk-orange scale-95" : "bg-tk-orange"
                    }`}
                    animate={currentStep.action === "sending" ? { scale: [1, 0.9, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <Send size={18} className="text-white" />
                  </motion.button>
                </div>

                {/* Progress bar */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-tk-orange to-tk-orange-dark rounded-full"
                      animate={{ width: `${((stepIndex + 1) / demoSteps.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-tk-orange">
                    {Math.round(((stepIndex + 1) / demoSteps.length) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DevisExperience() {
  const aiStats = [
    { icon: Clock, value: "< 2 min", label: "Réponse IA", color: "text-tk-orange" },
    { icon: Bot, value: "24/7", label: "Disponibilité", color: "text-tk-orange" },
    { icon: TrendingUp, value: "98%", label: "Précision", color: "text-tk-orange" },
    { icon: ShieldCheck, value: "100%", label: "Sécurité", color: "text-tk-orange" },
  ];

  const humanStats = [
    { icon: User, value: "< 24h", label: "Délai devis", color: "text-tk-orange" },
    { icon: MessageSquare, value: "Humain", label: "Expertise", color: "text-tk-orange" },
    { icon: CheckCircle2, value: "100%", label: "Conformité", color: "text-tk-orange" },
    { icon: Sparkles, value: "Sur-mesure", label: "Approche", color: "text-tk-orange" },
  ];

  return (
    <section id="devis-live" className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="absolute top-0 left-0 w-96 h-96 bg-tk-orange/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-tk-orange/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section 1: IA DEMO */}
        <div className="mb-32">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-12"
          >
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tk-orange/10 border border-tk-orange/30 mb-6">
              <Bot size={16} className="text-tk-orange" />
              <span className="text-xs font-black uppercase tracking-wider text-tk-orange">
                Assistant IA
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-tk-black mb-6 leading-tight">
              Devis Instantané par <span className="text-tk-orange">Intelligence Artificielle</span>
            </h2>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Notre IA analyse votre demande en temps réel et génère un devis précis en moins de 2 minutes
            </p>
          </motion.div>

          {/* AI Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {aiStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all text-center border border-gray-100"
                  whileHover={{ y: -4 }}
                >
                  <Icon size={24} className={`${stat.color} mx-auto mb-2`} />
                  <div className="text-3xl font-black text-tk-black mb-1">{stat.value}</div>
                  <div className="text-xs font-bold text-gray-600 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* iPhone Demo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {iPhoneMockup()}
          </motion.div>
        </div>

        {/* Section 2: HUMAN AGENTS */}
        <div>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-12"
          >
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tk-orange/10 border border-tk-orange/30 mb-6">
              <User size={16} className="text-tk-orange" />
              <span className="text-xs font-black uppercase tracking-wider text-tk-orange">
                Experts Humains
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-tk-black mb-6 leading-tight">
              Traitement Rapide par <span className="text-tk-orange">Nos Agents</span>
            </h2>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Pour les projets complexes, nos experts analysent personnellement votre demande et vous répondent sous 24h
            </p>
          </motion.div>

          {/* Human Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {humanStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all text-center border border-gray-100"
                  whileHover={{ y: -4 }}
                >
                  <Icon size={24} className={`${stat.color} mx-auto mb-2`} />
                  <div className="text-3xl font-black text-tk-black mb-1">{stat.value}</div>
                  <div className="text-xs font-bold text-gray-600 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Process Steps */}
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {[
              {
                step: "01",
                title: "Envoyez votre demande",
                description: "Décrivez votre projet via notre formulaire de contact avec plan de site si possible",
                icon: MessageSquare,
              },
              {
                step: "02",
                title: "Analyse d'expert",
                description: "Nos techniciens étudient personnellement votre dossier et les spécificités terrain",
                icon: User,
              },
              {
                step: "03",
                title: "Devis sous 24h",
                description: "Recevez un devis détaillé, personnalisé et conforme aux normes NF par email",
                icon: CheckCircle2,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="relative rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-all overflow-hidden group border border-gray-100"
                  whileHover={{ y: -8 }}
                >
                  <div className="absolute top-0 right-0 text-[120px] font-black text-tk-orange/5 leading-none select-none pointer-events-none">
                    {item.step}
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-tk-orange to-tk-orange-dark flex items-center justify-center mb-4 group-hover:scale-110 transition-transform relative z-10">
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-black text-tk-black mb-2 relative z-10">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed relative z-10">{item.description}</p>
                </motion.article>
              );
            })}
          </div>

          {/* Rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-tk-orange/5 to-tk-orange/10 rounded-2xl p-8 border-2 border-tk-orange/20"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-3xl font-black text-tk-black">4.9/5</span>
                </div>
                <p className="text-gray-700 font-medium">Note moyenne sur <span className="font-bold">Trustpilot</span></p>
                <p className="text-sm text-gray-600 mt-1">Basé sur 247 avis clients vérifiés</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-black text-tk-orange">1834</div>
                  <div className="text-xs font-bold text-gray-600 uppercase">Devis envoyés</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-tk-orange">96%</div>
                  <div className="text-xs font-bold text-gray-600 uppercase">Taux conversion</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-6">
            Choisissez IA pour une réponse instantanée ou nos experts pour un devis sur-mesure
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-tk-orange to-tk-orange-dark text-white rounded-full font-black uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bot size={20} />
            Demander un devis
            <ArrowRight size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

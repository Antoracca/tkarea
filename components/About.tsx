"use client";

import { CheckCircle2, ShieldCheck, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const stats = [
    { value: "100%", label: "Conformité", icon: <ShieldCheck /> },
    { value: "24/7", label: "Disponibilité", icon: <Clock /> },
    { value: "10+", label: "Années d'Expérience", icon: <Award /> },
  ];

  return (
    <section id="about" className="py-32 bg-tk-light relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-100 -skew-x-12 translate-x-32 z-0 hidden lg:block"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* Text Content */}
          <div className="lg:w-1/2">
            <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-tk-orange font-black tracking-widest uppercase text-sm mb-4 block"
            >
                L&apos;Exigence du Terrain
            </motion.span>
            
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-black text-tk-dark mb-8 leading-tight"
            >
              LA SÉCURITÉ N&apos;EST PAS UNE <span className="text-tk-orange">OPTION</span>.
            </motion.h2>
            
            <p className="text-gray-600 text-lg mb-10 leading-relaxed font-medium">
              Chez <span className="text-tk-dark font-bold">TK Aréa</span>, nous transformons les contraintes réglementaires en solutions durables.
              Notre bureau d&apos;étude analyse vos flux pour garantir une sécurité optimale sans compromettre l&apos;esthétique.
            </p>
            
            <div className="space-y-6 mb-12">
                {[
                    "Intervention d'urgence 24h/24 et 7j/7 garantie",
                    "Matériel de traçage de dernière génération (Airless)",
                    "Respect strict des normes NF et PMR"
                ].map((item, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.2 }}
                        className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                        <div className="bg-tk-orange/10 p-2 rounded-full text-tk-orange">
                            <CheckCircle2 size={24} />
                        </div>
                        <span className="font-bold text-tk-dark">{item}</span>
                    </motion.div>
                ))}
            </div>
          </div>

          {/* Stats & Visual */}
          <div className="lg:w-1/2 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="col-span-2 bg-tk-darker rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl"
                >
                    <div className="absolute top-0 right-0 p-32 bg-tk-orange blur-[100px] opacity-20"></div>
                    <h3 className="text-2xl font-bold mb-2">Notre Engagement</h3>
                    <p className="text-gray-400">Chaque ligne tracée est une promesse de qualité et de durabilité pour vos usagers.</p>
                </motion.div>

                {stats.map((stat, idx) => (
                    <motion.div 
                        key={idx}
                        whileHover={{ y: -5 }}
                        className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center justify-center text-center group hover:border-tk-orange/30 transition-colors"
                    >
                        <div className="text-tk-orange mb-4 opacity-50 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 duration-300">
                            {stat.icon}
                        </div>
                        <div className="text-4xl font-black text-tk-dark mb-1">{stat.value}</div>
                        <div className="text-sm font-bold text-gray-500 uppercase tracking-wide">{stat.label}</div>
                    </motion.div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
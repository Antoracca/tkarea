"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col pt-24 pb-10 px-4 md:px-12 bg-white text-tk-black overflow-hidden">
      
      {/* --- UPPER PART : TYPOGRAPHY --- */}
      <div className="flex-1 flex flex-col justify-center mt-10 md:mt-0">
        <h1 className="font-black tracking-tighter uppercase leading-[0.9]">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl"
          >
            URBAN
          </motion.div>
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            className="text-tk-orange text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
          >
            ENGINEERING
          </motion.div>
        </h1>
      </div>

      {/* --- LOWER PART : IMAGE & INFOS --- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mt-12 md:mt-0">
        
        {/* Description */}
        <div className="md:col-span-4 flex flex-col justify-end pb-4 md:pb-10 order-2 md:order-1">
            <h3 className="text-sm md:text-xl font-bold mb-4 uppercase tracking-widest">EST. 2026 — FRANCE</h3>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed font-sans mb-8">
                Nous traçons le futur de vos espaces. Expertise technique en marquage, signalisation et aménagement urbain.
                <br/><span className="text-tk-orange font-bold">Intervention rapide & conforme.</span>
            </p>
            <div className="flex items-center gap-4">
                <a href="#contact" className="bg-tk-black text-white px-8 py-4 rounded-full font-bold hover:bg-tk-orange transition-colors w-full md:w-auto text-center">
                    Lancer le projet
                </a>
            </div>
        </div>

        {/* IMAGE DE CHANTIER */}
        <div className="md:col-span-8 order-1 md:order-2 relative h-[300px] md:h-[50vh] overflow-hidden rounded-lg w-full">
             <motion.div 
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700"
             />
             
             <div className="absolute bottom-4 left-4 bg-white p-3 max-w-[200px] md:max-w-xs shadow-lg">
                <span className="block text-[10px] font-mono text-gray-500 uppercase">Projet récent</span>
                <span className="font-bold text-black text-sm">Marquage Industriel, Zone 4</span>
             </div>
        </div>
      </div>
    </section>
  );
}

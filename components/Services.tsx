"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Images BTP fiables et génériques
const services = [
  { 
    id: "01", 
    title: "MARQUAGE AU SOL", 
    img: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop", // Route/Marquage
    desc: "Traçage routier, industriel et sportif haute performance." 
  },
  { 
    id: "02", 
    title: "SIGNALISATION", 
    img: "https://images.unsplash.com/photo-1573075175620-1e52f4c3a595?q=80&w=2070&auto=format&fit=crop", // Panneaux/Chantier
    desc: "Panneaux, balises et mâts conformes aux normes NF." 
  },
  { 
    id: "03", 
    title: "AMÉNAGEMENT", 
    img: "https://images.unsplash.com/photo-1591526435921-122e23653b6c?q=80&w=1974&auto=format&fit=crop", // Aménagement/Béton
    desc: "Mobilier urbain, sécurisation piétonne et ralentisseurs." 
  }
];

export default function Services() {
  return (
    <section id="expertise" className="py-20 md:py-32 bg-[#111] text-white px-6 md:px-12">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/20 pb-10">
        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter">
            Notre <span className="text-tk-orange">Expertise</span>
        </h2>
        <span className="font-mono text-sm text-gray-400 mb-2 md:mb-4">SCROLL TO DISCOVER</span>
      </div>

      {/* LISTE DES SERVICES */}
      <div className="flex flex-col gap-10">
        {services.map((service, index) => (
            <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group border-t border-white/10 pt-10"
            >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    
                    {/* ID & Title */}
                    <div className="md:col-span-4">
                        <span className="text-tk-orange font-mono text-xl block mb-2">({service.id})</span>
                        <h3 className="text-3xl md:text-5xl font-bold uppercase group-hover:text-tk-orange transition-colors">
                            {service.title}
                        </h3>
                    </div>

                    {/* Image Container */}
                    <div className="md:col-span-5 relative overflow-hidden h-64 w-full bg-gray-800 rounded-sm">
                        {/* Fallback color si l'image ne charge pas, sinon l'image recouvre tout */}
                        <div className="absolute inset-0 bg-gray-700 animate-pulse"></div>
                        <img 
                            src={service.img} 
                            alt={service.title} 
                            loading="lazy"
                            className="relative z-10 object-cover w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                        />
                    </div>

                    {/* Desc & Arrow */}
                    <div className="md:col-span-3 flex flex-col justify-between h-full py-4">
                        <p className="text-gray-400 text-lg">{service.desc}</p>
                        <div className="mt-6 flex justify-end">
                            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-tk-orange group-hover:border-tk-orange group-hover:text-black transition-all">
                                <ArrowUpRight />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        ))}
      </div>
    </section>
  );
}

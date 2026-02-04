"use client";

import { useState, FormEvent } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    project: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        setFormData({ name: "", company: "", email: "", project: "" });
      } else {
        setMessage({ type: 'error', text: data.error || 'Une erreur est survenue' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Erreur de connexion au serveur' });
    } finally {
      setLoading(false);
    }
  };
  return (
    <footer id="contact" className="bg-white text-black py-20 md:py-32 px-6 md:px-12 relative">
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            
            {/* TEXTE D'ACCROCHE */}
            <div>
                <h2 className="text-6xl md:text-8xl font-black uppercase mb-10 leading-[0.85]">
                    Let&apos;s build <br/><span className="text-tk-orange">Together</span>
                </h2>
                
                <div className="space-y-8 mt-20">
                    <div className="border-l-4 border-black pl-6">
                        <span className="block text-gray-500 font-mono text-sm uppercase mb-2">Siège Social</span>
                        <p className="text-2xl font-bold">2 Allée Melilot<br/>49080 Bouchemaine</p>
                    </div>
                    
                    <div className="border-l-4 border-tk-orange pl-6">
                        <span className="block text-gray-500 font-mono text-sm uppercase mb-2">Urgence &amp; Contact</span>
                        <p className="text-2xl font-bold">06 05 76 99 52</p>
                        <a href="mailto:info@tkarea.fr" className="text-xl underline decoration-tk-orange underline-offset-4">info@tkarea.fr</a>
                    </div>
                </div>
            </div>

            {/* FORMULAIRE GRAPHIQUE */}
            <div className="bg-[#F4F4F4] p-10 md:p-16">
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <div className="flex flex-col">
                        <label className="text-xs font-bold uppercase tracking-widest mb-2">Nom Complet *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="bg-transparent border-b-2 border-gray-300 py-4 text-xl focus:border-tk-orange focus:outline-none transition-colors"
                          placeholder="Jean Dupont"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs font-bold uppercase tracking-widest mb-2">Entreprise</label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          className="bg-transparent border-b-2 border-gray-300 py-4 text-xl focus:border-tk-orange focus:outline-none transition-colors"
                          placeholder="Société SAS"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs font-bold uppercase tracking-widest mb-2">Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="bg-transparent border-b-2 border-gray-300 py-4 text-xl focus:border-tk-orange focus:outline-none transition-colors"
                          placeholder="contact@email.com"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs font-bold uppercase tracking-widest mb-2">Projet *</label>
                        <textarea
                          rows={3}
                          required
                          value={formData.project}
                          onChange={(e) => setFormData({...formData, project: e.target.value})}
                          className="bg-transparent border-b-2 border-gray-300 py-4 text-xl focus:border-tk-orange focus:outline-none transition-colors"
                          placeholder="Description courte..."
                        ></textarea>
                    </div>

                    {message && (
                        <div className={`p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} font-bold text-sm`}>
                            {message.text}
                        </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-black text-white py-6 mt-4 font-bold text-xl uppercase tracking-widest hover:bg-tk-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Envoi en cours...' : 'Envoyer'}
                    </button>
                </form>
            </div>
        </div>

        <div className="mt-32 pt-10 border-t-2 border-black flex flex-col md:flex-row justify-between items-center font-bold uppercase text-sm">
            <span>© TK ARÉA 2026</span>
            <span className="hidden md:block">INGÉNIERIE URBAINE</span>
            <span>FRANCE</span>
        </div>
      </div>
    </footer>
  );
}

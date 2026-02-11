import Navbar from "@/components/Navbar";
import AnnouncementTicker from "@/components/AnnouncementTicker";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Realisations from "@/components/Realisations";
import DevisExperience from "@/components/DevisExperience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <AnnouncementTicker />
      <Hero />
      <Services />
      <About />
      <Realisations />
      <DevisExperience />
      <Contact />
      <Footer />
    </main>
  );
}

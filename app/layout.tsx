import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import Providers from "@/components/Providers";

const syne = Syne({ subsets: ["latin"], weight: ["400", "700", "800"], variable: '--font-syne' });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "500", "700"], variable: '--font-space' });

export const metadata: Metadata = {
  title: "TK ARÉA | Marquage au Sol & Signalisation Routière — Devis Gratuit 24/7",
  description: "TK ARÉA : entreprise spécialisée marquage au sol, signalisation routière, aménagement urbain. Intervention 24/7 sur Angers, Maine-et-Loire et Pays de la Loire. Devis gratuit sous 24h. Conformité 100% NF et PMR.",
  keywords: [
    // Services principaux
    "marquage au sol",
    "signalisation routière",
    "aménagement urbain",
    "marquage routier",
    "traçage routier",
    "peinture thermoplastique",
    // Services spécifiques
    "marquage parking",
    "marquage passage piéton",
    "marquage zone industrielle",
    "marquage terrain sport",
    "signalisation temporaire chantier",
    "panneaux signalisation",
    "panneau de signalisation",
    "mât signalisation",
    "balise de sécurité",
    "mobilier urbain",
    "borne de protection",
    "ralentisseur de vitesse",
    "accessibilité PMR",
    "aménagement PMR",
    "sécurité routière",
    "glissière de sécurité",
    // Mots intention commerciale
    "entreprise marquage au sol",
    "société signalisation routière",
    "prestataire marquage sol",
    "devis marquage au sol",
    "devis signalisation routière",
    "intervention urgence marquage",
    // Localisation
    "marquage au sol Angers",
    "signalisation routière Angers",
    "marquage sol Maine-et-Loire",
    "signalisation 49",
    "marquage sol Pays de la Loire",
    "TK ARÉA Bouchemaine",
    "marquage sol Nantes",
    "signalisation routière Nantes",
    "marquage sol Le Mans",
    "marquage sol Cholet",
    "marquage sol Laval",
    "marquage sol La Roche-sur-Yon",
    "aménagement urbain Grand Ouest",
    // Normes
    "marquage conforme NF",
    "norme CE signalisation",
    "marquage sol normes",
  ],
  authors: [{ name: "TK ARÉA" }],
  creator: "TK ARÉA",
  publisher: "TK ARÉA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.tkarea.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "TK ARÉA | Marquage au Sol & Signalisation Routière — Angers, Pays de la Loire",
    description: "Entreprise experte en marquage au sol, signalisation routière et aménagement urbain. Devis gratuit sous 24h. Intervention d'urgence 24/7 sur Angers, Maine-et-Loire, Pays de la Loire.",
    url: 'https://tkarea.com',
    siteName: 'TK ARÉA',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TK ARÉA - Expert Marquage au Sol et Signalisation Routière Angers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "TK ARÉA | Marquage au Sol & Signalisation — Angers 24/7",
    description: "Expert marquage au sol, signalisation routière et aménagement urbain. Devis gratuit 24h. Angers, Pays de la Loire.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1, // Empêche le zoom bizarre sur mobile
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth overflow-x-hidden">
      <head>
        <StructuredData />
      </head>
      <body className={`${syne.variable} ${spaceGrotesk.variable} bg-tk-light text-tk-black antialiased selection:bg-tk-orange selection:text-white w-full overflow-x-hidden`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

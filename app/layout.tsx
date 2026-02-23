import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import Providers from "@/components/Providers";

const syne = Syne({ subsets: ["latin"], weight: ["400", "700", "800"], variable: '--font-syne' });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "500", "700"], variable: '--font-space' });

export const metadata: Metadata = {
  title: "TK ARÉA | Signalisation & Aménagement Urbain | Marquage au Sol",
  description: "Expert en marquage au sol, signalisation routière et aménagement urbain. Intervention 24/7, conformité 100% aux normes NF et PMR. Bouchemaine, France.",
  keywords: ["marquage au sol", "signalisation routière", "aménagement urbain", "marquage routier", "panneaux signalisation", "mobilier urbain", "sécurité routière", "normes NF", "PMR", "Bouchemaine", "Angers", "Maine-et-Loire"],
  authors: [{ name: "TK ARÉA" }],
  creator: "TK ARÉA",
  publisher: "TK ARÉA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tkarea.fr'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "TK ARÉA | Expert en Signalisation & Aménagement Urbain",
    description: "Marquage au sol, signalisation routière et aménagement urbain. Intervention d'urgence 24/7. Conformité 100% aux normes.",
    url: 'https://tkarea.fr',
    siteName: 'TK ARÉA',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TK ARÉA - Signalisation & Aménagement Urbain',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "TK ARÉA | Signalisation & Aménagement Urbain",
    description: "Expert en marquage au sol et signalisation routière. Intervention 24/7.",
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

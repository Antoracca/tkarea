export default function StructuredData() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://tkarea.fr/#business",
    "name": "TK ARÉA",
    "alternateName": "TK Area",
    "image": "https://tkarea.fr/logo1.png",
    "logo": "https://tkarea.fr/logo1.png",
    "url": "https://tkarea.fr",
    "telephone": "+33605769952",
    "email": "info@tkarea.fr",
    "description": "TK ARÉA est une entreprise spécialisée en marquage au sol, signalisation routière et aménagement urbain. Intervention d'urgence 24/7 sur Angers, Maine-et-Loire et les Pays de la Loire. Devis gratuit sous 24h, conformité 100% aux normes NF et PMR.",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2 Allée Melilot",
      "addressLocality": "Bouchemaine",
      "postalCode": "49080",
      "addressRegion": "Maine-et-Loire",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 47.4167,
      "longitude": -0.6167
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "areaServed": [
      { "@type": "City", "name": "Angers" },
      { "@type": "City", "name": "Bouchemaine" },
      { "@type": "City", "name": "Nantes" },
      { "@type": "City", "name": "Le Mans" },
      { "@type": "City", "name": "Cholet" },
      { "@type": "City", "name": "Laval" },
      { "@type": "City", "name": "La Roche-sur-Yon" },
      { "@type": "City", "name": "Saint-Nazaire" },
      { "@type": "State", "name": "Maine-et-Loire" },
      { "@type": "State", "name": "Pays de la Loire" }
    ],
    "knowsAbout": [
      "Marquage au sol",
      "Signalisation routière",
      "Aménagement urbain",
      "Peinture thermoplastique",
      "Marquage parking",
      "Passage piéton",
      "Signalisation temporaire",
      "Mobilier urbain",
      "Accessibilité PMR",
      "Sécurité routière",
      "Normes NF signalisation",
      "Traçage routier",
      "Borne de protection",
      "Ralentisseur de vitesse"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services TK ARÉA",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Marquage au sol",
            "description": "Traçage routier, industriel et sportif haute performance avec peinture thermoplastique certifiée NF. Marquage parking, passage piéton, zone logistique.",
            "provider": { "@id": "https://tkarea.fr/#business" }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Signalisation routière",
            "description": "Installation de panneaux verticaux, balises de protection, mâts certifiés et signalisation temporaire de chantier conformes aux normes NF.",
            "provider": { "@id": "https://tkarea.fr/#business" }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Aménagement urbain",
            "description": "Mobilier urbain, ralentisseurs zones 30, bornes de protection, aménagements PMR et solutions d'accessibilité totale.",
            "provider": { "@id": "https://tkarea.fr/#business" }
          }
        }
      ]
    },
    "sameAs": []
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Quelle est la zone d'intervention de TK ARÉA pour le marquage au sol ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "TK ARÉA intervient sur tout le territoire national, avec une présence forte en Maine-et-Loire (Angers, Bouchemaine, Cholet) et dans toute la région Pays de la Loire (Nantes, Le Mans, Laval, La Roche-sur-Yon). Intervention d'urgence 24/7."
        }
      },
      {
        "@type": "Question",
        "name": "Combien coûte un marquage au sol ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le tarif d'un marquage au sol dépend de la surface, du type de peinture et de la complexité du tracé. TK ARÉA propose un devis gratuit personnalisé sous 24h. Contactez-nous au 06 05 76 99 52 ou par email à info@tkarea.fr."
        }
      },
      {
        "@type": "Question",
        "name": "Quelles normes respecte TK ARÉA pour ses prestations ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "TK ARÉA respecte 100% des normes françaises NF et européennes CE pour tous ses travaux : marquage routier (norme NF P 98-701), signalisation verticale (norme NF EN 12899), et accessibilité PMR (loi du 11 février 2005)."
        }
      },
      {
        "@type": "Question",
        "name": "TK ARÉA intervient-il pour les entreprises et collectivités ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, TK ARÉA travaille avec les entreprises privées (zones industrielles, entrepôts, parkings), les collectivités territoriales (communes, intercommunalités), et les gestionnaires de voirie. Nous proposons des contrats d'entretien annuels."
        }
      },
      {
        "@type": "Question",
        "name": "Quelle est la durée de vie d'un marquage au sol réalisé par TK ARÉA ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nos marquages en peinture thermoplastique ont une durée de vie de 8 à 10 ans en conditions normales de circulation. La durabilité dépend du trafic, des conditions climatiques et du type de revêtement. TK ARÉA garantit la conformité NF de toutes ses interventions."
        }
      },
      {
        "@type": "Question",
        "name": "Proposez-vous des interventions d'urgence pour la signalisation ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, TK ARÉA assure une mise en sécurité d'urgence 24h/24, 7j/7. Nos équipes interviennent rapidement pour la pose de signalisation temporaire, la sécurisation de chantiers et la réfection de marquages dégradés."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "TK ARÉA",
    "image": "https://tkarea.fr/logo1.png",
    "@id": "https://tkarea.fr",
    "url": "https://tkarea.fr",
    "telephone": "06 05 76 99 52",
    "email": "info@tkarea.fr",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2 Allée Melilot",
      "addressLocality": "Bouchemaine",
      "postalCode": "49080",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 47.4167,
      "longitude": -0.6167
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [],
    "priceRange": "€€",
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 47.4167,
        "longitude": -0.6167
      },
      "geoRadius": "100000"
    },
    "description": "Expert en marquage au sol, signalisation routière et aménagement urbain. Intervention d'urgence 24/7, conformité 100% aux normes NF et PMR.",
    "serviceType": ["Marquage au sol", "Signalisation routière", "Aménagement urbain"]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

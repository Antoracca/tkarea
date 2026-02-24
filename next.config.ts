import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "jhm.fr" },
      { protocol: "https", hostname: "www.groupe-helios.com" },
      { protocol: "https", hostname: "www.ste-lsp.com" },
      { protocol: "https", hostname: "inforisque.fr" },
      { protocol: "https", hostname: "www.signaletique-express.fr" },
      { protocol: "https", hostname: "m3.direct-signaletique.com" },
      { protocol: "https", hostname: "metropole.toulouse.fr" },
      { protocol: "https", hostname: "www.mairie-lognes.fr" },
      { protocol: "https", hostname: "pro.choisirmonmetier-paysdelaloire.fr" },
      { protocol: "https", hostname: "www.sepur.com" },
      { protocol: "https", hostname: "khelcombusiness.com" },
      { protocol: "https", hostname: "uploads.prod01.london.platform-os.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        source: "/video/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;

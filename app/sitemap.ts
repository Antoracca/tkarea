import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://tkarea.fr',
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://tkarea.fr/mentions-legales',
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://tkarea.fr/confidentialite',
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://tkarea.fr/cgv',
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}

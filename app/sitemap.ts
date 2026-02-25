import { MetadataRoute } from 'next';

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.tkarea.com',
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://www.tkarea.com/mentions-legales',
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://www.tkarea.com/confidentialite',
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://www.tkarea.com/cgv',
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}

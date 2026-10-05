import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/app/', '/parent/', '/teacher/', '/admin/'],
    },
    sitemap: 'https://blokuma.id/sitemap.xml',
  };
}

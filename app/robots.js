export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/app/', '/parent/', '/teacher/', '/admin/'],
    },
    sitemap: 'https://blokuma.id/sitemap.xml',
  };
}

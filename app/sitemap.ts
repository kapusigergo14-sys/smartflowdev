import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://smartflowdev.com';
  const lastModified = new Date();
  const routes = ['', '/chatbot', '/lawyer', '/plumber', '/hvac', '/phone-agent', '/proposal'];
  return routes.map((path) => ({
    url: base + path,
    lastModified,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.8,
  }));
}

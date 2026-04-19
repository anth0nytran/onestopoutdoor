import { MetadataRoute } from 'next';
import { getAllSlugs, getPostBySlug } from './blog/posts';
import { areaCities } from './service-areas/data';
import { pillarContent } from './services/pillar-data';

const BASE_URL = 'https://onestopoutdoorconstruction.com';

// Use the last known content update date instead of new Date() every crawl.
// Update this when major content changes are deployed.
const LAST_DEPLOY = new Date('2026-04-18');

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: LAST_DEPLOY,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: LAST_DEPLOY,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/service-areas`,
      lastModified: LAST_DEPLOY,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: LAST_DEPLOY,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: LAST_DEPLOY,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: LAST_DEPLOY,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: LAST_DEPLOY,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const areaPages: MetadataRoute.Sitemap = areaCities.map((c) => ({
    url: `${BASE_URL}/service-areas/${c.slug}`,
    lastModified: LAST_DEPLOY,
    changeFrequency: 'monthly' as const,
    priority: c.priority === 'primary' ? 0.9 : 0.75,
  }));

  const pillarPages: MetadataRoute.Sitemap = Object.keys(pillarContent).map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: LAST_DEPLOY,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  const blogPages: MetadataRoute.Sitemap = getAllSlugs().map((slug) => {
    const post = getPostBySlug(slug);
    return {
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: post ? new Date(post.lastModified || post.date) : LAST_DEPLOY,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    };
  });

  return [...staticPages, ...pillarPages, ...areaPages, ...blogPages];
}

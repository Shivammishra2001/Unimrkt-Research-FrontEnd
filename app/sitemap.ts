import type { MetadataRoute } from 'next';
import { getBlogSlugs, getCaseStudySlugs, getIndustrySlugs, getPageSlugs, getServiceSlugs } from '@/controllers/strapi';

export const revalidate = 3600;

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/+$/, '');

/** Website path of a `page` entry whose route isn't simply `/<slug>` (the dedicated Next.js routes). */
const PAGE_ROUTES: Record<string, string> = {
  home: '/',
  'about-us': '/our-company',
  'case-studies': '/case-study',
  blog: '/blogs',
};

type Slugs = { data: Array<{ slug: string; updatedAt?: string }> };

async function entries(load: () => Promise<Slugs>, toPath: (slug: string) => string): Promise<MetadataRoute.Sitemap> {
  try {
    return (await load()).data.map(({ slug, updatedAt }) => ({
      url: `${SITE_URL}${toPath(slug)}`,
      ...(updatedAt ? { lastModified: updatedAt } : {}),
    }));
  } catch {
    // CMS unreachable at build/request time: leave this section out rather than fail the whole sitemap.
    return [];
  }
}

/**
 * Every public URL. The slug endpoints only return entries whose CMS "Page visibility" switch is ON, so a switched-off page drops out
 * of the sitemap automatically (and /robots.txt points crawlers here).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, industries, services, blogs, caseStudies] = await Promise.all([
    entries(getPageSlugs, (slug) => PAGE_ROUTES[slug] ?? `/${slug}`),
    entries(getIndustrySlugs, (slug) => `/industries/${slug}`),
    entries(getServiceSlugs, (slug) => `/services/${slug}`),
    entries(getBlogSlugs, (slug) => `/blogs/${slug}`),
    entries(getCaseStudySlugs, (slug) => `/case-study/${slug}`),
  ]);

  const all = [...pages, ...industries, ...services, ...blogs, ...caseStudies];
  // Pages can map to the same path (e.g. "home" and "/"); keep the first.
  return Array.from(new Map(all.map((item) => [item.url, item])).values());
}

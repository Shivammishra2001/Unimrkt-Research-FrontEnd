/**
 * Mirrors controllers/industry.ts's shape exactly (same reason: the raw
 * fetcher is imported under an alias since this file's own normalized
 * export needs the same name for the orchestrated version).
 */
import { cache } from 'react';
import { getBlogs, getBlogBySlug as fetchBlogBySlug, getBlogSlugs, StrapiError } from './strapi';
import { normalizeBlogDetail, normalizeBlogList, normalizeBlogSlugs } from './normalize';
import type { BlogDetail, BlogSlugModel, BlogSummary } from '@/models/blog';

/** Thin pass-through — `blogs?populate=*` per FRONTEND brief; sort/order
 * are applied client-side by BlogGridSection/FeaturedBlogSection, not here. */
export async function getAllBlogPosts(params: { page?: number; pageSize?: number } = {}): Promise<BlogSummary[]> {
  return normalizeBlogList(await getBlogs(params));
}

/** react `cache()`-wrapped, shared by generateMetadata and the page body.
 * Returns `null` on a StrapiError 404; rethrows everything else. */
export const getBlogPostBySlug = cache(async (slug: string): Promise<BlogDetail | null> => {
  try {
    return normalizeBlogDetail(await fetchBlogBySlug(slug));
  } catch (err) {
    if (err instanceof StrapiError && err.status === 404) return null;
    throw err;
  }
});

export async function getAllBlogSlugs(): Promise<BlogSlugModel[]> {
  return normalizeBlogSlugs(await getBlogSlugs());
}

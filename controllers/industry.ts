/**
 * Mirrors controllers/service.ts's shape exactly (same reason: the raw
 * fetcher is imported under an alias since this file's own normalized
 * export needs the same name for the orchestrated version).
 */
import { cache } from 'react';
import { getIndustries, getIndustryBySlug as fetchIndustryBySlug, getIndustrySlugs, StrapiError } from './strapi';
import { normalizeIndustryDetail, normalizeIndustryList, normalizeIndustrySlugs } from './normalize';
import type { IndustryDetail, IndustrySlugModel, IndustrySummary } from '@/models/industry';

/** Thin pass-through — populate + default sort are forced server-side by
 * the backend's `find` override. */
export async function getAllIndustries(params: { page?: number; pageSize?: number } = {}): Promise<IndustrySummary[]> {
  return normalizeIndustryList(await getIndustries(params));
}

/** react `cache()`-wrapped, shared by generateMetadata and the page body.
 * Returns `null` on a StrapiError 404; rethrows everything else. */
export const getIndustryBySlug = cache(async (slug: string): Promise<IndustryDetail | null> => {
  try {
    return normalizeIndustryDetail(await fetchIndustryBySlug(slug));
  } catch (err) {
    if (err instanceof StrapiError && err.status === 404) return null;
    throw err;
  }
});

export async function getAllIndustrySlugs(): Promise<IndustrySlugModel[]> {
  return normalizeIndustrySlugs(await getIndustrySlugs());
}

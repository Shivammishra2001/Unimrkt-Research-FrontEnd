/**
 * Per FRONTEND_SPEC.md §4.5. The raw fetcher is imported under an alias
 * (`fetchServiceBySlug`) since this file's own normalized export needs the
 * same name (`getServiceBySlug`) for the orchestrated version.
 */
import { cache } from 'react';
import { getServices, getServiceBySlug as fetchServiceBySlug, getServiceSlugs, StrapiError } from './strapi';
import { normalizeServiceDetail, normalizeServiceList, normalizeServiceSlugs } from './normalize';
import type { ServiceDetail, ServiceSlugModel, ServiceSummary } from '@/models/service';

/** Thin pass-through — populate + default sort are forced server-side by
 * the backend's `find` override. */
export async function getAllServices(params: { page?: number; pageSize?: number } = {}): Promise<ServiceSummary[]> {
  return normalizeServiceList(await getServices(params));
}

/** react `cache()`-wrapped, shared by generateMetadata and the page body.
 * Returns `null` on a StrapiError 404; rethrows everything else. */
export const getServiceBySlug = cache(async (slug: string): Promise<ServiceDetail | null> => {
  try {
    return normalizeServiceDetail(await fetchServiceBySlug(slug));
  } catch (err) {
    if (err instanceof StrapiError && err.status === 404) return null;
    throw err;
  }
});

export async function getAllServiceSlugs(): Promise<ServiceSlugModel[]> {
  return normalizeServiceSlugs(await getServiceSlugs());
}

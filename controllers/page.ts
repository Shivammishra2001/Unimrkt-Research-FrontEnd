/**
 * Page routing-resolution model. Per FRONTEND_SPEC.md §1/§4.4.
 */
import { cache } from 'react';
import { getPageBySlug, getPageSlugs, StrapiError } from './strapi';
import { normalizePage, normalizePageSlugs } from './normalize';
import type { PageModel } from '@/models/domain';

export const HOME_SLUG = 'home';

/** `['services','cloud'] -> 'cloud'`; `undefined | [] -> 'home'` — a page
 * is looked up by its *last* URL segment (the Model keeps `slug` flat). */
export function resolveSlugFromSegments(segments?: string[]): string {
  if (!segments || segments.length === 0) return HOME_SLUG;
  return segments[segments.length - 1];
}

/** `'home' -> { slug: undefined }` (prebuilds `/`); else `{ slug: [slug] }`. */
export function toStaticParams(slug: string): { slug?: string[] } {
  if (slug === HOME_SLUG) return { slug: undefined };
  return { slug: [slug] };
}

/**
 * react `cache()`-wrapped so generateMetadata() and the page body share
 * one call. Returns `null` on a StrapiError 404; rethrows everything else
 * (so real failures bubble to app/error.tsx). Must never call notFound()
 * itself — the page component owns that, so generateMetadata's fallback
 * path can't accidentally swallow Next's special not-found control flow.
 */
export const fetchPageBySegments = cache(async (segments?: string[]): Promise<PageModel | null> => {
  const slug = resolveSlugFromSegments(segments);
  try {
    return normalizePage(await getPageBySlug(slug));
  } catch (err) {
    if (err instanceof StrapiError && err.status === 404) return null;
    throw err;
  }
});

/** One path per published slug (`/<slug>`, `/` for "home"). A deeper URL
 * resolving to the same slug still renders via `dynamicParams: true`
 * (Next's default) and gets ISR-cached after first request. */
export async function getStaticPageParams(): Promise<Array<{ slug?: string[] }>> {
  const slugs = normalizePageSlugs(await getPageSlugs());
  return slugs.map((s) => toStaticParams(s.slug));
}

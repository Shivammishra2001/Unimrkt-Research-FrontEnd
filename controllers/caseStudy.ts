/** /case-study's CMS content — mirrors controllers/workWithUsPage.ts's
 * shape (react cache()-wrapped read) for the listing, and
 * controllers/industry.ts's slug-lookup shape (404 -> null) for the
 * detail page (/case-study/[slug], Figma node 1107:49842). */
import { cache } from 'react';
import { getCaseStudies, getCaseStudyBySlug as fetchCaseStudyBySlug, getCaseStudySlugs, StrapiError } from './strapi';
import { normalizeCaseStudyList, normalizeCaseStudyDetailResponse } from './normalize';
import type { CaseStudySummary, CaseStudyDetail } from '@/models/caseStudy';

export const getCaseStudyList = cache(async (): Promise<CaseStudySummary[]> => {
  return normalizeCaseStudyList(await getCaseStudies());
});

/** react `cache()`-wrapped, shared by generateMetadata and the page
 * body. Returns `null` on a StrapiError 404; rethrows everything
 * else — same convention as controllers/industry.ts's
 * getIndustryBySlug(). */
export const getCaseStudyDetail = cache(async (slug: string): Promise<CaseStudyDetail | null> => {
  try {
    return normalizeCaseStudyDetailResponse(await fetchCaseStudyBySlug(slug));
  } catch (err) {
    if (err instanceof StrapiError && err.status === 404) return null;
    throw err;
  }
});

export const getCaseStudySlugList = cache(async (): Promise<{ slug: string }[]> => {
  const response = await getCaseStudySlugs();
  return (response.data ?? []).map((s) => ({ slug: s.slug }));
});

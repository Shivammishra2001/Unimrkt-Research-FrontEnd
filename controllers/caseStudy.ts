/** /case-study's CMS content — mirrors controllers/workWithUsPage.ts's
 * shape (react cache()-wrapped read), but for a collectionType list
 * rather than a singleType. */
import { cache } from 'react';
import { getCaseStudies } from './strapi';
import { normalizeCaseStudyList } from './normalize';
import type { CaseStudySummary } from '@/models/caseStudy';

export const getCaseStudyList = cache(async (): Promise<CaseStudySummary[]> => {
  return normalizeCaseStudyList(await getCaseStudies());
});

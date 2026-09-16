/** /case-study + /case-study/[slug]'s shared template-chrome CMS
 * content — mirrors controllers/contactPage.ts's shape (react
 * cache()-wrapped singleType read). */
import { cache } from 'react';
import { getCaseStudyPageSettings } from './strapi';
import { normalizeCaseStudyPageSettings } from './normalize';
import type { CaseStudyPageSettings } from '@/models/caseStudyPage';

export const getCaseStudyPageContent = cache(async (): Promise<CaseStudyPageSettings> => {
  return normalizeCaseStudyPageSettings(await getCaseStudyPageSettings());
});

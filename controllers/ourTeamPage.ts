/** /our-team's CMS content — mirrors controllers/caseStudyPage.ts's
 * shape (react cache()-wrapped singleType read). */
import { cache } from 'react';
import { getOurTeamPageSettings } from './strapi';
import { normalizeOurTeamPageSettings } from './normalize';
import type { OurTeamPageSettings } from '@/models/ourTeamPage';

export const getOurTeamPageContent = cache(async (): Promise<OurTeamPageSettings> => {
  return normalizeOurTeamPageSettings(await getOurTeamPageSettings());
});

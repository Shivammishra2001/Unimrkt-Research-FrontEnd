/** /privacy-policy's CMS content — mirrors controllers/caseStudyPage.ts's
 * shape (react cache()-wrapped singleType read). */
import { cache } from 'react';
import { getPrivacyPolicyPageSettings } from './strapi';
import { normalizePrivacyPolicyPageSettings } from './normalize';
import type { PrivacyPolicyPageSettings } from '@/models/privacyPolicyPage';

export const getPrivacyPolicyPageContent = cache(async (): Promise<PrivacyPolicyPageSettings> => {
  return normalizePrivacyPolicyPageSettings(await getPrivacyPolicyPageSettings());
});

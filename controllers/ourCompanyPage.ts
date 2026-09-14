/** /our-company's CMS content — mirrors controllers/servicesPage.ts's
 * shape (react cache()-wrapped singleType read). */
import { cache } from 'react';
import { getOurCompanyPageSettings } from './strapi';
import { normalizeOurCompanyPageSettings } from './normalize';
import type { OurCompanySettings } from '@/models/ourCompanyPage';

export const getOurCompanyPageContent = cache(async (): Promise<OurCompanySettings> => {
  return normalizeOurCompanyPageSettings(await getOurCompanyPageSettings());
});

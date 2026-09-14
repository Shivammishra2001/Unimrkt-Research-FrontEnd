/** /work-with-us's CMS content — mirrors controllers/contactPage.ts's
 * shape (react cache()-wrapped singleType read). */
import { cache } from 'react';
import { getWorkWithUsPageSettings } from './strapi';
import { normalizeWorkWithUsPageSettings } from './normalize';
import type { WorkWithUsSettings } from '@/models/workWithUsPage';

export const getWorkWithUsPageContent = cache(async (): Promise<WorkWithUsSettings> => {
  return normalizeWorkWithUsPageSettings(await getWorkWithUsPageSettings());
});

/** /contact's CMS content — mirrors controllers/ourCompanyPage.ts's
 * shape (react cache()-wrapped singleType read). */
import { cache } from 'react';
import { getContactPageSettings } from './strapi';
import { normalizeContactPageSettings } from './normalize';
import type { ContactPageSettings } from '@/models/contactPage';

export const getContactPageContent = cache(async (): Promise<ContactPageSettings> => {
  return normalizeContactPageSettings(await getContactPageSettings());
});

/** /services' hero/intro/value-props/workflow/FAQ/CTA copy — mirrors
 * controllers/service.ts's getAllServiceCategories() shape (react
 * cache()-wrapped singleType read). */
import { cache } from 'react';
import { getServicesPageSettings } from './strapi';
import { normalizeServicesPageSettings } from './normalize';
import type { ServicesPageSettings } from '@/models/servicesPage';

export const getServicesPageContent = cache(async (): Promise<ServicesPageSettings> => {
  return normalizeServicesPageSettings(await getServicesPageSettings());
});

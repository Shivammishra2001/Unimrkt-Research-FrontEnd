/** /services' hero/intro/value-props/workflow/FAQ/CTA copy — static
 * content (the `services-page` singleType was removed); the category grid
 * still comes from the `service` hierarchy via controllers/service.ts. */
import { normalizeServicesPageSettings } from './normalize';
import { SERVICES_PAGE_CONTENT } from '@/views/services/content';
import type { ServicesPageSettings } from '@/models/servicesPage';

export async function getServicesPageContent(): Promise<ServicesPageSettings> {
  return normalizeServicesPageSettings(SERVICES_PAGE_CONTENT);
}

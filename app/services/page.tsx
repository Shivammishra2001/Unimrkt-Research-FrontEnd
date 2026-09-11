import type { Metadata } from 'next';
import { getAllServiceCategories } from '@/controllers/service';
import { getServicesPageContent } from '@/controllers/servicesPage';
import { isBackendUnreachable } from '@/controllers/strapi';
import { ServiceListingView } from '@/views/services/ServiceListingView';
import { OfflineNotice } from '@/views/ui/OfflineNotice';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Helping organizations transform data into actionable insights through comprehensive market research and business intelligence.',
};

// A literal static segment, so Next routes it here rather than into the
// generic catch-all — this whole /services/* prefix permanently belongs
// to the service content type, never a `page`.
//
// Both fetches below are tagged and revalidated independently:
// getAllServiceCategories() -> `services` (existing service lifecycle
// hooks), getServicesPageContent() -> `services-page` (the new singleType's
// own lifecycle hooks) — editing the grid and editing the surrounding
// copy each only invalidate their own piece.
export default async function ServicesPage() {
  try {
    const [categories, settings] = await Promise.all([getAllServiceCategories(), getServicesPageContent()]);
    return <ServiceListingView categories={categories} settings={settings} />;
  } catch (err) {
    // Backend down: a friendly offline notice beats an unhandled 500 —
    // the next request picks Strapi back up automatically once it's
    // reachable again.
    if (isBackendUnreachable(err)) return <OfflineNotice />;
    throw err;
  }
}

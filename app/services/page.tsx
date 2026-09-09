import type { Metadata } from 'next';
import { getAllServices } from '@/controllers/service';
import { isBackendUnreachable } from '@/controllers/strapi';
import { ServiceListingView } from '@/views/services/ServiceListingView';
import { OfflineNotice } from '@/views/ui/OfflineNotice';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore our services — web development, design, and cloud operations.',
};

// A literal static segment, so Next routes it here rather than into the
// generic catch-all — this whole /services/* prefix permanently belongs
// to the service/city/city-service-override content types, never a `page`.
export default async function ServicesPage() {
  try {
    const services = await getAllServices();
    return <ServiceListingView services={services} />;
  } catch (err) {
    // Backend down: a friendly offline notice beats an unhandled 500 —
    // the next request picks Strapi back up automatically once it's
    // reachable again.
    if (isBackendUnreachable(err)) return <OfflineNotice />;
    throw err;
  }
}

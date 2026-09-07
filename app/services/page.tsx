import type { Metadata } from 'next';
import { getAllServices } from '@/controllers/service';
import { ServiceListingView } from '@/views/services/ServiceListingView';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore our services — web development, design, and cloud operations.',
};

// A literal static segment, so Next routes it here rather than into the
// generic catch-all — this whole /services/* prefix permanently belongs
// to the service/city/city-service-override content types, never a `page`.
export default async function ServicesPage() {
  const services = await getAllServices();
  return <ServiceListingView services={services} />;
}

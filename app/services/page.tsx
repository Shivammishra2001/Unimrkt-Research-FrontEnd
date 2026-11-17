import type { Metadata } from 'next';
import { getAllServiceCategories } from '@/controllers/service';
import { getServicesPageContent } from '@/controllers/servicesPage';
import { getAllIndustries } from '@/controllers/industry';
import { getAllBlogPosts } from '@/controllers/blog';
import { getIndustriesPageContent } from '@/controllers/industriesPage';
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
// The category panels come from the `service` hierarchy; the industries
// slider, blog teaser and client testimonials (Pages > Industries) are the
// same Strapi data the /industries page shows. A failure in one of those
// secondary fetches only hides its section, never the whole page.
export default async function ServicesPage() {
  try {
    const [categories, settings, industries, blogPosts, testimonials] = await Promise.all([
      getAllServiceCategories(),
      getServicesPageContent(),
      getAllIndustries().catch(() => []),
      getAllBlogPosts().catch(() => []),
      getIndustriesPageContent()
        .then((c) => c.testimonials.items)
        .catch(() => []),
    ]);
    return <ServiceListingView categories={categories} settings={settings} industries={industries} blogPosts={blogPosts} testimonials={testimonials} />;
  } catch (err) {
    // Backend down: a friendly offline notice beats an unhandled 500 —
    // the next request picks Strapi back up automatically once it's
    // reachable again.
    if (isBackendUnreachable(err)) return <OfflineNotice />;
    throw err;
  }
}

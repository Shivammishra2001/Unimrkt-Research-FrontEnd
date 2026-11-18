import { getGlobalClosingBands } from '@/controllers/closingBands';
import type { Metadata } from 'next';
import { getAllServiceCategories } from '@/controllers/service';
import { getServicesListingContent } from '@/controllers/servicesListingPage';
import { getAllIndustries } from '@/controllers/industry';
import { getAllBlogPosts } from '@/controllers/blog';
import { getIndustriesPageContent } from '@/controllers/industriesPage';
import { isBackendUnreachable } from '@/controllers/strapi';
import { notFoundIfMissing } from '@/controllers/visibility';
import { ServiceListingView } from '@/views/services/ServiceListingView';
import { OfflineNotice } from '@/views/ui/OfflineNotice';

const FALLBACK_METADATA: Metadata = {
  title: 'Services',
  description:
    'Helping organizations transform data into actionable insights through comprehensive market research and business intelligence.',
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { seo } = await getServicesListingContent();
    if (!seo) return FALLBACK_METADATA;
    return {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords.length > 0 ? seo.keywords : undefined,
      robots: seo.noIndex ? { index: false, follow: false } : undefined,
    };
  } catch {
    return FALLBACK_METADATA;
  }
}

// A literal static segment, so Next routes it here rather than into the
// generic catch-all — this whole /services/* prefix belongs to the service
// content type. The page's own copy is the `services` entry in Strapi's Pages
// section (one `services-page.*` block per section, Figma copy as fallback).
// The category panels come from the `service` hierarchy; the industries
// slider, blog teaser and client testimonials (Pages > Industries) are the
// same Strapi data the /industries page shows. A failure in one of those
// secondary fetches only hides its section, never the whole page.
export default async function ServicesPage() {
  try {
    const [categories, content, industries, blogPosts, testimonials] = await Promise.all([
      getAllServiceCategories(),
      getServicesListingContent(),
      getAllIndustries().catch(() => []),
      getAllBlogPosts().catch(() => []),
      getIndustriesPageContent()
        .then((c) => c.testimonials.items)
        .catch(() => []),
    ]);
    // Global Header, Footer & SEO closing bands (cached; never throws). The view applies this page's own overrides.
    const globalBands = await getGlobalClosingBands();
    return <ServiceListingView globalBands={globalBands} categories={categories} content={content} industries={industries} blogPosts={blogPosts} testimonials={testimonials} />;
  } catch (err) {
    // Backend down: a friendly offline notice beats an unhandled 500 —
    // the next request picks Strapi back up automatically once it's
    // reachable again.
    if (isBackendUnreachable(err)) return <OfflineNotice />;
    notFoundIfMissing(err);
    throw err;
  }
}

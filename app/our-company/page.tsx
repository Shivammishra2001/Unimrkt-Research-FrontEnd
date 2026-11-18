import { getGlobalClosingBands } from '@/controllers/closingBands';
import { notFoundIfMissing } from '@/controllers/visibility';
import type { Metadata } from 'next';
import { cmsMetadata } from '@/controllers/pageMetadata';
import { getOurCompanyPageContent } from '@/controllers/ourCompanyPage';
import { getAllBlogPosts } from '@/controllers/blog';
import { isBackendUnreachable } from '@/controllers/strapi';
import { OurCompanyView } from '@/views/our-company/OurCompanyView';
import { OfflineNotice } from '@/views/ui/OfflineNotice';

// Title/description from the page's Strapi SEO component; this copy is the fallback.
export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata(getOurCompanyPageContent, {
    title: 'Our Company',
    description: 'Unimrkt Research is a global market research partner helping organisations understand people, markets, and opportunities across 90+ countries.',
  });
}

// A literal static segment, so Next routes it here rather than into the
// generic catch-all — /our-company permanently belongs to this dedicated
// page, never a generic `page` dynamiczone entry (see backend/scripts/
// seed.ts's comment on why the old generic entry at this slug was
// deleted). Mirrors app/services/page.tsx.
export default async function OurCompanyPage() {
  try {
    const [settings, blogPosts] = await Promise.all([getOurCompanyPageContent(), getAllBlogPosts()]);
    // Global Header, Footer & SEO closing bands (cached; never throws). The view applies this page's own overrides.
    const globalBands = await getGlobalClosingBands();
    return <OurCompanyView globalBands={globalBands} settings={settings} blogPosts={blogPosts} />;
  } catch (err) {
    if (isBackendUnreachable(err)) return <OfflineNotice />;
    notFoundIfMissing(err);
    throw err;
  }
}

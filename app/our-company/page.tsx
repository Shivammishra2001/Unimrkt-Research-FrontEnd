import type { Metadata } from 'next';
import { getOurCompanyPageContent } from '@/controllers/ourCompanyPage';
import { getAllBlogPosts } from '@/controllers/blog';
import { isBackendUnreachable } from '@/controllers/strapi';
import { OurCompanyView } from '@/views/our-company/OurCompanyView';
import { OfflineNotice } from '@/views/ui/OfflineNotice';

export const metadata: Metadata = {
  title: 'Our Company',
  description: 'Unimrkt Research is a global market research partner helping organisations understand people, markets, and opportunities across 90+ countries.',
};

// A literal static segment, so Next routes it here rather than into the
// generic catch-all — /our-company permanently belongs to this dedicated
// page, never a generic `page` dynamiczone entry (see backend/scripts/
// seed.ts's comment on why the old generic entry at this slug was
// deleted). Mirrors app/services/page.tsx.
export default async function OurCompanyPage() {
  try {
    const [settings, blogPosts] = await Promise.all([getOurCompanyPageContent(), getAllBlogPosts()]);
    return <OurCompanyView settings={settings} blogPosts={blogPosts} />;
  } catch (err) {
    if (isBackendUnreachable(err)) return <OfflineNotice />;
    throw err;
  }
}

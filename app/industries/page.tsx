import type { Metadata } from 'next';
import { getAllIndustries } from '@/controllers/industry';
import { getAllBlogPosts } from '@/controllers/blog';
import { isBackendUnreachable } from '@/controllers/strapi';
import { IndustryListingView } from '@/views/industries/IndustryListingView';
import { OfflineNotice } from '@/views/ui/OfflineNotice';

export const metadata: Metadata = {
  title: 'Industries',
  description: 'Data-driven market research solutions tailored to the unique challenges of your industry.',
};

// A literal static segment, so Next routes it here rather than into the
// generic catch-all — this whole /industries/* prefix permanently belongs
// to the industry content type, never a `page`.
export default async function IndustriesPage() {
  try {
    const [industries, blogPosts] = await Promise.all([getAllIndustries(), getAllBlogPosts()]);
    return <IndustryListingView industries={industries} blogPosts={blogPosts} />;
  } catch (err) {
    if (isBackendUnreachable(err)) return <OfflineNotice />;
    throw err;
  }
}

import type { Metadata } from 'next';
import { getAllIndustries } from '@/controllers/industry';
import { getAllBlogPosts } from '@/controllers/blog';
import { getIndustriesPageContent } from '@/controllers/industriesPage';
import { isBackendUnreachable } from '@/controllers/strapi';
import { IndustryListingView } from '@/views/industries/IndustryListingView';
import { OfflineNotice } from '@/views/ui/OfflineNotice';

const FALLBACK_METADATA: Metadata = {
  title: 'Industries',
  description: 'Data-driven market research solutions tailored to the unique challenges of your industry.',
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { seo } = await getIndustriesPageContent();
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
// generic catch-all — this whole /industries/* prefix permanently belongs
// to the industry content type. The page's own copy is the `industries`
// entry in Strapi's Pages section (block `page-content.industries`).
export default async function IndustriesPage() {
  try {
    const [industries, blogPosts, content] = await Promise.all([
      getAllIndustries(),
      getAllBlogPosts(),
      getIndustriesPageContent(),
    ]);
    return <IndustryListingView industries={industries} blogPosts={blogPosts} content={content} />;
  } catch (err) {
    if (isBackendUnreachable(err)) return <OfflineNotice />;
    throw err;
  }
}

import type { Metadata } from 'next';
import { getAllBlogPosts } from '@/controllers/blog';
import { isBackendUnreachable } from '@/controllers/strapi';
import { BlogListingView } from '@/views/blog/BlogListingView';
import { OfflineNotice } from '@/views/ui/OfflineNotice';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Market research insights, industry trends, and expert perspectives from Unimrkt Research.',
};

// A literal static segment, so Next routes it here rather than into the
// generic catch-all — this whole /blogs/* prefix permanently belongs to
// the blog content type, never a `page`. Mirrors app/industries/page.tsx.
export default async function BlogsPage() {
  try {
    const posts = await getAllBlogPosts();
    return <BlogListingView posts={posts} />;
  } catch (err) {
    if (isBackendUnreachable(err)) return <OfflineNotice />;
    throw err;
  }
}

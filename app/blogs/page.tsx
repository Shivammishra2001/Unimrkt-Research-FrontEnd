import type { Metadata } from 'next';
import { getAllBlogPosts } from '@/controllers/blog';
import { getAllCategories } from '@/controllers/category';
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
    // Categories are fetched independently of which posts currently use
    // them (not derived from `posts`) — a category created in the Admin
    // panel shows up as a filter tab immediately, even before any post is
    // tagged with it.
    const [posts, categories] = await Promise.all([getAllBlogPosts(), getAllCategories()]);
    return <BlogListingView posts={posts} categories={categories} />;
  } catch (err) {
    if (isBackendUnreachable(err)) return <OfflineNotice />;
    throw err;
  }
}

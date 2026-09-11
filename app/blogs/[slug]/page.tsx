import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllBlogPosts, getAllBlogSlugs, getBlogPostBySlug } from '@/controllers/blog';
import { isBackendUnreachable } from '@/controllers/strapi';
import { BlogDetailView } from '@/views/blog/BlogDetailView';
import { OfflineNotice } from '@/views/ui/OfflineNotice';
import type { BlogDetail, BlogSummary } from '@/models/blog';

/** Same category as `post` (excluding itself) first, `order`-ascending;
 * padded out with the next-most-recent posts overall if fewer than 4
 * share the category — "Other Blogs" (Figma 587:3448) always shows 4
 * when the collection has that many. */
function pickRelatedPosts(all: BlogSummary[], post: BlogDetail): BlogSummary[] {
  const others = all.filter((p) => p.slug !== post.slug).sort((a, b) => a.order - b.order);
  const sameCategory = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...sameCategory, ...rest].slice(0, 4);
}

interface RouteParams {
  slug: string;
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: RouteParams }): Promise<Metadata> {
  let post: BlogDetail | null;
  try {
    post = await getBlogPostBySlug(params.slug);
  } catch (err) {
    if (isBackendUnreachable(err)) return {};
    throw err;
  }
  if (!post) return {};

  return {
    title: post.seo?.title ?? post.title,
    description: post.seo?.description ?? post.excerpt,
    ...(post.seo?.noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/** A dynamic *segment* (not catch-all) — shadows the generic catch-all for
 * the whole /blogs/* prefix. Mirrors app/industries/[slug]/page.tsx. */
export default async function BlogDetailPage({ params }: { params: RouteParams }) {
  let post: BlogDetail | null;
  let allPosts: BlogSummary[];
  try {
    [post, allPosts] = await Promise.all([getBlogPostBySlug(params.slug), getAllBlogPosts()]);
  } catch (err) {
    if (isBackendUnreachable(err)) return <OfflineNotice />;
    throw err;
  }
  if (!post) notFound();

  return <BlogDetailView post={post} relatedPosts={pickRelatedPosts(allPosts, post)} />;
}

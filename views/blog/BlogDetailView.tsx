import Link from 'next/link';
import { Container } from '@/views/ui/Container';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { ChevronIcon } from '@/views/ui/icons/ChevronIcon';
import { FacebookIcon, XIcon, LinkedInIcon } from '@/views/ui/icons/SocialIcons';
import { MailIcon } from '@/views/ui/icons/MailIcon';
import { RichContent } from './RichContent';
import { QuickEnquiryCard } from './QuickEnquiryCard';
import { RecentPostsCard } from './RecentPostsCard';
import { FeaturedBlogSection } from './FeaturedBlogSection';
import { BlogFaqAccordion } from './BlogFaqAccordion';
import { BlogBottomCta } from './BlogBottomCta';
import type { BlogDetail, BlogSummary } from '@/models/blog';

function formatDate(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${d.getFullYear()}`;
}

const SHARE_ICON_CLASS = 'flex size-11 items-center justify-center rounded-full bg-footer-social text-white transition-transform hover:scale-105';

/**
 * /blogs/[slug] — Figma node 587:3338 ("Blog Details"). Navbar/Footer are
 * global (app/layout.tsx). Structure top to bottom: breadcrumb, title +
 * byline/date/read-time, cover image, a two-column body (RichContent +
 * share row / QuickEnquiryCard + RecentPostsCard sidebar), "Other Blogs"
 * (related posts, reusing FeaturedBlogSection), the post's own FAQ
 * accordion (no CTA — the node has none here, unlike /blogs), and the
 * shared bottom CTA.
 */
export function BlogDetailView({ post, relatedPosts }: { post: BlogDetail; relatedPosts: BlogSummary[] }) {
  const shareUrl = `https://www.unimrkt.com/blogs/${post.slug}`;

  return (
    <article>
      {/* Breadcrumb */}
      <div className="w-full border-b border-card-border bg-white shadow-card">
        <div className="mx-auto flex w-full max-w-container items-center gap-2 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="shrink-0 font-sans text-sm font-semibold text-[#b52c2c]">
            Home
          </Link>
          <ChevronIcon className="size-3.5 shrink-0 rotate-90 text-slate-400" aria-hidden="true" />
          <Link href="/blogs" className="shrink-0 font-sans text-sm font-semibold text-[#b52c2c]">
            Blog
          </Link>
          <ChevronIcon className="size-3.5 shrink-0 rotate-90 text-slate-400" aria-hidden="true" />
          <span className="min-w-0 flex-1 truncate font-sans text-sm text-[#868484]">{post.title}</span>
        </div>
      </div>

      {/* Title + meta + cover image */}
      <section className="bg-white pb-8 pt-16 sm:pt-20">
        <Container>
          <h1 className="mx-auto max-w-4xl text-center capitalize font-sans text-3xl font-semibold leading-[1.2] text-heading sm:text-5xl lg:text-[60px] lg:tracking-[-3px]">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 font-sans text-[15px] tracking-[-0.2px] sm:text-[17px]">
            <span className="font-semibold text-[#712b49]">By Unimrkt</span>
            <span className="text-[#585858]">•</span>
            <span className="text-[#585858]">{formatDate(post.publishedAt)}</span>
            <span className="text-[#585858]">•</span>
            <span className="text-[#585858]">{post.readTimeMinutes} min read</span>
          </div>

          {post.coverImage && (
            <div className="relative mx-auto mt-10 aspect-[1239/508] w-full max-w-[1239px] overflow-hidden rounded-video-lg bg-slate-200">
              <StrapiImage image={post.coverImage} sizes="(min-width: 1024px) 1239px, 100vw" priority fill className="object-cover" />
            </div>
          )}
        </Container>
      </section>

      {/* Body + sidebar */}
      <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_512px]">
            <div className="min-w-0">
              <RichContent content={post.body} />

              <div className="mt-12 h-px w-full bg-[#eee]" aria-hidden="true" />
              <div className="mt-6 flex items-center gap-4">
                <span className="font-sans text-lg font-bold text-heading">Share</span>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className={SHARE_ICON_CLASS}>
                  <FacebookIcon className="size-4" aria-hidden="true" />
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X" className={SHARE_ICON_CLASS}>
                  <XIcon className="size-4" aria-hidden="true" />
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" className={SHARE_ICON_CLASS}>
                  <LinkedInIcon className="size-4" aria-hidden="true" />
                </a>
                <a href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`} aria-label="Share via email" className={SHARE_ICON_CLASS}>
                  <MailIcon className="size-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
              <QuickEnquiryCard />
              <RecentPostsCard />
            </div>
          </div>
        </Container>
      </section>

      {relatedPosts.length > 0 && <FeaturedBlogSection posts={relatedPosts} heading="Other Blogs" />}

      <BlogFaqAccordion heading="Frequently Asked Questions" items={post.faqItems} />

      <BlogBottomCta />
    </article>
  );
}

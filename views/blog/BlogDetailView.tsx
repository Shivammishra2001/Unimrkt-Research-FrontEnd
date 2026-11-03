import Link from 'next/link';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { FacebookIcon, XIcon, LinkedInIcon } from '@/views/ui/icons/SocialIcons';
import { MailIcon } from '@/views/ui/icons/MailIcon';
import { BlogTeaserView } from '@/views/sections/BlogTeaserView';
import { FaqView } from '@/views/sections/FaqView';
import { FinalCtaBand } from '@/views/industries/listing/AboutServicesCta';
import { RichContent } from './RichContent';
import { QuickEnquiryCard } from './QuickEnquiryCard';
import { RecentPostsCard } from './RecentPostsCard';
import type { BlogDetail, BlogSummary } from '@/models/blog';

function formatDate(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${d.getFullYear()}`;
}

// Figma 1499:16886 — 44px #a3282a circles, 7.765px apart.
const SHARE_ICON_CLASS =
  'flex size-11 items-center justify-center rounded-full bg-[#a3282a] text-white transition-transform duration-300 hover:scale-105 motion-reduce:transition-none';

/** Breadcrumb separator (Figma 587:3535: 4x7.43 chevron, #111827, in a 12px box). */
function Chevron() {
  return (
    <span className="inline-flex size-3 shrink-0 items-center justify-center" aria-hidden="true">
      <svg width="4" height="7.42857" viewBox="0 0 4 7.42857" fill="none" className="-scale-x-100">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.85355 0.155413C4.04882 0.36263 4.04882 0.698595 3.85355 0.905812L1.20711 3.71429L3.85355 6.52276C4.04882 6.72998 4.04882 7.06594 3.85355 7.27316C3.65829 7.48038 3.34171 7.48038 3.14645 7.27316L0.146447 4.08949C-0.0488155 3.88227 -0.0488155 3.5463 0.146447 3.33909L3.14645 0.155413C3.34171 -0.0518043 3.65829 -0.0518043 3.85355 0.155413Z"
          fill="#111827"
        />
      </svg>
    </span>
  );
}

/**
 * /blogs/[slug] — Figma node 587:3338 ("Blog Details", 1900px frame). Top to bottom: the global header (dark glass, as on Home) · #f9f9f7 hero with the wave pattern at 70%, breadcrumb (y145), 50px title (y209),
 * byline (y340) and the 1239x508 r40 cover image (y384, overhanging the hero) · 1023px article column + 512px sticky sidebar
 * (Quick Enquiry, Recent Posts) from y980 · divider + Share row · "Other Blogs" band · FAQ · closing CTA band.
 * The node has no category pill and no read-time, so neither is drawn.
 */
export function BlogDetailView({ post, relatedPosts, recentPosts = [] }: { post: BlogDetail; relatedPosts: BlogSummary[]; recentPosts?: BlogSummary[] }) {
  const shareUrl = `https://www.unimrkt.com/blogs/${post.slug}`;

  return (
    <article>
      {/* Hero — 120px white header strip + 648px #f9f9f7 band (768 in total). */}
      <section className="relative bg-[#f9f9f7] pt-[110px] lg:h-[768px] lg:pt-[120px]">
        <div className="absolute inset-x-0 top-0 h-[110px] bg-[#0a0f1d] lg:h-[120px]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 top-[110px] h-[calc(100%-110px)] overflow-hidden lg:top-[120px] lg:h-[648px]" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/blog/detail-wave.png"
            alt=""
            className="absolute left-[calc(50%+11px)] top-0 h-[1100px] w-[2512px] max-w-none -translate-x-1/2 object-cover opacity-70"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 min-[1700px]:px-0">
          <nav aria-label="Breadcrumb" className="pt-6 lg:pt-[21px]">
            <ol className="flex flex-wrap items-center gap-[7px] font-sans text-[14px] leading-[1.2]">
              <li>
                <Link href="/" className="font-semibold text-[#b52c2c] hover:underline">
                  Home
                </Link>
              </li>
              <Chevron />
              <li>
                <Link href="/blogs" className="font-semibold text-[#b52c2c] hover:underline">
                  Blog
                </Link>
              </li>
              <Chevron />
              <li aria-current="page" className="min-w-0 truncate font-normal text-[#868484]">
                {post.title}
              </li>
            </ol>
          </nav>

          <h1 className="mx-auto mt-[30px] max-w-[757px] text-center font-sans text-[32px] font-semibold capitalize leading-[1.2] text-[#02060e] sm:text-[40px] lg:mt-[51px] lg:text-[50px] lg:tracking-[-2px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
            {post.title}
          </h1>
          <p className="mt-6 whitespace-pre text-center font-sans text-[17px] font-normal leading-[1.7] tracking-[-0.2px] text-[#585858] lg:mt-9 [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
            <span className="font-semibold text-[#712b49]">By Unimrkt</span>
            {'    •   '}
            {formatDate(post.publishedAt)}
          </p>

          <div className="relative mx-auto mt-8 aspect-[1239/508] w-full max-w-[1239px] lg:left-[16.5px] overflow-hidden rounded-[24px] bg-[#d9d9d9] lg:rounded-[40px]">
            {post.coverImage && (
              <StrapiImage
                image={post.coverImage}
                sizes="(min-width: 1024px) 1239px, 100vw"
                priority
                fill
                className="object-cover [object-position:50%_74%]"
              />
            )}
          </div>
        </div>
      </section>

      {/* Body — Figma: text column 1023px at x150, sidebar 512px at x1239; first line's cap-top at y980. */}
      <section className="bg-white pb-12 pt-10 lg:pb-[65px] lg:pt-[202px]">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 min-[1700px]:px-0">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1023px)_512px] lg:justify-between lg:gap-x-8">
            <div className="min-w-0">
              <RichContent content={post.body} />

              <div className="mt-12 h-px w-full bg-[#d9d9d9] lg:mt-[49.5px] lg:w-[calc(100%+20px)]" aria-hidden="true" />
              <div className="mt-6 flex flex-wrap items-center gap-[15px] lg:mt-[25px] lg:pl-[10px]">
                <span className="font-sans text-[24px] font-semibold capitalize leading-[1.2] tracking-[-1px] text-[#02060e]">Share</span>
                <div className="flex items-center gap-[7.765px]">
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
                    <MailIcon className="size-[18px]" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[30px] lg:sticky lg:top-[140px] lg:self-start lg:pt-[10px]">
              <QuickEnquiryCard />
              <RecentPostsCard posts={recentPosts} />
            </div>
          </div>
        </div>
      </section>

      {/* "Other Blogs" — the Home band as drawn on this frame (1499:16864-16884): 648px, 13px eyebrow, description, arrows. */}
      {relatedPosts.length > 0 && (
        <BlogTeaserView
          index={0}
          variant="post"
          block={{
            kind: 'blogTeaser',
            id: 'blog-other-blogs',
            theme: 'light',
            eyebrow: 'Other Blogs',
            heading: 'Exploring Market Trends',
            description: 'Discover Emerging Market Trends That Shape Smarter Business Decisions.',
            actions: [],
            posts: relatedPosts.slice(0, 3).map((related) => ({
              id: `post-${related.slug}`,
              title: related.title,
              excerpt: related.excerpt,
              image: related.coverImage,
              href: `/blogs/${related.slug}`,
            })),
          }}
        />
      )}

      {/* FAQ — the post's own questions in the Home band (1499:16854-16863: no "Browse Blogs" button on this frame). */}
      {post.faqItems.length > 0 && (
        <FaqView
          index={0}
          variant="blog"
          block={{
            kind: 'faq',
            id: 'blog-post-faq',
            theme: 'light',
            heading: 'Frequently Asked Questions',
            background: { src: '/figma-home/faq-worldmap.png', alt: '', width: 1377, height: 787 },
            items: post.faqItems,
          }}
        />
      )}

      <FinalCtaBand
        finalCta={{
          heading: 'Start Your Research Journey',
          body: 'Partner with Unimrkt Research to uncover actionable market intelligence, understand your industry, and make confident business decisions.',
          action: { id: 'blog-post-final-cta', label: 'Talk to Our Experts', href: '/contact', isExternal: false, variant: 'secondary' },
        }}
      />
    </article>
  );
}

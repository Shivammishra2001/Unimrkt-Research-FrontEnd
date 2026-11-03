import Image from 'next/image';
import { Breadcrumb } from '@/views/ui/Breadcrumb';
import { Button } from '@/views/ui/Button';
import { BlogTeaserView } from '@/views/sections/BlogTeaserView';
import { FaqView } from '@/views/sections/FaqView';
import { AboutServicesCta } from '@/views/industries/listing/AboutServicesCta';
import { BlogGridSection } from './BlogGridSection';
import { SITEWIDE_BLOG_FAQ_ITEMS } from './BlogFaqAccordion';
import type { BlogSummary } from '@/models/blog';
import type { CategoryModel } from '@/models/category';

const HERO_CTA = {
  id: 'blog-hero-cta',
  label: 'Talk to Our Experts',
  href: '/contact',
  isExternal: false,
  variant: 'primary' as const,
};

/**
 * /blogs — Figma node 522:4719 (1900px frame). Navbar/Footer are rendered globally by app/layout.tsx.
 * Sections, top to bottom: 768px hero (522:4838) · breadcrumb · "Insights & Stories" wave section with the filter tabs,
 * 3x3 card grid and pagination (522:4832-5057) · Latest Blogs strip (522:4808-4828, the Home band) · FAQ
 * (522:4788-4799, the Home band) · "About Our Blog" + closing CTA (522:4720-4779, same design as the industry pages).
 * Posts and category tabs are CMS-dynamic; the remaining copy is static text copied off the node.
 */
export function BlogListingView({ posts, categories }: { posts: BlogSummary[]; categories: CategoryModel[] }) {
  const sortedPosts = [...posts].sort((a, b) => a.order - b.order);

  return (
    <>
      {/* Hero — 768px, #040112 base; photo at 70% (1928x982 at -14/-77), 40% #010913 wash, 1064px left shade, 255px top fade. */}
      <section className="relative w-full bg-[#040112] text-white lg:min-h-[768px]">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -left-[0.74%] -top-[10.03%] h-[127.86%] w-[101.47%] opacity-70">
            <Image src="/images/blog/hero-bg.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-[#010913]/40" />
          <div
            className="absolute inset-y-0 left-0 w-[1064px] max-w-full opacity-70"
            style={{ backgroundImage: 'linear-gradient(to left, rgba(0,0,0,0) 0%, #02050e 63%)' }}
          />
          <div
            className="absolute inset-x-0 top-0 h-[255px] opacity-90"
            style={{ backgroundImage: 'linear-gradient(to bottom, #06070d 37%, rgba(6,7,13,0) 100%)' }}
          />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1466px] px-4 pb-16 pt-36 sm:px-6 lg:px-8 lg:pb-16 lg:pt-[276px] min-[1500px]:px-0">
          <p className="inline-flex h-10 items-center gap-3 whitespace-nowrap rounded-lg border border-white/10 bg-white/10 px-[17px] py-[9px] font-sans text-[13px] font-bold uppercase leading-[15.6px] tracking-[3px] text-white backdrop-blur-[2px]">
            <span className="size-2 shrink-0 rounded-full bg-[#a82c31]" aria-hidden="true" />
            Our Blog
          </p>
          <h1 className="mt-[14.5px] max-w-[735px] font-sans text-[36px] font-semibold capitalize leading-[43px] text-white sm:text-[48px] sm:leading-[58px] lg:text-[60px] lg:leading-[72px] lg:tracking-[-3px]">
            Market Research
            <br className="hidden sm:block" /> Insights &amp; Industry Trends
          </h1>
          <p className="mt-[12.8px] max-w-[716px] font-sans text-[16px] font-normal leading-[30.4px] text-white/80">
            Stay informed with expert articles, research methodologies, industry trends, customer insights, and business
            intelligence from Unimrkt Research.
          </p>
          <div className="mt-8 lg:mt-[47.4px]">
            <Button link={HERO_CTA} />
          </div>
        </div>
      </section>

      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />

      {/* Filter tabs + 3x3 grid + pagination — wave pattern bg as on /gallery (Figma 522:4832). */}
      <section className="relative overflow-hidden bg-white pb-16 pt-14 sm:pb-20 lg:pb-[110.6px] lg:pt-[70px]">
        <div
          className="pointer-events-none absolute inset-0 bg-[length:1900px_1411px] bg-[position:center_top] bg-repeat"
          style={{ backgroundImage: "url('/images/gallery/wave-pattern.png')" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 min-[1700px]:px-0">
          <BlogGridSection posts={sortedPosts} categories={categories} />
        </div>
      </section>

      {/* Latest Blogs — the Home band (gradient panel + 3 cards), as on the industry pages. */}
      {sortedPosts.length > 0 && (
        <BlogTeaserView
          index={0}
          variant="blog"
          block={{
            kind: 'blogTeaser',
            id: 'blog-latest-blogs',
            theme: 'light',
            eyebrow: 'Latest Blogs',
            heading: 'Exploring Market Trends',
            description: 'Discover Emerging Market Trends That Shape Smarter Business Decisions.',
            actions: [],
            posts: sortedPosts.slice(1, 4).map((post) => ({
              id: `post-${post.slug}`,
              title: post.title,
              excerpt: post.excerpt,
              image: post.coverImage,
              href: `/blogs/${post.slug}`,
            })),
          }}
        />
      )}

      {/* FAQ — the Home band: world-map watermark, "Browse Blogs" button, accordion. */}
      <FaqView
        index={0}
        variant="blog"
        block={{
          kind: 'faq',
          id: 'blog-faq',
          theme: 'light',
          heading: 'Frequently Asked Questions',
          background: { src: '/figma-home/faq-worldmap.png', alt: '', width: 1377, height: 787 },
          cta: { id: 'blog-faq-cta', label: 'Browse Blogs', href: '/blogs', isExternal: false, variant: 'primary' },
          items: SITEWIDE_BLOG_FAQ_ITEMS,
        }}
      />

      <AboutServicesCta
        detail
        about={{
          eyebrow: 'About Our Blog',
          heading: 'Insights That Drive Smarter Business Decisions',
          paragraphs: [
            'Welcome to the Unimrkt Research Blog, your trusted source for the latest market research insights, industry trends, and expert perspectives. From primary research methodologies and consumer behavior to business strategy and emerging market opportunities, our articles are designed to help organizations make informed, data-driven decisions.',
            'Explore practical guides, research best practices, case studies, and thought leadership from experienced industry professionals. Whether you’re a business leader, marketer, or researcher, our blog delivers valuable knowledge to help you understand markets, uncover opportunities, and stay ahead in today’s competitive business landscape.',
          ],
        }}
        finalCta={{
          heading: 'Start Your Research Journey',
          body: 'Partner with Unimrkt Research to uncover actionable market intelligence, understand your industry, and make confident business decisions.',
          action: { id: 'blog-final-cta', label: 'Talk to Our Experts', href: '/contact', isExternal: false, variant: 'secondary' },
        }}
      />
    </>
  );
}

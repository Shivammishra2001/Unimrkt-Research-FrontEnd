import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/views/ui/Container';
import { Prose } from '@/views/ui/Prose';
import { Button } from '@/views/ui/Button';
import { ChevronIcon } from '@/views/ui/icons/ChevronIcon';
import { BlogGridSection } from './BlogGridSection';
import { FeaturedBlogSection } from './FeaturedBlogSection';
import { BlogFaqAccordion, SITEWIDE_BLOG_FAQ_ITEMS } from './BlogFaqAccordion';
import { BlogBottomCta } from './BlogBottomCta';
import type { BlogSummary } from '@/models/blog';
import type { CategoryModel } from '@/models/category';

const BOTTOM_CTA_LINK = {
  id: 'blog-bottom-cta',
  label: 'Talk to Our Experts',
  href: '/contact',
  isExternal: false,
  variant: 'secondary' as const,
};

/**
 * /blogs — Figma node 522:4719. Navbar/Footer are already rendered
 * globally by app/layout.tsx; this view owns everything between them.
 * The post grid/featured-strip content is CMS-dynamic (`posts`, fetched
 * via controllers/blog.ts) and so is the category filter's tab list
 * (`categories`, fetched via controllers/category.ts, independently of
 * which categories any post currently uses — see app/blogs/page.tsx);
 * hero copy, FAQ, "About Our Blog", and the bottom CTA are static text
 * copied verbatim off the node — see the plan's scope note for why this
 * page has no `blogs-page` singleType.
 */
export function BlogListingView({ posts, categories }: { posts: BlogSummary[]; categories: CategoryModel[] }) {
  const sortedPosts = [...posts].sort((a, b) => a.order - b.order);

  return (
    <>
      {/* Hero — mirrors GalleryView's/ServiceListingView's `background`
          hero treatment (same fixed-Navbar clearance, same dark scrim). */}
      <section className="relative flex min-h-[480px] w-full items-center overflow-hidden text-white sm:min-h-[560px] lg:min-h-[640px]">
        <Image src="/images/blog/hero-bg.jpg" alt="" fill priority sizes="100vw" className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-[#040112]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040112] via-[#040112]/70 to-[#040112]/50" />
        <div className="relative z-10 mx-auto w-full max-w-container px-4 pt-32 sm:px-6 lg:px-8">
          <p className="inline-flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 px-[17px] py-[9px] backdrop-blur-[2px] font-sans text-[13px] font-bold uppercase tracking-[3px] text-white">
            <span className="size-2 shrink-0 rounded-full bg-brand-600" aria-hidden="true" />
            Our Blog
          </p>
          <h1 className="mt-3 max-w-[748px] capitalize text-4xl font-semibold leading-[1.2] text-white sm:text-5xl lg:text-[60px] lg:tracking-[-3px]">
            Market Research Insights &amp; Industry Trends
          </h1>
          <p className="mt-6 max-w-[716px] text-base leading-[1.9] text-white/80 sm:text-lg">
            Stay informed with expert articles, research methodologies, industry trends, customer insights, and business
            intelligence from Unimrkt Research.
          </p>
          <div className="mt-8">
            <Button link={{ ...BOTTOM_CTA_LINK, id: 'blog-hero-cta', variant: 'primary' }} />
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="w-full border-b border-card-border bg-white shadow-card">
        <div className="mx-auto flex w-full max-w-container items-center gap-2 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="font-sans text-sm font-semibold text-[#b52c2c]">
            Home
          </Link>
          <ChevronIcon className="size-3.5 rotate-90 text-slate-400" aria-hidden="true" />
          <span className="font-sans text-sm text-[#868484]">Blog</span>
        </div>
      </div>

      {/* Category filter + 3x3 grid + pagination */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <BlogGridSection posts={sortedPosts} categories={categories} />
        </Container>
      </section>

      {/* "Latest Blogs" featured strip */}
      <FeaturedBlogSection posts={sortedPosts} />

      {/* FAQ */}
      <BlogFaqAccordion heading="Frequently Asked Questions" items={SITEWIDE_BLOG_FAQ_ITEMS} showCta />

      {/* About Our Blog */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-[850px] text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">About Our Blog</p>
            <h2 className="mt-3 capitalize text-[28px] font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-2px]">
              Insights That Drive Smarter Business Decisions
            </h2>
            <Prose className="mx-auto mt-6 max-w-4xl">
              Welcome to the Unimrkt Research Blog, your trusted source for the latest market research insights, industry
              trends, and expert perspectives. From primary research methodologies and consumer behavior to business
              strategy and emerging market opportunities, our articles are designed to help organizations make informed,
              data-driven decisions.
            </Prose>
            <Prose className="mx-auto mt-4 max-w-4xl">
              Explore practical guides, research best practices, case studies, and thought leadership from experienced
              industry professionals. Whether you&apos;re a business leader, marketer, or researcher, our blog delivers
              valuable knowledge to help you understand markets, uncover opportunities, and stay ahead in today&apos;s
              competitive business landscape.
            </Prose>
          </div>
        </Container>
      </section>

      <BlogBottomCta />
    </>
  );
}

import { DetailHero } from './detail/DetailHero';
import { ContentBlock } from './detail/ContentBlock';
import { WhyResearchSection } from './detail/WhyResearchSection';
import { ExpertiseStrip } from './detail/ExpertiseStrip';
import { ChallengesSection } from './detail/ChallengesSection';
import { WhoWeServeSection } from './detail/WhoWeServeSection';
import { MethodologiesSection } from './detail/MethodologiesSection';
import { EnquiryForm } from '@/views/ui/detail/EnquiryForm';
import { CaseStudiesSection } from './detail/CaseStudiesSection';
import { AboutServicesCta } from './listing/AboutServicesCta';
import { resolveIndustryDetail } from './detail/fallback';
import { BlogTeaserView } from '@/views/sections/BlogTeaserView';
import { FaqView } from '@/views/sections/FaqView';
import type { IndustryDetail } from '@/models/industry';
import type { BlogSummary } from '@/models/blog';
import type { CaseStudySummary } from '@/models/caseStudy';

/**
 * /industries/[slug] detail page — Figma node 384:6205 ("Automotives").
 * Navbar/Footer are global (app/layout.tsx). Template + graceful
 * fallback: `resolveIndustryDetail()` (detail/fallback.ts) prefers each
 * industry's own Strapi data and falls back to the node's own structure
 * with generic, `industry.title`-interpolated copy wherever a field is
 * empty — so every one of the 27 industries renders the full page, not
 * just "Automotives" (the only one with authored content so far). The
 * one section that stays CMS-only is Case Studies — see fallback.ts's
 * header comment for why. Latest Blogs and the bottom CTA are genuinely
 * global site chrome (confirmed byte-identical across /blogs,
 * /blogs/[slug], and /industries already), not per-industry content, so
 * they reuse the existing shared components unconditionally.
 */
export function IndustryDetailView({
  industry,
  blogPosts,
  latestCaseStudies = [],
}: {
  industry: IndustryDetail;
  blogPosts: BlogSummary[];
  /** Fallback for the Case Studies section: the latest published case studies. */
  latestCaseStudies?: CaseStudySummary[];
}) {
  const sortedBlogPosts = [...blogPosts].sort((a, b) => a.order - b.order);
  const content = resolveIndustryDetail(industry);

  // Figma 384:6205 always draws this section: the industry's own picks when set,
  // otherwise the two latest published case studies.
  const caseStudies =
    content.caseStudies ??
    (latestCaseStudies.length > 0
      ? {
          eyebrow: 'Case Studies',
          heading: `${content.title} Success Stories`,
          body: `Discover how our research empowers ${content.title.toLowerCase()} brands with actionable insights, smarter decisions, and measurable business growth.`,
          cta: { id: 'industry-case-cta', label: 'Talk to Our Experts', href: '/contact', isExternal: false, variant: 'secondary' as const },
          items: latestCaseStudies.slice(-2).map((c) => ({ id: c.id, title: c.title, image: c.coverImage, accentColor: '#05101a' })),
        }
      : null);

  return (
    <>
      <DetailHero hero={content.hero} title={content.title} />
      <ContentBlock
        eyebrow={content.whatWeDo.eyebrow}
        heading={content.whatWeDo.heading}
        body={content.whatWeDo.body}
        cta={content.whatWeDo.cta}
        image={content.whatWeDo.image}
        frame="rounded"
        imageSide="right"
        minHeightClass="lg:min-h-[777px]"
      />

      <WhyResearchSection whyResearch={content.whyResearch} />
      <ExpertiseStrip expertise={content.expertise} />
      <ChallengesSection challenges={content.challenges} />
      <WhoWeServeSection whoWeServe={content.whoWeServe} />
      <MethodologiesSection methodologies={content.methodologies} />

      <ContentBlock
        eyebrow={content.empower.eyebrow}
        heading={content.empower.heading}
        body={content.empower.body}
        cta={content.empower.cta}
        image={content.empower.image}
        frame="circle"
        imageSide="right"
        minHeightClass="lg:min-h-[892px]"
      />

      <EnquiryForm eyebrow={content.enquiry.eyebrow} heading={content.enquiry.heading} body={content.enquiry.body} image={content.enquiry.image} />

      {sortedBlogPosts.length > 0 && (
        // The Home page's "Latest Blogs" band (red panel + post cards), fed the same way.
        <BlogTeaserView
          index={0}
          block={{
            kind: 'blogTeaser',
            id: 'industry-latest-blogs',
            theme: 'light',
            eyebrow: 'Latest Blogs',
            heading: 'Exploring Market Trends',
            actions: [],
            posts: sortedBlogPosts.slice(1, 4).map((post) => ({
              id: `post-${post.slug}`,
              title: post.title,
              excerpt: post.excerpt,
              image: post.coverImage,
              href: `/blogs/${post.slug}`,
            })),
          }}
        />
      )}

      {/* The Home page's FAQ section: world-map watermark, "Browse Blogs" button, same accordion. */}
      <FaqView
        index={0}
        block={{
          kind: 'faq',
          id: 'industry-faq',
          theme: 'light',
          heading: 'Frequently Asked Questions',
          background: { src: '/figma-home/faq-worldmap.png', alt: '', width: 1377, height: 787 },
          cta: { id: 'industry-faq-cta', label: 'Browse Blogs', href: '/blogs', isExternal: false, variant: 'primary' },
          items: content.faqItems,
        }}
      />

      <CaseStudiesSection caseStudies={caseStudies} />
      {/* Same About + closing-CTA design as /industries (Figma 384:6574-6388 = 1384:26772's closing frames). */}
      <AboutServicesCta
        about={{ eyebrow: content.about.eyebrow, heading: content.about.heading, paragraphs: content.about.body.split('\n\n').map((p) => p.trim()).filter(Boolean) }}
        finalCta={{
          heading: 'Start Your Research Journey',
          body: 'Partner with Unimrkt Research to uncover actionable market intelligence, understand your industry, and make confident business decisions.',
          action: { id: 'industry-final-cta', label: 'Talk to Our Experts', href: '/contact', isExternal: false, variant: 'secondary' },
        }}
      />
    </>
  );
}

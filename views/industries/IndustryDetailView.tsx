import { DetailHero } from './detail/DetailHero';
import { TrustStrip } from '@/views/ui/detail/TrustStrip';
import { ContentBlock } from './detail/ContentBlock';
import { WhyResearchSection } from './detail/WhyResearchSection';
import { ExpertiseStrip } from './detail/ExpertiseStrip';
import { ChallengesSection } from './detail/ChallengesSection';
import { WhoWeServeSection } from './detail/WhoWeServeSection';
import { MethodologiesSection } from './detail/MethodologiesSection';
import { EnquiryForm } from '@/views/ui/detail/EnquiryForm';
import { CaseStudiesSection } from './detail/CaseStudiesSection';
import { AboutIndustrySection } from './detail/AboutIndustrySection';
import { resolveIndustryDetail } from './detail/fallback';
import { FeaturedBlogSection } from '@/views/blog/FeaturedBlogSection';
import { BlogFaqAccordion } from '@/views/blog/BlogFaqAccordion';
import { BlogBottomCta } from '@/views/blog/BlogBottomCta';
import type { IndustryDetail } from '@/models/industry';
import type { BlogSummary } from '@/models/blog';

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
export function IndustryDetailView({ industry, blogPosts }: { industry: IndustryDetail; blogPosts: BlogSummary[] }) {
  const sortedBlogPosts = [...blogPosts].sort((a, b) => a.order - b.order);
  const content = resolveIndustryDetail(industry);

  return (
    <>
      <DetailHero hero={content.hero} title={content.title} />
      <TrustStrip heading={content.trust.heading} logos={content.trust.logos} />

      <ContentBlock
        eyebrow={content.whatWeDo.eyebrow}
        heading={content.whatWeDo.heading}
        body={content.whatWeDo.body}
        cta={content.whatWeDo.cta}
        image={content.whatWeDo.image}
        frame="rounded"
        imageSide="right"
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
      />

      <EnquiryForm eyebrow={content.enquiry.eyebrow} heading={content.enquiry.heading} body={content.enquiry.body} image={content.enquiry.image} />

      {sortedBlogPosts.length > 0 && <FeaturedBlogSection posts={sortedBlogPosts} heading="Latest Blogs" />}

      <BlogFaqAccordion heading="Frequently Asked Questions" items={content.faqItems} />

      <CaseStudiesSection caseStudies={content.caseStudies} />
      <AboutIndustrySection about={content.about} />
      <BlogBottomCta />
    </>
  );
}

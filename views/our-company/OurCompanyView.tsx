import { HeroSection } from './HeroSection';
import { StatsBandSection } from './StatsBandSection';
import { AboutFoundingSection } from './AboutFoundingSection';
import { InsightsSection } from './InsightsSection';
import { EcosystemSection } from './EcosystemSection';
import { ValuesSection } from './ValuesSection';
import { IndustriesSection } from './IndustriesSection';
import { AboutCompanySection } from './AboutCompanySection';
import { resolveOurCompany } from './fallback';
import { FeaturedBlogSection } from '@/views/blog/FeaturedBlogSection';
import { BlogFaqAccordion } from '@/views/blog/BlogFaqAccordion';
import { BlogBottomCta } from '@/views/blog/BlogBottomCta';
import type { OurCompanySettings } from '@/models/ourCompanyPage';
import type { BlogSummary } from '@/models/blog';

/**
 * /our-company — Figma node 617:7561 ("Our Company", file
 * foaJFuv0vRX8nD43o0ylgB). Navbar/Footer are global (app/layout.tsx).
 * Template + graceful fallback: `resolveOurCompany()` (./fallback.ts)
 * prefers the CMS's `our-company-page` singleType and falls back to the
 * node's own verbatim copy wherever a field is empty, so the page always
 * renders in full.
 *
 * Renders every one of the node's own sections, top to bottom, and
 * nothing else — this is a full traversal of the node's direct
 * children, not an approximation:
 *   Hero (+ breadcrumb) / Stats band / About & Founding / Insights /
 *   Research Ecosystem / Our Values / Industries / Latest Blogs / FAQ /
 *   About Company / bottom CTA.
 * Latest Blogs and the bottom CTA are genuinely global site chrome
 * (confirmed byte-identical across /blogs, /blogs/[slug], /industries,
 * and /services/[slug] already this session), not page-specific
 * content, so they reuse the existing shared components unconditionally.
 */
export function OurCompanyView({ settings, blogPosts }: { settings: OurCompanySettings; blogPosts: BlogSummary[] }) {
  const content = resolveOurCompany(settings);
  const sortedBlogPosts = [...blogPosts].sort((a, b) => a.order - b.order);

  return (
    <>
      <HeroSection hero={content.hero} />
      <StatsBandSection stats={content.stats} />
      <AboutFoundingSection about={content.about} />
      <InsightsSection insights={content.insights} />
      <EcosystemSection ecosystem={content.ecosystem} />
      <ValuesSection values={content.values} />
      <IndustriesSection industries={content.industries} />

      {sortedBlogPosts.length > 0 && <FeaturedBlogSection posts={sortedBlogPosts} heading="Latest Blogs" />}

      <BlogFaqAccordion heading="Frequently Asked Questions" items={content.faqItems} showCta />

      <AboutCompanySection aboutCompany={content.aboutCompany} />
      <BlogBottomCta />
    </>
  );
}

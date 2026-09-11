import { ServiceDetailHero } from './detail/ServiceDetailHero';
import { TrustStrip } from '@/views/ui/detail/TrustStrip';
import { OverviewSection } from './detail/OverviewSection';
import { CapabilitiesSection } from './detail/CapabilitiesSection';
import { CredentialsSection } from './detail/CredentialsSection';
import { MethodologiesSection } from './detail/MethodologiesSection';
import { IndustriesServedSection } from './detail/IndustriesServedSection';
import { EnquiryForm } from '@/views/ui/detail/EnquiryForm';
import { AboutSection } from './detail/AboutSection';
import { resolveServiceDetail } from './detail/fallback';
import { FeaturedBlogSection } from '@/views/blog/FeaturedBlogSection';
import { BlogFaqAccordion } from '@/views/blog/BlogFaqAccordion';
import { BlogBottomCta } from '@/views/blog/BlogBottomCta';
import type { ServiceDetail } from '@/models/service';
import type { BlogSummary } from '@/models/blog';

/**
 * /services/[slug] detail page — Figma node 474:5731 ("Primary
 * Research"). Navbar/Footer are global (app/layout.tsx). Template +
 * graceful fallback, same architecture as /industries/[slug]:
 * `resolveServiceDetail()` (detail/fallback.ts) prefers each service's
 * own Strapi data and falls back to the node's own structure with
 * generic, `service.title`-interpolated copy wherever a field is empty
 * — so every one of the ~35 seeded services renders the full page, not
 * just "Primary Research" (the only one with authored content so far).
 * Latest Blogs and the bottom CTA are genuinely global site chrome
 * (confirmed byte-identical across /blogs, /blogs/[slug], /industries,
 * and this node), not per-service content, so they reuse the existing
 * shared components unconditionally.
 *
 * Renders ONLY node 474:5731's own sections, in its exact order —
 * Breadcrumb (in ServiceDetailHero) / Hero / Trust strip / Overview /
 * Capabilities / Credentials / Methodologies / Industries served /
 * Enquiry / Latest Blogs / FAQ / About / bottom CTA. The category
 * hierarchy's "What's included" sub-service list (`service.children`)
 * was previously rendered as an addendum here — deleted: that node has
 * no such section, and this page must not render anything outside it.
 * `service.children` itself stays on the model (real relational data,
 * used elsewhere — e.g. the services listing/tree) — only this page's
 * non-Figma rendering of it is gone.
 */
export function ServiceDetailView({ service, blogPosts }: { service: ServiceDetail; blogPosts: BlogSummary[] }) {
  const sortedBlogPosts = [...blogPosts].sort((a, b) => a.order - b.order);
  const content = resolveServiceDetail(service);

  return (
    <>
      <ServiceDetailHero hero={content.hero} title={content.title} parent={service.parent} />
      <TrustStrip heading={content.trust.heading} logos={content.trust.logos} />
      <OverviewSection overview={content.overview} />
      <CapabilitiesSection capabilities={content.capabilities} />
      <CredentialsSection credentials={content.credentials} />
      <MethodologiesSection methodologies={content.methodologies} />
      <IndustriesServedSection industries={content.industries} />
      <EnquiryForm eyebrow={content.enquiry.eyebrow} heading={content.enquiry.heading} body={content.enquiry.body} image={content.enquiry.image} />

      {sortedBlogPosts.length > 0 && <FeaturedBlogSection posts={sortedBlogPosts} heading="Latest Blogs" />}

      <BlogFaqAccordion heading="Frequently Asked Questions" items={content.faqItems} />

      <AboutSection about={content.about} />
      <BlogBottomCta />
    </>
  );
}

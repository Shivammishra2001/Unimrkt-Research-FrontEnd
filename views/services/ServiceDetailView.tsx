import { ServiceDetailHero } from './detail/ServiceDetailHero';
import { ServiceTrustSection } from './detail/ServiceTrustSection';
import { OverviewSection } from './detail/OverviewSection';
import { CapabilitiesSection } from './detail/CapabilitiesSection';
import { CredentialsSection } from './detail/CredentialsSection';
import { MethodologiesSection } from './detail/MethodologiesSection';
import { IndustriesServedSection } from './detail/IndustriesServedSection';
import { resolveServiceDetail } from './detail/fallback';
import { SubServiceView } from './subservice/SubServiceView';
import { EnquiryForm } from '@/views/ui/detail/EnquiryForm';
import { BlogTeaserView } from '@/views/sections/BlogTeaserView';
import { IndustryFaqSection } from '@/views/industries/listing/IndustryFaqSection';
import { AboutServicesCta } from '@/views/industries/listing/AboutServicesCta';
import type { ServiceDetail } from '@/models/service';
import type { BlogSummary } from '@/models/blog';

/**
 * /services/[slug] detail page — Figma node 474:5731 ("Primary Research", 1900x9705). Navbar/Footer are global
 * (app/layout.tsx; the header is transparent over the hero on this route). Top to bottom, exactly the node's
 * sections: hero + breadcrumb, Trusted by Global Businesses, About {Title}, Our {Title} Services (photo cards),
 * Why Unimrkt Research? (15 stats), Research Methodologies (slider), Industries We Support, Get a Free Quote form,
 * Latest Blogs, FAQ, About {Title} (2nd) and the closing CTA band.
 *
 * Template + graceful fallback, same architecture as /industries/[slug]: `resolveServiceDetail()` (detail/fallback.ts)
 * prefers each service's own Strapi fields and falls back to the node's copy (title-interpolated) wherever one is
 * empty, so every service renders the full page. The form, blog band, FAQ shell and about/CTA band are the site's
 * shared components, which Figma draws identically here.
 */
export function ServiceDetailView({ service, blogPosts }: { service: ServiceDetail; blogPosts: BlogSummary[] }) {
  // Level-3 (a sub-service such as Primary Research > Telephonic Surveys) has its own template — Figma 859:15301.
  if (service.parent) return <SubServiceView service={service} blogPosts={blogPosts} />;
  const sortedBlogPosts = [...blogPosts].sort((a, b) => a.order - b.order);
  const content = resolveServiceDetail(service);
  const aboutParagraphs = content.about.body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="overflow-x-clip">
      <ServiceDetailHero hero={content.hero} title={content.title} parent={service.parent} />
      <ServiceTrustSection heading={content.trust.heading} logos={content.trust.logos} />
      <OverviewSection overview={content.overview} />
      <CapabilitiesSection capabilities={content.capabilities} />
      <CredentialsSection credentials={content.credentials} />
      <MethodologiesSection methodologies={content.methodologies} />
      <IndustriesServedSection industries={content.industries} />
      <EnquiryForm eyebrow={content.enquiry.eyebrow} heading={content.enquiry.heading} body={content.enquiry.body} image={content.enquiry.image} />

      {sortedBlogPosts.length > 0 && (
        // The /blogs panel variant (13px eyebrow, description line, arrows at +336 — Figma 483:7139-7156); no CTA row, so the band ends at the cards (y6316-6946).
        <BlogTeaserView
          index={0}
          compact
          variant="blog"
          block={{
            kind: 'blogTeaser',
            id: `service-${service.slug}-latest-blogs`,
            theme: 'light',
            eyebrow: 'Latest Blogs',
            heading: 'Exploring Market Trends',
            description: 'Discover Emerging Market Trends That Shape Smarter Business Decisions.',
            actions: [],
            posts: sortedBlogPosts.slice(0, 6).map((post) => ({
              id: `post-${post.slug}`,
              title: post.title,
              excerpt: post.excerpt,
              image: post.coverImage,
              href: `/blogs/${post.slug}`,
            })),
          }}
        />
      )}

      {/* FAQ — Figma 474:5937-5950 (y6946-8110): Browse Blogs button 56px under the blogs band, title cap-top 194px
          under the button, seven rows from y7288, 92px above the About section. */}
      <div className="bg-white lg:pb-[25px] lg:pt-[13px]">
        <IndustryFaqSection
          titleClassName="mt-[43px] lg:mt-[121px]"
          content={{
            cta: { id: `service-${service.slug}-faq-cta`, label: 'Browse Blogs', href: '/blogs', isExternal: false, variant: 'primary' },
            heading: 'Frequently Asked Questions',
            items: content.faqItems,
          }}
        />
      </div>

      {/* About (2nd) + closing band — Figma 474:5739/6038-6040 + 474:5903 (y8110-9136): the shared /industries frame. */}
      <AboutServicesCta
        titleMaxWidth="720px"
        about={{ eyebrow: content.about.eyebrow, heading: content.about.heading, paragraphs: aboutParagraphs }}
        finalCta={{
          heading: 'Start Your Research Journey',
          body: 'Partner with Unimrkt Research to uncover actionable market intelligence, understand your industry, and make confident business decisions.',
          action: { id: `service-${service.slug}-final-cta`, label: 'Talk to Our Experts', href: '/contact', isExternal: false, variant: 'secondary' },
        }}
      />
    </div>
  );
}

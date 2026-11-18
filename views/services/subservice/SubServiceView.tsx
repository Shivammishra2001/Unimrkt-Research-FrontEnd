import { ServicesHero } from '@/views/services/listing/ServicesHero';
import { BlogTeaserView } from '@/views/sections/BlogTeaserView';
import { IndustryFaqSection } from '@/views/industries/listing/IndustryFaqSection';
import { AboutServicesCta } from '@/views/industries/listing/AboutServicesCta';
import { StatsSection, IntroSection, WhySection, MeasureSection, QualitySection, TechnologySection } from './SubServiceSections';
import { ProcessSection } from './ProcessSection';
import { resolveSubService } from './content';
import type { ServiceDetail } from '@/models/service';
import type { BlogSummary } from '@/models/blog';

/**
 * Level-3 sub-service page (a service with a parent: Services > Primary Research > Telephonic Surveys) — Figma node
 * 859:15301 (1900x9888). Top to bottom: hero + 4-level breadcrumb, stats, What are…?, Why…? (gradient cards), process
 * slider, What We Can Measure (photo cards), Quality First (glass cards), CATI technology (expanding panels), Latest
 * Blogs, FAQ, About and the closing CTA band. Level-2 services (no parent) keep ServiceDetailView's template.
 */
export function SubServiceView({ service, blogPosts }: { service: ServiceDetail; blogPosts: BlogSummary[] }) {
  const c = resolveSubService(service);
  const posts = [...blogPosts].sort((a, b) => a.order - b.order);

  return (
    <div className="overflow-x-clip">
      <ServicesHero
        content={c.hero}
        imageClassName="object-[50%_50%]"
        headingClassName="max-w-[700px] [text-wrap:balance]"
        subheadingClassName="max-w-[734px]"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          ...(service.parent ? [{ label: service.parent.title, href: `/services/${service.parent.slug}` }] : []),
          { label: service.title },
        ]}
      />
      <StatsSection stats={c.stats} />
      <IntroSection intro={c.intro} />
      <WhySection why={c.why} />
      <ProcessSection process={c.process} />
      <MeasureSection measure={c.measure} />
      <QualitySection quality={c.quality} />
      <TechnologySection technology={c.technology} />

      {posts.length > 0 && (
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
            posts: posts.slice(0, 6).map((post) => ({
              id: `post-${post.slug}`,
              title: post.title,
              excerpt: post.excerpt,
              image: post.coverImage,
              href: `/blogs/${post.slug}`,
            })),
          }}
        />
      )}

      <div className="bg-white lg:pb-[25px] lg:pt-[3px]">
        <IndustryFaqSection
          titleClassName="mt-[43px] lg:mt-[121px]"
          content={{
            cta: { id: `service-${service.slug}-faq-cta`, label: 'Browse Blogs', href: '/blogs', isExternal: false, variant: 'primary' },
            heading: c.faq.heading,
            items: c.faq.items,
          }}
        />
      </div>

      <AboutServicesCta
        titleMaxWidth="960px"
        about={{ eyebrow: c.about.eyebrow, heading: c.about.heading, paragraphs: c.about.paragraphs }}
        finalCta={{
          heading: 'Start Your Research Journey',
          body: 'Partner with Unimrkt Research to uncover actionable market intelligence, understand your industry, and make confident business decisions.',
          action: { id: `service-${service.slug}-final-cta`, label: 'Talk to Our Experts', href: '/contact', isExternal: false, variant: 'secondary' },
        }}
      />
    </div>
  );
}

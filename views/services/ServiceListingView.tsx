import { ServicesHero } from './listing/ServicesHero';
import { ServicesIntro } from './listing/ServicesIntro';
import { ServicesShowcase } from './listing/ServicesShowcase';
import { WhyChooseBand } from './listing/WhyChooseBand';
import { ServicesQuestionBand } from './listing/ServicesQuestionBand';
import { CoverageSection } from './listing/CoverageSection';
import { IndustriesSlider } from './listing/IndustriesSlider';
import { CaseStudiesBand } from './listing/CaseStudiesBand';
import type { ServicesListingContent } from './listing/content';
import { ResearchProcessSection } from '@/views/industries/listing/ResearchProcessSection';
import { ClientSuccessStories } from '@/views/industries/ClientSuccessStories';
import { IndustryFaqSection } from '@/views/industries/listing/IndustryFaqSection';
import { AboutServicesCta } from '@/views/industries/listing/AboutServicesCta';
import { BlogTeaserView } from '@/views/sections/BlogTeaserView';
import type { ServiceTreeItemModel } from '@/models/service';
import type { IndustrySummary } from '@/models/industry';
import type { BlogSummary } from '@/models/blog';
import type { IndustriesPageContent } from '@/models/industriesPage';
import type { ClosingBandsSettings } from '@/models/domain';
import { resolveClosingBands } from '@/views/sections/closingBands';

/** Items whose key contains one of `lead` (in that order) first, then the rest in their original order. */
function leadWith<T>(items: T[], key: (item: T) => string, lead: string[]): T[] {
  const rank = (item: T) => {
    const i = lead.findIndex((part) => key(item).includes(part));
    return i === -1 ? lead.length : i;
  };
  return items.map((item, i) => ({ item, i })).sort((a, b) => rank(a.item) - rank(b.item) || a.i - b.i).map(({ item }) => item);
}

/**
 * /services listing — Figma 1231:77069 ("Services", 1900x11803). Navbar/Footer are global (app/layout.tsx; the header is
 * transparent over the hero on this route). Top to bottom: hero + breadcrumb, about intro, the service-category panels,
 * Why Choose band, research process, question band, coverage, industries slider, case-study band, client success
 * stories, latest blogs, FAQ, about + closing CTA. Sections the node shares with /industries (process, testimonials,
 * blogs, FAQ, about/CTA) reuse those components — Figma draws them identically on both pages.
 *
 * Live Strapi data: service categories (`service` hierarchy), industries, blog posts and the client testimonials
 * (Pages > Industries). The page's own copy is Pages > Services (controllers/servicesListingPage.ts), with the Figma
 * copy in listing/content.ts filling every empty field.
 */
export function ServiceListingView({
  categories,
  content,
  industries,
  blogPosts,
  testimonials,
  globalBands,
}: {
  categories: ServiceTreeItemModel[];
  content: ServicesListingContent;
  industries: IndustrySummary[];
  blogPosts: BlogSummary[];
  testimonials: IndustriesPageContent['testimonials']['items'];
  /** Global Header, Footer & SEO closing bands — only the Latest Blogs band applies here (FAQ / CTA come from Pages → Services). */
  globalBands?: ClosingBandsSettings;
}) {
  const bands = resolveClosingBands(globalBands);
  const sortedBlogPosts = [...blogPosts].sort((a, b) => a.order - b.order);
  // Lead with the entries Figma draws, in its order; everything else follows in CMS order.
  const panelCategories = leadWith(categories, (c) => c.slug, ['primary-research', 'qualitative-research', 'quantitative-research', 'business-research', 'research-support-functions']);
  const sliderIndustries = leadWith(industries, (i) => i.slug, ['banking', 'healthcare', 'retail']);

  return (
    <div className="overflow-x-clip">
      <ServicesHero content={content.hero} />
      <ServicesIntro content={content.intro} />
      <ServicesShowcase content={content.showcase} categories={panelCategories} />
      <WhyChooseBand content={content.why} />
      <ResearchProcessSection content={content.process} texture={false} listClassName="mt-[15.5px] lg:mt-[25.5px]" />
      <ServicesQuestionBand content={content.band} />
      <CoverageSection content={content.coverage} />
      <IndustriesSlider content={content.industries} industries={sliderIndustries} />
      <CaseStudiesBand content={content.caseBand} />
      {testimonials.length > 0 && (
        // The shared band is 821px (/industries); Figma 1231:77069 gives it 816 here (y7569-8385).
        <div className="lg:-mb-[5px]">
          <ClientSuccessStories content={{ ...content.testimonials, items: testimonials }} />
        </div>
      )}
      {sortedBlogPosts.length > 0 && (
        // The Home page's "Latest Blogs" band (red panel, arrow circles, post-card scroller), fed from the same blog posts.
        <BlogTeaserView
          index={0}
          compact
          block={{
            kind: 'blogTeaser',
            id: 'services-latest-blogs',
            theme: 'light',
            eyebrow: bands.blog.eyebrow,
            heading: bands.blog.heading,
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
      <IndustryFaqSection content={content.faq} titleClassName="mt-[43px] lg:mt-[86px]" />
      <AboutServicesCta about={content.about} finalCta={content.finalCta} />
    </div>
  );
}

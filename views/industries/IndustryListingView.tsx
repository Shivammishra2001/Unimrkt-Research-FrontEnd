import { Container } from '@/views/ui/Container';
import { Prose } from '@/views/ui/Prose';
import { IndustryHero } from './IndustryHero';
import { IndustryGridSection } from './IndustryGridSection';
import { ClientSuccessStories } from './ClientSuccessStories';
import { FeaturedBlogSection } from '@/views/blog/FeaturedBlogSection';
import { BlogFaqAccordion } from '@/views/blog/BlogFaqAccordion';
import { BlogBottomCta } from '@/views/blog/BlogBottomCta';
import type { IndustrySummary } from '@/models/industry';
import type { BlogSummary } from '@/models/blog';
import type { FaqItemModel } from '@/models/domain';

// Figma node 384:5940-5944 — the FAQ accordion is collapsed by default on
// the canvas, so only the question text is ever visible to extract; the
// first question is copied verbatim (384:5940), the remaining 4 are
// authored in the same voice, matching the convention already used for
// /blogs' and the homepage's FAQ sections.
const INDUSTRY_FAQ_ITEMS: FaqItemModel[] = [
  {
    id: 'which-industries',
    question: 'Which industries does Unimrkt Research serve?',
    answer:
      'We work across Automotive, Healthcare, FMCG, BFSI, Technology, Retail, Manufacturing, Telecom, Consumer Goods, and many other sectors — see the industries above.',
  },
  {
    id: 'methodology',
    question: 'What research methodologies do you use for industry-specific studies?',
    answer:
      'We combine qualitative and quantitative methodologies — in-depth interviews, focus groups, CATI surveys, and online panels — tailored to each industry’s unique data needs.',
  },
  {
    id: 'customization',
    question: 'Is your research approach customized for each industry?',
    answer:
      'Yes — every engagement is designed around the specific regulatory, competitive, and consumer dynamics of that industry rather than a one-size-fits-all template.',
  },
  {
    id: 'engagement-process',
    question: 'How does an industry research engagement typically start?',
    answer:
      'It starts with a scoping conversation to understand your objectives, followed by a tailored methodology proposal — reach out via Talk to Our Experts to begin.',
  },
  {
    id: 'data-quality',
    question: 'How do you ensure data quality across different industries?',
    answer:
      'Every engagement runs through robust quality control processes, trained interviewers, and industry-experienced analysts to keep findings accurate and reliable.',
  },
];

/** /industries listing — Figma node 384:5771. Navbar/Footer are global
 * (app/layout.tsx). Only the industry cards and "Latest Blogs" posts are
 * CMS-dynamic; hero copy, stats, testimonials, FAQ, and the About-copy
 * section are static text matching the node verbatim — same convention
 * already used for /blogs' equivalent sections (no `industries-page`
 * singleType exists, and none was asked for). */
export function IndustryListingView({ industries, blogPosts }: { industries: IndustrySummary[]; blogPosts: BlogSummary[] }) {
  const sortedBlogPosts = [...blogPosts].sort((a, b) => a.order - b.order);

  return (
    <>
      <IndustryHero />

      <IndustryGridSection industries={industries} />

      {sortedBlogPosts.length > 0 && <FeaturedBlogSection posts={sortedBlogPosts} heading="Latest Blogs" />}

      <ClientSuccessStories />

      <BlogFaqAccordion heading="Frequently Asked Questions" items={INDUSTRY_FAQ_ITEMS} />

      {/* About Our Industry Expertise — Figma node 384:5952-5954, same
          eyebrow/heading/Prose pattern as /blogs' "About Our Blog". */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-[850px] text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">About Our Industry Expertise</p>
            <h2 className="mt-3 capitalize text-[28px] font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
              Driving Industry Growth Through Actionable Research
            </h2>
            <Prose className="mx-auto mt-6 max-w-4xl">
              Unimrkt Research delivers industry-specific market research solutions that empower businesses to make
              confident, data-driven decisions. From Automotive, Healthcare, FMCG, BFSI, Technology, Retail,
              Manufacturing, Telecom, and Consumer Goods to many other sectors, we provide reliable insights tailored
              to each industry&apos;s unique challenges and opportunities.
            </Prose>
            <Prose className="mx-auto mt-4 max-w-4xl">
              Using advanced qualitative and quantitative research methodologies, our experienced team helps
              organizations understand customer behavior, evaluate market trends, monitor competitors, validate new
              ideas, and identify growth opportunities. With accurate data and strategic insights, Unimrkt Research
              enables businesses to innovate, reduce risks, and achieve sustainable success across diverse
              industries.
            </Prose>
          </div>
        </Container>
      </section>

      <BlogBottomCta />
    </>
  );
}

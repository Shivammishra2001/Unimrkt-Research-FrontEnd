import { IndustryHero } from './IndustryHero';
import { IndustryGridSection } from './IndustryGridSection';
import { ClientSuccessStories } from './ClientSuccessStories';
import { IntroSection } from './listing/IntroSection';
import { BeyondIndustriesSection, QuestionBand } from './listing/BeyondIndustriesSection';
import { QuestionsInsightsSection } from './listing/QuestionsInsightsSection';
import { CaseStudiesSection } from './listing/CaseStudiesSection';
import { GlobalReachSection } from './listing/GlobalReachSection';
import { ResearchProcessSection } from './listing/ResearchProcessSection';
import { LatestBlogsSection } from './listing/LatestBlogsSection';
import { IndustryFaqSection } from './listing/IndustryFaqSection';
import { AboutServicesCta } from './listing/AboutServicesCta';
import type { IndustrySummary } from '@/models/industry';
import type { BlogSummary } from '@/models/blog';
import type { FaqItemModel } from '@/models/domain';

// Figma node 1384:27170: the first question is verbatim; rows 2-6 on the
// node repeat one placeholder question, so the other questions keep the
// copy authored earlier (same convention as /blogs' and the homepage FAQ).
const INDUSTRY_FAQ_ITEMS: FaqItemModel[] = [
  {
    id: 'which-industries',
    question: 'What industries does Unimrkt Research serve?',
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

/** /industries listing — Figma node 1384:26772 (1900px frame, y0-12700).
 * Navbar/Footer are global (app/layout.tsx; the navbar is transparent
 * over the hero on this route). Only the industry cards and the "Latest
 * Blogs" posts are CMS-dynamic; every other section is static copy taken
 * verbatim from the node (no `industries-page` singleType exists). Order:
 * hero, intro, industries grid, beyond-industries cards + question band,
 * questions-to-insights, case studies, global reach, research process,
 * client success stories, latest blogs, FAQ, about services + CTA. */
export function IndustryListingView({ industries, blogPosts }: { industries: IndustrySummary[]; blogPosts: BlogSummary[] }) {
  const sortedBlogPosts = [...blogPosts].sort((a, b) => a.order - b.order);

  return (
    <>
      <IndustryHero />
      <IntroSection />
      <IndustryGridSection industries={industries} />
      <BeyondIndustriesSection />
      <QuestionBand />
      <QuestionsInsightsSection />
      <CaseStudiesSection />
      <GlobalReachSection />
      <ResearchProcessSection />
      <ClientSuccessStories />
      <LatestBlogsSection posts={sortedBlogPosts} />
      <IndustryFaqSection items={INDUSTRY_FAQ_ITEMS} />
      <AboutServicesCta />
    </>
  );
}

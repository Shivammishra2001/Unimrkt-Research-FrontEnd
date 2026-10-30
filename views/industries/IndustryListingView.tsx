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
import type { IndustriesPageContent } from '@/models/industriesPage';

/** /industries listing — Figma node 1384:26772 (1900px frame, y0-12700).
 * Navbar/Footer are global (app/layout.tsx; the navbar is transparent
 * over the hero on this route). Only the industry cards and the "Latest
 * Blogs" posts are CMS-dynamic; every other section is static copy taken
 * verbatim from the node (no `industries-page` singleType exists). Order:
 * hero, intro, industries grid, beyond-industries cards + question band,
 * questions-to-insights, case studies, global reach, research process,
 * client success stories, latest blogs, FAQ, about services + CTA. */
export function IndustryListingView({
  industries,
  blogPosts,
  content,
}: {
  industries: IndustrySummary[];
  blogPosts: BlogSummary[];
  content: IndustriesPageContent;
}) {
  const sortedBlogPosts = [...blogPosts].sort((a, b) => a.order - b.order);

  return (
    <>
      <IndustryHero content={content.hero} />
      <IntroSection content={content.intro} />
      <IndustryGridSection industries={industries} content={content.grid} />
      <BeyondIndustriesSection content={content.beyond} />
      <QuestionBand content={content.band} />
      <QuestionsInsightsSection content={content.insights} />
      <CaseStudiesSection content={content.cases} />
      <GlobalReachSection content={content.reach} />
      <ResearchProcessSection content={content.process} />
      <ClientSuccessStories content={content.testimonials} />
      <LatestBlogsSection posts={sortedBlogPosts} />
      <IndustryFaqSection content={content.faq} />
      <AboutServicesCta about={content.about} finalCta={content.finalCta} />
    </>
  );
}

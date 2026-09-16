import { HeroSection } from './HeroSection';
import { ExplorerSection } from './ExplorerSection';
import { ApproachSection } from './ApproachSection';
import { TestimonialsSection } from './TestimonialsSection';
import { AboutCaseStudySection } from './AboutCaseStudySection';
import { resolveCaseStudy } from './fallback';
import { BlogFaqAccordion } from '@/views/blog/BlogFaqAccordion';
import { BlogBottomCta } from '@/views/blog/BlogBottomCta';
import type { CaseStudySummary } from '@/models/caseStudy';

/**
 * /case-study — Figma node 1023:45614 ("Case Study", file
 * foaJFuv0vRX8nD43o0ylgB). Navbar/Footer are global (app/layout.tsx).
 * `resolveCaseStudy()` (./fallback.ts) prefers the CMS's own
 * `case-study` collection for the Explorer grid and falls back to the
 * node's own verbatim copy when it's empty; every other section has no
 * CMS backing at all (see that file's header comment for why) and
 * always renders this node's own copy.
 *
 * Renders every one of the node's own sections, top to bottom, and
 * nothing else: Hero (+breadcrumb) / Case Study Explorer (filters +
 * grid + pagination) / Every Case Study Starts With the Right Question
 * (our approach) / Trusted by Teams That Value Better Insights
 * (testimonials) / Frequently Asked Questions / Research That Creates
 * Real Impact (about) / bottom CTA. The bottom CTA reuses the exact
 * same "Start Your Research Journey" component every other page
 * reuses (byte-identical copy, confirmed again on this node).
 */
export function CaseStudyView({ caseStudies }: { caseStudies: CaseStudySummary[] }) {
  const content = resolveCaseStudy(caseStudies);

  return (
    <>
      <HeroSection hero={content.hero} />
      <ExplorerSection explorer={content.explorer} />
      <ApproachSection approach={content.approach} />
      <TestimonialsSection testimonials={content.testimonials} />
      <BlogFaqAccordion heading="Frequently Asked Questions" items={content.faqItems} />
      <AboutCaseStudySection about={content.about} />
      <BlogBottomCta />
    </>
  );
}

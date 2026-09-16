import { HeroSection } from './HeroSection';
import { ExplorerSection } from './ExplorerSection';
import { ApproachSection } from './ApproachSection';
import { TestimonialsSection } from './TestimonialsSection';
import { AboutCaseStudySection } from './AboutCaseStudySection';
import { resolveCaseStudy } from './fallback';
import { BlogFaqAccordion } from '@/views/blog/BlogFaqAccordion';
import { BlogBottomCta } from '@/views/blog/BlogBottomCta';
import type { CaseStudySummary } from '@/models/caseStudy';
import type { CaseStudyPageSettings } from '@/models/caseStudyPage';

/**
 * /case-study — Figma node 1023:45614 ("Case Study", file
 * foaJFuv0vRX8nD43o0ylgB). Navbar/Footer are global (app/layout.tsx).
 * `resolveCaseStudy()` (./fallback.ts) prefers the CMS's own
 * `case-study` collection for the Explorer grid's items, and every
 * other section's copy CMS-first from the `case-study-page` settings
 * singleType, falling back to this node's own verbatim copy per field
 * wherever a value is empty (see that file's header comment).
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
export function CaseStudyView({ caseStudies, settings }: { caseStudies: CaseStudySummary[]; settings: CaseStudyPageSettings }) {
  const content = resolveCaseStudy(caseStudies, settings);

  return (
    <>
      <HeroSection hero={content.hero} />
      <ExplorerSection explorer={content.explorer} />
      <ApproachSection approach={content.approach} />
      <TestimonialsSection testimonials={content.testimonials} />
      <BlogFaqAccordion heading={content.faqHeading} items={content.faqItems} />
      <AboutCaseStudySection about={content.about} />
      <BlogBottomCta />
    </>
  );
}

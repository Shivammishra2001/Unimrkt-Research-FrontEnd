import { HeroSection } from './HeroSection';
import { ChallengeSection } from './ChallengeSection';
import { ResearchQuestionSection } from './ResearchQuestionSection';
import { ApproachSection } from './ApproachSection';
import { UncoveredSection } from './UncoveredSection';
import { ImpactSection } from './ImpactSection';
import { RelatedCaseStudySection } from './RelatedCaseStudySection';
import { BottomCtaSection } from './BottomCtaSection';
import { resolveCaseStudyDetail } from './fallback';
import { TrustStrip } from '@/views/ui/detail/TrustStrip';
import { BlogFaqAccordion } from '@/views/blog/BlogFaqAccordion';
import type { CaseStudyDetail, CaseStudySummary } from '@/models/caseStudy';
import type { CaseStudyPageSettings } from '@/models/caseStudyPage';

/**
 * /case-study/[slug] — Figma node 1107:49842 ("Case Study Details
 * Page", file foaJFuv0vRX8nD43o0ylgB). Navbar/Footer are global
 * (app/layout.tsx). `resolveCaseStudyDetail()` (./fallback.ts) prefers
 * this case study's own detail fields, then the `case-study-page`
 * settings singleType's shared chrome, and falls back to the node's
 * own verbatim copy per-field wherever both are empty.
 *
 * Renders every one of the node's own sections, top to bottom, and
 * nothing else: Hero (+breadcrumb) / Trusted by Global Businesses /
 * The Challenge / The Research Question / Our Approach / What We
 * Uncovered / The Impact / Related Case Study / Frequently Asked
 * Questions / bottom CTA. No "About" section here — that belongs to
 * the listing page (node 1023:45614), not this one.
 */
export function CaseStudyDetailView({
  caseStudy,
  relatedCaseStudies,
  settings,
}: {
  caseStudy: CaseStudyDetail;
  relatedCaseStudies: CaseStudySummary[];
  settings: CaseStudyPageSettings;
}) {
  const content = resolveCaseStudyDetail(caseStudy, settings);

  return (
    <>
      <HeroSection detail={content} />
      <TrustStrip heading={content.trust.heading} logos={content.trust.logos} />
      <ChallengeSection challenge={content.challenge} photoAlt={content.title} />
      <ResearchQuestionSection researchQuestion={content.researchQuestion} />
      <ApproachSection approach={content.approach} />
      <UncoveredSection uncovered={content.uncovered} />
      <ImpactSection impact={content.impact} />
      <RelatedCaseStudySection
        eyebrow={content.related.eyebrow}
        heading={content.related.heading}
        body={content.related.body}
        items={relatedCaseStudies}
      />
      <BlogFaqAccordion heading={content.faqHeading} items={content.faqItems} />
      <BottomCtaSection heading={content.bottomCta.heading} body={content.bottomCta.body} action={content.bottomCta.action} />
    </>
  );
}

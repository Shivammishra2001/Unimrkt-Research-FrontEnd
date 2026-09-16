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

/**
 * /case-study/[slug] — Figma node 1107:49842 ("Case Study Details
 * Page", file foaJFuv0vRX8nD43o0ylgB). Navbar/Footer are global
 * (app/layout.tsx). `resolveCaseStudyDetail()` (./fallback.ts) prefers
 * this case study's own detail fields and falls back to the node's
 * own verbatim copy per-field wherever one is empty.
 *
 * Renders every one of the node's own sections, top to bottom, and
 * nothing else: Hero (+breadcrumb) / Trusted by Global Businesses /
 * The Challenge / The Research Question / Our Approach / What We
 * Uncovered / The Impact / Related Case Study / Frequently Asked
 * Questions / bottom CTA. No "About" section here — that belongs to
 * the listing page (node 1023:45614), not this one.
 */
export function CaseStudyDetailView({ caseStudy, relatedCaseStudies }: { caseStudy: CaseStudyDetail; relatedCaseStudies: CaseStudySummary[] }) {
  const content = resolveCaseStudyDetail(caseStudy);

  return (
    <>
      <HeroSection detail={content} />
      <TrustStrip heading={content.trust.heading} logos={content.trust.logos} />
      <ChallengeSection challenge={content.challenge} photoAlt={content.title} />
      <ResearchQuestionSection researchQuestion={content.researchQuestion} />
      <ApproachSection approach={content.approach} />
      <UncoveredSection uncovered={content.uncovered} />
      <ImpactSection impact={content.impact} />
      <RelatedCaseStudySection items={relatedCaseStudies} />
      <BlogFaqAccordion heading="Frequently Asked Questions" items={content.faqItems} />
      <BottomCtaSection />
    </>
  );
}

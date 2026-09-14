import { HeroSection } from './HeroSection';
import { ValuesSection } from './ValuesSection';
import { BenefitsSection } from './BenefitsSection';
import { JobsSection } from './JobsSection';
import { JourneySection } from './JourneySection';
import { JoinUsSection } from './JoinUsSection';
import { AboutCareersSection } from './AboutCareersSection';
import { resolveWorkWithUs } from './fallback';
import { BlogFaqAccordion } from '@/views/blog/BlogFaqAccordion';
import { BlogBottomCta } from '@/views/blog/BlogBottomCta';
import type { WorkWithUsSettings } from '@/models/workWithUsPage';

/**
 * /work-with-us — Figma node 924:23216 ("Work With Us", file
 * foaJFuv0vRX8nD43o0ylgB). Navbar/Footer are global (app/layout.tsx).
 * Template + graceful fallback: `resolveWorkWithUs()` (./fallback.ts)
 * prefers the CMS's `work-with-us-page` singleType and falls back to
 * the node's own verbatim copy wherever a field is empty.
 *
 * Renders every one of the node's own sections, top to bottom, and
 * nothing else: Hero (+breadcrumb) / What Drives Us (values) / More
 * Than Just a Job (benefits) / Find Your Next Opportunity (job
 * listings) / Grow With Purpose (career journey) / Join Us + Disclaimer
 * / Frequently Asked Questions / Build Your Career (about careers) /
 * bottom CTA. The bottom CTA reuses the exact same "Start Your Research
 * Journey" component every other page reuses (byte-identical copy,
 * confirmed again on this node).
 */
export function WorkWithUsView({ settings }: { settings: WorkWithUsSettings }) {
  const content = resolveWorkWithUs(settings);

  return (
    <>
      <HeroSection hero={content.hero} />
      <ValuesSection values={content.values} />
      <BenefitsSection benefits={content.benefits} />
      <JobsSection jobs={content.jobs} />
      <JourneySection journey={content.journey} />
      <JoinUsSection joinUs={content.joinUs} disclaimer={content.disclaimer} />
      <BlogFaqAccordion heading="Frequently Asked Questions" items={content.faqItems} />
      <AboutCareersSection aboutCareers={content.aboutCareers} />
      <BlogBottomCta />
    </>
  );
}

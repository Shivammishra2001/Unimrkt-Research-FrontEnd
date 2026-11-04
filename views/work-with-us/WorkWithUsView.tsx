import { HeroSection } from './HeroSection';
import { WwuValues } from './WwuValues';
import { WwuBenefits } from './WwuBenefits';
import { JobsSection } from './JobsSection';
import { WwuJourney } from './WwuJourney';
import { WwuJoinUs } from './WwuJoinUs';
import { resolveWorkWithUs } from './fallback';
import { FaqView } from '@/views/sections/FaqView';
import { AboutServicesCta } from '@/views/industries/listing/AboutServicesCta';
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
      <WwuValues values={content.values} />
      <WwuBenefits benefits={content.benefits} />
      <JobsSection jobs={content.jobs} />
      <WwuJourney journey={content.journey} />
      <WwuJoinUs joinUs={content.joinUs} disclaimer={content.disclaimer} />
      <FaqView
        index={0}
        variant="careers"
        block={{
          kind: 'faq',
          id: 'wwu-faq',
          theme: 'light',
          heading: 'Frequently Asked Questions',
          background: { src: '/figma-home/faq-worldmap.png', alt: '', width: 1377, height: 787 },
          items: content.faqItems,
        }}
      />
      <AboutServicesCta
        detail
        careers
        about={{
          eyebrow: content.aboutCareers.eyebrow,
          heading: content.aboutCareers.heading,
          paragraphs: content.aboutCareers.body.split('\n\n').map((p) => p.trim()).filter(Boolean),
        }}
        finalCta={{
          heading: 'Start Your Research Journey',
          body: 'Partner with Unimrkt Research to uncover actionable market intelligence, understand your industry, and make confident business decisions.',
          action: { id: 'wwu-final-cta', label: 'Talk to Our Experts', href: '/contact', isExternal: false, variant: 'secondary' },
        }}
      />
    </>
  );
}

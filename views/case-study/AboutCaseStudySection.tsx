import { Container } from '@/views/ui/Container';
import type { ResolvedCaseStudy } from './fallback';

/** "Research That Creates Real Impact" — Figma node 1023:45614
 * (y4796-5269). Centered eyebrow/heading/paragraph band, same shell as
 * views/work-with-us/AboutCareersSection.tsx / views/our-company/
 * AboutCompanySection.tsx. No CMS backing (see fallback.ts's header
 * comment) — always renders this node's own verbatim copy. */
export function AboutCaseStudySection({ about }: { about: ResolvedCaseStudy['about'] }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-[850px] text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{about.eyebrow}</p>
          <h2 className="mt-3 capitalize text-[28px] font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-2px]">
            {about.heading}
          </h2>
          <p className="mx-auto mt-6 max-w-4xl text-base leading-[1.9] text-heading/80">{about.body}</p>
        </div>
      </Container>
    </section>
  );
}

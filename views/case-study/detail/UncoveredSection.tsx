import { Container } from '@/views/ui/Container';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { ResolvedCaseStudyDetail } from './fallback';

/** "What We Uncovered" — Figma node 1107:49842 (y3967-5121, "Component
 * 1070"). Eyebrow/heading/body + a row of 5 photo panels, each with a
 * bottom-to-top dark gradient and a vertical (rotated) white text
 * label. The node's own panels use per-panel skewed clip-path masks;
 * simplified here to plain rounded-corner panels per the standard
 * adaptation this project makes when a raw Figma mask isn't a common
 * web pattern (see BenefitsSection.tsx-style precedent elsewhere this
 * session) — same 5 photos, same 5 labels, same left-to-right order.
 * CMS-first, template-fallback — always renders. */
export function UncoveredSection({ uncovered }: { uncovered: ResolvedCaseStudyDetail['uncovered'] }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{uncovered.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[38px] lg:tracking-[-1px]">{uncovered.heading}</h2>
          <p className="mt-4 text-base leading-[1.9] text-heading/80">{uncovered.body}</p>
        </div>

        <div className="mt-12 flex flex-col gap-3 overflow-hidden rounded-[24px] sm:flex-row sm:gap-0">
          {uncovered.panels.map((panel) => (
            <div key={panel.id} className="relative h-[360px] flex-1 overflow-hidden bg-slate-900 sm:h-[420px]">
              {panel.image && <StrapiImage image={panel.image} sizes="(min-width: 640px) 20vw, 100vw" fill className="object-cover" />}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 to-transparent" aria-hidden="true" />
              <p className="absolute bottom-6 left-1/2 w-[calc(100%-24px)] -translate-x-1/2 text-center font-sans text-base font-semibold leading-tight text-white sm:bottom-8 sm:left-6 sm:w-auto sm:origin-bottom-left sm:-rotate-90 sm:translate-x-0 sm:whitespace-nowrap sm:text-left">
                {panel.title}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

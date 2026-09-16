import { Container } from '@/views/ui/Container';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { ResolvedCaseStudyDetail } from './fallback';

/** "The Research Question" — Figma node 1107:49842 (y2056-2880). Light
 * `#f9f9f7` card, eyebrow/heading/body, then 5 overlapping gradient
 * circles (each its own maroon-to-red diagonal, matching this site's
 * gradient-from/gradient-to token) connected by a short dotted line to
 * a numbered title + one-line description below. CMS-first,
 * template-fallback — always renders. */
export function ResearchQuestionSection({ researchQuestion }: { researchQuestion: ResolvedCaseStudyDetail['researchQuestion'] }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="rounded-[24px] bg-[#f9f9f7] px-6 py-16 sm:px-12 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{researchQuestion.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
              {researchQuestion.heading}
            </h2>
            <p className="mt-4 text-base leading-[1.9] text-heading/80">{researchQuestion.body}</p>
          </div>

          <div className="mt-14 flex flex-wrap justify-center">
            {researchQuestion.items.map((item, i) => (
              <div key={item.id} className={`flex w-[220px] flex-col items-center text-center ${i > 0 ? '-ml-6' : ''}`}>
                <div className="flex size-[220px] items-center justify-center rounded-full bg-gradient-to-br from-gradient-from to-gradient-to">
                  {item.icon && <StrapiImage image={item.icon} sizes="70px" className="size-[70px]" />}
                </div>
                <span className="mt-1 h-6 w-px border-l border-dotted border-[#a3282a]" aria-hidden="true" />
                <p className="mt-2 font-sans text-base font-semibold text-ink2">
                  {i + 1}. {item.title}
                </p>
                {item.description && <p className="mt-2 px-2 text-sm leading-[1.6] text-heading/70">{item.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

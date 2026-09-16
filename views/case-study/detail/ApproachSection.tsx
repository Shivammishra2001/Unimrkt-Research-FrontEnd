import { Container } from '@/views/ui/Container';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { ResolvedCaseStudyDetail } from './fallback';

/** "Our Approach" — Figma node 1107:49842 (y2940-3967). Dark maroon/red
 * gradient band (same shell as /work-with-us's JourneySection.tsx and
 * /case-study's ApproachSection.tsx), eyebrow/heading/body + 6 white
 * cards (icon + numbered title + description). CMS-first,
 * template-fallback — always renders. */
export function ApproachSection({ approach }: { approach: ResolvedCaseStudyDetail['approach'] }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-gradient-from to-gradient-to py-16 text-white sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-white">{approach.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-white sm:text-4xl lg:text-[38px] lg:tracking-[-1px]">{approach.heading}</h2>
          <p className="mt-4 text-base leading-[1.9] text-white/80">{approach.body}</p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {approach.steps.map((step, i) => (
            <li key={step.id} className="flex h-full flex-col items-center gap-4 rounded-[24px] border border-[#e0e0df] bg-white p-8 text-center shadow-blog">
              {step.icon && <StrapiImage image={step.icon} sizes="70px" className="size-[70px]" />}
              <h3 className="text-xl font-semibold text-ink2">
                {i + 1}. {step.title}
              </h3>
              {step.description && <p className="text-sm leading-[1.87] text-black/70">{step.description}</p>}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

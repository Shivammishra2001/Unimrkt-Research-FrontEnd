import Image from 'next/image';
import { Container } from '@/views/ui/Container';
import type { ResolvedCaseStudy } from './fallback';

/** "Every Case Study Starts With the Right Question" — Figma node
 * 1023:45614 (y2427-3080). Dark maroon/red gradient band, 4 white
 * cards — same shell as /work-with-us's JourneySection.tsx
 * ("Grow With Purpose"): identical background group name
 * ("Group 1597880784" + "0_Gradient_Wallpaper_1280x720"), identical
 * card shell (rounded-[24px] border-[#e0e0df] bg-white shadow-blog),
 * confirmed via get_design_context (white text, dark band). Icons are
 * this node's own bespoke illustrations (connection/analysis/dashboard/
 * growth), downloaded verbatim rather than substituted with a lucide
 * equivalent, per this task's explicit "download the exact SVG
 * icons... images" directive. CMS-first, template-fallback — always
 * renders (this section has no CMS backing at all — see fallback.ts's
 * header comment — so it always renders the node's own copy). */
export function ApproachSection({ approach }: { approach: ResolvedCaseStudy['approach'] }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-gradient-from to-gradient-to py-16 text-white sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-white">{approach.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-white sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">{approach.heading}</h2>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {approach.steps.map((step) => (
            <li key={step.id} className="flex h-full flex-col items-center gap-4 rounded-[24px] border border-[#e0e0df] bg-white p-8 text-center shadow-blog">
              <Image src={`/images/case-study/${step.icon}`} alt="" width={70} height={70} className="size-[70px]" />
              <h3 className="text-lg font-semibold text-ink2">
                {step.number}. {step.title}
              </h3>
              <p className="text-sm leading-[1.87] opacity-70">{step.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

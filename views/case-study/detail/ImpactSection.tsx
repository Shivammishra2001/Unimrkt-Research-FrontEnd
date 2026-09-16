import { Container } from '@/views/ui/Container';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { ResolvedCaseStudyDetail } from './fallback';

/** "The Impact" — Figma node 1107:49842 (y4994-5757). Dark photo
 * background, white eyebrow/heading/body, 5 glassmorphic cards (same
 * shell as views/industries/detail/ChallengesSection.tsx:
 * `backdrop-blur-[21px] bg-white/[0.08] border-white/10 rounded-[20px]`)
 * — icon + 2-line title, no description. CMS-first, template-fallback
 * — always renders. */
export function ImpactSection({ impact }: { impact: ResolvedCaseStudyDetail['impact'] }) {
  return (
    <section className="relative overflow-hidden rounded-[40px] py-16 text-white sm:py-20 lg:py-24">
      {impact.image && <StrapiImage image={impact.image} sizes="100vw" fill className="object-cover" />}
      <div className="absolute inset-0 bg-[#070d16]/70" aria-hidden="true" />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{impact.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-white sm:text-4xl lg:text-[38px] lg:tracking-[-1px]">{impact.heading}</h2>
          <p className="mt-4 text-base leading-[1.9] text-white/80">{impact.body}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {impact.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center gap-4 rounded-[20px] border border-white/10 bg-white/[0.08] p-6 text-center backdrop-blur-[21px]"
            >
              <span className="flex size-[70px] shrink-0 items-center justify-center rounded-full bg-white">
                {item.icon && <StrapiImage image={item.icon} sizes="34px" className="size-[34px]" />}
              </span>
              <p className="font-sans text-base font-semibold leading-[1.34] text-white">{item.title}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

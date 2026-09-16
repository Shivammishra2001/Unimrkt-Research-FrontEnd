import Image from 'next/image';
import { Container } from '@/views/ui/Container';
import type { ResolvedCaseStudy } from './fallback';

/** "Trusted by Teams That Value Better Insights" — Figma node 1023:45614
 * (y3080-3786). Eyebrow + heading + 3 white testimonial cards
 * (Component 1065-1067) + a 3-dot carousel indicator (Frame 33861).
 * Distinct card shape from every other testimonial pattern on the
 * site: a quote-mark glyph, a short headline, the quote itself, then a
 * role + organization-type line (never a name) — see fallback.ts's
 * header comment for why this doesn't reuse api::testimonial. The 3
 * dots are rendered exactly as drawn but purely decorative: all 3
 * cards already render at once on desktop (no more content sits behind
 * them to page through), so wiring real carousel state here would have
 * nothing to navigate to. CMS-first, template-fallback: items come from
 * the case-study-page singleType's own `testimonials` field whenever
 * it's populated, falling back to this node's own verbatim 3 cards
 * otherwise — see fallback.ts's header comment. */
export function TestimonialsSection({ testimonials }: { testimonials: ResolvedCaseStudy['testimonials'] }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{testimonials.eyebrow}</p>
          <h2 className="mt-3 capitalize text-3xl font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-2px]">
            {testimonials.heading}
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.items.map((t) => (
            <div key={t.id} className="flex flex-col gap-5 rounded-blog border border-card-border bg-white p-8 shadow-blog">
              <Image src="/images/case-study/cs-quote-mark.svg" alt="" width={40} height={28} aria-hidden="true" />
              <h3 className="font-sans text-xl font-semibold leading-[1.34] text-ink2">{t.heading}</h3>
              <p className="flex-1 font-sans text-sm leading-[1.87] text-black/70">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="font-sans text-base font-semibold leading-[1.34] text-ink2">{t.roleLine}</p>
                <p className="font-sans text-sm leading-[1.87] text-black/70">{t.orgLine}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2" aria-hidden="true">
          <span className="h-[15px] w-8 rounded-full bg-[#b63a40]" />
          <span className="size-[15px] rounded-full bg-[#e2e2e2]" />
          <span className="size-[15px] rounded-full bg-[#e2e2e2]" />
        </div>
      </Container>
    </section>
  );
}

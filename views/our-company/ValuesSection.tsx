import { Container } from '@/views/ui/Container';
import { DetailCardIcon } from '@/views/ui/detail/DetailCardIcon';
import type { ResolvedOurCompany } from './fallback';

/** "The Principles Behind Our Work" — Figma node 617:7561 (y3369-4550).
 * Same dark glassmorphic card shell as
 * views/industries/detail/ChallengesSection.tsx
 * (`backdrop-blur-[21px] bg-white/8 border-white/10 rounded-[20px]`),
 * 8 cards across 2 rows instead of 4 across 1. CMS-first,
 * template-fallback — always renders. */
export function ValuesSection({ values }: { values: ResolvedOurCompany['values'] }) {
  return (
    <section className="relative overflow-hidden bg-[#040e1f] py-16 text-white sm:py-20 lg:py-24">
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{values.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-white sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
            {values.heading}
          </h2>
          <p className="mt-4 text-base leading-[1.9] text-white/80">{values.body}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.items.map((card) => (
            <div
              key={card.id}
              className="flex flex-col items-center gap-[31px] rounded-[20px] border border-white/10 bg-white/[0.08] p-8 text-center backdrop-blur-[21px]"
            >
              <span className="flex size-[124px] shrink-0 items-center justify-center rounded-full bg-white/10">
                <DetailCardIcon icon={card.icon} iconIdentifier={card.iconIdentifier} className="size-16 text-white" />
              </span>
              <div className="flex flex-col gap-6">
                <p className="font-sans text-lg font-semibold leading-[1.34] text-white">{card.title}</p>
                {card.description && <p className="font-sans text-sm leading-[1.87] text-white/70">{card.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

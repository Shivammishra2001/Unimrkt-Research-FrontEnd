import Image from 'next/image';
import { Container } from '@/views/ui/Container';
import { DetailCardIcon } from '@/views/ui/detail/DetailCardIcon';
import type { ResolvedIndustryDetail } from './fallback';

/** "Key Challenges We Solve" — Figma node 384:6409-6428 (y3624-4441). Dark
 * glassmorphic cards (`backdrop-blur-[21px]`, `bg-white/8`, border
 * `white/10`, `rounded-[20px]`). CMS-first, template-fallback — always
 * renders 4 cards, never collapses. The dark photo band behind them is
 * decorative site chrome (not per-industry content). */
export function ChallengesSection({ challenges }: { challenges: ResolvedIndustryDetail['challenges'] }) {
  return (
    <section className="relative overflow-hidden py-16 text-white sm:py-20 lg:py-24">
      <Image src="/images/industries/detail/challenges-bg.jpg" alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-[#05101a]/80" aria-hidden="true" />
      <Container className="relative">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{challenges.eyebrow}</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-[1.2] text-white sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
          {challenges.heading}
        </h2>
        <p className="mt-4 max-w-[833px] text-base leading-[1.9] text-white/80">{challenges.body}</p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {challenges.cards.map((card) => (
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

import Image from 'next/image';
import { Container } from '@/views/ui/Container';
import { DetailCardIcon } from '@/views/ui/detail/DetailCardIcon';
import type { ResolvedIndustryDetail } from './fallback';

/** "Key Challenges We Solve" — Figma node 384:6409-6428 (y3624-4441). Dark
 * glassmorphic cards (`backdrop-blur-[21px]`, `bg-white/8`, border
 * `white/10`, `rounded-[20px]`). CMS-first, template-fallback — always
 * renders 4 cards, never collapses. The dark photo band behind them is
 * decorative site chrome (not per-industry content). */
// The exact vuesax icons drawn in Figma 363:4816-4843 (64px, #292D32 stroke); an uploaded icon always wins.
const FIGMA_ICONS: Record<string, string> = {
  'profile-2user': '/icons/industries/challenges/profile-2user.svg',
  flash: '/icons/industries/challenges/flash.svg',
  chart: '/icons/industries/challenges/chart.svg',
  'shield-tick': '/icons/industries/challenges/shield-tick.svg',
};

export function ChallengesSection({ challenges }: { challenges: ResolvedIndustryDetail['challenges'] }) {
  return (
    <section className="relative overflow-hidden bg-[#0f1825] py-16 text-white sm:py-20 lg:min-h-[817px] lg:pb-12 lg:pt-[97px]">
      {/* Figma 384:6409-6413: a solid #0f1825 base with the photo laid over it at 30% — no heavy overlay. */}
      <Image src="/images/industries/detail/challenges-bg.jpg" alt="" fill sizes="100vw" className="object-cover opacity-30" />
      <Container className="relative max-w-[1600px] min-[1700px]:px-0">
        <p className="font-sans text-[13px] font-bold uppercase leading-[1.2] tracking-[3px] text-[#A6192E]">{challenges.eyebrow}</p>
        <h2 className="mt-3 max-w-2xl lg:mt-[7px] font-sans text-3xl font-semibold capitalize leading-[1.2] text-white sm:text-4xl lg:text-[50px] lg:leading-[1.2] lg:tracking-[-1px]">
          {challenges.heading}
        </h2>
        <p className="mt-4 max-w-[833px] text-base leading-[1.9] text-white/80 lg:mt-[21px]">{challenges.body}</p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-[50px] lg:grid-cols-4 lg:gap-[29px]">
          {challenges.cards.map((card) => (
            <div
              key={card.id}
              className="group cursor-pointer transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:transform-none flex min-h-[390px] flex-col items-center gap-[31px] rounded-[20px] border border-white/10 bg-white/[0.08] px-8 pb-10 pt-12 text-center lg:pb-4 backdrop-blur-[21px] hover:border-white/20 hover:bg-white/[0.12] lg:px-[51px] lg:pt-[68px]"
            >
              <span className="flex size-[124px] shrink-0 items-center justify-center rounded-full bg-white">
                {!card.icon && card.iconIdentifier && FIGMA_ICONS[card.iconIdentifier] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={FIGMA_ICONS[card.iconIdentifier]}
                    alt=""
                    width={64}
                    height={64}
                    className="size-16 transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none"
                  />
                ) : (
                  <DetailCardIcon icon={card.icon} iconIdentifier={card.iconIdentifier} strokeWidth={1.8} className="size-16 text-[#02060e] transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none" />
                )}
              </span>
              <div className="flex w-full flex-col gap-6">
                <p className="font-sans text-[18px] font-semibold leading-[1.34] text-white">{card.title}</p>
                {card.description && <p className="font-sans text-[14px] leading-[1.87] text-white/70">{card.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

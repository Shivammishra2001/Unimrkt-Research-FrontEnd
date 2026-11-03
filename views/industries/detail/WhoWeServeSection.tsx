import { ScrollCards } from './ScrollCards';
import { DetailCardIcon } from '@/views/ui/detail/DetailCardIcon';
import type { ResolvedIndustryDetail } from './fallback';

/** "Supporting Every {Title} Segment" — Figma node 384:6207-6221 (y4133, section
 * height 984). #f9f9f7 band; 460x567 cards (white, 1px #e0e0df, r24, 6/6/54 shadow) with the
 * title at (54, 65), the copy under it and the 80px red icon at (54, 421). Text boxes are
 * trimmed to cap height as in the node. CMS-first, template-fallback — always renders 4
 * cards, never collapses. */
// The exact pictograms drawn in Figma 363:5097 / 5112 / 5130 / 5141 (80px, #A3282A); an uploaded icon always wins.
const FIGMA_ICONS: Record<string, string> = {
  car: '/icons/industries/who-we-serve/manufacturers.svg',
  wrench: '/icons/industries/who-we-serve/suppliers.svg',
  'battery-charging': '/icons/industries/who-we-serve/ev.svg',
  building: '/icons/industries/who-we-serve/dealerships.svg',
};

export function WhoWeServeSection({ whoWeServe }: { whoWeServe: ResolvedIndustryDetail['whoWeServe'] }) {
  return (
    <section className="relative [overflow-x:clip] bg-[#f9f9f7] py-16 sm:py-20 lg:min-h-[984px] lg:pb-[54px] lg:pt-[102px]">
      {/* Figma 384:6211 "image 75" — contour wave flowing behind the heading and the upper half of the cards. Clipped to the section by its own wrapper so the cards can lift freely. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden select-none overflow-hidden lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/figma-industries/who-we-serve-wave.png" alt="" className="absolute left-1/2 top-[-40px] w-full max-w-[1920px] -translate-x-1/2 opacity-25" />
      </div>

      <header className="relative z-10 mx-auto max-w-[920px] px-4 text-center">
        <p className="font-sans text-[13px] font-bold uppercase leading-[1.2] tracking-[3px] text-[#cc1f1f] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
          {whoWeServe.eyebrow}
        </p>
        <h2 className="mx-auto mt-[26px] max-w-[560px] font-sans text-3xl font-semibold capitalize leading-[1.2] text-[#02060e] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] sm:text-4xl lg:text-[52px] lg:leading-[1.2] lg:tracking-[-3px]">
          {whoWeServe.heading}
        </h2>
      </header>

      <div className="relative z-10 mt-[43px]">
        <ScrollCards label="Who we serve" tight>
          {whoWeServe.cards.map((card) => {
            const figmaIcon = !card.icon && card.iconIdentifier ? FIGMA_ICONS[card.iconIdentifier] : undefined;
            const twoLineTitle = card.title.length > 26;
            return (
              <li key={card.id} className="w-[min(460px,86vw)] shrink-0">
                <div className="group relative flex min-h-[567px] cursor-pointer flex-col rounded-[24px] border border-[#e0e0df] bg-white pb-[65px] pl-[53px] pr-[45px] pt-[64px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-[#a82c31] hover:bg-[#a82c31] hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:transform-none">
                  <h3 className="max-w-[314px] font-sans text-[22px] font-semibold leading-[1.34] text-[#04264e] transition-colors duration-300 ease-in-out group-hover:text-white motion-reduce:transition-none [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">{card.title}</h3>
                  {card.description && (
                    <p className={`max-w-[360px] font-sans text-[14px] font-normal leading-[1.87] text-black/70 transition-colors duration-300 ease-in-out group-hover:text-white group-hover:opacity-90 motion-reduce:transition-none [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] ${twoLineTitle ? 'mt-[27px]' : 'mt-[37px]'}`}>
                      {card.description}
                    </p>
                  )}
                  {figmaIcon ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={figmaIcon} alt="" width={80} height={80} className="mt-auto block size-20 shrink-0 transition-[filter] duration-300 ease-in-out group-hover:brightness-0 group-hover:invert motion-reduce:transition-none" />
                  ) : (
                    <DetailCardIcon
                      icon={card.icon}
                      iconIdentifier={card.iconIdentifier}
                      className="mt-auto size-20 shrink-0 text-[#A3282A] transition-colors duration-300 ease-in-out group-hover:text-white motion-reduce:transition-none"
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ScrollCards>
      </div>
    </section>
  );
}

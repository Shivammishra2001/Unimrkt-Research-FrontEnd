import { ScrollCards } from './ScrollCards';
import { DetailCardIcon } from '@/views/ui/detail/DetailCardIcon';
import type { ResolvedIndustryDetail } from './fallback';

/** "Supporting Every {Title} Segment" — Figma node 384:6207-6221
 * (y4441-5301). Same white rounded-blog/shadow-blog shell as
 * WhyResearchSection, but a small 80px line icon instead of a photo.
 * CMS-first, template-fallback — always renders 4 cards, never
 * collapses. */
export function WhoWeServeSection({ whoWeServe }: { whoWeServe: ResolvedIndustryDetail['whoWeServe'] }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:min-h-[984px] lg:pb-[54px] lg:pt-[102px]">
      <header className="mx-auto max-w-[920px] px-4 text-center">
        <p className="font-sans text-[13px] font-bold uppercase tracking-[3px] text-brand-600">{whoWeServe.eyebrow}</p>
        <h2 className={`mt-2.5 font-sans text-3xl font-semibold capitalize leading-[1.2] text-heading sm:text-4xl lg:tracking-[-3px] ${whoWeServe.heading.length > 40 ? 'lg:text-[40px] lg:leading-[1.2]' : 'lg:text-[50px] lg:leading-[1.2]'}`}>
          {whoWeServe.heading}
        </h2>
      </header>

      <div className="mt-10 lg:mt-10">
        <ScrollCards label="Who we serve">
          {whoWeServe.cards.map((card) => (
            <li key={card.id} className="w-[min(460px,86vw)] shrink-0">
              <div className="group relative flex min-h-[567px] cursor-pointer flex-col rounded-[24px] border border-[#e0e0df] bg-white px-[54px] pb-[66px] pt-[58px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:transform-none">
                <h3 className="max-w-[320px] font-sans text-[22px] font-semibold leading-[1.34] text-[#04264e]">{card.title}</h3>
                {card.description && <p className="mt-[22px] font-sans text-[14px] leading-[1.87] text-black/70">{card.description}</p>}
                <DetailCardIcon
                  icon={card.icon}
                  iconIdentifier={card.iconIdentifier}
                  className="mt-auto size-20 pt-0 text-[#a82c31] transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none"
                />
              </div>
            </li>
          ))}
        </ScrollCards>
      </div>
    </section>
  );
}

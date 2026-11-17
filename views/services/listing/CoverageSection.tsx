import Image from 'next/image';
import { SectionHeader } from '@/views/industries/listing/shared';
import type { ServicesListingContent } from './content';

/** "Our Coverage / Research Reach That Goes Beyond Markets" — Figma 1231:77319-77323 + 1231:77386-77409 (y4829-5798).
 * Eyebrow cap-top 85px under the question band, 50/60 title (1047px), 5-line body (1354px). Four 787x320 cards in a
 * 2x2 grid, 26px apart, from 50px under the body: white @ 80%, 1.2px #eee, r24, 7/7/65 shadow; a 90px #f6eaea disc
 * (1px #a3282a @ 15%) with the 44px #a3282a line icon at (49,42); the 22px SemiBold #04264e title at x159 (cap +51) and
 * the 14/26.2px body @ 70% (cap +91, 580px). Cards grow with their copy instead of clipping it. */
export function CoverageSection({ content }: { content: ServicesListingContent['coverage'] }) {
  return (
    <section className="relative bg-white pb-12 pt-16 lg:pb-[60px] lg:pt-[81.6px]">
      <div className="relative">
        <SectionHeader eyebrow={content.eyebrow} title={content.heading} titleMaxWidth="1100px" bodyMaxWidth="1354px" className="px-4 sm:px-6" body={<div className="lg:mt-[10px]">{content.body}</div>} />
        <ul className="mx-auto mt-10 grid w-full max-w-[1664px] grid-cols-1 items-stretch gap-[26px] px-4 sm:px-6 md:grid-cols-2 lg:mt-[50px] lg:px-8 min-[1700px]:max-w-[1600px] min-[1700px]:px-0">
          {content.cards.map((card) => (
            <li
              key={card.title}
              className="flex flex-col gap-5 rounded-[24px] border-[1.2px] border-[#eee] bg-white/80 p-6 shadow-[7.176px_7.176px_64.588px_0px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:transform-none lg:p-8 xl:min-h-[320px] xl:flex-row xl:pb-10 xl:pl-[49px] xl:pr-12 xl:pt-[42px]"
            >
              <span className="relative flex size-[90px] shrink-0 items-center justify-center">
                <Image src="/icons/services/coverage-disc.svg" alt="" width={90} height={90} className="absolute inset-0 size-full" />
                <Image src={card.iconImage?.src ?? `/icons/services/${card.icon}`} alt="" width={44} height={44} className="relative size-11" />
              </span>
              <div className="min-w-0 xl:pt-[1.8px]">
                <h3 className="font-sans text-[22px] font-semibold leading-[1.34] text-[#04264e]">{card.title}</h3>
                <p className="mt-[9.4px] font-sans xl:max-w-[589px] text-[14px] font-normal leading-[1.87] text-black opacity-70">{card.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

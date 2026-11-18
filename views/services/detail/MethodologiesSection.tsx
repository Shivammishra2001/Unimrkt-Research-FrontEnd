'use client';

import { useEffect, useState } from 'react';
import { SectionHeader } from '@/views/industries/listing/shared';
import { DotPagination } from '@/views/industries/DotPagination';
import { useSnapTrack } from '@/views/ui/useSnapTrack';
import type { ResolvedServiceDetail } from './fallback';

/** "Research Methodologies" — Figma 474:5737-5752 + 483:7163 (y3978-4686, #f9f9f7). Eyebrow cap-top +88, 50/60 title,
 * 2-line body (1090px), then 460x282 cards ~30px apart from y4272 in a row that starts on the 1600px column and runs
 * off the right edge (the 4th card is cropped by the frame) — from 1700px; below that the row shows whole cards (3 on
 * laptops, 2 on tablets) — with the dot pager 32px under them. Card (473:5008):
 * white, 1px #e0e0df, r24, 6/6/54 shadow; a 70px #a3282a disc with the white 32px step number at (48, 44.5); the
 * 22px #04264e title (cap +151) and the 14/26.2px description @ 70% (cap +188). Hover (473:5007): the card grows ~3.5%. */
export function MethodologiesSection({ methodologies }: { methodologies: ResolvedServiceDetail['methodologies'] }) {
  const { ref, active, onScroll, goTo } = useSnapTrack<HTMLUListElement>();
  const items = methodologies.items;
  // One pager stop per reachable start position (whole cards: 2 per view on tablets, 3 on laptops, the node's bleed from 1700px).
  const [perView, setPerView] = useState(1);
  useEffect(() => {
    const track = ref.current;
    if (!track) return undefined;
    const measure = () => {
      const first = track.firstElementChild as HTMLElement | null;
      const pad = parseFloat(getComputedStyle(track).paddingLeft) + parseFloat(getComputedStyle(track).paddingRight);
      if (first) setPerView(Math.max(1, Math.floor((track.clientWidth - pad + 30) / (first.offsetWidth + 24) + 0.02)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, [ref]);
  const stops = Math.max(1, items.length - perView + 1);

  return (
    <section className="overflow-hidden bg-[#f9f9f7] py-16 lg:pb-[70.5px] lg:pt-[84.6px]">
      <SectionHeader eyebrow={methodologies.eyebrow} title={methodologies.heading} titleMaxWidth="1100px" bodyMaxWidth="1090px" className="px-4 sm:px-6" body={methodologies.body} />
      {/* Vertical padding (cancelled by the negative margin) keeps the shadows and the hover growth unclipped. */}
      <ul
        ref={ref}
        onScroll={onScroll}
        aria-label={methodologies.heading}
        className="-my-6 mt-4 flex snap-x snap-mandatory scroll-px-4 gap-6 overflow-x-auto scroll-smooth px-4 py-6 [scrollbar-width:none] sm:scroll-px-6 sm:px-6 lg:mt-[26px] lg:scroll-px-8 lg:gap-[30px] lg:px-8 min-[1700px]:scroll-pl-[calc(50vw_-_800px)] min-[1700px]:pl-[calc(50vw_-_800px)] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <li
            key={item.id}
            className="w-[min(85vw,460px)] shrink-0 snap-start md:w-[calc((100%_-_24px)/2)] lg:w-[calc((100%_-_60px)/3)] min-[1700px]:w-[460px] rounded-[24px] border border-[#e0e0df] bg-white pb-10 pl-8 pr-8 pt-8 shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.035] motion-reduce:transition-none motion-reduce:hover:scale-100 sm:pl-[48px] sm:pr-[52px] sm:pt-[44.5px] lg:min-h-[282px]"
          >
            <span className="flex size-[70px] items-center justify-center rounded-full bg-[#a3282a] font-sans text-[32px] font-semibold leading-none text-white">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-[29.3px] font-sans text-[22px] font-semibold leading-[1.34] text-[#04264e]">{item.title}</h3>
            {item.description && <p className="mt-[6.4px] font-sans text-[14px] font-normal leading-[1.87] text-black opacity-70">{item.description}</p>}
          </li>
        ))}
      </ul>
      {/* The pager keeps its row (invisible) when every card fits, so the section height never jumps. */}
      <div className={`mt-6 flex min-h-11 justify-center lg:mt-[17.5px] ${stops > 1 ? '' : 'invisible'}`}>
        <DotPagination count={Math.max(stops, 2)} activeIndex={Math.min(active, stops - 1)} onSelect={goTo} />
      </div>
    </section>
  );
}

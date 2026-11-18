'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { SectionHeader } from '@/views/industries/listing/shared';
import { DotPagination } from '@/views/industries/DotPagination';
import { useSnapTrack } from '@/views/ui/useSnapTrack';
import type { SubServiceContent } from './content';

/** "Our Telephonic Survey Process" — Figma (y2895-3617, #f9f9f7). Header, then 460x402 cards 34px apart from +202 in a
 * row that starts on the 1600px column and runs off the right edge (from 1700px; below that, whole cards: 3 on laptops,
 * 2 on tablets), dot pager under them. Card: white, 1px #e0e0df, r24, 6/6/54 shadow; the 66px step number @ 15%, the
 * 80px icon, 22px #04264e title and 14/26.2 description @ 70%. Hover: the card grows ~2.5%. Same mechanics as the
 * Level-2 methodologies slider. */
export function ProcessSection({ process }: { process: SubServiceContent['process'] }) {
  const { ref, active, onScroll, goTo } = useSnapTrack<HTMLUListElement>();
  const steps = process.steps;
  const [perView, setPerView] = useState(1);
  useEffect(() => {
    const track = ref.current;
    if (!track) return undefined;
    const measure = () => {
      const first = track.firstElementChild as HTMLElement | null;
      const cs = getComputedStyle(track);
      const pad = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
      if (first) setPerView(Math.max(1, Math.floor((track.clientWidth - pad + 34) / (first.offsetWidth + 24) + 0.02)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, [ref]);
  const stops = Math.max(1, steps.length - perView + 1);

  return (
    <section className="overflow-hidden bg-[#f9f9f7] py-16 lg:py-10">
      <SectionHeader eyebrow={process.eyebrow} title={process.heading} titleMaxWidth="1100px" className="px-4 sm:px-6" />
      <ul
        ref={ref}
        onScroll={onScroll}
        aria-label={process.heading}
        className="-my-6 mt-4 flex snap-x snap-mandatory scroll-px-4 gap-6 overflow-x-auto scroll-smooth px-4 py-6 [scrollbar-width:none] sm:scroll-px-6 sm:px-6 lg:mt-[10px] lg:scroll-px-8 lg:gap-[34px] lg:px-8 min-[1700px]:scroll-pl-[calc(50vw_-_800px)] min-[1700px]:pl-[calc(50vw_-_800px)] [&::-webkit-scrollbar]:hidden"
      >
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="w-[min(85vw,460px)] shrink-0 snap-start rounded-[24px] border border-[#e0e0df] bg-white px-8 pb-10 pt-8 shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.025] motion-reduce:transition-none motion-reduce:hover:scale-100 sm:pl-[48px] sm:pr-[44px] sm:pt-[36px] md:w-[calc((100%_-_24px)/2)] lg:min-h-[402px] lg:w-[calc((100%_-_68px)/3)] min-[1700px]:w-[460px]"
          >
            <span className="block font-sans text-[54px] font-semibold leading-none text-[#02060e]/15 sm:text-[66px]">{String(i + 1).padStart(2, '0')}</span>
            {step.icon && <Image src={step.icon} alt="" width={80} height={80} className="mt-10 size-[70px] sm:size-[80px] lg:mt-[60px]" />}
            <h3 className="mt-[10px] font-sans text-[20px] font-semibold leading-[1.34] text-[#04264e] sm:text-[22px]">{step.title}</h3>
            <p className="mt-[8px] font-sans text-[14px] font-normal leading-[1.87] text-black opacity-70">{step.body}</p>
          </li>
        ))}
      </ul>
      <div className={`mt-6 flex min-h-11 justify-center lg:mt-[20px] ${stops > 1 ? '' : 'invisible'}`}>
        <DotPagination count={Math.max(stops, 2)} activeIndex={Math.min(active, stops - 1)} onSelect={goTo} />
      </div>
    </section>
  );
}

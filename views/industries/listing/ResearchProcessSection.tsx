'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { SectionHeader } from './shared';
import type { IndustriesPageContent } from '@/models/industriesPage';
import { DotPagination } from '../DotPagination';

const ICON_DIR = '/icons/industries';

// Figma nodes 1384:27094-27097 (Components 1101-1104). Copy comes from the CMS
// (Pages > Industries); the icons are fixed by card position.
const ICONS = ['process-clipboard.svg', 'process-brush.svg', 'process-presentation.svg', 'process-chart.svg'];

/** "Turning Research Into Impact" — Figma 1384:26772, y7704-8668
 * (#f9f9f7 with a 6% luminosity texture). Four 460x540 cards (1px
 * #e0e0df, r24, shadow 6 6 54 rgba(0,0,0,.08)) at x=150 with 28px gaps in
 * a horizontal row that runs off the frame's right edge (the 4th card
 * starts at x=1614), y=8002; 78x15 dots at y=8568. Step number 66/79.2px
 * @ 15%, icon 70px at (48,155), title 22px, body 14/26.18px @ 70%. */
export function ResearchProcessSection({ content }: { content: IndustriesPageContent['process'] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  function scrollToIndex(i: number) {
    const track = trackRef.current;
    const card = track?.children[i] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    setActive(i);
  }

  function onScroll() {
    const track = trackRef.current;
    const first = track?.children[0] as HTMLElement | undefined;
    if (!track || !first) return;
    setActive(Math.min(content.steps.length - 1, Math.round(track.scrollLeft / (first.offsetWidth + 28))));
  }

  return (
    <section className="relative overflow-hidden bg-[#f9f9f7] py-16 lg:h-[964px] lg:pb-0 lg:pt-[80.6px]">
      <Image src="/images/industries/process-bg.jpg" alt="" fill sizes="1900px" className="pointer-events-none object-cover object-top opacity-[0.06] mix-blend-luminosity" />
      <div className="relative">
        <SectionHeader
          eyebrow={content.eyebrow}
          title={content.heading}
          titleMaxWidth="718px"
          bodyMaxWidth="1234px"
          className="px-4 sm:px-6"
          body={content.body}
        />
        <ul
          ref={trackRef}
          onScroll={onScroll}
          className="mt-[15.5px] flex snap-x snap-mandatory gap-[28px] overflow-x-auto scroll-smooth px-4 pb-6 pt-4 [scrollbar-width:none] sm:px-6 lg:scroll-pl-[max(32px,calc(50vw-800px))] lg:pl-[max(32px,calc(50vw-800px))] lg:pr-8 [&::-webkit-scrollbar]:hidden"
        >
          {content.steps.map((step, i) => (
            <li
              key={`${step.title}-${i}`}
              className="group relative w-[85vw] shrink-0 cursor-pointer snap-start rounded-[24px] border border-[#e0e0df] bg-white pb-6 pl-[47px] pr-[41px] pt-[33px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:transform-none sm:w-[460px] lg:min-h-[540px]"
            >
              <p className="font-sans text-[66px] font-semibold capitalize leading-[79.2px] tracking-[-1px] text-[#02060e] opacity-15">{String(i + 1).padStart(2, '0')}</p>
              <Image src={step.icon?.src ?? `${ICON_DIR}/${ICONS[i % ICONS.length]}`} alt="" width={70} height={70} className="mt-[41.8px] size-[70px]" />
              <h3 className="mt-[13.8px] font-sans text-[22px] font-semibold leading-[29.48px] text-[#04264e]">{step.title}</h3>
              <p className="mt-[9.4px] font-sans text-[14px] font-normal leading-[26.18px] text-black opacity-70">{step.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-[2px] flex justify-center">
          <DotPagination count={content.steps.length - 1} activeIndex={Math.min(active, content.steps.length - 2)} onSelect={scrollToIndex} />
        </div>
      </div>
    </section>
  );
}

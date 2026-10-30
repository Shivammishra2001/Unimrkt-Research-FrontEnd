'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { SectionHeader } from './listing/shared';
import { DotPagination } from './DotPagination';
import type { IndustriesPageContent } from '@/models/industriesPage';

// Figma nodes 1384:27214-27216 (Components 920-922). Copy comes from the CMS (Pages > Industries).

/** "Trusted Research Partner for Businesses Worldwide" — Figma
 * 1384:26772, y8668-9489. Three 590x385 cards (1px #eee, r24, shadow 6 6
 * 54 rgba(0,0,0,.08)) at x=150 with 32px gaps, y=8956 — the third runs off
 * the frame, so the row scrolls — with 78x15 dots at y=9377. Quote glyph
 * 50x34 at (49,48) (#a82c31), title 21/28.1px #04264e, quote 14/26.18px @
 * 70%, name 16px semibold + role 14px @ 70% at y=294. */
export function ClientSuccessStories({ content }: { content: IndustriesPageContent['testimonials'] }) {
  const TESTIMONIALS = content.items;
  const trackRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function scrollToIndex(index: number) {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    setActiveIndex(index);
  }

  function handleScroll() {
    const track = trackRef.current;
    const card = track?.children[0] as HTMLElement | undefined;
    if (!track || !card) return;
    setActiveIndex(Math.min(TESTIMONIALS.length - 1, Math.round(track.scrollLeft / (card.offsetWidth + 32))));
  }

  return (
    <section className="relative bg-white py-16 lg:h-[821px] lg:pb-0 lg:pt-[99.6px]">
      {/* Figma 1384:27212 "image 74": the 6% wave graphic straddling this section's lower edge
          into the blogs band below (that section is transparent so it shows through). */}
      <div className="pointer-events-none absolute left-0 top-0 h-[560px] w-full overflow-hidden opacity-[0.15] [mask-image:linear-gradient(to_bottom,#000_55%,transparent)]" aria-hidden="true">
        <div className="absolute inset-x-0 top-[-267px] h-[845px]">
          <Image src={content.backgroundWavesImage?.src ?? '/images/industries/process-bg.jpg'} alt="" fill sizes="100vw" className="object-cover object-left-top" />
        </div>
      </div>
      <SectionHeader
        eyebrow={content.eyebrow}
        title={content.heading}
        titleMaxWidth="704px"
        className="relative px-4 sm:px-6"
      />
      <ul
        ref={trackRef}
        onScroll={handleScroll}
        className="relative mt-[29.9px] flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth px-4 pb-6 pt-4 [scrollbar-width:none] sm:px-6 lg:scroll-pl-[max(32px,calc(50vw-800px))] lg:pl-[max(32px,calc(50vw-800px))] lg:pr-8 [&::-webkit-scrollbar]:hidden"
      >
        {TESTIMONIALS.map((t) => (
          <li
            key={`${t.name}-${t.title}`}
            className="w-[85vw] shrink-0 cursor-pointer snap-start rounded-[24px] border border-[#eee] bg-white pb-[34px] pl-[48px] pr-[48px] pt-[47px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:transform-none sm:w-[590px] lg:min-h-[385px]"
          >
            <Image src="/icons/industries/quote.svg" alt="" width={50} height={34} className="h-[34px] w-[50px]" aria-hidden="true" />
            <h3 className="mt-[22.7px] font-sans text-[21px] font-semibold leading-[28.14px] text-[#04264e]">{t.title}</h3>
            <p className="mt-[19.5px] font-sans text-[14px] font-normal leading-[26.18px] text-black opacity-70 lg:pr-[8px]">{t.quote}</p>
            <p className="mt-[37.3px] font-sans text-[16px] font-semibold leading-[21.44px] text-[#04264e]">{t.name}</p>
            <p className="mt-[8px] font-sans text-[14px] font-normal leading-[26.18px] text-black opacity-70">{t.role}</p>
          </li>
        ))}
      </ul>
      <div className="relative mt-[1px] flex justify-center">
        <DotPagination count={TESTIMONIALS.length} activeIndex={activeIndex} onSelect={scrollToIndex} />
      </div>
    </section>
  );
}

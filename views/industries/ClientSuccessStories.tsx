'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { SectionHeader } from './listing/shared';
import { DotPagination } from './DotPagination';

// Figma nodes 1384:27214-27216 (Components 920-922), copy verbatim from the
// 3 card instances. Deliberately NOT the seeded `testimonial` collection:
// that content is dev-CMS placeholder copy, not real client work.
const TESTIMONIALS = [
  {
    title: 'Exceptional Research. Actionable Results.',
    quote:
      'Unimrkt Research delivered comprehensive market intelligence that gave us a clear understanding of customer behavior and competitive trends. Their insights played a key role in shaping our strategic decisions.',
    name: 'David Anderson',
    role: 'Head of Market Strategy',
  },
  {
    title: 'A Trusted Extension of Our Team',
    quote:
      'From research design to final reporting, the Unimrkt team demonstrated professionalism, accuracy, and deep industry expertise. Their commitment to quality made them a trusted research partner for our organization.',
    name: 'Jennifer Collins',
    role: 'Director – Customer Insights',
  },
  {
    title: 'Insights That Drive Better Decisions',
    quote:
      'The team provided high-quality data, meaningful analysis, and actionable recommendations that helped us confidently enter new markets. Their research exceeded our expectations at every stage.',
    name: 'Rajesh Mehta',
    role: 'Vice President – Business Intelligence',
  },
];

/** "Trusted Research Partner for Businesses Worldwide" — Figma
 * 1384:26772, y8668-9489. Three 590x385 cards (1px #eee, r24, shadow 6 6
 * 54 rgba(0,0,0,.08)) at x=150 with 32px gaps, y=8956 — the third runs off
 * the frame, so the row scrolls — with 78x15 dots at y=9377. Quote glyph
 * 50x34 at (49,48) (#a82c31), title 21/28.1px #04264e, quote 14/26.18px @
 * 70%, name 16px semibold + role 14px @ 70% at y=294. */
export function ClientSuccessStories() {
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
    <section className="bg-white py-16 lg:h-[821px] lg:pb-0 lg:pt-[99.6px]">
      <SectionHeader
        eyebrow="Client Success Stories"
        title="Trusted Research Partner for Businesses Worldwide"
        titleMaxWidth="704px"
        className="px-4 sm:px-6"
      />
      <ul
        ref={trackRef}
        onScroll={handleScroll}
        className="mt-[45.9px] flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth px-4 pb-6 [scrollbar-width:none] sm:px-6 lg:scroll-pl-[max(32px,calc(50vw-800px))] lg:pl-[max(32px,calc(50vw-800px))] lg:pr-8 [&::-webkit-scrollbar]:hidden"
      >
        {TESTIMONIALS.map((t) => (
          <li
            key={t.name}
            className="w-[85vw] shrink-0 snap-start rounded-[24px] border border-[#eee] bg-white pb-[34px] pl-[48px] pr-[48px] pt-[47px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] sm:w-[590px] lg:min-h-[385px]"
          >
            <Image src="/icons/industries/quote.svg" alt="" width={50} height={34} className="h-[34px] w-[50px]" aria-hidden="true" />
            <h3 className="mt-[22.7px] font-sans text-[21px] font-semibold leading-[28.14px] text-[#04264e]">{t.title}</h3>
            <p className="mt-[19.5px] font-sans text-[14px] font-normal leading-[26.18px] text-black opacity-70 lg:pr-[8px]">{t.quote}</p>
            <p className="mt-[37.3px] font-sans text-[16px] font-semibold leading-[21.44px] text-[#04264e]">{t.name}</p>
            <p className="mt-[8px] font-sans text-[14px] font-normal leading-[26.18px] text-black opacity-70">{t.role}</p>
          </li>
        ))}
      </ul>
      <div className="mt-[1px] flex justify-center">
        <DotPagination count={TESTIMONIALS.length} activeIndex={activeIndex} onSelect={scrollToIndex} />
      </div>
    </section>
  );
}

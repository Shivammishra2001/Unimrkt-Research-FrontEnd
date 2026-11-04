'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { DotPagination } from '../DotPagination';
import { SectionHeader } from './shared';
import type { IndustriesPageContent } from '@/models/industriesPage';

const ICON_DIR = '/icons/industries';

// Figma nodes 1384:27086-27088 (Components 1094-1096). Copy comes from the CMS
// (Pages > Industries); the icons are fixed by card position.
const ICONS = ['case-connection.svg', 'case-cogwheel.svg', 'case-insight.svg'];

/** "From Business Questions to Meaningful Outcomes" — Figma 1384:26772,
 * y6075-6926 (#f9f9f7, a white fade over the top 168px). Three 500x443
 * cards (1px #e0e0df, r24, shadow 6 6 54 rgba(0,0,0,.08)) at x=160/690/
 * 1220 (30px gaps), y=6359. Icon 70px at (48,41); title 22/29.5px
 * #04264e; body 14/26.18px @ 70%. A 78x15 dot pager sits 29px under the
 * cards (node 1384:27098: 32x15 #b63a40 pill + 15px dots). The cards form a
 * scroll-snap track: swipe/scroll updates the active dot, a dot scrolls to its
 * card. From 1280px the three 380px+ cards all fit, so it only scrolls below that. */
export function CaseStudiesSection({ content }: { content: IndustriesPageContent['cases'] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = content.cards.length;

  const syncActive = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.children.length === 0) return;
    // At the far end the last card is active even if it can't reach the snap start.
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2 && track.scrollWidth > track.clientWidth + 2) {
      setActive(track.children.length - 1);
      return;
    }
    const trackLeft = track.getBoundingClientRect().left;
    const pad = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
    let best = 0;
    let bestDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      // Card start within the scrolled content, compared with where the snap would put it.
      const offset = (child as HTMLElement).getBoundingClientRect().left - trackLeft + track.scrollLeft;
      const dist = Math.abs(offset - pad - track.scrollLeft);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', syncActive);
    return () => window.removeEventListener('resize', syncActive);
  }, [syncActive]);

  const goTo = (index: number) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    const pad = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
    const target = card.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft - pad;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left: target, behavior: reduce ? 'auto' : 'smooth' });
    setActive(index);
  };

  return (
    <section className="relative bg-[#f9f9f7] py-16 lg:h-[851px] lg:pb-0 lg:pt-[77.6px]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[168px]"
        style={{ backgroundImage: 'linear-gradient(to top, rgba(255,255,255,0) 0%, #fff 86.538%)' }}
        aria-hidden="true"
      />
      <div className="relative">
        <SectionHeader
          eyebrow={content.eyebrow}
          title={content.heading}
          titleMaxWidth="1181px"
          bodyMaxWidth="1252px"
          className="px-4 sm:px-6"
          body={content.body}
        />
        <div className="mx-auto mt-[44.9px] w-full max-w-[1560px]">
          {/* The track's vertical/side padding (cancelled by the negative margins) keeps card shadows and the hover lift from being clipped by the scroll container. */}
          <div
            ref={trackRef}
            onScroll={syncActive}
            role="group"
            aria-label="Case study highlights"
            className="-my-12 flex snap-x snap-mandatory touch-pan-x gap-6 overflow-x-auto overscroll-x-contain scroll-smooth px-4 py-12 [scrollbar-width:none] sm:px-6 lg:gap-[30px] lg:px-8 min-[1620px]:-mx-12 min-[1620px]:px-12 [&::-webkit-scrollbar]:hidden"
            style={{ scrollPaddingInline: 'clamp(16px, 4vw, 32px)' }}
          >
            {content.cards.map((item, i) => (
              <article
                key={item.title}
                className="group w-[85%] shrink-0 cursor-pointer snap-start rounded-[24px] border border-[#e0e0df] bg-white pb-10 pl-8 pr-8 pt-[40px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:transform-none sm:w-[360px] sm:pl-[47px] sm:pr-[48px] lg:min-h-[443px] lg:w-[max(380px,calc((100%-60px)/3))]"
              >
                <span className="block w-[70px] origin-left transition-transform duration-300 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:transform-none">
                  <Image src={item.icon?.src ?? `${ICON_DIR}/${ICONS[i % ICONS.length]}`} alt="" width={70} height={70} className="size-[70px]" />
                </span>
                <h3 className="mt-[29.8px] font-sans text-[22px] font-semibold leading-[29.48px] text-[#04264e]">{item.title}</h3>
                <p className="mt-[9.9px] font-sans text-[14px] font-normal leading-[26.18px] text-black opacity-70">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-[29px] flex justify-center">
          <DotPagination count={count} activeIndex={active} onSelect={goTo} />
        </div>
      </div>
    </section>
  );
}

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from '@/views/industries/listing/shared';
import { DotPagination } from '@/views/industries/DotPagination';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { IndustrySummary } from '@/models/industry';
import type { ServicesListingContent } from './content';

const DOTS = 3;

/** "Industries We Serve / Research Expertise Across Diverse Industries" — Figma 1231:77246-77250 + cards
 * 1223:70457 (1231:77324-77326) and pager 1231:77355 (y5939-6840, white). 500x512 cards 30px apart in a 1560px row
 * from y6203: white, 1px #eee, r24, 6/6/54 shadow; a 478x323 #f6f6ef image panel (top corners r24) inset 11px/10px; the
 * 22px SemiBold #04264e title at x35 (cap +373) and a 2-line 14/26.2px summary @ 70%. The industries are the live
 * Strapi list (each card shows that industry's own image and links to its page); three fit from 1024px and the row
 * scrolls, with the node's 3-dot pager tracking how far along it is. */
export function IndustriesSlider({ content, industries }: { content: ServicesListingContent['industries']; industries: IndustrySummary[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [scrollable, setScrollable] = useState(true);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollable(max > 1);
    setActive(max <= 0 ? 0 : Math.round((el.scrollLeft / max) * (DOTS - 1)));
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, [sync]);

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ left: ((el.scrollWidth - el.clientWidth) * i) / (DOTS - 1), behavior: reduce ? 'auto' : 'smooth' });
  };

  if (industries.length === 0) return null;

  return (
    <section className="relative bg-white pb-12 pt-12 lg:pb-[65.5px] lg:pt-[77.6px]">
      <SectionHeader eyebrow={content.eyebrow} title={content.heading} titleMaxWidth="1100px" bodyMaxWidth="1252px" className="px-4 sm:px-6" body={<div className="lg:mt-[6px]">{content.body}</div>} />
      <div className="mx-auto mt-[45px] w-full max-w-[1624px] min-[1700px]:max-w-[1560px]">
        {/* Vertical padding (cancelled by the negative margin) keeps the card shadows and hover lift unclipped by the scroller. */}
        <ul
          ref={trackRef}
          onScroll={sync}
          aria-label={content.eyebrow}
          className="-my-10 flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain scroll-smooth px-4 py-10 [scrollbar-width:none] sm:px-6 lg:gap-[30px] lg:px-8 min-[1700px]:-mx-10 min-[1700px]:px-10 [&::-webkit-scrollbar]:hidden"
          style={{ scrollPaddingInline: 'clamp(16px, 4vw, 40px)' }}
        >
          {industries.map((industry, i) => (
            <li key={industry.slug} className="w-[85%] shrink-0 snap-start sm:w-[calc((100%_-_24px)/2)] lg:w-[calc((100%_-_60px)/3)]">
              {/* Hover — Figma 1223:70457 -> 1223:70456 (Smart Animate on hover): the 478x323 image panel slides up 160px behind
                  the card's top inset (only its lower 163px stays visible), the title and text rise with it, and the summary opens
                  from two lines to the full paragraph. Built as a window that shrinks from the bottom-anchored image, so the
                  text moves in normal flow and the card's height never changes. Sizes are cqw of the card's inner width. */}
              <Link
                href={`/industries/${industry.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#eee] bg-white px-[11px] pb-[30px] pt-[10px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] transition-shadow duration-300 [container-type:inline-size] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a82c31] motion-reduce:transition-none min-[1700px]:min-h-[512px]"
              >
                <div className="relative h-[67.573cqw] w-full shrink-0 overflow-hidden rounded-t-[24px] bg-[#f6f6ef] transition-[height] duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:group-hover:h-[34.1cqw] lg:group-focus-visible:h-[34.1cqw]">
                  <div className="absolute inset-x-0 bottom-0 h-[67.573cqw]">
                    {industry.icon ? (
                      <StrapiImage image={industry.icon} sizes="(min-width: 1700px) 478px, (min-width: 1024px) 30vw, (min-width: 640px) 48vw, 85vw" priority={i < 3} fill className="object-cover" />
                    ) : (
                      <Image src="/images/industries/card-fallback.jpg" alt="" fill sizes="(min-width: 1024px) 30vw, 85vw" className="object-cover" />
                    )}
                  </div>
                </div>
                <h3 className="mt-[32.8px] px-6 font-sans text-[22px] font-semibold leading-[1.34] text-[#04264e]">{industry.title}</h3>
                {industry.summary && (
                  // Two lines at rest; on hover the clamp lifts and the box grows by exactly the height the image gave up,
                  // rounded down to whole 26.18px lines so no line is ever cut in half.
                  <p className="mt-[10.4px] line-clamp-2 max-h-[52.36px] pl-6 pr-[29px] font-sans text-[14px] font-normal leading-[26.18px] text-black opacity-70 transition-[max-height] duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:group-hover:max-h-[round(down,calc(33.475cqw_+_52.36px),26.18px)] lg:group-hover:[-webkit-line-clamp:unset] lg:group-focus-visible:max-h-[round(down,calc(33.475cqw_+_52.36px),26.18px)] lg:group-focus-visible:[-webkit-line-clamp:unset]">
                    {industry.summary}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={`mt-4 flex justify-center lg:mt-[15.5px] ${scrollable ? '' : 'invisible'}`} aria-hidden={!scrollable || undefined}>
        <DotPagination count={DOTS} activeIndex={active} onSelect={goTo} />
      </div>
    </section>
  );
}

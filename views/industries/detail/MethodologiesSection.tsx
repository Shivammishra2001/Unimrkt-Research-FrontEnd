'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { ArrowRightIcon } from '@/views/ui/icons/ArrowRightIcon';
import type { ResolvedIndustryDetail } from './fallback';

/** "Proven Research Methodologies" — Figma node 384:6429-6452
 * (y5301-5905). Card shell = the exact same one already built for
 * blocks.industry-grid (IndustryGridView.tsx): `rounded-industry`, solid
 * `accentColor` fill, inset white rounded photo, title at bottom.
 * CMS-first, template-fallback (methodologies are genuinely universal
 * research capabilities, so the fallback set is the same 4 for every
 * industry) — always renders, never collapses. */
export function MethodologiesSection({ methodologies }: { methodologies: ResolvedIndustryDetail['methodologies'] }) {
  const trackRef = useRef<HTMLUListElement>(null);

  function scrollBy(direction: 1 | -1) {
    const track = trackRef.current;
    const card = track?.querySelector('li');
    if (!track || !card) return;
    const step = card.clientWidth + 24;
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  }

  return (
    <section className="relative bg-white pb-16 pt-4 text-white sm:pb-20 lg:min-h-[783px] lg:pb-0 lg:pt-0">
      {/* Figma 384:6430: an inset 1742x557 rounded card (not full-bleed); the cards below hang 199px past its bottom edge. */}
      <div className="relative mx-auto w-full max-w-[1742px] px-4 sm:px-6 lg:px-0">
        <div className="absolute inset-x-4 inset-y-0 overflow-hidden rounded-3xl sm:inset-x-6 lg:inset-x-0 lg:bottom-auto lg:h-[557px] lg:rounded-[40px]" aria-hidden="true">
          <Image src="/images/industries/detail/methodology-bg.jpg" alt="" fill sizes="1742px" className="object-cover" />
          <div className="absolute inset-0 bg-[#05101a]/85" />
        </div>
        <div className="relative px-6 pt-14 sm:px-10 lg:px-[72px] lg:pt-[105px]">
          <div className="mx-auto max-w-[923px] text-center">
            <p className="font-sans text-[13px] font-bold uppercase tracking-[0.2em] text-brand-600">{methodologies.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-white sm:text-4xl lg:text-[44px] lg:leading-[1.2] lg:tracking-[-1px]">
              {methodologies.heading}
            </h2>
            <p className="mt-4 font-sans text-base leading-[25px] text-white/80">{methodologies.body}</p>
          </div>

          <div className="relative mt-12 lg:mt-[96px]">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Previous methodology"
              className="absolute -left-[25px] top-1/2 z-10 hidden size-[45px] -translate-y-1/2 items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-[#0e1626] shadow-md transition-colors hover:bg-[#f2f2f2] lg:flex"
            >
              <ArrowRightIcon className="size-4 rotate-180" aria-hidden="true" />
            </button>

            <ul
              ref={trackRef}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] lg:grid lg:grid-cols-4 lg:gap-[27px] lg:overflow-visible [&::-webkit-scrollbar]:hidden"
            >
              {methodologies.items.map((item) => (
                <li key={item.id} className="w-64 shrink-0 snap-start sm:w-72 lg:w-auto">
                  <div
                    className="group relative flex aspect-[380/399] cursor-pointer flex-col justify-end overflow-hidden rounded-[30px] p-[10px] transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:transform-none"
                    style={{ backgroundColor: item.accentColor }}
                  >
                    {item.image && (
                      <div className="absolute inset-x-[10px] bottom-[23.31%] top-[10px] overflow-hidden rounded-[27px] bg-white">
                        <StrapiImage image={item.image} sizes="(min-width: 1024px) 25vw, 50vw" fill className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none" />
                      <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
                      </div>
                    )}
                    <p className="relative z-10 pb-[27px] text-center font-sans text-[18px] font-semibold capitalize leading-[1.15] text-white">{item.title}</p>
                  </div>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Next methodology"
              className="absolute -right-[25px] top-1/2 z-10 hidden size-[45px] -translate-y-1/2 items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-[#0e1626] shadow-md transition-colors hover:bg-[#f2f2f2] lg:flex"
            >
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

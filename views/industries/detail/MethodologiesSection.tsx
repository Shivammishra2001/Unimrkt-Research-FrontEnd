'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Container } from '@/views/ui/Container';
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
    <section className="relative overflow-hidden py-16 text-white sm:py-20 lg:py-24">
      <Image src="/images/industries/detail/methodology-bg.jpg" alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-[#05101a]/85" aria-hidden="true" />
      <Container className="relative">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{methodologies.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-white sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
            {methodologies.heading}
          </h2>
          <p className="mt-4 text-base leading-[1.9] text-white/80">{methodologies.body}</p>
        </div>

        <div className="mt-12 flex items-center gap-4">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous methodology"
            className="hidden size-[45px] shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 lg:flex"
          >
            <ArrowRightIcon className="size-4 rotate-180" aria-hidden="true" />
          </button>

          <ul
            ref={trackRef}
            className="flex flex-1 snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] lg:grid lg:grid-cols-4 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
          >
            {methodologies.items.map((item) => (
              <li key={item.id} className="w-64 shrink-0 snap-start sm:w-72 lg:w-auto">
                <div
                  className="group relative flex aspect-[380/399] flex-col justify-end overflow-hidden rounded-industry p-3 transition-transform hover:-translate-y-1"
                  style={{ backgroundColor: item.accentColor }}
                >
                  {item.image && (
                    <div className="absolute inset-3 bottom-[23%] overflow-hidden rounded-[27px] bg-white">
                      <StrapiImage image={item.image} sizes="(min-width: 1024px) 25vw, 50vw" fill className="object-cover" />
                    </div>
                  )}
                  <p className="relative z-10 px-2 pb-2 font-sans text-lg font-semibold text-white">{item.title}</p>
                </div>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next methodology"
            className="hidden size-[45px] shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 lg:flex"
          >
            <ArrowRightIcon className="size-4" aria-hidden="true" />
          </button>
        </div>
      </Container>
    </section>
  );
}

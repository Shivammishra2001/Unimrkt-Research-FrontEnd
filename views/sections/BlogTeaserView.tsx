'use client';

import { useRef } from 'react';
import { Button } from '@/views/ui/Button';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { geometry } from '@/views/ui/stage';
import type { BlogTeaserModel } from '@/models/domain';

const ARROW_MASK =
  'block size-[18px] bg-white [mask-image:url(/figma-home/arrow-mask.png)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]';
const ARROW_BUTTON =
  'flex size-[45px] items-center justify-center rounded-full bg-[#853449] transition-transform hover:scale-105';

/** blocks.blog-teaser — Figma 267:1502 ("Exploring Market Trends"), a
 * 1900x737 canvas: a 861px gradient panel on the left (eyebrow, Inter
 * heading, prev/next circles), cards overlapping it and bleeding off the
 * right edge as a horizontal scroller, and the CTA centered underneath.
 * From lg up it is scaled with container units (views/ui/stage.ts); below
 * lg it stacks. */
export function BlogTeaserView({ block }: { block: BlogTeaserModel; index: number }) {
  const trackRef = useRef<HTMLUListElement>(null);

  function scrollBy(direction: 1 | -1) {
    const track = trackRef.current;
    const card = track?.querySelector('li');
    if (!track || !card) return;
    const step = card.clientWidth + 34;
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  }

  // Heading breaks after its first word: "Exploring" / "Market Trends".
  const [firstWord, ...restWords] = block.heading.split(' ');

  return (
    <section
      id={block.anchorId}
      className="relative overflow-hidden bg-white text-slate-900 lg:[container-type:inline-size]"
    >
      <div className="relative flex flex-col gap-8 pb-12 lg:block lg:h-[38.7895cqw] lg:pb-0">
        <div
          className="relative overflow-hidden bg-gradient-to-r from-gradient-from to-gradient-to px-6 py-10 text-white sm:px-10 lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:h-[var(--h)] lg:w-[var(--w)] lg:p-0"
          style={geometry({ l: 0, t: 0, w: 861, h: 462 })}
        >
          {/* Same wallpaper-over-gradient treatment as the services band (Figma 267:1505), luminosity @ 20%. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/figma-home/services-gradient-wallpaper.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-luminosity"
          />
          <div
            className="relative lg:absolute lg:left-[var(--l)] lg:top-[var(--t)]"
            style={geometry({ l: 150, t: 145 })}
          >
            {block.eyebrow && (
              <p className="font-nav text-[18px] font-semibold leading-[1.1] text-white lg:text-[length:var(--fs)]" style={geometry({ fs: 18 })}>
                {block.eyebrow}
              </p>
            )}
            {/* Inter, the only non-Montserrat heading on the page. */}
            <h2
              className="mt-2 font-nav text-4xl font-semibold !leading-[1.2] tracking-[-0.0192em] lg:mt-[0.65cqw] lg:text-[length:var(--fs)]"
              style={geometry({ fs: 52 })}
            >
              {firstWord}
              {restWords.length > 0 && (
                <>
                  <br />
                  {restWords.join(' ')}
                </>
              )}
            </h2>
          </div>
          <div
            className="relative mt-8 flex gap-[10px] lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:mt-0"
            style={geometry({ l: 150, t: 322 })}
          >
            <button type="button" onClick={() => scrollBy(-1)} aria-label="Previous post" className={ARROW_BUTTON}>
              <span className={ARROW_MASK} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => scrollBy(1)} aria-label="Next post" className={ARROW_BUTTON}>
              <span className={`${ARROW_MASK} -scale-x-100`} aria-hidden="true" />
            </button>
          </div>
        </div>

        <ul
          ref={trackRef}
          className="relative flex snap-x snap-mandatory gap-[34px] overflow-x-auto scroll-smooth px-4 pb-2 [scrollbar-width:none] sm:px-6 lg:absolute lg:left-[var(--l)] lg:right-0 lg:top-[var(--t)] lg:gap-[1.7895cqw] lg:p-0 [&::-webkit-scrollbar]:hidden"
          style={geometry({ l: 563, t: 120 })}
        >
          {block.posts.map((post) => (
            <li key={post.id} className="w-72 shrink-0 snap-start lg:w-[25.8947cqw]">
              <a
                href={post.href}
                className="block h-full rounded-blog border border-card-border bg-white p-[26px] pt-[29px] shadow-blog lg:aspect-[492/510] lg:rounded-[1.2632cqw] lg:p-[1.3684cqw] lg:pt-[1.5263cqw]"
              >
                <div className="relative aspect-[440/291] overflow-hidden rounded-[24px] bg-slate-100 lg:rounded-[1.2632cqw]">
                  {post.image && (
                    <StrapiImage image={post.image} sizes="(min-width: 1024px) 24vw, 288px" fill className="object-cover" />
                  )}
                </div>
                <div className="mt-5 lg:mt-[1.2cqw] lg:px-[0.2cqw] lg:text-[length:var(--fs)]" style={geometry({ fs: 16 })}>
                  <h3 className="text-[20px] lg:text-[1.25em] font-semibold leading-[1.34] text-ink2 lg:pr-[0.5cqw]">{post.title}</h3>
                  {post.excerpt && (
                    <p className="mt-4 text-[14px] leading-[1.43] text-black opacity-70 lg:mt-[0.9cqw] lg:text-[0.875em]">{post.excerpt}</p>
                  )}
                </div>
              </a>
            </li>
          ))}
        </ul>

        {block.actions.length > 0 && (
          <div
            className="relative flex justify-center px-4 lg:absolute lg:left-0 lg:right-0 lg:top-[var(--t)] lg:px-0"
            style={geometry({ t: 686 })}
          >
            {block.actions.map((action) => (
              <Button key={action.id} link={action} variant={action.variant} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

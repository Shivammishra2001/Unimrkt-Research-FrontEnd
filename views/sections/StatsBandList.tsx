'use client';

import { useRef, useState } from 'react';
import type { FocusEvent, KeyboardEvent, PointerEvent } from 'react';
import { Reveal } from '@/views/ui/Reveal';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { StatItemModel } from '@/models/domain';

// One timing for every animated layer so they move as a single state change.
const EASE = 'duration-[350ms] ease-in-out motion-reduce:transition-none';

/** Interactive rows for blocks.stats-band — Figma 268:3667 ("Component 178"
 * variants). The base variant has every row collapsed; hovering (mouse),
 * focusing (keyboard) or tapping (touch) a row switches to that row's
 * expanded variant: numeral goes gray -> maroon/red gradient, the wave
 * texture fades in, and the label, description and photo fade/slide in.
 *
 * In Figma every variant keeps all three rows at 232px, so on lg+ the row
 * height is fixed and only opacity/transform animate — siblings never move.
 * Below lg the rows stack naturally, so description + photo open with a
 * `grid-template-rows: 0fr -> 1fr` transition instead of snapping. */
export function StatsBandList({ items }: { items: StatItemModel[] }) {
  const [active, setActive] = useState<number | null>(null);
  // Touch taps also emit mouse-compat events; only a real mouse drives hover.
  const pointerType = useRef<string>('mouse');

  const toggle = (i: number) => setActive((cur) => (cur === i ? null : i));

  return (
    <div
      onPointerLeave={(e: PointerEvent) => {
        if (e.pointerType === 'mouse') setActive(null);
      }}
      onBlur={(e: FocusEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setActive(null);
      }}
    >
      {items.map((item, i) => {
        const isActive = active === i;
        return (
          <Reveal key={item.id} delay={i * 0.1}>
            <div
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
              onPointerDown={(e) => {
                pointerType.current = e.pointerType;
              }}
              onPointerEnter={(e) => {
                if (e.pointerType === 'mouse') setActive(i);
              }}
              onClick={() => {
                if (pointerType.current !== 'mouse') toggle(i);
              }}
              onFocus={(e) => {
                // Pointer focus (tap/click) is handled by onClick/hover; only
                // keyboard focus expands here, or a tap would open then close.
                if (e.currentTarget.matches(':focus-visible')) setActive(i);
              }}
              onKeyDown={(e: KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggle(i);
                }
              }}
              className={`relative cursor-default overflow-hidden py-6 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-600/40 lg:h-[232px] lg:py-0 lg:pl-[31px] lg:pt-[57px] ${i > 0 ? 'border-t-[3px] border-stat-divider' : ''}`}
            >
              {/* Row background — Figma 268:3716 mask group rendered as-is
                  (white wave at 70% + 106px white edge fades), 1429x232. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/figma-home/stats-wave.png"
                alt=""
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 size-full object-cover transition-opacity ${EASE} ${isActive ? 'opacity-100' : 'opacity-0'}`}
              />

              {/* Numeral + label: lifts 14px when expanded (Figma cap-top
                  98 -> 84), label 15px under the numeral. The label's space
                  is always reserved, so revealing it never changes height. */}
              <div className={`relative transition-transform ${EASE} ${isActive ? 'lg:-translate-y-[14px]' : ''}`}>
                <div className="relative w-fit origin-left whitespace-nowrap font-display text-[clamp(3rem,7.4vw,140px)] uppercase leading-[0.85] tracking-[1px] lg:scale-x-[0.815]">
                  <p className="text-stat-number">{item.value}</p>
                  {/* Glyphs overflow the 0.85 line box; the equal negative
                      inset + padding grows the gradient's paint area to cover
                      them without moving the text. */}
                  <p
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-[0.2em] -top-[0.2em] py-[0.2em] bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent transition-opacity ${EASE} ${isActive ? 'opacity-100' : 'opacity-0'}`}
                  >
                    {item.value}
                  </p>
                </div>
                <p
                  className={`mt-[10px] font-sans text-base font-semibold capitalize leading-[1.2] text-heading transition-[opacity,transform] lg:text-[18px] ${EASE} ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
                >
                  {item.label}
                </p>
              </div>

              {(item.description || item.image) && (
                <div
                  className={`grid transition-[grid-template-rows] lg:contents ${EASE} ${isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="min-h-0 overflow-hidden lg:contents">
                    <div className="relative flex flex-col gap-4 pt-4 lg:contents">
                      {item.description && (
                        // Figma 268:3721: x617 of 1429, w362, vertically centred.
                        <div className="lg:absolute lg:inset-y-0 lg:left-[43.18%] lg:flex lg:w-[25.33%] lg:items-center">
                          <p
                            className={`font-sans text-base font-normal leading-[1.9] text-heading/80 transition-[opacity,transform] ${EASE} ${isActive ? 'translate-x-0 opacity-100' : 'translate-x-3 opacity-0'}`}
                          >
                            {item.description}
                          </p>
                        </div>
                      )}
                      {item.image && (
                        // Figma 268:3722: 330.64x176, 41.4px from the right edge, vertically centred.
                        <div className="lg:absolute lg:inset-y-0 lg:right-[2.9%] lg:flex lg:w-[23.14%] lg:items-center">
                          <div
                            className={`relative aspect-[330.64/176] w-full max-w-[331px] overflow-hidden transition-[opacity,transform] lg:max-w-none ${EASE} ${isActive ? 'translate-x-0 opacity-100 delay-[60ms]' : 'translate-x-3 opacity-0'}`}
                          >
                            <StrapiImage
                              image={item.image}
                              sizes="(min-width: 1024px) 23vw, 331px"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

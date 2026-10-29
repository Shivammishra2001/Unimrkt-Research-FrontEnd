'use client';

import { useRef, useState } from 'react';
import { Button } from '@/views/ui/Button';
import { LoopingVideo } from '@/views/ui/LoopingVideo';
import { SendArrowIcon } from '@/views/ui/icons/SendArrowIcon';
import type { CSSProperties } from 'react';
import { cq, geometry } from '@/views/ui/stage';
import type { ServiceBandModel } from '@/models/domain';

/** Design canvas of Figma 267:3472 (Component 176): 1900 x 657. Text tops below are
 * line-box tops: Figma's trimmed cap-height tops minus the half-leading. */
const CANVAS_H = 657;

const ABS = 'xl:absolute xl:left-[var(--l)] xl:top-[var(--t)] xl:w-[var(--w)]';

/** Card x positions on the canvas: one left of the gradient panel, three right of it. */
const CARD_LEFT = [11, 874, 1217, 1560] as const;
const PANEL = { l: 354, w: 510 } as const;
/** Active-state card height on the 1900px canvas (resting is 155). */
const EXPANDED_H = 250;

/** blocks.service-band — Figma 267:3472. A dark photo band with a gradient
 * highlight panel in the middle and four frosted-glass service cards sitting
 * flush along the bottom edge. From xl up the band is a fixed 1900x657
 * composition scaled with container units (see `cq`); below xl it stacks.
 * This component has no `theme` field on its Strapi schema — it is always
 * dark, unconditionally, never driven by block.theme. */
export function ServiceBandView({ block }: { block: ServiceBandModel; index: number }) {
  // Expanded card — driven by state (hover, focus, tap, click) so it also works where CSS :hover
  // does not (touch screens, DevTools device emulation); CSS :hover stays as the base behaviour.
  const [active, setActive] = useState<number | null>(null);
  const pointer = useRef<{ type: string; wasActive: boolean }>({ type: 'mouse', wasActive: false });
  return (
    <section
      id={block.anchorId}
      className="relative overflow-hidden bg-[#0b0c0e] text-white xl:[container-type:inline-size]"
    >
      {block.background && (
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center xl:[background-position:-5.42cqw_-6.68cqw] xl:[background-size:154.84cqw_auto]"
          style={{ backgroundImage: `url(${block.background.src})` }}
          aria-hidden="true"
        />
      )}
      {block.backgroundVideo && (
        <LoopingVideo
          sources={[{ src: block.backgroundVideo, type: 'video/mp4' }]}
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
        />
      )}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[#010913]/60" aria-hidden="true" />
      <div className="relative z-10 px-4 py-16 sm:px-6 sm:py-20 xl:h-[34.5789cqw] xl:p-0">
        <div className="grid gap-6 md:grid-cols-2 md:items-end lg:grid-cols-4 xl:block">
          <div
            className={`relative overflow-hidden bg-gradient-to-r from-gradient-from to-gradient-to p-8 md:col-span-2 lg:col-span-4 xl:h-[var(--h)] xl:p-0 ${ABS}`}
            style={geometry({ l: PANEL.l, t: 0, w: PANEL.w, h: CANVAS_H })}
          >
            {/* Figma 267:3128: wallpaper blended over the panel, luminosity @ 30%. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma-home/services-gradient-wallpaper.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-luminosity"
            />
            <h2
              className="relative text-3xl font-semibold capitalize !leading-[1.15] tracking-[-0.0208em] text-white sm:text-4xl xl:absolute xl:left-[var(--l)] xl:top-[var(--t)] xl:w-[var(--w)] xl:text-[length:var(--fs)]"
              style={geometry({ l: 64, t: 113, w: 368, fs: 48 })}
            >
              {block.heading}
            </h2>
            {block.body && (
              <p
                className="relative mt-4 text-base font-medium leading-[1.9] text-white/90 xl:absolute xl:left-[var(--l)] xl:top-[var(--t)] xl:mt-0 xl:w-[var(--w)] xl:text-[length:var(--fs)]"
                style={geometry({ l: 64, t: 289, w: 368, fs: 16 })}
              >
                {block.body}
              </p>
            )}
            {block.cta && (
              <div className="relative mt-6 xl:absolute xl:left-[var(--l)] xl:top-[var(--t)] xl:mt-0" style={geometry({ l: 64, t: 482 })}>
                <Button link={block.cta} variant={block.cta.variant} />
              </div>
            )}
          </div>
          {block.items.map((item, i) => (
            <a
              key={item.id}
              href={item.href}
              data-active={active === i}
              onPointerDown={(e) => {
                pointer.current = { type: e.pointerType, wasActive: active === i };
                setActive(i);
              }}
              onMouseEnter={() => {
                // Touch taps replay mouse events; only a real pointer hovers.
                if (pointer.current.type !== 'touch') setActive(i);
              }}
              onPointerLeave={(e) => {
                if (e.pointerType === 'mouse') setActive(null);
              }}
              onFocus={() => setActive(i)}
              onClick={(e) => {
                // First tap on a touch screen (or DevTools touch emulation) opens the card;
                // a second tap follows the link.
                if (pointer.current.type === 'touch' && !pointer.current.wasActive) e.preventDefault();
                setActive(i);
              }}
              // Resting geometry is Figma 267:3472 (331x155, flush with the band's bottom edge).
              // The hover/active expansion is not drawn in Figma: the card grows upward (bottom
              // anchored) to EXPANDED_H, the title stays at the card's top, the description
              // fades/slides in and the arrow swaps to the red active button.
              className="group pointer-events-auto relative z-10 flex cursor-pointer min-h-[155px] flex-col justify-end gap-3 md:min-h-[172px] xl:min-h-[155px] rounded-t-[5px] bg-[#160415]/50 p-6 backdrop-blur-glass xl:absolute xl:bottom-[0.0526cqw] xl:left-[var(--l)] xl:h-[var(--h)] xl:w-[var(--w)] xl:p-0 xl:transition-[height] xl:duration-300 xl:ease-in-out xl:hover:h-[var(--hx)] xl:data-[active=true]:h-[var(--hx)] xl:focus-visible:h-[var(--hx)] motion-reduce:transition-none"
              style={{
                ...geometry({ l: CARD_LEFT[i] ?? CARD_LEFT[CARD_LEFT.length - 1], w: 331, h: 155 }),
                '--hx': cq(EXPANDED_H),
              } as CSSProperties}
            >
              <span className="absolute inset-0 rounded-t-[5px] bg-white/[0.07] backdrop-blur-[12px]" aria-hidden="true" />
              <h3
                className="relative font-nav text-[21px] font-semibold capitalize leading-[1.24] text-white xl:absolute xl:left-[var(--l)] xl:top-[var(--t)] xl:text-[length:var(--fs)]"
                style={geometry({ l: 40, t: 27, fs: 21 })}
              >
                {item.label}
              </h3>
              {item.description && (
                <p
                  className="relative text-sm font-medium leading-[1.6] text-white/80 transition-[opacity,transform,max-height] duration-300 ease-in-out motion-reduce:transition-none [@media(hover:hover)]:md:max-h-0 [@media(hover:hover)]:md:overflow-hidden [@media(hover:hover)]:md:opacity-0 [@media(hover:hover)]:md:group-hover:max-h-40 [@media(hover:hover)]:md:group-data-[active=true]:max-h-40 [@media(hover:hover)]:md:group-hover:opacity-100 [@media(hover:hover)]:md:group-data-[active=true]:opacity-100 [@media(hover:hover)]:md:group-focus-visible:max-h-40 [@media(hover:hover)]:md:group-focus-visible:opacity-100 [@media(hover:hover)]:xl:max-h-none [@media(hover:hover)]:xl:overflow-visible lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:group-hover:max-h-40 lg:group-data-[active=true]:max-h-40 lg:group-hover:opacity-100 lg:group-data-[active=true]:opacity-100 lg:group-focus-visible:max-h-40 lg:group-focus-visible:opacity-100 xl:max-h-none xl:overflow-visible xl:pointer-events-none xl:absolute xl:left-[var(--l)] xl:top-[var(--t)] xl:w-[var(--w)] xl:translate-y-2 xl:text-[length:var(--fs)] xl:opacity-0 xl:group-hover:translate-y-0 xl:group-data-[active=true]:translate-y-0 xl:group-hover:opacity-100 xl:group-data-[active=true]:opacity-100 xl:group-focus-visible:translate-y-0 xl:group-focus-visible:opacity-100"
                  style={geometry({ l: 40, t: 70, w: 251, fs: 14 })}
                >
                  {item.description}
                </p>
              )}
              <span
                className="relative flex size-11 items-center justify-center rounded-[17px] bg-white/[0.04] transition-[background-color,box-shadow] duration-300 ease-in-out group-hover:bg-[#cc1f1f] group-data-[active=true]:bg-[#cc1f1f] group-hover:shadow-[0_0_24px_rgba(204,31,31,0.65)] group-data-[active=true]:shadow-[0_0_24px_rgba(204,31,31,0.65)] group-focus-visible:bg-[#cc1f1f] group-focus-visible:shadow-[0_0_24px_rgba(204,31,31,0.65)] xl:absolute xl:bottom-[var(--b)] xl:left-[var(--l)] xl:size-[var(--w)]"
                style={{ ...geometry({ l: 40, w: 44 }), '--b': cq(18) } as CSSProperties}
              >
                {/* Authored pointing up-right; a 45deg turn makes it a right arrow when active. */}
                <SendArrowIcon
                  className="size-[48%] transition-transform duration-300 ease-in-out group-hover:rotate-45 group-data-[active=true]:rotate-45 group-focus-visible:rotate-45 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

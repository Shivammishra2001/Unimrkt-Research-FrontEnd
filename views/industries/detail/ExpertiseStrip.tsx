'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ScrollCards } from './ScrollCards';
import { DetailCardIcon } from '@/views/ui/detail/DetailCardIcon';
import type { ResolvedIndustryDetail } from './fallback';

/** "Our Expertise" — Figma node 384:6453-6473 (y2378-3316). A #f7f7f4 band with the wave
 * raster over it at 6% (luminosity); the five 349x520 cards (`border-[#e0e0df]`, r24, 6/6/54
 * shadow) slide off the right edge of the frame at 1700px+; below that a whole number of cards fits
 * the view (1/2/3/4 at base/md/lg/xl). The 3-dot pager (#b63a40 pill) sits below.
 * Each card's `description` is its sub-service list (one per line). Card 01 opens by default; hovering / focusing /
 * tapping another card with a list switches to it (widens to 366/560px, fades the list in). Leaving the strip with a
 * mouse returns to card 01 (or the first visible card of the current page); touch keeps the last tapped card. Cards
 * without a list stay as drawn. CMS-first, template-fallback — always renders, never collapses. */
function parseSubServices(text?: string): string[] {
  return (text ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

const FIGMA_ICONS: Record<string, string> = {
  mobility: '/icons/industries/expertise/mobility.svg',
  factory: '/icons/industries/expertise/manufacturing.svg',
  bike: '/icons/industries/expertise/two-wheeler.svg',
  cpu: '/icons/industries/expertise/technology.svg',
  package: '/icons/industries/expertise/accessories.svg',
};

function CheckIcon() {
  // Solid red disc with a white tick (the open-card checklist badge).
  return (
    <span className="flex size-[22px] shrink-0 items-center justify-center rounded-full bg-[#A6192E] text-white" aria-hidden="true">
      <svg className="size-3 stroke-[2.8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

/** Desktop pointer (hover-capable, lg+): leaving the strip returns to the default card. Touch keeps the last tapped one. */
const canHover = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (min-width: 1024px)').matches;

export function ExpertiseStrip({ expertise }: { expertise: ResolvedIndustryDetail['expertise'] }) {
  // Card 01 (the first card that has a checklist) starts open, so visitors see the expanded state straight away.
  const defaultIndex = expertise.items.findIndex((item) => parseSubServices(item.description).length > 0);
  const [active, setActive] = useState<number | null>(defaultIndex >= 0 ? defaultIndex : null);
  const heading = expertise.heading;

  /** The first card (with a checklist) whose left edge is inside the track's view — the "default" card for the page
   * the row is currently scrolled to. On the first page that is card 01, and the row is put back at its start. */
  function openFirstVisible(track: HTMLUListElement) {
    const max = track.scrollWidth - track.clientWidth;
    if (max <= 1 || track.scrollLeft <= max / 4) {
      if (track.scrollLeft > 1) track.scrollTo({ left: 0, behavior: 'smooth' });
      setActive(defaultIndex >= 0 ? defaultIndex : null);
      return;
    }
    const left = track.getBoundingClientRect().left + parseFloat(getComputedStyle(track).paddingLeft);
    const cards = Array.from(track.children) as HTMLElement[];
    const i = cards.findIndex((li, idx) => li.getBoundingClientRect().left >= left - 4 && parseSubServices(expertise.items[idx]?.description).length > 0);
    if (i >= 0) setActive(i);
  }

  // Opening a card near the right edge widens it past the view; slide the track just enough to keep the whole open
  // card visible — once now (towards its predicted final width) and once after the 700ms width tween settles.
  function openCard(i: number, li: HTMLElement, wide: boolean) {
    setActive(i);
    const track = li.parentElement;
    if (!track) return;
    const reveal = (finalWidth?: number) => {
      const t = track.getBoundingClientRect();
      const cs = getComputedStyle(track);
      const contentLeft = t.left + parseFloat(cs.paddingLeft);
      const contentRight = t.right - parseFloat(cs.paddingRight);
      const r = li.getBoundingClientRect();
      const right = r.left + (finalWidth ?? r.width);
      const delta = right > contentRight ? right - contentRight : r.left < contentLeft ? r.left - contentLeft : 0;
      if (Math.abs(delta) > 1) track.scrollBy({ left: delta, behavior: 'smooth' });
    };
    const contentWidth = track.clientWidth - parseFloat(getComputedStyle(track).paddingLeft) - parseFloat(getComputedStyle(track).paddingRight);
    reveal(Math.max(li.getBoundingClientRect().width, Math.min(wide ? 560 : 366, contentWidth)));
    window.setTimeout(() => reveal(), 720);
  }

  return (
    <section className="relative overflow-hidden bg-[#f7f7f4] py-16 sm:py-20 lg:py-10">
      <Image
        src="/images/industries/detail/expertise-wave-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none object-cover opacity-[0.06] mix-blend-luminosity"
      />
      <div className="relative">
        <header className="mx-auto px-4 text-center">
          <p className="font-sans text-[13px] font-bold uppercase leading-[1.2] tracking-[3px] text-[#cc1f1f]">{expertise.eyebrow}</p>
          <h2
            className={`mx-auto mt-2.5 font-sans text-3xl font-semibold capitalize leading-[1.2] text-[#02060e] [text-wrap:balance] sm:text-4xl lg:tracking-[-3px] ${
              heading.length > 48 ? 'max-w-[900px] lg:text-[40px] lg:leading-[1.2]' : 'max-w-[640px] lg:text-[50px] lg:leading-[1.2]'
            }`}
          >
            {heading}
          </h2>
        </header>

        <div
          className="mt-10 lg:mt-9"
          onMouseLeave={(e) => {
            const track = e.currentTarget.querySelector('ul');
            if (track && canHover()) openFirstVisible(track);
          }}
        >
          <ScrollCards label="Expertise areas" onPage={(_, track) => openFirstVisible(track)}>
            {expertise.items.map((item, i) => {
              const services = parseSubServices(item.description);
              const hasList = services.length > 0;
              const isOpen = hasList && active === i;
              const wide = services.length > 4;
              return (
                <li
                  key={item.id}
                  // --card-w: a whole number of cards per view (1 base / 2 md / 3 lg / 4 xl, 32px gaps), sized from the
                  // track's own content box (not vw, which counts the scrollbar) so no card is cut at the right edge.
                  // At 1700px+ the Figma 349px cards bleed off the frame again. An open card never shrinks below it.
                  className="shrink-0 transition-[width] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[width] [--card-w:100%] md:[--card-w:calc((100%_-_32px)/2)] lg:[--card-w:calc((100%_-_64px)/3)] xl:[--card-w:calc((100%_-_96px)/4)] min-[1700px]:[--card-w:349px]"
                  style={{ width: isOpen && wide ? 'max(var(--card-w), min(560px, 100%))' : isOpen ? 'max(var(--card-w), min(366px, 100%))' : 'var(--card-w)' }}
                  onMouseEnter={(e) => hasList && active !== i && openCard(i, e.currentTarget, wide)}
                >
                  <div
                    role={hasList ? 'button' : undefined}
                    tabIndex={hasList ? 0 : undefined}
                    aria-expanded={hasList ? isOpen : undefined}
                    onFocus={(e) => hasList && active !== i && e.currentTarget.parentElement && openCard(i, e.currentTarget.parentElement, wide)}
                    // One card is always open: tapping / pressing a closed card switches to it; the open card stays open.
                    onClick={(e) => {
                      if (hasList && active !== i && e.currentTarget.parentElement) openCard(i, e.currentTarget.parentElement, wide);
                    }}
                    onKeyDown={(e) => {
                      if (hasList && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        if (active !== i && e.currentTarget.parentElement) openCard(i, e.currentTarget.parentElement, wide);
                      }
                    }}
                    // Phones: the card may grow past 520px so a long single-column checklist is never cut off.
                    className={`group relative flex min-h-[520px] transform-gpu sm:h-[520px] cursor-pointer flex-col overflow-hidden border px-[31px] pb-[40px] pt-[36px] ${isOpen ? '!px-9 !pb-10 !pt-10' : ''} transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen
                        ? 'rounded-[32px] border-[#F7D8DC]/60 bg-[linear-gradient(180deg,#FFFFFF_0%,#FFF8F8_60%,#FDF0F1_100%)] shadow-[0px_20px_45px_-10px_rgba(166,25,46,0.08),0px_8px_20px_-5px_rgba(0,0,0,0.04)]'
                        : 'rounded-[24px] border-[#e0e0df] bg-white shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:shadow-xl'
                    }`}
                  >
                    <p className="font-sans text-[66px] font-semibold capitalize leading-[1.2] tracking-[-1px] text-[#02060e] opacity-15">
                      {String(i + 1).padStart(2, '0')}.
                    </p>
                    {/* Spacer pushes the icon/title to the card bottom when collapsed and to the top when open; flex-grow tweens the rise smoothly. */}
                    <div
                      aria-hidden="true"
                      className="shrink-0 transition-[flex-grow,height] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[flex-grow,height]"
                      style={{ flexGrow: isOpen ? 0 : 1, height: isOpen ? 24 : 0 }}
                    />
                    <div className="flex flex-col">
                      {/* Icon stays stacked above the title in both states — no flex-direction swap, so nothing snaps horizontally. */}
                      <div className="flex flex-col gap-[18px]">
                        {!item.icon && item.iconIdentifier && FIGMA_ICONS[item.iconIdentifier] ? (
                          // The exact pictograms drawn in Figma 384:6457 (exported SVGs); an uploaded icon always wins.
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={FIGMA_ICONS[item.iconIdentifier]}
                            alt=""
                            width={60}
                            height={60}
                            className="size-[60px] shrink-0 transform-gpu transition-transform duration-300 group-hover:scale-110"
                          />
                        ) : (
                          <DetailCardIcon
                            icon={item.icon}
                            iconIdentifier={item.iconIdentifier}
                            className="size-[60px] shrink-0 transform-gpu text-[#02060e] transition-transform duration-300 group-hover:scale-110"
                          />
                        )}
                        <p className="font-sans text-[22px] font-semibold capitalize leading-[1.3] tracking-[-1px] text-[#02060e]">{item.title}</p>
                      </div>
                      {hasList && (
                        // grid-rows 0fr->1fr tweens to the list's exact height (no max-height overshoot); the inner wrapper keeps a
                        // fixed width so the checklist is laid out once and never reflows/squishes while the card width animates.
                        <div
                          className={`grid transition-[grid-template-rows,opacity,transform] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            isOpen
                              ? 'grid-rows-[1fr] translate-y-0 opacity-100 duration-500 delay-150'
                              : 'grid-rows-[0fr] translate-y-2 opacity-0 duration-300'
                          }`}
                        >
                          <div className="overflow-hidden">
                            <ul
                              className={`grid gap-x-6 gap-y-4 pt-5 ${services.length > 4 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}
                              style={{ width: services.length > 4 ? 'min(488px, calc(100vw - 32px - 72px))' : 'min(294px, calc(100vw - 32px - 72px))' }}
                            >
                              {services.map((s) => (
                                <li key={s} className="flex items-center gap-3.5 font-sans text-[14px] font-semibold leading-snug tracking-tight text-[#02060e]">
                                  <CheckIcon />
                                  {s}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ScrollCards>
        </div>
      </div>
    </section>
  );
}

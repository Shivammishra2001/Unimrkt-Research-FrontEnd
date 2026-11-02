'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ScrollCards } from './ScrollCards';
import { DetailCardIcon } from '@/views/ui/detail/DetailCardIcon';
import type { ResolvedIndustryDetail } from './fallback';

/** "Our Expertise" — Figma node 384:6453-6473 (y2378-3316). A #f7f7f4 band with the wave
 * raster over it at 6% (luminosity); the five 349x520 cards (`border-[#e0e0df]`, r24, 6/6/54
 * shadow) slide off the right edge of the frame, with the 3-dot pager (#b63a40 pill) below.
 * Each card's `description` is its sub-service list (one per line): hovering / focusing /
 * tapping a card with a list widens it to 540px and fades the list in; cards without a list
 * stay as drawn. CMS-first, template-fallback — always renders, never collapses. */
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

export function ExpertiseStrip({ expertise }: { expertise: ResolvedIndustryDetail['expertise'] }) {
  // Closed by default: every card starts collapsed and only the hovered / focused / tapped one opens.
  const [active, setActive] = useState<number | null>(null);
  const heading = expertise.heading;

  return (
    <section className="relative overflow-hidden bg-[#f7f7f4] py-16 sm:py-20 lg:min-h-[938px] lg:pb-[74px] lg:pt-[91px]">
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

        <div className="mt-10 lg:mt-9">
          <ScrollCards label="Expertise areas">
            {expertise.items.map((item, i) => {
              const services = parseSubServices(item.description);
              const hasList = services.length > 0;
              const open = hasList && active === i;
              return (
                <li
                  key={item.id}
                  className="shrink-0 transition-[width] duration-500 ease-in-out motion-reduce:transition-none"
                  style={{ width: open && services.length > 4 ? 'min(560px, 88vw)' : open ? 'min(366px, 86vw)' : 'min(349px, 78vw)' }}
                  onMouseEnter={() => hasList && setActive(i)}
                  onMouseLeave={() => setActive(null)}
                >
                  <div
                    role={hasList ? 'button' : undefined}
                    tabIndex={hasList ? 0 : undefined}
                    aria-expanded={hasList ? open : undefined}
                    onFocus={() => hasList && setActive(i)}
                    onBlur={() => setActive(null)}
                    onClick={() => hasList && setActive(active === i ? null : i)}
                    onKeyDown={(e) => {
                      if (hasList && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        setActive(active === i ? null : i);
                      }
                    }}
                    className={`group relative flex h-[520px] cursor-pointer flex-col overflow-hidden border px-[31px] pb-[40px] pt-[36px] ${open ? '!px-9 !pb-10 !pt-10' : ''} transition-all duration-500 ease-in-out motion-reduce:transition-none ${
                      open
                        ? 'rounded-[32px] border-[#F7D8DC]/60 bg-[linear-gradient(180deg,#FFFFFF_0%,#FFF8F8_60%,#FDF0F1_100%)] shadow-[0px_20px_45px_-10px_rgba(166,25,46,0.08),0px_8px_20px_-5px_rgba(0,0,0,0.04)]'
                        : 'rounded-[24px] border-[#e0e0df] bg-white shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:shadow-xl'
                    }`}
                  >
                    <p className="font-sans text-[66px] font-semibold capitalize leading-[1.2] tracking-[-1px] text-[#02060e] opacity-15">
                      {String(i + 1).padStart(2, '0')}.
                    </p>
                    <div
                      aria-hidden="true"
                      className="shrink-0 transition-[flex-grow,height] duration-500 ease-in-out motion-reduce:transition-none"
                      style={{ flexGrow: open ? 0 : 1, height: open ? 24 : 0 }}
                    />
                    <div className="flex flex-col">
                      <div className={`flex ${open ? 'items-center gap-4' : 'flex-col gap-[18px]'}`}>
                        {!item.icon && item.iconIdentifier && FIGMA_ICONS[item.iconIdentifier] ? (
                          // The exact pictograms drawn in Figma 384:6457 (exported SVGs); an uploaded icon always wins.
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={FIGMA_ICONS[item.iconIdentifier]}
                            alt=""
                            width={60}
                            height={60}
                            className="size-[60px] shrink-0 transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none"
                          />
                        ) : (
                          <DetailCardIcon
                            icon={item.icon}
                            iconIdentifier={item.iconIdentifier}
                            className="size-[60px] shrink-0 text-[#02060e] transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none"
                          />
                        )}
                        <p className="font-sans text-[22px] font-semibold capitalize leading-[1.3] tracking-[-1px] text-[#02060e]">{item.title}</p>
                      </div>
                      {hasList && (
                        <ul
                          className={`grid gap-x-6 gap-y-4 overflow-hidden transition-all duration-500 ease-in-out motion-reduce:transition-none ${
                            services.length > 4 ? 'grid-cols-2' : 'grid-cols-1'
                          } ${
                            open ? 'mt-5 max-h-[280px] opacity-100 delay-150' : 'mt-0 max-h-0 opacity-0'
                          }`}
                        >
                          {services.map((s) => (
                            <li key={s} className="flex items-center gap-3.5 font-sans text-[14px] font-semibold leading-snug tracking-tight text-[#02060e]">
                              <CheckIcon />
                              {s}
                            </li>
                          ))}
                        </ul>
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

'use client';

import { useState } from 'react';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { OfficeMap } from './OfficeMap';
import type { ResolvedContact } from './fallback';

type Office = ResolvedContact['office']['items'][number];
type Landmark = 'liberty' | 'bigben';

/** Simple single-colour monument silhouettes for the offices Figma has no artwork for (the node only draws India Gate). */
function LandmarkSilhouette({ kind, className, style }: { kind: Landmark; className?: string; style?: React.CSSProperties }) {
  if (kind === 'bigben') {
    return (
      <svg viewBox="0 0 60 140" fill="currentColor" className={className} style={style} aria-hidden="true">
        <path d="M30 0l7 34H23z" />
        <path d="M21 36h18v8H21zM19 44h22v76H19z" />
        <circle cx="30" cy="62" r="9" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M30 56v6l4 2" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M14 120h32v20H14z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 90 140" fill="currentColor" className={className} style={style} aria-hidden="true">
        <path d="M71 2c5 6 4 11 0 14-4-3-5-8 0-14z" />
        <path d="M66 15h10v7H66z" />
        <path d="M57 54l6-3 9-29-7-2z" />
        <circle cx="44" cy="39" r="8" />
        <path d="M33 33l-8-6M37 29l-4-9M44 27v-11M51 29l4-9M55 33l8-6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M35 48h18l6 14 8 50H21l8-50z" />
        <path d="M12 112h66v10H12zM20 122h50v18H20z" />
      </svg>
  );
}

const LANDMARK: Record<string, Landmark | undefined> = {
  'united states of america': 'liberty',
  'united kingdom': 'bigben',
};

/** Office card — Figma 640:11429 (active: #6c2a4a -> #be2c28, white text/icons, faded monument) and 1008:44974 (inactive:
 * white, 1px #e0e0df, 6/6/54 shadow, #04264e title, 70% black copy, red icons). Crossfades between the two over 300ms. */
function OfficeCard({ office, active, onActivate }: { office: Office; active: boolean; onActivate: () => void }) {
  const icon = (name: 'loc' | 'sms' | 'call') => `/figma-contact/${name}-${active ? 'white' : 'red'}.svg`;
  const text = active ? 'text-white' : 'text-black/70';
  const kind = LANDMARK[office.name.toLowerCase()];

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={active}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onActivate();
        }
      }}
      className="relative cursor-pointer overflow-hidden rounded-[24px] border border-[#e0e0df] bg-white px-5 py-8 shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] outline-none focus-visible:ring-2 focus-visible:ring-brand-600 sm:px-[37px] lg:h-[223px] lg:py-[36px]"
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-[#6c2a4a] to-[#be2c28] transition-opacity duration-300 ease-in-out motion-reduce:transition-none ${active ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden="true"
      />
      {office.image && (
        <StrapiImage
          image={office.image}
          sizes="645px"
          fill
          className={`object-cover mix-blend-luminosity transition-opacity duration-300 ease-in-out motion-reduce:transition-none ${active ? 'opacity-[0.16]' : 'opacity-0'}`}
        />
      )}
      {!office.image && kind && (
        <LandmarkSilhouette
          kind={kind}
          className={`pointer-events-none absolute bottom-0 right-6 h-[88%] w-auto text-white transition-opacity duration-300 ease-in-out motion-reduce:transition-none ${active ? 'opacity-[0.16]' : 'opacity-0'}`}
        />
      )}
      <div className="relative flex flex-col gap-[22px]">
        <p className={`font-sans text-[22px] font-semibold leading-[1.34] tracking-[-1px] transition-colors duration-300 motion-reduce:transition-none [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] ${active ? 'text-white' : 'text-[#04264e]'}`}>
          {office.name}
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-[14px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={icon('loc')} alt="" width={24} height={24} className="size-6 shrink-0" />
            <p className={`max-w-[533px] font-sans text-[16px] font-normal leading-[1.4] transition-colors duration-300 motion-reduce:transition-none ${text} [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]`}>{office.address}</p>
          </div>
          <div className="flex items-center gap-[14px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={icon('sms')} alt="" width={24} height={24} className="size-6 shrink-0" />
            <p className={`font-sans text-[16px] font-normal leading-[1.4] transition-colors duration-300 motion-reduce:transition-none ${text} [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]`}>{office.email}</p>
          </div>
          <div className="flex items-center gap-[14px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={icon('call')} alt="" width={24} height={24} className="size-6 shrink-0" />
            <p className={`font-sans text-[16px] font-normal leading-[1.4] transition-colors duration-300 motion-reduce:transition-none ${text} [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]`}>
              {office.phoneLabel && <span className="font-semibold">{office.phoneLabel} </span>}
              {office.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * "Our Presence" — Figma 637:10433 (y1225-2343). 13px #cc1f1f eyebrow (cap-top +73), 52px/-3px title, then a 1740x868 r40
 * map panel (#d9d9d9, 1px #e5e5e5) holding the three 645px office cards at (90, 74) with 21px between. Hovering, focusing or
 * tapping a card makes it the active (gradient) card and moves the map pin to that office; India starts active, as drawn.
 * The map is a real Leaflet map (CARTO light tiles) that flies between the offices instead of the node's static vector map;
 * only the India card/pin states and the India Gate artwork are Figma's — the USA/UK pins and monument silhouettes are added here.
 * CMS-first, template-fallback — always renders. */
export function ContactPresence({ office }: { office: ResolvedContact['office'] }) {
  const initial = (office.items.find((o) => o.featured) ?? office.items[0])?.id;
  const [activeId, setActiveId] = useState<string | undefined>(initial);

  return (
    <section className="relative overflow-hidden bg-white px-4 pb-14 pt-14 sm:px-6 lg:pb-[64px] lg:pt-[73px]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[999px] bg-[length:1900px_1411px] bg-[position:center_top] bg-repeat"
        style={{ backgroundImage: "url('/images/gallery/wave-pattern.png')" }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-x-0 top-[422px] h-[577px] bg-gradient-to-b from-white/0 to-white" aria-hidden="true" />

      <div className="relative text-center">
        <p className="font-sans text-[13px] font-bold uppercase leading-[1.2] tracking-[3px] text-[#cc1f1f] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
          {office.eyebrow}
        </p>
        <h2 className="mt-[19px] font-sans text-[34px] font-semibold capitalize leading-[1.2] tracking-[-1.5px] text-[#02060e] sm:text-[42px] lg:text-[52px] lg:tracking-[-3px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
          {office.heading}
        </h2>
      </div>

      <div className="relative mx-auto mt-10 max-w-[1740px] overflow-hidden rounded-[24px] border border-[#e5e5e5] bg-[#d9d9d9] p-4 sm:p-6 lg:mt-[49px] lg:h-[868px] lg:rounded-[40px] lg:p-0">
        <div className="relative z-10 flex flex-col gap-[21px] lg:absolute lg:left-[5.17%] lg:top-[74px] lg:w-[645px] lg:max-w-[37.07%]">
          {office.items.map((item) => (
            <OfficeCard key={item.id} office={item} active={item.id === activeId} onActivate={() => setActiveId(item.id)} />
          ))}
        </div>
        {/* A real map (Leaflet) that flies to the active office: a compact one under the cards on small screens, the full panel behind them on desktop. */}
        <div className="mt-4 h-[320px] overflow-hidden rounded-[18px] lg:absolute lg:inset-0 lg:z-0 lg:mt-0 lg:h-auto lg:rounded-none">
          <OfficeMap offices={office.items} activeId={activeId} offsetRatio={0.21} />
        </div>
      </div>
    </section>
  );
}

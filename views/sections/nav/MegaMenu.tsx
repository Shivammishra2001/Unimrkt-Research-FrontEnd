'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import Link from 'next/link';
import type { ServiceTreeItemModel } from '@/models/service';
import { groupIndustries, withCount, type NavIndustry } from './industryGroups';
import type { IndustriesMenuModel, ServicesMenuModel } from '@/models/domain';

const PANEL_MAX = 1040;
const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]';
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/* ---------------------------------------------------------------- shell */

/** Absolutely positioned under its trigger, but centred on the viewport and never wider than it (16px gutters), so it
 * can't clip at 1280-1440. Its transparent top padding runs from the trigger down to the header's bottom edge (+10px):
 * that strip is the hover bridge, so a diagonal move from the label into the panel never closes it. Always mounted —
 * opacity / translate / visibility animate, and the links stay in the DOM for crawlers. */
export function MegaPanel({ open, anchorRef, id, children }: { open: boolean; anchorRef: RefObject<HTMLElement>; id: string; children: ReactNode }) {
  const [box, setBox] = useState<{ left: number; width: number; padTop: number; maxH: number } | null>(null);

  const measure = useCallback(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    const a = anchor.getBoundingClientRect();
    const header = anchor.closest('header')?.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const width = Math.min(PANEL_MAX, vw - 32);
    const padTop = Math.max(12, (header ? header.bottom - a.bottom : 0) + 10);
    setBox({ left: Math.round((vw - width) / 2 - a.left), width, padTop, maxH: window.innerHeight - a.bottom - padTop - 16 });
  }, [anchorRef]);

  useIsoLayoutEffect(() => {
    if (!open) return undefined;
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, { passive: true });
    // The header changes height for 300ms after the first scroll; re-measure once it settles.
    const t = setTimeout(measure, 320);
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure);
      clearTimeout(t);
    };
  }, [open, measure]);

  return (
    <div
      id={id}
      className={`absolute top-full z-50 transition-[opacity,transform,visibility] duration-200 ${EASE} motion-reduce:transition-none ${
        open ? 'visible translate-y-0 opacity-100' : 'invisible pointer-events-none translate-y-1 opacity-0'
      }`}
      style={box ? { left: box.left, width: box.width, paddingTop: box.padTop } : { left: 0, width: PANEL_MAX, paddingTop: 12 }}
    >
      <div
        className="overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-[#0B1220]/95 text-left font-sans normal-case tracking-normal text-white shadow-[0_24px_64px_rgba(0,0,0,0.45)] backdrop-blur-xl [scrollbar-width:thin]"
        style={box ? { maxHeight: Math.max(320, box.maxH) } : undefined}
      >
        {children}
      </div>
    </div>
  );
}

function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 11 11 5M6 5h5v5" />
    </svg>
  );
}

function FooterBar({ left, right, onNavigate }: { left: { label: string; href: string }; right: { label: string; href: string }; onNavigate: () => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-white/[0.02] px-6 py-4 text-[13px] font-semibold">
      <Link href={left.href} onClick={onNavigate} className="group inline-flex items-center gap-1.5 text-white transition-colors duration-150 hover:text-[#ff8a85]">
        {left.label}
        <Arrow className="size-3.5 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
      <Link
        href={right.href}
        onClick={onNavigate}
        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#BE2C28] to-[#6C2A4A] px-4 py-2 text-white shadow-[0_6px_20px_rgba(190,44,40,0.3)] transition-[filter,box-shadow] duration-150 hover:shadow-[0_8px_26px_rgba(190,44,40,0.45)] hover:brightness-110"
      >
        {right.label}
        <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------- services */

/** Line icons per research category (matched on slug; a generic grid for anything new). */
function CategoryIcon({ slug, className = '' }: { slug: string; className?: string }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const paths: Array<[RegExp, ReactNode]> = [
    [/primary/, <path key="p" {...p} d="M5 4h3l1.5 4-2 1.2a10 10 0 0 0 5.3 5.3L14 12.5l4 1.5v3a2 2 0 0 1-2 2A14 14 0 0 1 3 6a2 2 0 0 1 2-2Z" />],
    [/qualitative/, <g key="q" {...p}><path d="M4 15.5V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H8l-4 2.5Z" /><path d="M20 10v9.5L17 18h-5a2 2 0 0 1-2-2" /></g>],
    [/quantitative/, <g key="n" {...p}><path d="M4 20h16" /><path d="M7 16v-5M12 16V6M17 16v-8" /></g>],
    [/business/, <g key="b" {...p}><rect x="3.5" y="7" width="17" height="12" rx="2" /><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3.5 12.5h17" /></g>],
    [/support/, <g key="s" {...p}><circle cx="12" cy="12" r="3" /><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8" /></g>],
    [/ai-|analytic|predict/, <g key="a" {...p}><path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8Z" /><path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8Z" /></g>],
    [/cx|customer|journey/, <g key="c" {...p}><circle cx="6" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><path d="M8 6h7a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h7" /></g>],
    [/social|sentiment|media/, <g key="m" {...p}><path d="M4 10v4h3l6 4V6L7 10H4Z" /><path d="M17 9a4 4 0 0 1 0 6M19.5 6.5a8 8 0 0 1 0 11" /></g>],
  ];
  const icon = paths.find(([re]) => re.test(slug))?.[1] ?? (
    <g {...p}><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></g>
  );
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {icon}
    </svg>
  );
}

/** First sentence of the CMS summary — one calm line under the category title, never an ellipsis mid-word. */
const firstSentence = (s: string) => (s.match(/^.*?[.!?](\s|$)/)?.[0] ?? s).trim();

export function ServicesMega({ categories, menu, onNavigate }: { categories: ServiceTreeItemModel[]; menu?: ServicesMenuModel; onNavigate: () => void }) {
  const [active, setActive] = useState(categories[0]?.slug ?? '');
  const intent = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clear = () => {
    if (intent.current) clearTimeout(intent.current);
    intent.current = null;
  };
  useEffect(() => clear, []);
  // Hover intent: a 120ms dwell before switching, so sweeping across the list toward the right panel doesn't flick it.
  const hoverTo = (slug: string) => {
    clear();
    intent.current = setTimeout(() => setActive(slug), 120);
  };

  return (
    <div>
      <div className="grid grid-cols-[minmax(250px,300px)_minmax(0,1fr)]">
        <ul className="border-r border-white/10 bg-white/[0.025] p-3" onMouseLeave={clear}>
          {categories.map((c) => {
            const on = c.slug === active;
            return (
              <li key={c.slug}>
                <Link
                  href={`/services/${c.slug}`}
                  onClick={onNavigate}
                  onMouseEnter={() => hoverTo(c.slug)}
                  onFocus={() => {
                    clear();
                    setActive(c.slug);
                  }}
                  aria-current={on ? 'true' : undefined}
                  className={`group relative flex items-center gap-3 rounded-xl py-2.5 pl-4 pr-3 text-[14px] font-semibold leading-snug transition-colors duration-150 ${
                    on ? 'bg-gradient-to-r from-[#BE2C28]/[0.22] to-[#6C2A4A]/[0.08] text-white' : 'text-white/70 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <span
                    className={`absolute inset-y-2 left-0 w-[3px] rounded-full bg-gradient-to-b from-[#BE2C28] to-[#6C2A4A] transition-opacity duration-150 ${on ? 'opacity-100' : 'opacity-0'}`}
                    aria-hidden="true"
                  />
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-[10px] border transition-colors duration-150 ${
                      on ? 'border-[#BE2C28]/40 bg-[#BE2C28]/15 text-[#ff8a85]' : 'border-white/10 bg-white/[0.04] text-white/60 group-hover:text-white/85'
                    }`}
                  >
                    <CategoryIcon slug={c.slug} className="size-[18px]" />
                  </span>
                  <span className="min-w-0 flex-1">{c.title}</span>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={`size-3.5 shrink-0 transition-[transform,opacity] duration-150 ${on ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0 group-hover:opacity-60'}`} aria-hidden="true">
                    <path d="m6 4 4 4-4 4" />
                  </svg>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Every category's panel shares one grid cell: the box keeps the tallest panel's height (no jump) and the
            switch is a pure cross-fade. Inactive panels are `invisible`, so they leave the tab order. */}
        <div className="grid p-7">
          {categories.map((c) => {
            const on = c.slug === active;
            const subs = c.children.length > 0 ? c.children : [{ slug: c.slug, title: `Explore ${c.title}`, summary: c.summary }];
            return (
              <section
                key={c.slug}
                aria-hidden={!on}
                className={`[grid-area:1/1] transition-[opacity,transform,visibility] duration-200 ${EASE} ${on ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-1 opacity-0'}`}
              >
                <p className="text-[11px] font-bold uppercase tracking-[2.5px] text-[#ff8a85]">{menu?.eyebrow || 'Research Services'}</p>
                <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-[22px] font-semibold leading-tight tracking-[-0.5px] text-white">{c.title}</h3>
                  <Link href={`/services/${c.slug}`} onClick={onNavigate} className="group inline-flex items-center gap-1 text-[13px] font-semibold text-white/70 transition-colors duration-150 hover:text-white">
                    {menu?.overviewLabel || 'Overview'}
                    <Arrow className="size-3.5 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
                {c.summary && <p className="mt-2 max-w-[560px] text-[14px] leading-[1.6] text-white/60">{firstSentence(c.summary)}</p>}
                <ul className="mt-5 grid grid-cols-2 gap-2">
                  {subs.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        onClick={onNavigate}
                        className="group flex h-full items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 transition-[background-color,border-color,transform] duration-150 hover:-translate-y-px hover:border-white/15 hover:bg-white/[0.06]"
                      >
                        <span className="size-1.5 shrink-0 rounded-full bg-gradient-to-br from-[#BE2C28] to-[#6C2A4A] ring-4 ring-[#BE2C28]/10 transition-transform duration-150 group-hover:scale-125" aria-hidden="true" />
                        <span className="min-w-0 flex-1 text-[14px] font-medium leading-snug text-white/85 group-hover:text-white">{s.title}</span>
                        <Arrow className="size-3.5 shrink-0 -translate-x-1 text-[#ff8a85] opacity-0 transition-[transform,opacity] duration-150 group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
      <FooterBar
        left={menu?.exploreLink ?? { label: 'Explore All Research Services', href: '/services' }}
        right={menu?.ctaLink ?? { label: 'Need a Custom Study? Talk to Experts', href: '/contact' }}
        onNavigate={onNavigate}
      />
    </div>
  );
}

/* ----------------------------------------------------------- industries */

export function IndustriesMega({ industries, menu, onNavigate }: { industries: NavIndustry[]; menu?: IndustriesMenuModel; onNavigate: () => void }) {
  const groups = groupIndustries(industries, menu);
  const n = industries.length;
  const viewAll = menu?.viewAllLink ?? { label: 'View All {count} Industries', href: '/industries' };
  const cta = menu?.ctaLink ?? { label: 'Request Industry Sample / Proposal', href: '/contact' };
  return (
    <div>
      <div className="px-7 pb-3 pt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/[0.06] pb-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[2.5px] text-[#ff8a85]">{menu?.eyebrow || 'Industries We Serve'}</p>
            <p className="mt-1.5 text-[14px] text-white/60">{withCount(menu?.intro || 'Sector-specific research across {count} industries and 90+ countries.', n)}</p>
          </div>
        </div>
        {/* CSS columns balance the sector groups automatically, whatever the CMS adds. */}
        <div className="mt-5 columns-3 gap-6">
          {groups.map((g) => (
            <div key={g.label} className="mb-5 break-inside-avoid">
              <p className="mb-1.5 flex items-center gap-2 px-2.5 text-[11px] font-bold uppercase leading-snug tracking-[1.8px] text-white/45">
                <span className="h-px w-3 bg-gradient-to-r from-[#BE2C28] to-[#6C2A4A]" aria-hidden="true" />
                {g.label}
              </p>
              <ul>
                {g.items.map((i) => (
                  <li key={i.slug}>
                    <Link
                      href={`/industries/${i.slug}`}
                      onClick={onNavigate}
                      className="group flex items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[13.5px] font-medium leading-snug text-white/75 transition-colors duration-150 hover:bg-white/[0.06] hover:text-white"
                    >
                      <span className="size-1 shrink-0 rounded-full bg-white/30 transition-[transform,background-color] duration-150 group-hover:translate-x-0.5 group-hover:scale-150 group-hover:bg-[#BE2C28]" aria-hidden="true" />
                      <span className="min-w-0 flex-1 transition-transform duration-150 group-hover:translate-x-0.5">{i.title}</span>
                      <Arrow className="size-3 shrink-0 text-[#ff8a85] opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <FooterBar left={{ label: withCount(viewAll.label, n), href: viewAll.href }} right={{ label: withCount(cta.label, n), href: cta.href }} onNavigate={onNavigate} />
    </div>
  );
}

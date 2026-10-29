'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type FocusEvent, type KeyboardEvent } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Button } from '@/views/ui/Button';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { LoopingVideo, type VideoSource } from '@/views/ui/LoopingVideo';
import { toBrowserMediaUrl } from '@/controllers/image';
import type { HeroModel, LinkModel } from '@/models/domain';

/** One selectable row of the hero's right-hand list plus the left-hand copy it drives. */
export interface HeroSlide {
  id: string;
  /** Category badge, e.g. "Market Intelligence". */
  tag?: string;
  /** Main headline. */
  title: string;
  description?: string;
  /** Row label. */
  label: string;
  slug: string;
  /** Row icon (Figma export), if one exists for this slug. */
  icon?: string;
  ctaLink?: LinkModel;
}

/** Slugs that have a Figma-exported icon under /figma-home/hero/. */
const ICON_SLUGS = new Set([
  'online-bulletin-board',
  'intercept-interview',
  'country-research',
  'competitive-intelligence',
  'survey-programming',
  'in-depth-interview',
  'telephonic-interview',
]);

const slugify = (label: string) =>
  label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/**
 * Builds the slide dataset from the CMS block. Each side-menu row supplies its
 * own tag / headline / description / CTA label; any field it leaves empty falls
 * back to the hero block's own eyebrow / heading / subheading / first action,
 * so a hero authored before per-row copy existed renders exactly as before.
 */
export function buildHeroSlides(block: HeroModel): HeroSlide[] {
  return block.sideMenu.map((item) => {
    const slug = slugify(item.label);
    const fallbackCta = block.actions[0];
    const ctaLink: LinkModel | undefined = item.ctaLabel
      ? { id: `cta-${item.id}`, label: item.ctaLabel, href: item.href, isExternal: false, variant: 'primary' }
      : fallbackCta;
    return {
      id: item.id,
      tag: item.tag ?? block.eyebrow,
      title: item.headline ?? block.heading,
      description: item.description ?? block.subheading,
      label: item.label,
      slug,
      icon: ICON_SLUGS.has(slug) ? `/figma-home/hero/${slug}.svg` : undefined,
      ctaLink,
    };
  });
}

// --- side-list geometry (Figma 1794:16996..17140) ---------------------------
// Rows fan out along an arc around the selected one. `top` is measured from the
// list's top edge (Figma y 255); distances past 3 park just outside the box.
const SLOT_TOP: Record<number, number> = { [-3]: 0, [-2]: 75, [-1]: 150, 0: 233, 1: 346, 2: 421, 3: 496 };
const LIST_HEIGHT = 546;
const OFFSET_LEFT = [0, 71, 92, 114] as const;

const TILE_SHADOW_SM =
  'shadow-[inset_1.929px_1.929px_1.607px_-2.25px_rgba(255,255,255,0.5),inset_-2.25px_-2.25px_1.286px_-1.929px_rgba(255,255,255,0.3),inset_0px_0px_1.286px_0.321px_rgba(255,255,255,0.15)]';
const TILE_SHADOW_LG =
  'shadow-[inset_3.086px_3.086px_2.571px_-3.6px_rgba(255,255,255,0.5),inset_-3.6px_-3.6px_2.057px_-3.086px_rgba(255,255,255,0.3),inset_0px_0px_2.057px_0.514px_rgba(255,255,255,0.15)]';

/** Visual state per distance from the selected row (0 = selected). */
const STEPS = [
  { gap: 'gap-[14px]', tile: 'size-20 rounded-[18px]', icon: 'size-[50px]', shadow: TILE_SHADOW_LG, text: 'text-[32px]', tileOpacity: 'opacity-100', textOpacity: 'opacity-100' },
  { gap: 'gap-[15px]', tile: 'size-[50px] rounded-[11.25px]', icon: 'size-[30px]', shadow: TILE_SHADOW_SM, text: 'text-[24px]', tileOpacity: 'opacity-60', textOpacity: 'opacity-35' },
  { gap: 'gap-[15px]', tile: 'size-[50px] rounded-[11.25px]', icon: 'size-[30px]', shadow: TILE_SHADOW_SM, text: 'text-[24px]', tileOpacity: 'opacity-50', textOpacity: 'opacity-25' },
  { gap: 'gap-[15px]', tile: 'size-[50px] rounded-[11.25px]', icon: 'size-[30px]', shadow: TILE_SHADOW_SM, text: 'text-[24px]', tileOpacity: 'opacity-20', textOpacity: 'opacity-15' },
] as const;

const WHEEL_COOLDOWN_MS = 450;
/** Time each row stays selected before the hero advances on its own. */
const AUTO_ADVANCE_MS = 5000;

/**
 * blocks.hero, `mediaAlignment: 'background'` — Figma 1794:16926. A full-bleed
 * background (looping muted video when one is available, else the photo), the
 * left-hand copy block and the right-hand selector list.
 *
 * The hero also advances on its own every AUTO_ADVANCE_MS and loops. It holds
 * still while the pointer is over the copy/list, while a row has keyboard
 * focus, while the hero is off-screen or the tab is hidden, and for visitors
 * who prefer reduced motion. Any manual pick restarts the timer.
 *
 * Selecting a row (click, ↑/↓, or the mouse wheel over the list) crossfades the
 * left-hand badge / headline / description / CTA to that row's copy. All slides
 * sit in ONE stacked grid cell, so the column is as tall as the tallest slide
 * from the first paint and switching never moves anything; the list is a
 * fixed-height box whose rows are absolutely positioned, so it can't shift
 * either.
 */
export function HeroSplash({
  block,
  index,
  videoSources,
}: {
  block: HeroModel;
  index: number;
  /** Playable video URLs (best format first); empty → fall back to the image. */
  videoSources: VideoSource[];
}) {
  const slides = useMemo(() => buildHeroSlides(block), [block]);
  const initial = Math.max(
    0,
    block.sideMenu.findIndex((item) => item.isActive),
  );
  const [active, setActive] = useState(initial);
  const reduceMotion = useReducedMotion();
  const count = slides.length;

  // Auto-advance gates.
  const sectionRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  const listRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastWheel = useRef(0);
  const activeRef = useRef(active);
  activeRef.current = active;

  const select = useCallback(
    (next: number, focus = false) => {
      const clamped = Math.min(Math.max(next, 0), slides.length - 1);
      setActive(clamped);
      if (focus) rowRefs.current[clamped]?.focus();
    },
    [slides.length],
  );

  // Wheel over the list steps the selection — but only while there is somewhere
  // to go, so the page still scrolls normally once the first/last row is reached.
  // (Native listener: React's onWheel is passive and can't preventDefault.)
  useEffect(() => {
    const el = listRef.current;
    if (!el) return undefined;
    function onWheel(e: WheelEvent) {
      const dir = e.deltaY > 0 ? 1 : e.deltaY < 0 ? -1 : 0;
      if (!dir) return;
      const target = activeRef.current + dir;
      if (target < 0 || target > slides.length - 1) return;
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheel.current < WHEEL_COOLDOWN_MS) return;
      lastWheel.current = now;
      setActive(target);
    }
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [slides.length]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden);
    onVisibility();
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // One timeout per selection: a manual pick (or any gate flipping) re-arms it.
  const autoPlay = count > 1 && !reduceMotion && !hovered && !keyboardFocus && inView && tabVisible;
  useEffect(() => {
    if (!autoPlay) return undefined;
    const timer = window.setTimeout(() => setActive((a) => (a + 1) % count), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [autoPlay, active, count]);

  // Pause handlers for the interactive parts (copy, list, chips).
  const pauseProps = {
    onPointerEnter: () => setHovered(true),
    onPointerLeave: () => setHovered(false),
    onFocusCapture: (e: FocusEvent) => setKeyboardFocus((e.target as HTMLElement).matches(':focus-visible')),
    onBlurCapture: () => setKeyboardFocus(false),
  };

  // Circular distance from the selected row, so the list loops: after the last
  // row comes the first. A row that wraps from one end to the other snaps
  // instead of sweeping across the whole list.
  const distances = slides.map((_, i) => {
    let d = i - active;
    if (d > count / 2) d -= count;
    else if (d < -count / 2) d += count;
    return d;
  });
  const prevDistances = useRef<number[]>([]);
  useEffect(() => {
    prevDistances.current = distances;
  });

  function onListKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      select((active + 1) % count, true);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      select((active - 1 + count) % count, true);
    } else if (e.key === 'Home') {
      e.preventDefault();
      select(0, true);
    } else if (e.key === 'End') {
      e.preventDefault();
      select(slides.length - 1, true);
    }
  }

  const useVideo = videoSources.length > 0;
  const poster = toBrowserMediaUrl(block.media?.src);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen lg:min-h-[1005px] overflow-hidden bg-[#040112] text-white">
      {/* z-0 background: video (muted loop) with the photo as its poster, or just the photo. */}
      {useVideo ? (
        <LoopingVideo
          sources={videoSources}
          poster={poster}
          className="absolute inset-0 z-0 h-full w-full object-cover opacity-70"
        />
      ) : block.media ? (
        <StrapiImage image={block.media} sizes="100vw" priority={index === 0} fill className="z-0 object-cover opacity-70" />
      ) : null}
      {/* z-10 wash (#010913 @ 40%) — above the media, below the copy. */}
      <div className="absolute inset-0 z-10 bg-[#010913]/40" aria-hidden="true" />

      <div className="relative z-20 mx-auto flex w-full max-w-[1546px] items-start justify-between gap-10 px-6 pb-20 pt-32 sm:pt-36 lg:px-10 lg:pb-0 lg:pt-0 min-[1640px]:px-0">
        {/* Left: one stacked grid cell → fixed height, crossfade between slides. */}
        <div className="grid max-w-[760px] lg:pt-[364px]" {...pauseProps}>
          {slides.map((slide, i) => {
            const isActive = i === active;
            return (
              <div
                key={slide.id}
                className={`[grid-area:1/1] transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
                  isActive ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
                }`}
                aria-hidden={!isActive}
                {...(isActive ? {} : ({ inert: '' } as object))}
              >
                {slide.tag && (
                  <p className="inline-flex h-10 items-center gap-3 rounded-lg border border-white/10 bg-white/10 px-[17px] py-[9px] backdrop-blur-[2px] font-sans text-[13px] font-bold uppercase leading-[1.2] tracking-[3px] text-white">
                    <span className="size-2 shrink-0 rounded-full bg-brand-600" aria-hidden="true" />
                    {slide.tag}
                  </p>
                )}
                {/* Figma 1794:16932: 60px / semibold / -3px (-0.05em) tracking / 1.2 leading — full size from 1667px, fluid below so laptops don't wrap to 3 lines. */}
                <h1 className="mt-3 capitalize text-4xl sm:text-5xl lg:text-[clamp(40px,3.6vw,60px)] font-semibold lg:tracking-[-0.05em] !leading-[1.2] text-white">
                  {slide.title}
                </h1>
                {slide.description && (
                  <p className="mt-4 max-w-[757px] text-base leading-[1.9] text-white/80">{slide.description}</p>
                )}
                {slide.ctaLink && (
                  <div className="mt-[51px] flex flex-wrap gap-4">
                    <Button link={slide.ctaLink} variant={slide.ctaLink.variant} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right (xl+): the selector. Fixed-height box, absolutely placed rows. */}
        {slides.length > 0 && (
          <div
            ref={listRef}
            role="listbox"
            aria-label="Research services"
            aria-orientation="vertical"
            onKeyDown={onListKeyDown}
            {...pauseProps}
            className="relative hidden w-[520px] shrink-0 xl:mt-[255px] xl:block"
            style={{ height: LIST_HEIGHT }}
          >
            {slides.map((slide, i) => {
              const d = distances[i];
              const wrapped = prevDistances.current[i] !== undefined && Math.abs(d - prevDistances.current[i]) > count / 2;
              const distance = Math.min(Math.abs(d), 3);
              const step = STEPS[distance];
              const visible = Math.abs(d) <= 3;
              const top = visible ? SLOT_TOP[d] : d < 0 ? -90 : LIST_HEIGHT + 40;
              const isActive = d === 0;
              return (
                <button
                  key={slide.id}
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => select(i)}
                  className={`group absolute flex items-center whitespace-nowrap text-left transition-[top,left,opacity] duration-500 ease-out focus-visible:outline-none motion-reduce:transition-none ${step.gap} ${
                    visible ? '' : 'pointer-events-none opacity-0'
                  } ${wrapped ? '!transition-none' : ''}`}
                  style={{ top, left: OFFSET_LEFT[distance] }}
                >
                  <span
                    className={`relative flex shrink-0 items-center justify-center bg-white/[0.06] transition-all duration-500 ease-out group-hover:opacity-100 group-focus-visible:ring-2 group-focus-visible:ring-white/60 motion-reduce:transition-none ${step.tile} ${step.tileOpacity}`}
                    aria-hidden="true"
                  >
                    {slide.icon && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={slide.icon} alt="" className={`block transition-all duration-500 ease-out motion-reduce:transition-none ${step.icon}`} />
                    )}
                    <span className={`pointer-events-none absolute inset-0 rounded-[inherit] ${step.shadow}`} />
                  </span>
                  <span
                    className={`font-bold capitalize leading-[1.2] tracking-[-1px] text-white transition-all duration-500 ease-out group-hover:opacity-100 motion-reduce:transition-none ${step.text} ${step.textOpacity}`}
                  >
                    {slide.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Below xl the arc doesn't fit — same selection as a scrolling chip row. */}
      {slides.length > 1 && (
        <div className="relative z-20 px-6 pb-12 xl:hidden" role="tablist" aria-label="Research services" {...pauseProps}>
          <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => select(i)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  i === active ? 'border-white bg-white text-[#0b042a]' : 'border-white/30 text-white/80 hover:border-white/60'
                }`}
              >
                {slide.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

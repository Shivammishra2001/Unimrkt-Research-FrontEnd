'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from '@/views/industries/listing/shared';
import { DotPagination } from '@/views/industries/DotPagination';
import { SendArrowIcon } from '@/views/ui/icons/SendArrowIcon';
import { useSnapTrack } from '@/views/ui/useSnapTrack';
import type { ServiceTreeItemModel } from '@/models/service';
import type { ServicesListingContent } from './content';
import { lato } from '../fonts';


/** The five categories Figma 1231:77514 draws: photo (and its crop inside the 316x638 panel), 70px line icon, and the
 * description from the hover variants (1223:67311-67315). Figma's Business / Research Support variants repeat the
 * Quantitative paragraph as a placeholder, so those two use their Strapi summary instead, as does any other category. */
const ART: Record<string, { photo: string; icon: string; position: string; description?: string }> = {
  'primary-research': {
    photo: 'panel-primary.webp',
    icon: 'panel-primary.svg',
    position: '27% 43%',
    description: 'Gather first-hand insights from target audiences through qualitative and quantitative research. Understand customer needs, behaviours, attitudes and experiences to uncover meaningful insights and support confident business decisions.',
  },
  'qualitative-research': {
    photo: 'panel-qualitative.webp',
    icon: 'panel-qualitative.svg',
    position: '50% 65%',
    description: 'Explore the motivations, perceptions and experiences behind consumer behaviour through in-depth interviews, focus groups and interactive research methods that uncover deeper, meaningful insights.',
  },
  'quantitative-research': {
    photo: 'panel-quantitative.webp',
    icon: 'panel-quantitative.svg',
    position: '50% 64%',
    description: 'Measure market trends, customer behaviours and opinions at scale through structured surveys and data-driven research, delivering reliable insights that support strategic decisions and business growth.',
  },
  'business-research': { photo: 'panel-business.webp', icon: 'panel-business.svg', position: '43% 92%' },
  'research-support-functions': { photo: 'panel-support.webp', icon: 'panel-support.svg', position: '46% 89%' },
};

const PER_ROW = 5;
/** Figma 1223:67313: hovered panel 958px, siblings 156px (1600px row, 5px gaps) -> flex-grow ratio 958/156. */
const GROW = 958 / 156;
const EASE = 'cubic-bezier(0.22,1,0.36,1)';
const DURATION = 650;

const iconOf = (c: ServiceTreeItemModel) => `/icons/services/${ART[c.slug]?.icon ?? 'panel-primary.svg'}`;
const descriptionOf = (c: ServiceTreeItemModel) => ART[c.slug]?.description ?? c.summary;

function PanelPhoto({ category, zoom, sizes, priority }: { category: ServiceTreeItemModel; zoom: boolean; sizes: string; priority?: boolean }) {
  const art = ART[category.slug];
  const className = `object-cover transform-gpu transition-transform duration-[1000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] will-change-transform motion-reduce:transition-none ${zoom ? 'scale-[1.06]' : 'scale-100'}`;
  // The service's Thumbnail from Strapi wins (seed:approved-media puts the Figma panel photos there); the local Figma
  // photo is the fallback. A Figma category keeps its panel crop either way.
  const src = category.thumbnail?.src ?? (art ? `/images/services/listing/${art.photo}` : undefined);
  if (!src) return null;
  return <Image src={src} alt="" fill sizes={sizes} priority={priority} className={className} style={art ? { objectPosition: art.position } : undefined} />;
}

function ExploreButton({ href, title, className = '', tabIndex }: { href: string; title: string; className?: string; tabIndex?: number }) {
  return (
    <Link
      href={href}
      tabIndex={tabIndex}
      aria-label={`Explore ${title}`}
      className={`inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-[4px] bg-gradient-to-r from-gradient-from to-gradient-to font-sans text-[13px] font-bold uppercase leading-[16.9px] tracking-[0.78px] text-white transition-[filter] duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none ${className}`}
    >
      Explore Research
      <SendArrowIcon className="size-4" aria-hidden="true" />
    </Link>
  );
}

/**
 * Desktop (lg+) accordion — Figma 1223:67317 (Component 1080), Smart Animate on hover from the resting variant
 * (1223:67316) to each panel's expanded variant. Resting: five equal 316x638 panels, icon + title bottom-centre.
 * Hover / focus / tap: that panel grows to 958/1600 of the row (flex-grow 958:156, 650ms ease-out-expo), its scrim goes
 * to full black, and the expanded layout fades in at its bottom-left — 70px icon, then a fixed-width column (768px at
 * 1600, sized from the row's width, not the animating panel's, so the copy never reflows mid-animation) with the 22px
 * title, the 16/1.9 description @ 80% and the 60px gradient "Explore Research" button. The other four shrink to 156px
 * strips: their title runs bottom-to-top, ending 14px above a 54px icon that sits 41px off the bottom. All offsets
 * scale with the row (cqw of the 1600px design row). With more than five categories, the dots page the window of five.
 */
function DesktopAccordion({ categories }: { categories: ServiceTreeItemModel[] }) {
  const [start, setStart] = useState(0);
  const [active, setActive] = useState<number | null>(null);
  const stops = Math.max(1, categories.length - PER_ROW + 1);
  const visible = categories.slice(start, start + PER_ROW);
  const t = (props: string, delay = 0) => ({ transitionProperty: props, transitionDuration: `${DURATION}ms`, transitionTimingFunction: EASE, transitionDelay: `${delay}ms` });

  return (
    <div className="relative hidden [container-type:inline-size] lg:block">
      <ul
        aria-label="Our services"
        onMouseLeave={() => setActive(null)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setActive(null);
        }}
        className="flex h-[calc((100cqw_-_20px)*0.40380)] gap-[5px] overflow-hidden rounded-[40px]"
      >
        {visible.map((category, i) => {
          const expanded = active === i;
          const strip = active !== null && !expanded;
          const href = `/services/${category.slug}`;
          return (
            <li
              key={category.slug}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className="group relative min-w-0 basis-0 overflow-hidden bg-[#1e1e1e] motion-reduce:!transition-none"
              style={{ flexGrow: expanded ? GROW : 1, ...t('flex-grow') }}
            >
              <PanelPhoto category={category} zoom={expanded} sizes="(min-width: 1700px) 960px, 60vw" priority={start === 0 && i < 2} />
              {/* Resting scrim: 80% transparent->black over the lower 88%; any hover takes it to full strength. */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[88%] bg-gradient-to-b from-black/0 to-black motion-reduce:!transition-none" style={{ opacity: active === null ? 0.8 : 1, ...t('opacity') }} aria-hidden="true" />
              {/* Expanded scrim (Figma 1223:66474): the fade runs the full 680px, a richer black behind the copy. */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/30 to-black/90 motion-reduce:!transition-none" style={{ opacity: expanded ? 1 : 0, ...t('opacity') }} aria-hidden="true" />

              {/* Resting: icon + title, bottom-centre. */}
              <div
                className="pointer-events-none absolute inset-x-0 top-[68.18%] flex flex-col items-center px-3 text-center motion-reduce:!transition-none"
                style={{ opacity: active === null ? 1 : 0, ...t('opacity', active === null ? 150 : 0) }}
                aria-hidden={active !== null}
              >
                <Image src={iconOf(category)} alt="" width={70} height={70} className="size-[clamp(44px,4.375cqw,70px)]" />
                <h3 className={`${lato.className} mt-[clamp(12px,1.1875cqw,19px)] text-[clamp(16px,1.375cqw,22px)] font-bold leading-[1.27] text-white [text-wrap:balance]`}>{category.title}</h3>
              </div>

              {/* Collapsed strip: vertical title above a bottom-centred 54px icon. */}
              <div className="pointer-events-none absolute inset-0 motion-reduce:!transition-none" style={{ opacity: strip ? 1 : 0, ...t('opacity', strip ? 200 : 0) }} aria-hidden="true">
                <p
                  className={`${lato.className} absolute bottom-[calc(clamp(40px,3.375cqw,54px)_+_clamp(26px,2.5625cqw,41px)_+_clamp(10px,0.875cqw,14px))] left-1/2 -translate-x-1/2 rotate-180 whitespace-nowrap text-[clamp(16px,1.375cqw,22px)] font-bold leading-[1.27] text-white [writing-mode:vertical-rl]`}
                >
                  {category.title}
                </p>
                <Image src={iconOf(category)} alt="" width={54} height={54} className="absolute bottom-[clamp(26px,2.5625cqw,41px)] left-1/2 size-[clamp(40px,3.375cqw,54px)] -translate-x-1/2" />
              </div>

              {/* Expanded: icon | title, description, button — bottom-left, fixed column width. */}
              <div
                className="absolute bottom-[clamp(28px,3.625cqw,58px)] left-[clamp(24px,3.125cqw,50px)] flex items-start gap-[clamp(12px,1.1875cqw,19px)] motion-reduce:!transition-none"
                style={{ opacity: expanded ? 1 : 0, transform: expanded ? 'translateY(0)' : 'translateY(12px)', pointerEvents: expanded ? 'auto' : 'none', ...t('opacity, transform', expanded ? 220 : 0) } as CSSProperties}
              >
                <Image src={iconOf(category)} alt="" width={70} height={70} className="size-[clamp(44px,4.375cqw,70px)] shrink-0" />
                <div className="w-[min(768px,calc((100cqw_-_20px)*0.60557_-_clamp(24px,3.125cqw,50px)_-_clamp(44px,4.375cqw,70px)_-_clamp(12px,1.1875cqw,19px)_-_40px))]">
                  <h3 className={`${lato.className} text-[clamp(17px,1.375cqw,22px)] font-bold leading-[1.27] text-white`}>{category.title}</h3>
                  {descriptionOf(category) && (
                    <p className="mt-[clamp(6px,0.625cqw,10px)] line-clamp-4 font-sans text-[clamp(13px,1cqw,16px)] font-normal leading-[1.9] text-white/80 xl:line-clamp-3">{descriptionOf(category)}</p>
                  )}
                  <ExploreButton href={href} title={category.title} tabIndex={0} className="mt-[clamp(12px,1.1875cqw,19px)] h-[clamp(48px,3.75cqw,60px)] px-[clamp(24px,2.5cqw,40px)]" />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {/* Figma draws no pager (five categories); with more, the dots sit inside the section's 80px bottom padding so the
          spacing to the Why Choose band stays the node's. */}
      {stops > 1 && (
        <div className="absolute inset-x-0 top-full mt-[18px] flex justify-center">
          <DotPagination
            count={stops}
            activeIndex={start}
            onSelect={(i) => {
              setActive(null);
              setStart(i);
            }}
          />
        </div>
      )}
    </div>
  );
}

/** Phones and tablets (<lg): no hover, and 156px strips with vertical text would be unreadable, so each panel shows
 * its expanded content outright — icon, title, a 3-line description and the button — in the snap-scrolling row. */
function TouchTrack({ categories }: { categories: ServiceTreeItemModel[] }) {
  const { ref, active, onScroll, goTo } = useSnapTrack<HTMLUListElement>();
  const [perView, setPerView] = useState(1);
  useEffect(() => {
    const track = ref.current;
    if (!track) return undefined;
    const measure = () => {
      const first = track.firstElementChild as HTMLElement | null;
      if (first) setPerView(Math.max(1, Math.floor((track.clientWidth + 5) / (first.offsetWidth + 5) + 0.02)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, [ref]);
  const stops = Math.max(1, categories.length - perView + 1);

  return (
    <div className="lg:hidden">
      <ul
        ref={ref}
        onScroll={onScroll}
        aria-label="Our services"
        className="flex snap-x snap-mandatory gap-[5px] overflow-x-auto overscroll-x-contain scroll-smooth rounded-[24px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((category, i) => (
          <li key={category.slug} className="group relative h-[480px] w-[min(82vw,340px)] shrink-0 snap-start overflow-hidden bg-[#1e1e1e] sm:h-[540px] sm:w-[calc((100%_-_5px)/2)] md:w-[calc((100%_-_10px)/3)]">
            <PanelPhoto category={category} zoom={false} sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 82vw" priority={i < 1} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/35 to-black/95" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 px-5 pb-6">
              <Image src={iconOf(category)} alt="" width={70} height={70} className="size-12" />
              <h3 className={`${lato.className} mt-3 text-[20px] font-bold leading-[1.27] text-white`}>{category.title}</h3>
              {descriptionOf(category) && <p className="mt-2 line-clamp-3 font-sans text-[14px] leading-[1.7] text-white/80">{descriptionOf(category)}</p>}
              <ExploreButton href={`/services/${category.slug}`} title={category.title} className="mt-4 h-12 px-4 sm:px-5" />
            </div>
          </li>
        ))}
      </ul>
      {stops > 1 && (
        <div className="mt-6 flex justify-center">
          <DotPagination count={stops} activeIndex={Math.min(active, stops - 1)} onSelect={goTo} />
        </div>
      )}
    </div>
  );
}

/** "Our Services / End-to-End Market Research Solutions" — Figma 1231:77239 + 1231:77514-77517 (y1586-2617).
 * White, with the wave artwork at 50% and a white fade from y+566. Header: eyebrow cap-top 1683, 50/60 title (898px),
 * 3-line body (1090px); the panel row at y1899 (1600x638, 5px gaps, rounded 40px outside). Categories are live Strapi
 * data (the five Figma draws first). */
export function ServicesShowcase({ content, categories }: { content: ServicesListingContent['showcase']; categories: ServiceTreeItemModel[] }) {
  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-16 lg:pb-[80px] lg:pt-[93.6px]">
      {/* Figma 1231:77243 "image 94": the wave artwork at 3544x1552, centred, 162px above the section, 50%, clipped to 1170px. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1170px] overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-[-162px] h-[1551.784px] w-[3544.175px] -translate-x-1/2 opacity-50">
          <Image src="/images/services/listing/showcase-waves.webp" alt="" fill sizes="3544px" className="object-cover" />
        </div>
      </div>
      {/* Figma 1231:77244: 604px transparent -> white (86.5%) fade from y+566. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[604px] lg:bottom-auto lg:top-[566px]"
        style={{ backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 86.538%)' }}
        aria-hidden="true"
      />
      <div className="relative">
        <SectionHeader eyebrow={content.eyebrow} title={content.heading} titleMaxWidth="960px" bodyMaxWidth="1090px" className="px-4 sm:px-6" body={content.body} />

        {categories.length > 0 ? (
          <div className="mx-auto mt-[31px] w-full max-w-[1664px] lg:mt-[34px] px-4 sm:px-6 lg:px-8 min-[1700px]:max-w-[1600px] min-[1700px]:px-0">
            <DesktopAccordion categories={categories} />
            <TouchTrack categories={categories} />
          </div>
        ) : (
          <p className="mt-12 text-center opacity-70">Services are being updated — check back shortly.</p>
        )}
      </div>
    </section>
  );
}

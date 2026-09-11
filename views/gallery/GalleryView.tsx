'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heading } from '@/views/ui/Heading';
import { Prose } from '@/views/ui/Prose';
import { Button } from '@/views/ui/Button';
import { ChevronIcon } from '@/views/ui/icons/ChevronIcon';
import { CloseIcon } from '@/views/ui/icons/CloseIcon';
import { RefreshIcon } from '@/views/ui/icons/RefreshIcon';
import type { GalleryData, GalleryImage } from '@/models/gallery';

const PAGE_SIZE = 6;

const CTA_LINK = {
  id: 'gallery-cta',
  label: 'Talk to Our Experts',
  href: '/contact',
  isExternal: false,
  variant: 'secondary' as const,
};

// Cheap shimmer placeholder — matches the blur-while-loading treatment
// StrapiImage gets from a real blurDataURL, without needing one baked
// into the static fixture. btoa (not Buffer) — this runs client-side too,
// and Buffer isn't a browser global.
function shimmer(w: number, h: number, fill = '#e2e2e2') {
  return `data:image/svg+xml;base64,${btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="${fill}"/></svg>`
  )}`;
}

function GalleryLightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const image = images[index];

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((index + 1) % images.length);
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + images.length) % images.length);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [index, images.length, onClose, onNavigate]);

  if (!image) return null;

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- backdrop click-to-close, content stops propagation below
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close preview"
        className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-8 sm:top-8"
      >
        <CloseIcon className="size-5" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((index - 1 + images.length) % images.length);
        }}
        aria-label="Previous image"
        className="absolute left-2 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
      >
        <ChevronIcon className="size-5 rotate-180" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((index + 1) % images.length);
        }}
        aria-label="Next image"
        className="absolute right-2 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
      >
        <ChevronIcon className="size-5" aria-hidden="true" />
      </button>

      <div
        className="relative max-h-[85vh] w-full max-w-5xl"
        style={{ aspectRatio: `${image.width} / ${image.height}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 80vw, 100vw"
          className="rounded-2xl object-contain"
          placeholder="blur"
          blurDataURL={image.blurDataURL ?? shimmer(image.width, image.height, '#111')}
        />
      </div>
    </div>
  );
}

/** Figma node 827:7897 ("Gallery"). Navbar/Footer are already rendered
 * globally by app/layout.tsx — this view owns only the gallery-specific
 * content between them. Not CMS-driven: `data` comes straight from
 * fixtures/gallery.json via controllers/gallery.ts. */
export function GalleryView({ data }: { data: GalleryData }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = useMemo(
    () => (activeCategory === 'all' ? data.images : data.images.filter((img) => img.category === activeCategory)),
    [data.images, activeCategory]
  );
  const visibleImages = filteredImages.slice(0, visibleCount);
  const hasMore = visibleCount < filteredImages.length;

  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
    setVisibleCount(PAGE_SIZE);
  }, []);

  // Body scroll lock while the lightbox is open — same pattern as MobileNav.
  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [lightboxIndex]);

  return (
    <>
      {/* Hero band — mirrors HeroView's `mediaAlignment === 'background'`
          full-bleed treatment (same fixed-Navbar clearance, same dark
          scrim) rather than reproducing Figma's raw multi-layer SVG-mask
          wave texture 1:1. */}
      <section className="relative flex min-h-[480px] w-full items-center overflow-hidden text-white sm:min-h-[560px] lg:min-h-[640px]">
        <Image
          src="/images/gallery/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL={shimmer(1920, 1080, '#040112')}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040112]/95 via-[#040112]/80 to-[#040112]/60" />
        <div className="relative z-10 mx-auto w-full max-w-container px-4 pt-32 sm:px-6 lg:px-8">
          <p className="inline-flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 px-[17px] py-[9px] backdrop-blur-[2px] font-sans text-[13px] font-bold uppercase tracking-[3px] text-white">
            <span className="size-2 shrink-0 rounded-full bg-brand-600" aria-hidden="true" />
            OUR GALLERY
          </p>
          <h1 className="mt-3 max-w-[748px] capitalize text-4xl font-semibold leading-[1.2] text-white sm:text-5xl lg:text-[60px] lg:tracking-[-3px]">
            Moments that
            <br />
            show our journey
          </h1>
          <p className="mt-6 max-w-[630px] text-base leading-[1.9] text-white/85 sm:text-lg">
            Explore our gallery to see the people, processes and projects that drive our research excellence.
          </p>
        </div>
      </section>

      {/* Breadcrumb bar */}
      <div className="w-full border-b border-card-border bg-white shadow-card">
        <div className="mx-auto flex w-full max-w-container items-center gap-2 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="font-sans text-sm font-semibold text-brand-600">
            Home
          </Link>
          <ChevronIcon className="size-3.5 rotate-90 text-slate-400" aria-hidden="true" />
          <span className="font-sans text-sm text-slate-500">Gallery</span>
        </div>
      </div>

      {/* Heading + filters + grid */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
          <Heading as="h2" size="h2" className="text-center">
            Our Gallery
          </Heading>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {data.categories.map((category) => {
              const isActive = category.id === activeCategory;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategoryChange(category.id)}
                  aria-pressed={isActive}
                  className={`min-h-[44px] rounded-[3px] px-6 py-2 font-sans text-[13px] font-bold uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-gradient-from to-gradient-to text-white'
                      : 'border border-[#dedede] bg-white text-[#1e1e1e] hover:border-brand-600'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          {visibleImages.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleImages.map((image, i) => {
                const globalIndex = filteredImages.indexOf(image);
                return (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setLightboxIndex(globalIndex)}
                    className="group relative aspect-[516/370] w-full min-h-[44px] overflow-hidden rounded-2xl"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      placeholder="blur"
                      blurDataURL={image.blurDataURL ?? shimmer(image.width, image.height)}
                      priority={i === 0}
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="mt-12 text-center opacity-70">No photos in this category yet.</p>
          )}

          {hasMore && (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="inline-flex h-[60px] items-center justify-center gap-2 rounded-[4px] bg-gradient-to-r from-gradient-from to-gradient-to px-8 font-sans text-[13px] font-bold uppercase tracking-[0.06em] text-white transition-transform hover:brightness-110"
              >
                <RefreshIcon className="size-4" aria-hidden="true" />
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-white px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="mx-auto w-full max-w-container">
          <div className="relative overflow-hidden rounded-[40px] bg-[#101723] px-6 py-16 text-center sm:px-12 lg:py-20">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true" />
            <div className="relative mx-auto max-w-[819px]">
              <h2 className="capitalize text-3xl font-semibold leading-[1.2] text-white sm:text-4xl lg:text-[50px] lg:tracking-[-2px]">
                Start Your Research Journey
              </h2>
              <Prose className="mt-4 text-white/90">
                Partner with Unimrkt Research to uncover actionable market intelligence, understand your industry, and
                make confident business decisions.
              </Prose>
              <div className="mt-8 flex justify-center">
                <Button link={CTA_LINK} variant="secondary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={filteredImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}

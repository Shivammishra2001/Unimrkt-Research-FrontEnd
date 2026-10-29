'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/views/ui/Button';
import { ChevronIcon } from '@/views/ui/icons/ChevronIcon';
import { CloseIcon } from '@/views/ui/icons/CloseIcon';
import { RefreshIcon } from '@/views/ui/icons/RefreshIcon';
import type { GalleryData, GalleryImage } from '@/models/gallery';

const PAGE_SIZE = 9;

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
 * content between them. Pixel values below are the Figma geometry at the
 * 1900px frame; they collapse to fluid values below `lg`. */
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
      {/* Hero — Figma 827:7965: 768px, #040112 base, two 70%-opacity photo
          layers at their Figma offsets (clipped by the section), a 40%
          #010913 wash, a left-to-right dark gradient and a top fade that
          sits under the navbar. */}
      <section className="relative w-full overflow-hidden bg-[#040112] text-white lg:h-[768px]">
        <Image
          src="/images/gallery/hero-layer-b.jpg"
          alt=""
          priority
          width={2163}
          height={1227}
          sizes="2163px"
          className="pointer-events-none absolute left-[-31px] top-[-249px] hidden max-w-none opacity-70 lg:block"
        />
        <Image
          src="/images/gallery/hero-layer-b.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[60%_center] opacity-70 lg:hidden"
        />
        <div className="absolute inset-0 bg-[#010913]/40" aria-hidden="true" />
        <div
          className="absolute inset-y-0 left-0 w-full opacity-70 lg:w-[1064px]"
          style={{ backgroundImage: 'linear-gradient(to right, #02050e 37%, rgba(2,5,14,0) 100%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 top-0 h-[255px] opacity-90"
          style={{ backgroundImage: 'linear-gradient(to bottom, #06070d 37%, rgba(6,7,13,0) 100%)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1466px] px-4 pb-16 pt-36 sm:px-6 lg:px-8 lg:pb-0 lg:pt-[303px] min-[1500px]:px-0">
          <p className="inline-flex h-10 w-[178px] items-center gap-3 whitespace-nowrap rounded-lg border border-white/10 bg-white/10 px-[17px] py-[9px] font-sans text-[13px] font-bold uppercase leading-[15.6px] tracking-[3px] text-white backdrop-blur-[2px]">
            <span className="size-2 shrink-0 rounded-full bg-[#a82c31]" aria-hidden="true" />
            OUR GALLERY
          </p>
          <h1 className="mt-[15px] max-w-[748px] font-sans text-[36px] font-semibold capitalize leading-[43px] text-white sm:text-[48px] sm:leading-[58px] lg:text-[60px] lg:leading-[72px] lg:tracking-[-3px]">
            Moments that
            <br />
            show our journey
          </h1>
          <p className="mt-[12px] max-w-[630px] font-sans text-[16px] font-normal leading-[30.4px] text-white/80">
            Explore our gallery to see the people, processes and projects that drive our research excellence.
          </p>
        </div>
      </section>

      {/* Breadcrumb bar — 60px, shadow 0 2 8 rgba(0,0,0,.04) */}
      <div className="relative z-10 w-full bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex h-[60px] w-full max-w-container items-center gap-[7px] px-4 sm:px-6 lg:px-8 min-[1700px]:px-0">
          <Link href="/" className="font-sans text-[14px] font-semibold leading-[16.8px] text-[#b52c2c]">
            Home
          </Link>
          <ChevronIcon className="size-3 -rotate-90 text-[#868484]" aria-hidden="true" />
          <span className="font-sans text-[14px] font-normal leading-[16.8px] text-[#868484]">Gallery</span>
        </div>
      </div>

      {/* Heading + filters + grid */}
      <section className="relative overflow-hidden bg-white pt-[57px]">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[1629px] bg-[length:1900px_1411px] bg-[position:center_top] bg-repeat"
          style={{ backgroundImage: "url('/images/gallery/wave-pattern.png')" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8 min-[1700px]:px-0">
          <h2 className="text-center font-sans text-[34px] font-semibold capitalize leading-[41px] tracking-[-1.5px] text-[#02060e] sm:text-[42px] sm:leading-[50px] lg:text-[50px] lg:leading-[60px] lg:tracking-[-3px]">
            Our Gallery
          </h2>

          <div className="mt-[36px] flex flex-wrap justify-center gap-3">
            {data.categories.map((category) => {
              const isActive = category.id === activeCategory;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategoryChange(category.id)}
                  aria-pressed={isActive}
                  className={`flex h-[56px] items-center justify-center rounded-[3px] pb-[10px] pt-[9px] font-sans font-semibold uppercase leading-[normal] transition-colors motion-reduce:transition-none ${
                    isActive
                      ? 'bg-gradient-to-r from-gradient-from to-gradient-to px-[30px] text-[13.234px] text-white'
                      : 'border border-[#dedede] bg-white px-[29px] text-[13.125px] text-[#1e1e1e] hover:border-[#be2c28] hover:text-[#be2c28]'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          {visibleImages.length > 0 ? (
            <div className="mt-[51px] grid grid-cols-1 gap-[26px] sm:grid-cols-2 lg:grid-cols-3">
              {visibleImages.map((image, i) => {
                const globalIndex = filteredImages.indexOf(image);
                return (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setLightboxIndex(globalIndex)}
                    aria-label={`Open ${image.alt}`}
                    className="group relative aspect-[516/370] w-full overflow-hidden rounded-[30px]"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1700px) 516px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                      placeholder="blur"
                      blurDataURL={image.blurDataURL ?? shimmer(image.width, image.height)}
                      priority={i < 3}
                    />
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="mt-12 text-center opacity-70">No photos in this category yet.</p>
          )}

          {hasMore && (
            <div className="mt-[51px] flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="inline-flex h-[60px] items-center justify-center gap-2 rounded-[4px] bg-gradient-to-r from-gradient-from to-gradient-to px-10 py-[23px] font-sans text-[13px] font-bold uppercase leading-[16.9px] tracking-[0.78px] text-white transition hover:brightness-110 motion-reduce:transition-none"
              >
                <RefreshIcon className="size-5 shrink-0" aria-hidden="true" />
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA band — Figma 827:7946: 1740x455, r40, #101723 */}
      <section className="bg-white px-4 pb-10 pt-[100px] sm:px-6 lg:px-10 lg:pt-[143px]">
        <div className="mx-auto w-full max-w-[1740px]">
          <div className="relative flex min-h-[455px] flex-col items-center overflow-hidden rounded-[40px] bg-[#101723] px-6 pb-16 pt-16 text-center lg:pb-[106px] lg:pt-[108px]">
            <Image
              src="/images/gallery/cta-people.jpg"
              alt=""
              width={1838}
              height={1034}
              sizes="1838px"
              className="pointer-events-none absolute left-[-96px] top-[-203px] max-w-none opacity-20"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-[227px] rounded-b-[40px] opacity-70"
              style={{ backgroundImage: 'linear-gradient(to bottom, rgba(8,19,32,0) 0%, #081320 63%)' }}
              aria-hidden="true"
            />
            <h2 className="relative font-sans text-[30px] font-semibold capitalize leading-[34px] text-white sm:text-[36px] sm:leading-[41px] lg:text-[50px] lg:leading-[57px] lg:tracking-[-2px]">
              Start Your Research Journey
            </h2>
            <p className="relative mt-[10px] max-w-[819px] font-sans text-[16px] font-medium leading-[33.6px] text-white">
              Partner with Unimrkt Research to uncover actionable market intelligence, understand your industry, and
              make confident business decisions.
            </p>
            <div className="relative mt-9 flex justify-center lg:mt-[47px]">
              <Button link={CTA_LINK} variant="secondary" />
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

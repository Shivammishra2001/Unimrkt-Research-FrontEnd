import Link from 'next/link';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { ChevronIcon } from '@/views/ui/icons/ChevronIcon';
import type { ResolvedPrivacyPolicy } from './fallback';

/** /privacy-policy hero + breadcrumb — Figma node 1114:50556 (y0-828).
 * Same dark full-bleed shell as every other page's hero this session,
 * with a 2-level breadcrumb (Home > Privacy Policy) matching this node's
 * own breadcrumb text exactly. Unlike /contact's hero, this node draws
 * no CTA button under the subheading, so none is rendered here. The
 * eyebrow dot (`#A82C31`) and heading (2 literal lines, split on the
 * CMS field's own "\n") are this node's own exact values — not the
 * sitewide `brand-600` reused on other pages' hero chips. */
export function HeroSection({ hero }: { hero: ResolvedPrivacyPolicy['hero'] }) {
  const headingLines = hero.heading.split('\n');

  return (
    <>
      <section className="relative flex min-h-[480px] w-full flex-col justify-end overflow-hidden text-white sm:min-h-[560px] lg:min-h-[768px]">
        {hero.image ? (
          <StrapiImage image={hero.image} sizes="100vw" priority fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 bg-[#040112]" aria-hidden="true" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#040112] via-[#040112]/75 to-[#040112]/40" />
        <div className="absolute inset-0 bg-[#040112]/35" />
        <div className="relative z-10 mx-auto w-full max-w-container px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-[70px] lg:pt-40">
          <p className="inline-flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 px-[17px] py-[9px] backdrop-blur-[2px] font-sans text-[13px] font-bold uppercase tracking-[3px] text-white">
            <span className="size-2 shrink-0 rounded-full bg-[#a82c31]" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-3 max-w-[830px] text-4xl font-semibold capitalize leading-[1.2] text-white sm:text-5xl lg:text-[60px] lg:tracking-[-3px]">
            {headingLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-[670px] text-base leading-[1.9] text-white/80 sm:text-lg">{hero.subheading}</p>
        </div>
      </section>

      {/* Breadcrumb — Home > Privacy Policy */}
      <div className="w-full bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex w-full max-w-container items-center gap-2 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="shrink-0 font-sans text-sm font-semibold text-[#b52c2c]">
            Home
          </Link>
          <ChevronIcon className="size-3.5 shrink-0 rotate-90 text-slate-400" aria-hidden="true" />
          <span className="truncate font-sans text-sm text-[#868484]">Privacy Policy</span>
        </div>
      </div>
    </>
  );
}

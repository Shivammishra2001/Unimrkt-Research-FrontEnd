import Link from 'next/link';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { ChevronIcon } from '@/views/ui/icons/ChevronIcon';
import type { ResolvedCaseStudyDetail } from './fallback';

/** Hero — Figma node 1107:49842 (y0-1033). Distinct from every other
 * detail-page hero this session: light/off-white bg (not dark), navy
 * category badge, centered black heading/subheading, then a large
 * photo, then a 3-level breadcrumb (Home > Case Study > {title}) —
 * confirmed via a real screenshot, not assumed from the usual dark-hero
 * pattern. */
export function HeroSection({ detail }: { detail: ResolvedCaseStudyDetail }) {
  return (
    <>
      <section className="bg-white pb-16 pt-32 sm:pb-20 lg:pt-40">
        <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-block rounded-[2px] bg-ink2 px-[10px] py-[10px] font-sans text-sm font-medium text-white">{detail.category}</span>
            <h1 className="mt-6 text-3xl font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">{detail.title}</h1>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-[1.9] text-heading/70">{detail.hero.subheading}</p>
          </div>

          {detail.hero.image && (
            <div className="relative mx-auto mt-10 aspect-[1239/508] max-w-5xl overflow-hidden rounded-[40px] bg-slate-100">
              <StrapiImage image={detail.hero.image} sizes="(min-width: 1024px) 1024px, 100vw" fill priority className="object-cover" />
            </div>
          )}
        </div>
      </section>

      {/* Breadcrumb — Home > Case Study > {title} */}
      <div className="w-full bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex w-full max-w-container items-center gap-2 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="shrink-0 font-sans text-sm font-semibold text-[#b52c2c]">
            Home
          </Link>
          <ChevronIcon className="size-3.5 shrink-0 rotate-90 text-slate-400" aria-hidden="true" />
          <Link href="/case-study" className="shrink-0 font-sans text-sm font-semibold text-[#b52c2c]">
            Case Study
          </Link>
          <ChevronIcon className="size-3.5 shrink-0 rotate-90 text-slate-400" aria-hidden="true" />
          <span className="min-w-0 flex-1 truncate font-sans text-sm text-[#868484]">{detail.title}</span>
        </div>
      </div>
    </>
  );
}

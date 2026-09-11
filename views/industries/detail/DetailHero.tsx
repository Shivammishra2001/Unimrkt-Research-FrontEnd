import Link from 'next/link';
import { Button } from '@/views/ui/Button';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { ChevronIcon } from '@/views/ui/icons/ChevronIcon';
import type { ResolvedIndustryDetail } from './fallback';

/** /industries/[slug] hero — Figma node 384:6205 (y0-828). CMS-first,
 * template-fallback (resolved by fallback.ts) — always renders the full
 * hero, never collapses. Breadcrumb bar — Figma node 384:6567-6573
 * (`bg-white`, shadow `0px_2px_8px_0px_rgba(0,0,0,0.04)` — same shell as
 * every other breadcrumb on the site). */
export function DetailHero({ hero, title }: { hero: ResolvedIndustryDetail['hero']; title: string }) {
  return (
    <>
      <section className="relative flex min-h-[520px] w-full flex-col justify-end overflow-hidden text-white sm:min-h-[600px] lg:min-h-[768px]">
        {hero.image ? (
          <StrapiImage image={hero.image} sizes="100vw" priority fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 bg-[#040112]" aria-hidden="true" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#040112] via-[#040112]/75 to-[#040112]/40" />
        <div className="absolute inset-0 bg-[#040112]/35" />
        <div className="relative z-10 mx-auto w-full max-w-container px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-[70px] lg:pt-40">
          <p className="inline-flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 px-[17px] py-[9px] backdrop-blur-[2px] font-sans text-[13px] font-bold uppercase tracking-[3px] text-white">
            <span className="size-2 shrink-0 rounded-full bg-brand-600" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-3 max-w-[930px] text-4xl font-semibold capitalize leading-[1.2] text-white sm:text-5xl lg:text-[60px] lg:tracking-[-3px]">
            {hero.heading}
          </h1>
          <p className="mt-6 max-w-[884px] text-base leading-[1.9] text-white/85 sm:text-lg">{hero.subheading}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            {hero.actions.map((action) => (
              <Button key={action.id} link={action} />
            ))}
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="w-full bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex w-full max-w-container items-center gap-2 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="shrink-0 font-sans text-sm font-semibold text-[#b52c2c]">
            Home
          </Link>
          <ChevronIcon className="size-3.5 shrink-0 rotate-90 text-slate-400" aria-hidden="true" />
          <Link href="/industries" className="shrink-0 font-sans text-sm font-semibold text-[#b52c2c]">
            Industries
          </Link>
          <ChevronIcon className="size-3.5 shrink-0 rotate-90 text-slate-400" aria-hidden="true" />
          <span className="truncate font-sans text-sm text-[#868484]">{title}</span>
        </div>
      </div>
    </>
  );
}

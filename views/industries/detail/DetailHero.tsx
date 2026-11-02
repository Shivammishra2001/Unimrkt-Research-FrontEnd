import { Breadcrumb } from '@/views/ui/Breadcrumb';
import { Button } from '@/views/ui/Button';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { ResolvedIndustryDetail } from './fallback';

/** /industries/[slug] hero — Figma node 384:6205 (y0-828). CMS-first,
 * template-fallback (resolved by fallback.ts) — always renders the full
 * hero, never collapses. Breadcrumb bar — Figma node 384:6567-6573
 * (`bg-white`, shadow `0px_2px_8px_0px_rgba(0,0,0,0.04)` — same shell as
 * every other breadcrumb on the site). */
export function DetailHero({ hero, title }: { hero: ResolvedIndustryDetail['hero']; title: string }) {
  return (
    <>
      <section className="relative w-full overflow-hidden bg-[#040112] text-white lg:h-[768px]">
        {/* 384:6237 — photo at 70%, drawn 2300x998 and cropped to the 1900x768 frame (zoomed ~1.2x, mirrored as drawn: the frame is rotated 180° and flipped). */}
        {hero.image && (
          <StrapiImage image={hero.image} sizes="100vw" priority fill className="origin-center object-cover opacity-70 [object-position:49%_57%] [transform:scale(-1.21,1.21)]" />
        )}
        {/* 384:6238 — #010913 wash at 40%. */}
        <div className="absolute inset-0 bg-[#010913]/40" aria-hidden="true" />
        {/* 384:6239 — 1064px side shade, #02050e @ 80%, darkest on the left (transparent -> dark at 63%), so the copy sits on a deep, moody ground. */}
        <div
          className="absolute inset-y-0 left-0 w-[1064px] max-w-full opacity-80"
          style={{ backgroundImage: 'linear-gradient(to left, rgba(0,0,0,0) 0%, #02050e 63%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 top-0 h-[255px] opacity-[0.85]"
          style={{ backgroundImage: 'linear-gradient(to bottom, #06070d 37%, rgba(6,7,13,0) 100%)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1466px] px-4 pb-16 pt-36 sm:px-6 lg:px-8 lg:pb-0 lg:pt-[276px] min-[1500px]:px-0">
          <p className="inline-flex h-10 items-center gap-3 whitespace-nowrap rounded-lg border border-white/10 bg-white/10 px-[17px] py-[9px] font-sans text-[13px] font-bold uppercase leading-[15.6px] tracking-[3px] text-white backdrop-blur-[2px]">
            <span className="size-2 shrink-0 rounded-full bg-[#a82c31]" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-[14.5px] max-w-[960px] font-sans text-[36px] font-semibold capitalize leading-[43px] text-white sm:text-[48px] sm:leading-[58px] lg:text-[60px] lg:leading-[72px] lg:tracking-[-3px]">
            {/* Hyphenated words ("Data-Driven") stay on one line instead of splitting after the hyphen. */}
            {hero.heading.split(' ').map((word, i) => (
              <span key={i}>
                {i > 0 && ' '}
                {word.includes('-') ? <span className="whitespace-nowrap">{word}</span> : word}
              </span>
            ))}
          </h1>
          <p className="mt-[12.8px] max-w-[884px] font-sans text-[16px] font-normal leading-[30.4px] text-white/80">{hero.subheading}</p>
          <div className="mt-[44.3px] flex flex-wrap gap-5">
            {hero.actions.map((action, i) => (
              <Button key={action.id} link={i > 0 ? { ...action, variant: 'ghost' } : action} className={i > 0 ? 'border border-white' : undefined} />
            ))}
          </div>
        </div>
      </section>

      <Breadcrumb items={[{ label: 'Home', href: '/'},{ label: 'Industries', href: '/industries'},{ label: title}]} />
    </>
  );
}

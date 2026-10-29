import { Breadcrumb } from '@/views/ui/Breadcrumb';
import { Button } from '@/views/ui/Button';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { ResolvedCaseStudy } from './fallback';

/** /case-study hero + breadcrumb — Figma node 1023:45614 (y0-828). Same
 * dark full-bleed shell as every other detail-page hero this session,
 * with a 2-level breadcrumb (Home > Case Study) matching this node's
 * own breadcrumb text exactly. */
export function HeroSection({ hero }: { hero: ResolvedCaseStudy['hero'] }) {
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
            <span className="size-2 shrink-0 rounded-full bg-brand-600" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-3 max-w-[830px] text-4xl font-semibold leading-[1.2] text-white sm:text-5xl lg:text-[60px] lg:tracking-[-3px]">
            {hero.heading}
          </h1>
          <p className="mt-6 max-w-[820px] text-base leading-[1.9] text-white/85 sm:text-lg">{hero.subheading}</p>
          <div className="mt-8">
            <Button link={hero.cta} />
          </div>
        </div>
      </section>

      <Breadcrumb items={[{ label: 'Home', href: '/'},{ label: 'Case Study'}]} />
    </>
  );
}

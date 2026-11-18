import Image from 'next/image';
import { Breadcrumb, type BreadcrumbItem } from '@/views/ui/Breadcrumb';
import { Button } from '@/views/ui/Button';
import type { ServicesListingContent } from './content';

const HERO_SRC = '/images/services/listing/hero.webp';

/** /services hero + breadcrumb — Figma 1231:77092 (1900x768) + 1231:77301. #040112 base, the laptop/report photo at 70%
 * (1900x1019 from y-85), a 40% #010913 wash, an 80% #02050e fade over the left 1064px (solid to 37%), and the 255px
 * #06070d top fade under the transparent navbar. Pill at y276 (x217 = the 1466px column), 60/72px title (-3px, 680px),
 * 16/30.4px subtitle @ 80% (708px), then the 244x60 gradient and 272x60 white-outline buttons 20px apart at y596. */
const LISTING_IMAGE = 'lg:top-[-85px] lg:h-[1019px] min-[1900px]:h-auto';

/** Opt-in overrides (all default to the /services listing frame) so /services/[slug] (Figma 474:5771, same hero
 * construction) reuses this exact hero: its own breadcrumb trail, photo crop, and title/subtitle measure. */
export function ServicesHero({
  content,
  breadcrumb = [{ label: 'Home', href: '/' }, { label: 'Services' }],
  imageClassName = LISTING_IMAGE,
  headingClassName = 'max-w-[700px] [text-wrap:balance]',
  subheadingClassName = 'max-w-[708px]',
}: {
  content: ServicesListingContent['hero'];
  breadcrumb?: BreadcrumbItem[];
  imageClassName?: string;
  headingClassName?: string;
  subheadingClassName?: string;
}) {
  // A line break typed in the CMS heading is kept as a line break.
  const lines = content.heading.split('\n');
  return (
    <>
      <section className="relative w-full overflow-hidden bg-[#040112] text-white lg:h-[768px]">
        <Image
          src={content.image?.src ?? HERO_SRC}
          alt=""
          priority
          width={2000}
          height={1072}
          sizes="100vw"
          className={`pointer-events-none absolute inset-x-0 top-0 h-full w-full object-cover opacity-70 ${imageClassName}`}
        />
        <div className="absolute inset-0 bg-[#010913]/40" aria-hidden="true" />
        <div
          className="absolute inset-y-0 left-0 w-full opacity-80 lg:w-[56%]"
          style={{ backgroundImage: 'linear-gradient(to left, rgba(2,5,14,0) 0%, #02050e 63%)' }}
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
            {content.eyebrow}
          </p>
          <h1 className={`mt-[14.5px] font-sans text-[36px] font-semibold capitalize leading-[43px] text-white sm:text-[48px] sm:leading-[58px] lg:text-[60px] lg:leading-[72px] lg:tracking-[-3px] ${headingClassName}`}>
            {lines.map((line, i) => (
              <span key={i} className={lines.length > 1 ? 'block' : undefined}>
                {line}
              </span>
            ))}
          </h1>
          <p className={`mt-[12.8px] font-sans text-[16px] font-normal leading-[30.4px] text-white/80 ${subheadingClassName}`}>{content.subheading}</p>
          <div className="mt-[44.3px] flex flex-wrap gap-5 lg:mt-[48.3px]">
            {content.actions.map((action, i) => (
              <Button key={action.id} link={action} variant={i === 0 ? 'primary' : 'ghost'} className={i === 0 ? '' : 'border border-white'} />
            ))}
          </div>
        </div>
      </section>

      <Breadcrumb items={breadcrumb} />
    </>
  );
}

import Link from 'next/link';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { ChevronIcon } from '@/views/ui/icons/ChevronIcon';
import type { ResolvedOurTeam } from './fallback';

/** /our-team hero + breadcrumb — Figma node 1126:54624 (y0-828).
 * Hero group 1126:54628: 768px, #040112 base, the photo at 70% opacity
 * (2050x1033 at 0,-205), a 40% #010913 wash, a left dark gradient
 * (1064px, 80%) and a top fade under the transparent navbar (255px,
 * 85%). The navbar itself is global and goes transparent on this route
 * (views/sections/Navbar.tsx). Breadcrumb is 3 levels (Home > About Us >
 * Our Team); "About Us" links to /our-company, the site's About page. */
export function HeroSection({ hero }: { hero: ResolvedOurTeam['hero'] }) {
  const headingLines = hero.heading.split('\n');

  return (
    <>
      <section className="relative w-full overflow-hidden bg-[#040112] text-white lg:h-[768px]">
        {hero.image && (
          <div className="absolute inset-0 opacity-70 lg:inset-auto lg:left-0 lg:top-[-205px] lg:h-[1033px] lg:w-[2050px]">
            <StrapiImage image={hero.image} sizes="(min-width: 1024px) 2050px, 100vw" priority fill className="object-cover object-[60%_center]" />
          </div>
        )}
        <div className="absolute inset-0 bg-[#010913]/40" aria-hidden="true" />
        <div
          className="absolute inset-y-0 left-0 w-full opacity-80 lg:w-[1064px]"
          style={{ backgroundImage: 'linear-gradient(to right, #02050e 37%, rgba(2,5,14,0) 100%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 top-0 h-[255px] opacity-[0.85]"
          style={{ backgroundImage: 'linear-gradient(to bottom, #06070d 37%, rgba(6,7,13,0) 100%)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1466px] px-4 pb-16 pt-36 sm:px-6 lg:px-8 lg:pb-0 lg:pt-[305px] min-[1500px]:px-0">
          <p className="inline-flex h-10 w-[196px] items-center gap-3 whitespace-nowrap rounded-lg border border-white/10 bg-white/10 px-[17px] py-[9px] font-sans text-[13px] font-bold uppercase leading-[15.6px] tracking-[3px] text-white backdrop-blur-[2px]">
            <span className="size-2 shrink-0 rounded-full bg-[#a82c31]" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-[15px] max-w-[830px] font-sans text-[36px] font-semibold capitalize leading-[43px] text-white sm:text-[48px] sm:leading-[58px] lg:text-[60px] lg:leading-[72px] lg:tracking-[-3px]">
            {headingLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-[10px] max-w-[514px] font-sans text-[16px] font-normal leading-[30.4px] text-white/80">{hero.subheading}</p>
        </div>
      </section>

      {/* Breadcrumb bar — 60px, shadow 0 2 8 rgba(0,0,0,.04) */}
      <div className="relative z-10 w-full bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex h-[60px] w-full max-w-container items-center gap-[7px] px-4 sm:px-6 lg:px-8 min-[1700px]:px-0">
          <Link href="/" className="shrink-0 font-sans text-[14px] font-semibold leading-[16.8px] text-[#b52c2c]">
            Home
          </Link>
          <ChevronIcon className="size-3 shrink-0 -rotate-90 text-[#868484]" aria-hidden="true" />
          <Link href="/our-company" className="shrink-0 font-sans text-[14px] font-semibold leading-[16.8px] text-[#b52c2c]">
            About Us
          </Link>
          <ChevronIcon className="size-3 shrink-0 -rotate-90 text-[#868484]" aria-hidden="true" />
          <span className="min-w-0 flex-1 truncate font-sans text-[14px] font-normal leading-[16.8px] text-[#868484]">Our Team</span>
        </div>
      </div>
    </>
  );
}

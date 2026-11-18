import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from '@/views/industries/listing/shared';
import { lato } from '@/views/services/fonts';
import type { ResolvedCapability, ResolvedServiceDetail } from './fallback';

const EASE = 'ease-[cubic-bezier(0.25,0.1,0.25,1)]';

/** One 384x480 photo card — Figma 727:7752 (rest) -> 727:7751 (hover, Smart Animate). Rest: #01040c, the photo, a
 * transparent->black fade over the lower 76%, the 21/28px Lato title at the bottom-left (x48, ending 38px up). Hover:
 * the photo zooms ~9% (1000ms, the site's image-zoom curve), a full 70% black fade and a 30% #6c2a4a -> #be2c28 wash
 * come in, and the 14/26.2px description and the 48px r17 #a3282a arrow button open beneath the title, lifting it
 * (to y290 with Figma's two-line copy).
 * Touch screens (<lg) have no hover, so they show the hover layout outright. */
function CapabilityCard({ item, priority }: { item: ResolvedCapability; priority?: boolean }) {
  const inner = (
    <>
      {item.image && (
        <Image
          src={item.image.src}
          alt={item.image.alt || item.title}
          fill
          priority={priority}
          sizes="(min-width: 1700px) 384px, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className={`object-cover object-[50%_52%] transform-gpu transition-transform duration-[1000ms] ${EASE} will-change-transform group-hover:scale-[1.086] motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
        />
      )}
      {/* Rest scrim (Figma 727:7692): transparent -> black over the lower 76%. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[76%] bg-gradient-to-b from-black/0 to-black" aria-hidden="true" />
      {/* Hover layers (Figma 727:7804/7809/7810): 70% full-height fade + 30% brand wash. Always on below lg. */}
      <div className={`pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-500 ${EASE} lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100`} aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-gradient-from to-gradient-to opacity-30" />
      </div>

      {/* Bottom-anchored 38px up (where Figma's button and rest title both end): on hover the description + arrow row
          opens (grid-rows 0fr -> 1fr) and lifts the title, so longer copy never gets clipped. */}
      <div className="absolute inset-x-0 bottom-[7.9%] px-[12.5%]">
        <h3 className={`${lato.className} text-[19px] font-bold leading-[28px] text-white sm:text-[21px]`}>{item.title}</h3>
        <div className={`grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ${EASE} lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] lg:group-focus-visible:grid-rows-[1fr] motion-reduce:transition-none`}>
          <div className={`min-h-0 overflow-hidden transition-opacity duration-500 ${EASE} lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100`}>
            <p className="mt-[8px] pr-[1%] font-sans text-[14px] font-normal leading-[1.87] text-white">{item.description}</p>
            {item.href && (
              <span className="mt-[20px] flex size-12 items-center justify-center rounded-[17px] bg-[#a3282a]" aria-hidden="true">
                <Image src="/icons/services/detail/arrow-up-right.svg" alt="" width={34} height={34} className="size-[28px] brightness-0 invert" />
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );

  const shell = 'group relative block aspect-[384/480] overflow-hidden rounded-[24px] bg-[#01040c] outline-none focus-visible:ring-2 focus-visible:ring-[#a82c31] focus-visible:ring-offset-2 lg:rounded-[30px]';
  return item.href ? (
    <Link href={item.href} className={shell} aria-label={`${item.title} — ${item.description}`}>
      {inner}
    </Link>
  ) : (
    <div className={shell}>{inner}</div>
  );
}

/** "Our {Title} Services" — Figma 474:5922-5923 + 483:7158 + 727:7869-7896 (y1867-2726, #f9f9f7). Eyebrow cap-top
 * +79, 50/60 title, 2-line body (1090px), then four 384x480 photo cards ~21px apart from y2151 across the 1600px row.
 * Cards: the service's CMS features (photo + title), the hover copy, and an arrow to the matching sub-service. */
export function CapabilitiesSection({ capabilities }: { capabilities: ResolvedServiceDetail['capabilities'] }) {
  return (
    <section className="bg-[#f9f9f7] py-16 lg:py-10">
      <SectionHeader
        eyebrow={capabilities.eyebrow}
        title={capabilities.heading}
        titleMaxWidth="1100px"
        bodyMaxWidth="1090px"
        className="px-4 sm:px-6"
        body={<div className="lg:mt-[10px]">{capabilities.body}</div>}
      />
      <ul className="mx-auto mt-10 grid w-full max-w-[1664px] grid-cols-1 gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:mt-[43px] lg:grid-cols-4 lg:gap-[21.33px] lg:px-8 min-[1700px]:max-w-[1600px] min-[1700px]:px-0">
        {capabilities.items.map((item, i) => (
          <li key={item.id}>
            <CapabilityCard item={item} priority={i < 2} />
          </li>
        ))}
      </ul>
    </section>
  );
}

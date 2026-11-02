import { Container } from '@/views/ui/Container';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { ResolvedIndustryDetail } from './fallback';

/** "Why {Title} Research?" — Figma node 384:6404-6408 (y1913-2685), cards
 * shell = rounded-blog/shadow-blog (same as BlogCard/IndustryCard).
 * CMS-first, template-fallback — always renders 3 cards, never
 * collapses. Fallback cards have no photo, so they fall through to the
 * same icon resolver the icon-only sections use. */
const FALLBACK_PHOTOS = [
  '/images/industries/detail/why-customer-preferences.jpg',
  '/images/industries/detail/why-competitors.jpg',
  '/images/industries/detail/why-product-strategy.jpg',
];

export function WhyResearchSection({ whyResearch }: { whyResearch: ResolvedIndustryDetail['whyResearch'] }) {
  return (
    <section className="relative overflow-hidden border-y border-[#d9d9d9]/50 bg-white py-16 sm:py-20 lg:min-h-[773px] lg:pt-[77px] lg:pb-[85px]">
      {/* Figma 384:6401 — the topographic wave raster at 50%, drawn 3222x1411 and cropped to the 1900x771 band
          (650px in, 92px down). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/industries/detail/why-wave-bg.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[calc(50%+11.56px)] top-[-92px] hidden h-[1411px] w-[3222px] max-w-none -translate-x-1/2 object-cover opacity-50 sm:block"
      />
      <Container className="relative max-w-[1600px] min-[1700px]:px-0">
        <header className="mx-auto max-w-[900px] text-center">
          <p className="font-sans text-[13px] font-bold uppercase leading-[1.2] tracking-[3px] text-[#cc1f1f]">{whyResearch.eyebrow}</p>
          <h2 className="mx-auto mt-2.5 max-w-[640px] font-sans text-3xl font-semibold capitalize leading-[1.2] text-[#02060e] sm:text-4xl lg:text-[50px] lg:leading-[1.2] lg:tracking-[-3px]">
            {whyResearch.heading}
          </h2>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-[35px] lg:grid-cols-3 lg:gap-9">
          {whyResearch.cards.map((card, i) => {
            // Figma 384:6406-6408 draws a photo on every card; CMS uploads win, otherwise its generic photos.
            const image = card.image ?? { src: FALLBACK_PHOTOS[i % FALLBACK_PHOTOS.length], alt: card.title, width: 900, height: 600 };
            return (
              // Figma 363:3667: 509x430, r24, 1px #eee, 6/6/54 shadow; photo inset 20px (469x260, r20); title 20px at x=39.
              <div
                key={card.id}
                className="group flex min-h-[430px] cursor-pointer flex-col overflow-hidden rounded-[24px] border border-[#eee] bg-white shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:transform-none"
              >
                <div className="relative m-5 aspect-[469/260] shrink-0 overflow-hidden rounded-[20px] bg-slate-100">
                  <StrapiImage
                    image={image}
                    sizes="(min-width: 1024px) 469px, 100vw"
                    fill
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-[7px] px-[39px] pb-[15px] pt-[8px]">
                  <h3 className="font-sans text-[20px] font-semibold leading-[1.34] text-[#04264e]">{card.title}</h3>
                  {card.description && <p className="font-sans text-[14px] leading-[1.73] text-black/70">{card.description}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

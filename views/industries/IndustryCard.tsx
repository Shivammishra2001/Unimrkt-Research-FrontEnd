import Image from 'next/image';
import Link from 'next/link';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { IndustrySummary } from '@/models/industry';

/** /industries grid card — Figma node 363:3230 ("Component 911") as placed
 * on 1384:26772: 509x430, white, 1px #eee, r24, shadow 6 6 54
 * rgba(0,0,0,.08). Image panel inset 20px (469x260, r20); title
 * Montserrat 600 20/26.8px #04264e at x=39; summary 14/22.8px @ 70%
 * black, clamped to 2 lines. Links to /industries/${slug}. The node
 * draws no hover state: the image zooms 5% over 300ms. */
export function IndustryCard({ industry, priority }: { industry: IndustrySummary; priority?: boolean }) {
  return (
    <Link
      href={`/industries/${industry.slug}`}
      className="group flex h-full w-full flex-col rounded-[24px] border border-[#eee] bg-white p-[19px] pb-[43px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)]"
    >
      <div className="relative aspect-[469/260] w-full shrink-0 overflow-hidden rounded-[20px] bg-[#d1d1d1]">
        {industry.icon ? (
          <StrapiImage
            image={industry.icon}
            sizes="(min-width: 1700px) 469px, (min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            fill
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 motion-reduce:transition-none"
          />
        ) : (
          // No photo uploaded in Strapi for this industry yet — brand placeholder instead of a blank box.
          <Image
            src="/images/industries/card-fallback.jpg"
            alt=""
            fill
            sizes="(min-width: 1700px) 469px, (min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 motion-reduce:transition-none"
          />
        )}
      </div>
      <h3 className="mt-[26.4px] px-[19px] font-sans text-[20px] font-semibold leading-[26.8px] text-[#04264e]">{industry.title}</h3>
      {industry.summary && (
        <p className="mt-[7.2px] line-clamp-2 pl-[19px] font-sans text-[14px] font-normal leading-[22.8px] text-black opacity-70">
          {industry.summary}
        </p>
      )}
    </Link>
  );
}

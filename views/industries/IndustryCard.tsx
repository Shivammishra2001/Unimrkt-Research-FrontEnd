import Link from 'next/link';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { IndustrySummary } from '@/models/industry';

/** /industries grid card — Figma node 363:3230 ("Component 911"): white,
 * `#eee` border, `rounded-blog`/`shadow-blog` (already tokenized for
 * exactly this card shape, tailwind.config.ts node 740:4782), image
 * inset with rounded top corners, title Montserrat SemiBold 20px `ink2`,
 * summary Montserrat Regular 14px black/70. Links to
 * /industries/${industry.slug} — same underlying IndustrySummary data,
 * no schema change. */
export function IndustryCard({ industry, priority }: { industry: IndustrySummary; priority?: boolean }) {
  return (
    <Link
      href={`/industries/${industry.slug}`}
      className="group flex h-full w-full flex-col overflow-hidden rounded-blog border border-card-border bg-white shadow-blog transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="relative m-4 aspect-[469/260] shrink-0 overflow-hidden rounded-2xl bg-slate-100">
        {industry.icon && (
          <StrapiImage
            image={industry.icon}
            sizes="(min-width: 1024px) 33vw, 100vw"
            priority={priority}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6 pt-2">
        <h3 className="font-sans text-xl font-semibold leading-[1.34] text-ink2">{industry.title}</h3>
        {industry.summary && (
          <p className="font-sans text-sm leading-[1.73] text-black/70 line-clamp-2">{industry.summary}</p>
        )}
      </div>
    </Link>
  );
}

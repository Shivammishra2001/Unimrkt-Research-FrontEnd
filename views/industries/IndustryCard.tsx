import Link from 'next/link';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { Heading } from '@/views/ui/Heading';
import { Prose } from '@/views/ui/Prose';
import type { IndustrySummary } from '@/models/industry';

/** Pure card for the /industries grid — links to /industries/${industry.slug}.
 * Mirrors ServiceCard exactly, minus basePrice (industries have none). */
export function IndustryCard({ industry, priority }: { industry: IndustrySummary; priority?: boolean }) {
  return (
    <Link
      href={`/industries/${industry.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 transition-shadow hover:shadow-card"
    >
      {industry.icon && (
        <StrapiImage
          image={industry.icon}
          sizes="(min-width: 1024px) 33vw, 100vw"
          priority={priority}
          className="aspect-[4/3] w-full object-cover"
        />
      )}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <Heading as="h3" size="h3">
          {industry.title}
        </Heading>
        {industry.summary && <Prose className="text-sm opacity-70">{industry.summary}</Prose>}
      </div>
    </Link>
  );
}

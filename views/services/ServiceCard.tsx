import Link from 'next/link';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { Heading } from '@/views/ui/Heading';
import { Prose } from '@/views/ui/Prose';
import type { ServiceSummary } from '@/models/service';

/** Pure card for the /services grid — links to /services/${service.slug}. */
export function ServiceCard({ service, priority }: { service: ServiceSummary; priority?: boolean }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 transition-shadow hover:shadow-card"
    >
      {service.thumbnail && (
        <StrapiImage
          image={service.thumbnail}
          sizes="(min-width: 1024px) 33vw, 100vw"
          priority={priority}
          className="aspect-[4/3] w-full object-cover"
        />
      )}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <Heading as="h3" size="h3">
          {service.title}
        </Heading>
        <Prose className="text-sm opacity-70">{service.summary}</Prose>
        {service.basePrice && <p className="mt-auto pt-2 text-sm font-semibold text-brand-600">{service.basePrice}</p>}
      </div>
    </Link>
  );
}

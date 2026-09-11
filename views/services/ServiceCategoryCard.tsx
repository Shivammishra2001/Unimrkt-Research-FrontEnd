import Link from 'next/link';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { Prose } from '@/views/ui/Prose';
import { ChevronIcon } from '@/views/ui/icons/ChevronIcon';
import type { ServiceTreeItemModel } from '@/models/service';

const MAX_VISIBLE_CHILDREN = 4;

/**
 * /services grid card — Figma node 474:6135's dark photo-card treatment
 * (`bg-[#000311]`, `rounded-industry` [30px], bottom-left title over a
 * gradient scrim) for the photo half, plus a content footer for the
 * sub-service chips/"Explore Service" link the real dynamic data needs
 * (Figma's own mockup cards are photo-only, sized for a fixed 5-card
 * masonry that doesn't fit this hierarchy's real 8-parent/variable-child
 * count — the card style is matched, the fixed masonry layout isn't).
 */
export function ServiceCategoryCard({ category, priority }: { category: ServiceTreeItemModel; priority?: boolean }) {
  const childCount = category.children.length;
  const visibleChildren = category.children.slice(0, MAX_VISIBLE_CHILDREN);
  const hiddenCount = childCount - visibleChildren.length;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-industry border border-card-border bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <Link
        href={`/services/${category.slug}`}
        aria-label={`Explore ${category.title}`}
        className="relative block aspect-[516/370] w-full shrink-0 bg-[#000311]"
      >
        {category.thumbnail && (
          <StrapiImage
            image={category.thumbnail}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            fill
            className="object-cover opacity-80 transition-transform duration-300 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
          <h3 className="font-sans text-xl font-semibold leading-[1.2] text-white">{category.title}</h3>
          {childCount > 0 && (
            <span className="shrink-0 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
              {childCount} {childCount === 1 ? 'Service' : 'Services'}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <Prose className="text-sm opacity-70">{category.summary}</Prose>

        {visibleChildren.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label={`${category.title} sub-services`}>
            {visibleChildren.map((child) => (
              <li key={child.slug}>
                <Link
                  href={`/services/${category.slug}#${child.slug}`}
                  className="flex min-h-[44px] items-center rounded-full border border-card-border px-4 text-xs font-medium text-ink2 transition-colors hover:border-brand-600 hover:text-brand-600"
                >
                  {child.title}
                </Link>
              </li>
            ))}
            {hiddenCount > 0 && (
              <li className="flex min-h-[44px] items-center rounded-full border border-card-border px-4 text-xs font-medium opacity-60">
                +{hiddenCount} more
              </li>
            )}
          </ul>
        )}

        <Link
          href={`/services/${category.slug}`}
          aria-label={`Explore ${category.title}`}
          className="mt-auto inline-flex min-h-[44px] items-center gap-2 font-nav text-sm font-semibold text-brand-600 hover:underline"
        >
          Explore Service
          <ChevronIcon className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

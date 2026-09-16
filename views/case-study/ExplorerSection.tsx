'use client';

import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/views/ui/Container';
import { ChevronIcon } from '@/views/ui/icons/ChevronIcon';
import { CaseStudyCard } from './CaseStudyCard';
import type { ResolvedCaseStudy } from './fallback';

const PAGE_SIZE = 6; // matches the node's own 3x2 grid
const ALL = 'All';

const PILL_CLASS =
  'h-[65px] w-full rounded-xl border border-[#e0e0e0] bg-white px-[17px] font-sans text-[15px] font-semibold text-ink2 focus:outline-none focus:ring-2 focus:ring-brand-600 disabled:cursor-not-allowed disabled:opacity-60';

function useTabMotionProps() {
  const shouldReduceMotion = useReducedMotion();
  return shouldReduceMotion ? {} : { whileHover: { scale: 1.03 }, whileTap: { scale: 0.98 }, transition: { duration: 0.15 } };
}

/**
 * "Explore Our Research Stories" — Figma node 1023:45614 (y828-2427).
 * Heading/body + filter bar (All tab / Industries dropdown / Research
 * Type dropdown, Frame 1686557982) + 6-card grid (Component 1055-1060)
 * + pagination (Pagination, node 1023:45942). CMS-first (the case
 * studies themselves), template-fallback for the section's own copy.
 *
 * "Industries" options are derived from the real `category` field on
 * every case study — never invented — same convention as
 * /work-with-us's JobsSection filters. "Research Type" is rendered
 * exactly as drawn (white pill, chevron) but disabled: unlike
 * Industries, no research-type dimension exists anywhere in the drawn
 * content or the case-study schema (Figma shows the dropdown closed
 * with no option list, and no card displays a research-type value), so
 * wiring it to real filtering isn't possible without inventing values.
 *
 * Pagination is real, not a static 5-page mockup: with the page's
 * default 6 seeded case studies (one page at PAGE_SIZE=6), only page 1
 * renders and the prev/next chevrons are disabled — the number of page
 * squares grows honestly as more case studies are published.
 */
export function ExplorerSection({ explorer }: { explorer: ResolvedCaseStudy['explorer'] }) {
  const tabMotionProps = useTabMotionProps();
  const [category, setCategory] = useState<string>(ALL);
  const [page, setPage] = useState(1);

  const categories = useMemo(() => Array.from(new Set(explorer.items.map((i) => i.category))), [explorer.items]);

  const filtered = useMemo(
    () => (category === ALL ? explorer.items : explorer.items.filter((i) => i.category === category)),
    [explorer.items, category]
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visibleItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function selectCategory(next: string) {
    setCategory(next);
    setPage(1);
  }

  return (
    <section id="case-studies" className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{explorer.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">{explorer.heading}</h2>
          <p className="mt-4 text-base leading-[1.9] text-heading/80">{explorer.body}</p>
        </div>

        <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <motion.button
            type="button"
            onClick={() => selectCategory(ALL)}
            aria-pressed={category === ALL}
            className={`flex h-[65px] w-full shrink-0 items-center justify-center rounded-xl px-[30px] font-sans text-[13px] font-semibold uppercase tracking-wide transition-colors sm:w-auto ${
              category === ALL ? 'bg-gradient-to-r from-gradient-from to-gradient-to text-white' : 'border border-[#e0e0e0] bg-white text-ink2'
            }`}
            {...tabMotionProps}
          >
            {explorer.allLabel}
          </motion.button>

          <div className="relative w-full sm:w-[240px]">
            <select
              value={category === ALL ? '' : category}
              onChange={(e) => selectCategory(e.target.value || ALL)}
              aria-label={explorer.industriesLabel}
              className={`${PILL_CLASS} appearance-none`}
            >
              <option value="" disabled>
                {explorer.industriesLabel}
              </option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronIcon className="pointer-events-none absolute right-[17px] top-1/2 size-4 -translate-y-1/2 rotate-90 text-ink2" aria-hidden="true" />
          </div>

          <div className="relative w-full sm:w-[240px]">
            <select disabled defaultValue="" aria-label={explorer.researchTypeLabel} className={`${PILL_CLASS} appearance-none`}>
              <option value="">{explorer.researchTypeLabel}</option>
            </select>
            <ChevronIcon className="pointer-events-none absolute right-[17px] top-1/2 size-4 -translate-y-1/2 rotate-90 text-ink2/60" aria-hidden="true" />
          </div>
        </div>

        {visibleItems.length > 0 ? (
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((cs, i) => (
              <CaseStudyCard
                key={cs.id}
                caseStudy={cs}
                priority={i === 0}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center opacity-70">No case studies match this filter yet.</p>
        )}

        {pageCount > 1 && (
          <div className="mt-14 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="flex size-[49px] items-center justify-center rounded-[6px] border border-[#144168] text-[#144168] transition-colors disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronIcon className="size-4 rotate-180" aria-hidden="true" />
            </button>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                aria-current={p === currentPage ? 'page' : undefined}
                className={`flex size-[49px] items-center justify-center rounded-[6px] font-sans text-sm font-medium transition-colors ${
                  p === currentPage ? 'bg-[#a3282a] text-white' : 'border border-[#144168] text-[#144168]'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={currentPage === pageCount}
              aria-label="Next page"
              className="flex size-[49px] items-center justify-center rounded-[6px] border border-[#144168] text-[#144168] transition-colors disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronIcon className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { ChevronIcon } from '@/views/ui/icons/ChevronIcon';
import { CaseStudyCard } from '@/views/case-study/CaseStudyCard';
import type { CaseStudySummary } from '@/models/caseStudy';

const PAGE_SIZE = 3;

/** "Related Case Study" — Figma node 1107:49842 (y5878-6511). Left dark
 * maroon/red panel ("RELATED CASE STUDY" / "Discovering What Matters" /
 * "Uncovering insights that drive smarter decisions." copy —
 * template-level chrome identical across every case study, now
 * CMS-first via the case-study-page settings singleType, falling back
 * to this node's own verbatim copy — see fallback.ts's header comment)
 * + prev/next controls, right: other case studies (excluding the
 * current one) using the exact same CaseStudyCard as /case-study's own
 * grid. Real pagination — prev/next only render enabled when there is
 * more than one page of the actual other-case-study pool, never a
 * fixed fake count. */
export function RelatedCaseStudySection({
  eyebrow,
  heading,
  body,
  items,
}: {
  eyebrow: string;
  heading: string;
  body: string;
  items: CaseStudySummary[];
}) {
  const [page, setPage] = useState(0);
  if (items.length === 0) return null;

  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount - 1);
  const visible = items.slice(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE);

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col overflow-hidden rounded-[24px] lg:flex-row">
          <div className="flex shrink-0 flex-col justify-center gap-6 bg-gradient-to-br from-gradient-from to-gradient-to p-10 text-white lg:w-[420px] lg:rounded-l-[24px]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-white">{eyebrow}</p>
              <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-white sm:text-[44px] sm:tracking-[-1px]">{heading}</h2>
              <p className="mt-4 text-sm leading-[1.9] text-white/80">{body}</p>
            </div>
            {pageCount > 1 && (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setPage((p) => (p - 1 + pageCount) % pageCount)}
                  aria-label="Previous case studies"
                  className="flex size-[45px] items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
                >
                  <ChevronIcon className="size-4 rotate-180" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setPage((p) => (p + 1) % pageCount)}
                  aria-label="Next case studies"
                  className="flex size-[45px] items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
                >
                  <ChevronIcon className="size-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>

          <div className="grid flex-1 grid-cols-1 gap-6 bg-white p-6 sm:grid-cols-2 lg:grid-cols-3 lg:p-10">
            {visible.map((cs) => (
              <CaseStudyCard key={cs.id} caseStudy={cs} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

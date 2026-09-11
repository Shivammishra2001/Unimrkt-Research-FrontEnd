'use client';

import { ChevronIcon } from '@/views/ui/icons/ChevronIcon';

/**
 * Figma node 522:5050 ("Pagination"): a row of square buttons — prev
 * chevron, numbered pages, next chevron. `size-[49px]` (Figma's
 * 48.762px), `rounded-[6px]`, `#144168` border, active page filled
 * `#a3282a` with white text. Windows down to a `1 … n-1 n n+1 … total`
 * shape once there are enough pages that showing every one would be
 * unreasonably wide — with this page's ~10-post seed that's rare, but
 * the component doesn't assume a small total.
 */
export function Pagination({
  currentPage,
  totalPages,
  onChange,
}: {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = getPageWindow(currentPage, totalPages);

  return (
    <nav aria-label="Blog pagination" className="flex items-center justify-center gap-[15px] flex-wrap">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="flex size-[49px] items-center justify-center rounded-[6px] border border-[#144168] text-[#144168] transition-colors hover:bg-[#144168]/5 disabled:opacity-40"
      >
        <ChevronIcon className="size-[18px] rotate-180" aria-hidden="true" />
      </button>

      {pages.map((page, i) =>
        page === 'ellipsis' ? (
          // eslint-disable-next-line react/no-array-index-key -- static filler between page numbers, never reordered
          <span key={`ellipsis-${i}`} className="flex size-[49px] items-center justify-center font-sans text-sm text-[#144168]">
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            className={`flex size-[49px] items-center justify-center rounded-[6px] font-sans text-sm font-medium transition-colors ${
              page === currentPage
                ? 'bg-[#a3282a] text-white'
                : 'border border-[#144168] text-[#144168] hover:bg-[#144168]/5'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="flex size-[49px] items-center justify-center rounded-[6px] border border-[#144168] text-[#144168] transition-colors hover:bg-[#144168]/5 disabled:opacity-40"
      >
        <ChevronIcon className="size-[18px]" aria-hidden="true" />
      </button>
    </nav>
  );
}

function getPageWindow(current: number, total: number): Array<number | 'ellipsis'> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const withEllipses: Array<number | 'ellipsis'> = [];
  sorted.forEach((page, i) => {
    if (i > 0 && page - sorted[i - 1] > 1) withEllipses.push('ellipsis');
    withEllipses.push(page);
  });
  return withEllipses;
}

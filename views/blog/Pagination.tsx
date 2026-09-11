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
  ariaLabel = 'Blog pagination',
  activeColor = '#a3282a',
  borderColor = '#144168',
  textColor,
  squareSize = '49px',
  gap = '15px',
}: {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  /** Accessible label for the nav landmark — defaults to the original
   * /blogs copy; pass a page-specific one (e.g. "Industries pagination"). */
  ariaLabel?: string;
  /** Style overrides — Figma reuses this same component shape with
   * different exact values per page (e.g. /industries: #ba2c29 active,
   * #c4d7e8 border, #144168 text, 53.333px squares, 16.667px gap).
   * Defaults match the original /blogs values so existing call sites are
   * unaffected. */
  activeColor?: string;
  borderColor?: string;
  /** Inactive-square text color — defaults to `borderColor` (matches
   * /blogs, where both are the same `#144168`); pass separately when a
   * page's border/text colors differ, as /industries' does. */
  textColor?: string;
  squareSize?: string;
  gap?: string;
}) {
  if (totalPages <= 1) return null;

  const pages = getPageWindow(currentPage, totalPages);
  const squareStyle = { width: squareSize, height: squareSize };
  const resolvedTextColor = textColor ?? borderColor;
  const inactiveClass = 'border transition-colors hover:bg-black/5';

  return (
    <nav aria-label={ariaLabel} className="flex flex-wrap items-center justify-center" style={{ gap }}>
      <button
        type="button"
        onClick={() => onChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
        style={{ ...squareStyle, borderColor, color: resolvedTextColor }}
        className={`flex items-center justify-center rounded-[6px] ${inactiveClass} disabled:opacity-40`}
      >
        <ChevronIcon className="size-[18px] rotate-180" aria-hidden="true" />
      </button>

      {pages.map((page, i) =>
        page === 'ellipsis' ? (
          // eslint-disable-next-line react/no-array-index-key -- static filler between page numbers, never reordered
          <span key={`ellipsis-${i}`} style={{ ...squareStyle, color: resolvedTextColor }} className="flex items-center justify-center font-sans text-sm">
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            style={
              page === currentPage
                ? { ...squareStyle, backgroundColor: activeColor }
                : { ...squareStyle, borderColor, color: resolvedTextColor }
            }
            className={`flex items-center justify-center rounded-[6px] font-sans text-sm font-medium ${
              page === currentPage ? 'text-white' : inactiveClass
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
        style={{ ...squareStyle, borderColor, color: resolvedTextColor }}
        className={`flex items-center justify-center rounded-[6px] ${inactiveClass} disabled:opacity-40`}
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

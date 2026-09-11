'use client';

/** Figma node 384:5927 ("Frame 33861"): active item is a 32×15px pill in
 * `#b63a40`, inactive items are plain 15px light-gray dots. Purely
 * presentational — driven by `activeIndex`/`count` from the parent's
 * scroll-position tracking (same pattern as everywhere else on this site
 * that mirrors a scroll-snap row with an indicator). */
export function DotPagination({
  count,
  activeIndex,
  onSelect,
}: {
  count: number;
  activeIndex: number;
  onSelect?: (index: number) => void;
}) {
  if (count <= 1) return null;

  return (
    <div className="flex items-center gap-2" role="tablist" aria-label="Slide navigation">
      {Array.from({ length: count }, (_, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => onSelect?.(i)}
            className={
              isActive
                ? 'h-[15px] w-8 rounded-[40px] bg-[#b63a40] transition-all'
                : 'size-[15px] rounded-full bg-[#e2e2e2] transition-all hover:bg-[#c9c9c9]'
            }
          />
        );
      })}
    </div>
  );
}

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const DOT_COUNT = 3;

/** Horizontally scrolling card row that bleeds off the right edge of the
 * viewport (Figma 384:6457 / 384:6218: cards keep their fixed 349/460px width
 * and the last one is cropped by the frame), followed by the 3-dot pager
 * (a 32x15 pill + two 15px circles). The row's left edge lines up with the
 * 1600px content column. */
export function ScrollCards({ children, label, tight = false }: { children: React.ReactNode; label: string; /** Figma 384:6214: pager sits 37px under the cards. */ tight?: boolean }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [scrollable, setScrollable] = useState(true);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollable(max > 1);
    setActive(max <= 0 ? 0 : Math.round((el.scrollLeft / max) * (DOT_COUNT - 1)));
  }, []);

  useEffect(() => {
    sync();
    // Cards can change width without a window resize (e.g. an Expertise card opening), so watch the track itself.
    const el = trackRef.current;
    const ro = el ? new ResizeObserver(sync) : null;
    if (el && ro) {
      ro.observe(el);
      for (const child of Array.from(el.children)) ro.observe(child);
    }
    window.addEventListener('resize', sync);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  function goTo(i: number) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: ((el.scrollWidth - el.clientWidth) * i) / (DOT_COUNT - 1), behavior: 'smooth' });
  }

  return (
    <>
      <ul
        ref={trackRef}
        onScroll={sync}
        aria-label={label}
        className={`flex gap-8 overflow-x-auto scroll-smooth px-4 pb-10 ${tight ? '-mt-4 pt-6' : 'pt-2'} [scrollbar-width:none] sm:px-6 lg:px-8 min-[1700px]:pl-[calc((100vw_-_1600px)/2)] min-[1700px]:pr-0 [&::-webkit-scrollbar]:hidden`}
      >
        {children}
      </ul>
      {/* Hidden (but still holding its height, so the section doesn't jump) when every card already fits. */}
      <div className={`flex items-center justify-center gap-2 ${tight ? '-mt-[3px]' : 'mt-2'} ${scrollable ? '' : 'invisible'}`} role="tablist" aria-label={`${label} pages`} aria-hidden={!scrollable || undefined}>
        {Array.from({ length: DOT_COUNT }).map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-label={`Page ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-[15px] rounded-full transition-all duration-300 ${active === i ? 'w-8 bg-[#b63a40]' : 'w-[15px] bg-[#BDBDBD]/40'}`}
          />
        ))}
      </div>
    </>
  );
}

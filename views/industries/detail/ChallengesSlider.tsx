'use client';

import { Children, useCallback, useEffect, useRef, useState } from 'react';

/** Single-row slider for the "Key Challenges We Solve" cards. 4 per view at xl+,
 * 3 at lg, 2 at md, 1 below md (slide widths are pure CSS, so SSR/first paint is already
 * correct). The track moves with translateX on the same 700ms
 * cubic-bezier(0.22,1,0.36,1) curve ExpertiseStrip uses, supports mouse/touch
 * drag, and shows the ScrollCards pager (red 32px pill + 15px dots) only when
 * there are more cards than fit in one view. */
const EASE = 'cubic-bezier(0.22,1,0.36,1)';

function perViewFor(width: number) {
  if (width >= 1280) return 4;
  if (width >= 1024) return 3;
  if (width >= 768) return 2;
  return 1;
}

export function ChallengesSlider({ children, label }: { children: React.ReactNode; label: string }) {
  const slides = Children.toArray(children);
  const count = slides.length;

  const trackRef = useRef<HTMLUListElement>(null);
  const [perView, setPerView] = useState(4);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0); // px between the left edges of two neighbouring cards
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ startX: number; startY: number; id: number; axis: 'x' | 'y' | null } | null>(null);

  const maxIndex = Math.max(0, count - perView);
  const pages = maxIndex + 1;
  const showPager = count > perView;

  const measure = useCallback(() => {
    const pv = perViewFor(window.innerWidth);
    setPerView(pv);
    setIndex((i) => Math.min(i, Math.max(0, count - pv)));
    const items = trackRef.current?.children;
    if (items && items.length > 1) {
      // getBoundingClientRect keeps sub-pixel widths (offsetLeft rounds, which drifts ~0.25px per card).
      setStep(items[1].getBoundingClientRect().left - items[0].getBoundingClientRect().left);
    }
  }, [count]);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const goTo = (i: number) => setIndex(Math.min(maxIndex, Math.max(0, i)));

  function onPointerDown(e: React.PointerEvent) {
    if (!showPager || (e.pointerType === 'mouse' && e.button !== 0)) return;
    drag.current = { startX: e.clientX, startY: e.clientY, id: e.pointerId, axis: null };
  }

  function onPointerMove(e: React.PointerEvent) {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (!d.axis) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      d.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (d.axis === 'x') {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        setDragging(true);
      }
    }
    if (d.axis !== 'x') return;
    // Rubber-band at the ends so the track can't be dragged into empty space.
    const atStart = index === 0 && dx > 0;
    const atEnd = index === maxIndex && dx < 0;
    setDragX(atStart || atEnd ? dx * 0.3 : dx);
  }

  function endDrag(e: React.PointerEvent) {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    if (d.axis === 'x' && step > 0) {
      const dx = e.clientX - d.startX;
      const moved = Math.round(-dx / step);
      // A short flick still advances one card.
      goTo(index + (moved !== 0 ? moved : Math.abs(dx) > 40 ? (dx < 0 ? 1 : -1) : 0));
    }
    setDragging(false);
    setDragX(0);
  }

  const offset = -index * step + dragX;

  return (
    <>
      {/* -mx/-my + matching padding give the hover lift/scale room inside the clipping box without shifting the
       * layout. Side room stays below the card gap (24px base/md, 29px lg) so off-screen neighbours never peek in. */}
      <div
        className={`-mx-2 -my-6 overflow-hidden px-2 py-6 ${showPager ? 'cursor-grab touch-pan-y select-none active:cursor-grabbing' : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDragStart={(e) => e.preventDefault()}
      >
        <ul
          ref={trackRef}
          aria-label={label}
          className="flex items-stretch gap-6 lg:gap-[29px]"
          style={{
            transform: `translate3d(${offset}px,0,0)`,
            transition: dragging ? 'none' : `transform 700ms ${EASE}`,
          }}
        >
          {slides.map((slide, i) => (
            <li
              key={i}
              aria-hidden={i < index || i >= index + perView ? true : undefined}
              className="flex min-w-0 shrink-0 basis-full md:basis-[calc((100%_-_24px)/2)] lg:basis-[calc((100%_-_58px)/3)] xl:basis-[calc((100%_-_87px)/4)] min-[1700px]:basis-[378px] [&>*]:w-full"
            >
              {slide}
            </li>
          ))}
        </ul>
      </div>

      {showPager && (
        <div className="mt-10 flex items-center justify-center gap-2" role="tablist" aria-label={`${label} pages`}>
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={index === i}
              aria-label={`Page ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-[15px] rounded-full transition-all duration-300 ${index === i ? 'w-8 bg-[#b63a40]' : 'w-[15px] bg-[#BDBDBD]/40'}`}
            />
          ))}
        </div>
      )}
    </>
  );
}

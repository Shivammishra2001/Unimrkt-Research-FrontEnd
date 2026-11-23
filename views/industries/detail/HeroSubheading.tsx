'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronIcon } from '@/views/ui/icons/ChevronIcon';

/**
 * Industry Detail Hero subheading with a "Read More" / "Read Less" toggle.
 *
 * The complete `heroSubheading` is ALWAYS in the server-rendered DOM — long
 * copy is hidden with CSS `line-clamp-3`, never truncated out of the markup —
 * so search engines index the full paragraph and no-JS users still get it in
 * the HTML. Long copy collapses to 3 lines by default with a subtle chevron
 * button that expands/collapses it. Short copy renders plain, no button.
 *
 * The initial collapsed/button state is derived from length (SSR-deterministic,
 * so hydration matches); after mount it is refined by measuring real overflow,
 * which also keeps the button honest across breakpoints (1440 / 1280 / 375).
 */
const LONG_THRESHOLD = 220;

export function HeroSubheading({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  // First guess from character count (runs identically on server + first client
  // render); the effect below corrects it from the real clamped height.
  const [canToggle, setCanToggle] = useState(text.length > LONG_THRESHOLD);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = paragraphRef.current;
    if (!el) return;
    const measure = () => {
      // Overflow is only measurable while the paragraph is clamped.
      if (expanded) return;
      setCanToggle(el.scrollHeight - el.clientHeight > 2);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [text, expanded]);

  if (!text) return null;

  const collapsed = canToggle && !expanded;

  return (
    <div className="mt-[12.8px] max-w-[884px]">
      <p
        ref={paragraphRef}
        className={`font-sans text-[16px] font-normal leading-[30.4px] text-white/80${collapsed ? ' line-clamp-3' : ''}`}
      >
        {text}
      </p>
      {canToggle && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-[10px] inline-flex cursor-pointer items-center gap-1.5 font-sans text-[14px] font-semibold leading-none text-white underline-offset-4 transition-colors duration-200 hover:text-[#e8565b] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a82c31] focus-visible:ring-offset-2 focus-visible:ring-offset-[#040112]"
        >
          {expanded ? 'Read Less' : 'Read More'}
          <ChevronIcon
            aria-hidden="true"
            className={`size-[15px] transition-transform duration-200 ${expanded ? '-rotate-90' : 'rotate-90'}`}
          />
        </button>
      )}
    </div>
  );
}

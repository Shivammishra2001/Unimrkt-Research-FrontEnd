'use client';

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';

/** Long copy starts collapsed to five 30.4px lines (16px / 1.9) behind a fade; "Read More" opens it smoothly and
 * becomes "Read Less". Copy under the threshold renders as plain paragraphs. The collapsed height is server-rendered,
 * so there is no layout shift on hydration; if the copy turns out to fit in five lines at the current width anyway,
 * the toggle and fade simply drop away (height unchanged). */
const THRESHOLD = 480;
const COLLAPSED_PX = 152; // 5 x 30.4px
const FADE = 'linear-gradient(to bottom, #000 calc(100% - 60px), transparent)';
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/** `tone="dark"` (Challenges band, photo over #0f1825): white label with a brand-red chevron disc, since #BE2C28 text
 * on the dark band is too low-contrast. The fade is a mask, so it works over any background. */
export function ExpandableBody({ paragraphs, className = '', tone = 'light' }: { paragraphs: string[]; className?: string; tone?: 'light' | 'dark' }) {
  const long = paragraphs.join(' ').length > THRESHOLD;
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [overflows, setOverflows] = useState(long);
  const [maxHeight, setMaxHeight] = useState<string>(`${COLLAPSED_PX}px`);

  // Only offer the toggle when the collapsed box actually hides text at this width.
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!long || !el) return undefined;
    const check = () => setOverflows(el.scrollHeight > COLLAPSED_PX + 4);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [long]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (!open) {
      setMaxHeight(`${el.scrollHeight}px`);
    } else {
      // From 'none' back to a measured px value first, so the collapse animates too.
      el.style.maxHeight = `${el.scrollHeight}px`;
      void el.offsetHeight;
      setMaxHeight(`${COLLAPSED_PX}px`);
      const top = el.getBoundingClientRect().top;
      if (top < 80) window.scrollBy({ top: top - 120, behavior: 'smooth' });
    }
    setOpen(!open);
  };

  const body = paragraphs.map((p, i) => (
    <p key={i} className={i > 0 ? 'mt-[30.4px]' : undefined}>
      {p}
    </p>
  ));

  if (!long) return <div className={className}>{body}</div>;

  const clamped = overflows && !open;
  return (
    <div className={className}>
      <div
        id={id}
        ref={ref}
        onTransitionEnd={(e) => {
          if (e.propertyName === 'max-height' && open) setMaxHeight('none');
        }}
        className="relative overflow-hidden transition-[max-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        style={{
          maxHeight: overflows ? maxHeight : 'none',
          ...(clamped ? { maskImage: FADE, WebkitMaskImage: FADE } : null),
        }}
      >
        {body}
      </div>
      {overflows && (
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls={id}
          className={`group mt-3 inline-flex min-h-[44px] items-center gap-2 font-sans text-[15px] font-semibold transition-colors duration-200 focus-visible:underline focus-visible:outline-none ${
            tone === 'dark' ? 'text-white hover:text-white/80 focus-visible:text-white/80' : 'text-[#be2c28] hover:text-[#8a1f1f] focus-visible:text-[#8a1f1f]'
          }`}
        >
          {open ? 'Read Less' : 'Read More'}
          <svg
            viewBox="0 0 16 16"
            className={`transition-[transform,background-color] duration-300 ${open ? 'rotate-180' : ''} ${
              tone === 'dark' ? 'size-6 rounded-full bg-[#be2c28] p-[5px] text-white group-hover:bg-[#d4423e]' : 'size-4'
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </button>
      )}
    </div>
  );
}

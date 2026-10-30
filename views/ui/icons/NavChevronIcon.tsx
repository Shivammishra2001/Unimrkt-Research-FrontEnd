import type { SVGProps } from 'react';

/** Header dropdown indicator — Figma 1794:16938 "Expand_right_light": a 14x14 box, path
 * M5 3 L9 7.5 L5 12, 1.7px round-capped stroke. Points right; rotate via className. */
export function NavChevronIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M5 3L9 7.5L5 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

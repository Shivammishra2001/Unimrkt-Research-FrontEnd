import type { SVGProps } from 'react';

/** Circular hover-arrow glyph used inside glassmorphic service pills and
 * carousel prev/next controls. */
export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9.5 8.5L13 12l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

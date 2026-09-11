import type { SVGProps } from 'react';

/** Reload/refresh glyph — Gallery's "Load More" button (Figma node 827:8090). */
export function RefreshIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M20 11A8 8 0 006.34 6.34L4 8.68M4 4v4.68h4.68M4 13a8 8 0 0013.66 4.66L20 15.32M20 20v-4.68h-4.68"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

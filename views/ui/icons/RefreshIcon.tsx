import type { SVGProps } from 'react';

/** Reload/refresh glyph — Gallery's "Load More" button (Figma node 827:8065, vuesax/linear/refresh). */
export function RefreshIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12.125 18.0583C15.7 17.1167 18.3333 13.8667 18.3333 10C18.3333 5.4 14.6333 1.66667 10 1.66667C4.44167 1.66667 1.66667 6.3 1.66667 6.3M5.36667 6.3H3.34167H1.66667V2.5M1.66667 10C1.66667 10.5564 1.72129 11.1002 1.82548 11.6262M10 18.3333C9.44356 18.3333 8.89981 18.2787 8.37381 18.1745M3.07114 14.6294C3.67963 15.538 4.46202 16.3204 5.37057 16.9289"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

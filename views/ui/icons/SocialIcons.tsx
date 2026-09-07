import type { SVGProps } from 'react';

/** Footer social row. Disclosed placeholders: no Figma export available in
 * this rebuild session — these are clean, recognizable brand-glyph
 * approximations authored to a shared grid, not traced/extracted paths. */

export function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 17.6 16.4729" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M1.5 1.5l14.6 13.47M16.1 1.5L1.5 14.97"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16.5 16.5" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="8.25" cy="8.25" r="8" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M9.8 5.3H8.6c-.5 0-.9.4-.9.9v1.4H6.9v1.6h.8v4.4h1.7V9.2h1.3l.2-1.6H9.4V6.4c0-.2.2-.4.4-.4h1V5.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16.5 16.5" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="0.5" y="0.5" width="15.5" height="15.5" rx="3" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="5" cy="5.3" r="1.1" fill="currentColor" />
      <rect x="4.1" y="7.2" width="1.8" height="6" fill="currentColor" />
      <path
        d="M8.3 7.2h1.7v.9c.4-.6 1.2-1 1.9-1 1.7 0 2.3 1.1 2.3 2.8v3.3h-1.8v-3c0-.7-.3-1.3-1-1.3s-1.1.5-1.1 1.3v3H8.3V7.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16.5 16.5" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="0.5" y="0.5" width="15.5" height="15.5" rx="4" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8.25" cy="8.25" r="3.6" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12.6" cy="4" r="0.9" fill="currentColor" />
    </svg>
  );
}

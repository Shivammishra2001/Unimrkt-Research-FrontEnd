import type { SVGProps } from 'react';

/** Industries hero stats row — "Languages Supported" (Figma vuesax/linear/language-square).
 * Disclosed placeholder: clean outline approximation, not a traced path. */
export function LanguageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 8h7M9.5 6v2c0 3-1.3 5.3-3.5 6.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7.5 12c1 1 2.3 1.7 3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 21l3-6 3 6M13.9 19h4.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

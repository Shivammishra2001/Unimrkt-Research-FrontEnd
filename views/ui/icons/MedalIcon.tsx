import type { SVGProps } from 'react';

/** Industries hero stats row — "Years of Excellence" (Figma vuesax/linear/medal-star).
 * Disclosed placeholder: clean outline approximation, not a traced path. */
export function MedalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.5 2.5l1 6M14.5 2.5l-1 6M9 3h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 11.5l.8 1.7 1.9.2-1.4 1.3.4 1.9-1.7-1-1.7 1 .4-1.9-1.4-1.3 1.9-.2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

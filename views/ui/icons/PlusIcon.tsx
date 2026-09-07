import type { SVGProps } from 'react';

/** FAQ accordion toggle — FaqView rotates this 45° into an "x" rather than
 * swapping to a separate minus/close asset. */
export function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

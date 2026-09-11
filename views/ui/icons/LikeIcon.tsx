import type { SVGProps } from 'react';

/** Industries hero stats row — "Surveys Annually" (Figma vuesax/linear/like).
 * Disclosed placeholder: clean outline approximation, not a traced path. */
export function LikeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7 21H4.5A1.5 1.5 0 0 1 3 19.5V12a1.5 1.5 0 0 1 1.5-1.5H7v10.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M7 20.5l2.7.9c.7.2 1.4.3 2.1.1l4.2-.9a2 2 0 0 0 1.55-1.62l.9-4.9a1.7 1.7 0 0 0-1.68-2H13l.5-3.4a1.9 1.9 0 0 0-1.85-2.19c-.5 0-.96.28-1.19.72L7 12.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

import type { SVGProps } from 'react';

/** Blog detail "share via email" glyph (Figma node 596:4093, vuesax/linear/sms) —
 * clean envelope approximation, matching SocialIcons.tsx's disclosed-placeholder convention. */
export function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="1" y="3" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M1.5 4l7.5 5.5L16.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

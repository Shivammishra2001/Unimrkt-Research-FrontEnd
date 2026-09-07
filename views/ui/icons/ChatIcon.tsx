import type { SVGProps } from 'react';

/** Floating chat-widget glyph. Disclosed placeholder: no Figma export
 * available in this rebuild session, so this is a plain, clean
 * speech-bubble glyph rather than a traced Figma path. */
export function ChatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-8Z"
        fill="currentColor"
      />
    </svg>
  );
}

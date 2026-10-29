import type { HTMLAttributes } from 'react';

/** Body-copy <p> wrapper: Figma body copy is 16px / 1.9 / 80% at every width
 * (nodes 740:4611, 267:1262, 267:1319). Do not add a responsive `text-lg` —
 * its own line-height silently overrode the 1.9 leading from `sm` up. */
export function Prose({ className, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={`text-base !leading-[1.9] opacity-80 ${className ?? ''}`.trim()} {...rest} />;
}

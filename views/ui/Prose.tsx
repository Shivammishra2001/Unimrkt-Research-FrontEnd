import type { HTMLAttributes } from 'react';

/** Body-copy <p> wrapper. `leading-[1.9]` matches Figma body-copy
 * line-height exactly (node 740:4611 in the upstream blueprint). */
export function Prose({ className, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={`text-base sm:text-lg leading-[1.9] opacity-80 ${className ?? ''}`.trim()} {...rest} />;
}

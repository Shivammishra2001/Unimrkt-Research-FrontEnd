import type { HTMLAttributes } from 'react';

/** Horizontal max-width + gutter wrapper. Wrap exactly once per section —
 * never nest two of these. */
export function Container({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8 ${className ?? ''}`.trim()} {...rest} />;
}

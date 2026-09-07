import type { ElementType, HTMLAttributes } from 'react';

// Bespoke, per-node Figma values (not a generic type-scale ratio) — a
// caller overrides color only via className, never size/tracking.
const SIZE_CLASSES = {
  display: 'text-4xl sm:text-5xl lg:text-[60px] font-semibold capitalize leading-[1.2] lg:tracking-[-3px] text-heading',
  h1: 'text-4xl sm:text-5xl lg:text-[60px] font-semibold capitalize leading-[1.2] lg:tracking-[-3px] text-heading',
  h2: 'text-3xl sm:text-4xl lg:text-[50px] font-semibold capitalize leading-[1.2] lg:tracking-[-3px] text-heading',
  h2Sm: 'text-2xl sm:text-3xl lg:text-[48px] font-semibold capitalize leading-[1.15] lg:tracking-[-1px] text-heading',
  h3: 'text-xl sm:text-2xl font-semibold',
} as const;

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** `as` controls the semantic tag independent of visual size. */
  as: ElementType;
  size?: keyof typeof SIZE_CLASSES;
}

export function Heading({ as: Tag, size = 'h2', className, ...rest }: HeadingProps) {
  return <Tag className={`${SIZE_CLASSES[size]} ${className ?? ''}`.trim()} {...rest} />;
}

import type { HTMLAttributes } from 'react';
import type { BlockTheme } from '@/models/domain';

const THEME_CLASSES: Record<BlockTheme, string> = {
  light: 'bg-white text-slate-900',
  dark: 'bg-ink-900 text-white',
  accent: 'bg-gradient-to-r from-gradient-from to-gradient-to text-white',
};

interface SectionProps extends HTMLAttributes<HTMLElement> {
  theme?: BlockTheme;
  anchorId?: string;
}

/** Owns vertical rhythm + theme inversion for every dynamic-zone block
 * that doesn't need a bespoke background treatment. */
export function Section({ theme = 'light', anchorId, className, ...rest }: SectionProps) {
  return (
    <section id={anchorId} className={`py-16 sm:py-20 lg:py-24 ${THEME_CLASSES[theme]} ${className ?? ''}`.trim()} {...rest} />
  );
}

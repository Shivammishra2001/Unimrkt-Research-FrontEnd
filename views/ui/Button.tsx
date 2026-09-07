'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import type { LinkModel, LinkVariant } from '@/models/domain';
import { SendArrowIcon } from './icons/SendArrowIcon';

const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 rounded-btn px-8 py-4 font-sans text-[13px] font-bold uppercase tracking-[0.06em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 motion-reduce:transition-none disabled:opacity-50 disabled:pointer-events-none';

// The only place a semantic variant becomes a color. `primary`'s
// gradient (not a flat fill) is confirmed against a real hero screenshot
// — an earlier pass had this as solid brand-600 off one component export;
// the rendered screenshot is the more reliable source.
const VARIANT_CLASSES: Record<LinkVariant, string> = {
  primary: 'bg-gradient-to-r from-gradient-from to-gradient-to text-white hover:brightness-110 focus-visible:ring-brand-600',
  secondary: 'bg-white text-ink hover:bg-slate-100 focus-visible:ring-brand-600',
  ghost: 'bg-transparent text-current hover:bg-white/10 focus-visible:ring-brand-600',
  link: 'bg-transparent text-brand-600 underline-offset-4 hover:underline p-0 focus-visible:ring-brand-600',
};

// framer-motion's motion.a/motion.button redefine the drag/animation event
// handlers (onDrag, onDragStart, onDragEnd, onAnimationStart,
// onAnimationEnd) to carry gesture info instead of a native DOM event —
// incompatible with React's own HTML attribute types for those same
// handler names. Omitted here rather than cast away, since nothing in this
// component ever needs a caller to pass native drag/animation handlers
// through to a motion element.
type ConflictingHandlers = 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration';
type AnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, ConflictingHandlers>;
type NativeButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, ConflictingHandlers>;

interface ButtonOwnProps {
  link?: LinkModel;
  variant?: LinkVariant;
  className?: string;
  /** Set false to suppress the trailing SendArrowIcon (always suppressed
   * for the `link` variant regardless of this prop). */
  icon?: boolean;
  children?: ReactNode;
}

export type ButtonProps = ButtonOwnProps & (AnchorProps | NativeButtonProps);

/** Pill CTA: Montserrat bold, uppercase, trailing send-arrow. Renders
 * `<motion.a>` when `link` is given, else `<motion.button>`.
 * useReducedMotion() disables the hover/tap scale entirely. */
export function Button({ link, variant, className, icon = true, children, ...rest }: ButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const resolvedVariant = variant ?? link?.variant ?? 'primary';
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[resolvedVariant]} ${className ?? ''}`.trim();
  const showIcon = icon && resolvedVariant !== 'link';

  const motionProps = shouldReduceMotion
    ? {}
    : { whileHover: { scale: 1.03 }, whileTap: { scale: 0.98 }, transition: { duration: 0.15 } };

  const content = (
    <>
      {children ?? link?.label}
      {showIcon && <SendArrowIcon className="size-4" aria-hidden="true" />}
    </>
  );

  if (link) {
    return (
      <motion.a
        href={link.href}
        target={link.isExternal ? '_blank' : undefined}
        rel={link.isExternal ? 'noopener noreferrer' : undefined}
        className={classes}
        {...motionProps}
        {...(rest as AnchorProps)}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" className={classes} {...motionProps} {...(rest as NativeButtonProps)}>
      {content}
    </motion.button>
  );
}

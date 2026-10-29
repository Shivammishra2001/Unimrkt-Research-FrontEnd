import type { CSSProperties } from 'react';

/**
 * Helpers for sections built as a fixed Figma canvas (1900px wide) that
 * scales with the viewport from a breakpoint up. The section sets
 * `[container-type:inline-size]` at that breakpoint; every position / size
 * is authored in canvas px and converted to container-width units (`cqw`),
 * so the composition keeps its proportions at any width.
 */
export const CANVAS_W = 1900;

/** px on the 1900px design canvas -> `cqw` units of the section's width. */
export const cq = (px: number, canvasWidth: number = CANVAS_W) => `${((px / canvasWidth) * 100).toFixed(4)}cqw`;

/**
 * Geometry as CSS variables, consumed by `lg:left-[var(--l)]`-style classes.
 * (Variables, not inline left/top, so the values only apply at the
 * breakpoint where the class does — below it the layout flows normally.)
 */
export function geometry(
  g: { l?: number; t?: number; w?: number; h?: number; fs?: number },
  canvasWidth: number = CANVAS_W,
): CSSProperties {
  const style: Record<string, string> = {};
  if (g.l !== undefined) style['--l'] = cq(g.l, canvasWidth);
  if (g.t !== undefined) style['--t'] = cq(g.t, canvasWidth);
  if (g.w !== undefined) style['--w'] = cq(g.w, canvasWidth);
  if (g.h !== undefined) style['--h'] = cq(g.h, canvasWidth);
  if (g.fs !== undefined) style['--fs'] = cq(g.fs, canvasWidth);
  return style as CSSProperties;
}

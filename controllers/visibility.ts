/**
 * The CMS "Page visibility" switch (`isActive`). Strapi already withholds inactive entries from every public read, so a switched-off
 * page normally arrives here as "not found". This is the second line of defence: if an inactive entry ever reaches a route (cached
 * response, a preview-token read, a future endpoint that forgets the filter), it still answers 404 — unless Next.js Draft Mode is on,
 * in which case the content team may open it (the caller then shows the preview banner).
 */
import 'server-only';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { StrapiError } from './errors';

/** Returns true when `entry` is inactive but being previewed (draft mode); 404s for a normal visitor. */
export function hiddenFromVisitors(entry: { isActive?: boolean } | null | undefined): boolean {
  if (!entry || entry.isActive !== false) return false;
  if (draftMode().isEnabled) return true;
  notFound();
}

/** A Strapi 404 for a page-backed route (dedicated pages read their content through `pages/slug/<slug>`) means "switched off or missing". */
export function notFoundIfMissing(err: unknown): void {
  if (err instanceof StrapiError && err.status === 404) notFound();
}

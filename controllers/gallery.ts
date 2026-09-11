import { getGalleryItems, isBackendUnreachable } from './strapi';
import { normalizeGalleryItems } from './normalize';
import type { GalleryData } from '@/models/gallery';
import fixture from '@/fixtures/gallery.json';

const FIXTURE = fixture as GalleryData;

/**
 * Migrated off the static fixture onto Strapi's `gallery-item` collection
 * (see models/gallery.ts). The fixture is now only a fallback, taken in
 * two cases:
 *   1. The backend is genuinely unreachable (isBackendUnreachable) — same
 *      "CMS is down" condition every other controller in this codebase
 *      treats as recoverable, so the page still renders instead of 500ing.
 *   2. The backend is up but the collection is empty (nothing seeded /
 *      published yet) — keeps /gallery populated instead of blank during
 *      the Strapi-migration window, and after a real editor deletes every
 *      entry by mistake.
 * `categories` is always the fixture's static taxonomy — it mirrors the
 * `gallery-item` schema's fixed category enum 1:1, not CMS-managed
 * content, so there is nothing to fetch it from.
 */
export async function getGallery(): Promise<GalleryData> {
  try {
    const images = normalizeGalleryItems(await getGalleryItems());
    if (images.length === 0) return FIXTURE;
    return { categories: FIXTURE.categories, images };
  } catch (err) {
    if (isBackendUnreachable(err)) return FIXTURE;
    throw err;
  }
}

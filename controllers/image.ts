/**
 * Strapi media -> absolute URL + ImageModel. Per FRONTEND_SPEC.md §4.3,
 * adapted to this project's env-var mandate: media is prefixed with
 * NEXT_PUBLIC_STRAPI_ASSET_URL (client-visible, LAN-aware) rather than the
 * upstream blueprint's server-only STRAPI_URL.
 */
import type { ImageModel } from '@/models/domain';
import type { StrapiMedia } from '@/models/strapi';

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';
const ASSET_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_ASSET_URL || 'http://localhost:1337';

/**
 * Absolutizes a Strapi-relative media URL (e.g. `/uploads/foo.png`).
 * Already-absolute URLs pass through unchanged.
 */
export function toAbsoluteUrl(url: string): string {
  if (/^https?:\/\//.test(url)) return url;

  if (USE_MOCKS) {
    // Mock fixtures (mocks/fixtures/*) deliberately reference locally
    // bundled placeholder assets under /public/mock — those are served
    // directly by Next.js itself and must NOT be prefixed with the (quite
    // possibly unreachable, outside mock mode) LAN Strapi host.
    return url;
  }

  return `${ASSET_BASE_URL}${url}`;
}

/** Exported alias for the one non-image case: a video-typed blocks.hero
 * media upload, which never becomes an ImageModel. */
export const toAbsoluteMediaUrl = toAbsoluteUrl;

/**
 * Returns `undefined` for null/undefined media so callers use
 * `hero.media?.src` rather than a separate null check.
 */
export function toImageModel(
  media: StrapiMedia | null | undefined,
  fallbackAlt: string
): ImageModel | undefined {
  if (!media) return undefined;

  return {
    src: toAbsoluteUrl(media.url),
    alt: media.alternativeText?.trim() || fallbackAlt,
    width: media.width ?? media.formats?.large?.width ?? 1600,
    height: media.height ?? media.formats?.large?.height ?? 900,
  };
}

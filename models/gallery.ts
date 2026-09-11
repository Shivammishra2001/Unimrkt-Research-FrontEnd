/**
 * Gallery — mirrors models/industry.ts's Raw+Domain layout. Migrated off
 * a static fixture onto Strapi's `gallery-item` collection type;
 * fixtures/gallery.json is now only a fallback for when the backend is
 * unreachable (controllers/gallery.ts), never the primary source.
 */
import type { StrapiMedia, StrapiResponse } from './strapi';

// ---------------------------------------------------------------------------
// Raw
// ---------------------------------------------------------------------------

/** Matches the `gallery-item` schema's `category` enum exactly. */
export type StrapiGalleryCategory =
  | 'Team & Culture'
  | 'Research Process'
  | 'Field Work'
  | 'Client Interactions'
  | 'Events & Conferences';

export interface StrapiGalleryItem {
  id: number;
  documentId?: string;
  title: string;
  category: StrapiGalleryCategory;
  image: StrapiMedia | null;
  caption: string | null;
  order: number;
}

export type StrapiGalleryItemListResponse = StrapiResponse<StrapiGalleryItem[]>;

// ---------------------------------------------------------------------------
// Domain
// ---------------------------------------------------------------------------

export interface GalleryCategory {
  id: string;
  label: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
  /** Only ever set if a future blurhash/placeholder plugin populates it —
   * Strapi's stock upload provider doesn't produce one. GalleryView falls
   * back to its own generated shimmer when this is undefined. */
  blurDataURL?: string;
}

export interface GalleryData {
  categories: GalleryCategory[];
  images: GalleryImage[];
}

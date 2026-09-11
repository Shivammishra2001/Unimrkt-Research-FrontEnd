/**
 * Category — a blog category, created/edited/linked entirely from the
 * Strapi Admin panel (`api::category.category`). Replaces the old fixed
 * 5-value enum that used to live directly on `api::blog.blog`'s
 * `category` field. Mirrors models/gallery.ts's single-file Raw+Domain
 * layout (FRONTEND_SPEC.md §5.3 convention).
 */
import type { StrapiResponse } from './strapi';

// ---------------------------------------------------------------------------
// Raw
// ---------------------------------------------------------------------------

export interface StrapiCategory {
  id: number;
  documentId?: string;
  name: string;
  slug: string;
  description: string | null;
  /** Shorter display text for tight UI (e.g. the /blogs filter tabs) —
   * optional, falls back to `name` when blank. See BlogGridSection.tsx's
   * header comment for why two of the original 5 categories have one. */
  shortLabel: string | null;
}

export type StrapiCategoryListResponse = StrapiResponse<StrapiCategory[]>;

// ---------------------------------------------------------------------------
// Domain
// ---------------------------------------------------------------------------

export interface CategoryModel {
  id: string;
  name: string;
  slug: string;
  /** Falls back to `name` in normalizeCategory() when blank — callers
   * never need to re-apply the fallback themselves. */
  label: string;
}

/**
 * Blog — mirrors models/industry.ts's single-file Raw+Domain layout
 * (FRONTEND_SPEC.md §5.3 convention). Views import only the Domain
 * section below; controllers/normalize.ts is the only file that reads
 * the Raw section.
 */
import type { StrapiMedia, StrapiResponse, StrapiSeo } from './strapi';
import type { ImageModel, SeoModel, FaqItemModel } from './domain';

// ---------------------------------------------------------------------------
// Raw
// ---------------------------------------------------------------------------

export type StrapiBlogCategory =
  | 'Primary Research'
  | 'Qualitative Research'
  | 'Quantitative Research'
  | 'Business Research'
  | 'Research Support Functions';

export interface StrapiBlogSummary {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  excerpt: string;
  category: StrapiBlogCategory;
  coverImage: StrapiMedia | null;
  order: number;
  updatedAt: string;
}

// Strapi Blocks (structured rich text) — minimal shape covering just the
// node kinds seed.ts actually produces and RichContent.tsx renders:
// paragraph, heading, unordered/ordered list (+ list-item), quote, image.
// Not a full re-declaration of Strapi's Blocks spec — extend as new block
// kinds are actually authored.
export interface StrapiBlocksTextNode {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export interface StrapiBlocksElementNode {
  type: 'paragraph' | 'heading' | 'list' | 'list-item' | 'quote' | 'image';
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  format?: 'ordered' | 'unordered';
  image?: StrapiMedia;
  children: StrapiBlocksNode[];
}

export type StrapiBlocksNode = StrapiBlocksTextNode | StrapiBlocksElementNode;
export type StrapiBlocksContent = StrapiBlocksNode[];

export interface StrapiBlogFaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface StrapiBlogDetail extends StrapiBlogSummary {
  body: StrapiBlocksContent | null;
  faqItems: StrapiBlogFaqItem[];
  seo: StrapiSeo | null;
  createdAt: string;
  publishedAt: string | null;
}

export interface StrapiBlogSlug {
  id: number;
  slug: string;
  updatedAt: string;
}

export type StrapiBlogListResponse = StrapiResponse<StrapiBlogSummary[]>;
export type StrapiBlogDetailResponse = StrapiResponse<StrapiBlogDetail>;
export type StrapiBlogSlugsResponse = StrapiResponse<StrapiBlogSlug[]>;

// ---------------------------------------------------------------------------
// Domain
// ---------------------------------------------------------------------------

export type BlogCategory = StrapiBlogCategory;

export interface BlogSummary {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  coverImage?: ImageModel;
  order: number;
}

export interface BlogDetail extends BlogSummary {
  body: StrapiBlocksContent;
  faqItems: FaqItemModel[];
  /** Computed from `body`'s word count (~200wpm) in normalizeBlogDetail —
   * not a stored field, so it never drifts from the actual content. */
  readTimeMinutes: number;
  publishedAt?: string;
  seo?: SeoModel;
}

export interface BlogSlugModel {
  slug: string;
  updatedAt: string;
}

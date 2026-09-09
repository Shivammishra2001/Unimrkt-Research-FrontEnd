/**
 * Service is the one content type whose raw DTOs and normalized entities
 * live in a single file (FRONTEND_SPEC.md §5.3). Views import only the
 * Domain section below; controllers/normalize.ts is the only file that
 * reads the Raw section.
 */
import type { StrapiFeatureItem, StrapiMedia, StrapiResponse, StrapiSeo, StrapiBlock } from './strapi';
import type { BlockModel, FeatureModel, ImageModel, SeoModel } from './domain';

// ---------------------------------------------------------------------------
// Raw
// ---------------------------------------------------------------------------

export interface StrapiServiceSummary {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  summary: string;
  thumbnail: StrapiMedia | null;
  basePrice: string | null;
  updatedAt: string;
}

// Deliberately a *narrower* type than StrapiServiceDetail (the listing
// controller forces `populate: { thumbnail: true }` only) — not that type
// with fields omitted at the call site.
export interface StrapiServiceDetail extends StrapiServiceSummary {
  features: StrapiFeatureItem[];
  seo: StrapiSeo | null;
  blocks: StrapiBlock[];
  createdAt: string;
  publishedAt: string | null;
  // Category hierarchy (Google Sheet IA migration) — optional: the 3 demo
  // services (web-development etc.) never set these.
  legacyUrl?: string | null;
  suggestedUrl?: string | null;
  parent?: { title: string; slug: string } | null;
  children?: StrapiServiceTreeChild[];
}

export interface StrapiServiceSlug {
  id: number;
  slug: string;
  updatedAt: string;
}

// GET /services/tree — shallow shape, one level of children only.
export interface StrapiServiceTreeChild {
  id: number;
  title: string;
  slug: string;
  summary: string;
}

export interface StrapiServiceTreeItem {
  id: number;
  title: string;
  slug: string;
  summary: string;
  children: StrapiServiceTreeChild[];
}

export type StrapiServiceListResponse = StrapiResponse<StrapiServiceSummary[]>;
export type StrapiServiceDetailResponse = StrapiResponse<StrapiServiceDetail>;
export type StrapiServiceSlugsResponse = StrapiResponse<StrapiServiceSlug[]>;
export type StrapiServiceTreeResponse = StrapiResponse<StrapiServiceTreeItem[]>;

// ---------------------------------------------------------------------------
// Domain
// ---------------------------------------------------------------------------

export interface ServiceSummary {
  slug: string;
  title: string;
  summary: string;
  thumbnail?: ImageModel;
  basePrice?: string;
}

export interface ServiceDetail extends ServiceSummary {
  features: FeatureModel[];
  seo?: SeoModel;
  blocks: BlockModel[];
  legacyUrl?: string;
  suggestedUrl?: string;
  parent?: { title: string; slug: string };
  children: ServiceTreeChildModel[];
}

export interface ServiceSlugModel {
  slug: string;
  updatedAt: string;
}

// Category hierarchy (Google Sheet IA migration).
export interface ServiceTreeChildModel {
  slug: string;
  title: string;
  summary: string;
}

export interface ServiceTreeItemModel {
  slug: string;
  title: string;
  summary: string;
  children: ServiceTreeChildModel[];
}

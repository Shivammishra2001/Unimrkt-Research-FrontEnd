/**
 * Industry — mirrors models/service.ts's single-file Raw+Domain layout
 * (FRONTEND_SPEC.md §5.3 convention). Views import only the Domain
 * section below; controllers/normalize.ts is the only file that reads
 * the Raw section.
 */
import type { StrapiMedia, StrapiResponse, StrapiSeo, StrapiBlock } from './strapi';
import type { BlockModel, ImageModel, SeoModel } from './domain';

// ---------------------------------------------------------------------------
// Raw
// ---------------------------------------------------------------------------

export interface StrapiIndustrySummary {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  summary: string | null;
  icon: StrapiMedia | null;
  updatedAt: string;
}

export interface StrapiIndustryDetail extends StrapiIndustrySummary {
  legacyUrl: string | null;
  suggestedUrl: string | null;
  seo: StrapiSeo | null;
  blocks: StrapiBlock[];
  createdAt: string;
  publishedAt: string | null;
}

export interface StrapiIndustrySlug {
  id: number;
  slug: string;
  updatedAt: string;
}

export type StrapiIndustryListResponse = StrapiResponse<StrapiIndustrySummary[]>;
export type StrapiIndustryDetailResponse = StrapiResponse<StrapiIndustryDetail>;
export type StrapiIndustrySlugsResponse = StrapiResponse<StrapiIndustrySlug[]>;

// ---------------------------------------------------------------------------
// Domain
// ---------------------------------------------------------------------------

export interface IndustrySummary {
  slug: string;
  title: string;
  summary?: string;
  icon?: ImageModel;
}

export interface IndustryDetail extends IndustrySummary {
  legacyUrl?: string;
  suggestedUrl?: string;
  seo?: SeoModel;
  blocks: BlockModel[];
}

export interface IndustrySlugModel {
  slug: string;
  updatedAt: string;
}

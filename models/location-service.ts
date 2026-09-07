/**
 * City / CityServiceOverride raw + domain shapes, plus the merged view
 * consumed by /services/[city]/[service]. Per FRONTEND_SPEC.md §5.4 — Raw
 * and Domain sections live in one file, same pattern as models/service.ts.
 * `override: null` is the normal case (no override row for that pair),
 * never an error.
 */
import type { StrapiResponse, StrapiSeo, StrapiBlock } from './strapi';
import type { StrapiServiceDetail, ServiceDetail } from './service';
import type { BlockModel, FeatureModel, ImageModel, SeoModel } from './domain';

// ---------------------------------------------------------------------------
// Raw
// ---------------------------------------------------------------------------

export interface StrapiCity {
  id: number;
  documentId?: string;
  name: string;
  slug: string;
  region: string | null;
  localMeta: StrapiSeo | null;
}

export interface StrapiCityServiceOverride {
  id: number;
  documentId?: string;
  overrideTitle: string | null;
  overrideSummary: string | null;
  customPrice: string | null;
  overrideBlocks: StrapiBlock[];
  localPhone: string | null;
  localAddress: string | null;
  overrideSeo: StrapiSeo | null;
}

export type StrapiMasterService = StrapiServiceDetail;

export interface StrapiServiceByLocation {
  city: StrapiCity;
  service: StrapiMasterService;
  override: StrapiCityServiceOverride | null;
}

export type StrapiServiceByLocationResponse = StrapiResponse<StrapiServiceByLocation>;

export interface StrapiCityServiceCombination {
  citySlug: string;
  serviceSlug: string;
}

export type StrapiCityServiceCombinationsResponse = StrapiResponse<StrapiCityServiceCombination[]>;

// ---------------------------------------------------------------------------
// Domain
// ---------------------------------------------------------------------------

export interface City {
  slug: string;
  name: string;
  region?: string;
  localMeta?: SeoModel;
}

export type MasterService = ServiceDetail;

export interface CityServiceOverride {
  title?: string;
  summary?: string;
  price?: string;
  blocks: BlockModel[];
  localPhone?: string;
  localAddress?: string;
  seo?: SeoModel;
}

export interface MergedCityService {
  city: City;
  slug: string;
  title: string;
  summary: string;
  thumbnail?: ImageModel;
  price?: string;
  features: FeatureModel[];
  blocks: BlockModel[];
  seo?: SeoModel;
  localPhone?: string;
  localAddress?: string;
  isOverridden: boolean;
}

export interface CityServiceCombination {
  citySlug: string;
  serviceSlug: string;
}

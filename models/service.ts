/**
 * Service is the one content type whose raw DTOs and normalized entities
 * live in a single file (FRONTEND_SPEC.md §5.3). Views import only the
 * Domain section below; controllers/normalize.ts is the only file that
 * reads the Raw section.
 *
 * Every attribute from `heroEyebrow` down maps 1:1 to a section of Figma
 * node 474:5731 ("Primary Research") — see ServiceDetailView.tsx for the
 * render order. All are optional: a missing field falls back to the
 * template default resolved in views/services/detail/fallback.ts.
 */
import type { StrapiFeatureItem, StrapiMedia, StrapiResponse, StrapiSeo, StrapiLink, StrapiFaqItem, StrapiClosingBands } from './strapi';
import type { FeatureModel, ImageModel, SeoModel, LinkModel, FaqItemModel, ClosingBandsSettings } from './domain';
import type { StrapiIndustryDetailCard, StrapiTrustLogo, IndustryDetailCardModel, TrustLogoModel } from './industry';

// ---------------------------------------------------------------------------
// Raw
// ---------------------------------------------------------------------------

export interface StrapiServiceStatItem {
  id: number;
  value: string;
  label: string;
  iconIdentifier: string | null;
}

export interface StrapiServiceSummary {
  /** CMS "Page visibility" switch; null/absent = active. */
  isActive?: boolean | null;
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
export interface StrapiServiceDetail extends StrapiServiceSummary, StrapiClosingBands {
  features: StrapiFeatureItem[];
  seo: StrapiSeo | null;
  createdAt: string;
  publishedAt: string | null;
  // Category hierarchy (Google Sheet IA migration) — optional: the 3 demo
  // services (web-development etc.) never set these.
  legacyUrl?: string | null;
  suggestedUrl?: string | null;
  parent?: { title: string; slug: string } | null;
  children?: StrapiServiceTreeChild[];

  heroEyebrow: string | null;
  heroHeading: string | null;
  heroSubheading: string | null;
  heroImage: StrapiMedia | null;
  heroActions: StrapiLink[];

  trustHeading: string | null;
  trustLogos: StrapiTrustLogo[];

  overviewEyebrow: string | null;
  overviewHeading: string | null;
  overviewBody: string | null;
  overviewImage: StrapiMedia | null;
  overviewFeatures: StrapiIndustryDetailCard[];

  capabilitiesEyebrow: string | null;
  capabilitiesHeading: string | null;
  capabilitiesBody: string | null;

  credentialsHeading: string | null;
  credentialsBody: string | null;
  credentials: StrapiServiceStatItem[];

  methodologiesEyebrow: string | null;
  methodologiesHeading: string | null;
  methodologies: StrapiIndustryDetailCard[];

  industriesEyebrow: string | null;
  industriesHeading: string | null;
  industriesBody: string | null;
  industriesServed: StrapiIndustryDetailCard[];

  enquiryEyebrow: string | null;
  enquiryHeading: string | null;
  enquiryBody: string | null;
  enquiryImage: StrapiMedia | null;

  faqItems: StrapiFaqItem[];

  aboutEyebrow: string | null;
  aboutHeading: string | null;
  aboutBody: string | null;

  // Level-3 sub-service sections (Figma 859:15301). Optional so an older backend without them still type-checks.
  whyEyebrow?: string | null;
  whyHeading?: string | null;
  whyBody?: string | null;
  whyItems?: StrapiIndustryDetailCard[];
  measureEyebrow?: string | null;
  measureHeading?: string | null;
  measureBody?: string | null;
  measureItems?: StrapiIndustryDetailCard[];
  qualityEyebrow?: string | null;
  qualityHeading?: string | null;
  qualityBody?: string | null;
  qualityImage?: StrapiMedia | null;
  qualityItems?: StrapiIndustryDetailCard[];
  techEyebrow?: string | null;
  techHeading?: string | null;
  techBody?: string | null;
  techPanels?: StrapiIndustryDetailCard[];
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
  thumbnail: StrapiMedia | null;
  children: StrapiServiceTreeChild[];
}

export type StrapiServiceListResponse = StrapiResponse<StrapiServiceSummary[]>;
export type StrapiServiceDetailResponse = StrapiResponse<StrapiServiceDetail>;
export type StrapiServiceSlugsResponse = StrapiResponse<StrapiServiceSlug[]>;
export type StrapiServiceTreeResponse = StrapiResponse<StrapiServiceTreeItem[]>;

// ---------------------------------------------------------------------------
// Domain
// ---------------------------------------------------------------------------

export interface ServiceStatItemModel {
  id: string;
  value: string;
  label: string;
  iconIdentifier?: string;
}

export interface ServiceSummary {
  slug: string;
  title: string;
  summary: string;
  thumbnail?: ImageModel;
  basePrice?: string;
}

export interface ServiceDetail extends ServiceSummary {
  /** Optional overrides of the Global closing bands (empty fields inherit). */
  closingBands?: ClosingBandsSettings;
  /** False only when the CMS switch is OFF — such an entry is previewable (draft mode) but never public. */
  isActive?: boolean;
  features: FeatureModel[];
  seo?: SeoModel;
  legacyUrl?: string;
  suggestedUrl?: string;
  parent?: { title: string; slug: string };
  children: ServiceTreeChildModel[];

  heroEyebrow?: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroImage?: ImageModel;
  heroActions: LinkModel[];

  trustHeading?: string;
  trustLogos: TrustLogoModel[];

  overviewEyebrow?: string;
  overviewHeading?: string;
  overviewBody?: string;
  overviewImage?: ImageModel;
  overviewFeatures: IndustryDetailCardModel[];

  capabilitiesEyebrow?: string;
  capabilitiesHeading?: string;
  capabilitiesBody?: string;

  credentialsHeading?: string;
  credentialsBody?: string;
  credentials: ServiceStatItemModel[];

  methodologiesEyebrow?: string;
  methodologiesHeading?: string;
  methodologies: IndustryDetailCardModel[];

  industriesEyebrow?: string;
  industriesHeading?: string;
  industriesBody?: string;
  industriesServed: IndustryDetailCardModel[];

  enquiryEyebrow?: string;
  enquiryHeading?: string;
  enquiryBody?: string;
  enquiryImage?: ImageModel;

  faqItems: FaqItemModel[];

  aboutEyebrow?: string;
  aboutHeading?: string;
  aboutBody?: string;

  // Level-3 sub-service sections (Figma 859:15301).
  whyEyebrow?: string;
  whyHeading?: string;
  whyBody?: string;
  whyItems: IndustryDetailCardModel[];
  measureEyebrow?: string;
  measureHeading?: string;
  measureBody?: string;
  measureItems: IndustryDetailCardModel[];
  qualityEyebrow?: string;
  qualityHeading?: string;
  qualityBody?: string;
  qualityImage?: ImageModel;
  qualityItems: IndustryDetailCardModel[];
  techEyebrow?: string;
  techHeading?: string;
  techBody?: string;
  techPanels: IndustryDetailCardModel[];
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
  thumbnail?: ImageModel;
  children: ServiceTreeChildModel[];
}

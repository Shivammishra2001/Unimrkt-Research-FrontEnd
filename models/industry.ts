/**
 * Industry — mirrors models/service.ts's single-file Raw+Domain layout
 * (FRONTEND_SPEC.md §5.3 convention). Views import only the Domain
 * section below; controllers/normalize.ts is the only file that reads
 * the Raw section.
 *
 * Every attribute from `whatWeDoEyebrow` down maps 1:1 to a section of
 * Figma node 384:6205 ("Automotives") — see IndustryDetailView.tsx for
 * the render order. All are optional: a missing field means that
 * section has no CMS content yet and renders nothing (no fallback text).
 */
import type { StrapiMedia, StrapiResponse, StrapiSeo, StrapiLink, StrapiIndustryItem, StrapiFaqItem } from './strapi';
import type { LinkModel, ImageModel, SeoModel, IndustryItemModel, FaqItemModel } from './domain';

// ---------------------------------------------------------------------------
// Raw
// ---------------------------------------------------------------------------

export interface StrapiIndustryDetailCard {
  id: number;
  title: string;
  description: string | null;
  image: StrapiMedia | null;
  icon: StrapiMedia | null;
  iconIdentifier: string | null;
}

export interface StrapiTrustLogo {
  id: number;
  name: string;
  image: StrapiMedia | null;
}

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
  createdAt: string;
  publishedAt: string | null;

  heroEyebrow: string | null;
  heroHeading: string | null;
  heroSubheading: string | null;
  heroImage: StrapiMedia | null;
  heroActions: StrapiLink[];

  trustHeading: string | null;
  trustLogos: StrapiTrustLogo[];

  whatWeDoEyebrow: string | null;
  whatWeDoHeading: string | null;
  whatWeDoBody: string | null;
  whatWeDoCta: StrapiLink | null;
  whatWeDoImage: StrapiMedia | null;

  whyResearchEyebrow: string | null;
  whyResearchHeading: string | null;
  whyResearchCards: StrapiIndustryDetailCard[];

  expertiseEyebrow: string | null;
  expertiseHeading: string | null;
  expertiseItems: StrapiIndustryDetailCard[];

  challengesEyebrow: string | null;
  challengesHeading: string | null;
  challengesBody: string | null;
  challengesCards: StrapiIndustryDetailCard[];

  whoWeServeEyebrow: string | null;
  whoWeServeHeading: string | null;
  whoWeServeCards: StrapiIndustryDetailCard[];

  methodologiesEyebrow: string | null;
  methodologiesHeading: string | null;
  methodologiesBody: string | null;
  methodologies: StrapiIndustryItem[];

  empowerEyebrow: string | null;
  empowerHeading: string | null;
  empowerBody: string | null;
  empowerCta: StrapiLink | null;
  empowerImage: StrapiMedia | null;

  enquiryEyebrow: string | null;
  enquiryHeading: string | null;
  enquiryBody: string | null;
  enquiryImage: StrapiMedia | null;

  faqItems: StrapiFaqItem[];

  caseStudiesEyebrow: string | null;
  caseStudiesHeading: string | null;
  caseStudiesBody: string | null;
  caseStudiesCta: StrapiLink | null;
  caseStudies: StrapiIndustryItem[];

  aboutEyebrow: string | null;
  aboutHeading: string | null;
  aboutBody: string | null;
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

export interface IndustryDetailCardModel {
  id: string;
  title: string;
  description?: string;
  image?: ImageModel;
  icon?: ImageModel;
  iconIdentifier?: string;
}

export interface TrustLogoModel {
  id: string;
  name: string;
  image?: ImageModel;
}

export interface IndustryDetail extends IndustrySummary {
  legacyUrl?: string;
  suggestedUrl?: string;
  seo?: SeoModel;

  heroEyebrow?: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroImage?: ImageModel;
  heroActions: LinkModel[];

  trustHeading?: string;
  trustLogos: TrustLogoModel[];

  whatWeDoEyebrow?: string;
  whatWeDoHeading?: string;
  whatWeDoBody?: string;
  whatWeDoCta?: LinkModel;
  whatWeDoImage?: ImageModel;

  whyResearchEyebrow?: string;
  whyResearchHeading?: string;
  whyResearchCards: IndustryDetailCardModel[];

  expertiseEyebrow?: string;
  expertiseHeading?: string;
  expertiseItems: IndustryDetailCardModel[];

  challengesEyebrow?: string;
  challengesHeading?: string;
  challengesBody?: string;
  challengesCards: IndustryDetailCardModel[];

  whoWeServeEyebrow?: string;
  whoWeServeHeading?: string;
  whoWeServeCards: IndustryDetailCardModel[];

  methodologiesEyebrow?: string;
  methodologiesHeading?: string;
  methodologiesBody?: string;
  methodologies: IndustryItemModel[];

  empowerEyebrow?: string;
  empowerHeading?: string;
  empowerBody?: string;
  empowerCta?: LinkModel;
  empowerImage?: ImageModel;

  enquiryEyebrow?: string;
  enquiryHeading?: string;
  enquiryBody?: string;
  enquiryImage?: ImageModel;

  faqItems: FaqItemModel[];

  caseStudiesEyebrow?: string;
  caseStudiesHeading?: string;
  caseStudiesBody?: string;
  caseStudiesCta?: LinkModel;
  caseStudies: IndustryItemModel[];

  aboutEyebrow?: string;
  aboutHeading?: string;
  aboutBody?: string;
}

export interface IndustrySlugModel {
  slug: string;
  updatedAt: string;
}

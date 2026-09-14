/**
 * /our-company — Figma node 617:7561 ("Our Company", file
 * foaJFuv0vRX8nD43o0ylgB). A dedicated singleType
 * (api::our-company-page), not a `page` dynamiczone entry. Mirrors
 * models/servicesPage.ts's single-file Raw+Domain layout. Reuses
 * IndustryDetailCardModel/StrapiIndustryDetailCard (icon/iconIdentifier/
 * title/description/image) for every card grid on this page — Insights,
 * Ecosystem, Values, and Industries all share that exact shape — and
 * ServiceStatItemModel/StrapiServiceStatItem for the 4-stat band.
 */
import type { StrapiMedia, StrapiResponse, StrapiLink, StrapiFaqItem, StrapiSeo } from './strapi';
import type { StrapiIndustryDetailCard, IndustryDetailCardModel } from './industry';
import type { StrapiServiceStatItem, ServiceStatItemModel } from './service';
import type { ImageModel, LinkModel, FaqItemModel, SeoModel } from './domain';

// ---------------------------------------------------------------------------
// Raw
// ---------------------------------------------------------------------------

export interface StrapiOurCompanyPage {
  heroEyebrow: string | null;
  heroHeading: string | null;
  heroSubheading: string | null;
  heroImage: StrapiMedia | null;
  heroCta: StrapiLink | null;
  statsHeading: string | null;
  stats: StrapiServiceStatItem[];
  aboutEyebrow: string | null;
  aboutHeading: string | null;
  aboutBody: string | null;
  aboutImage: StrapiMedia | null;
  insightsEyebrow: string | null;
  insightsHeading: string | null;
  insightsBody: string | null;
  insightsCards: StrapiIndustryDetailCard[];
  ecosystemEyebrow: string | null;
  ecosystemHeading: string | null;
  ecosystemSubtext: string | null;
  ecosystemCards: StrapiIndustryDetailCard[];
  valuesEyebrow: string | null;
  valuesHeading: string | null;
  valuesBody: string | null;
  valuesCards: StrapiIndustryDetailCard[];
  industriesEyebrow: string | null;
  industriesHeading: string | null;
  industriesBody: string | null;
  industriesCards: StrapiIndustryDetailCard[];
  faqItems: StrapiFaqItem[];
  aboutCompanyEyebrow: string | null;
  aboutCompanyHeading: string | null;
  aboutCompanyBody: string | null;
  seo: StrapiSeo | null;
}

export type StrapiOurCompanyPageResponse = StrapiResponse<StrapiOurCompanyPage>;

// ---------------------------------------------------------------------------
// Domain
// ---------------------------------------------------------------------------

export interface OurCompanySettings {
  heroEyebrow?: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroImage?: ImageModel;
  heroCta?: LinkModel;
  statsHeading?: string;
  stats: ServiceStatItemModel[];
  aboutEyebrow?: string;
  aboutHeading?: string;
  aboutBody?: string;
  aboutImage?: ImageModel;
  insightsEyebrow?: string;
  insightsHeading?: string;
  insightsBody?: string;
  insightsCards: IndustryDetailCardModel[];
  ecosystemEyebrow?: string;
  ecosystemHeading?: string;
  ecosystemSubtext?: string;
  ecosystemCards: IndustryDetailCardModel[];
  valuesEyebrow?: string;
  valuesHeading?: string;
  valuesBody?: string;
  valuesCards: IndustryDetailCardModel[];
  industriesEyebrow?: string;
  industriesHeading?: string;
  industriesBody?: string;
  industriesCards: IndustryDetailCardModel[];
  faqItems: FaqItemModel[];
  aboutCompanyEyebrow?: string;
  aboutCompanyHeading?: string;
  aboutCompanyBody?: string;
  seo?: SeoModel;
}

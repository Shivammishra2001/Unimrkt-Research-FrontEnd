/**
 * /work-with-us — Figma node 924:23216 ("Work With Us", file
 * foaJFuv0vRX8nD43o0ylgB). A dedicated singleType
 * (api::work-with-us-page), not a `page` dynamiczone entry. Mirrors
 * models/contactPage.ts's single-file Raw+Domain layout. Reuses
 * IndustryDetailCardModel/StrapiIndustryDetailCard for every card grid
 * (values/benefits/journey steps).
 */
import type { StrapiMedia, StrapiResponse, StrapiLink, StrapiFaqItem, StrapiSeo } from './strapi';
import type { StrapiIndustryDetailCard, IndustryDetailCardModel } from './industry';
import type { ImageModel, LinkModel, FaqItemModel, SeoModel } from './domain';

// ---------------------------------------------------------------------------
// Raw
// ---------------------------------------------------------------------------

/** One "Identify opportunities for improvement in –"-style bullet in a
 * job's Job Description (Figma node 924:23508): a top-level bullet with
 * an optional nested numbered sub-list, exactly as drawn for the
 * "Executive – Language & Communication" job. */
export interface JobDescriptionBlock {
  text: string;
  subItems?: string[];
}

export interface StrapiJobListing {
  id: number;
  title: string;
  location: string;
  jobType: string;
  department: string;
  postedDate: string;
  /** Rich detail-modal content (node 924:23508) — only the one job the
   * node draws ("Executive – Language & Communication") has this
   * populated; every other job leaves these null/empty and the modal
   * omits the corresponding section rather than inventing filler. */
  descriptionItems: JobDescriptionBlock[] | null;
  skillsItems: string[] | null;
  qualificationsItems: string[] | null;
}

export interface StrapiWorkWithUsPage {
  heroEyebrow: string | null;
  heroHeading: string | null;
  heroSubheading: string | null;
  heroImage: StrapiMedia | null;
  heroCta: StrapiLink | null;
  valuesEyebrow: string | null;
  valuesHeading: string | null;
  valuesBody: string | null;
  valuesCards: StrapiIndustryDetailCard[];
  benefitsEyebrow: string | null;
  benefitsHeading: string | null;
  benefitsBody: string | null;
  benefitsLabel: string | null;
  benefitsImage: StrapiMedia | null;
  benefits: StrapiIndustryDetailCard[];
  jobsEyebrow: string | null;
  jobsHeading: string | null;
  jobsBody: string | null;
  jobs: StrapiJobListing[];
  journeyEyebrow: string | null;
  journeyHeading: string | null;
  journeyBody: string | null;
  journeySteps: StrapiIndustryDetailCard[];
  joinUsHeading: string | null;
  joinUsBody: string | null;
  disclaimerHeading: string | null;
  disclaimerBody: string | null;
  faqItems: StrapiFaqItem[];
  aboutCareersEyebrow: string | null;
  aboutCareersHeading: string | null;
  aboutCareersBody: string | null;
  seo: StrapiSeo | null;
}

export type StrapiWorkWithUsPageResponse = StrapiResponse<StrapiWorkWithUsPage>;

// ---------------------------------------------------------------------------
// Domain
// ---------------------------------------------------------------------------

export interface JobListingModel {
  id: string;
  title: string;
  location: string;
  jobType: string;
  department: string;
  postedDate: string;
  descriptionItems?: JobDescriptionBlock[];
  skillsItems?: string[];
  qualificationsItems?: string[];
}

export interface WorkWithUsSettings {
  heroEyebrow?: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroImage?: ImageModel;
  heroCta?: LinkModel;
  valuesEyebrow?: string;
  valuesHeading?: string;
  valuesBody?: string;
  valuesCards: IndustryDetailCardModel[];
  benefitsEyebrow?: string;
  benefitsHeading?: string;
  benefitsBody?: string;
  benefitsLabel?: string;
  benefitsImage?: ImageModel;
  benefits: IndustryDetailCardModel[];
  jobsEyebrow?: string;
  jobsHeading?: string;
  jobsBody?: string;
  jobs: JobListingModel[];
  journeyEyebrow?: string;
  journeyHeading?: string;
  journeyBody?: string;
  journeySteps: IndustryDetailCardModel[];
  joinUsHeading?: string;
  joinUsBody?: string;
  disclaimerHeading?: string;
  disclaimerBody?: string;
  faqItems: FaqItemModel[];
  aboutCareersEyebrow?: string;
  aboutCareersHeading?: string;
  aboutCareersBody?: string;
  seo?: SeoModel;
}

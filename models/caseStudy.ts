/**
 * Case Study — a single collectionType (api::case-study.case-study)
 * backs both:
 *  - /case-study's "Case Study Explorer" grid (Figma node 1023:45614,
 *    Component 1055-1060): the 4 listing fields at the top of each
 *    interface below.
 *  - /case-study/[slug]'s full detail page (Figma node 1107:49842):
 *    every field from `slug` down. All optional — a case study with
 *    none of them set falls back to node 1107:49842's own verbatim
 *    copy (see views/case-study/detail/fallback.ts).
 */
import type { StrapiMedia, StrapiResponse } from './strapi';
import type { ImageModel, FaqItemModel } from './domain';
import type { StrapiIndustryDetailCard, IndustryDetailCardModel, StrapiTrustLogo, TrustLogoModel } from './industry';
import type { StrapiFaqItem } from './strapi';

// ---------------------------------------------------------------------------
// Raw
// ---------------------------------------------------------------------------

export interface StrapiCaseStudy {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  coverImage: StrapiMedia | null;
  heroSubheading: string | null;
  heroImage: StrapiMedia | null;
  trustLogos: StrapiTrustLogo[];
  challengeHeading: string | null;
  challengeBody: string | null;
  challengeBullets: string[] | null;
  challengeClosing: string | null;
  challengePhoto: StrapiMedia | null;
  researchQuestionHeading: string | null;
  researchQuestionBody: string | null;
  researchQuestionItems: StrapiIndustryDetailCard[];
  approachHeading: string | null;
  approachBody: string | null;
  approachSteps: StrapiIndustryDetailCard[];
  uncoveredHeading: string | null;
  uncoveredBody: string | null;
  uncoveredPanels: StrapiIndustryDetailCard[];
  impactHeading: string | null;
  impactBody: string | null;
  impactImage: StrapiMedia | null;
  impactItems: StrapiIndustryDetailCard[];
  faqItems: StrapiFaqItem[];
}

export type StrapiCaseStudyListResponse = StrapiResponse<StrapiCaseStudy[]>;
export type StrapiCaseStudyDetailResponse = StrapiResponse<StrapiCaseStudy>;
export interface StrapiCaseStudySlugsResponse {
  data: { id: number; slug: string; updatedAt: string }[];
  meta: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Domain
// ---------------------------------------------------------------------------

export interface CaseStudySummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage?: ImageModel;
}

export interface CaseStudyDetail {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  coverImage?: ImageModel;
  heroSubheading?: string;
  heroImage?: ImageModel;
  trustLogos: TrustLogoModel[];
  challengeHeading?: string;
  challengeBody?: string;
  challengeBullets?: string[];
  challengeClosing?: string;
  challengePhoto?: ImageModel;
  researchQuestionHeading?: string;
  researchQuestionBody?: string;
  researchQuestionItems: IndustryDetailCardModel[];
  approachHeading?: string;
  approachBody?: string;
  approachSteps: IndustryDetailCardModel[];
  uncoveredHeading?: string;
  uncoveredBody?: string;
  uncoveredPanels: IndustryDetailCardModel[];
  impactHeading?: string;
  impactBody?: string;
  impactImage?: ImageModel;
  impactItems: IndustryDetailCardModel[];
  faqItems: FaqItemModel[];
}

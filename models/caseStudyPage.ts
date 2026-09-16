/**
 * Case Study Page settings — a dedicated singleType
 * (api::case-study-page.case-study-page) holding every piece of
 * template-level text/media shared across the /case-study listing page
 * (Figma node 1023:45614) and the shared section chrome on every
 * /case-study/[slug] detail page (Figma node 1107:49842) — the "Trusted
 * by Global Businesses" heading included. Per-case-study content stays
 * on `api::case-study.case-study` (models/caseStudy.ts); this settings
 * object is only the page furniture every case study shares, now
 * CMS-editable instead of hardcoded in the frontend template. Mirrors
 * models/ourCompanyPage.ts's single-file Raw+Domain layout.
 */
import type { StrapiMedia, StrapiResponse, StrapiLink, StrapiFaqItem } from './strapi';
import type { StrapiIndustryDetailCard, IndustryDetailCardModel } from './industry';
import type { ImageModel, LinkModel, FaqItemModel } from './domain';

// ---------------------------------------------------------------------------
// Raw
// ---------------------------------------------------------------------------

export interface StrapiCaseStudyTestimonialCard {
  id: number;
  heading: string;
  quote: string;
  roleLine: string;
  orgLine: string;
}

export interface StrapiCaseStudyPage {
  heroEyebrow: string | null;
  heroHeading: string | null;
  heroSubheading: string | null;
  heroImage: StrapiMedia | null;
  heroCta: StrapiLink | null;
  explorerEyebrow: string | null;
  explorerHeading: string | null;
  explorerBody: string | null;
  allLabel: string | null;
  industriesLabel: string | null;
  researchTypeLabel: string | null;
  approachEyebrow: string | null;
  approachHeading: string | null;
  approachSteps: StrapiIndustryDetailCard[];
  testimonialsEyebrow: string | null;
  testimonialsHeading: string | null;
  testimonials: StrapiCaseStudyTestimonialCard[];
  listingFaqHeading: string | null;
  listingFaqItems: StrapiFaqItem[];
  aboutEyebrow: string | null;
  aboutHeading: string | null;
  aboutBody: string | null;
  detailTrustHeading: string | null;
  detailChallengeEyebrow: string | null;
  detailChallengeNeedsLabel: string | null;
  detailResearchQuestionEyebrow: string | null;
  detailApproachEyebrow: string | null;
  detailUncoveredEyebrow: string | null;
  detailImpactEyebrow: string | null;
  detailFaqHeading: string | null;
  detailRelatedEyebrow: string | null;
  detailRelatedHeading: string | null;
  detailRelatedBody: string | null;
  bottomCtaHeading: string | null;
  bottomCtaBody: string | null;
  bottomCtaAction: StrapiLink | null;
}

export type StrapiCaseStudyPageResponse = StrapiResponse<StrapiCaseStudyPage>;

// ---------------------------------------------------------------------------
// Domain
// ---------------------------------------------------------------------------

export interface CaseStudyTestimonialCardModel {
  id: string;
  heading: string;
  quote: string;
  roleLine: string;
  orgLine: string;
}

export interface CaseStudyPageSettings {
  heroEyebrow?: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroImage?: ImageModel;
  heroCta?: LinkModel;
  explorerEyebrow?: string;
  explorerHeading?: string;
  explorerBody?: string;
  allLabel?: string;
  industriesLabel?: string;
  researchTypeLabel?: string;
  approachEyebrow?: string;
  approachHeading?: string;
  approachSteps: IndustryDetailCardModel[];
  testimonialsEyebrow?: string;
  testimonialsHeading?: string;
  testimonials: CaseStudyTestimonialCardModel[];
  listingFaqHeading?: string;
  listingFaqItems: FaqItemModel[];
  aboutEyebrow?: string;
  aboutHeading?: string;
  aboutBody?: string;
  detailTrustHeading?: string;
  detailChallengeEyebrow?: string;
  detailChallengeNeedsLabel?: string;
  detailResearchQuestionEyebrow?: string;
  detailApproachEyebrow?: string;
  detailUncoveredEyebrow?: string;
  detailImpactEyebrow?: string;
  detailFaqHeading?: string;
  detailRelatedEyebrow?: string;
  detailRelatedHeading?: string;
  detailRelatedBody?: string;
  bottomCtaHeading?: string;
  bottomCtaBody?: string;
  bottomCtaAction?: LinkModel;
}

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
import type { LinkModel, ImageModel, SeoModel, IndustryItemModel, FaqItemModel, ClosingBandsSettings } from './domain';

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
  /** CMS "Page visibility" switch; null/absent = active. */
  isActive?: boolean | null;
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  summary: string | null;
  icon: StrapiMedia | null;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// `sections` dynamic zone — each page section is a distinct component block
// (collapsible bar in Strapi Admin). The normalizer reads these back into the
// flat Domain `IndustryDetail` below, so views/fallback are unchanged.
// ---------------------------------------------------------------------------

interface SectionBase {
  __component: string;
  id: number;
}
export interface StrapiHeroSection extends SectionBase {
  __component: 'industry-sections.hero';
  eyebrow: string | null;
  heading: string | null;
  subheading: string | null;
  image: StrapiMedia | null;
  actions: StrapiLink[];
}
export interface StrapiOverviewSection extends SectionBase {
  __component: 'industry-sections.overview';
  showSection: boolean | null;
  eyebrow: string | null;
  heading: string | null;
  body: string | null;
  cta: StrapiLink | null;
  image: StrapiMedia | null;
  partnersHeading: string | null;
  partners: StrapiTrustLogo[];
}
export interface StrapiWhyResearchSection extends SectionBase {
  __component: 'industry-sections.why-research';
  showSection: boolean | null;
  eyebrow: string | null;
  heading: string | null;
  cards: StrapiIndustryDetailCard[];
}
export interface StrapiExpertiseSection extends SectionBase {
  __component: 'industry-sections.expertise';
  showSection: boolean | null;
  eyebrow: string | null;
  heading: string | null;
  items: StrapiIndustryDetailCard[];
}
export interface StrapiChallengesSection extends SectionBase {
  __component: 'industry-sections.challenges';
  showSection: boolean | null;
  eyebrow: string | null;
  heading: string | null;
  body: string | null;
  cards: StrapiIndustryDetailCard[];
}
export interface StrapiWhoWeServeSection extends SectionBase {
  __component: 'industry-sections.who-we-serve';
  showSection: boolean | null;
  eyebrow: string | null;
  heading: string | null;
  cards: StrapiIndustryDetailCard[];
}
export interface StrapiMethodologiesSection extends SectionBase {
  __component: 'industry-sections.methodologies';
  showSection: boolean | null;
  eyebrow: string | null;
  heading: string | null;
  body: string | null;
  items: StrapiIndustryItem[];
}
export interface StrapiEmpowerSection extends SectionBase {
  __component: 'industry-sections.empower';
  showSection: boolean | null;
  eyebrow: string | null;
  heading: string | null;
  body: string | null;
  cta: StrapiLink | null;
  image: StrapiMedia | null;
}
export interface StrapiEnquirySection extends SectionBase {
  __component: 'industry-sections.enquiry';
  showSection: boolean | null;
  eyebrow: string | null;
  heading: string | null;
  body: string | null;
  image: StrapiMedia | null;
}
export interface StrapiBlogsBandSection extends SectionBase {
  __component: 'industry-sections.blogs-band';
  showSection: boolean | null;
  eyebrow: string | null;
  heading: string | null;
  description: string | null;
}
export interface StrapiFaqSection extends SectionBase {
  __component: 'industry-sections.faq';
  showSection: boolean | null;
  heading: string | null;
  cta: StrapiLink | null;
  items: StrapiFaqItem[];
}
export interface StrapiCaseStudiesSection extends SectionBase {
  __component: 'industry-sections.case-studies';
  showSection: boolean | null;
  eyebrow: string | null;
  heading: string | null;
  body: string | null;
  cta: StrapiLink | null;
  items: StrapiIndustryItem[];
}
export interface StrapiAboutSection extends SectionBase {
  __component: 'industry-sections.about';
  showSection: boolean | null;
  eyebrow: string | null;
  heading: string | null;
  body: string | null;
}
export interface StrapiCtaBannerSection extends SectionBase {
  __component: 'industry-sections.cta-banner';
  showSection: boolean | null;
  heading: string | null;
  body: string | null;
  action: StrapiLink | null;
}
export type StrapiSeoSection = StrapiSeo & { __component: 'shared.seo' };

export type StrapiIndustrySection =
  | StrapiHeroSection
  | StrapiOverviewSection
  | StrapiWhyResearchSection
  | StrapiExpertiseSection
  | StrapiChallengesSection
  | StrapiWhoWeServeSection
  | StrapiMethodologiesSection
  | StrapiEmpowerSection
  | StrapiEnquirySection
  | StrapiBlogsBandSection
  | StrapiFaqSection
  | StrapiCaseStudiesSection
  | StrapiAboutSection
  | StrapiCtaBannerSection
  | StrapiSeoSection;

export interface StrapiIndustryDetail extends StrapiIndustrySummary {
  legacyUrl: string | null;
  suggestedUrl: string | null;
  createdAt: string;
  publishedAt: string | null;
  sections: StrapiIndustrySection[];
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
  /** Optional overrides of the Global closing bands (empty fields inherit). */
  closingBands?: ClosingBandsSettings;
  /** False only when the CMS switch is OFF — such an entry is previewable (draft mode) but never public. */
  isActive?: boolean;
  legacyUrl?: string;
  suggestedUrl?: string;
  seo?: SeoModel;

  // Per-section Show/Hide toggles. Undefined = not set in the CMS =
  // treat as visible (backward compatible); only an explicit false hides.
  showOverview?: boolean;
  showWhyResearch?: boolean;
  showExpertise?: boolean;
  showChallenges?: boolean;
  showWhoWeServe?: boolean;
  showMethodologies?: boolean;
  showEmpower?: boolean;
  showEnquiry?: boolean;
  showBlogs?: boolean;
  showFaq?: boolean;
  showCaseStudies?: boolean;
  showAbout?: boolean;
  showCtaBanner?: boolean;

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

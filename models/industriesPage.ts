/**
 * Industries page — /industries, Figma node 1384:26772. Editable from the
 * Strapi Pages section (entry slug `industries`, block
 * `page-content.industries`). The industry cards and blog posts come from
 * their own collections; everything else on the page is this block.
 */
import type { StrapiLink, StrapiMedia, StrapiSeo } from './strapi';
import type { FaqItemModel, ImageModel, LinkModel, SeoModel } from './domain';

// ---------------------------------------------------------------------------
// Raw
// ---------------------------------------------------------------------------

export interface StrapiIndustriesCard {
  id: number;
  title: string;
  body: string | null;
  icon?: StrapiMedia | null;
}

export interface StrapiIndustriesStat {
  id: number;
  value: string;
  label: string;
  icon?: StrapiMedia | null;
}

export interface StrapiIndustriesTestimonial {
  id: number;
  title: string;
  quote: string | null;
  name: string;
  role: string | null;
}

export interface StrapiIndustriesFaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface StrapiIndustriesPage {
  heroEyebrow: string | null;
  heroHeading: string | null;
  heroSubheading: string | null;
  heroImage: StrapiMedia | null;
  heroPrimaryCta: StrapiLink | null;
  heroSecondaryCta: StrapiLink | null;
  introEyebrow: string | null;
  introHeading: string | null;
  introBody: string | null;
  introImage: StrapiMedia | null;
  gridEyebrow: string | null;
  gridHeading: string | null;
  gridBody: string | null;
  gridBackgroundImage: StrapiMedia | null;
  gridCardFallbackImage: StrapiMedia | null;
  beyondEyebrow: string | null;
  beyondHeading: string | null;
  beyondBody: string | null;
  beyondCards: StrapiIndustriesCard[] | null;
  bandHeading: string | null;
  bandBody: string | null;
  bandBackgroundImage: StrapiMedia | null;
  bandPersonImage: StrapiMedia | null;
  bandCta: StrapiLink | null;
  insightsEyebrow: string | null;
  insightsHeading: string | null;
  insightsBody: string | null;
  insightsBackgroundImage: StrapiMedia | null;
  insightsCutoutImage: StrapiMedia | null;
  insightsItems: StrapiIndustriesCard[] | null;
  casesEyebrow: string | null;
  casesHeading: string | null;
  casesBody: string | null;
  caseCards: StrapiIndustriesCard[] | null;
  reachEyebrow: string | null;
  reachHeading: string | null;
  reachBody: string | null;
  reachStats: StrapiIndustriesStat[] | null;
  processEyebrow: string | null;
  processHeading: string | null;
  processBody: string | null;
  processSteps: StrapiIndustriesCard[] | null;
  testimonialsEyebrow: string | null;
  testimonialsHeading: string | null;
  testimonials: StrapiIndustriesTestimonial[] | null;
  faqCta: StrapiLink | null;
  faqHeading: string | null;
  faqItems: StrapiIndustriesFaqItem[] | null;
  aboutEyebrow: string | null;
  aboutHeading: string | null;
  aboutBody: string | null;
  finalCtaHeading: string | null;
  finalCtaBody: string | null;
  finalCtaImage: StrapiMedia | null;
  finalCtaAction: StrapiLink | null;
  seo: StrapiSeo | null;
}

export interface StrapiIndustriesPageResponse {
  data: StrapiIndustriesPage;
}

// ---------------------------------------------------------------------------
// Domain — every field is always present (CMS value, else the shipped copy).
// ---------------------------------------------------------------------------

export interface IndustriesCard {
  title: string;
  body: string;
  /** Uploaded icon; undefined -> the built-in icon for that position. */
  icon?: ImageModel;
}

export interface IndustriesSectionHead {
  eyebrow: string;
  heading: string;
  body: string;
}

export interface IndustriesPageContent {
  hero: { eyebrow: string; heading: string; subheading: string; image?: ImageModel; primaryCta: LinkModel; secondaryCta: LinkModel };
  intro: { eyebrow: string; heading: string; paragraphs: string[]; image?: ImageModel };
  grid: IndustriesSectionHead & { backgroundImage?: ImageModel; cardFallbackImage?: ImageModel };
  beyond: IndustriesSectionHead & { cards: IndustriesCard[] };
  band: { heading: string; body: string; cta: LinkModel; backgroundImage?: ImageModel; personImage?: ImageModel };
  insights: IndustriesSectionHead & { items: IndustriesCard[]; backgroundImage?: ImageModel; cutoutImage?: ImageModel };
  cases: IndustriesSectionHead & { cards: IndustriesCard[] };
  reach: IndustriesSectionHead & { stats: { value: string; label: string; icon?: ImageModel }[] };
  process: IndustriesSectionHead & { steps: IndustriesCard[] };
  testimonials: {
    eyebrow: string;
    heading: string;
    items: { title: string; quote: string; name: string; role: string }[];
  };
  faq: { cta: LinkModel; heading: string; items: FaqItemModel[] };
  about: { eyebrow: string; heading: string; paragraphs: string[] };
  finalCta: { heading: string; body: string; action: LinkModel; image?: ImageModel };
  seo?: SeoModel;
}

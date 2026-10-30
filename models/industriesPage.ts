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

/** One dynamic-zone block per page section (components `industries-page.*`),
 * each carrying its own text and images. */
export interface StrapiIndustriesHero {
  eyebrow: string | null;
  heading: string | null;
  subheading: string | null;
  image: StrapiMedia | null;
  primaryCta: StrapiLink | null;
  secondaryCta: StrapiLink | null;
}
export interface StrapiIndustriesIntro {
  eyebrow: string | null;
  heading: string | null;
  body: string | null;
  image: StrapiMedia | null;
}
export interface StrapiIndustriesGrid {
  eyebrow: string | null;
  heading: string | null;
  body: string | null;
  backgroundImage: StrapiMedia | null;
  cardFallbackImage: StrapiMedia | null;
}
export interface StrapiIndustriesBeyond {
  eyebrow: string | null;
  heading: string | null;
  body: string | null;
  cards: StrapiIndustriesCard[] | null;
}
export interface StrapiIndustriesBand {
  heading: string | null;
  body: string | null;
  backgroundImage: StrapiMedia | null;
  personImage: StrapiMedia | null;
  cta: StrapiLink | null;
}
export interface StrapiIndustriesInsights {
  eyebrow: string | null;
  heading: string | null;
  body: string | null;
  backgroundImage: StrapiMedia | null;
  cutoutImage: StrapiMedia | null;
  items: StrapiIndustriesCard[] | null;
}
export interface StrapiIndustriesCases {
  eyebrow: string | null;
  heading: string | null;
  body: string | null;
  cards: StrapiIndustriesCard[] | null;
}
export interface StrapiIndustriesReach {
  eyebrow: string | null;
  heading: string | null;
  body: string | null;
  stats: StrapiIndustriesStat[] | null;
}
export interface StrapiIndustriesProcess {
  eyebrow: string | null;
  heading: string | null;
  body: string | null;
  steps: StrapiIndustriesCard[] | null;
}
export interface StrapiIndustriesTestimonials {
  eyebrow: string | null;
  heading: string | null;
  items: StrapiIndustriesTestimonial[] | null;
}
export interface StrapiIndustriesFaq {
  cta: StrapiLink | null;
  heading: string | null;
  items: StrapiIndustriesFaqItem[] | null;
}
export interface StrapiIndustriesAbout {
  eyebrow: string | null;
  heading: string | null;
  body: string | null;
}
export interface StrapiIndustriesFinalCta {
  heading: string | null;
  body: string | null;
  image: StrapiMedia | null;
  action: StrapiLink | null;
}

/** Section key -> block shape, keyed by the part after `industries-page.`. */
export interface StrapiIndustriesSections {
  hero: StrapiIndustriesHero;
  intro: StrapiIndustriesIntro;
  grid: StrapiIndustriesGrid;
  beyond: StrapiIndustriesBeyond;
  band: StrapiIndustriesBand;
  insights: StrapiIndustriesInsights;
  cases: StrapiIndustriesCases;
  reach: StrapiIndustriesReach;
  process: StrapiIndustriesProcess;
  testimonials: StrapiIndustriesTestimonials;
  faq: StrapiIndustriesFaq;
  about: StrapiIndustriesAbout;
  'final-cta': StrapiIndustriesFinalCta;
}

export interface StrapiIndustriesPage {
  seo: StrapiSeo | null;
  blocks: Array<{ __component: string }>;
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

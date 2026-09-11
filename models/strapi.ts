/**
 * Raw Strapi v5 DTOs — the wire format exactly as the backend returns it
 * (flat attributes, no `data.attributes` nesting; `documentId` alongside
 * the numeric `id`). Per FRONTEND_SPEC.md §5.2 / API_SPECIFICATION.md §1.3.
 *
 * Views must never import from this file — only controllers/normalize.ts
 * and controllers/strapi.ts (plus mocks/*, which fabricate this exact
 * shape) are allowed to know these field names.
 */

export interface StrapiResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface StrapiErrorResponse {
  data: null;
  error: { status: number; name: string; message: string; details: Record<string, unknown> };
}

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
  mime: string;
  size: number;
}

export interface StrapiMedia {
  id: number;
  documentId?: string;
  url: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  mime: string;
  formats: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  } | null;
}

export type LinkVariant = 'primary' | 'secondary' | 'ghost' | 'link';
export type BlockTheme = 'light' | 'dark' | 'accent';

export interface StrapiLink {
  id: number;
  label: string;
  href: string;
  isExternal: boolean;
  variant: LinkVariant;
}

export interface StrapiNavChildItem {
  id: number;
  label: string;
  href: string;
  isExternal: boolean;
}

export interface StrapiNavItem {
  id: number;
  label: string;
  href: string;
  isExternal: boolean;
  children: StrapiNavChildItem[];
  showIndicator?: boolean;
}

export interface StrapiSeo {
  id: number;
  metaTitle: string;
  metaDescription: string;
  shareImage: StrapiMedia | null;
  keywords: string | null;
  preventIndexing: boolean;
}

export interface StrapiTestimonial {
  id: number;
  documentId?: string;
  quote: string;
  authorName: string;
  authorRole: string | null;
  company: string | null;
  avatar: StrapiMedia | null;
  companyLogo: StrapiMedia | null;
  rating: number | null;
  featured: boolean;
}

interface StrapiBlockBase {
  id: number;
  anchorId?: string | null;
  theme?: BlockTheme | null;
}

export interface StrapiHeroBlock extends StrapiBlockBase {
  __component: 'blocks.hero';
  eyebrow: string | null;
  heading: string;
  subheading: string | null;
  media: StrapiMedia | null;
  mediaAlignment: 'right' | 'left' | 'below' | 'background';
  actions: StrapiLink[];
  sideMenu?: StrapiServiceBandItem[];
  headingSize?: 'display' | 'h2' | null;
  statValue?: string | null;
  statLabel?: string | null;
}

export interface StrapiContentBlock extends StrapiBlockBase {
  __component: 'blocks.content';
  heading: string | null;
  body: string;
  media: StrapiMedia | null;
  mediaAlignment: 'left' | 'right' | 'below' | 'none';
  contactPrompt?: string | null;
  contactEmail?: string | null;
}

export interface StrapiFeatureItem {
  id: number;
  title: string;
  description: string;
  icon: StrapiMedia | null;
  link: StrapiLink | null;
  // blocks.why-choose-us reuses this same component — feature-grid's
  // items simply never set these.
  iconIdentifier: string | null;
  statValue: string | null;
  statLabel: string | null;
  order: number | null;
}

export interface StrapiFeatureGridBlock extends StrapiBlockBase {
  __component: 'blocks.feature-grid';
  heading: string | null;
  subheading: string | null;
  columns: '2' | '3' | '4';
  items: StrapiFeatureItem[];
}

export interface StrapiTestimonialsBlock extends StrapiBlockBase {
  __component: 'blocks.testimonials';
  heading: string | null;
  subheading: string | null;
  layout: 'grid' | 'carousel' | 'single';
  testimonials?: StrapiTestimonial[];
}

export interface StrapiCtaBlock extends StrapiBlockBase {
  __component: 'blocks.cta';
  heading: string;
  body: string | null;
  actions: StrapiLink[];
  background: StrapiMedia | null;
  backgroundColor?: string | null;
}

export interface StrapiStatItem {
  id: number;
  value: string;
  label: string;
}

export interface StrapiStatsBandBlock extends StrapiBlockBase {
  __component: 'blocks.stats-band';
  heading: string | null;
  items: StrapiStatItem[];
}

export interface StrapiServiceBandItem {
  id: number;
  label: string;
  href: string;
  isActive?: boolean;
  description?: string | null;
}

export interface StrapiServiceBandBlock extends StrapiBlockBase {
  __component: 'blocks.service-band';
  heading: string;
  body: string | null;
  background: StrapiMedia | null;
  cta: StrapiLink | null;
  items: StrapiServiceBandItem[];
}

export interface StrapiIndustryItem {
  id: number;
  title: string;
  image: StrapiMedia | null;
  accentColor: string | null;
}

export interface StrapiIndustryGridBlock extends StrapiBlockBase {
  __component: 'blocks.industry-grid';
  heading: string;
  subheading: string | null;
  background: StrapiMedia | null;
  cta: StrapiLink | null;
  items: StrapiIndustryItem[];
}

export interface StrapiMediaItem {
  id: number;
  media: StrapiMedia | null;
  size: 'large' | 'small';
  videoUrl: string | null;
}

export interface StrapiMediaGalleryBlock extends StrapiBlockBase {
  __component: 'blocks.media-gallery';
  heading: string;
  subheading: string | null;
  actions: StrapiLink[];
  items: StrapiMediaItem[];
}

export interface StrapiFaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface StrapiFaqBlock extends StrapiBlockBase {
  __component: 'blocks.faq';
  heading: string;
  background: StrapiMedia | null;
  items: StrapiFaqItem[];
  cta: StrapiLink | null;
}

export interface StrapiBlogPostItem {
  id: number;
  title: string;
  excerpt: string | null;
  image: StrapiMedia | null;
  href: string;
}

export interface StrapiBlogTeaserBlock extends StrapiBlockBase {
  __component: 'blocks.blog-teaser';
  eyebrow: string | null;
  heading: string;
  actions: StrapiLink[];
  posts: StrapiBlogPostItem[];
}

export interface StrapiWhyChooseUsBlock extends StrapiBlockBase {
  __component: 'blocks.why-choose-us';
  eyebrow: string | null;
  heading: string;
  subheading: string | null;
  description: string | null;
  items: StrapiFeatureItem[];
}

export interface StrapiProcessStepItem {
  id: number;
  stepNumber: string | null;
  title: string;
  description: string;
  icon: StrapiMedia | null;
  iconIdentifier: string | null;
  order: number | null;
}

export interface StrapiProcessStepsBlock extends StrapiBlockBase {
  __component: 'blocks.process-steps';
  eyebrow: string | null;
  heading: string;
  subheading: string | null;
  steps: StrapiProcessStepItem[];
}

export type StrapiBlock =
  | StrapiHeroBlock
  | StrapiContentBlock
  | StrapiFeatureGridBlock
  | StrapiTestimonialsBlock
  | StrapiCtaBlock
  | StrapiStatsBandBlock
  | StrapiServiceBandBlock
  | StrapiIndustryGridBlock
  | StrapiMediaGalleryBlock
  | StrapiFaqBlock
  | StrapiBlogTeaserBlock
  | StrapiWhyChooseUsBlock
  | StrapiProcessStepsBlock;

export interface StrapiPage {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  seo: StrapiSeo | null;
  blocks: StrapiBlock[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface StrapiPageSlug {
  id: number;
  slug: string;
  updatedAt: string;
}

export interface StrapiFooterColumn {
  id: number;
  heading: string;
  links: StrapiLink[];
}

export interface StrapiGlobal {
  id: number;
  documentId?: string;
  siteName: string;
  logo: StrapiMedia;
  logoDark: StrapiMedia | null;
  primaryNav: StrapiNavItem[];
  navCta: StrapiLink | null;
  footerColumns: StrapiFooterColumn[];
  socialLinks: StrapiLink[];
  copyright: string | null;
  footerTagline: string | null;
  defaultSeo: StrapiSeo;
}

export type StrapiPageResponse = StrapiResponse<StrapiPage>;
export type StrapiPageSlugsResponse = StrapiResponse<StrapiPageSlug[]>;
export type StrapiGlobalResponse = StrapiResponse<StrapiGlobal>;

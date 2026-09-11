/**
 * Normalized domain models — what every View actually receives as props.
 * Per FRONTEND_SPEC.md §5.1. No `HomepageModel`: any routable page (home,
 * about, a nested section) normalizes to the same `PageModel` shape.
 */

export interface ImageModel {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

export type LinkVariant = 'primary' | 'secondary' | 'ghost' | 'link';

export interface LinkModel {
  id: string;
  label: string;
  href: string;
  isExternal: boolean;
  variant: LinkVariant;
}

export interface NavigationItemModel {
  id: string;
  label: string;
  href: string;
  isExternal: boolean;
  children: NavigationItemModel[];
  // A chevron with real dropdown children behind it is one thing; Figma's
  // nav also shows the same chevron on "About unimrkt" and "Contact",
  // which have no children in the Model. Rather than have the View infer
  // that from content (or fake a dropdown with no menu behind it), this
  // is its own explicit, CMS-set flag — true only for those two.
  showIndicator: boolean;
}

export interface SeoModel {
  title: string;
  description: string;
  shareImage?: ImageModel;
  keywords: string[];
  noIndex: boolean;
}

export interface TestimonialModel {
  id: string;
  quote: string;
  authorName: string;
  authorRole?: string;
  company?: string;
  avatar?: ImageModel;
  companyLogo?: ImageModel;
  rating: number;
}

export interface FeatureModel {
  id: string;
  title: string;
  description: string;
  icon?: ImageModel;
  /** Fallback key for a static icon set (e.g. Lucide) — set when the CMS
   * entry has no uploaded `icon` media, used by blocks.why-choose-us. */
  iconIdentifier?: string;
  link?: LinkModel;
  /** blocks.why-choose-us only — feature-grid's items never set these. */
  statValue?: string;
  statLabel?: string;
  order: number;
}

export type BlockTheme = 'light' | 'dark' | 'accent';

interface BlockBase {
  id: string;
  anchorId?: string;
  theme: BlockTheme;
}

export interface HeroModel extends BlockBase {
  kind: 'hero';
  eyebrow?: string;
  heading: string;
  subheading?: string;
  media?: ImageModel;
  videoUrl?: string;
  mediaAlignment: 'right' | 'left' | 'below' | 'background';
  actions: LinkModel[];
  sideMenu: ServiceBandItemModel[];
  headingSize: 'display' | 'h2';
  statValue?: string;
  statLabel?: string;
}

export interface ContentModel extends BlockBase {
  kind: 'content';
  heading?: string;
  body: string;
  media?: ImageModel;
  mediaAlignment: 'left' | 'right' | 'below' | 'none';
  contactPrompt?: string;
  contactEmail?: string;
}

export interface FeatureGridModel extends BlockBase {
  kind: 'featureGrid';
  heading?: string;
  subheading?: string;
  columns: 2 | 3 | 4;
  items: FeatureModel[];
}

export interface TestimonialsModel extends BlockBase {
  kind: 'testimonials';
  heading?: string;
  subheading?: string;
  layout: 'grid' | 'carousel' | 'single';
  items: TestimonialModel[];
}

export interface CtaModel extends BlockBase {
  kind: 'cta';
  heading: string;
  body?: string;
  actions: LinkModel[];
  background?: ImageModel;
  // Per-instance override — falls back to the shared `theme` preset
  // (light/dark/accent) when unset, so most CTAs need no change at all.
  backgroundColor?: string;
}

export interface StatItemModel {
  id: string;
  value: string;
  label: string;
}

export interface StatsBandModel extends BlockBase {
  kind: 'statsBand';
  heading?: string;
  items: StatItemModel[];
}

export interface ServiceBandItemModel {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
  description?: string;
}

export interface ServiceBandModel extends BlockBase {
  kind: 'serviceBand';
  heading: string;
  body?: string;
  background?: ImageModel;
  cta?: LinkModel;
  items: ServiceBandItemModel[];
}

export interface IndustryItemModel {
  id: string;
  title: string;
  image?: ImageModel;
  accentColor: string;
}

export interface IndustryGridModel extends BlockBase {
  kind: 'industryGrid';
  heading: string;
  subheading?: string;
  background?: ImageModel;
  cta?: LinkModel;
  items: IndustryItemModel[];
}

export interface MediaItemModel {
  id: string;
  media?: ImageModel;
  size: 'large' | 'small';
  videoUrl?: string;
}

export interface MediaGalleryModel extends BlockBase {
  kind: 'mediaGallery';
  heading: string;
  subheading?: string;
  actions: LinkModel[];
  items: MediaItemModel[];
}

export interface FaqItemModel {
  id: string;
  question: string;
  answer: string;
}

export interface FaqModel extends BlockBase {
  kind: 'faq';
  heading: string;
  background?: ImageModel;
  items: FaqItemModel[];
  // Figma node 267:1274 ("Browse Blogs") — homepage-only so far; optional
  // since every other page using blocks.faq has none.
  cta?: LinkModel;
}

export interface BlogPostItemModel {
  id: string;
  title: string;
  excerpt?: string;
  image?: ImageModel;
  href: string;
}

export interface BlogTeaserModel extends BlockBase {
  kind: 'blogTeaser';
  eyebrow?: string;
  heading: string;
  actions: LinkModel[];
  posts: BlogPostItemModel[];
}

export interface WhyChooseUsModel extends BlockBase {
  kind: 'whyChooseUs';
  eyebrow?: string;
  heading: string;
  subheading?: string;
  description?: string;
  items: FeatureModel[];
}

export interface ProcessStepItemModel {
  id: string;
  stepNumber?: string;
  title: string;
  description: string;
  icon?: ImageModel;
  iconIdentifier?: string;
  order: number;
}

export interface ProcessStepsModel extends BlockBase {
  kind: 'processSteps';
  eyebrow?: string;
  heading: string;
  subheading?: string;
  steps: ProcessStepItemModel[];
}

export type BlockModel =
  | HeroModel
  | ContentModel
  | FeatureGridModel
  | TestimonialsModel
  | CtaModel
  | StatsBandModel
  | ServiceBandModel
  | IndustryGridModel
  | MediaGalleryModel
  | FaqModel
  | BlogTeaserModel
  | WhyChooseUsModel
  | ProcessStepsModel;

export type BlockKind = BlockModel['kind'];

export interface PageModel {
  title: string;
  slug: string;
  seo?: SeoModel;
  blocks: BlockModel[];
}

export interface PageSlugModel {
  slug: string;
  updatedAt: string;
}

export interface NavigationModel {
  siteName: string;
  logo: ImageModel;
  logoDark?: ImageModel;
  items: NavigationItemModel[];
  cta?: LinkModel;
}

export interface FooterModel {
  columns: Array<{ id: string; heading: string; links: LinkModel[] }>;
  socialLinks: LinkModel[];
  copyright?: string;
  // Figma footer (node 267:1522) repeats the nav logo + a short tagline
  // above the columns — reuses global.logo rather than a second upload.
  logo: ImageModel;
  tagline?: string;
}

export interface GlobalModel {
  navigation: NavigationModel;
  footer: FooterModel;
  defaultSeo: SeoModel;
}

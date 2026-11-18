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
  /** Global → Primary Nav "Menu type"; undefined on older data (the Navbar then detects Services / Industries by URL). */
  menuType?: 'link' | 'dropdown' | 'services_mega_menu' | 'industries_mega_menu';
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
  /** Set instead of `background` when the CMS upload is a video (mp4). */
  backgroundVideo?: string;
  // Per-instance override — falls back to the shared `theme` preset
  // (light/dark/accent) when unset, so most CTAs need no change at all.
  backgroundColor?: string;
}

export interface StatItemModel {
  id: string;
  value: string;
  label: string;
  description?: string;
  image?: ImageModel;
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
  /** Hero side-menu only — the left-hand copy shown while this row is selected;
   * any field left empty falls back to the hero block's own eyebrow / heading /
   * subheading / first action. */
  tag?: string;
  headline?: string;
  ctaLabel?: string;
  /** Hero side-menu only — row icon (empty = the Figma pictogram for the label). */
  icon?: ImageModel;
}

export interface ServiceBandModel extends BlockBase {
  kind: 'serviceBand';
  heading: string;
  body?: string;
  background?: ImageModel;
  /** Set instead of `background` when the CMS upload is a video (mp4). */
  backgroundVideo?: string;
  cta?: LinkModel;
  items: ServiceBandItemModel[];
}

export interface IndustryItemModel {
  id: string;
  title: string;
  /** Hover-state copy (Figma 363:6474). */
  description?: string;
  /** Optional link target (e.g. a case study's own page). */
  href?: string;
  image?: ImageModel;
  accentColor: string;
}

export interface IndustryGridModel extends BlockBase {
  kind: 'industryGrid';
  heading: string;
  subheading?: string;
  background?: ImageModel;
  /** Set instead of `background` when the CMS upload is a video (mp4). */
  backgroundVideo?: string;
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
  /** Optional line under the heading (the /blogs band, Figma 522:4813). */
  description?: string;
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
  /** False only when the CMS switch is OFF — such an entry is previewable (draft mode) but never public. */
  isActive?: boolean;
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
  /** Global → Services Mega-Menu (order / rename / hide categories, eyebrow, footer links). */
  servicesMenu?: ServicesMenuModel;
  /** Global → Industries Mega-Menu (sector groups, Other label, intro, footer links). */
  industriesMenu?: IndustriesMenuModel;
}

export interface ServicesMenuModel {
  eyebrow?: string;
  /** New top-level services not listed in `categories` are appended automatically. */
  autoIncludeNew: boolean;
  /** Label of each category's "Overview" link. */
  overviewLabel?: string;
  categories: Array<{ slug: string; label?: string; description?: string; isVisible: boolean }>;
  exploreLink?: LinkModel;
  ctaLink?: LinkModel;
}

export interface IndustriesMenuModel {
  eyebrow?: string;
  /** May contain {count}. */
  intro?: string;
  groups: Array<{ label: string; slugs: string[] }>;
  otherGroupLabel?: string;
  /** Labels may contain {count}. */
  viewAllLink?: LinkModel;
  ctaLink?: LinkModel;
}

export interface FooterModel {
  columns: Array<{ id: string; heading: string; links: LinkModel[] }>;
  socialLinks: LinkModel[];
  copyright?: string;
  // Figma footer (node 267:1522) repeats the nav logo + a short tagline
  // above the columns — reuses global.logo rather than a second upload.
  logo: ImageModel;
  tagline?: string;
  /** Global → Footer badges (certifications), in order; alt text from each upload. */
  badges: ImageModel[];
  /** Global → "Connect with us" heading above the social icons. */
  socialHeading?: string;
}

export interface GlobalModel {
  navigation: NavigationModel;
  footer: FooterModel;
  defaultSeo: SeoModel;
  /** Site-wide closing bands (Global defaults that pages may override). */
  closingBands: ClosingBandsSettings;
  /** Global → Chat Widget copy (empty = built-in copy). */
  chatWidget?: ChatWidgetModel;
}

export interface ChatWidgetModel {
  title?: string;
  status?: string;
  greeting?: string;
  quickActions: ChatQuickActionModel[];
  keywordReplies: ChatKeywordReplyModel[];
  placeholder?: string;
  acknowledgement?: string;
  formButtonLabel?: string;
  proposalButtonLabel?: string;
  formIntro?: string;
  serviceOptions: string[];
  /** {name} and {contact} are filled in after a submit. */
  formSuccess?: string;
}

export interface ChatQuickActionModel {
  id: string;
  label: string;
  /** 'lead_form' shows `reply` and opens the inline callback form. */
  action: 'reply' | 'lead_form';
  reply: string;
  highlights: string[];
  stats: string[];
  link?: { label: string; href: string };
  showFormButton: boolean;
}

export interface ChatKeywordReplyModel {
  id: string;
  keywords: string[];
  reply: string;
  highlights: string[];
  link?: { label: string; href: string };
  opensForm: boolean;
}

/** The three bands most pages close with, as stored in Strapi: every field optional (empty = inherit). Global holds the
 * defaults; services, industries and page records hold optional overrides of the same shape. */
export interface ClosingBandsSettings {
  blog?: { eyebrow?: string; heading?: string; description?: string };
  faq?: { heading?: string; cta?: LinkModel };
  finalCta?: { heading?: string; body?: string; action?: LinkModel };
}

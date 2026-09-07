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
  link?: LinkModel;
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
}

export interface ContentModel extends BlockBase {
  kind: 'content';
  heading?: string;
  body: string;
  media?: ImageModel;
  mediaAlignment: 'left' | 'right' | 'none';
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
  | BlogTeaserModel;

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
}

export interface GlobalModel {
  navigation: NavigationModel;
  footer: FooterModel;
  defaultSeo: SeoModel;
}

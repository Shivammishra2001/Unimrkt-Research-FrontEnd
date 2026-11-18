/**
 * Pages → Blogs (slug "blogs", one `page-content.blog` block): the /blogs listing copy top to bottom, plus the labels
 * every /blogs/[slug] post page shares. Every field optional — the views fall back to the built-in copy.
 */
import type { StrapiMedia, StrapiResponse, StrapiLink, StrapiFaqItem, StrapiSeo, StrapiClosingBands } from './strapi';
import type { ImageModel, LinkModel, FaqItemModel, SeoModel, ClosingBandsSettings } from './domain';

export interface StrapiBlogPage extends StrapiClosingBands {
  heroEyebrow: string | null;
  heroHeading: string | null;
  heroSubheading: string | null;
  heroCta: StrapiLink | null;
  heroImage: StrapiMedia | null;
  gridHeading: string | null;
  gridIntro: string | null;
  faqItems: StrapiFaqItem[];
  aboutEyebrow: string | null;
  aboutHeading: string | null;
  aboutBody: string | null;
  postRelatedEyebrow: string | null;
  postQuickEnquiryHeading: string | null;
  postQuickEnquirySubheading: string | null;
  postRecentPostsHeading: string | null;
  postShareLabel: string | null;
  seo: StrapiSeo | null;
}

export type StrapiBlogPageResponse = StrapiResponse<StrapiBlogPage>;

export interface BlogPageSettings {
  heroEyebrow?: string;
  /** "\n" marks the desktop line break. */
  heroHeading?: string;
  heroSubheading?: string;
  heroCta?: LinkModel;
  heroImage?: ImageModel;
  gridHeading?: string;
  gridIntro?: string;
  faqItems: FaqItemModel[];
  aboutEyebrow?: string;
  aboutHeading?: string;
  aboutBody?: string;
  postRelatedEyebrow?: string;
  postQuickEnquiryHeading?: string;
  postQuickEnquirySubheading?: string;
  postRecentPostsHeading?: string;
  postShareLabel?: string;
  closingBands?: ClosingBandsSettings;
  seo?: SeoModel;
}

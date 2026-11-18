/** Pages → Gallery (slug "gallery", one `page-content.gallery` block). Every field optional — the view falls back to
 * the built-in copy. */
import type { StrapiMedia, StrapiResponse, StrapiSeo, StrapiClosingBands } from './strapi';
import type { ImageModel, SeoModel, ClosingBandsSettings } from './domain';

export interface StrapiGalleryPage extends StrapiClosingBands {
  heroEyebrow: string | null;
  heroHeading: string | null;
  heroSubheading: string | null;
  heroImage: StrapiMedia | null;
  gridHeading: string | null;
  finalCtaImage: StrapiMedia | null;
  seo: StrapiSeo | null;
}

export type StrapiGalleryPageResponse = StrapiResponse<StrapiGalleryPage>;

export interface GalleryPageSettings {
  heroEyebrow?: string;
  /** "\n" marks the desktop line break. */
  heroHeading?: string;
  heroSubheading?: string;
  heroImage?: ImageModel;
  gridHeading?: string;
  finalCtaImage?: ImageModel;
  closingBands?: ClosingBandsSettings;
  seo?: SeoModel;
}

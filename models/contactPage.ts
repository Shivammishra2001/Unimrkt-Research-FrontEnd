/**
 * /contact — Figma node 637:10433 ("Contact", file
 * foaJFuv0vRX8nD43o0ylgB). A dedicated singleType (api::contact-page),
 * not a `page` dynamiczone entry. Mirrors models/ourCompanyPage.ts's
 * single-file Raw+Domain layout. Reuses ServiceStatItemModel/
 * StrapiServiceStatItem for the 4-stat band (identical shape to
 * /our-company's).
 */
import type { StrapiMedia, StrapiResponse, StrapiLink, StrapiFaqItem, StrapiSeo, StrapiClosingBands } from './strapi';
import type { StrapiServiceStatItem, ServiceStatItemModel } from './service';
import type { ImageModel, LinkModel, FaqItemModel, SeoModel, ClosingBandsSettings } from './domain';

// ---------------------------------------------------------------------------
// Raw
// ---------------------------------------------------------------------------

export interface StrapiOfficeLocation {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  phoneLabel: string | null;
  featured: boolean;
  image: StrapiMedia | null;
  mapLatitude?: number | string | null;
  mapLongitude?: number | string | null;
  mapLabel?: string | null;
}

export interface StrapiContactPage extends StrapiClosingBands {
  heroEyebrow: string | null;
  heroHeading: string | null;
  heroSubheading: string | null;
  heroImage: StrapiMedia | null;
  heroCta: StrapiLink | null;
  statsHeading: string | null;
  stats: StrapiServiceStatItem[];
  officeEyebrow: string | null;
  officeHeading: string | null;
  offices: StrapiOfficeLocation[];
  formEyebrow: string | null;
  formHeading: string | null;
  formSubheading: string | null;
  formImage: StrapiMedia | null;
  faqItems: StrapiFaqItem[];
  workWithUsHeading: string | null;
  workWithUsBody: string | null;
  workWithUsCta: StrapiLink | null;
  workWithUsImage: StrapiMedia | null;
  seo: StrapiSeo | null;
}

export type StrapiContactPageResponse = StrapiResponse<StrapiContactPage>;

// ---------------------------------------------------------------------------
// Domain
// ---------------------------------------------------------------------------

export interface OfficeLocationModel {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  phoneLabel?: string;
  featured: boolean;
  image?: ImageModel;
  mapLatitude?: number;
  mapLongitude?: number;
  mapLabel?: string;
}

export interface ContactPageSettings {
  /** Optional overrides of the Global closing bands (empty fields inherit). */
  closingBands?: ClosingBandsSettings;
  heroEyebrow?: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroImage?: ImageModel;
  heroCta?: LinkModel;
  statsHeading?: string;
  stats: ServiceStatItemModel[];
  officeEyebrow?: string;
  officeHeading?: string;
  offices: OfficeLocationModel[];
  formEyebrow?: string;
  formHeading?: string;
  formSubheading?: string;
  formImage?: ImageModel;
  faqItems: FaqItemModel[];
  workWithUsHeading?: string;
  workWithUsBody?: string;
  workWithUsCta?: LinkModel;
  workWithUsImage?: ImageModel;
  seo?: SeoModel;
}

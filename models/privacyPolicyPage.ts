/**
 * Privacy Policy Page — /privacy-policy, Figma node 1114:50556 (file
 * foaJFuv0vRX8nD43o0ylgB). A dedicated singleType
 * (api::privacy-policy-page). Every field maps 1:1 to a node actually
 * drawn on the canvas, in the exact top-to-bottom order it appears —
 * hero, intro, the "This Privacy Policy Defines and Regulates:" table of
 * contents (12 entries, only the first 2 of which have body copy drawn
 * beneath them), then every clause heading/body/list that IS drawn.
 * Mirrors models/ourCompanyPage.ts's single-file Raw+Domain layout.
 */
import type { StrapiMedia, StrapiResponse, StrapiSeo } from './strapi';
import type { ImageModel, SeoModel } from './domain';

// ---------------------------------------------------------------------------
// Raw
// ---------------------------------------------------------------------------

export interface StrapiPrivacyPolicyTocItem {
  id: number;
  label: string;
  anchor: string;
}

export interface StrapiPrivacyPolicyListItem {
  id: number;
  text: string;
}

export interface StrapiPrivacyPolicyPage {
  heroEyebrow: string | null;
  heroHeading: string | null;
  heroSubheading: string | null;
  heroImage: StrapiMedia | null;
  introBody: string | null;
  tocHeading: string | null;
  tocItems: StrapiPrivacyPolicyTocItem[];
  qualifiesHeading: string | null;
  qualifiesBody: string | null;
  lawfulHeading: string | null;
  lawfulIntro: string | null;
  lawfulPurposesList: StrapiPrivacyPolicyListItem[];
  lawfulBasisIntro: string | null;
  lawfulBasisList: StrapiPrivacyPolicyListItem[];
  lawfulClosing: string | null;
  registrationHeading: string | null;
  registrationBody: string | null;
  panelHeading: string | null;
  panelIntro: string | null;
  panelDataSourcesList: StrapiPrivacyPolicyListItem[];
  panelClosing: string | null;
  legalHeading: string | null;
  legalBody: string | null;
  seo: StrapiSeo | null;
}

export type StrapiPrivacyPolicyPageResponse = StrapiResponse<StrapiPrivacyPolicyPage>;

// ---------------------------------------------------------------------------
// Domain
// ---------------------------------------------------------------------------

export interface PrivacyPolicyTocItemModel {
  id: string;
  label: string;
  anchor: string;
}

export interface PrivacyPolicyListItemModel {
  id: string;
  text: string;
}

export interface PrivacyPolicyPageSettings {
  heroEyebrow?: string;
  /** Raw multi-line string (Figma draws it as 2 literal lines) — split on
   * "\n" at render time, never re-wrapped or joined. */
  heroHeading?: string;
  heroSubheading?: string;
  heroImage?: ImageModel;
  /** "\n\n"-joined paragraphs, verbatim — split on "\n\n" at render time. */
  introBody?: string;
  tocHeading?: string;
  tocItems: PrivacyPolicyTocItemModel[];
  qualifiesHeading?: string;
  qualifiesBody?: string;
  lawfulHeading?: string;
  lawfulIntro?: string;
  lawfulPurposesList: PrivacyPolicyListItemModel[];
  lawfulBasisIntro?: string;
  lawfulBasisList: PrivacyPolicyListItemModel[];
  lawfulClosing?: string;
  registrationHeading?: string;
  registrationBody?: string;
  panelHeading?: string;
  panelIntro?: string;
  panelDataSourcesList: PrivacyPolicyListItemModel[];
  panelClosing?: string;
  legalHeading?: string;
  legalBody?: string;
  seo?: SeoModel;
}

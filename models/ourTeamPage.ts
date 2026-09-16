/**
 * Our Team Page — /our-team, Figma node 1126:54624 (file
 * foaJFuv0vRX8nD43o0ylgB). A dedicated singleType (api::our-team-page)
 * holding this page's own hero/section-heading/bottom-CTA chrome. The
 * member cards themselves live on api::team-member.team-member
 * (models/teamMember.ts). Mirrors models/caseStudyPage.ts's single-file
 * Raw+Domain layout.
 */
import type { StrapiMedia, StrapiResponse, StrapiLink, StrapiSeo } from './strapi';
import type { ImageModel, LinkModel, SeoModel } from './domain';

// ---------------------------------------------------------------------------
// Raw
// ---------------------------------------------------------------------------

export interface StrapiOurTeamPage {
  heroEyebrow: string | null;
  heroHeading: string | null;
  heroSubheading: string | null;
  heroImage: StrapiMedia | null;
  membersHeading: string | null;
  bottomCtaHeading: string | null;
  bottomCtaBody: string | null;
  bottomCtaAction: StrapiLink | null;
  seo: StrapiSeo | null;
}

export type StrapiOurTeamPageResponse = StrapiResponse<StrapiOurTeamPage>;

// ---------------------------------------------------------------------------
// Domain
// ---------------------------------------------------------------------------

export interface OurTeamPageSettings {
  heroEyebrow?: string;
  /** Raw multi-line string (Figma draws it as 2 literal lines) — split
   * on "\n" at render time, never re-wrapped or joined. */
  heroHeading?: string;
  heroSubheading?: string;
  heroImage?: ImageModel;
  membersHeading?: string;
  bottomCtaHeading?: string;
  /** Raw multi-line string (Figma draws an explicit line break) — split
   * on "\n" at render time. */
  bottomCtaBody?: string;
  bottomCtaAction?: LinkModel;
  seo?: SeoModel;
}

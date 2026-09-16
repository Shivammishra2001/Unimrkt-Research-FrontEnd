/**
 * /case-study — Figma node 1023:45614 ("Case Study", file
 * foaJFuv0vRX8nD43o0ylgB), "Case Study Explorer" grid (Component
 * 1055-1060). A dedicated collectionType (api::case-study.case-study),
 * one entry per card — exactly the 4 fields drawn on every card:
 * category badge, title, short description, cover photo. No slug/
 * detail-page field — see views/case-study/fallback.ts's header
 * comment for why.
 */
import type { StrapiMedia, StrapiResponse } from './strapi';
import type { ImageModel } from './domain';

// ---------------------------------------------------------------------------
// Raw
// ---------------------------------------------------------------------------

export interface StrapiCaseStudy {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  coverImage: StrapiMedia | null;
}

export type StrapiCaseStudyListResponse = StrapiResponse<StrapiCaseStudy[]>;

// ---------------------------------------------------------------------------
// Domain
// ---------------------------------------------------------------------------

export interface CaseStudySummary {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage?: ImageModel;
}

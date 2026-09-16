/**
 * Team Member — one card on /our-team (Figma node 1126:54624, file
 * foaJFuv0vRX8nD43o0ylgB). Only the fields the node actually draws on
 * every card — name, role, photo — mirrors models/gallery.ts's
 * Raw+Domain layout for a plain (no-slug) collection type.
 */
import type { StrapiMedia, StrapiResponse } from './strapi';
import type { ImageModel } from './domain';

// ---------------------------------------------------------------------------
// Raw
// ---------------------------------------------------------------------------

export interface StrapiTeamMember {
  id: number;
  documentId?: string;
  name: string;
  role: string;
  photo: StrapiMedia | null;
  order: number;
}

export type StrapiTeamMemberListResponse = StrapiResponse<StrapiTeamMember[]>;

// ---------------------------------------------------------------------------
// Domain
// ---------------------------------------------------------------------------

export interface TeamMemberModel {
  id: string;
  name: string;
  role: string;
  photo?: ImageModel;
  order: number;
}

/**
 * Team Member — one card on /our-team (Figma node 1126:54624) and its
 * "View Profile" modal (Figma node 1126:55196 -> the modal card is
 * 1126:56704, both file foaJFuv0vRX8nD43o0ylgB). Card fields: name,
 * role, photo. Modal field: `bio` — only the node's own worked example
 * (Anurag Magoo) has bio text drawn anywhere in the file, so every
 * other member's `bio` is undefined (see fallback.ts's header
 * comment). Mirrors models/gallery.ts's Raw+Domain layout for a plain
 * (no-slug) collection type.
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
  bio: string | null;
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
  bio?: string;
}

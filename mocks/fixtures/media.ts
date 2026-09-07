/**
 * Mock StrapiMedia objects. `url` points at a locally-bundled placeholder
 * SVG under /public/mock — served directly by Next.js, never prefixed with
 * the LAN Strapi host (see controllers/image.ts's USE_MOCKS branch). This
 * keeps mock mode fully offline: no external network call, no dependency
 * on a reachable backend or CDN.
 */
import type { StrapiMedia } from '@/models/strapi';

let nextMediaId = 9000;

export function mockImage(
  filename: string,
  width: number,
  height: number,
  alt: string | null = null
): StrapiMedia {
  nextMediaId += 1;
  return {
    id: nextMediaId,
    documentId: `mock-media-${nextMediaId}`,
    url: `/mock/${filename}`,
    alternativeText: alt,
    caption: null,
    width,
    height,
    mime: 'image/svg+xml',
    formats: null,
  };
}

// One instance per seeded asset filename (backend/scripts/seed.ts's
// IMAGE_FILENAMES map) — reused across every fixture that references it,
// exactly like the real seed script re-matches an upload by filename.
export const MOCK_IMAGES = {
  logoNav: mockImage('logo-nav.svg', 240, 64, 'Unimrkt Research logo'),
  heroPhoto: mockImage('hero-photo.svg', 1920, 1080, 'Researchers reviewing structured market data dashboards'),
  momentsLarge: mockImage('moments-large.svg', 790, 370, 'The Unimrkt Research team collaborating in the field'),
  momentsSmall: mockImage('moments-small.svg', 385, 370, 'A CATI workstation in active use'),
  servicesEarth: mockImage('services-earth.svg', 1600, 900, 'Global research coverage across continents'),
  industryHealthcare: mockImage('industry-healthcare.svg', 380, 399, 'Healthcare & Life Sciences industry'),
  industryBanking: mockImage('industry-banking.svg', 380, 399, 'Banking & Financial Services industry'),
  industryRetail: mockImage('industry-retail.svg', 380, 399, 'Retail & Consumer Goods industry'),
  industryAutomotive: mockImage('industry-automotive.svg', 380, 399, 'Automotive & Mobility industry'),
  industryCityscape: mockImage('industry-cityscape.svg', 1900, 700, 'City skyline representing every industry served'),
  faqWorldmap: mockImage('faq-worldmap-bg.svg', 1600, 900, 'World map background'),
  blogPhoto: mockImage('blog-photo.svg', 640, 480, 'Online market research illustration'),
  blogFieldResearch: mockImage('blog-field-research.svg', 640, 480, 'Field-based quantitative research illustration'),
  blogAiWorkforce: mockImage('blog-ai-workforce.svg', 640, 480, 'AI and the workforce illustration'),
} as const;

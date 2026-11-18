/**
 * /services listing page — Strapi entry Pages > Services (slug `services`), one `services-page.<key>` block per
 * section (backend/src/components/services-page/*). Raw shapes only; the domain shape is ServicesListingContent
 * (views/services/listing/content.ts), produced by controllers/servicesListingPage.ts.
 */
import type { StrapiLink, StrapiMedia, StrapiSeo } from './strapi';

export interface StrapiServicesCard {
  id?: number;
  title: string;
  body: string | null;
  icon: StrapiMedia | null;
}

export interface StrapiServicesStat {
  id?: number;
  value: string;
  label: string;
  icon: StrapiMedia | null;
}

/** Section key -> block shape, keyed by the part after `services-page.`. */
export interface StrapiServicesSections {
  hero: { eyebrow: string | null; heading: string | null; subheading: string | null; image: StrapiMedia | null; primaryCta: StrapiLink | null; secondaryCta: StrapiLink | null };
  intro: { eyebrow: string | null; heading: string | null; body: string | null; image: StrapiMedia | null };
  showcase: { eyebrow: string | null; heading: string | null; body: string | null; ctaLabel?: string | null };
  why: { heading: string | null; body: string | null; stats: StrapiServicesStat[] | null };
  process: { eyebrow: string | null; heading: string | null; body: string | null; steps: StrapiServicesCard[] | null };
  band: { heading: string | null; body: string | null; personImage: StrapiMedia | null; cta: StrapiLink | null };
  coverage: { eyebrow: string | null; heading: string | null; body: string | null; cards: StrapiServicesCard[] | null };
  industries: { eyebrow: string | null; heading: string | null; body: string | null };
  'case-band': {
    eyebrow: string | null;
    heading: string | null;
    body: string | null;
    cta: StrapiLink | null;
    projectsValue: string | null;
    projectsLabel: string | null;
    projectsCaption: string | null;
    clientsValue: string | null;
    clientsLabel: string | null;
    personImage: StrapiMedia | null;
    chartImage: StrapiMedia | null;
  };
  testimonials: { eyebrow: string | null; heading: string | null };
  faq: { cta: StrapiLink | null; heading: string | null; items: Array<{ id: number; question: string; answer: string }> | null };
  about: { eyebrow: string | null; heading: string | null; body: string | null };
  'final-cta': { heading: string | null; body: string | null; image: StrapiMedia | null; action: StrapiLink | null };
}

export interface StrapiServicesListingPage {
  seo: StrapiSeo | null;
  blocks: Array<{ __component: string }>;
}

export interface StrapiServicesListingPageResponse {
  data: StrapiServicesListingPage;
}

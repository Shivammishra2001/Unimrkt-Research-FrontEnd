/**
 * /services' hero/intro/value-props/workflow/FAQ/CTA copy — Strapi
 * migration of what used to be hardcoded JSX in ServiceListingView.tsx
 * and its child components. The grid itself stays sourced from the
 * `service` hierarchy (models/service.ts's ServiceTreeItemModel), not
 * this single type — there's nothing to duplicate there.
 *
 * Mirrors models/gallery.ts's single-file Raw+Domain layout. The nested
 * component fields below (hero/workflow/faq/cta) reuse existing
 * dynamic-zone component schemas as plain (non-dynamic-zone) fields, so
 * their raw shape is the same as StrapiHeroBlock/StrapiProcessStepsBlock/
 * etc. minus the `__component`/`theme`/`anchorId` discriminants a
 * dynamic-zone entry carries.
 */
import type { StrapiMedia, StrapiResponse, StrapiLink, StrapiFeatureItem, StrapiFaqItem } from './strapi';
import type { StrapiProcessStepItem } from './strapi';
import type { ImageModel, LinkModel, FeatureModel } from './domain';

// ---------------------------------------------------------------------------
// Raw
// ---------------------------------------------------------------------------

export interface StrapiServicesPageHero {
  eyebrow: string | null;
  heading: string;
  subheading: string | null;
  media: StrapiMedia | null;
  actions: StrapiLink[];
}

export interface StrapiServicesPageWorkflow {
  eyebrow: string | null;
  heading: string;
  subheading: string | null;
  steps: StrapiProcessStepItem[];
}

export interface StrapiServicesPageFaq {
  heading: string;
  background: StrapiMedia | null;
  items: StrapiFaqItem[];
}

export interface StrapiServicesPageCta {
  heading: string;
  body: string | null;
  actions: StrapiLink[];
  background: StrapiMedia | null;
}

export interface StrapiServicesPage {
  hero: StrapiServicesPageHero | null;
  introEyebrow: string | null;
  introHeading: string;
  introParagraph1: string | null;
  introParagraph2: string | null;
  valuePropsHeading: string | null;
  valuePropsBody: string | null;
  valuePropsBackground: StrapiMedia | null;
  valueProps: StrapiFeatureItem[];
  workflow: StrapiServicesPageWorkflow | null;
  faq: StrapiServicesPageFaq | null;
  cta: StrapiServicesPageCta | null;
}

export type StrapiServicesPageResponse = StrapiResponse<StrapiServicesPage>;

// ---------------------------------------------------------------------------
// Domain
// ---------------------------------------------------------------------------

export interface ServicesPageHero {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  media?: ImageModel;
  actions: LinkModel[];
}

export interface ServicesPageWorkflowStep {
  id: string;
  stepNumber?: string;
  title: string;
  description: string;
  icon?: ImageModel;
  iconIdentifier?: string;
  order: number;
}

export interface ServicesPageWorkflow {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  steps: ServicesPageWorkflowStep[];
}

export interface ServicesPageFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ServicesPageFaq {
  heading: string;
  background?: ImageModel;
  items: ServicesPageFaqItem[];
}

export interface ServicesPageCta {
  heading: string;
  body?: string;
  actions: LinkModel[];
  background?: ImageModel;
}

export interface ServicesPageSettings {
  hero?: ServicesPageHero;
  introEyebrow?: string;
  introHeading: string;
  introParagraph1?: string;
  introParagraph2?: string;
  valuePropsHeading?: string;
  valuePropsBody?: string;
  valuePropsBackground?: ImageModel;
  valueProps: FeatureModel[];
  workflow?: ServicesPageWorkflow;
  faq?: ServicesPageFaq;
  cta?: ServicesPageCta;
}

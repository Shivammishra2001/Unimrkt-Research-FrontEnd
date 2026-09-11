/**
 * Verbatim from backend/scripts/seed.ts's SERVICES array — same titles,
 * summaries, prices and features the real backend seeds. `thumbnail` is
 * null on every entry because seed.ts never sets one — matches the
 * "every currently-seeded service has no thumbnail" disclosure in
 * FRONTEND_SPEC.md §9. The Figma-node-384:6205-equivalent detail fields
 * (hero/trust/overview/credentials/etc.) are null/empty here — only the
 * real "Primary Research" entry carries that content — matching the
 * "sparse page renders via template fallback" behavior every other
 * detail page's mock already has.
 */
import type { StrapiFeatureItem } from '@/models/strapi';
import type {
  StrapiServiceDetail,
  StrapiServiceDetailResponse,
  StrapiServiceListResponse,
  StrapiServiceSlugsResponse,
  StrapiServiceTreeResponse,
} from '@/models/service';

const NOW = '2026-01-05T09:20:00.000Z';

let nextFeatureId = 1;
function feature(title: string, description: string): StrapiFeatureItem {
  nextFeatureId += 1;
  return {
    id: nextFeatureId,
    title,
    description,
    icon: null,
    link: null,
    iconIdentifier: null,
    statValue: null,
    statLabel: null,
    order: null,
  };
}

/** Every node-474:5731 detail field, null/empty — spread into a mock
 * entry so its shape always matches `StrapiServiceDetail` exactly. */
function emptyDetailFields() {
  return {
    heroEyebrow: null,
    heroHeading: null,
    heroSubheading: null,
    heroImage: null,
    heroActions: [],
    trustHeading: null,
    trustLogos: [],
    overviewEyebrow: null,
    overviewHeading: null,
    overviewBody: null,
    overviewImage: null,
    overviewFeatures: [],
    capabilitiesEyebrow: null,
    capabilitiesHeading: null,
    capabilitiesBody: null,
    credentialsHeading: null,
    credentialsBody: null,
    credentials: [],
    methodologiesEyebrow: null,
    methodologiesHeading: null,
    methodologies: [],
    industriesEyebrow: null,
    industriesHeading: null,
    industriesBody: null,
    industriesServed: [],
    enquiryEyebrow: null,
    enquiryHeading: null,
    enquiryBody: null,
    enquiryImage: null,
    faqItems: [],
    aboutEyebrow: null,
    aboutHeading: null,
    aboutBody: null,
  };
}

const webDevelopment: StrapiServiceDetail = {
  id: 1,
  documentId: 'mock-service-web-development',
  title: 'Professional Web Development Services',
  slug: 'web-development',
  summary: 'Scalable and custom web applications for your enterprise.',
  thumbnail: null,
  basePrice: '₹40,000',
  updatedAt: NOW,
  createdAt: NOW,
  publishedAt: NOW,
  seo: {
    id: 3,
    metaTitle: 'Web Development — UniMarket',
    metaDescription: 'Custom storefronts and marketing sites built on a decoupled Strapi + Next.js MVC engine.',
    shareImage: null,
    keywords: null,
    preventIndexing: false,
  },
  features: [
    feature('Server-rendered by default', 'Every route is a React Server Component — no client-side waterfall for first paint.'),
    feature('ISR out of the box', 'Published content revalidates on a webhook, not a redeploy.'),
    feature('Typed end to end', 'Strapi schema to normalized domain model to View props, no `any` at the boundary.'),
  ],
  ...emptyDetailFields(),
};

const uiUxDesign: StrapiServiceDetail = {
  id: 2,
  documentId: 'mock-service-ui-ux-design',
  title: 'UI/UX Design',
  slug: 'ui-ux-design',
  summary: 'Interface and interaction design for teams who need a design system, not just a mockup.',
  thumbnail: null,
  basePrice: 'From $1,800',
  updatedAt: NOW,
  createdAt: NOW,
  publishedAt: NOW,
  seo: {
    id: 4,
    metaTitle: 'UI/UX Design — UniMarket',
    metaDescription: 'Interface and interaction design built around a reusable design system, not one-off mockups.',
    shareImage: null,
    keywords: null,
    preventIndexing: false,
  },
  features: [
    feature('Design tokens first', 'Palette, type scale, spacing and radius defined once, consumed everywhere.'),
    feature('Component-driven', 'Every screen is composed from the same atoms your engineers will actually ship.'),
    feature('Accessible by default', 'Contrast, focus states and semantic markup are part of the deliverable, not a follow-up.'),
  ],
  ...emptyDetailFields(),
};

const cloudDevops: StrapiServiceDetail = {
  id: 3,
  documentId: 'mock-service-cloud-devops',
  title: 'Cloud & DevOps',
  slug: 'cloud-devops',
  summary: 'Infrastructure, CI/CD and on-call support for the Strapi + Next.js stack you already run.',
  thumbnail: null,
  basePrice: 'From $3,200/mo',
  updatedAt: NOW,
  createdAt: NOW,
  publishedAt: NOW,
  seo: {
    id: 5,
    metaTitle: 'Cloud & DevOps — UniMarket',
    metaDescription: 'Infrastructure, CI/CD and on-call support tuned for a Strapi + Next.js content engine.',
    shareImage: null,
    keywords: null,
    preventIndexing: false,
  },
  features: [
    feature('ISR-aware caching', 'CDN and revalidation tuned around your actual publish cadence, not a generic TTL.'),
    feature('Zero-downtime deploys', 'Backend schema changes roll out without taking the storefront offline.'),
    feature('24/7 on-call', 'A real person, not a ticket queue, for anything that pages you at 3am.'),
  ],
  ...emptyDetailFields(),
};

export const MOCK_SERVICES: Record<string, StrapiServiceDetail> = {
  'web-development': webDevelopment,
  'ui-ux-design': uiUxDesign,
  'cloud-devops': cloudDevops,
};

// Sorted title:asc — matches the real backend's default sort (service.ts's
// `find` override: `sort: ctx.query.sort ?? 'title:asc'`).
const SERVICE_LIST_ORDER = ['cloud-devops', 'ui-ux-design', 'web-development'];

export function mockServiceListResponse(params: {
  page?: number;
  pageSize?: number;
  sort?: string;
} = {}): StrapiServiceListResponse {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 24;
  const ordered = SERVICE_LIST_ORDER.map((slug) => MOCK_SERVICES[slug]);
  const start = (page - 1) * pageSize;
  const pageItems = ordered.slice(start, start + pageSize);

  return {
    data: pageItems.map(({ id, documentId, title, slug, summary, thumbnail, basePrice, updatedAt }) => ({
      id,
      documentId,
      title,
      slug,
      summary,
      thumbnail,
      basePrice,
      updatedAt,
    })),
    meta: {
      pagination: {
        page,
        pageSize,
        pageCount: Math.max(1, Math.ceil(ordered.length / pageSize)),
        total: ordered.length,
      },
    },
  };
}

export function mockServiceDetailResponse(slug: string): StrapiServiceDetailResponse | undefined {
  const service = MOCK_SERVICES[slug];
  return service ? { data: service, meta: {} } : undefined;
}

export const MOCK_SERVICE_SLUGS_RESPONSE: StrapiServiceSlugsResponse = {
  data: Object.values(MOCK_SERVICES).map((s) => ({ id: s.id, slug: s.slug, updatedAt: s.updatedAt })),
  meta: {},
};

// GET /services/tree (Google Sheet IA migration). A representative subset
// of the real seed.ts SERVICES_HIERARCHY, not a full mirror of all 8
// categories/~30 children — matches this file's existing convention of
// illustrative, not exhaustive, fixtures.
export const MOCK_SERVICE_TREE_RESPONSE: StrapiServiceTreeResponse = {
  data: [
    {
      id: 101,
      title: 'Primary Research',
      slug: 'primary-research',
      summary: 'Learn more about our Primary Research offering.',
      thumbnail: null,
      children: [
        { id: 1011, title: 'Telephonic Surveys', slug: 'telephonic-surveys', summary: 'Learn more about our Telephonic Surveys offering.' },
        { id: 1012, title: 'Online Surveys', slug: 'online-surveys', summary: 'Learn more about our Online Surveys offering.' },
      ],
    },
    {
      id: 102,
      title: 'Quantitative Research',
      slug: 'quantitative-research',
      summary: 'Learn more about our Quantitative Research offering.',
      thumbnail: null,
      children: [
        { id: 1021, title: 'Global Panel', slug: 'global-panel', summary: 'Learn more about our Global Panel offering.' },
      ],
    },
  ],
  meta: {},
};

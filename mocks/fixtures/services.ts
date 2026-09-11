/**
 * Verbatim from backend/scripts/seed.ts's SERVICES array — same titles,
 * summaries, prices, features and block copy the real backend seeds.
 * `thumbnail` is null on every entry because seed.ts never sets one (only
 * `blocks.hero`/`content`/`cta` media fields reference the uploaded
 * assets) — matches the "every currently-seeded service has no thumbnail"
 * disclosure in FRONTEND_SPEC.md §9.
 */
import type { StrapiBlock, StrapiFeatureItem, StrapiLink } from '@/models/strapi';
import type {
  StrapiServiceDetail,
  StrapiServiceDetailResponse,
  StrapiServiceListResponse,
  StrapiServiceSlugsResponse,
  StrapiServiceTreeResponse,
} from '@/models/service';

const NOW = '2026-01-05T09:20:00.000Z';

let nextLinkId = 200;
function link(label: string, href: string, isExternal: boolean, variant: StrapiLink['variant']): StrapiLink {
  nextLinkId += 1;
  return { id: nextLinkId, label, href, isExternal, variant };
}

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

let nextBlockId = 500;
function blockId(): number {
  nextBlockId += 1;
  return nextBlockId;
}

function serviceBlocks(opts: {
  heroEyebrow: string;
  heroHeading: string;
  heroSubheading: string;
  heroActionLabel: string;
  contentHeading: string;
  contentBody: string;
  ctaHeading: string;
  ctaBody: string;
  ctaActionLabel: string;
}): StrapiBlock[] {
  return [
    {
      __component: 'blocks.hero',
      id: blockId(),
      eyebrow: opts.heroEyebrow,
      heading: opts.heroHeading,
      subheading: opts.heroSubheading,
      media: null,
      mediaAlignment: 'right',
      actions: [link(opts.heroActionLabel, '/contact', false, 'primary')],
      sideMenu: [],
      headingSize: null,
      theme: 'light',
      anchorId: null,
    },
    {
      __component: 'blocks.content',
      id: blockId(),
      heading: opts.contentHeading,
      body: opts.contentBody,
      media: null,
      mediaAlignment: 'none',
      theme: 'light',
      anchorId: null,
    },
    {
      __component: 'blocks.cta',
      id: blockId(),
      heading: opts.ctaHeading,
      body: opts.ctaBody,
      actions: [link(opts.ctaActionLabel, '/contact', false, 'primary')],
      background: null,
      theme: 'accent',
      anchorId: null,
    },
  ];
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
  blocks: serviceBlocks({
    heroEyebrow: 'Service',
    heroHeading: 'Web development that ships without a deploy',
    heroSubheading: 'We build the engine; your team edits the content.',
    heroActionLabel: 'Get a quote',
    contentHeading: 'What you get',
    contentBody:
      'A production Next.js app wired to a Strapi content model your editors already understand — pages, navigation, and reusable sections, all typed from the database to the browser.',
    ctaHeading: 'Ready to start your build?',
    ctaBody: 'Most engagements start with a two-week content-model workshop.',
    ctaActionLabel: 'Book a call',
  }),
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
  blocks: serviceBlocks({
    heroEyebrow: 'Service',
    heroHeading: 'Design systems your engineers will actually use',
    heroSubheading: 'Every screen maps directly onto a real, typed component.',
    heroActionLabel: 'See our process',
    contentHeading: 'How we work',
    contentBody:
      'We design in the same token structure your codebase already uses, so nothing gets "translated" between Figma and production — it ships as-is.',
    ctaHeading: 'Want a design system audit?',
    ctaBody: 'We review your existing components before proposing anything new.',
    ctaActionLabel: 'Book a call',
  }),
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
  blocks: serviceBlocks({
    heroEyebrow: 'Service',
    heroHeading: 'Infrastructure that matches how you actually publish',
    heroSubheading: 'Caching, CI/CD and on-call, tuned for a CMS-driven storefront.',
    heroActionLabel: 'Talk to us',
    contentHeading: 'What we manage',
    contentBody:
      'Strapi hosting, the revalidation webhook, CDN cache rules, and the CI pipeline that builds and deploys both apps — so a schema change never means a 2am incident.',
    ctaHeading: 'Already running Strapi + Next.js?',
    ctaBody: 'We can take over ops without a migration.',
    ctaActionLabel: 'Book a call',
  }),
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
    data: pageItems.map(({ blocks: _blocks, seo: _seo, features: _features, createdAt: _createdAt, publishedAt: _publishedAt, ...summary }) => summary),
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

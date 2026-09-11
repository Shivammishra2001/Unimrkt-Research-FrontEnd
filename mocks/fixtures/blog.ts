/**
 * Mirrors mocks/fixtures/industries.ts's shape. Titles/excerpts/categories
 * are the same 10 posts seed.ts seeds into Strapi (Figma node 522:4719,
 * copied verbatim) — so NEXT_PUBLIC_USE_MOCKS=true renders identical
 * copy to a freshly-seeded backend. Cover images cycle through the 3
 * placeholder SVGs already bundled under /public/mock (no backend
 * involved in mock mode, so no need for the extra photos seed.ts uploads).
 */
import type { StrapiBlogCategory, StrapiBlogDetail, StrapiBlogDetailResponse, StrapiBlogListResponse, StrapiBlogSlugsResponse } from '@/models/blog';

const NOW = '2026-01-05T09:20:00.000Z';
const MOCK_IMAGES = ['/mock/blog-photo.svg', '/mock/blog-field-research.svg', '/mock/blog-ai-workforce.svg'];

function blogMedia(index: number): NonNullable<StrapiBlogDetail['coverImage']> {
  const url = MOCK_IMAGES[index % MOCK_IMAGES.length];
  return { id: 900 + index, url, alternativeText: null, caption: null, width: 1000, height: 700, mime: 'image/svg+xml', formats: null };
}

function blog(
  id: number,
  title: string,
  excerpt: string,
  category: StrapiBlogCategory,
  order: number,
  hasImage: boolean
): StrapiBlogDetail {
  const slug = title
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return {
    id,
    documentId: `mock-blog-${slug}`,
    title,
    slug,
    excerpt,
    category,
    coverImage: hasImage ? blogMedia(id) : null,
    order,
    body: [{ type: 'paragraph', children: [{ type: 'text', text: excerpt }] }],
    faqItems: [
      { id: id * 10 + 1, question: `What should I know about "${title}"?`, answer: excerpt },
    ],
    updatedAt: NOW,
    createdAt: NOW,
    publishedAt: NOW,
    seo: {
      id: id + 900,
      metaTitle: `${title} — Unimrkt Research Blog`,
      metaDescription: excerpt.slice(0, 160),
      shareImage: null,
      keywords: null,
      preventIndexing: false,
    },
  };
}

export const MOCK_BLOGS: Record<string, StrapiBlogDetail> = {
  'exploring-market-trends': blog(
    1,
    'Exploring Market Trends',
    'Discover Emerging Market Trends That Shape Smarter Business Decisions.',
    'Business Research',
    0,
    false
  ),
  'key-trends-shaping-the-future-of-the-automotive-industry': blog(
    2,
    'Key Trends Shaping the Future of the Automotive Industry',
    'The automotive industry is undergoing one of the most significant transformations in its history, driven by electrification, autonomous technology, and shifting consumer expectations.',
    'Primary Research',
    1,
    true
  ),
  'how-market-research-strengthens-scenario-planning-and-strategic-decision-making': blog(
    3,
    'How Market Research Strengthens Scenario Planning and Strategic Decision-Making',
    'Economic cycles, competitive pressure, regulatory shifts, and evolving customer expectations all place unpredictable demands on modern businesses.',
    'Qualitative Research',
    2,
    true
  ),
  'what-does-a-business-research-company-do-role-services-and-impact': blog(
    4,
    'What Does a Business Research Company Do? Role, Services, and Impact',
    'Whether it is a startup validating a new business model or an enterprise entering a new market, structured research plays a decisive role.',
    'Quantitative Research',
    3,
    true
  ),
  'how-the-selection-of-quantitative-research-method-shapes-the-quality-of-business-insights': blog(
    5,
    'How the Selection of Quantitative Research Method Shapes the Quality of Business Insights',
    'Most businesses today have access to more data than ever before, yet the quality of the insight depends entirely on the method used to gather it.',
    'Quantitative Research',
    4,
    true
  ),
  'the-anatomy-of-a-high-converting-survey-mapping-questions-to-the-buyer-s-journey': blog(
    6,
    "The Anatomy of a High-Converting Survey: Mapping Questions to the Buyer's Journey",
    'Survey-driven decision-making remains a foundational tool for understanding customer sentiment and predicting behavior.',
    'Qualitative Research',
    5,
    true
  ),
  'where-market-research-fits-across-the-entire-business-lifecycle': blog(
    7,
    'Where Market Research Fits Across the Entire Business Lifecycle',
    'Most businesses do not fail due to a lack of effort, but due to decisions made without the right information at the right time.',
    'Business Research',
    6,
    true
  ),
  'from-gut-health-to-functional-foods-why-fiber-is-the-next-big-trend-in-consumer-products': blog(
    8,
    'From Gut Health to Functional Foods: Why Fiber is the Next Big Trend in Consumer Products',
    'The global shift toward preventive health and wellness has placed gut health and functional nutrition at the center of consumer demand.',
    'Primary Research',
    7,
    true
  ),
  'qualitative-market-research-and-customer-journey-mapping-for-sales': blog(
    9,
    'Qualitative Market Research and Customer Journey Mapping for Sales',
    'Customer decision-making is not a linear affair; it moves across touchpoints, emotions, and moments of hesitation before a purchase is made.',
    'Research Support Functions',
    8,
    true
  ),
  'all-you-need-to-know-about-online-market-research': blog(
    10,
    'All You Need to Know About Online Market Research',
    'In a world where consumer behavior evolves faster than a trending topic, online market research has become the fastest way to keep pace.',
    'Business Research',
    9,
    true
  ),
};

const BLOG_LIST_ORDER = Object.keys(MOCK_BLOGS);

export function mockBlogListResponse(params: { page?: number; pageSize?: number } = {}): StrapiBlogListResponse {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 100;
  const ordered = BLOG_LIST_ORDER.map((slug) => MOCK_BLOGS[slug]);
  const start = (page - 1) * pageSize;
  const pageItems = ordered.slice(start, start + pageSize);

  return {
    data: pageItems.map(({ body: _body, faqItems: _faqItems, seo: _seo, createdAt: _createdAt, publishedAt: _publishedAt, ...summary }) => summary),
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

export function mockBlogDetailResponse(slug: string): StrapiBlogDetailResponse | undefined {
  const item = MOCK_BLOGS[slug];
  return item ? { data: item, meta: {} } : undefined;
}

export const MOCK_BLOG_SLUGS_RESPONSE: StrapiBlogSlugsResponse = {
  data: Object.values(MOCK_BLOGS).map((b) => ({ id: b.id, slug: b.slug, updatedAt: b.updatedAt })),
  meta: {},
};

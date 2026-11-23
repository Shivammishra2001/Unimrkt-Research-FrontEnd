/**
 * A representative subset of the real seed.ts INDUSTRIES_SEED (3 of 27) —
 * matches this mocks/ directory's existing convention (see services.ts) of
 * illustrative, not exhaustive, fixtures.
 */
import type { StrapiIndustryDetail, StrapiIndustryDetailResponse, StrapiIndustryListResponse, StrapiIndustrySlugsResponse } from '@/models/industry';

const NOW = '2026-01-05T09:20:00.000Z';

function industry(id: number, title: string, slug: string): StrapiIndustryDetail {
  return {
    id,
    documentId: `mock-industry-${slug}`,
    title,
    slug,
    summary: `Market research and insights for the ${title} sector.`,
    icon: null,
    legacyUrl: null,
    suggestedUrl: `https://www.unimrkt.com/industries/${slug}-market-research.php`,
    updatedAt: NOW,
    createdAt: NOW,
    publishedAt: NOW,
    // The page content is the `sections` dynamic zone — here each block is
    // present but empty (only the real seed carries content), matching the
    // API wire format: repeatables are always arrays, never omitted.
    sections: [
      { __component: 'industry-sections.hero', id: id * 100 + 1, eyebrow: null, heading: null, subheading: null, image: null, actions: [] },
      { __component: 'industry-sections.overview', id: id * 100 + 2, showSection: true, eyebrow: null, heading: null, body: null, cta: null, image: null, partnersHeading: null, partners: [] },
      { __component: 'industry-sections.why-research', id: id * 100 + 3, showSection: true, eyebrow: null, heading: null, cards: [] },
      { __component: 'industry-sections.expertise', id: id * 100 + 4, showSection: true, eyebrow: null, heading: null, items: [] },
      { __component: 'industry-sections.challenges', id: id * 100 + 5, showSection: true, eyebrow: null, heading: null, body: null, cards: [] },
      { __component: 'industry-sections.who-we-serve', id: id * 100 + 6, showSection: true, eyebrow: null, heading: null, cards: [] },
      { __component: 'industry-sections.methodologies', id: id * 100 + 7, showSection: true, eyebrow: null, heading: null, body: null, items: [] },
      { __component: 'industry-sections.empower', id: id * 100 + 8, showSection: true, eyebrow: null, heading: null, body: null, cta: null, image: null },
      { __component: 'industry-sections.enquiry', id: id * 100 + 9, showSection: true, eyebrow: null, heading: null, body: null, image: null },
      { __component: 'industry-sections.blogs-band', id: id * 100 + 10, showSection: true, eyebrow: null, heading: null, description: null },
      { __component: 'industry-sections.faq', id: id * 100 + 11, showSection: true, heading: null, cta: null, items: [] },
      { __component: 'industry-sections.case-studies', id: id * 100 + 12, showSection: true, eyebrow: null, heading: null, body: null, cta: null, items: [] },
      { __component: 'industry-sections.about', id: id * 100 + 13, showSection: true, eyebrow: null, heading: null, body: null },
      { __component: 'industry-sections.cta-banner', id: id * 100 + 14, showSection: true, heading: null, body: null, action: null },
      { __component: 'shared.seo', id: id + 900, metaTitle: `${title} Market Research — Unimrkt Research`, metaDescription: `Market research and insights for the ${title} sector.`, shareImage: null, keywords: null, preventIndexing: false },
    ],
  };
}

export const MOCK_INDUSTRIES: Record<string, StrapiIndustryDetail> = {
  automotives: industry(1, 'Automotives', 'automotives'),
  fintech: industry(2, 'Fintech', 'fintech'),
  'real-estate': industry(3, 'Real Estate', 'real-estate'),
};

const INDUSTRY_LIST_ORDER = ['automotives', 'fintech', 'real-estate'];

export function mockIndustryListResponse(params: { page?: number; pageSize?: number } = {}): StrapiIndustryListResponse {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 30;
  const ordered = INDUSTRY_LIST_ORDER.map((slug) => MOCK_INDUSTRIES[slug]);
  const start = (page - 1) * pageSize;
  const pageItems = ordered.slice(start, start + pageSize);

  return {
    data: pageItems.map(({ id, documentId, title, slug, summary, icon, updatedAt }) => ({
      id,
      documentId,
      title,
      slug,
      summary,
      icon,
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

export function mockIndustryDetailResponse(slug: string): StrapiIndustryDetailResponse | undefined {
  const item = MOCK_INDUSTRIES[slug];
  return item ? { data: item, meta: {} } : undefined;
}

export const MOCK_INDUSTRY_SLUGS_RESPONSE: StrapiIndustrySlugsResponse = {
  data: Object.values(MOCK_INDUSTRIES).map((i) => ({ id: i.id, slug: i.slug, updatedAt: i.updatedAt })),
  meta: {},
};

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
    seo: {
      id: id + 900,
      metaTitle: `${title} Market Research — Unimrkt Research`,
      metaDescription: `Market research and insights for the ${title} sector.`,
      shareImage: null,
      keywords: null,
      preventIndexing: false,
    },
    // The full node-384:6205 detail-page fields — null/empty here (only
    // "Automotives" carries real content in the actual seed), matching
    // the real API's wire format: every repeatable field is always an
    // array (possibly empty), never omitted or null.
    heroEyebrow: null,
    heroHeading: null,
    heroSubheading: null,
    heroImage: null,
    heroActions: [],
    trustHeading: null,
    trustLogos: [],
    whatWeDoEyebrow: null,
    whatWeDoHeading: null,
    whatWeDoBody: null,
    whatWeDoCta: null,
    whatWeDoImage: null,
    whyResearchEyebrow: null,
    whyResearchHeading: null,
    whyResearchCards: [],
    expertiseEyebrow: null,
    expertiseHeading: null,
    expertiseItems: [],
    challengesEyebrow: null,
    challengesHeading: null,
    challengesBody: null,
    challengesCards: [],
    whoWeServeEyebrow: null,
    whoWeServeHeading: null,
    whoWeServeCards: [],
    methodologiesEyebrow: null,
    methodologiesHeading: null,
    methodologiesBody: null,
    methodologies: [],
    empowerEyebrow: null,
    empowerHeading: null,
    empowerBody: null,
    empowerCta: null,
    empowerImage: null,
    enquiryEyebrow: null,
    enquiryHeading: null,
    enquiryBody: null,
    enquiryImage: null,
    faqItems: [],
    caseStudiesEyebrow: null,
    caseStudiesHeading: null,
    caseStudiesBody: null,
    caseStudiesCta: null,
    caseStudies: [],
    aboutEyebrow: null,
    aboutHeading: null,
    aboutBody: null,
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

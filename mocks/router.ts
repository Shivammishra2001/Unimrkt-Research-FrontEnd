/**
 * Resolves a (endpoint, query) pair — the same shape controllers/strapi.ts
 * builds for a live request — against the local fixtures, replicating the
 * real backend controllers' validation/404 behavior closely enough that
 * every caller's error-handling branch (fetchPageBySegments()'s
 * 404-to-null, etc., landing in Phase F4) behaves identically in both
 * modes. This is the only file besides controllers/strapi.ts that
 * understands Strapi endpoint URL shapes.
 */
import { StrapiError } from '@/controllers/errors';
import { MOCK_GLOBAL } from './fixtures/global';
import { mockPageResponse, MOCK_PAGE_SLUGS_RESPONSE } from './fixtures/pages';
import {
  MOCK_SERVICES,
  MOCK_SERVICE_SLUGS_RESPONSE,
  MOCK_SERVICE_TREE_RESPONSE,
  mockServiceDetailResponse,
  mockServiceListResponse,
} from './fixtures/services';
import {
  MOCK_INDUSTRY_SLUGS_RESPONSE,
  mockIndustryDetailResponse,
  mockIndustryListResponse,
} from './fixtures/industries';
import { MOCK_GALLERY_ITEMS_RESPONSE } from './fixtures/gallery';
import { MOCK_SERVICES_PAGE_RESPONSE } from './fixtures/servicesPage';
import { MOCK_BLOG_SLUGS_RESPONSE, mockBlogDetailResponse, mockBlogListResponse } from './fixtures/blog';
import { MOCK_CATEGORIES_RESPONSE } from './fixtures/category';

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

export function resolveMock<T>(endpoint: string, query: Record<string, unknown>): T {
  if (endpoint === 'pages/slugs') {
    return MOCK_PAGE_SLUGS_RESPONSE as unknown as T;
  }

  const pageSlugMatch = endpoint.match(/^pages\/slug\/(.+)$/);
  if (pageSlugMatch) {
    const slug = decodeURIComponent(pageSlugMatch[1]);
    const res = mockPageResponse(slug);
    if (!res) throw new StrapiError('Page not found', 404, endpoint);
    return res as unknown as T;
  }

  if (endpoint === 'global') {
    return MOCK_GLOBAL as unknown as T;
  }

  if (endpoint === 'services/slugs') {
    return MOCK_SERVICE_SLUGS_RESPONSE as unknown as T;
  }

  const serviceSlugMatch = endpoint.match(/^services\/slug\/(.+)$/);
  if (serviceSlugMatch) {
    const slug = decodeURIComponent(serviceSlugMatch[1]);
    const res = mockServiceDetailResponse(slug);
    if (!res) throw new StrapiError('Service not found', 404, endpoint);
    return res as unknown as T;
  }

  if (endpoint === 'services') {
    const pagination = query.pagination as { page?: number; pageSize?: number } | undefined;
    const sort = asString(query.sort);
    return mockServiceListResponse({ page: pagination?.page, pageSize: pagination?.pageSize, sort }) as unknown as T;
  }

  if (endpoint === 'services/tree') {
    return MOCK_SERVICE_TREE_RESPONSE as unknown as T;
  }

  if (endpoint === 'industries/slugs') {
    return MOCK_INDUSTRY_SLUGS_RESPONSE as unknown as T;
  }

  const industrySlugMatch = endpoint.match(/^industries\/slug\/(.+)$/);
  if (industrySlugMatch) {
    const slug = decodeURIComponent(industrySlugMatch[1]);
    const res = mockIndustryDetailResponse(slug);
    if (!res) throw new StrapiError('Industry not found', 404, endpoint);
    return res as unknown as T;
  }

  if (endpoint === 'industries') {
    const pagination = query.pagination as { page?: number; pageSize?: number } | undefined;
    return mockIndustryListResponse({ page: pagination?.page, pageSize: pagination?.pageSize }) as unknown as T;
  }

  if (endpoint === 'gallery-items') {
    return MOCK_GALLERY_ITEMS_RESPONSE as unknown as T;
  }

  if (endpoint === 'services-page') {
    return MOCK_SERVICES_PAGE_RESPONSE as unknown as T;
  }

  if (endpoint === 'blogs/slugs') {
    return MOCK_BLOG_SLUGS_RESPONSE as unknown as T;
  }

  const blogSlugMatch = endpoint.match(/^blogs\/slug\/(.+)$/);
  if (blogSlugMatch) {
    const slug = decodeURIComponent(blogSlugMatch[1]);
    const res = mockBlogDetailResponse(slug);
    if (!res) throw new StrapiError('Blog post not found', 404, endpoint);
    return res as unknown as T;
  }

  if (endpoint === 'blogs') {
    const pagination = query.pagination as { page?: number; pageSize?: number } | undefined;
    return mockBlogListResponse({ page: pagination?.page, pageSize: pagination?.pageSize }) as unknown as T;
  }

  if (endpoint === 'categories') {
    return MOCK_CATEGORIES_RESPONSE as unknown as T;
  }

  throw new StrapiError(`No mock fixture registered for endpoint "${endpoint}"`, 501, endpoint);
}

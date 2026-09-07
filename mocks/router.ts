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
import type {
  StrapiCityServiceCombinationsResponse,
  StrapiServiceByLocationResponse,
} from '@/models/location-service';
import { MOCK_GLOBAL } from './fixtures/global';
import { mockPageResponse, MOCK_PAGE_SLUGS_RESPONSE } from './fixtures/pages';
import {
  MOCK_SERVICES,
  MOCK_SERVICE_SLUGS_RESPONSE,
  mockServiceDetailResponse,
  mockServiceListResponse,
} from './fixtures/services';
import { MOCK_CITIES, findMockCity } from './fixtures/cities';
import { findMockOverride } from './fixtures/overrides';

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

  if (endpoint === 'services-by-location/combinations') {
    // Full cross-product of every city with every service — an override
    // is optional, not what makes a pair "exist" (matches the real
    // findCombinations() handler's own comment).
    const data = MOCK_CITIES.flatMap((city) =>
      Object.values(MOCK_SERVICES).map((service) => ({ citySlug: city.slug, serviceSlug: service.slug }))
    );
    const response: StrapiCityServiceCombinationsResponse = { data, meta: {} };
    return response as unknown as T;
  }

  if (endpoint === 'services-by-location') {
    const citySlug = asString(query.city);
    const serviceSlug = asString(query.service);
    if (!citySlug) throw new StrapiError('Missing "city" query param', 400, endpoint);
    if (!serviceSlug) throw new StrapiError('Missing "service" query param', 400, endpoint);

    const city = findMockCity(citySlug);
    if (!city) throw new StrapiError(`City "${citySlug}" not found`, 404, endpoint);

    const service = MOCK_SERVICES[serviceSlug];
    if (!service) throw new StrapiError(`Service "${serviceSlug}" not found`, 404, endpoint);

    const override = findMockOverride(citySlug, serviceSlug) ?? null;
    const response: StrapiServiceByLocationResponse = { data: { city, service, override }, meta: {} };
    return response as unknown as T;
  }

  throw new StrapiError(`No mock fixture registered for endpoint "${endpoint}"`, 501, endpoint);
}

/**
 * The ONLY entry point into Strapi (mock or live). Every other frontend
 * file — every route, every other controller, every View — is forbidden
 * from calling `fetch()` against the CMS directly. Per FRONTEND_SPEC.md
 * §4.1, adapted for this project's two explicit mandates:
 *
 *  1. IP-aware base URL: NEXT_PUBLIC_STRAPI_API_URL (falls back to
 *     http://localhost:1337/api) rather than the upstream blueprint's
 *     throw-if-unset, server-only STRAPI_URL — this Strapi instance is a
 *     bare LAN address, not a hidden internal one.
 *  2. Dual-mode mocking: NEXT_PUBLIC_USE_MOCKS=true short-circuits every
 *     call to mocks/index.ts before any network code runs.
 */
import 'server-only';
import qs from 'qs';
import { draftMode } from 'next/headers';
import { StrapiError, isBackendUnreachable } from './errors';
import { getMockResponse } from '@/mocks';
import type { StrapiGlobalResponse, StrapiPageResponse, StrapiPageSlugsResponse } from '@/models/strapi';
import type {
  StrapiServiceDetailResponse,
  StrapiServiceListResponse,
  StrapiServiceSlugsResponse,
  StrapiServiceTreeResponse,
} from '@/models/service';
import type {
  StrapiIndustryDetailResponse,
  StrapiIndustryListResponse,
  StrapiIndustrySlugsResponse,
} from '@/models/industry';
import type { StrapiGalleryItemListResponse } from '@/models/gallery';
import type { StrapiServicesPageResponse } from '@/models/servicesPage';
import type { StrapiBlogDetailResponse, StrapiBlogListResponse, StrapiBlogSlugsResponse } from '@/models/blog';
import type { StrapiCategoryListResponse } from '@/models/category';
import type { StrapiOurCompanyPageResponse } from '@/models/ourCompanyPage';
import type { StrapiContactPageResponse } from '@/models/contactPage';
import type { StrapiWorkWithUsPageResponse } from '@/models/workWithUsPage';
import type { StrapiCaseStudyListResponse, StrapiCaseStudyDetailResponse, StrapiCaseStudySlugsResponse } from '@/models/caseStudy';
import type { StrapiCaseStudyPageResponse } from '@/models/caseStudyPage';
import type { StrapiPrivacyPolicyPageResponse } from '@/models/privacyPolicyPage';
export { StrapiError, isBackendUnreachable };

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';
const API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';
const READ_TOKEN = process.env.STRAPI_API_TOKEN;
const PREVIEW_TOKEN = process.env.STRAPI_PREVIEW_TOKEN;
const REVALIDATE = Number(process.env.REVALIDATE_SECONDS ?? 3600);
// Not part of the upstream blueprint — added per mandate #1's call to
// "handl[e] network drops/unreachable LAN hosts": a bare LAN IP can hang
// on an unplugged cable or a wrong subnet far longer than a normal 5xx
// takes to come back, so every live request gets a hard ceiling.
const FETCH_TIMEOUT_MS = Number(process.env.STRAPI_FETCH_TIMEOUT_MS ?? 8000);

export interface FetchOptions {
  query?: Record<string, unknown>;
  tag?: string;
  tags?: string[];
  revalidate?: number;
  retries?: number;
}

function getIsDraft(): boolean {
  try {
    return draftMode().isEnabled;
  } catch {
    // draftMode() throws outside a request scope (e.g. generateStaticParams()
    // at build time) — treated as "not in draft": build-time static param
    // generation only ever wants published slugs.
    return false;
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      throw new StrapiError(
        `Request to Strapi timed out after ${timeoutMs}ms — is the LAN host at ${API_BASE_URL} reachable?`,
        504,
        url
      );
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Low-level fetch wrapper. In mock mode, resolves against
 * mocks/index.ts and never touches the network. In live mode: qs-encoded
 * bracket-array query string, draft-aware auth/caching, retry with
 * exponential backoff on 5xx/network errors (never on 4xx — those are
 * deterministic), and a hard request timeout for an unreachable LAN host.
 */
export async function strapiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const isDraft = getIsDraft();
  const mergedQuery = { ...options.query, ...(isDraft ? { status: 'draft' } : {}) };

  if (USE_MOCKS) {
    return getMockResponse<T>(endpoint, mergedQuery);
  }

  const search = qs.stringify(mergedQuery, { encodeValuesOnly: true, arrayFormat: 'brackets' });
  const url = `${API_BASE_URL}/${endpoint}${search ? `?${search}` : ''}`;

  const token = isDraft ? PREVIEW_TOKEN : READ_TOKEN;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const allTags = [...(options.tag ? [options.tag] : []), ...(options.tags ?? [])];
  const cacheInit: RequestInit = isDraft
    ? { cache: 'no-store' }
    : { next: { revalidate: options.revalidate ?? REVALIDATE, ...(allTags.length ? { tags: allTags } : {}) } };

  const retries = options.retries ?? 2;
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const res = await fetchWithTimeout(url, { headers, ...cacheInit }, FETCH_TIMEOUT_MS);

      if (res.status === 404) {
        // Always thrown immediately, never retried.
        throw new StrapiError('Not found', 404, endpoint);
      }
      if (!res.ok) {
        const body = await res.json().catch(() => undefined);
        if (res.status < 500) {
          // Client errors are deterministic — never retried.
          throw new StrapiError(`Strapi request failed: ${res.status}`, res.status, endpoint, body);
        }
        throw new StrapiError(`Strapi request failed: ${res.status}`, res.status, endpoint, body);
      }

      return (await res.json()) as T;
    } catch (err) {
      lastError = err;

      if (err instanceof StrapiError && err.status < 500) {
        throw err;
      }
      if (attempt < retries) {
        await sleep(2 ** attempt * 250);
        continue;
      }
    }
  }

  // Always throw a StrapiError here, never the raw underlying error. A
  // fully-unreachable host (ECONNREFUSED, DNS failure, etc.) makes
  // `fetch()` itself reject with a plain `TypeError` — that IS an
  // `Error`, so the old `if (lastError instanceof Error) throw lastError`
  // check let it slip through unwrapped. Every caller up the stack
  // (layout.tsx's Global-fetch fallback, fetchPageBySegments()'s 404
  // guard, getServiceBySlug(), getMergedCityService(), ...) narrows on
  // `err instanceof StrapiError` to decide whether a failure is
  // recoverable; a raw TypeError failed that check and always rethrew,
  // which is exactly what turned a down/unreachable Strapi into an
  // unhandled 500 instead of the graceful degradation those callers are
  // already written to perform. Wrapping it here, once, fixes every one
  // of those call sites without touching them.
  const reason = lastError instanceof Error ? lastError.message : String(lastError);
  throw new StrapiError(`Strapi unreachable at ${endpoint}: ${reason}`, 503, endpoint, lastError);
}

// ---------------------------------------------------------------------------
// Exported content-type fetchers — the full surface of what this app reads
// from Strapi. Per FRONTEND_SPEC.md §4.1 / API_SPECIFICATION.md §2.
// ---------------------------------------------------------------------------

export function getPageBySlug(slug: string): Promise<StrapiPageResponse> {
  return strapiFetch<StrapiPageResponse>(`pages/slug/${encodeURIComponent(slug)}`, {
    tag: `page-${slug}`,
  });
}

export function getPageSlugs(): Promise<StrapiPageSlugsResponse> {
  return strapiFetch<StrapiPageSlugsResponse>('pages/slugs', { tag: 'pages' });
}

export function getGlobal(): Promise<StrapiGlobalResponse> {
  // No populate query sent — the backend forces its own server-side
  // populate and overwrites any caller-supplied one.
  return strapiFetch<StrapiGlobalResponse>('global', { tag: 'global' });
}

export function getServices(params: { page?: number; pageSize?: number; sort?: string } = {}): Promise<StrapiServiceListResponse> {
  return strapiFetch<StrapiServiceListResponse>('services', {
    query: {
      pagination: { page: params.page ?? 1, pageSize: params.pageSize ?? 24 },
      ...(params.sort ? { sort: params.sort } : {}),
    },
    tag: 'services',
  });
}

export function getServiceBySlug(slug: string): Promise<StrapiServiceDetailResponse> {
  return strapiFetch<StrapiServiceDetailResponse>(`services/slug/${encodeURIComponent(slug)}`, {
    tag: `service-${slug}`,
  });
}

export function getServiceSlugs(): Promise<StrapiServiceSlugsResponse> {
  return strapiFetch<StrapiServiceSlugsResponse>('services/slugs', { tag: 'services' });
}

/** GET /services/tree — top-level categories with one level of children,
 * for the Services nav dropdown and /services listing (Google Sheet IA
 * migration). Backend forces its own populate; no query sent. */
export function getServiceTree(): Promise<StrapiServiceTreeResponse> {
  return strapiFetch<StrapiServiceTreeResponse>('services/tree', { tag: 'services' });
}

export function getIndustries(params: { page?: number; pageSize?: number; sort?: string } = {}): Promise<StrapiIndustryListResponse> {
  return strapiFetch<StrapiIndustryListResponse>('industries', {
    query: {
      pagination: { page: params.page ?? 1, pageSize: params.pageSize ?? 30 },
      ...(params.sort ? { sort: params.sort } : {}),
    },
    tag: 'industries',
  });
}

export function getIndustryBySlug(slug: string): Promise<StrapiIndustryDetailResponse> {
  return strapiFetch<StrapiIndustryDetailResponse>(`industries/slug/${encodeURIComponent(slug)}`, {
    tag: `industry-${slug}`,
  });
}

export function getIndustrySlugs(): Promise<StrapiIndustrySlugsResponse> {
  return strapiFetch<StrapiIndustrySlugsResponse>('industries/slugs', { tag: 'industries' });
}

/** GET /gallery-items — backend forces its own image populate + default
 * order:asc,createdAt:desc sort; no query sent for either. pageSize 100
 * is a generous ceiling well past the 9-item seed, not a real pagination
 * UI (the /gallery page renders its own client-side Load More instead). */
export function getGalleryItems(): Promise<StrapiGalleryItemListResponse> {
  return strapiFetch<StrapiGalleryItemListResponse>('gallery-items', {
    query: { pagination: { pageSize: 100 } },
    tag: 'gallery-items',
  });
}

/** GET /services-page — singleType, backend forces its own deep populate;
 * no query sent (same convention as getGlobal()). */
export function getServicesPageSettings(): Promise<StrapiServicesPageResponse> {
  return strapiFetch<StrapiServicesPageResponse>('services-page', { tag: 'services-page' });
}

/** GET /blogs?populate=* — unlike getServices/getIndustries, `blog`'s `find`
 * controller does NOT force its own populate, so `populate: '*'` is sent
 * explicitly here rather than left for the backend to fill in. pageSize
 * 100 is a generous ceiling past the ~10-post seed (same convention as
 * getGalleryItems()) — /blogs filters/paginates the whole set client-side
 * rather than round-tripping a page param. */
export function getBlogs(params: { page?: number; pageSize?: number; sort?: string } = {}): Promise<StrapiBlogListResponse> {
  return strapiFetch<StrapiBlogListResponse>('blogs', {
    query: {
      populate: '*',
      pagination: { page: params.page ?? 1, pageSize: params.pageSize ?? 100 },
      ...(params.sort ? { sort: params.sort } : {}),
    },
    tag: 'blogs',
  });
}

export function getBlogBySlug(slug: string): Promise<StrapiBlogDetailResponse> {
  return strapiFetch<StrapiBlogDetailResponse>(`blogs/slug/${encodeURIComponent(slug)}`, {
    tag: `blog-${slug}`,
  });
}

export function getBlogSlugs(): Promise<StrapiBlogSlugsResponse> {
  return strapiFetch<StrapiBlogSlugsResponse>('blogs/slugs', { tag: 'blogs' });
}

/** GET /categories — backend forces a default `name:asc` sort; pageSize
 * 100 is a generous ceiling past the 5-category seed (same convention as
 * getGalleryItems()/getBlogs()). Powers the /blogs filter tabs — a new
 * category created in the Admin panel appears here with no code change. */
export function getCategories(): Promise<StrapiCategoryListResponse> {
  return strapiFetch<StrapiCategoryListResponse>('categories', {
    query: { pagination: { pageSize: 100 } },
    tag: 'categories',
  });
}

/** GET /our-company-page — singleType, backend forces its own deep
 * populate; no query sent (same convention as getServicesPageSettings()/
 * getGlobal()). */
export function getOurCompanyPageSettings(): Promise<StrapiOurCompanyPageResponse> {
  return strapiFetch<StrapiOurCompanyPageResponse>('our-company-page', { tag: 'our-company-page' });
}

/** GET /contact-page — singleType, backend forces its own deep populate;
 * no query sent (same convention as getOurCompanyPageSettings()). */
export function getContactPageSettings(): Promise<StrapiContactPageResponse> {
  return strapiFetch<StrapiContactPageResponse>('contact-page', { tag: 'contact-page' });
}

/** GET /work-with-us-page — singleType, backend forces its own deep
 * populate; no query sent (same convention as getContactPageSettings()). */
export function getWorkWithUsPageSettings(): Promise<StrapiWorkWithUsPageResponse> {
  return strapiFetch<StrapiWorkWithUsPageResponse>('work-with-us-page', { tag: 'work-with-us-page' });
}

/** GET /case-studies?populate=* — collectionType, `case-study`'s bare
 * factory `find` controller does NOT force its own populate (same as
 * `blog`'s), so `populate: '*'` is sent explicitly. pageSize 100 is a
 * generous ceiling past the 6-card seed (same convention as
 * getGalleryItems()/getBlogs()) — /case-study filters/paginates the
 * whole set client-side rather than round-tripping a page param. */
export function getCaseStudies(): Promise<StrapiCaseStudyListResponse> {
  return strapiFetch<StrapiCaseStudyListResponse>('case-studies', {
    query: { populate: '*', pagination: { pageSize: 100 } },
    tag: 'case-studies',
  });
}

/** GET /case-studies/slug/:slug — deep-populated (the backend's own
 * `find`/`findBySlug` both force buildCaseStudyPopulate(), so no
 * populate query is sent here — same convention as
 * getIndustryBySlug()/getBlogBySlug()). Backs /case-study/[slug]. */
export function getCaseStudyBySlug(slug: string): Promise<StrapiCaseStudyDetailResponse> {
  return strapiFetch<StrapiCaseStudyDetailResponse>(`case-studies/slug/${encodeURIComponent(slug)}`, {
    tag: `case-study-${slug}`,
  });
}

export function getCaseStudySlugs(): Promise<StrapiCaseStudySlugsResponse> {
  return strapiFetch<StrapiCaseStudySlugsResponse>('case-studies/slugs', { tag: 'case-studies' });
}

/** GET /case-study-page — singleType, backend forces its own deep
 * populate; no query sent (same convention as getContactPageSettings()/
 * getWorkWithUsPageSettings()). Holds the template-level copy shared by
 * every case study — including the detail page's "Trusted by Global
 * Businesses" heading — so it's editable in the CMS instead of
 * hardcoded in the frontend template. */
export function getCaseStudyPageSettings(): Promise<StrapiCaseStudyPageResponse> {
  return strapiFetch<StrapiCaseStudyPageResponse>('case-study-page', { tag: 'case-study-page' });
}

/** GET /privacy-policy-page — singleType, backend forces its own deep
 * populate; no query sent (same convention as getCaseStudyPageSettings()). */
export function getPrivacyPolicyPageSettings(): Promise<StrapiPrivacyPolicyPageResponse> {
  return strapiFetch<StrapiPrivacyPolicyPageResponse>('privacy-policy-page', { tag: 'privacy-policy-page' });
}


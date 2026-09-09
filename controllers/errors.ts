/**
 * Split out from controllers/strapi.ts so mocks/router.ts can throw the
 * same error type as the live fetch path without an import cycle
 * (controllers/strapi.ts -> mocks/index.ts -> mocks/router.ts -> back to
 * controllers/strapi.ts). Re-exported from controllers/strapi.ts so every
 * other caller keeps importing it from one place.
 */
export class StrapiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly endpoint: string,
    readonly body?: unknown
  ) {
    super(message);
    this.name = 'StrapiError';
  }
}

/**
 * True for a StrapiError produced by strapiFetch()'s retry-exhaustion path
 * (a fully unreachable host — connection refused, DNS failure, timeout —
 * or a genuine 5xx from Strapi itself), as opposed to a 404 (handled
 * separately by every controller as "not found, not an error") or a 4xx
 * (a real client-side bug). Route components use this to distinguish "the
 * CMS is down, show a friendly offline state" from "this page doesn't
 * exist" or "something is actually broken."
 */
export function isBackendUnreachable(err: unknown): err is StrapiError {
  return err instanceof StrapiError && err.status >= 500;
}

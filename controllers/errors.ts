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

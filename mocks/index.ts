/**
 * Public entry point into the mocking engine — the only file
 * controllers/strapi.ts is allowed to import from `mocks/*`.
 */
import { resolveMock } from './router';

/**
 * Mirrors strapiFetch()'s signature closely enough to be a drop-in
 * substitute: same return shape (`T`, typically a `StrapiResponse<...>`),
 * same thrown `StrapiError` on a simulated 4xx. `status: 'draft'` is
 * accepted in `query` (so callers don't need mode-specific branching) but
 * ignored — fixtures don't model a separate draft/published pair, they are
 * always "the published version."
 */
export function getMockResponse<T>(endpoint: string, query: Record<string, unknown> = {}): T {
  return resolveMock<T>(endpoint, query);
}

/**
 * The override-wins-else-master merge engine for /services/[city]/[service].
 * Per FRONTEND_SPEC.md §4.6.
 */
import { cache } from 'react';
import { getCityServiceCombinations, getServiceByLocation, StrapiError } from './strapi';
import { normalizeCity, normalizeOverride, normalizeServiceDetail } from './normalize';
import type { CityServiceCombination, MergedCityService } from '@/models/location-service';

/** Deep-replaces every `{city}` token in string fields with the current
 * city's name; recurses through arrays and plain objects. Non-string
 * primitives pass through untouched. Works on both a bare string and a
 * whole BlockModel[]. */
export function interpolateCity<T>(value: T, cityName: string): T {
  if (typeof value === 'string') {
    return value.replace(/\{city\}/g, cityName) as unknown as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => interpolateCity(item, cityName)) as unknown as T;
  }
  if (value !== null && typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      result[key] = interpolateCity(val, cityName);
    }
    return result as T;
  }
  return value;
}

/**
 * react `cache()`-wrapped. On a StrapiError 404 (unknown city or service
 * slug), returns `null`; rethrows everything else. Every merged field
 * follows "override wins when present and non-empty, else master's
 * value", and whichever text wins gets run through interpolateCity().
 */
export const getMergedCityService = cache(
  async (citySlug: string, serviceSlug: string): Promise<MergedCityService | null> => {
    let raw;
    try {
      raw = await getServiceByLocation(citySlug, serviceSlug);
    } catch (err) {
      if (err instanceof StrapiError && err.status === 404) return null;
      throw err;
    }

    const { city: rawCity, service: rawService, override: rawOverride } = raw.data;
    const city = normalizeCity(rawCity);
    const master = normalizeServiceDetail({ data: rawService, meta: {} });
    const override = rawOverride ? normalizeOverride(rawOverride) : null;

    const overrideBlocks = override && override.blocks.length > 0 ? override.blocks : null;
    const blocks = overrideBlocks ?? master.blocks;

    return {
      city,
      slug: serviceSlug,
      title: interpolateCity(override?.title || master.title, city.name),
      summary: interpolateCity(override?.summary || master.summary, city.name),
      thumbnail: master.thumbnail, // never overridden
      price: override?.price || master.basePrice,
      features: master.features, // never overridden
      blocks: interpolateCity(blocks, city.name),
      seo: override?.seo ?? master.seo,
      localPhone: override?.localPhone, // master has no equivalent field
      localAddress: override?.localAddress, // master has no equivalent field
      // Exposed only for an editorial "custom content" badge, never a
      // rendering branch beyond that.
      isOverridden: !!override,
    };
  }
);

export async function getAllCityServiceCombinations(): Promise<CityServiceCombination[]> {
  const res = await getCityServiceCombinations();
  return res.data.map((pair) => ({ citySlug: pair.citySlug, serviceSlug: pair.serviceSlug }));
}

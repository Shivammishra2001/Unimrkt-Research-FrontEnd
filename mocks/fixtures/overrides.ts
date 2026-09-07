/**
 * Verbatim from backend/scripts/seed.ts's CITY_SERVICE_OVERRIDES array.
 * Only `web-development` is overridden, and only for 3 of the 5 cities —
 * `noida` and `jaipur` deliberately get no override row for any service,
 * proving a (city, service) pair with no override renders 100% from the
 * master `service` entry (seed.ts's own comment).
 */
import type { StrapiCityServiceOverride } from '@/models/location-service';

interface OverrideFixture {
  citySlug: string;
  serviceSlug: string;
  override: StrapiCityServiceOverride;
}

const OVERRIDE_FIXTURES: OverrideFixture[] = [
  {
    citySlug: 'rewari',
    serviceSlug: 'web-development',
    override: {
      id: 1,
      documentId: 'mock-override-rewari-web-development',
      overrideTitle: 'Web Development Services in Rewari',
      // Explicitly null (not omitted) — proves the master/override merge
      // falls back per-field, not per-row.
      overrideSummary: null,
      customPrice: '₹45,000',
      overrideBlocks: [],
      localPhone: null,
      localAddress: 'Model Town, Rewari, Haryana',
      overrideSeo: null,
    },
  },
  {
    citySlug: 'delhi',
    serviceSlug: 'web-development',
    override: {
      id: 2,
      documentId: 'mock-override-delhi-web-development',
      overrideTitle: 'Premier Web Development Agency in Delhi NCR',
      overrideSummary: 'High-performance websites and portals tailored for businesses in Delhi.',
      customPrice: '₹65,000',
      overrideBlocks: [],
      localPhone: '+91 11 4000 0000',
      localAddress: 'Connaught Place, New Delhi',
      overrideSeo: null,
    },
  },
  {
    citySlug: 'gurugram',
    serviceSlug: 'web-development',
    override: {
      id: 3,
      documentId: 'mock-override-gurugram-web-development',
      overrideTitle: 'Enterprise Web & Tech Solutions in Gurugram',
      overrideSummary: 'Modern Next.js web applications built for startups and scale-ups in Cyber City.',
      customPrice: '₹80,000',
      overrideBlocks: [],
      localPhone: '+91 124 5000 0000',
      localAddress: 'Cyber City, DLF Phase 2, Gurugram',
      overrideSeo: null,
    },
  },
];

export function findMockOverride(citySlug: string, serviceSlug: string): StrapiCityServiceOverride | undefined {
  return OVERRIDE_FIXTURES.find((o) => o.citySlug === citySlug && o.serviceSlug === serviceSlug)?.override;
}

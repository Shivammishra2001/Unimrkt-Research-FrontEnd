/**
 * Verbatim from backend/scripts/seed.ts's CITIES array. Ids assigned in
 * seed order (1-5) — matches the numeric ids shown in
 * API_SPECIFICATION.md's own worked examples for Rewari (id 1), Delhi
 * (id 3), and Noida (id 4).
 */
import type { StrapiCity } from '@/models/location-service';

export const MOCK_CITIES: StrapiCity[] = [
  { id: 1, documentId: 'mock-city-rewari', name: 'Rewari', slug: 'rewari', region: 'Haryana', localMeta: null },
  { id: 2, documentId: 'mock-city-gurugram', name: 'Gurugram', slug: 'gurugram', region: 'Haryana', localMeta: null },
  { id: 3, documentId: 'mock-city-delhi', name: 'Delhi', slug: 'delhi', region: 'Delhi NCR', localMeta: null },
  { id: 4, documentId: 'mock-city-noida', name: 'Noida', slug: 'noida', region: 'Uttar Pradesh', localMeta: null },
  { id: 5, documentId: 'mock-city-jaipur', name: 'Jaipur', slug: 'jaipur', region: 'Rajasthan', localMeta: null },
];

export function findMockCity(slug: string): StrapiCity | undefined {
  return MOCK_CITIES.find((c) => c.slug === slug);
}

/**
 * The same 5 categories seed.ts seeds into Strapi (see backend/scripts/
 * seed.ts's BLOG_CATEGORIES_SEED) — so NEXT_PUBLIC_USE_MOCKS=true renders
 * identical tabs/badges to a freshly-seeded backend. Exported individually
 * (not just as the list response) so mocks/fixtures/blog.ts can reference
 * the exact same objects for each post's `category` relation.
 */
import type { StrapiCategory, StrapiCategoryListResponse } from '@/models/category';

function category(id: number, name: string, slug: string, shortLabel: string | null = null): StrapiCategory {
  return { id, documentId: `mock-category-${slug}`, name, slug, description: null, shortLabel };
}

export const MOCK_CATEGORIES: Record<string, StrapiCategory> = {
  'Primary Research': category(1, 'Primary Research', 'primary-research'),
  'Qualitative Research': category(2, 'Qualitative Research', 'qualitative-research', 'Qualitative'),
  'Quantitative Research': category(3, 'Quantitative Research', 'quantitative-research', 'Quantitative'),
  'Business Research': category(4, 'Business Research', 'business-research'),
  'Research Support Functions': category(5, 'Research Support Functions', 'research-support-functions'),
};

export const MOCK_CATEGORIES_RESPONSE: StrapiCategoryListResponse = {
  data: Object.values(MOCK_CATEGORIES),
  meta: { pagination: { page: 1, pageSize: 100, pageCount: 1, total: Object.keys(MOCK_CATEGORIES).length } },
};

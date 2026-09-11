/**
 * Mirrors controllers/blog.ts's thin-pass-through shape.
 */
import { getCategories } from './strapi';
import { normalizeCategoryList } from './normalize';
import type { CategoryModel } from '@/models/category';

export async function getAllCategories(): Promise<CategoryModel[]> {
  return normalizeCategoryList(await getCategories());
}

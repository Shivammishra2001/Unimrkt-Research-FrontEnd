import { cache } from 'react';
import { getBlogPageSettings, getGalleryPageSettings, StrapiError } from './strapi';
import { normalizeBlogPageSettings, normalizeGalleryPageSettings } from './normalize';
import type { BlogPageSettings } from '@/models/blogPage';
import type { GalleryPageSettings } from '@/models/galleryPage';

/**
 * Pages → Blogs / Pages → Gallery. Unlike the other dedicated pages these routes worked before they had a page record,
 * so a missing record (404) is not "page switched off" — it just means "use the built-in copy". Other errors propagate.
 */
export const getBlogPageContent = cache(async (): Promise<BlogPageSettings> => {
  try {
    return normalizeBlogPageSettings(await getBlogPageSettings());
  } catch (err) {
    if (err instanceof StrapiError && err.status === 404) return { faqItems: [] };
    throw err;
  }
});

export const getGalleryPageContent = cache(async (): Promise<GalleryPageSettings> => {
  try {
    return normalizeGalleryPageSettings(await getGalleryPageSettings());
  } catch (err) {
    if (err instanceof StrapiError && err.status === 404) return {};
    throw err;
  }
});

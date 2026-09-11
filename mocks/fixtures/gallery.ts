/**
 * A representative subset (3 of the real seed.ts's 9) — matches this
 * mocks/ directory's existing convention (see industries.ts) of
 * illustrative, not exhaustive, fixtures.
 */
import type { StrapiGalleryItem, StrapiGalleryItemListResponse } from '@/models/gallery';

function item(id: number, title: string, category: StrapiGalleryItem['category'], order: number): StrapiGalleryItem {
  return {
    id,
    documentId: `mock-gallery-item-${id}`,
    title,
    category,
    caption: null,
    order,
    image: {
      id,
      url: '/mock/moments-large.svg',
      alternativeText: title,
      caption: null,
      width: 1200,
      height: 800,
      mime: 'image/svg+xml',
      formats: null,
    },
  };
}

export const MOCK_GALLERY_ITEMS_RESPONSE: StrapiGalleryItemListResponse = {
  data: [
    item(1, 'Unimrkt Research team collaborating in the office', 'Team & Culture', 0),
    item(2, 'Analysts reviewing survey data on screen', 'Research Process', 1),
    item(3, 'Field researcher conducting an on-site interview', 'Field Work', 2),
  ],
  meta: { pagination: { page: 1, pageSize: 100, pageCount: 1, total: 3 } },
};

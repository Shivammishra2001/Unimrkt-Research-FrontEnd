import type { Metadata } from 'next';
import { getGallery } from '@/controllers/gallery';
import { GalleryView } from '@/views/gallery/GalleryView';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Explore our gallery to see the people, processes and projects that drive our research excellence.',
};

// Strapi-backed (gallery-item collection, controllers/gallery.ts falls
// back to fixtures/gallery.json only if the backend is unreachable or
// empty) — a literal segment, so it routes here rather than the
// [[...slug]] catch-all.
export default async function GalleryPage() {
  const data = await getGallery();
  return <GalleryView data={data} />;
}

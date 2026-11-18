import { getGlobalClosingBands } from '@/controllers/closingBands';
import type { Metadata } from 'next';
import { cmsMetadata } from '@/controllers/pageMetadata';
import { getGalleryPageContent } from '@/controllers/blogPage';
import { getGallery } from '@/controllers/gallery';
import { GalleryView } from '@/views/gallery/GalleryView';

// Title/description from Pages → Gallery → SEO; this copy is the fallback.
export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata(getGalleryPageContent, {
    title: 'Gallery',
    description: 'Explore our gallery to see the people, processes and projects that drive our research excellence.',
  });
}

// Strapi-backed (gallery-item collection, controllers/gallery.ts falls
// back to fixtures/gallery.json only if the backend is unreachable or
// empty) — a literal segment, so it routes here rather than the
// [[...slug]] catch-all.
export default async function GalleryPage() {
  const [data, page] = await Promise.all([getGallery(), getGalleryPageContent().catch(() => ({}))]);
  // Global Header, Footer & SEO closing bands (cached; never throws). The view applies this page's own overrides.
  const globalBands = await getGlobalClosingBands();
  return <GalleryView globalBands={globalBands} page={page} data={data} />;
}

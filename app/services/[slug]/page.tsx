import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllServiceSlugs, getServiceBySlug } from '@/controllers/service';
import { ServiceDetailView } from '@/views/services/ServiceDetailView';

interface RouteParams {
  slug: string;
}

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: RouteParams }): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) return {};

  return {
    title: service.seo?.title ?? service.title,
    description: service.seo?.description ?? service.summary,
    ...(service.seo?.noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/** A dynamic *segment* (not catch-all) — shadows the generic catch-all for
 * the whole /services/* prefix. */
export default async function ServiceDetailPage({ params }: { params: RouteParams }) {
  const service = await getServiceBySlug(params.slug);
  if (!service) notFound();

  return <ServiceDetailView service={service} />;
}

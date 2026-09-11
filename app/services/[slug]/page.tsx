import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllServiceSlugs, getServiceBySlug } from '@/controllers/service';
import { getAllBlogPosts } from '@/controllers/blog';
import { isBackendUnreachable } from '@/controllers/strapi';
import { ServiceDetailView } from '@/views/services/ServiceDetailView';
import { OfflineNotice } from '@/views/ui/OfflineNotice';
import type { ServiceDetail } from '@/models/service';

interface RouteParams {
  slug: string;
}

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: RouteParams }): Promise<Metadata> {
  let service: ServiceDetail | null;
  try {
    service = await getServiceBySlug(params.slug);
  } catch (err) {
    if (isBackendUnreachable(err)) return {};
    throw err;
  }
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
  let service: ServiceDetail | null;
  let blogPosts: Awaited<ReturnType<typeof getAllBlogPosts>>;
  try {
    [service, blogPosts] = await Promise.all([getServiceBySlug(params.slug), getAllBlogPosts()]);
  } catch (err) {
    if (isBackendUnreachable(err)) return <OfflineNotice />;
    throw err;
  }
  if (!service) notFound();

  return <ServiceDetailView service={service} blogPosts={blogPosts} />;
}

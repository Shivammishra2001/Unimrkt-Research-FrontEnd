import { getGlobalClosingBands } from '@/controllers/closingBands';
import { notFound, permanentRedirect } from 'next/navigation';
import { hiddenFromVisitors } from '@/controllers/visibility';
import { InactivePreviewBanner } from '@/views/ui/InactivePreviewBanner';
import type { Metadata } from 'next';
import { getAllServiceCategories, getServiceBySlug } from '@/controllers/service';
import { getAllBlogPosts } from '@/controllers/blog';
import { isBackendUnreachable } from '@/controllers/strapi';
import { getServiceHref } from '@/lib/serviceHref';
import { ServiceDetailView } from '@/views/services/ServiceDetailView';
import { OfflineNotice } from '@/views/ui/OfflineNotice';
import type { ServiceDetail } from '@/models/service';

interface RouteParams {
  slug: string[];
}

/** Pre-render /services/<top> for every category and /services/<parent>/<child>
 * for every sub-service, straight from the live category tree. Flat child URLs
 * are intentionally absent — they resolve on demand and permanently redirect. */
export async function generateStaticParams() {
  const tree = await getAllServiceCategories();
  const params: { slug: string[] }[] = [];
  for (const top of tree) {
    params.push({ slug: [top.slug] });
    for (const child of top.children) params.push({ slug: [top.slug, child.slug] });
  }
  return params;
}

export async function generateMetadata({ params }: { params: RouteParams }): Promise<Metadata> {
  const leaf = params.slug[params.slug.length - 1];
  let service: ServiceDetail | null;
  try {
    service = await getServiceBySlug(leaf);
  } catch (err) {
    if (isBackendUnreachable(err)) return {};
    throw err;
  }
  if (!service) return {};

  return {
    title: service.seo?.title ?? service.title,
    description: service.seo?.description ?? service.summary,
    // Canonical is always the service's real place in the hierarchy, so the flat
    // and mismatched-parent URLs (which 308 here) never split SEO equity.
    alternates: { canonical: getServiceHref(service.slug, service.parent?.slug) },
    ...(service.seo?.noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/**
 * Catch-all for the whole /services/* detail tree (shadows the generic root
 * catch-all). One segment is a top-level category; two segments are
 * `<parent>/<child>`. A service is always looked up by its own unique slug —
 * the extra segment only pins the parent so the URL stays canonical. Any URL
 * that doesn't already match the service's canonical path is permanently
 * redirected there, which covers every legacy / wrong-parent shape at once:
 *   - flat   /services/telephonic-sureys            -> /services/primary-research/telephonic-sureys
 *   - wrong  /services/wrong-parent/telephonic-...   -> /services/primary-research/telephonic-sureys
 *   - nested /services/x/primary-research (top-level) -> /services/primary-research
 * 3+ segments, or an unknown slug, is a 404.
 */
export default async function ServiceDetailPage({ params }: { params: RouteParams }) {
  const segments = params.slug;
  if (segments.length === 0 || segments.length > 2) notFound();

  const leaf = segments[segments.length - 1];

  let service: ServiceDetail | null;
  let blogPosts: Awaited<ReturnType<typeof getAllBlogPosts>>;
  try {
    [service, blogPosts] = await Promise.all([getServiceBySlug(leaf), getAllBlogPosts()]);
  } catch (err) {
    if (isBackendUnreachable(err)) return <OfflineNotice />;
    throw err;
  }
  if (!service) notFound();

  // Redirect anything that isn't already the canonical hierarchical URL.
  // (permanentRedirect throws NEXT_REDIRECT, so it must stay out of the try above.)
  const canonical = getServiceHref(service.slug, service.parent?.slug);
  const requested = `/services/${segments.join('/')}`;
  if (requested !== canonical) permanentRedirect(canonical);

  const inactivePreview = hiddenFromVisitors(service);

  // Global Header, Footer & SEO closing bands (cached; never throws). The view applies this page's own overrides.
  const globalBands = await getGlobalClosingBands();
  return (
    <>
      {inactivePreview && <InactivePreviewBanner />}
      <ServiceDetailView globalBands={globalBands} service={service} blogPosts={blogPosts} />
    </>
  );
}

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllIndustrySlugs, getIndustryBySlug } from '@/controllers/industry';
import { isBackendUnreachable } from '@/controllers/strapi';
import { IndustryDetailView } from '@/views/industries/IndustryDetailView';
import { OfflineNotice } from '@/views/ui/OfflineNotice';
import type { IndustryDetail } from '@/models/industry';

interface RouteParams {
  slug: string;
}

export async function generateStaticParams() {
  const slugs = await getAllIndustrySlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: RouteParams }): Promise<Metadata> {
  let industry: IndustryDetail | null;
  try {
    industry = await getIndustryBySlug(params.slug);
  } catch (err) {
    if (isBackendUnreachable(err)) return {};
    throw err;
  }
  if (!industry) return {};

  return {
    title: industry.seo?.title ?? industry.title,
    description: industry.seo?.description ?? industry.summary,
    ...(industry.seo?.noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/** A dynamic *segment* (not catch-all) — shadows the generic catch-all for
 * the whole /industries/* prefix. Mirrors app/services/[slug]/page.tsx. */
export default async function IndustryDetailPage({ params }: { params: RouteParams }) {
  let industry: IndustryDetail | null;
  try {
    industry = await getIndustryBySlug(params.slug);
  } catch (err) {
    if (isBackendUnreachable(err)) return <OfflineNotice />;
    throw err;
  }
  if (!industry) notFound();

  return <IndustryDetailView industry={industry} />;
}

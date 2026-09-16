import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCaseStudyDetail, getCaseStudySlugList, getCaseStudyList } from '@/controllers/caseStudy';
import { isBackendUnreachable } from '@/controllers/strapi';
import { CaseStudyDetailView } from '@/views/case-study/detail/CaseStudyDetailView';
import { OfflineNotice } from '@/views/ui/OfflineNotice';
import type { CaseStudyDetail } from '@/models/caseStudy';

interface RouteParams {
  slug: string;
}

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugList();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: RouteParams }): Promise<Metadata> {
  let caseStudy: CaseStudyDetail | null;
  try {
    caseStudy = await getCaseStudyDetail(params.slug);
  } catch (err) {
    if (isBackendUnreachable(err)) return {};
    throw err;
  }
  if (!caseStudy) return {};

  return {
    title: caseStudy.title,
    description: caseStudy.excerpt,
  };
}

/** A dynamic *segment* under /case-study — shadows the static
 * /case-study listing page's own segment only for a second path part.
 * Mirrors app/industries/[slug]/page.tsx. */
export default async function CaseStudyDetailPage({ params }: { params: RouteParams }) {
  let caseStudy: CaseStudyDetail | null;
  let allCaseStudies: Awaited<ReturnType<typeof getCaseStudyList>>;
  try {
    [caseStudy, allCaseStudies] = await Promise.all([getCaseStudyDetail(params.slug), getCaseStudyList()]);
  } catch (err) {
    if (isBackendUnreachable(err)) return <OfflineNotice />;
    throw err;
  }
  if (!caseStudy) notFound();

  const relatedCaseStudies = allCaseStudies.filter((cs) => cs.slug !== caseStudy.slug);

  return <CaseStudyDetailView caseStudy={caseStudy} relatedCaseStudies={relatedCaseStudies} />;
}

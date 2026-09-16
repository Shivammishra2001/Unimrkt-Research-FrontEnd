import type { Metadata } from 'next';
import { getCaseStudyList } from '@/controllers/caseStudy';
import { isBackendUnreachable } from '@/controllers/strapi';
import { CaseStudyView } from '@/views/case-study/CaseStudyView';
import { OfflineNotice } from '@/views/ui/OfflineNotice';

export const metadata: Metadata = {
  title: 'Case Study',
  description: 'Explore how Unimrkt Research turns complex business challenges into clear, data-driven insights — see our case studies across industries.',
};

// A literal static segment, so Next routes it here rather than into the
// generic catch-all. Mirrors app/work-with-us/page.tsx.
export default async function CaseStudyPage() {
  try {
    const caseStudies = await getCaseStudyList();
    return <CaseStudyView caseStudies={caseStudies} />;
  } catch (err) {
    if (isBackendUnreachable(err)) return <OfflineNotice />;
    throw err;
  }
}

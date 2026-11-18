import { getGlobalClosingBands } from '@/controllers/closingBands';
import { notFoundIfMissing } from '@/controllers/visibility';
import type { Metadata } from 'next';
import { cmsMetadata } from '@/controllers/pageMetadata';
import { getWorkWithUsPageContent } from '@/controllers/workWithUsPage';
import { isBackendUnreachable } from '@/controllers/strapi';
import { WorkWithUsView } from '@/views/work-with-us/WorkWithUsView';
import { OfflineNotice } from '@/views/ui/OfflineNotice';

// Title/description from the page's Strapi SEO component; this copy is the fallback.
export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata(getWorkWithUsPageContent, {
    title: 'Work With Us',
    description: 'Great people build great research — explore careers at Unimrkt Research and find your next opportunity.',
  });
}

// A literal static segment, so Next routes it here rather than into the
// generic catch-all — /work-with-us permanently belongs to this
// dedicated page, never a generic `page` dynamiczone entry (see
// backend/scripts/seed.ts's comment on why the old generic entry at
// this slug was deleted). Mirrors app/our-company/page.tsx.
export default async function WorkWithUsPage() {
  try {
    const settings = await getWorkWithUsPageContent();
    // Global Header, Footer & SEO closing bands (cached; never throws). The view applies this page's own overrides.
    const globalBands = await getGlobalClosingBands();
    return <WorkWithUsView globalBands={globalBands} settings={settings} />;
  } catch (err) {
    if (isBackendUnreachable(err)) return <OfflineNotice />;
    notFoundIfMissing(err);
    throw err;
  }
}

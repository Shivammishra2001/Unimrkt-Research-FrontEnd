import type { Metadata } from 'next';
import { getWorkWithUsPageContent } from '@/controllers/workWithUsPage';
import { isBackendUnreachable } from '@/controllers/strapi';
import { WorkWithUsView } from '@/views/work-with-us/WorkWithUsView';
import { OfflineNotice } from '@/views/ui/OfflineNotice';

export const metadata: Metadata = {
  title: 'Work With Us',
  description: 'Great people build great research — explore careers at Unimrkt Research and find your next opportunity.',
};

// A literal static segment, so Next routes it here rather than into the
// generic catch-all — /work-with-us permanently belongs to this
// dedicated page, never a generic `page` dynamiczone entry (see
// backend/scripts/seed.ts's comment on why the old generic entry at
// this slug was deleted). Mirrors app/our-company/page.tsx.
export default async function WorkWithUsPage() {
  try {
    const settings = await getWorkWithUsPageContent();
    return <WorkWithUsView settings={settings} />;
  } catch (err) {
    if (isBackendUnreachable(err)) return <OfflineNotice />;
    throw err;
  }
}

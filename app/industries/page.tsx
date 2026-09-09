import type { Metadata } from 'next';
import { getAllIndustries } from '@/controllers/industry';
import { isBackendUnreachable } from '@/controllers/strapi';
import { IndustryListingView } from '@/views/industries/IndustryListingView';
import { OfflineNotice } from '@/views/ui/OfflineNotice';

export const metadata: Metadata = {
  title: 'Industries',
  description: 'Market research and insights tailored to your sector.',
};

// A literal static segment, so Next routes it here rather than into the
// generic catch-all — this whole /industries/* prefix permanently belongs
// to the industry content type, never a `page`.
export default async function IndustriesPage() {
  try {
    const industries = await getAllIndustries();
    return <IndustryListingView industries={industries} />;
  } catch (err) {
    if (isBackendUnreachable(err)) return <OfflineNotice />;
    throw err;
  }
}

import { notFoundIfMissing } from '@/controllers/visibility';
import type { Metadata } from 'next';
import { cmsMetadata } from '@/controllers/pageMetadata';
import { getPrivacyPolicyPageContent } from '@/controllers/privacyPolicyPage';
import { isBackendUnreachable } from '@/controllers/strapi';
import { PrivacyPolicyView } from '@/views/privacy-policy/PrivacyPolicyView';
import { OfflineNotice } from '@/views/ui/OfflineNotice';

// Title/description from the page's Strapi SEO component; this copy is the fallback.
export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata(getPrivacyPolicyPageContent, {
    title: 'Privacy Policy',
    description: 'Your data deserves transparency, security and responsible handling. Explore how Unimrkt Research protects your information and respects your privacy.',
  });
}

// A literal static segment, so Next routes it here rather than into the
// generic catch-all. Mirrors app/our-company/page.tsx.
export default async function PrivacyPolicyPage() {
  try {
    const settings = await getPrivacyPolicyPageContent();
    return <PrivacyPolicyView settings={settings} />;
  } catch (err) {
    if (isBackendUnreachable(err)) return <OfflineNotice />;
    notFoundIfMissing(err);
    throw err;
  }
}

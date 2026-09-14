import type { Metadata } from 'next';
import { getContactPageContent } from '@/controllers/contactPage';
import { isBackendUnreachable } from '@/controllers/strapi';
import { ContactView } from '@/views/contact/ContactView';
import { OfflineNotice } from '@/views/ui/OfflineNotice';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Tell us what you’re trying to understand. Our research experts will help you find the right path forward.',
};

// A literal static segment, so Next routes it here rather than into the
// generic catch-all — /contact permanently belongs to this dedicated
// page, never a generic `page` dynamiczone entry. Strictly `/contact`,
// not `/contact-us` (every existing site link already points at
// `/contact` — see backend/scripts/seed.ts's nav/CTA entries). Mirrors
// app/our-company/page.tsx.
export default async function ContactPage() {
  try {
    const settings = await getContactPageContent();
    return <ContactView settings={settings} />;
  } catch (err) {
    if (isBackendUnreachable(err)) return <OfflineNotice />;
    throw err;
  }
}

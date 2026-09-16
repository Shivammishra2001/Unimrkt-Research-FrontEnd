import type { Metadata } from 'next';
import { getTeamMemberList } from '@/controllers/teamMember';
import { getOurTeamPageContent } from '@/controllers/ourTeamPage';
import { isBackendUnreachable } from '@/controllers/strapi';
import { OurTeamView } from '@/views/our-team/OurTeamView';
import { OfflineNotice } from '@/views/ui/OfflineNotice';

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'A diverse team of research experts bringing experience, insight, and strategic thinking to every project.',
};

// A literal static segment, so Next routes it here rather than into the
// generic catch-all. Mirrors app/privacy-policy/page.tsx.
export default async function OurTeamPage() {
  try {
    const [members, settings] = await Promise.all([getTeamMemberList(), getOurTeamPageContent()]);
    return <OurTeamView members={members} settings={settings} />;
  } catch (err) {
    if (isBackendUnreachable(err)) return <OfflineNotice />;
    throw err;
  }
}

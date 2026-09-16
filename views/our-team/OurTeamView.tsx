import { HeroSection } from './HeroSection';
import { TeamGridSection } from './TeamGridSection';
import { BottomCtaSection } from './BottomCtaSection';
import { resolveOurTeam } from './fallback';
import type { TeamMemberModel } from '@/models/teamMember';
import type { OurTeamPageSettings } from '@/models/ourTeamPage';

/**
 * /our-team — Figma node 1126:54624 ("Our Team", file
 * foaJFuv0vRX8nD43o0ylgB), the sole source of truth for this page.
 * Navbar/Footer/ChatWidget are global (app/layout.tsx). `resolveOurTeam()`
 * (./fallback.ts) is CMS-first, falling back per field/list to this
 * node's own verbatim copy.
 *
 * Renders every one of the node's own sections, top to bottom, and
 * nothing else: Hero (+3-level breadcrumb) / "People. Expertise.
 * Impact." + the 19-card team grid / bottom CTA. No filter tabs or
 * category pills are drawn on this node, so none exist here.
 */
export function OurTeamView({ members, settings }: { members: TeamMemberModel[]; settings: OurTeamPageSettings }) {
  const content = resolveOurTeam(members, settings);

  return (
    <>
      <HeroSection hero={content.hero} />
      <TeamGridSection membersHeading={content.membersHeading} members={content.members} />
      <BottomCtaSection bottomCta={content.bottomCta} />
    </>
  );
}

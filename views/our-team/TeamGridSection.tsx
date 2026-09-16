import { Container } from '@/views/ui/Container';
import { TeamMemberCard } from './TeamMemberCard';
import type { ResolvedOurTeam } from './fallback';

/** "People. Expertise. Impact." + the 19-card team grid — Figma node
 * 1126:54624 (y900-4324). Heading: 50px Montserrat SemiBold, capitalize,
 * tracking -3px, centered, #02060e. Grid: 4 columns desktop (372px
 * cards, 37px column gap, 35px row gap), the node's own exact
 * top-to-bottom, left-to-right reading order (last row has 3 cards, not
 * 4 — CMS-first via team-member.order, falls back to this node's own
 * verbatim 19-member list otherwise). */
export function TeamGridSection({ membersHeading, members }: { membersHeading: ResolvedOurTeam['membersHeading']; members: ResolvedOurTeam['members'] }) {
  return (
    <section className="bg-white pt-16 sm:pt-20 lg:pt-24">
      <Container>
        <h2 className="text-center text-[32px] font-semibold capitalize leading-[1.2] tracking-[-1px] text-heading sm:text-[40px] lg:text-[50px] lg:tracking-[-3px]">
          {membersHeading}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-x-[37px] gap-y-[35px] sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </Container>
    </section>
  );
}

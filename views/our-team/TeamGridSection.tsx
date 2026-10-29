'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { TeamMemberCard } from './TeamMemberCard';
import { TeamProfileModal } from './TeamProfileModal';
import type { ResolvedOurTeam } from './fallback';
import type { TeamMemberModel } from '@/models/teamMember';

/** "People. Expertise. Impact." + the 19-card team grid — Figma node
 * 1126:54624. Heading: Montserrat 600, 50/60px, tracking -3px, #02060e,
 * centered, 59px under the breadcrumb. Grid: 3 columns of 372px cards
 * (x=342/764/1186 -> a 1216px block), 50px column and row gaps, 37px
 * under the heading; the last row has a single card, exactly as drawn.
 * CMS-first via team-member.order (fallback.ts). Client component: holds
 * which member's "View Profile" modal (Figma node 1126:55196) is open. */
export function TeamGridSection({ membersHeading, members }: { membersHeading: ResolvedOurTeam['membersHeading']; members: ResolvedOurTeam['members'] }) {
  const [selectedMember, setSelectedMember] = useState<TeamMemberModel | null>(null);

  return (
    <section className="bg-white pt-12 sm:pt-[59px]">
      <div className="mx-auto w-full max-w-[1216px] px-4 sm:px-6 lg:px-8 min-[1280px]:px-0">
        <h2 className="text-center font-sans text-[32px] font-semibold capitalize leading-[38px] tracking-[-1px] text-[#02060e] sm:text-[40px] sm:leading-[48px] lg:text-[50px] lg:leading-[60px] lg:tracking-[-3px]">
          {membersHeading}
        </h2>

        <div className="mt-[37px] grid grid-cols-1 gap-[50px] sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <TeamMemberCard key={member.id} member={member} onViewProfile={() => setSelectedMember(member)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedMember && <TeamProfileModal key={selectedMember.id} member={selectedMember} onClose={() => setSelectedMember(null)} />}
      </AnimatePresence>
    </section>
  );
}

import { StrapiImage } from '@/views/ui/StrapiImage';
import { SendArrowIcon } from '@/views/ui/icons/SendArrowIcon';
import type { TeamMemberModel } from '@/models/teamMember';

/** One member card — Figma node 1126:54624 (Component 259 and its 18
 * siblings), 372x640, white rounded-[24px] card, photo panel on top
 * (~62% of card height), name (24px Inter SemiBold) + role (16px Inter
 * Medium, 90% opacity) centered below it, and a "View Profile" pill at
 * the bottom. That pill has no real target — this node draws only the
 * member grid, no member detail page exists — so it's rendered
 * decoratively, same precedent as the case-study grid's arrow-right
 * CTA. Each card's photo-panel tint is a barely-visible near-white
 * shade unique per instance on the node (#f6f5f5/#f9f7f3/#f4f4f4/etc.)
 * — simplified here to one consistent neutral panel color, the same
 * "decorative crop-mask" simplification convention used for every
 * other page's card-photo masking this session. */
export function TeamMemberCard({ member }: { member: TeamMemberModel }) {
  return (
    <div className="flex aspect-[372/640] w-full flex-col overflow-hidden rounded-[24px] border border-[#e3eded] bg-white p-[15px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)]">
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-t-[19px] bg-[#f6f5f5]">
        {member.photo && <StrapiImage image={member.photo} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" fill className="object-cover object-top" />}
      </div>
      <div className="pt-5 text-center">
        <h3 className="text-2xl font-semibold leading-[1.17] text-[#1e1e1e]">{member.name}</h3>
        <p className="mt-2 text-base font-medium leading-[1.6] tracking-[-0.2px] text-[#2d3e50] opacity-90">{member.role}</p>
        <div
          className="mt-5 inline-flex items-center gap-1 rounded-[4px] border border-[#dcdcdc] bg-white px-6 py-3 font-sans text-[13px] font-bold uppercase tracking-[0.78px] text-[#0e1b2e]"
          aria-hidden="true"
        >
          View Profile
          <SendArrowIcon className="size-4" />
        </div>
      </div>
    </div>
  );
}

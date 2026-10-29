import Image from 'next/image';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { SendArrowIcon } from '@/views/ui/icons/SendArrowIcon';
import type { TeamMemberModel } from '@/models/teamMember';

/** One member card — Figma node 1126:52869 (Component 259; 1126:54739 and
 * its 18 siblings on the page), 372x640:
 *  - card: white, 1px #e3eded border (inside), r24, shadow 6 6 54 rgba(0,0,0,.08)
 *  - photo panel: 8px inset, 356x381.4, #f6f5f5, top corners r19, bottom square
 *  - name: Inter 600 24/28px #1e1e1e, 25.3px under the photo
 *  - role: Inter 500 16/25.6px, tracking -0.2px, #2d3e50 @ 90%, 13px under the name
 *  - actions row, 50.7px under the role: "View Profile" 195x51.5 (white,
 *    1px #dcdcdc, r4, Noto Sans 700 13px tracking .78px #0e1b2e) + 12px gap
 *    + a 51.5px #0077b5 LinkedIn tile (r4, white glyph from
 *    /icons/linkedin.svg), left-aligned at x=53 on a 372px card
 *  - 56.5px below the actions row to the card's bottom edge
 * Only the photo panel is aspect-locked (356:381.4); everything below it is
 * fixed px, so the card is exactly 640px tall at the 372px desktop width and
 * simply follows its content at narrower widths. The node draws no hover
 * state: the only feedback is a subtle button fill and the LinkedIn tile
 * dimming, both 300ms. No LinkedIn field exists in the Strapi schema yet —
 * the tile links out only when `member.linkedinUrl` is present. */
export function TeamMemberCard({ member, onViewProfile }: { member: TeamMemberModel; onViewProfile: () => void }) {
  const linkedin = (
    <Image src="/icons/linkedin.svg" alt="" width={29.3372} height={29.5419} className="h-auto w-[29.34px]" />
  );
  const linkedinClassName = 'flex size-[51.52px] shrink-0 items-center justify-center rounded-[4px] bg-[#0077b5]';

  return (
    <div className="flex w-full flex-col rounded-[24px] border border-[#e3eded] bg-white px-[7px] pb-[55.5px] pt-[7px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)]">
      <div className="relative aspect-[356/381.4] w-full overflow-hidden rounded-t-[19px] bg-[#f6f5f5]">
        {member.photo && <StrapiImage image={member.photo} sizes="(min-width: 1280px) 356px, (min-width: 640px) 50vw, 100vw" fill className="object-cover object-top" />}
      </div>
      <h3 className="mt-[25.3px] text-center font-nav text-[24px] font-semibold leading-[28px] text-[#1e1e1e]">{member.name}</h3>
      <p className="mt-[13px] text-center font-nav text-[16px] font-medium leading-[25.6px] tracking-[-0.2px] text-[#2d3e50] opacity-90">{member.role}</p>
      <div className="mt-[50.7px] flex items-center justify-center gap-3 min-[1280px]:justify-start min-[1280px]:pl-[45px]">
        <button
          type="button"
          onClick={onViewProfile}
          className="inline-flex h-[51.52px] w-[195px] shrink-0 items-center justify-center gap-1 rounded-[4px] border border-[#dcdcdc] bg-white font-noto text-[13px] font-bold uppercase leading-[16.9px] tracking-[0.78px] text-[#0e1b2e] transition-colors duration-300 ease-in-out hover:bg-[#f6f5f5]"
        >
          View Profile
          <SendArrowIcon className="size-4" />
        </button>
        {member.linkedinUrl ? (
          <a
            href={member.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className={`${linkedinClassName} transition-opacity duration-300 ease-in-out hover:opacity-85`}
          >
            {linkedin}
          </a>
        ) : (
          <span className={linkedinClassName} aria-hidden="true">
            {linkedin}
          </span>
        )}
      </div>
    </div>
  );
}

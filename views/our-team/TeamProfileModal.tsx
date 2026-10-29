'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { useModalDismiss } from '@/views/ui/useModalDismiss';
import type { TeamMemberModel } from '@/models/teamMember';

/**
 * "View Profile" modal — Figma node 1126:55196 (the modal card is
 * 1126:56704, file foaJFuv0vRX8nD43o0ylgB). It is an overlay on /our-team
 * driven by TeamGridSection's `selectedMember` state — no route change.
 *
 * Scrim: the node's full-page layer 1126:56057, #13151b @ 90%, no blur.
 * Card 1188x531: white, 1px #eee, r24, shadow 6 6 54 rgba(0,0,0,.08).
 * Offsets below are the Figma ones from the card's outer top-left (the 1px
 * border is inside them, so the paddings are 1px smaller):
 *  - photo panel (45,50) 356x381.4, #f6f5f5, r20; the portrait is placed at
 *    (-19,12.07) 385x463 inside it, object-bottom, clipped by the panel
 *  - LinkedIn tile 51.52px #0077b5 r4, centred under the photo (197,444)
 *  - name (453, cap-top 65): Inter 600 30/28px #1e1e1e
 *  - role (cap-top 105.6): Inter 500 16/25.6px, tracking -0.2px, #2d3e50 @ 90%
 *  - divider (453,141): 90px #b32c2d, 3px round caps (team-modal-divider.svg)
 *  - bio (cap-top 175) 680px wide: Montserrat 400 16/30.4px, #02060e @ 80%
 *  - close icon 13.5px #292d32 at (1148.25, 25.25) (team-modal-close-icon.svg)
 * Below `lg` the card stacks (photo, tile, text) and the backdrop scrolls.
 * The node draws exactly one bio (Anurag Magoo's); for every other member
 * the bio paragraph is omitted rather than invented. LinkedIn links out only
 * when the member has a `linkedinUrl` (no such field in Strapi yet).
 * Escape / backdrop click / the X close it; body scroll is locked by
 * useModalDismiss. Enter/exit is a 200ms fade + 95%→100% scale
 * (AnimatePresence lives in TeamGridSection).
 */
export function TeamProfileModal({ member, onClose }: { member: TeamMemberModel; onClose: () => void }) {
  useModalDismiss(true, onClose);
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0 : 0.2;

  const linkedinTileClassName = 'flex size-[51.52px] shrink-0 items-center justify-center rounded-[4px] bg-[#0077b5]';
  const linkedinGlyph = <Image src="/icons/linkedin.svg" alt="" width={29.3372} height={29.5419} className="h-auto w-[29.34px]" />;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={member.name}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[#13151b]/90 p-4 sm:p-8 lg:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, ease: 'easeOut' }}
      onClick={onClose}
    >
      <motion.div
        className="relative my-auto w-full max-w-[1188px] rounded-[24px] border border-[#eee] bg-white px-6 pb-8 pt-12 shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] lg:flex lg:min-h-[531px] lg:px-0 lg:pb-[34.5px] lg:pl-[44px] lg:pr-[54px] lg:pt-0"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close profile"
          autoFocus
          className="absolute right-[14px] top-[13px] flex size-9 items-center justify-center rounded-full transition-colors duration-300 ease-in-out hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b32c2d]"
        >
          <Image src="/images/our-team/team-modal-close-icon.svg" alt="" width={13.5} height={13.5} />
        </button>

        <div className="flex shrink-0 flex-col items-center gap-[12.58px] lg:pt-[49px]">
          <div className="relative aspect-[356/381.42] w-full max-w-[356px] overflow-hidden rounded-[20px] bg-[#f6f5f5] lg:w-[356px]">
            {member.photo && (
              <div className="absolute left-[-5.337%] top-[3.166%] h-[121.4%] w-[108.15%]">
                <StrapiImage image={member.photo} sizes="385px" fill className="object-cover object-bottom" />
              </div>
            )}
          </div>
          {member.linkedinUrl ? (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className={`${linkedinTileClassName} transition-opacity duration-300 ease-in-out hover:opacity-85`}
            >
              {linkedinGlyph}
            </a>
          ) : (
            <span className={linkedinTileClassName} aria-hidden="true">
              {linkedinGlyph}
            </span>
          )}
        </div>

        <div className="mt-8 min-w-0 lg:ml-[52px] lg:mt-0 lg:max-w-[680px] lg:flex-1 lg:pt-[60.9px]">
          <h2 className="font-nav text-[26px] font-semibold leading-[28px] text-[#1e1e1e] lg:text-[30px]">{member.name}</h2>
          <p className="mt-[8.7px] font-nav text-[16px] font-medium leading-[25.6px] tracking-[-0.2px] text-[#2d3e50] opacity-90">{member.role}</p>
          <Image src="/images/our-team/team-modal-divider.svg" alt="" width={93} height={3} className="-ml-[1.5px] mt-[15.3px] block h-[3px] w-[93px] max-w-none" aria-hidden="true" />
          {member.bio && (
            <p className="mt-[22.8px] font-sans text-[16px] font-normal leading-[30.4px] text-[#02060e] opacity-80">{member.bio}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

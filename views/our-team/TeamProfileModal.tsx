'use client';

import { StrapiImage } from '@/views/ui/StrapiImage';
import { CloseIcon } from '@/views/ui/icons/CloseIcon';
import { useModalDismiss } from '@/views/ui/useModalDismiss';
import type { TeamMemberModel } from '@/models/teamMember';

/**
 * "View Profile" modal — Figma node 1126:55196 (the modal card itself
 * is 1126:56704, file foaJFuv0vRX8nD43o0ylgB). Card: bg-white,
 * border-[#eee], rounded-[24px], shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)]
 * — same shell as work-with-us's JobDetailsModal. Backdrop:
 * bg-[#13151b]/90, the same sitewide modal-backdrop convention (the
 * node itself draws no separate backdrop layer).
 *
 * Layout, left to right: photo (356x381, rounded-[20px], bg-[#f6f5f5],
 * object-cover/object-bottom) — name (30px Inter SemiBold, #1e1e1e) —
 * role (16px Inter Medium, #2d3e50 @ 90% opacity, tracking -0.2px) — a
 * short 90x3px rounded divider (#B32C2D, the node's own Vector 496) —
 * bio paragraph (16px Montserrat Regular, #02060e @ 80% opacity,
 * leading-[1.9]).
 *
 * The node draws exactly ONE bio (Anurag Magoo's own worked example —
 * see fallback.ts's header comment); every other member's `bio` is
 * undefined, so the bio paragraph is omitted entirely for them rather
 * than inventing filler copy — same section-omission precedent as
 * JobDetailsModal.tsx. No department pill and no social/contact icons
 * exist anywhere on this node, so none are rendered.
 */
export function TeamProfileModal({ member, onClose }: { member: TeamMemberModel; onClose: () => void }) {
  useModalDismiss(true, onClose);

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- backdrop click-to-close, content stops propagation below
    <div role="dialog" aria-modal="true" aria-label={member.name} className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#13151b]/90 p-4 sm:p-8" onClick={onClose}>
      <div
        className="relative w-full max-w-[1188px] rounded-[24px] border border-[#eee] bg-white p-6 shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] sm:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close profile"
          className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full text-heading/60 transition-colors hover:bg-black/5 hover:text-heading"
        >
          <CloseIcon className="size-4" aria-hidden="true" />
        </button>

        <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
          <div className="relative aspect-[356/381] w-full shrink-0 overflow-hidden rounded-[20px] bg-[#f6f5f5] sm:w-[356px]">
            {member.photo && (
              <StrapiImage image={member.photo} sizes="(min-width: 640px) 356px, 100vw" fill className="object-cover object-bottom" />
            )}
          </div>

          <div className="min-w-0 flex-1 pt-1">
            <h2 className="font-nav text-[26px] font-semibold leading-[1.2] text-[#1e1e1e] sm:text-[30px]">{member.name}</h2>
            <p className="mt-2 font-nav text-base font-medium leading-[1.6] tracking-[-0.2px] text-[#2d3e50] opacity-90">{member.role}</p>
            <span className="mt-3 block h-[3px] w-[90px] rounded-full bg-[#b32c2d]" aria-hidden="true" />
            {member.bio && <p className="mt-6 text-base leading-[1.9] text-heading opacity-80">{member.bio}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

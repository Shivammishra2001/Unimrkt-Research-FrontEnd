import type { ReactNode } from 'react';

/** Text styles measured from Figma node 1384:26772 (Montserrat, 1900px
 * frame). Offsets between blocks elsewhere in this folder compensate for
 * Figma's `text-box-trim` (it reports cap-top positions, CSS boxes start
 * at the line box): cap offset = (lineHeight - 1.219*fontSize)/2 +
 * 0.268*fontSize. */
export const EYEBROW_CLASS = 'font-sans text-[13px] font-bold uppercase leading-[15.6px] tracking-[3px]';
export const H2_CLASS =
  'font-sans text-[32px] font-semibold capitalize leading-[38px] tracking-[-1.5px] sm:text-[40px] sm:leading-[48px] lg:text-[50px] lg:leading-[60px] lg:tracking-[-3px]';
export const BODY_CLASS = 'font-sans text-[16px] font-normal leading-[30.4px]';

/** Frame-width container used by the card rows (150px side margins at 1900). */
export const ROW_CONTAINER = 'mx-auto w-full px-4 sm:px-6 lg:px-8 min-[1700px]:px-0';

/** Eyebrow (13/15.6 bold, 3px tracking) + 50/60 title (-3px) + 16/30.4
 * body (80% opacity), centered. `tone="dark"` flips the three colors to
 * the white used on the dark global-reach band. */
export function SectionHeader({
  eyebrow,
  title,
  body,
  tone = 'light',
  titleMaxWidth,
  bodyMaxWidth,
  className = '',
}: {
  eyebrow: string;
  title: string;
  body?: ReactNode;
  tone?: 'light' | 'dark';
  titleMaxWidth?: string;
  bodyMaxWidth?: string;
  className?: string;
}) {
  const dark = tone === 'dark';
  return (
    <header className={`mx-auto flex flex-col items-center text-center ${className}`}>
      <p className={`${EYEBROW_CLASS} ${dark ? 'text-white' : 'text-[#cc1f1f]'}`}>{eyebrow}</p>
      <h2 className={`${H2_CLASS} mt-[7px] ${dark ? 'text-white' : 'text-[#02060e]'}`} style={{ maxWidth: titleMaxWidth }}>
        {title}
      </h2>
      {body && (
        <div
          className={`${BODY_CLASS} mt-[12px] opacity-80 ${dark ? 'text-white' : 'text-[#02060e]'}`}
          style={{ maxWidth: bodyMaxWidth }}
        >
          {body}
        </div>
      )}
    </header>
  );
}

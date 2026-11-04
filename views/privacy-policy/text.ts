/** Figma draws every text box with `text-box-trim: trim-both; text-box-edge: cap alphabetic` — its y-values are cap-tops, so the page is
 * laid out from trimmed boxes with the gaps measured in node 1114:50556. */
export const TRIM = '[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]';
/** 16px Montserrat #02060e at 80%, 1.9 line height (30.4px). */
export const BODY = `font-sans text-[16px] font-normal leading-[1.9] text-[#02060e] opacity-80 ${TRIM}`;
/** 36px SemiBold/-2px #a72b31 section titles (cap-top box 25px). */
export const H2 = `font-sans text-[26px] font-semibold capitalize leading-[1.2] tracking-[-1px] text-[#a72b31] sm:text-[30px] lg:text-[36px] lg:tracking-[-2px] ${TRIM}`;

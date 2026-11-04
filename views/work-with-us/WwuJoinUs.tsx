import type { ReactNode } from 'react';
import type { ResolvedWorkWithUs } from './fallback';

/** Figma 924:23505-23506 draw each sentence on its own line / blank lines between paragraphs; saved CMS copy is one block, so break it here. */
const BREAKS: Array<[string, string]> = [
  ['Our HR team', '\n'],
  ['Please note that', '\n'],
  ['Thank you for your interest', '\n\n'],
  ['We urge you to', '\n\n'],
  ['We take fraud seriously', '\n\n'],
  ['Our commitment lies', '\n\n'],
];
function withParagraphs(text: string): string {
  if (text.includes('\n')) return text;
  return BREAKS.reduce((out, [marker, gap]) => out.replace(` ${marker}`, `${gap}${marker}`), text);
}

const EMAIL = /([\w.+-]+@unimrkt\.com)(\.?)/;
/** 924:23505 underlines the careers address as a mailto link. */
function linkEmail(text: string): ReactNode {
  const m = text.match(EMAIL);
  if (!m || m.index === undefined) return text;
  const before = text.slice(0, m.index);
  // Only the first address in the join-us copy is a link; the disclaimer lists domains (@unimrkt.com) and has no full address.
  if (before.endsWith('@')) return text;
  return (
    <>
      {before}
      <a href={`mailto:${m[1]}`} className="underline underline-offset-2">
        {m[1]}
        {m[2]}
      </a>
      {text.slice(m.index + m[0].length)}
    </>
  );
}

/** "Join Us" + "Disclaimer : Beware of Fraud" — Figma node 924:23216 (y4428-5124, 696px). Plain text at x=250, 1401px wide:
 * 36px SemiBold/-3px headings (cap-top +65 and +317) — "Join Us" and "Beware of Fraud" #aa4251, "Disclaimer :" #02060e —
 * and 16px/1.9 Montserrat copy in #02060e at 80% (+124 and +376). CMS-first, template-fallback. */
export function WwuJoinUs({ joinUs, disclaimer }: { joinUs: ResolvedWorkWithUs['joinUs']; disclaimer: ResolvedWorkWithUs['disclaimer'] }) {
  const heading =
    'font-sans text-[28px] font-semibold capitalize leading-[1.2] tracking-[-1.5px] text-[#aa4251] sm:text-[36px] lg:tracking-[-3px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]';
  const body = 'whitespace-pre-line font-sans text-[16px] font-normal leading-[1.9] text-[#02060e]/80 [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]';

  const split = disclaimer.heading.indexOf(':');
  const lead = split >= 0 ? disclaimer.heading.slice(0, split + 1) : '';
  const tail = split >= 0 ? disclaimer.heading.slice(split + 1).trim() : disclaimer.heading;

  return (
    <section className="overflow-x-hidden bg-white px-4 py-14 sm:px-6 lg:pb-[39px] lg:pt-[65px]">
      <div className="mx-auto w-full max-w-[1401px]">
        <h2 className={heading}>{joinUs.heading}</h2>
        <p className={`${body} mt-5 lg:mt-[34px]`}>{linkEmail(withParagraphs(joinUs.body))}</p>

        <h2 className={`${heading} mt-12 lg:mt-[62px]`}>
          {lead && <span className="text-[#02060e]">{lead} </span>}
          {tail}
        </h2>
        <p className={`${body} mt-5 lg:mt-[34px]`}>{withParagraphs(disclaimer.body)}</p>
      </div>
    </section>
  );
}

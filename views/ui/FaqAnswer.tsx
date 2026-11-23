import type { ReactNode } from 'react';

/**
 * Smart FAQ answer renderer — shared by every FAQ accordion on the site
 * (home/industry `FaqView`, `IndustryFaqSection`, `BlogFaqAccordion`).
 *
 * CMS `answer` text is plain multi-line text (newlines, optional "- " / "* "
 * / "• " bullet markers an editor may type). This turns it into clean
 * semantic markup instead of one run-on paragraph:
 *   - A single line / single paragraph  → one <p>.
 *   - An intro line ending with ":" or any bullet-marked lines → the intro
 *     text as <p className="mb-3"> followed by a <ul className="list-disc">
 *     with one <li> per point (leading markers stripped).
 *   - Multi-paragraph prose with no colon-intro and no markers → each line
 *     as its own <p> (paragraphs preserved, not forced into bullets).
 *
 * Typography / colour / padding come from `className` on the wrapper and
 * cascade to the children, so each call site keeps its own look.
 */
const BULLET_RE = /^[-*•]\s+/;

function parseAnswer(raw: string): { intro: string[]; items: string[] } {
  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length <= 1) return { intro: lines, items: [] };

  const firstBullet = lines.findIndex((l) => BULLET_RE.test(l));
  const colonIntro = lines[0].endsWith(':');

  let introLines: string[];
  let itemLines: string[];

  if (firstBullet !== -1) {
    introLines = lines.slice(0, firstBullet);
    itemLines = lines.slice(firstBullet);
  } else if (colonIntro) {
    introLines = [lines[0]];
    itemLines = lines.slice(1);
  } else {
    // Plain multi-paragraph prose — keep as separate paragraphs, no list.
    return { intro: lines, items: [] };
  }

  const items = itemLines.map((l) => l.replace(BULLET_RE, '').trim()).filter(Boolean);
  // If stripping left nothing to list, fall back to plain paragraphs.
  if (items.length === 0) return { intro: lines, items: [] };

  return { intro: introLines, items };
}

export function FaqAnswer({ text, className }: { text: string; className?: string }): ReactNode {
  const { intro, items } = parseAnswer(text ?? '');
  const hasList = items.length > 0;

  return (
    <div className={className}>
      {intro.map((paragraph, i) => (
        <p key={i} className={hasList || i < intro.length - 1 ? 'mb-3 last:mb-0' : ''}>
          {paragraph}
        </p>
      ))}
      {hasList && (
        <ul className="list-disc space-y-2 pl-5">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

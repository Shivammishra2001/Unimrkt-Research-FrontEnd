import { BODY } from './text';
import type { ResolvedPrivacyPolicy } from './fallback';

/** Preamble — Figma node 1114:50556 (y885-1256), x220, 1461px. Five paragraphs, a blank 30.4px line between them except before the
 * closing "Please read…" sentence, which Figma sets directly under the previous paragraph. */
export function IntroSection({ introBody }: { introBody: ResolvedPrivacyPolicy['introBody'] }) {
  const paragraphs = introBody.split('\n\n');

  return (
    <div className="mt-10 lg:mt-[57px]">
      {paragraphs.map((p, i) => (
        <p key={i} className={`${BODY} ${i === 0 ? '' : i === paragraphs.length - 1 && paragraphs.length > 2 ? 'mt-[19.2px]' : 'mt-[48px]'}`}>
          {p}
        </p>
      ))}
    </div>
  );
}

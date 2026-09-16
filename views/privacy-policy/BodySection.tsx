import { Container } from '@/views/ui/Container';
import type { ResolvedPrivacyPolicy } from './fallback';
import type { PrivacyPolicyListItemModel } from '@/models/privacyPolicyPage';

// Matches the two real anchors this node's TOC (fallback.ts's
// FALLBACK_TOC_ITEMS[0]/[1], or the CMS's own tocItems[0]/[1]) points at
// — the only 2 of 12 TOC entries with body copy actually drawn beneath
// them. Fixed regardless of CMS edits to the TOC labels, matching
// exactly what node 1114:50556 draws.
const QUALIFIES_ANCHOR = 'What-qualifies-as-Personal-Data';
const LAWFUL_ANCHOR = 'What-Constitutes-the-Lawful-Collection-and-Use-of-Personal-Data';

function Paragraphs({ text }: { text: string }) {
  return (
    <div className="flex flex-col gap-6">
      {text.split('\n\n').map((p, i) => (
        <p key={i} className="text-base leading-[1.9] text-heading opacity-80">
          {p}
        </p>
      ))}
    </div>
  );
}

/** Numbered list — Figma's own `list-decimal`, no custom marker graphic
 * (node 1114:50681 / 1114:50695). */
function NumberedList({ items }: { items: PrivacyPolicyListItemModel[] }) {
  return (
    <ol className="flex flex-col gap-[34px] pl-6 text-base leading-[1.9] text-heading opacity-80">
      {items.map((item) => (
        <li key={item.id} className="list-decimal pl-2">
          {item.text}
        </li>
      ))}
    </ol>
  );
}

/** Bulleted list with the node's own custom red dot marker (`#B52C2C`,
 * Ellipse 25 — node 1114:50713's 3 items). */
function DottedList({ items }: { items: PrivacyPolicyListItemModel[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item.id} className="flex items-start gap-3 text-base leading-[1.7] text-heading opacity-80">
          <span className="mt-[9px] size-[10px] shrink-0 rounded-full bg-[#b52c2c]" aria-hidden="true" />
          {item.text}
        </li>
      ))}
    </ul>
  );
}

/**
 * Every clause the node draws body copy for, in the node's own
 * top-to-bottom sequence: What qualifies as Personal Data → Lawful
 * Collection and Use of Personal Data (with its 13-item purposes list,
 * 5-item legal-basis list, and 3 bold sub-headings — Registration of
 * data and direct communication / Participation in Panels, with its own
 * 3-item data-sources list / Legal obligations and legal defense).
 */
export function BodySection({ content }: { content: ResolvedPrivacyPolicy }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col gap-10">
          <div id={QUALIFIES_ANCHOR} className="scroll-mt-28">
            <h2 className="text-[28px] font-semibold capitalize leading-[1.2] tracking-[-1px] text-[#a72b31] sm:text-[32px] lg:text-4xl lg:tracking-[-2px]">
              {content.qualifies.heading}
            </h2>
            <div className="mt-6">
              <Paragraphs text={content.qualifies.body} />
            </div>
          </div>

          <div id={LAWFUL_ANCHOR} className="scroll-mt-28">
            <h2 className="text-[28px] font-semibold capitalize leading-[1.2] tracking-[-1px] text-[#a72b31] sm:text-[32px] lg:text-4xl lg:tracking-[-2px]">
              {content.lawful.heading}
            </h2>

            <div className="mt-6 flex flex-col gap-10">
              <Paragraphs text={content.lawful.intro} />

              <NumberedList items={content.lawful.purposesList} />

              <p className="text-base font-semibold leading-[1.9] text-heading opacity-80">{content.lawful.basisIntro}</p>

              <NumberedList items={content.lawful.basisList} />

              <Paragraphs text={content.lawful.closing} />

              <div>
                <h3 className="text-base font-bold leading-[1.9] text-heading opacity-80">{content.registration.heading}</h3>
                <p className="mt-1 text-base leading-[1.9] text-heading opacity-80">{content.registration.body}</p>
              </div>

              <div>
                <h3 className="text-base font-bold leading-[1.9] text-heading opacity-80">{content.panel.heading}</h3>
                <div className="mt-1">
                  <Paragraphs text={content.panel.intro} />
                </div>
                <div className="mt-4">
                  <DottedList items={content.panel.dataSourcesList} />
                </div>
                <p className="mt-4 text-base leading-[1.9] text-heading opacity-80">{content.panel.closing}</p>
              </div>

              <div>
                <h3 className="text-base font-bold leading-[1.9] text-heading opacity-80">{content.legal.heading}</h3>
                <p className="mt-1 text-base leading-[1.9] text-heading opacity-80">{content.legal.body}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

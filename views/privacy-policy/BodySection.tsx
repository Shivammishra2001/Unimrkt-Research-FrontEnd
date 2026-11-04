import type { ReactNode } from 'react';
import { BODY, H2, TRIM } from './text';
import type { ResolvedPrivacyPolicy } from './fallback';
import type { PrivacyPolicyListItemModel } from '@/models/privacyPolicyPage';

// The two TOC anchors that have body copy drawn beneath them.
const QUALIFIES_ANCHOR = 'What-qualifies-as-Personal-Data';
const LAWFUL_ANCHOR = 'What-Constitutes-the-Lawful-Collection-and-Use-of-Personal-Data';

/** Paragraphs with a blank 30.4px line between them, as Figma's text boxes draw them. */
function Paragraphs({ text, className = '' }: { text: string; className?: string }) {
  return (
    <div className={className}>
      {text.split('\n\n').map((p, i) => (
        <p key={i} className={`${BODY} ${i === 0 ? '' : 'mt-[48px]'}`}>
          {p}
        </p>
      ))}
    </div>
  );
}

/** Numbered list at x236 (1114:50681 / 50695): marker outside, text at +24. `gap` is the space between items. */
function NumberedList({ items, gap, leading, trimItems = true, className = '' }: { items: PrivacyPolicyListItemModel[]; gap: string; leading: string; trimItems?: boolean; className?: string }) {
  return (
    <ol className={`flex ml-6 list-decimal flex-col font-sans text-[16px] font-normal text-[#02060e] sm:ml-8 lg:ml-10 lg:mr-2 ${gap} ${className}`}>
      {items.map((item) => (
        <li key={item.id} className={`${leading} opacity-80 ${trimItems ? TRIM : ''}`}>
          {item.text}
        </li>
      ))}
    </ol>
  );
}

function SubHeading({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h3 className={`font-sans text-[16px] font-bold leading-[1.9] text-[#02060e] opacity-80 ${TRIM} ${className}`}>{children}</h3>;
}

/** Every clause the node draws copy for (y1902-4663), laid out as trimmed boxes with the gaps measured in the node. */
export function BodySection({ content }: { content: ResolvedPrivacyPolicy }) {
  return (
    <>
      <h2 id={QUALIFIES_ANCHOR} className={`${H2} mt-12 scroll-mt-28 lg:mt-[66px]`}>
        {content.qualifies.heading}
      </h2>
      <Paragraphs text={content.qualifies.body} className="mt-6 lg:mt-[33px]" />

      <h2 id={LAWFUL_ANCHOR} className={`${H2} mt-12 scroll-mt-28 lg:mt-[69px]`}>
        {content.lawful.heading}
      </h2>
      <Paragraphs text={content.lawful.intro} className="mt-6 lg:mt-[33px]" />

      <NumberedList items={content.lawful.purposesList} gap="gap-6 lg:gap-[33.6px]" leading="leading-[1.9]" className="mt-6 lg:mt-[32px]" />

      <p className={`mt-10 font-sans text-[16px] font-semibold leading-[1.9] text-[#02060e] opacity-80 lg:mt-[67px] ${TRIM}`}>{content.lawful.basisIntro}</p>
      <NumberedList items={content.lawful.basisList} gap="gap-0" leading="leading-[2.6]" trimItems={false} className="mt-1 lg:mt-[17.1px] lg:-mb-[15px]" />

      <Paragraphs text={content.lawful.closing} className="mt-10 lg:mt-[59px]" />

      <SubHeading className="mt-10 lg:mt-[50px]">{content.registration.heading}</SubHeading>
      <p className={`${BODY} mt-4 lg:mt-[26px]`}>{content.registration.body}</p>

      <SubHeading className="mt-10 lg:mt-[42px]">{content.panel.heading}</SubHeading>
      <Paragraphs text={content.panel.intro} className="mt-4 lg:mt-[26px]" />
      <ul className="mt-4 flex flex-col gap-[29.6px] lg:mt-[26px]">
        {content.panel.dataSourcesList.map((item) => (
          <li key={item.id} className={`relative pl-6 font-sans text-[16px] font-semibold leading-[1.7] text-[#02060e] ${TRIM}`}>
            <span className="absolute left-[7px] top-px size-[10px] rounded-full bg-[#b52c2c]" aria-hidden="true" />
            <span className="opacity-80">{item.text}</span>
          </li>
        ))}
      </ul>
      <p className={`${BODY} mt-10 lg:mt-[42px]`}>{content.panel.closing}</p>

      <SubHeading className="mt-10 lg:mt-[57px]">{content.legal.heading}</SubHeading>
      <p className={`${BODY} mt-4 lg:mt-[26px]`}>{content.legal.body}</p>
    </>
  );
}

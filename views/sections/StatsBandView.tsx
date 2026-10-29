import { Section } from '@/views/ui/Section';
import { Heading } from '@/views/ui/Heading';
import { StatsBandList } from './StatsBandList';
import type { StatsBandModel } from '@/models/domain';

/** blocks.stats-band — Figma 268:3744 ("Component 178"): a single vertical
 * stack, one 232px row per stat, 1429px wide, divided by 3px #f0edea rules
 * (none above the first row) — never a multi-column grid at any width.
 * The numerals are Mango Grotesque Bold 160px in Figma; Anton stands in
 * (no free Mango Grotesque), sized to Figma's 118px digit height at 140px
 * and compressed to Figma's glyph width with `scale-x-[0.815]`. The
 * hover/tap expanded state lives in StatsBandList. */
export function StatsBandView({ block }: { block: StatsBandModel; index: number }) {
  return (
    <Section theme={block.theme} anchorId={block.anchorId} className="lg:pb-0 lg:pt-[44px]">
      <div className="mx-auto w-full max-w-[1429px] px-4 sm:px-6 lg:px-0">
        {block.heading && (
          <Heading as="h2" size="h2" className="mb-10">
            {block.heading}
          </Heading>
        )}
        <StatsBandList items={block.items} />
      </div>
    </Section>
  );
}

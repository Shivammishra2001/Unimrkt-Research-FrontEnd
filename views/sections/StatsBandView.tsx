import { Section } from '@/views/ui/Section';
import { Container } from '@/views/ui/Container';
import { Heading } from '@/views/ui/Heading';
import { Reveal } from '@/views/ui/Reveal';
import type { StatsBandModel } from '@/models/domain';

/** blocks.stats-band — giant condensed-numeral band, staggered Reveal per
 * item. `border-t-[3px]`/`divide-y-[3px]` are the design's own thick
 * divider value, not Tailwind's default 1px. Figma node 268:3744
 * ("Component 178") is a single vertical stack — one full-width row per
 * stat, divided by horizontal rules — at every width up to its 1900px
 * canvas, never a side-by-side multi-column grid, so this never switches
 * to a `grid-cols-*` layout at any breakpoint. */
export function StatsBandView({ block }: { block: StatsBandModel; index: number }) {
  return (
    <Section theme={block.theme} anchorId={block.anchorId}>
      <Container>
        {block.heading && (
          <Heading as="h2" size="h2" className="mb-10">
            {block.heading}
          </Heading>
        )}
        <div className="divide-y-[3px] divide-stat-divider border-t-[3px] border-stat-divider">
          {block.items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.1} className="flex flex-wrap items-baseline gap-x-6 gap-y-2 py-10">
              <p className="font-display text-[clamp(3rem,10vw,10rem)] uppercase leading-[0.85] tracking-[1px] text-stat-number">
                {item.value}
              </p>
              <p className="text-sm font-medium uppercase tracking-[0.06em] opacity-70">{item.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

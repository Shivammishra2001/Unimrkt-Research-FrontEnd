import { Section } from '@/views/ui/Section';
import { Container } from '@/views/ui/Container';
import { Heading } from '@/views/ui/Heading';
import { Reveal } from '@/views/ui/Reveal';
import type { StatsBandModel } from '@/models/domain';

/** blocks.stats-band — giant condensed-numeral band, staggered Reveal per
 * item. `border-t-[3px]`/`divide-y-[3px]` are the design's own thick
 * divider value, not Tailwind's default 1px. */
export function StatsBandView({ block }: { block: StatsBandModel; index: number }) {
  return (
    <Section theme={block.theme} anchorId={block.anchorId}>
      <Container>
        {block.heading && (
          <Heading as="h2" size="h2" className="mb-10">
            {block.heading}
          </Heading>
        )}
        <div className="grid divide-y-[3px] divide-stat-divider border-t-[3px] border-stat-divider sm:grid-cols-3 sm:divide-x-[3px] sm:divide-y-0">
          {block.items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.1} className="px-4 py-10 text-center">
              <p className="font-display text-[clamp(3rem,10vw,10rem)] uppercase leading-[0.85] tracking-[1px] text-stat-number">
                {item.value}
              </p>
              <p className="mt-3 text-sm font-medium uppercase tracking-[0.06em] opacity-70">{item.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

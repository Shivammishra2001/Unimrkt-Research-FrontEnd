import { Section } from '@/views/ui/Section';
import { Container } from '@/views/ui/Container';
import { Heading } from '@/views/ui/Heading';
import { Prose } from '@/views/ui/Prose';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { Reveal } from '@/views/ui/Reveal';
import type { FeatureGridModel } from '@/models/domain';

const COLUMN_CLASSES: Record<FeatureGridModel['columns'], string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

/** blocks.feature-grid — heading/subheading + a <ul> grid sized by
 * block.columns. */
export function FeatureGridView({ block }: { block: FeatureGridModel; index: number }) {
  return (
    <Section theme={block.theme} anchorId={block.anchorId}>
      <Container>
        {(block.heading || block.subheading) && (
          <div className="mx-auto max-w-2xl text-center">
            {block.heading && (
              <Heading as="h2" size="h2">
                {block.heading}
              </Heading>
            )}
            {block.subheading && <Prose className="mt-4">{block.subheading}</Prose>}
          </div>
        )}
        <ul className={`mt-12 grid grid-cols-1 gap-8 ${COLUMN_CLASSES[block.columns]}`}>
          {block.items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.05}>
              <li className="flex h-full flex-col gap-4 rounded-xl border border-card-border p-6">
                {item.icon && <StrapiImage image={item.icon} sizes="48px" className="size-12" />}
                <Heading as="h3" size="h3">
                  {item.title}
                </Heading>
                <Prose>{item.description}</Prose>
                {item.link && (
                  <a href={item.link.href} className="mt-auto text-brand-600 underline-offset-4 hover:underline">
                    {item.link.label}
                  </a>
                )}
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

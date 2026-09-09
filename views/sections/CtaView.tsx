import { Section } from '@/views/ui/Section';
import { Container } from '@/views/ui/Container';
import { Heading } from '@/views/ui/Heading';
import { Prose } from '@/views/ui/Prose';
import { Button } from '@/views/ui/Button';
import type { CtaModel } from '@/models/domain';

/** blocks.cta — centered heading/body/actions over an optional low-opacity
 * background image. */
export function CtaView({ block }: { block: CtaModel; index: number }) {
  return (
    <Section
      theme={block.theme}
      anchorId={block.anchorId}
      className="relative overflow-hidden"
      // Inline style beats the theme class's own background-color, so a
      // per-instance backgroundColor overrides just that without touching
      // the shared light/dark/accent tokens every other CTA still uses.
      style={block.backgroundColor ? { backgroundColor: block.backgroundColor } : undefined}
    >
      {block.background && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${block.background.src})` }}
          aria-hidden="true"
        />
      )}
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          {/* Every CTA instance runs on a dark/accent theme (never light) —
           * Heading's own `text-heading` (near-black) otherwise overrides
           * the Section's `text-white`, same fix as ServiceBandView /
           * IndustryGridView apply for the same reason. */}
          <Heading as="h2" size="h2" className="text-white">
            {block.heading}
          </Heading>
          {block.body && <Prose className="mt-4">{block.body}</Prose>}
          {block.actions.length > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {block.actions.map((action) => (
                <Button key={action.id} link={action} variant={action.variant} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}

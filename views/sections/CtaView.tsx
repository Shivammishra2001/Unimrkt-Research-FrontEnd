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
    <Section theme={block.theme} anchorId={block.anchorId} className="relative overflow-hidden">
      {block.background && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${block.background.src})` }}
          aria-hidden="true"
        />
      )}
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Heading as="h2" size="h2">
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

import { Section } from '@/views/ui/Section';
import { Container } from '@/views/ui/Container';
import { Heading } from '@/views/ui/Heading';
import { Prose } from '@/views/ui/Prose';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { ContentModel } from '@/models/domain';

/** blocks.content — heading + body, optional side image. `mediaAlignment:
 * 'none'` skips the two-column grid entirely. */
export function ContentView({ block }: { block: ContentModel; index: number }) {
  const hasMedia = block.mediaAlignment !== 'none' && !!block.media;
  const mediaFirst = block.mediaAlignment === 'left';

  return (
    <Section theme={block.theme} anchorId={block.anchorId}>
      <Container>
        <div className={hasMedia ? 'grid items-center gap-10 lg:grid-cols-2' : 'mx-auto max-w-2xl'}>
          {hasMedia && mediaFirst && block.media && (
            <StrapiImage
              image={block.media}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full rounded-2xl object-cover"
            />
          )}
          <div>
            {block.heading && (
              <Heading as="h2" size="h2">
                {block.heading}
              </Heading>
            )}
            <Prose className="mt-6">{block.body}</Prose>
          </div>
          {hasMedia && !mediaFirst && block.media && (
            <StrapiImage
              image={block.media}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full rounded-2xl object-cover"
            />
          )}
        </div>
      </Container>
    </Section>
  );
}

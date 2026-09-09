import { Section } from '@/views/ui/Section';
import { Container } from '@/views/ui/Container';
import { Heading } from '@/views/ui/Heading';
import { Prose } from '@/views/ui/Prose';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { ContentModel } from '@/models/domain';

/** blocks.content — heading + body, optional image. `mediaAlignment:
 * 'none'` skips media entirely; `'left'`/`'right'` puts it beside the text
 * in a two-column grid; `'below'` (Figma node 267:1307's world-map
 * illustration under "Unlock the Power of Marketplaces") centers the text
 * and runs the image full-width underneath instead. */
export function ContentView({ block }: { block: ContentModel; index: number }) {
  const isBelow = block.mediaAlignment === 'below';
  const hasSideMedia = (block.mediaAlignment === 'left' || block.mediaAlignment === 'right') && !!block.media;
  const mediaFirst = block.mediaAlignment === 'left';

  return (
    <Section theme={block.theme} anchorId={block.anchorId}>
      <Container>
        <div className={hasSideMedia ? 'grid items-center gap-10 lg:grid-cols-2' : 'mx-auto max-w-2xl text-center'}>
          {hasSideMedia && mediaFirst && block.media && (
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
          {hasSideMedia && !mediaFirst && block.media && (
            <StrapiImage
              image={block.media}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full rounded-2xl object-cover"
            />
          )}
        </div>
        {isBelow && block.media && (
          <StrapiImage
            image={block.media}
            sizes="100vw"
            className="mx-auto mt-10 w-full max-w-5xl object-contain"
          />
        )}
        {block.contactPrompt && block.contactEmail && (
          <p className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-3 text-center text-sm opacity-80">
            <span>{block.contactPrompt}</span>
            <a
              href={`mailto:${block.contactEmail}`}
              className="rounded-btn border border-slate-200 px-5 py-2 font-semibold text-brand-600 hover:bg-slate-50"
            >
              {block.contactEmail}
            </a>
          </p>
        )}
      </Container>
    </Section>
  );
}

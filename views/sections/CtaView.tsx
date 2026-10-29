import { Section } from '@/views/ui/Section';
import { Container } from '@/views/ui/Container';
import { Heading } from '@/views/ui/Heading';
import { Prose } from '@/views/ui/Prose';
import { Button } from '@/views/ui/Button';
import { LoopingVideo } from '@/views/ui/LoopingVideo';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { CtaModel } from '@/models/domain';

/** blocks.cta — centered heading/body/actions over an optional background
 * image. A dark CTA with a photo is Figma 267:1459 ("Global Research
 * Panel"): the photo at full strength under a #010913 @75% wash on #0b0c0e,
 * a 50px / -2px heading, medium-weight body at 2.1 leading, and a white
 * button, in a 567px band. Every other CTA keeps the low-opacity backdrop. */
export function CtaView({ block }: { block: CtaModel; index: number }) {
  const isPhotoPanel = block.theme === 'dark' && !!(block.background || block.backgroundVideo);

  if (isPhotoPanel) {
    return (
      <Section
        theme={block.theme}
        anchorId={block.anchorId}
        className="relative overflow-hidden lg:flex lg:min-h-[567px] lg:flex-col lg:!pb-0 lg:!pt-[168px]"
        style={{ backgroundColor: block.backgroundColor ?? '#0b0c0e' }}
      >
        {block.background && (
          <StrapiImage
            image={block.background}
            sizes="100vw"
            fill
            className="object-cover lg:object-[50%_41%]"
          />
        )}
        {block.backgroundVideo && (
          <LoopingVideo
            sources={[{ src: block.backgroundVideo, type: 'video/mp4' }]}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover lg:object-[50%_41%]"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-[#010913]/75" aria-hidden="true" />
        <Container className="relative">
          <div className="mx-auto max-w-[875px] text-center">
            <h2 className="text-3xl font-semibold capitalize !leading-[1.14] tracking-[-0.04em] text-white sm:text-4xl lg:text-[50px]">
              {block.heading}
            </h2>
            {block.body && (
              <p className="mt-3 text-base font-medium leading-[2.1] text-white lg:mt-[12.8px]">{block.body}</p>
            )}
            {block.actions.length > 0 && (
              <div className="mt-8 flex flex-wrap justify-center gap-4 lg:mt-[51px]">
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
      {block.backgroundVideo && (
        <LoopingVideo
          sources={[{ src: block.backgroundVideo, type: 'video/mp4' }]}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
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

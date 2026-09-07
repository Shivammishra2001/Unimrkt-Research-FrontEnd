import { Section } from '@/views/ui/Section';
import { Container } from '@/views/ui/Container';
import { Heading } from '@/views/ui/Heading';
import { Prose } from '@/views/ui/Prose';
import { Button } from '@/views/ui/Button';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { ArrowRightIcon } from '@/views/ui/icons/ArrowRightIcon';
import type { HeroModel } from '@/models/domain';

function HeroMedia({ block, priority }: { block: HeroModel; priority: boolean }) {
  if (block.videoUrl) {
    // eslint-disable-next-line jsx-a11y/media-has-caption -- decorative background/aside footage, no dialogue
    return <video className="w-full rounded-2xl" src={block.videoUrl} autoPlay muted loop playsInline />;
  }
  if (block.media) {
    return (
      <StrapiImage
        image={block.media}
        sizes="(min-width: 1024px) 50vw, 100vw"
        priority={priority}
        className="w-full rounded-2xl object-cover"
      />
    );
  }
  return null;
}

/**
 * blocks.hero — two render branches. `mediaAlignment === 'background'` is a
 * literal, full-bleed clone that intentionally bypasses the shared
 * Heading/Prose/Container atoms in favor of the exact classes this one
 * section needs (its own internal pt-32 Navbar clearance, its own scrim).
 * Every other alignment shares the standard Section/Container/Heading/
 * Prose/Button layout.
 */
export function HeroView({ block, index }: { block: HeroModel; index: number }) {
  if (block.mediaAlignment === 'background') {
    return (
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden text-white">
        {block.videoUrl ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption -- decorative full-bleed backdrop footage
          <video className="absolute inset-0 h-full w-full object-cover" src={block.videoUrl} autoPlay muted loop playsInline />
        ) : block.media ? (
          <StrapiImage image={block.media} sizes="100vw" priority={index === 0} fill className="object-cover" />
        ) : null}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/85 via-black/60 to-black/75" />
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-20">
          <div className="max-w-2xl">
            {block.eyebrow && (
              <p className="font-nav text-sm font-semibold uppercase tracking-[0.08em] text-brand-400">{block.eyebrow}</p>
            )}
            <h1 className="mt-3 text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white lg:max-w-[700px]">
              {block.heading}
            </h1>
            {block.subheading && <p className="mt-6 text-base leading-[1.9] text-white/85 sm:text-lg">{block.subheading}</p>}
            {block.actions.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-4">
                {block.actions.map((action) => (
                  <Button key={action.id} link={action} variant={action.variant} />
                ))}
              </div>
            )}
          </div>
          {block.sideMenu.length > 0 && (
            <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:max-w-3xl">
              {block.sideMenu.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="group flex w-full cursor-pointer items-center justify-between rounded-full border border-white/15 bg-white/[0.08] px-6 py-4 shadow-lg shadow-black/20 backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:bg-white/[0.18]"
                >
                  <span className="font-sans text-sm font-medium">{item.label}</span>
                  <ArrowRightIcon
                    className="size-5 shrink-0 text-white transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  const hasMedia = !!block.media || !!block.videoUrl;
  const mediaFirst = block.mediaAlignment === 'left';

  return (
    <Section theme={block.theme} anchorId={block.anchorId}>
      <Container>
        <div className={hasMedia ? 'grid items-center gap-10 lg:grid-cols-2' : 'mx-auto max-w-2xl text-center'}>
          {hasMedia && mediaFirst && <HeroMedia block={block} priority={index === 0} />}
          <div>
            {block.eyebrow && (
              <p className="font-nav text-sm font-semibold uppercase tracking-[0.08em] text-brand-600">{block.eyebrow}</p>
            )}
            {/* headingSize 'h2' overrides the shared h2 default -3px tracking to -1px —
                only the seeded "Global Research, Local Understanding" hero uses this. */}
            <Heading
              as={index === 0 ? 'h1' : 'h2'}
              size={block.headingSize === 'h2' ? 'h2' : 'display'}
              className={`mt-3 ${block.headingSize === 'h2' ? '!tracking-[-1px]' : ''}`}
            >
              {block.heading}
            </Heading>
            {block.subheading && <Prose className="mt-6">{block.subheading}</Prose>}
            {block.actions.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-4">
                {block.actions.map((action) => (
                  <Button key={action.id} link={action} variant={action.variant} />
                ))}
              </div>
            )}
          </div>
          {hasMedia && !mediaFirst && <HeroMedia block={block} priority={index === 0} />}
        </div>
      </Container>
    </Section>
  );
}

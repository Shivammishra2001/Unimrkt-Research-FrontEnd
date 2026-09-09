import { Section } from '@/views/ui/Section';
import { Container } from '@/views/ui/Container';
import { Heading } from '@/views/ui/Heading';
import { Prose } from '@/views/ui/Prose';
import { Button } from '@/views/ui/Button';
import { StrapiImage } from '@/views/ui/StrapiImage';
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
        <div className="relative z-20 flex w-full max-w-7xl mx-auto items-start justify-between gap-10 px-6 sm:px-12 pt-32 sm:pt-36 pb-20">
          <div className="max-w-[748px]">
            {block.eyebrow && (
              <p className="inline-flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 px-[17px] py-[9px] backdrop-blur-[2px] font-sans text-[13px] font-bold uppercase tracking-[3px] text-white">
                <span className="size-2 shrink-0 rounded-full bg-brand-600" aria-hidden="true" />
                {block.eyebrow}
              </p>
            )}
            {/* Figma node 267:1301: text-[60px]/font-semibold/tracking-[-3px]/
                leading-[1.2] in a 748px box — matching those exactly (not the
                font-extrabold/tracking-tight this had before) is what makes a
                heading this length actually wrap to Figma's two lines instead
                of four; a heavier weight or looser tracking simply doesn't
                fit as much text per line at the same size. */}
            <h1 className="mt-3 capitalize text-4xl sm:text-5xl lg:text-[60px] font-semibold lg:tracking-[-3px] leading-[1.2] text-white">
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
          {/* Figma node 268:5909-5915 — a vertical list sitting inside the
              lighthouse's light beam, not a grid of pill buttons.
              `isActive` (from the CMS, `blocks.service-band-item`) decides
              which item renders in the bold/full-size/arrow state at rest,
              matching Figma's frozen mockup; hovering any item previews
              that same state on it too, so the list stays interactive
              without needing JS state. Hidden below xl: it has nowhere to
              go once the two-column layout collapses and the beam itself
              is off-screen. */}
          {block.sideMenu.length > 0 && (
            <ul className="hidden shrink-0 flex-col gap-4 pt-2 xl:flex">
              {block.sideMenu.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={`group flex items-center justify-end gap-3 py-1 capitalize font-bold tracking-[-1px] transition-all duration-200 hover:text-white ${item.isActive ? 'text-white' : 'text-white/25'}`}
                  >
                    <span
                      className={`size-0 shrink-0 border-y-[8px] border-l-[12px] border-y-transparent border-l-brand-600 transition-opacity duration-200 group-hover:opacity-100 ${item.isActive ? 'opacity-100' : 'opacity-0'}`}
                      aria-hidden="true"
                    />
                    <span
                      className={`leading-[1.2] transition-all duration-200 group-hover:text-[34px] ${item.isActive ? 'text-[34px]' : 'text-[24px]'}`}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    );
  }

  if (block.mediaAlignment === 'below') {
    // Figma node 267:1306 ("Global Research, Local Understanding"): a
    // centered eyebrow + heading, a full-width banner image underneath,
    // then a two-column row below THAT — a giant stat callout on the
    // left, the subheading paragraph + CTA on the right. Distinct enough
    // from the shared left/right two-column layout below that it isn't
    // worth forcing through the same branch.
    const hasStat = !!block.statValue;
    return (
      <Section theme={block.theme} anchorId={block.anchorId}>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            {block.eyebrow && (
              <p className="font-nav text-sm font-semibold uppercase tracking-[0.08em] text-brand-600">{block.eyebrow}</p>
            )}
            <Heading as={index === 0 ? 'h1' : 'h2'} size={block.headingSize === 'h2' ? 'h2' : 'display'} className="mt-3">
              {block.heading}
            </Heading>
          </div>
          {(block.media || block.videoUrl) && (
            <div className="mt-10">
              <HeroMedia block={block} priority={index === 0} />
            </div>
          )}
          {(hasStat || block.subheading || block.actions.length > 0) && (
            <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
              {hasStat && (
                <div className="flex items-start justify-center gap-3 lg:justify-start">
                  <span className="font-display text-[clamp(4rem,9vw,9rem)] uppercase leading-[0.85] tracking-[1px] text-heading">
                    {block.statValue}
                  </span>
                  {block.statLabel && (
                    <span className="mt-2 max-w-[3em] text-xs font-semibold uppercase tracking-[0.06em] opacity-70">
                      {block.statLabel}
                    </span>
                  )}
                </div>
              )}
              <div className={hasStat ? '' : 'lg:col-span-2 mx-auto max-w-2xl text-center'}>
                {block.subheading && <Prose>{block.subheading}</Prose>}
                {block.actions.length > 0 && (
                  <div className="mt-8 flex flex-wrap gap-4">
                    {block.actions.map((action) => (
                      <Button key={action.id} link={action} variant={action.variant} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </Container>
      </Section>
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

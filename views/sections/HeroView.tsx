import fs from 'node:fs';
import path from 'node:path';
import { Section } from '@/views/ui/Section';
import { Container } from '@/views/ui/Container';
import { Heading } from '@/views/ui/Heading';
import { Prose } from '@/views/ui/Prose';
import { Button } from '@/views/ui/Button';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { geometry } from '@/views/ui/stage';
import { LoopingVideo, type VideoSource } from '@/views/ui/LoopingVideo';
import { HeroSplash } from './HeroSplash';
import type { HeroModel } from '@/models/domain';

/** Formats looked up for a drop-in video, best first (webm is smaller; mp4 is the Safari/iOS fallback). */
const VIDEO_FORMATS = [
  { ext: 'webm', type: 'video/webm' },
  { ext: 'mp4', type: 'video/mp4' },
] as const;

/**
 * Server-side: the `public/videos/<name>.{webm,mp4}` files that exist, so a
 * video can be dropped in without touching code or the CMS.
 *   0_Lighthouse_Light_1920x1080.* / hero-background.*  → home hero backdrop
 *   about-banner.*     → "Global Research, Local Understanding" banner
 * With several names, the first one that has any file wins.
 */
function findStaticVideos(...names: string[]): VideoSource[] {
  const dir = path.join(process.cwd(), 'public', 'videos');
  for (const name of names) {
    const found = VIDEO_FORMATS.filter(({ ext }) => fs.existsSync(path.join(dir, `${name}.${ext}`))).map(({ ext, type }) => ({
      src: `/videos/${name}.${ext}`,
      type,
    }));
    if (found.length > 0) return found;
  }
  return [];
}

/** Figma 267:1249/1250/1251 inside the 930.526x719.727 group, as % of it (back to front). */
const CATI_PEOPLE = [
  { src: '/figma-home/cati/p109.webp', l: 0, t: 3.457, w: 43.827, h: 96.543, il: -110.42, it: -16.42, iw: 297.62, ih: 116.42 },
  { src: '/figma-home/cati/p110.webp', l: 64.98, t: 2.78, w: 35.02, h: 97.22, il: -111.54, it: -3.4, iw: 265.25, ih: 103.4 },
  { src: '/figma-home/cati/p108.webp', l: 32.12, t: 0, w: 46.56, h: 100, il: -94.12, it: -12.39, iw: 280.11, ih: 112.39 },
] as const;

function HeroMedia({ block, priority }: { block: HeroModel; priority: boolean }) {
  if (block.videoUrl) {
    // eslint-disable-next-line jsx-a11y/media-has-caption -- decorative background/aside footage, no dialogue
    return <video className="w-full rounded-2xl" src={block.videoUrl} autoPlay muted loop playsInline preload="metadata" />;
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
    // Video source priority: Figma's own footage file name (layer 1794:16929),
    // then the generic hero-background.{webm,mp4}, then a video uploaded to the
    // block's `media` field in Strapi, else the photo.
    const staticVideos = findStaticVideos('0_Lighthouse_Light_1920x1080', 'hero-background');
    const videoSources = staticVideos.length > 0 ? staticVideos : block.videoUrl ? [{ src: block.videoUrl }] : [];
    return <HeroSplash block={block} index={index} videoSources={videoSources} />;
  }

  if (block.mediaAlignment === 'below') {
    // Figma 267:1306 ("Global Research, Local Understanding"): a centered
    // eyebrow + heading over a wave texture, a 1227px tinted banner, then a
    // row below it — giant "16" + rotated label on the left, a hairline
    // divider, then the paragraph + CTA on the right.
    const hasStat = !!block.statValue;
    // Banner footage: Figma's own file name (layer 267:1482), then the generic
    // about-banner.{webm,mp4}, else a video uploaded to the block's `media` in Strapi, else the photo.
    const staticBanner = findStaticVideos('6012918_People_Person_1920x1080', 'about-banner');
    const bannerVideo: VideoSource[] = staticBanner.length > 0 ? staticBanner : block.videoUrl ? [{ src: block.videoUrl }] : [];
    const headingLines = block.heading.split(/(?<=,)\s+/);
    return (
      <Section theme={block.theme} anchorId={block.anchorId} className="relative scroll-mt-[130px] overflow-hidden pt-24 sm:pt-28 lg:pb-[70px] lg:pt-[96px] min-[1800px]:pt-[73px]">
        {/* Figma 267:1304: wave texture, 50% opacity, 3222x1410 centered 81px above the section middle. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figma-home/waves-texture.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-[calc(50%+11.56px)] top-[calc(50%-81px)] h-[1410px] w-[3222px] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover opacity-50"
        />
        <div className="relative mx-auto flex w-full max-w-[1227px] flex-col px-4 sm:px-6 lg:px-8 min-[1300px]:px-0">
          <div className="text-center">
            {block.eyebrow && (
              <p className="font-sans text-[13px] font-bold uppercase leading-[1.2] tracking-[3px] text-brand-600">
                {block.eyebrow}
              </p>
            )}
            <Heading
              as={index === 0 ? 'h1' : 'h2'}
              size="h2"
              className="mt-2 lg:!tracking-[-1px]"
            >
              {headingLines.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </Heading>
          </div>
          <div className="w-full">
          {(bannerVideo.length > 0 || block.media) && (
            <div className="relative mt-[30px] aspect-[1227/571] overflow-hidden rounded-[4px] bg-gradient-to-r from-[#63284f] to-[#c75e4a]">
              {bannerVideo.length > 0 ? (
                // Figma 267:1478/1479/1482: footage at 80% over the #63284f→#c75e4a
                // gradient in a 1227x571 / 4px-radius frame. The 16:9 footage is not
                // simply object-cover'd: Figma scales it to 1465x824 and offsets it
                // 196px left / 56px up — kept as % of the frame so the crop holds at
                // every width. The CMS photo is already cropped to that framing, so
                // it is the fade-out `fallback`, not the <video> poster (which would
                // get zoomed a second time).
                <LoopingVideo
                  sources={bannerVideo}
                  className="absolute left-[-15.974%] top-[-9.807%] h-[144.308%] w-[119.397%] max-w-none object-cover opacity-80"
                  fallback={
                    block.media ? (
                      <StrapiImage
                        image={block.media}
                        sizes="(min-width: 1280px) 1227px, 100vw"
                        priority={index === 0}
                        fill
                        className="object-cover opacity-80"
                      />
                    ) : undefined
                  }
                />
              ) : block.media ? (
                <StrapiImage
                  image={block.media}
                  sizes="(min-width: 1280px) 1227px, 100vw"
                  priority={index === 0}
                  fill
                  className="object-cover opacity-80"
                />
              ) : null}
            </div>
          )}
          {(hasStat || block.subheading || block.actions.length > 0) && (
            <div className="mt-[43px] grid gap-10 lg:grid-cols-[484px_1fr] lg:gap-x-0">
              {hasStat && (
                <div className="flex items-start justify-center gap-[10px] lg:justify-start lg:gap-[35px] lg:pl-[82px]">
                  <span className="w-[0.78em] shrink-0 text-center font-[Arial,Helvetica,sans-serif] text-[clamp(8rem,15.8vw,300px)] uppercase leading-[0.85] tracking-[-0.1667em] text-black">
                    {block.statValue}
                  </span>
                  {block.statLabel && (
                    <span className="mt-[18px] h-[165px] shrink-0 rotate-180 font-nav text-[17px] font-semibold uppercase leading-[1.4] text-black [writing-mode:vertical-rl]">
                      {block.statLabel}
                    </span>
                  )}
                </div>
              )}
              <div className={`relative ${hasStat ? 'lg:pl-[58px]' : 'lg:col-span-2 mx-auto max-w-2xl text-center'}`}>
                {hasStat && (
                  <span aria-hidden="true" className="absolute left-0 top-[2px] hidden h-[240px] w-px bg-black/20 lg:block" />
                )}
                {block.subheading && <Prose className="max-w-[605px] text-heading">{block.subheading}</Prose>}
                {block.actions.length > 0 && (
                  <div className="mt-[46px] flex flex-wrap gap-4">
                    {block.actions.map((action) => (
                      <Button key={action.id} link={action} variant={action.variant} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          </div>
        </div>
      </Section>
    );
  }

  if (block.mediaAlignment === 'left') {
    const waveVideo = findStaticVideos('2535858_Wave_Background_1920x1080');
    // Figma 267:1305 ("500+ Advanced CATI Workstations"): a 1900x855 canvas —
    // a faint luminosity wave texture, three cut-out people on the left, and
    // the text column at x=1095. Fixed composition from lg up (scaled with
    // container units, see views/ui/stage.ts); stacked below.
    return (
      <Section
        theme={block.theme}
        anchorId={block.anchorId}
        className="relative overflow-hidden lg:!py-0 lg:[container-type:inline-size]"
      >
        {/* Wave texture layer (Figma: 10% luminosity). The footage drops in as
            public/videos/2535858_Wave_Background_1920x1080.mp4; the static
            wave PNG is the poster while it buffers and for reduced motion. */}
        {waveVideo.length > 0 ? (
          <div className="pointer-events-none absolute left-0 top-0 z-0 h-full w-full overflow-hidden lg:h-[56.2632cqw]" aria-hidden="true">
            <LoopingVideo
              sources={waveVideo}
              poster="/figma-home/cati-wave.png"
              className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-10 mix-blend-luminosity"
            />
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/figma-home/cati-wave.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-0 h-full w-full object-cover opacity-10 mix-blend-luminosity lg:h-[56.2632cqw]"
          />
        )}
        <div className="relative z-10 mx-auto grid max-w-3xl gap-10 px-4 sm:px-6 lg:block lg:h-[44.8421cqw] lg:max-w-none lg:px-0">
          {(block.media || block.videoUrl) && (
            <div
              className="relative aspect-[931/720] w-full lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:w-[var(--w)]"
              style={geometry({ l: 72, t: 149, w: 930.5 })}
            >
              {block.videoUrl ? (
                // eslint-disable-next-line jsx-a11y/media-has-caption -- decorative footage
                <video className="absolute inset-0 h-full w-full object-contain" src={block.videoUrl} autoPlay muted loop playsInline preload="metadata" />
              ) : (
                // Figma 267:1248: three separate transparent cut-outs (the CMS
                // `media` PNG has a white backdrop baked in and would mask the
                // wave footage), placed in a 930.5x719.7 group, back to front.
                CATI_PEOPLE.map((p) => (
                  <div
                    key={p.src}
                    className="absolute overflow-hidden"
                    style={{ left: `${p.l}%`, top: `${p.t}%`, width: `${p.w}%`, height: `${p.h}%` }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.src}
                      alt=""
                      className="absolute max-w-none"
                      style={{ left: `${p.il}%`, top: `${p.it}%`, width: `${p.iw}%`, height: `${p.ih}%` }}
                    />
                  </div>
                ))
              )}
            </div>
          )}
          <div
            className="lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:w-[var(--w)]"
            style={geometry({ l: 1095, t: 341, w: 700 })}
          >
            {block.eyebrow && (
              <p className="font-nav text-sm font-semibold uppercase tracking-[0.08em] text-brand-600">{block.eyebrow}</p>
            )}
            <h2
              className="text-4xl font-semibold capitalize !leading-[1.2] tracking-[-0.05em] text-heading lg:max-w-[var(--w)] lg:text-[length:var(--fs)]"
              style={geometry({ w: 522, fs: 60 })}
            >
              {block.heading}
            </h2>
            {block.subheading && (
              <p
                className="mt-4 text-base leading-[1.9] text-heading opacity-80 lg:mt-[0.47cqw] lg:max-w-[var(--w)] lg:text-[length:var(--fs)]"
                style={geometry({ w: 627, fs: 16 })}
              >
                {block.subheading}
              </p>
            )}
            {block.actions.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-4 lg:mt-[2.47cqw]">
                {block.actions.map((action) => (
                  <Button key={action.id} link={action} variant={action.variant} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>
    );
  }

  const hasMedia = !!block.media || !!block.videoUrl;

  return (
    <Section theme={block.theme} anchorId={block.anchorId}>
      <Container>
        <div className={hasMedia ? 'grid items-center gap-10 lg:grid-cols-2' : 'mx-auto max-w-2xl text-center'}>
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
          {hasMedia && <HeroMedia block={block} priority={index === 0} />}
        </div>
      </Container>
    </Section>
  );
}

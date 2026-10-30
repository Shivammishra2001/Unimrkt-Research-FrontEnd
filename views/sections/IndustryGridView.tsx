import { Button } from '@/views/ui/Button';
import { LoopingVideo } from '@/views/ui/LoopingVideo';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { ScrollArrows } from '@/views/ui/ScrollArrows';
import { geometry } from '@/views/ui/stage';
import type { IndustryGridModel } from '@/models/domain';

const TRACK_ID = 'industry-grid-track';

/** blocks.industry-grid — Figma 267:1440 ("Industries We Serve"), a 1900x977
 * canvas: a 1742x657 rounded dark cityscape panel on a white-to-#f7f7f4
 * ground, with a row of #7f3856 cards overlapping the panel's bottom edge
 * and round prev/next arrows at either end. From lg up it is scaled with
 * container units (views/ui/stage.ts); below lg it stacks. Every real
 * seeded card shares the same accentColor (#7f3856). */
export function IndustryGridView({ block }: { block: IndustryGridModel; index: number }) {
  return (
    <section
      id={block.anchorId}
      className="relative overflow-hidden bg-[linear-gradient(to_bottom,#fff_35.5%,#f7f7f4_55.3%)] lg:[container-type:inline-size]"
    >
      <div className="relative px-4 py-12 sm:px-6 lg:h-[51.4211cqw] lg:p-0">
        {/* Panel: #03121e, cityscape @40%, #010913 @20%, darkening gradient on the left. */}
        <div
          className="relative overflow-hidden rounded-[30px] bg-[#03121e] p-6 sm:p-10 lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:h-[var(--h)] lg:w-[var(--w)] lg:rounded-[2.6316cqw] lg:p-0"
          style={geometry({ l: 78, t: 0, w: 1742, h: 660 })}
        >
          {block.background && (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 lg:[background-position:-2.5263cqw_-10.1053cqw] lg:[background-size:96.7437cqw_auto]"
              style={{ backgroundImage: `url(${block.background.src})` }}
              aria-hidden="true"
            />
          )}
          {block.backgroundVideo && (
            <LoopingVideo
              sources={[{ src: block.backgroundVideo, type: 'video/mp4' }]}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-[#010913]/20" aria-hidden="true" />
          {/* Figma 267:1445: a rotated gradient rect over the panel's left 787px —
              transparent at x=865, #06070d from 63% in, @65% opacity. */}
          <div
            className="absolute inset-y-0 left-0 w-[45.18%] bg-[linear-gradient(to_left,rgba(6,7,13,0),#06070d_63%)] opacity-65"
            aria-hidden="true"
          />
          <div
            className="relative lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:w-[var(--w)]"
            style={geometry({ l: 107, t: 125, w: 700 })}
          >
            <h2
              className="text-3xl font-semibold capitalize !leading-[1.15] tracking-[-0.04em] text-white sm:text-4xl lg:text-[length:var(--fs)]"
              style={geometry({ fs: 50 })}
            >
              {block.heading}
            </h2>
            {block.subheading && (
              <p
                className="mt-4 max-w-[513px] text-base font-medium leading-[1.9] text-white lg:mt-[0.58cqw] lg:max-w-[27cqw] lg:text-[length:var(--fs)]"
                style={geometry({ fs: 16 })}
              >
                {block.subheading}
              </p>
            )}
            {block.cta && (
              <div className="mt-6 lg:mt-[2.45cqw]">
                <Button link={block.cta} variant="secondary" />
              </div>
            )}
          </div>
        </div>

        <div
          id={TRACK_ID}
          className="relative mt-8 grid gap-6 sm:grid-cols-2 lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:mt-0 lg:flex lg:w-[var(--w)] lg:gap-[1.4211cqw] lg:overflow-x-auto lg:[scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden"
          style={geometry({ l: 150, t: 471, w: 1601 })}
        >
          {block.items.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[380/399] overflow-hidden rounded-[30px] transition-transform hover:-translate-y-1 lg:w-[20cqw] lg:shrink-0 lg:rounded-[1.5789cqw]"
              style={{ backgroundColor: item.accentColor }}
            >
              {/* Figma 113:1011: image area inset 10px / 10px / 93px, radius 27, black overlay @20%. */}
              <div className="absolute inset-x-[2.63%] top-[2.51%] bottom-[23.31%] overflow-hidden rounded-[27px] bg-white lg:rounded-[1.42cqw]">
                {item.image && (
                  <StrapiImage image={item.image} sizes="(min-width: 1024px) 20vw, 50vw" fill className="object-cover" />
                )}
                <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
                {item.description && (
                  // Figma 363:6474 (hover variant): the image area becomes a white card with the
                  // description centered (Montserrat Medium 16 / 1.9, #0b042a, 40px side padding,
                  // 279px measure) over a 10% #521e4f logo watermark. 300ms ease-in-out fade.
                  <div className="absolute inset-0 flex items-center justify-center bg-white px-[11.1%] py-[6%] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                    <span
                      className="absolute left-[23.89%] top-[29.39%] h-[43.58%] w-[55%] bg-[#521e4f] opacity-10 [mask-image:url(/figma-home/industry-hover-watermark.png)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
                      aria-hidden="true"
                    />
                    <p
                      className="relative w-full max-w-[77.5%] text-center text-base font-medium leading-[1.9] text-[#0b042a] lg:text-[length:var(--fs)]"
                      style={geometry({ fs: 16 })}
                    >
                      {item.description}
                    </p>
                  </div>
                )}
              </div>
              <h3
                className="absolute inset-x-[10%] top-[84.5%] text-center font-sans text-[18px] font-semibold capitalize leading-[1.15] text-white lg:text-[length:var(--fs)]"
                style={geometry({ fs: 18 })}
              >
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        <div className="hidden lg:block">
          <ScrollArrows
            targetId={TRACK_ID}
            leftClassName="lg:absolute lg:left-[var(--l)] lg:top-[var(--t)]"
            rightClassName="lg:absolute lg:left-[var(--l)] lg:top-[var(--t)]"
            leftStyle={geometry({ l: 85, t: 694 })}
            rightStyle={geometry({ l: 1771, t: 694 })}
          />
        </div>
      </div>
    </section>
  );
}

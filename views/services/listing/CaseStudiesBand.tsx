import Image from 'next/image';
import Link from 'next/link';
import { SendArrowIcon } from '@/views/ui/icons/SendArrowIcon';
import type { ServicesListingContent } from './content';

const TEXTURE = '/images/industries/texture.jpg';
/** px on the 671x593 collage (Figma x992-1663, y6934-7527) -> cqw of the collage box. */
const u = (px: number) => `${((px / 671) * 100).toFixed(4)}cqw`;

/** "Turning Research Into Real-World Impact" — Figma 1231:77410 (y6907-7569). A 1600x662 r50 #6c2a4a -> #be2c28 band with
 * the gradient wallpaper and dot texture at 20% (luminosity). Left, from x+94: the #0a1220 "Case Studies" tag (12px
 * SemiBold, 2.88px tracking) at +165, the 60/72px white title (Inter SemiBold, -1px), a 2-line 14/26.6px line @ 80%
 * (655px) and the 281x60 white button at +447. Right, a 671x593 collage from x+842: the 324x189 #101723 "50k +" card,
 * the 324x190 #e5edee "500+" card, the 671x345 #fef8f1 panel, the cut-out man (456x593) standing in front of all three
 * and the 142x151 analysis widget. The collage scales as a unit (cqw); below lg it moves under the copy. */
export function CaseStudiesBand({ content }: { content: ServicesListingContent['caseBand'] }) {
  const [projects, clients] = content.stats;
  return (
    <section className="bg-white px-4 pt-16 sm:px-6 lg:px-8 lg:pt-[67px] min-[1700px]:px-0">
      <div className="relative mx-auto w-full max-w-[1600px] overflow-hidden rounded-[30px] bg-gradient-to-r from-gradient-from to-gradient-to [container-type:inline-size] lg:rounded-[50px]">
        {/* Figma 1231:77412 is the plain #6c2a4a -> #be2c28 left-to-right gradient. Its wallpaper/texture group (1231:77413, 20%
            luminosity) sits at x=1750, outside the 1900px frame, so Figma never shows it — no overlay here either. */}

        <div className="relative flex flex-col gap-10 px-6 pb-10 pt-12 sm:px-10 lg:min-h-[41.375cqw] lg:px-0 lg:pb-[4cqw] lg:pl-[5.875cqw] lg:pt-[10.3125cqw]">
          <div className="lg:max-w-[42cqw]">
            <p className="inline-flex h-[28px] items-center rounded-[2px] bg-[#0a1220] pl-[10px] pr-[7.12px] font-sans text-[12px] font-semibold uppercase leading-none tracking-[2.88px] text-white">
              {content.eyebrow}
            </p>
            <h2 className="mt-[3px] font-nav text-[32px] font-semibold capitalize leading-[1.2] tracking-[-1px] text-white sm:text-[46px] lg:text-[clamp(36px,3.75cqw,60px)]">
              {content.heading.split('\n').map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-[8px] max-w-[655px] font-sans text-[14px] font-normal leading-[1.9] text-white opacity-90">{content.body}</p>
            <div className="mt-8 lg:mt-[46px]">
              <Link
                href={content.cta.href}
                className="inline-flex h-[60px] items-center justify-center gap-1 rounded-[4px] bg-white px-10 font-sans text-[13px] font-bold uppercase leading-[16.9px] tracking-[0.78px] text-[#0a1220] transition-colors duration-300 ease-in-out hover:bg-slate-100 motion-reduce:transition-none"
              >
                {content.cta.label}
                <SendArrowIcon className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Collage — under the copy on phones/tablets; from lg at x+842, 42px above the band bottom (= y+27 at the exact 662px height),
              so when laptop copy makes the band taller the man still stands near its lower edge. */}
          <div className="relative mx-auto aspect-[671/593] w-full max-w-[560px] [container-type:inline-size] lg:absolute lg:bottom-[2.625cqw] lg:left-[52.625cqw] lg:mx-0 lg:w-[41.9375cqw] lg:max-w-none">
            {/* Cards: a base rect (#000817 / #e5edee / #d9d9d9), the card fill on top, and the dot texture at its Figma crop. */}
            <div className="absolute overflow-hidden bg-[#000817]" style={{ left: 0, top: u(42), width: u(324), height: u(190), borderRadius: u(30) }}>
              <div className="absolute inset-x-0 top-0 overflow-hidden bg-[#101723]" style={{ height: u(189.15), borderRadius: u(30) }}>
                <Image src={TEXTURE} alt="" width={1626} height={813} sizes="430px" className="absolute left-[-16.1%] top-[-6.72%] h-[113.22%] w-[132.2%] max-w-none mix-blend-color-burn" />
              </div>
            </div>
            <div className="absolute overflow-hidden bg-[#e5edee]" style={{ left: u(340), top: u(42), width: u(324), height: u(190), borderRadius: u(30) }}>
              <Image src={TEXTURE} alt="" width={1626} height={813} sizes="470px" className="absolute left-[-21.88%] top-[-11.3%] h-[122.55%] w-[143.74%] max-w-none opacity-50 mix-blend-multiply" />
            </div>
            <div className="absolute overflow-hidden bg-[#d9d9d9]" style={{ left: 0, top: u(248), width: u(671), height: u(345), borderRadius: u(30) }}>
              <div className="absolute inset-0 bg-[#fef8f1]">
                <Image src={TEXTURE} alt="" width={1626} height={813} sizes="900px" className="absolute left-[-17.31%] top-[-15.47%] h-[130.88%] w-[134.59%] max-w-none opacity-50 mix-blend-multiply" />
              </div>
            </div>

            {projects && (
              <div className="absolute text-white" style={{ left: u(35), top: u(61.6), width: u(200) }}>
                <p className="font-sans font-semibold capitalize leading-[1.2] tracking-[-0.0577em] whitespace-nowrap" style={{ fontSize: u(52) }}>{projects.value}</p>
                <p className="font-sans font-semibold capitalize leading-[1.2]" style={{ fontSize: `max(10px, ${u(16)})`, marginTop: u(3.7) }}>{projects.label}</p>
                {projects.caption && <p className="hidden font-sans font-normal leading-[1.4] opacity-80 sm:block lg:hidden xl:block" style={{ fontSize: `max(10px, ${u(12)})`, marginTop: u(8.6), width: u(180) }}>{projects.caption}</p>}
              </div>
            )}
            {clients && (
              <div className="absolute flex flex-col items-end text-right text-[#000817]" style={{ right: u(35), top: u(61.6), width: u(200) }}>
                <p className="font-sans font-semibold capitalize leading-[1.2] tracking-[-0.0577em] whitespace-nowrap" style={{ fontSize: u(52) }}>{clients.value}</p>
                <p className="font-sans font-normal leading-[1.4] opacity-80" style={{ fontSize: `max(9px, ${u(12)})`, marginTop: u(3.7), width: `max(84px, ${u(131)})` }}>{clients.label}</p>
              </div>
            )}

            <div className="pointer-events-none absolute overflow-hidden" style={{ left: u(115), top: 0, width: u(456), height: u(593) }} aria-hidden="true">
              <Image src="/images/services/listing/case-person.webp" alt="" width={1400} height={933} sizes="(min-width: 1024px) 900px, 760px" className="absolute left-[-83.79%] top-0 h-full w-[195.31%] max-w-none" />
            </div>
            <Image src="/images/services/listing/case-analysis.png" alt="" width={284} height={303} className="absolute" style={{ left: u(459), top: u(411), width: u(142), height: u(151.43) }} />
          </div>
        </div>
      </div>
    </section>
  );
}

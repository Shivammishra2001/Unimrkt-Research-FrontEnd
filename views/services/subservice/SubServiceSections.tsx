import Image from 'next/image';
import { EYEBROW_CLASS, H2_CLASS, BODY_CLASS, SectionHeader } from '@/views/industries/listing/shared';
import { lato } from '@/views/services/fonts';
import { CRED_ICONS } from '@/views/services/detail/CredentialsSection';
import { DetailCardIcon } from '@/views/ui/detail/DetailCardIcon';
import type { SubServiceContent } from './content';

const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

/** "Research Built Around Every Conversation" — Figma 859:15301 (y828-1231, #f9f9f7). 24px SemiBold heading, then four
 * 320x248 cards 30px apart from +96: white @ 65%, 1px #e2e2e0, r19, 24px blur; an 80px white @ 80% disc (1px #a3282a
 * @ 10%) holding the 44px icon, the 25px Bold value and the 16px label. Four across from 1024px, two below. */
export function StatsSection({ stats }: { stats: SubServiceContent['stats'] }) {
  return (
    <section className="bg-[#f9f9f7] px-4 py-12 sm:px-6 lg:px-8 lg:pb-[59px] lg:pt-[42px]">
      <h2 className="text-center font-sans text-[22px] font-semibold capitalize leading-[1.2] text-[#02060e] sm:text-[24px]">{stats.heading}</h2>
      <ul className="mx-auto mt-8 grid w-full max-w-[1370px] grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:mt-[25px] lg:grid-cols-4 lg:gap-[30px]">
        {stats.items.map((item, i) => (
          <li
            key={`${item.label}-${i}`}
            className="flex min-h-[220px] flex-col items-center rounded-[19px] border border-[#e2e2e0] bg-white/65 px-4 pb-8 pt-[30px] text-center backdrop-blur-[24px] lg:min-h-[248px]"
          >
            <span className="flex size-[80px] shrink-0 items-center justify-center rounded-full border border-[#a3282a]/10 bg-white/80">
              {item.icon ? (
                <Image src={item.icon} alt="" width={44} height={44} className="size-[44px]" />
              ) : item.iconIdentifier === 'rupee' ? (
                <span className="font-sans text-[34px] font-medium leading-none text-[#292d32]">₹</span>
              ) : item.iconIdentifier && CRED_ICONS.has(item.iconIdentifier) ? (
                <Image src={`/icons/services/detail/cred-${item.iconIdentifier}.svg`} alt="" width={44} height={44} className="size-[44px]" />
              ) : (
                <DetailCardIcon iconIdentifier={item.iconIdentifier} className="size-[44px] text-[#a3282a]" />
              )}
            </span>
            <p className="mt-[13px] font-sans text-[22px] font-bold leading-[1.2] text-[#04264e] sm:text-[25px]">{item.value}</p>
            <p className="mt-[6px] font-sans text-[16px] font-normal leading-[1.4] text-[#02060e]">{item.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** "What Are Telephonic Surveys?" — Figma (y1231-1954, white). Left (x150): eyebrow, 50/60 title (494px, 2 lines),
 * 16/30.4 body @ 80% (833px, three paragraphs). Right: the 673x541 r30 photo (#01040c) at x1077, y+91. The same column
 * grid as the Level-2 "About" block. */
export function IntroSection({ intro }: { intro: SubServiceContent['intro'] }) {
  const paragraphs = intro.body.split(/\n\s*\n/).filter(Boolean);
  return (
    <section className="bg-white py-16 lg:py-[91px]">
      <div className="mx-auto grid w-full max-w-[1664px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,833fr)_minmax(0,673fr)] lg:gap-x-[clamp(32px,4.95vw,94px)] lg:px-8 min-[1700px]:max-w-[1600px] min-[1700px]:px-0">
        <div className="min-w-0">
          <p className={`${EYEBROW_CLASS} text-[#cc1f1f]`}>{intro.eyebrow}</p>
          <h2 className={`${H2_CLASS} mt-[12px] max-w-[540px] text-[#02060e]`}>{intro.heading}</h2>
          <div className={`${BODY_CLASS} mt-4 text-[#02060e] opacity-80 lg:mt-[19px]`}>
            {paragraphs.map((p, i) => (
              <p key={i} className={i < paragraphs.length - 1 ? 'mb-[30.4px]' : undefined}>
                {p}
              </p>
            ))}
          </div>
        </div>
        <div className="relative mx-auto aspect-[673/541] w-full max-w-[673px] overflow-hidden rounded-[24px] bg-[#01040c] lg:rounded-[30px]">
          <Image src={intro.image.src} alt={intro.image.alt} fill sizes="(min-width: 1024px) 700px, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

/** "Why Telephonic Surveys?" — Figma (y1954-2894): #6c2a4a -> #be2c28 gradient, white eyebrow + 50/60 title (634px),
 * six 500x283 white cards (1px #e0e0df, r24, 6/6/54 shadow) 30px apart from +250: 70px icon at (48, 42), 22px #04264e
 * title, 14/26.2 description @ 70%. Hover: the card grows ~3.5%. */
export function WhySection({ why }: { why: SubServiceContent['why'] }) {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:pb-[94px] lg:pt-[77px]" style={{ backgroundImage: 'linear-gradient(105deg, #6c2a4a 0%, #be2c28 100%)' }}>
      <SectionHeader eyebrow={why.eyebrow} title={why.heading} body={why.body} tone="dark" titleMaxWidth="680px" bodyMaxWidth="900px" />
      <ul className="mx-auto mt-10 grid w-full max-w-[1560px] grid-cols-1 gap-6 md:grid-cols-2 lg:mt-[29px] lg:grid-cols-3 lg:gap-[30px]">
        {why.items.map((item) => (
          <li
            key={item.title}
            className={`rounded-[24px] border border-[#e0e0df] bg-white px-7 pb-9 pt-8 shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] transition-transform duration-500 ${EASE} hover:scale-[1.035] motion-reduce:transition-none motion-reduce:hover:scale-100 sm:pl-[48px] sm:pr-[44px] sm:pt-[42px] lg:min-h-[283px]`}
          >
            {item.icon && <Image src={item.icon} alt="" width={70} height={70} className="size-[60px] sm:size-[70px]" />}
            <h3 className="mt-[23px] font-sans text-[20px] font-semibold leading-[1.34] text-[#04264e] sm:text-[22px]">{item.title}</h3>
            <p className="mt-[6px] font-sans text-[14px] font-normal leading-[1.87] text-black opacity-70">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** "What We Can Measure" — Figma (y3617-4730, white with the wave artwork at 50%). Header, then six 516x370 r30 photo
 * cards (#000311) 26px apart from +248, the Lato 23 title bottom-centre over a black fade. Hover (lg): the fade covers
 * the whole card, the photo zooms and the centred 14/21.7 description opens under the title. Below lg (touch) the
 * description is always shown. */
export function MeasureSection({ measure }: { measure: SubServiceContent['measure'] }) {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8 lg:pb-[99px] lg:pt-[79px]">
      <div className="pointer-events-none absolute left-1/2 top-[-150px] h-[1590px] w-[3632px] -translate-x-1/2 opacity-50" aria-hidden="true">
        <Image src="/images/services/listing/showcase-waves.webp" alt="" fill sizes="3632px" className="object-cover" />
      </div>
      <div className="relative">
        <SectionHeader eyebrow={measure.eyebrow} title={measure.heading} body={measure.body} titleMaxWidth="1100px" bodyMaxWidth="969px" />
        <ul className="mx-auto mt-10 grid w-full max-w-[1600px] grid-cols-1 gap-5 md:grid-cols-2 lg:mt-[37px] lg:grid-cols-3 lg:gap-[26px]">
          {measure.items.map((item) => (
            <li key={item.title} className="group relative aspect-[516/370] overflow-hidden rounded-[24px] bg-[#000311] lg:rounded-[30px]">
              {item.image && (
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className={`object-cover transition-transform duration-1000 ${EASE} lg:group-hover:scale-[1.086] motion-reduce:transition-none`}
                />
              )}
              <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-b from-black/0 to-black/85" aria-hidden="true" />
              <div className={`absolute inset-0 bg-black/60 opacity-100 transition-opacity duration-500 ${EASE} lg:opacity-0 lg:group-hover:opacity-100`} aria-hidden="true" />
              <div className="absolute inset-x-6 bottom-[8%] text-center text-white lg:inset-x-[48px]">
                <h3 className={`${lato.className} text-[21px] font-bold leading-[1.25] sm:text-[23px]`}>{item.title}</h3>
                <div className={`grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ${EASE} lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]`}>
                  <div className="overflow-hidden">
                    <p className={`pt-2 font-sans text-[14px] font-normal leading-[1.55] text-white/90 transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100`}>{item.body}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** "Quality First" — Figma (y4730-5615): #070d16 with the interviewer photo at 40% and a #06070d fade from the left.
 * Left-aligned eyebrow, 50/60 white title (656px), 16/30.4 body @ 80% (675px), then six 500x145 glass cards (white @
 * 8%, 1px white @ 10%, r20, 21px blur) 20px apart: an 84px white disc with its icon, 22px gap, 20px SemiBold title and
 * 14/21.7 description. Hover: the card grows ~3.4%. */
export function QualitySection({ quality }: { quality: SubServiceContent['quality'] }) {
  return (
    <section className="relative overflow-hidden bg-[#070d16] px-4 py-16 text-white sm:px-6 lg:px-8 lg:pb-[129px] lg:pt-[119px]">
      <Image src={quality.image.src} alt="" fill sizes="100vw" className="pointer-events-none object-cover object-[70%_50%] opacity-40" />
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(6,7,13,0.8) 0%, rgba(6,7,13,0.55) 45%, rgba(6,7,13,0) 80%)' }} aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[1540px]">
        <p className={`${EYEBROW_CLASS} text-white`}>{quality.eyebrow}</p>
        <h2 className={`${H2_CLASS} mt-[7px] max-w-[680px] text-white`}>{quality.heading}</h2>
        <p className={`${BODY_CLASS} mt-[12px] max-w-[675px] opacity-80`}>{quality.body}</p>
        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-[47px] lg:gap-5 xl:grid-cols-3">
          {quality.items.map((item) => (
            <li
              key={item.title}
              className={`flex items-center gap-4 rounded-[20px] border border-white/10 bg-white/[0.08] px-5 py-6 backdrop-blur-[21px] transition-transform duration-500 ${EASE} hover:scale-[1.034] motion-reduce:transition-none motion-reduce:hover:scale-100 sm:gap-[22px] sm:px-[28px] lg:min-h-[145px]`}
            >
              {item.icon && <Image src={item.icon} alt="" width={84} height={84} className="size-[68px] shrink-0 sm:size-[84px]" />}
              <div className="min-w-0">
                <h3 className="font-sans text-[18px] font-semibold leading-[1.34] sm:text-[20px]">{item.title}</h3>
                <p className="mt-[4px] font-sans text-[14px] font-normal leading-[1.55] text-white/80">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** "CATI Technology" — Figma component 859:12227 (y5615-6740, white). Centred header (2-line title), then a 1600x650
 * strip of five photo panels 6px apart (outer corners r30, #070d16) from +300. Rest: equal panels, each with a
 * vertical Lato 23 label at its bottom-left over a dark fade. Hover / focus (lg): that panel widens to 984px while the
 * rest narrow to 151px, its label turns horizontal (Lato 25) and the 16/24.8 description appears (Smart Animate,
 * 300ms -> 500ms ease here). Below lg the panels stack as cards with the title and description always shown. */
export function TechnologySection({ technology }: { technology: SubServiceContent['technology'] }) {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:pb-[175px] lg:pt-[74px]">
      <div className="[&_h2]:whitespace-pre-line">
        <SectionHeader eyebrow={technology.eyebrow} title={technology.heading} body={technology.body} titleMaxWidth="1100px" bodyMaxWidth="969px" />
      </div>
      <ul className="group/tech mx-auto mt-10 flex w-full max-w-[1600px] flex-col gap-3 lg:mt-[40px] lg:h-[650px] lg:flex-row lg:gap-[6px] lg:overflow-hidden lg:rounded-[30px]">
        {technology.panels.map((panel) => (
          <li
            key={panel.title}
            tabIndex={0}
            className={`group/panel relative h-[300px] overflow-hidden rounded-[24px] bg-[#070d16] outline-none transition-[flex-grow] duration-500 ${EASE} focus-visible:ring-2 focus-visible:ring-[#a3282a] sm:h-[340px] lg:h-full lg:min-w-0 lg:flex-[315_1_0%] lg:rounded-none lg:group-hover/tech:flex-[151_1_0%] lg:hover:!flex-[984_1_0%] lg:focus-visible:!flex-[984_1_0%] motion-reduce:transition-none`}
          >
            {panel.image && <Image src={panel.image.src} alt={panel.image.alt} fill sizes="(min-width: 1024px) 1000px, 100vw" className="object-cover" />}
            <div className="absolute inset-x-0 bottom-0 h-[77%] bg-gradient-to-b from-[#070d16]/0 to-[#070d16]/90" aria-hidden="true" />
            {/* Rest label: vertical, bottom-left (lg only). */}
            <h3
              className={`${lato.className} pointer-events-none absolute bottom-[31px] left-[45px] hidden rotate-180 whitespace-nowrap text-[23px] font-bold leading-[1.2] text-white [writing-mode:vertical-rl] transition-opacity duration-300 lg:block lg:group-hover/panel:opacity-0 lg:group-focus-visible/panel:opacity-0`}
              aria-hidden="true"
            >
              {panel.title}
            </h3>
            {/* Open state: horizontal title + description (always shown below lg). */}
            <div
              className={`absolute inset-x-6 bottom-7 text-white transition-opacity duration-500 lg:bottom-[53px] lg:left-[70px] lg:right-auto lg:w-[min(780px,calc(984px_-_140px))] lg:opacity-0 lg:group-hover/panel:opacity-100 lg:group-hover/panel:delay-200 lg:group-focus-visible/panel:opacity-100`}
            >
              <p className={`${lato.className} text-[22px] font-bold leading-[1.2] lg:text-[25px]`}>{panel.title}</p>
              <p className="mt-3 font-sans text-[15px] font-normal leading-[1.55] text-white/90 lg:mt-[14px] lg:text-[16px]">{panel.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

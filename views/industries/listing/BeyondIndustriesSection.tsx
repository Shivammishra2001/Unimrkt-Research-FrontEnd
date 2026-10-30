import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from './shared';
import { SendArrowIcon } from '@/views/ui/icons/SendArrowIcon';
import type { IndustriesPageContent } from '@/models/industriesPage';

const ICON_DIR = '/icons/industries';

// Figma nodes 1384:26898-26913 (Components 1088-1107): 480x464 cards. Copy comes from the
// CMS (Pages > Industries); the icons are fixed by card position.
const ICONS = [
  'beyond-infrastructure.svg',
  'beyond-repair.svg',
  'beyond-research.svg',
  'beyond-dashboard.svg',
  'beyond-configuration.svg',
  'beyond-growth.svg',
];

/** "Beyond Industries / One Research Partner. Multiple Industries." —
 * Figma 1384:26772, y2950-4678 (#f9f9f7 with a white fade over the bottom
 * 423px) plus the "Have a Question?" band that overlaps its lower edge.
 * Six 480x464 cards (1px #e1e1df, r24, shadow 6 6 54 rgba(0,0,0,.03)) at
 * x=190/710/1230 with 40px gaps, first row y=3287. Icon 70px at (44,66);
 * title 22/29.5px #04264e; body 14/26.18px @ 70%. */
export function BeyondIndustriesSection({ content }: { content: IndustriesPageContent['beyond'] }) {
  return (
    <section className="relative bg-[#f9f9f7] pb-16 pt-16 lg:h-[1728px] lg:pb-0 lg:pt-[96px]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[250px]"
        style={{ backgroundImage: 'linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0) 100%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[423px]"
        style={{ backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 86.538%)' }}
        aria-hidden="true"
      />
      <div className="relative">
        <SectionHeader
          eyebrow={content.eyebrow}
          title={content.heading}
          titleMaxWidth="1011px"
          bodyMaxWidth="1182px"
          className="px-4 sm:px-6"
          body={content.body}
        />
        <div className="mx-auto mt-[55.5px] grid w-full max-w-[1520px] grid-cols-1 gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8 min-[1600px]:px-0">
          {content.cards.map((card, i) => (
            <article
              key={card.title}
              className="group cursor-pointer rounded-[24px] border border-[#e1e1df] bg-white pb-10 pl-[43px] pr-[39px] pt-[65px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.03)] transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-[#a82c31] hover:bg-[#a82c31] hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:transform-none lg:min-h-[464px]"
            >
              <Image
                src={card.icon?.src ?? `${ICON_DIR}/${ICONS[i % ICONS.length]}`}
                alt=""
                width={70}
                height={70}
                className="size-[70px] transition-[filter] duration-300 ease-in-out group-hover:brightness-0 group-hover:invert motion-reduce:transition-none"
              />
              <h3 className="mt-[23.3px] font-sans text-[22px] font-semibold leading-[29.48px] text-[#04264e] transition-colors duration-300 ease-in-out group-hover:text-white motion-reduce:transition-none">{card.title}</h3>
              <p className="mt-[9.9px] font-sans text-[14px] font-normal leading-[26.18px] text-black opacity-70 transition-colors duration-300 ease-in-out group-hover:text-white group-hover:opacity-90 motion-reduce:transition-none">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** "Have a Question? Let's Find the Answer." band — Figma 1384:26920:
 * 1600x455, r50, #6c2a4a -> #be2c28, a 20% luminosity texture, the
 * cut-out couple popping 85px above the band (690x541 at x=817), 52/62px
 * title (-3px) at x=114, 16/30.4px line @ 80%, and a 286x60 #040f1d
 * "Start a Conversation" button. Pulled up over the section above
 * (-264px) exactly like the node. */
export function QuestionBand({ content }: { content: IndustriesPageContent['band'] }) {
  return (
    <div className="relative z-10 mx-auto -mt-16 w-full max-w-[1600px] px-4 sm:px-6 lg:-mt-[264px] lg:px-8 min-[1700px]:px-0">
      <div className="relative min-h-[455px] rounded-[30px] bg-gradient-to-r from-gradient-from to-gradient-to lg:rounded-[50px]">
        <div className="absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden="true">
          <Image src={content.backgroundImage?.src ?? '/images/industries/texture.jpg'} alt="" fill sizes="1600px" className="object-cover opacity-[0.09] mix-blend-luminosity" />
        </div>
        <div className="absolute right-0 top-[-85px] hidden h-[541px] w-[690px] overflow-hidden lg:block lg:right-[93px]" aria-hidden="true">
          <Image
            src={content.personImage?.src ?? '/images/industries/couple-cutout.webp'}
            alt={content.personImage?.alt ?? ''}
            width={931}
            height={621}
            sizes="931px"
            className="absolute left-[-114.5px] top-[-80.3px] max-w-none"
          />
        </div>
        <div className="relative px-6 py-14 sm:px-10 lg:px-0 lg:py-0 lg:pl-[114px] lg:pt-[91px]">
          <h2 className="font-sans text-[34px] font-semibold capitalize leading-[41px] tracking-[-1.5px] text-white sm:text-[44px] sm:leading-[53px] lg:text-[52px] lg:leading-[62.4px] lg:tracking-[-3px]">
            {content.heading.split('\n').map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-[7px] max-w-[674px] font-sans text-[16px] font-normal leading-[30.4px] text-white opacity-80">
            {content.body}
          </p>
          <Link
            href={content.cta.href}
            className="mt-[35px] inline-flex h-[60px] items-center justify-center gap-1 rounded-[4px] bg-[#040f1d] px-10 font-sans text-[13px] font-bold uppercase leading-[16.9px] tracking-[0.78px] text-white transition-[filter] duration-300 ease-in-out hover:brightness-125 motion-reduce:transition-none"
          >
            {content.cta.label}
            <SendArrowIcon className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

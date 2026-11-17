import Image from 'next/image';
import type { ServicesListingContent } from './content';

/** iconIdentifier (CMS) -> the vuesax line icon Figma draws on that card (561:3414-3429), rebuilt as one 56px SVG each. */
const WHY_ICONS: Record<string, string> = {
  trophy: 'why-cup.svg',
  cup: 'why-cup.svg',
  global: 'why-global.svg',
  languages: 'why-languages.svg',
  users: 'why-users.svg',
  'profile-2user': 'why-users.svg',
  box: 'why-cube.svg',
  'shield-check': 'why-shield.svg',
  'shield-tick': 'why-shield.svg',
};

/** "Why Choose Unimrkt?" — Figma 1231:77275/77279 + cards 1231:77309-77314 (y2617-3235, 618px). The #6c2a4a -> #be2c28
 * band (no overlay — see below); 52/62.4px white title (cap-top +80), 16/30.4px body @ 80%
 * (1090px, cap-top +147), then six 246x280 glass cards (rgba(36,5,5,.18), 1px #ba4551, r20, 21px blur) 25px apart at
 * +237: a 100px glass disc at +51 holding the 56px white icon, the 20px SemiBold value 22px under it and the 16px label
 * @ 80% beneath. Six across from 1440px, three below that, two on phones. */
export function WhyChooseBand({ content }: { content: ServicesListingContent['why'] }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-gradient-from to-gradient-to px-4 pb-16 pt-14 text-white sm:px-6 lg:px-8 lg:pb-[101px] lg:pt-[66.6px]">
      {/* Figma 1231:77275 is the plain #6c2a4a -> #be2c28 gradient; its wallpaper group (1231:77279) sits at x=1900, outside the
          frame, so it never renders — no overlay. */}
      <div className="relative mx-auto w-full max-w-[1600px]">
        <header className="mx-auto flex max-w-[1090px] flex-col items-center text-center">
          <h2 className="font-sans text-[32px] font-semibold capitalize leading-[1.2] tracking-[-1.5px] sm:text-[42px] lg:text-[52px] lg:tracking-[-3px]">{content.heading}</h2>
          <p className="mt-3 font-sans text-[16px] font-normal leading-[30.4px] opacity-80 lg:mt-[8px]">{content.body}</p>
        </header>
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-[25px] lg:mt-[39px] min-[1440px]:grid-cols-6">
          {content.stats.map((stat) => (
            <li
              key={stat.id}
              className="flex min-h-[230px] flex-col items-center rounded-[20px] border border-[#ba4551] bg-[rgba(36,5,5,0.18)] px-3 pb-8 pt-8 text-center backdrop-blur-[21px] transition-colors duration-300 ease-out hover:bg-[rgba(36,5,5,0.32)] motion-reduce:transition-none sm:min-h-[280px] sm:pt-[51px] min-[1440px]:px-1"
            >
              <span className="flex size-[84px] shrink-0 items-center justify-center rounded-full bg-[rgba(36,5,5,0.18)] backdrop-blur-[21px] sm:size-[100px]">
                <Image src={`/icons/services/${WHY_ICONS[stat.iconIdentifier ?? ''] ?? 'why-cube.svg'}`} alt="" width={56} height={56} className="size-12 sm:size-14" />
              </span>
              <p className="mt-[22px] font-sans text-[18px] font-semibold leading-[1.34] sm:text-[20px]">{stat.value}</p>
              <p className="mt-[5px] font-sans text-[14px] font-normal leading-[1.34] opacity-80 sm:text-[16px]">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

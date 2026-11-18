import Image from 'next/image';
import type { ImageModel } from '@/models/domain';

/** "Why work with unimrkt?" — Figma 1495:16447 (y2343-3139, 796px): #6c2a4a -> #be2c28 with the mirrored wallpaper at 20%
 * luminosity, white 13px eyebrow (cap-top +85), 52px Inter title (2 lines), 16px/1.9 description at 90%, then four
 * 376x354 white cards (1px #e0e0df, r24, 6/6/54 shadow) 32px apart: 70px icon at 57, 24px SemiBold #04264e title, 14px/1.6 copy.
 * Content from Pages → Contact (Why … fields + cards); WHY_WORK_DEFAULT is the built-in copy. */
export interface WhyWorkContent {
  eyebrow: string;
  /** "\n" = the desktop line break. */
  heading: string;
  body: string;
  /** Card title: "\n" splits it over two lines. Icon: an uploaded image, else the Figma pictogram named by iconIdentifier. */
  cards: Array<{ id: string; title: string; description: string; icon?: ImageModel; iconIdentifier?: string }>;
}

export const WHY_WORK_DEFAULT: WhyWorkContent = {
  eyebrow: 'Why work with unimrkt?',
  heading: 'More Than Research.\nA Partner For Better Decisions.',
  body: 'From defining the research question to delivering actionable insights, our team combines research expertise, technology and global field capabilities to support better business decisions.',
  cards: [
    { id: 'why-research', title: 'Deep Research\nExpertise', iconIdentifier: 'research', description: 'Experienced researchers who understand complex business questions and diverse audiences.' },
    { id: 'why-global', title: 'Global Reach', iconIdentifier: 'global', description: 'Research capabilities across markets, industries, audiences and geographies.' },
    { id: 'why-badge', title: 'Quality-First\nApproach', iconIdentifier: 'badge', description: 'Rigorous processes designed to ensure reliable, accurate and actionable research.' },
    { id: 'why-dashboard', title: 'Business-Focused\nInsights', iconIdentifier: 'dashboard', description: 'We turn research findings into insights that can support meaningful business decisions.' },
  ],
};

const ICON_FILES: Record<string, string> = { research: 'icon-research.svg', global: 'icon-global-lg.svg', badge: 'icon-badge.svg' };

function CardIcon({ icon, name }: { icon?: ImageModel; name?: string }) {
  if (icon) return <Image src={icon.src} alt="" width={70} height={70} className="size-[70px] object-contain" />;
  if (name === 'dashboard') {
    return (
      <span className="relative block size-[70px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/figma-contact/icon-dashboard.svg" alt="" className="absolute left-[4.93%] top-[13.9%] max-w-none" style={{ width: '90.14%', height: '72.2%' }} />
      </span>
    );
  }
  const src = ICON_FILES[name ?? ''] ?? ICON_FILES.research;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/figma-contact/${src}`} alt="" width={70} height={70} className="size-[70px]" />;
}

export function WhyWorkSection({ content = WHY_WORK_DEFAULT }: { content?: WhyWorkContent }) {
  const headingLines = content.heading.split('\n');
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#6c2a4a] to-[#be2c28] px-4 py-16 text-white sm:px-6 lg:pb-[98px] lg:pt-[85px]">
      <div
        className="pointer-events-none absolute -left-[15.6%] -top-[38.2%] h-[176.1%] w-[131.2%] -scale-x-100 bg-[url('/images/industries/case-studies-wallpaper.jpg')] bg-[length:100%_100%] opacity-[0.12] mix-blend-luminosity"
        aria-hidden="true"
      />
      <div className="relative text-center">
        <p className="font-sans text-[13px] font-bold uppercase leading-[1.2] tracking-[3px] text-white [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
          {content.eyebrow}
        </p>
        <h2 className="mt-[19px] font-nav text-[32px] font-semibold leading-[1.2] tracking-[-1px] text-white sm:text-[40px] lg:text-[52px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
          {headingLines.map((line, i) => (
            <span key={i}>
              {i > 0 && ' '}
              {i > 0 && <br className="max-sm:hidden" />}
              {line}
            </span>
          ))}
        </h2>
        <p className="mx-auto mt-6 max-w-[1090px] font-sans text-[16px] font-normal leading-[1.9] text-white/90 lg:mt-8 [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
          {content.body}
        </p>
      </div>

      <div className="relative mx-auto mt-10 grid max-w-[1600px] grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-[58px] lg:grid-cols-4">
        {content.cards.map((card) => {
          const titleLines = card.title.split('\n');
          return (
            <div
              key={card.id}
              // pb keeps the last line of copy off the card edge when the card grows past 354px (narrow lg columns).
              className="flex min-h-[354px] flex-col items-center rounded-[24px] border border-[#e0e0df] bg-white px-6 pb-10 pt-[57px] text-center shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] lg:max-xl:px-4"
            >
              <CardIcon icon={card.icon} name={card.iconIdentifier} />
              <h3 className="mt-[30px] font-sans text-[24px] font-semibold leading-[1.34] text-[#04264e] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                {titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h3>
              <p
                className={`max-w-[292px] font-sans text-[14px] font-normal leading-[1.6] text-black/70 [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] ${
                  titleLines.length > 1 ? 'mt-[29px]' : 'mt-[35px]'
                }`}
              >
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

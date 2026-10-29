import Image from 'next/image';
import { Button } from '@/views/ui/Button';
import type { ResolvedOurTeam } from './fallback';

/** Bottom CTA — Figma node 1126:54758: 1740x455, r40, #101723, the
 * 20%-opacity people photo at (-96,-203) 1838x1034, a 227px bottom
 * gradient (rgba(8,19,32,0) -> #081320 @63%, 70%). Title Montserrat 600
 * 50/57px tracking -2px; body Montserrat 500 16/33.6px; white button.
 * Offsets are the Figma ones from the band's top edge (title cap 119,
 * body cap 186, button 289). */
export function BottomCtaSection({ bottomCta }: { bottomCta: ResolvedOurTeam['bottomCta'] }) {
  const bodyLines = bottomCta.body.split('\n');

  return (
    <section className="bg-white px-4 pb-10 pt-16 sm:px-6 lg:px-10 lg:pt-[97px]">
      <div className="mx-auto w-full max-w-[1740px]">
        <div className="relative flex min-h-[455px] flex-col items-center overflow-hidden rounded-[40px] bg-[#101723] px-6 pb-16 pt-16 text-center lg:pb-[106px] lg:pt-[108px]">
          <Image
            src="/images/our-team/cta-people.jpg"
            alt=""
            width={1838}
            height={1034}
            sizes="1838px"
            className="pointer-events-none absolute left-[-96px] top-[-203px] max-w-none opacity-20"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[227px] rounded-b-[40px] opacity-70"
            style={{ backgroundImage: 'linear-gradient(to bottom, rgba(8,19,32,0) 0%, #081320 63%)' }}
            aria-hidden="true"
          />
          <h2 className="relative font-sans text-[30px] font-semibold capitalize leading-[34px] text-white sm:text-[36px] sm:leading-[41px] lg:text-[50px] lg:leading-[57px] lg:tracking-[-2px]">
            {bottomCta.heading}
          </h2>
          <p className="relative mt-[10px] max-w-[819px] font-sans text-[16px] font-medium leading-[33.6px] text-white">
            {bodyLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < bodyLines.length - 1 && <br />}
              </span>
            ))}
          </p>
          <div className="relative mt-9 flex justify-center lg:mt-[47px]">
            <Button link={bottomCta.action} variant="secondary" />
          </div>
        </div>
      </div>
    </section>
  );
}

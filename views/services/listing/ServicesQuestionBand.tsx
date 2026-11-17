import Image from 'next/image';
import Link from 'next/link';
import { SendArrowIcon } from '@/views/ui/icons/SendArrowIcon';
import type { ServicesListingContent } from './content';

/** "Have a Question? Let's Find the Answer." — Figma 1231:77366 (y4151-4744). A 1600x455 r40 #101723 band at y4289 with
 * the dot/wave texture (colour-burn); 52/62.4px white title (-3px) at x+119, cap-top +104; 16/30.4px line @ 80% (cap
 * +233); the 286x60 gradient "Start a Conversation" button at +289. The 653x593 cut-out couple stands on the band's
 * bottom edge at x+841 and rises 138px above it. Below lg the couple sits under the copy. Everything inside the band
 * scales with its width (cqw) so the copy never runs under the photo on laptops. */
export function ServicesQuestionBand({ content }: { content: ServicesListingContent['band'] }) {
  return (
    // Figma 1231:77315/77316: the process band's #f9f9f7 runs on under the band and fades to white over 203px from 96px down.
    <section
      className="relative px-4 pb-0 pt-16 sm:px-6 lg:px-8 lg:pt-[90px] min-[1700px]:px-0"
      style={{ backgroundImage: 'linear-gradient(to bottom, #f9f9f7 96px, #fff 271.4px)' }}
    >
      <div className="relative mx-auto min-h-[455px] w-full max-w-[1600px] rounded-[30px] bg-[#101723] [container-type:inline-size] lg:rounded-[40px]">
        <div className="absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden="true">
          <Image
            src="/images/industries/texture.jpg"
            alt=""
            width={1626}
            height={813}
            sizes="1600px"
            className="absolute left-[-0.0625%] top-[-38.02%] h-[176.04%] w-[100.0625%] max-w-none object-cover mix-blend-color-burn"
          />
        </div>
        <div className="relative px-6 pt-14 sm:px-10 lg:px-0 lg:pb-[3cqw] lg:pl-[7.4375cqw] lg:pt-[5.6625cqw]">
          <div className="lg:max-w-[44cqw]">
            <h2 className="font-sans text-[34px] font-semibold capitalize leading-[1.2] tracking-[-1.5px] text-white sm:text-[44px] lg:text-[clamp(34px,3.25cqw,52px)] lg:tracking-[-0.0577em]">
              {content.heading.split('\n').map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-[8px] font-sans text-[16px] font-normal leading-[1.9] text-white opacity-80 lg:text-[clamp(14px,1cqw,16px)]">{content.body}</p>
            <Link
              href={content.cta.href}
              className="mt-[35px] inline-flex h-[60px] items-center justify-center gap-1 rounded-[4px] bg-gradient-to-r from-gradient-from to-gradient-to px-10 font-sans text-[13px] font-bold uppercase leading-[16.9px] tracking-[0.78px] text-white transition-[filter] duration-300 ease-in-out hover:brightness-110 motion-reduce:transition-none"
            >
              {content.cta.label}
              <SendArrowIcon className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div
          className="pointer-events-none relative mx-auto mt-6 aspect-[653/593] w-[min(100%,400px)] overflow-hidden lg:absolute lg:bottom-0 lg:right-[6.625cqw] lg:mx-0 lg:mt-0 lg:w-[40.8125cqw]"
          aria-hidden="true"
        >
          <Image src="/images/services/listing/question-couple.webp" alt="" width={1400} height={788} sizes="(min-width: 1024px) 1060px, 650px" className="absolute left-[-2.34%] top-0 h-full w-[161.29%] max-w-none" />
        </div>
      </div>
    </section>
  );
}

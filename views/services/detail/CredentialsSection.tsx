import Image from 'next/image';
import { DetailCardIcon } from '@/views/ui/detail/DetailCardIcon';
import type { ResolvedServiceDetail } from './fallback';

/** iconIdentifier -> the vuesax icon Figma draws on that card (505:9013-9198), 44px #292d32. 'rupee' is a ₹ glyph in
 * the node (505:9073), so it is set as text. */
export const CRED_ICONS = new Set([
  'profile-2user', 'clock', 'clipboard-tick', 'note', 'call', 'shield-tick', 'medal-star', 'archive-book', 'people', 'headphone', 'user-tag', 'global', 'security-user', 'star',
]);

/** "Why Unimrkt Research?" — Figma 503:8747-505:9222 (y2726-3978, 1252px). #070d16 with the office photo at 20%
 * (2683x1470 from -391/-48); 50/60 white title (cap-top +77), 16/30.4 body @ 80% (1090px), then 15 glass cards
 * (284x290, white @ 8%, 1px white @ 10%, r20, 42px backdrop blur) in five columns, 28px apart, from y2962: an 84px
 * white disc (1.7px #872b3e @ 10%) with the 44px icon at +46, the 26px SemiBold value (cap +156) and the 16/21.4px
 * label (cap +189). Five across from 1280px, three on laptops/tablets, two on phones. */
export function CredentialsSection({ credentials }: { credentials: ResolvedServiceDetail['credentials'] }) {
  return (
    <section className="relative overflow-hidden bg-[#070d16] px-4 pb-16 pt-14 text-white sm:px-6 lg:px-8 lg:pb-[90px] lg:pt-[64px]">
      <div className="pointer-events-none absolute left-[-20.58%] top-[-3.84%] h-[117.4%] w-[141.2%] opacity-20" aria-hidden="true">
        <Image src="/images/services/detail/why-unimrkt-bg.webp" alt="" fill sizes="141vw" className="object-cover" />
      </div>
      <div className="relative mx-auto w-full max-w-[1531px]">
        <header className="mx-auto max-w-[1090px] text-center">
          <h2 className="font-sans text-[32px] font-semibold capitalize leading-[38px] tracking-[-1.5px] sm:text-[40px] sm:leading-[48px] lg:text-[50px] lg:leading-[60px] lg:tracking-[-3px]">{credentials.heading}</h2>
          <p className="mt-3 font-sans text-[16px] font-normal leading-[30.4px] opacity-80 lg:mt-[9px]">{credentials.body}</p>
        </header>
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:mt-[42px] xl:grid-cols-5 xl:gap-[28px]">
          {credentials.items.map((item) => (
            <li
              key={item.id}
              className="flex min-h-[230px] flex-col items-center rounded-[20px] border border-white/10 bg-white/[0.08] px-3 pb-8 pt-8 text-center backdrop-blur-[21px] sm:min-h-[290px] sm:px-5 sm:pt-[46px]"
            >
              <span className="flex size-[72px] shrink-0 items-center justify-center rounded-full border-[1.7px] border-[#872b3e]/10 bg-white sm:size-[84px]">
                {item.iconIdentifier === 'rupee' ? (
                  <span className="font-sans text-[34px] font-medium leading-none text-[#292d32]">₹</span>
                ) : item.iconIdentifier && CRED_ICONS.has(item.iconIdentifier) ? (
                  <Image src={`/icons/services/detail/cred-${item.iconIdentifier}.svg`} alt="" width={44} height={44} className="size-9 sm:size-11" />
                ) : (
                  <DetailCardIcon iconIdentifier={item.iconIdentifier} className="size-9 text-[#292d32] sm:size-11" />
                )}
              </span>
              <p className="mt-[17.5px] font-sans text-[20px] font-semibold leading-[1.34] sm:text-[26px]">{item.value}</p>
              <p className="mt-[1.4px] max-w-[240px] font-sans text-[14px] font-normal leading-[1.34] sm:text-[16px]">{item.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

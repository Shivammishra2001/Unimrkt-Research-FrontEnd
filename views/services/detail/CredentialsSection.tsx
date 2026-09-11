import { Container } from '@/views/ui/Container';
import { DetailCardIcon } from '@/views/ui/detail/DetailCardIcon';
import type { ResolvedServiceDetail } from './fallback';

/** "Why Unimrkt Research?" — Figma node 503:8747-505:9218 (y2726-3978),
 * 15 stat cards in 3 rows of 5. Same dark glassmorphic card shell as
 * /industries/[slug]'s ChallengesSection (`backdrop-blur-[21px]`,
 * `bg-white/8`, border `white/10`, `rounded-[20px]`). CMS-first,
 * template-fallback — always renders. */
export function CredentialsSection({ credentials }: { credentials: ResolvedServiceDetail['credentials'] }) {
  return (
    <section className="bg-[#05101a] py-16 text-white sm:py-20 lg:py-24">
      <Container>
        <header className="mx-auto max-w-[900px] text-center">
          <h2 className="text-3xl font-semibold leading-[1.2] text-white sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
            {credentials.heading}
          </h2>
          <p className="mt-4 text-base leading-[1.9] text-white/80">{credentials.body}</p>
        </header>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {credentials.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center gap-4 rounded-[20px] border border-white/10 bg-white/[0.08] p-6 text-center backdrop-blur-[21px]"
            >
              <span className="flex size-[84px] shrink-0 items-center justify-center rounded-full bg-white/10">
                <DetailCardIcon iconIdentifier={item.iconIdentifier} className="size-[44px] text-white" />
              </span>
              <div>
                <p className="font-sans text-[26px] font-semibold leading-[1.34] text-white">{item.value}</p>
                <p className="mt-1 font-sans text-base leading-[1.34] text-white">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

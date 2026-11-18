import Image from 'next/image';
import { EYEBROW_CLASS, H2_CLASS, BODY_CLASS } from '@/views/industries/listing/shared';
import { DetailCardIcon } from '@/views/ui/detail/DetailCardIcon';
import type { ResolvedServiceDetail } from './fallback';

/** iconIdentifier -> the vuesax icon Figma 474:6054-6064 draws (34px, #a3282a). */
const FEATURE_ICONS = new Set(['shield-tick', 'profile-2user', 'medal-star']);
const FIGMA_PHOTO = { src: '/images/services/detail/primary-research-overview.jpg', width: 1200, height: 840 };

/** "About {Title}" — Figma 474:5897-5902 + 474:6050-6069 (y1103-1867, white). Left (x150): eyebrow cap-top +129,
 * 50/60 title (714px), 16/30.4 body @ 80% (833px), then the three feature chips 41px apart at y1655 (70px #f6eaea
 * disc with the 34px red icon, 15/21px SemiBold label). Right: the 673x541 r30 photo (#01040c, image 816x571 from
 * -71/-16) at x1077, y+109. */
export function OverviewSection({ overview }: { overview: ResolvedServiceDetail['overview'] }) {
  const paragraphs = overview.body.split(/\n\s*\n/).filter(Boolean);
  const photo = overview.image ?? { ...FIGMA_PHOTO, alt: overview.heading };

  return (
    <section className="bg-white py-16 lg:py-10">
      <div className="mx-auto grid w-full max-w-[1664px] items-start gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,833fr)_minmax(0,673fr)] lg:gap-x-[clamp(32px,4.95vw,94px)] lg:px-8 min-[1700px]:max-w-[1600px] min-[1700px]:px-0">
        <div className="min-w-0 lg:pt-[16.6px]">
          <p className={`${EYEBROW_CLASS} text-[#cc1f1f]`}>{overview.eyebrow}</p>
          <h2 className={`${H2_CLASS} mt-[12px] max-w-[714px] text-[#02060e]`}>{overview.heading}</h2>
          <div className={`${BODY_CLASS} mt-4 text-[#02060e] opacity-80 lg:mt-[19px]`}>
            {paragraphs.map((p, i) => (
              <p key={i} className={i < paragraphs.length - 1 ? 'mb-[30.4px]' : undefined}>
                {p}
              </p>
            ))}
          </div>
          {overview.features.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-x-[clamp(24px,2.16vw,41px)] gap-y-6 lg:mt-[77px]">
              {overview.features.map((feature) => (
                <li key={feature.id} className="flex items-center gap-[10px]">
                  <span className="relative flex size-[70px] shrink-0 items-center justify-center">
                    <Image src="/icons/services/coverage-disc.svg" alt="" width={70} height={70} className="absolute inset-0 size-full" />
                    {!feature.icon && feature.iconIdentifier && FEATURE_ICONS.has(feature.iconIdentifier) ? (
                      <Image src={`/icons/services/detail/feature-${feature.iconIdentifier}.svg`} alt="" width={34} height={34} className="relative size-[34px]" />
                    ) : (
                      <DetailCardIcon icon={feature.icon} iconIdentifier={feature.iconIdentifier} className="relative size-[34px] text-[#a3282a]" />
                    )}
                  </span>
                  {/* Two fixed lines like Figma 474:6055-6065 ("Customized" / "Research Solutions", "Accurate &" / "Reliable Insights"). */}
                  <p className="whitespace-pre-line font-sans text-[15px] font-semibold capitalize leading-[1.4] text-[#02060e]">{feature.title.replace(/^(\S+(?:\s&)?)\s+/, '$1\n')}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="relative mx-auto aspect-[673/541] w-full max-w-[673px] overflow-hidden rounded-[24px] bg-[#01040c] lg:rounded-[30px]">
          <Image
            src={photo.src}
            alt={photo.alt ?? ''}
            width={photo.width ?? 1200}
            height={photo.height ?? 840}
            sizes="(min-width: 1024px) 820px, 100vw"
            className="absolute left-[-10.55%] top-[-2.91%] h-[105.6%] w-[121.28%] max-w-none object-cover"
          />
        </div>
      </div>
    </section>
  );
}

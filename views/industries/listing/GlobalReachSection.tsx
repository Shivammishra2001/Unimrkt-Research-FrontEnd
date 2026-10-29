import Image from 'next/image';
import { SectionHeader } from './shared';

const ICON_DIR = '/icons/industries';

// Figma nodes 1384:27082-27085 (Components 1097-1100).
const STATS = [
  { icon: 'stat-global-network.svg', value: '90+', label: 'Countries Covered' },
  { icon: 'stat-communications.svg', value: '22+', label: 'Languages Supported' },
  { icon: 'stat-world.svg', value: '4', label: 'Global Regions' },
  { icon: 'stat-search.svg', value: 'Multi-Industry', label: 'Research Expertise' },
];

/** "Local Insight. Global Reach." — Figma 1384:26772, y6926-7704: #020a13
 * with the 15%-opacity luminosity texture. Four 378x380 glass cards
 * (white @ 8%, 1px white @ 10%, 21px backdrop blur, r20) at x=150/558/
 * 966/1374 (30px gaps), y=7203: a 124px white ring with a 64px icon,
 * a 34/45.6px semibold value (white) and a 16/29.9px label @ 70%. */
export function GlobalReachSection() {
  return (
    <section className="relative overflow-hidden bg-[#020a13] py-16 lg:h-[778px] lg:pb-0 lg:pt-[80.6px]">
      <Image src="/images/industries/texture.jpg" alt="" fill sizes="1900px" className="pointer-events-none object-cover opacity-15 mix-blend-luminosity" />
      <div className="relative">
        <SectionHeader
          eyebrow="Beyond Industries"
          title="Local Insight. Global Reach."
          titleMaxWidth="655px"
          bodyMaxWidth="1182px"
          tone="dark"
          className="px-4 sm:px-6"
          body="Unimrkt delivers research across 90+ countries and 22+ languages, combining deep local understanding with a global perspective. Our international research capabilities help businesses understand diverse markets, audiences and industry dynamics with confidence."
        />
        <div className="mx-auto mt-[34.9px] grid w-full max-w-[1602px] grid-cols-1 gap-[30px] px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8 min-[1660px]:px-0">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-[20px] border border-white/10 bg-white/[0.08] px-6 pb-12 pt-12 text-center backdrop-blur-[21px] lg:min-h-[380px] lg:pt-[83px]"
            >
              <span className="relative size-[124px] shrink-0" aria-hidden="true">
                <Image src={`${ICON_DIR}/stat-ring.svg`} alt="" width={124} height={124} className="absolute inset-0 size-full" />
                <Image src={`${ICON_DIR}/${stat.icon}`} alt="" width={64} height={64} className="absolute left-[30px] top-[30px] size-[64px]" />
              </span>
              <p className="mt-[19.8px] font-sans text-[34px] font-semibold leading-[45.56px] text-white">{stat.value}</p>
              <p className="mt-[4.1px] font-sans text-[16px] font-normal leading-[29.92px] text-white opacity-70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { BlogSummary } from '@/models/blog';

/** Card outline from Figma 522:4934 ("Vector 474"): 512x486, r24, 1px #eee, with the bottom-right corner notched out
 * (453.4 wide x 57.7 tall) for the arrow button. Drawn as one path so the notch keeps its concave fillet. */
const CARD_PATH =
  'M488 0H24C10.745 0 0 10.745 0 24V462C0 475.255 10.745 486 24 486H429.442C442.697 486 453.442 475.255 453.442 462V452.258C453.442 439.004 464.188 428.258 477.442 428.258H488C501.255 428.258 512 417.513 512 404.259V24C512 10.745 501.255 0 488 0Z';

/** /blogs grid card — Figma 522:4933 ("Group 1597880740", 512x486). Absolute geometry measured from the node:
 * photo 469x260 r20 at (22, 23), 28px-high category chip (10px side padding, 2px radius, 12px Medium) at (32, 308), 20/1.34 SemiBold #04264e title cap-top at (32, 356),
 * 14/1.73 excerpt cap-top at (32, 424) (plain line boxes, offset by the cap gap, so line-clamp never clips glyphs), 44x44 #e5ece7 r17 arrow button in the notch. Hover (requested, not in Figma): the arrow button turns #a3282a with a white arrow nudged up-right. */
export function BlogListCard({ post, priority = false }: { post: BlogSummary; priority?: boolean }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group relative block h-[486px] w-full min-w-0 [filter:drop-shadow(6px_6px_27px_rgba(0,0,0,0.05))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
    >
      <svg className="absolute inset-0 size-full overflow-visible" viewBox="0 0 512 486" preserveAspectRatio="none" aria-hidden="true">
        <path d={CARD_PATH} fill="#fff" stroke="#eee" vectorEffect="non-scaling-stroke" />
      </svg>

      <div className="absolute left-[22px] right-[21px] top-[23px] h-[260px] overflow-hidden rounded-[20px] bg-slate-100">
        {post.coverImage ? (
          <StrapiImage image={post.coverImage} sizes="(min-width: 1700px) 469px, (min-width: 1024px) 30vw, 90vw" priority={priority} fill className="object-cover" />
        ) : (
          // No featured image in the CMS: the brand gradient + wallpaper (the Home band's treatment) with the logo.
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-[#6c2a4a] to-[#be2c28]" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma-home/services-gradient-wallpaper.png" alt="" className="absolute inset-0 size-full object-cover opacity-20 mix-blend-luminosity" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/brand/logo.png" alt="" className="relative h-[110px] w-auto rounded-full bg-white/95 p-2" />
          </div>
        )}
      </div>

      {post.category && (
        <span className="absolute left-8 top-[308px] inline-flex h-7 max-w-[calc(100%-90px)] items-center justify-center whitespace-nowrap rounded-[2px] bg-[#04264e] px-[10px] font-sans text-[12px] font-medium leading-none text-white">
          <span className="truncate">
          {post.category.name}</span>
        </span>
      )}

      <h3 className="absolute left-8 right-[58px] top-[349.4px] line-clamp-2 font-sans text-[20px] font-semibold leading-[1.34] text-[#04264e]">
        {post.title}
      </h3>
      <p className="absolute left-8 right-[58px] top-[416.7px] line-clamp-2 font-sans text-[14px] font-normal leading-[1.73] text-black/70">
        {post.excerpt}
      </p>

      <span className="absolute bottom-[2px] right-[2px] flex size-11 items-center justify-center rounded-[17px] bg-[#e5ece7] text-black transition-colors duration-300 ease-out group-hover:bg-[#a3282a] group-hover:text-white motion-reduce:transition-none" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="-rotate-45 transition-transform duration-300 ease-out group-hover:-rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none">
          <path d="M14.43 5.93L20.5 12L14.43 18.07" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.5 12H20.33" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}

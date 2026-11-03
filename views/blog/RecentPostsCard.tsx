import Link from 'next/link';
import type { BlogSummary } from '@/models/blog';

/**
 * "Recent Posts" sidebar card — Figma 1499:16766 (512x677, 1px #eee, r24, 6/6/54 shadow). Rows come from the CMS: the
 * latest published posts excluding the open one (picked in app/blogs/[slug]/page.tsx). Row: 20px Bold #722a48 numeral,
 * 17px Medium #0c1c36 title (2-line clamp, 379px wide, brand red on hover), 15px #585858 meta, 1px rules between rows.
 * Views are not tracked in the CMS, so the meta line is the estimated read time only. Renders nothing without posts.
 */
export function RecentPostsCard({ posts }: { posts: BlogSummary[] }) {
  if (posts.length === 0) return null;

  return (
    <div className="rounded-[24px] border border-[#eee] bg-white px-6 pb-[38.5px] pt-[38px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] sm:px-[35px]">
      <h3 className="font-sans text-[24px] font-semibold leading-[1.34] text-[#04264e] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
        Recent Posts
      </h3>
      <ul className="mt-[39.2px] flex flex-col">
        {posts.map((post, i) => (
          <li key={post.slug} className={i > 0 ? 'mt-[20.4px] border-t border-[#e8e5df] pt-[20.2px]' : ''}>
            <Link href={`/blogs/${post.slug}`} className="group flex items-start gap-[10px] pl-[11px]">
              <span className="w-7 shrink-0 font-sans text-[20px] font-bold leading-[1.36] text-[#722a48]">{String(i + 1).padStart(2, '0')}</span>
              <span className="flex min-w-0 max-w-[379px] flex-col">
                <span className="line-clamp-2 font-sans text-[17px] font-medium leading-[1.36] text-[#0c1c36] transition-colors duration-200 group-hover:text-[#A6192E]">
                  {post.title}
                </span>
                {post.readTimeMinutes && (
                  <span className="mt-[4.4px] font-sans text-[15px] font-normal leading-[1.65] tracking-[-0.2px] text-[#585858]">{post.readTimeMinutes} min read</span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

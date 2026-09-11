import Link from 'next/link';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { ArrowRightIcon } from '@/views/ui/icons/ArrowRightIcon';
import type { BlogSummary } from '@/models/blog';

/**
 * One blog post card — reused by both the 3x3 grid (BlogGridSection) and
 * the "Latest Blogs" horizontal row (FeaturedBlogSection). Figma node
 * 522:4933 ("Group 1597880740") / Component 125-127: white card, `eee`
 * border, `rounded-blog`/`shadow-blog` (already tokenized in
 * tailwind.config.ts for exactly this card, node 740:4782), a navy
 * (`ink2`) category badge overlapping the image's bottom-left corner, and
 * a circular arrow-right button bottom-right of the copy.
 */
export function BlogCard({ post, priority = false, sizes }: { post: BlogSummary; priority?: boolean; sizes: string }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group flex h-full w-full flex-col overflow-hidden rounded-blog border border-card-border bg-white shadow-blog transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="relative m-4 aspect-[469/260] shrink-0 overflow-hidden rounded-2xl bg-slate-100 mb-0">
        {post.coverImage && (
          <StrapiImage
            image={post.coverImage}
            sizes={sizes}
            priority={priority}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        {post.category && (
          <span className="absolute bottom-3 left-3 rounded-[2px] bg-ink2 px-[10px] py-[10px] font-sans text-xs font-medium leading-[1.5] text-white">
            {post.category.name}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6 pt-4">
        <h3 className="font-sans text-xl font-semibold leading-[1.34] text-ink2 line-clamp-2">{post.title}</h3>
        <p className="flex-1 font-sans text-sm leading-[1.73] text-black/70 line-clamp-2">{post.excerpt}</p>
        <span
          aria-hidden="true"
          className="ml-auto flex size-11 shrink-0 items-center justify-center rounded-[17px] bg-[#e5ece7] text-ink2 transition-transform group-hover:translate-x-0.5"
        >
          <ArrowRightIcon className="size-4" />
        </span>
      </div>
    </Link>
  );
}

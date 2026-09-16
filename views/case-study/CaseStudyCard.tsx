import { StrapiImage } from '@/views/ui/StrapiImage';
import { ArrowRightIcon } from '@/views/ui/icons/ArrowRightIcon';
import type { CaseStudySummary } from '@/models/caseStudy';

/**
 * One case study card — Figma node 1023:45614, "Case Study Explorer"
 * grid (Component 1055-1060). Byte-identical shell to
 * views/blog/BlogCard.tsx (rounded-blog/shadow-blog/card-border tokens,
 * bg-ink2 category badge, bg-[#e5ece7] circular ArrowRightIcon —
 * confirmed via get_design_context: same 24px radius, same
 * 6px_6px_54px shadow, same #04264e badge). Not a link, unlike
 * BlogCard: this node only draws the listing grid, no case-study
 * detail page exists to link to (confirmed with the user before
 * building) — the arrow renders exactly as drawn, purely decorative.
 */
export function CaseStudyCard({ caseStudy, priority = false, sizes }: { caseStudy: CaseStudySummary; priority?: boolean; sizes: string }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-blog border border-card-border bg-white shadow-blog">
      <div className="relative m-4 aspect-[469/260] shrink-0 overflow-hidden rounded-2xl bg-slate-100 mb-0">
        {caseStudy.coverImage && <StrapiImage image={caseStudy.coverImage} sizes={sizes} priority={priority} fill className="object-cover" />}
        <span className="absolute bottom-3 left-3 rounded-[2px] bg-ink2 px-[10px] py-[10px] font-sans text-xs font-medium leading-[1.5] text-white">
          {caseStudy.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6 pt-4">
        <h3 className="font-sans text-xl font-semibold leading-[1.34] text-ink2 line-clamp-2">{caseStudy.title}</h3>
        <p className="flex-1 font-sans text-sm leading-[1.73] text-black/70 line-clamp-2">{caseStudy.excerpt}</p>
        <span aria-hidden="true" className="ml-auto flex size-11 shrink-0 items-center justify-center rounded-[17px] bg-[#e5ece7] text-ink2">
          <ArrowRightIcon className="size-4" />
        </span>
      </div>
    </div>
  );
}

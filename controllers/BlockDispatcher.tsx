import type { ComponentType } from 'react';
import type { BlockKind, BlockModel } from '@/models/domain';
import { HeroView } from '@/views/sections/HeroView';
import { ContentView } from '@/views/sections/ContentView';
import { FeatureGridView } from '@/views/sections/FeatureGridView';
import { TestimonialsView } from '@/views/sections/TestimonialsView';
import { CtaView } from '@/views/sections/CtaView';
import { StatsBandView } from '@/views/sections/StatsBandView';
import { ServiceBandView } from '@/views/sections/ServiceBandView';
import { IndustryGridView } from '@/views/sections/IndustryGridView';
import { MediaGalleryView } from '@/views/sections/MediaGalleryView';
import { FaqView } from '@/views/sections/FaqView';
import { BlogTeaserView } from '@/views/sections/BlogTeaserView';

type BlockViewProps<K extends BlockKind> = { block: Extract<BlockModel, { kind: K }>; index: number };
type BlockMap = { [K in BlockKind]: ComponentType<BlockViewProps<K>> };

/**
 * Exhaustive by construction — a mapped type over BlockKind. Adding a
 * BlockModel variant to models/domain.ts without registering its View
 * here fails the build (TypeScript flags a missing key on this object
 * literal), which is the real safety net for this dispatch table.
 */
const BLOCK_MAP: BlockMap = {
  hero: HeroView,
  content: ContentView,
  featureGrid: FeatureGridView,
  testimonials: TestimonialsView,
  cta: CtaView,
  statsBand: StatsBandView,
  serviceBand: ServiceBandView,
  industryGrid: IndustryGridView,
  mediaGallery: MediaGalleryView,
  faq: FaqView,
  blogTeaser: BlogTeaserView,
};

/**
 * Dynamic-zone dispatch: maps each normalized block to its registered View
 * by `block.kind` (a discriminant normalizeBlock() produces from Strapi's
 * `__component` — this file never sees that raw field name). Given
 * normalizePage()/normalizeServiceDetail() already drop any block with an
 * unrecognized `__component` before it ever becomes a BlockModel, the
 * "unregistered kind" branch below is unreachable through normal
 * type-checked flow — it exists as defense-in-depth for the one path that
 * could still hit it: a manual/unsafe cast bypassing the type system.
 */
export function BlockDispatcher({ blocks }: { blocks: BlockModel[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        // TypeScript cannot verify, from a single runtime `block.kind`
        // lookup, that the component pulled out of BLOCK_MAP is the one
        // whose prop type was narrowed to match `block` — that link only
        // exists at the type level via BlockMap's mapped type, not at an
        // indexed-access expression. This cast is the standard, narrow
        // escape hatch for a discriminated-union dispatch table; the
        // BLOCK_MAP literal above is where real type safety is enforced.
        const View = BLOCK_MAP[block.kind] as ComponentType<{ block: BlockModel; index: number }> | undefined;

        if (!View) {
          if (process.env.NODE_ENV === 'development') {
            return (
              <div key={block.id} role="alert" className="border-2 border-dashed border-red-500 p-6 text-sm text-red-700">
                Unregistered block: <code>{block.kind}</code>. Add it to BLOCK_MAP in controllers/BlockDispatcher.tsx.
              </div>
            );
          }
          return null;
        }

        return <View key={block.id} block={block} index={index} />;
      })}
    </>
  );
}

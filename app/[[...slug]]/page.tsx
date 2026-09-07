import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fetchPageBySegments, getStaticPageParams } from '@/controllers/page';
import { getGlobal, StrapiError } from '@/controllers/strapi';
import { normalizeGlobal } from '@/controllers/normalize';
import { BlockDispatcher } from '@/controllers/BlockDispatcher';

interface RouteParams {
  slug?: string[];
}

export async function generateStaticParams() {
  return getStaticPageParams();
}

export async function generateMetadata({ params }: { params: RouteParams }): Promise<Metadata> {
  const page = await fetchPageBySegments(params.slug);

  if (page?.seo) {
    return {
      title: page.seo.title,
      description: page.seo.description,
      ...(page.seo.noIndex ? { robots: { index: false, follow: false } } : {}),
    };
  }

  try {
    const global = normalizeGlobal(await getGlobal());
    return { title: global.defaultSeo.title, description: global.defaultSeo.description };
  } catch (err) {
    if (err instanceof StrapiError) return {};
    throw err;
  }
}

/**
 * Optional catch-all matching every URL depth except /services/* (owned by
 * the dedicated routes below it in the tree — Next always prefers the more
 * specific route). Resolves by the URL's *last* segment via
 * resolveSlugFromSegments().
 */
export default async function CatchAllPage({ params }: { params: RouteParams }) {
  const page = await fetchPageBySegments(params.slug);
  if (!page) notFound();

  // The fixed Navbar can't know what's behind it. A background-alignment
  // hero self-clears (its own internal pt-32, sized for a full-bleed
  // section); every other first block needs this wrapper's pt-28.
  const firstBlock = page.blocks[0];
  const needsNavClearance = !(firstBlock?.kind === 'hero' && firstBlock.mediaAlignment === 'background');

  return (
    <div className={needsNavClearance ? 'pt-28' : undefined}>
      <BlockDispatcher blocks={page.blocks} />
    </div>
  );
}

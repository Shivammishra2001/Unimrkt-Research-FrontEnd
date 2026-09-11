import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fetchPageBySegments, getStaticPageParams } from '@/controllers/page';
import { getGlobal, StrapiError, isBackendUnreachable } from '@/controllers/strapi';
import { normalizeGlobal } from '@/controllers/normalize';
import { BlockDispatcher } from '@/controllers/BlockDispatcher';
import { OfflineNotice } from '@/views/ui/OfflineNotice';
import type { PageModel } from '@/models/domain';

interface RouteParams {
  slug?: string[];
}

export async function generateStaticParams() {
  return getStaticPageParams();
}

export async function generateMetadata({ params }: { params: RouteParams }): Promise<Metadata> {
  let page: PageModel | null = null;
  try {
    page = await fetchPageBySegments(params.slug);
  } catch (err) {
    // Strapi unreachable — fall through to the site-default metadata
    // fallback below instead of crashing metadata generation. A real bug
    // (anything else) still bubbles to app/error.tsx.
    if (!isBackendUnreachable(err)) throw err;
  }

  if (page?.seo) {
    return {
      title: page.seo.title,
      description: page.seo.description,
      ...(page.seo.noIndex ? { robots: { index: false, follow: false } } : {}),
      openGraph: {
        title: page.seo.title,
        description: page.seo.description,
        type: 'website',
        ...(page.seo.shareImage
          ? { images: [{ url: page.seo.shareImage.src, width: page.seo.shareImage.width, height: page.seo.shareImage.height, alt: page.seo.shareImage.alt }] }
          : {}),
      },
    };
  }

  try {
    const global = normalizeGlobal(await getGlobal());
    return {
      title: global.defaultSeo.title,
      description: global.defaultSeo.description,
      openGraph: { title: global.defaultSeo.title, description: global.defaultSeo.description, type: 'website' },
    };
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
  let page: PageModel | null;
  try {
    page = await fetchPageBySegments(params.slug);
  } catch (err) {
    // Backend down (ECONNREFUSED, timeout, 5xx): render a friendly
    // offline notice rather than an unhandled 500. The next request —
    // once Strapi is back up — hits fetchPageBySegments() fresh and
    // renders normally again, no reconnect logic needed.
    if (isBackendUnreachable(err)) return <OfflineNotice />;
    throw err;
  }
  if (!page) notFound();

  // The fixed Navbar can't know what's behind it. A background-alignment
  // hero self-clears (its own internal pt-36, sized for a full-bleed
  // section); every other first block needs this wrapper's pt-32/pt-36.
  const firstBlock = page.blocks[0];
  const needsNavClearance = !(firstBlock?.kind === 'hero' && firstBlock.mediaAlignment === 'background');

  return (
    <div className={needsNavClearance ? 'pt-32 sm:pt-36' : undefined}>
      <BlockDispatcher blocks={page.blocks} />
    </div>
  );
}

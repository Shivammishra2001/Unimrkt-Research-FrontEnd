import type { Metadata } from 'next';
import type { SeoModel } from '@/models/domain';

/**
 * Page <title>/<meta description> from the page's own Strapi SEO component, field by field, falling back to the
 * page's built-in copy when a field is empty or Strapi can't be reached (metadata must never break the page render).
 * "Prevent indexing" in Strapi becomes robots noindex/nofollow.
 */
export async function cmsMetadata(load: () => Promise<{ seo?: SeoModel }>, fallback: { title: string; description: string }): Promise<Metadata> {
  try {
    const { seo } = await load();
    const title = seo?.title || fallback.title;
    return {
      // A CMS title that already names the brand (e.g. "Contact Us — Unimrkt Research") is used as-is, so the layout's
      // "%s | Unimrkt Research" template doesn't add the brand twice.
      title: /unimrkt/i.test(title) ? { absolute: title } : title,
      description: seo?.description || fallback.description,
      ...(seo?.keywords?.length ? { keywords: seo.keywords } : {}),
      ...(seo?.shareImage ? { openGraph: { images: [{ url: seo.shareImage.src, width: seo.shareImage.width, height: seo.shareImage.height }] } } : {}),
      ...(seo?.noIndex ? { robots: { index: false, follow: false } } : {}),
    };
  } catch {
    return fallback;
  }
}

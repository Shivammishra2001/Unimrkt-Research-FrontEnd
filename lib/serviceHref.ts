/**
 * The one canonical builder for a service's URL.
 *
 * Top-level categories live at `/services/<slug>`; a sub-service (any service
 * with a parent) lives at the nested `/services/<parent>/<slug>`. Pass the
 * parent's slug only for a genuine child — a category handed its own slug as
 * the parent (the mega-menu's synthetic "Explore {Category}" item) collapses
 * back to the flat path, so callers never have to special-case it.
 *
 * Every service link on the site (nav, footer, listing cards, sub-service
 * grids, breadcrumbs, sitemap) goes through here, and the /services/[...slug]
 * route redirects any non-canonical URL to whatever this returns.
 */
export function getServiceHref(slug: string, parentSlug?: string | null): string {
  return parentSlug && parentSlug !== slug ? `/services/${parentSlug}/${slug}` : `/services/${slug}`;
}

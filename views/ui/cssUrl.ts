/**
 * CSS `background-image: url(...)` for a CMS image.
 *
 * Strapi media URLs are absolute and, on the server, point at an address only the server can reach (e.g. http://127.0.0.1:1337/uploads/...),
 * so a browser can't load them directly the way it can through `next/image`. Routing them through Next's image endpoint makes the server
 * fetch the file and the browser only ever talks to the site's own origin. Local `/public` paths are used as they are.
 */
export function cssImageUrl(src: string, width = 1920): string {
  if (!/^https?:\/\//i.test(src)) return `url('${src}')`;
  return `url('/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=85')`;
}

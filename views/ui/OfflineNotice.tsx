/**
 * Friendly fallback for "the CMS is unreachable" (ECONNREFUSED, DNS
 * failure, timeout, or a genuine 5xx from Strapi) — as opposed to
 * `app/not-found.tsx` (a real 404) or `app/error.tsx` (an unexpected
 * bug). Rendered directly by a route's page component when its data
 * fetch throws a `StrapiError` that `isBackendUnreachable()` recognizes,
 * so a down backend degrades to this instead of an unhandled 500.
 *
 * No retry button here on purpose: a Server Component's next request —
 * the next navigation, or the user's own browser refresh — re-runs the
 * fetch from scratch and picks the CMS back up automatically the moment
 * it's reachable again; there's no client-side state to reset.
 */
export function OfflineNotice({
  title = "We can't reach the server right now",
  message = 'This page is temporarily unavailable. Please try again in a moment.',
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold text-heading">{title}</h1>
      <p className="text-base opacity-80">{message}</p>
    </div>
  );
}

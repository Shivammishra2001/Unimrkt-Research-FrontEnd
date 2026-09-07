// Plain JavaScript, not next.config.ts — this project targets Next.js 14
// (next.config.ts support requires Next 15+).
//
// IP-aware image whitelist (mandate #1): the Strapi backend for this
// project is a remote LAN instance, reachable at more than one address
// depending on network path (`10.50.1.2` primary, `10.40.27.11` alternate),
// plus `localhost` for local-Strapi development. All three stay whitelisted
// unconditionally so switching NEXT_PUBLIC_STRAPI_ASSET_URL between them
// never requires touching this file. Whatever host that env var currently
// points at is folded in too, so a not-yet-listed LAN IP or a future public
// CDN domain (set NEXT_PUBLIC_STRAPI_ASSET_URL to it) still resolves
// without a code change.

const KNOWN_STRAPI_HOSTS = ['10.50.1.2', '10.40.27.11', 'localhost'];

function deriveAssetHost() {
  try {
    return new URL(process.env.NEXT_PUBLIC_STRAPI_ASSET_URL ?? 'http://localhost:1337').hostname;
  } catch {
    return 'localhost';
  }
}

const remoteHosts = Array.from(new Set([...KNOWN_STRAPI_HOSTS, deriveAssetHost()]));

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Strapi's local upload provider serves media at /uploads/** on port 1337.
      ...remoteHosts.map((hostname) => ({
        protocol: 'http',
        hostname,
        port: '1337',
        pathname: '/uploads/**',
      })),
      // Add a production CDN/domain here when one is introduced, e.g.:
      // { protocol: 'https', hostname: 'media.unimrkt-research.com', pathname: '/uploads/**' },
    ],
    // Required for two real cases, not just mock mode: (1) every fixture
    // under mocks/fixtures/media.ts references a locally-bundled SVG
    // placeholder, and (2) Strapi accepts SVG uploads by default, so a
    // real editor's site logo is quite plausibly an .svg. Next's image
    // optimizer refuses SVG sources unless explicitly opted in (they can't
    // be re-encoded like a raster format, and an arbitrary SVG can carry
    // a script) — contentDispositionType/CSP below keep that opt-in from
    // also becoming an XSS vector for a maliciously-uploaded SVG.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;

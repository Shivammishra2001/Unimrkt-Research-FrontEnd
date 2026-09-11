import { cache } from 'react';
import type { Metadata } from 'next';
import { Montserrat, Inter, Quicksand, Anton } from 'next/font/google';
import './globals.css';
import { getGlobal, StrapiError } from '@/controllers/strapi';
import { normalizeGlobal } from '@/controllers/normalize';
import { getAllServiceCategories } from '@/controllers/service';
import { Navbar } from '@/views/sections/Navbar';
import { Footer } from '@/views/sections/Footer';
import { FloatingChatButton } from '@/views/ui/FloatingChatButton';
import type { GlobalModel, NavigationItemModel } from '@/models/domain';
import type { ServiceTreeItemModel } from '@/models/service';

// All four typefaces loaded once here and exposed as CSS variables consumed
// only by tailwind.config.ts's fontFamily tokens — no View imports
// next/font directly.
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
});
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});
const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-quicksand',
});
const anton = Anton({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-anton',
});

const BRAND_NAME = 'Unimrkt Research';

/**
 * react `cache()`-wrapped so generateMetadata() and RootLayout's body share
 * one call (matters most in live mode, where each is otherwise a separate
 * network round trip — in mock mode there's no network cost either way,
 * but the cache still guarantees exactly-once execution per request).
 *
 * Graceful degradation is deliberate: a failed Global fetch must never
 * take the whole page down. A StrapiError is logged and swallowed —
 * generateMetadata falls back to a bare brand title, and the layout body
 * renders minimal chrome (no nav/footer) instead. Any other error type is
 * rethrown so a real bug still surfaces to app/error.tsx.
 */
const loadGlobal = cache(async (): Promise<GlobalModel | null> => {
  try {
    return normalizeGlobal(await getGlobal());
  } catch (err) {
    if (err instanceof StrapiError) {
      console.error('[layout] Global fetch failed, rendering minimal chrome:', err.message);
      return null;
    }
    throw err;
  }
});

/**
 * Google Sheet IA migration: the Services dropdown needs to reflect the
 * real category hierarchy (api::service.service, self-referencing), not
 * the hand-curated `global.primaryNav` children every other nav item still
 * uses. This is a deliberate, localized inconsistency — every other
 * dropdown stays CMS-seeded/static; only Services becomes live-fetched —
 * rather than a wholesale nav-architecture change. Graceful degradation
 * matches loadGlobal(): a failed fetch here falls back to whatever
 * children `primaryNav` already seeded for Services, not a broken layout.
 */
const loadServiceCategories = cache(async (): Promise<ServiceTreeItemModel[] | null> => {
  try {
    return await getAllServiceCategories();
  } catch (err) {
    console.error(
      '[layout] Service category tree fetch failed, Services dropdown falls back to CMS-seeded children:',
      err
    );
    return null;
  }
});

function withDynamicServicesDropdown(
  navigation: GlobalModel['navigation'],
  categories: ServiceTreeItemModel[] | null
): GlobalModel['navigation'] {
  if (!categories) return navigation;

  return {
    ...navigation,
    items: navigation.items.map((item): NavigationItemModel => {
      if (item.href !== '/services') return item;
      return {
        ...item,
        children: categories.map((c) => ({
          id: `svc-cat-${c.slug}`,
          label: c.title,
          href: `/services/${c.slug}`,
          isExternal: false,
          children: [],
          showIndicator: false,
        })),
      };
    }),
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const global = await loadGlobal();
  if (!global) return { title: BRAND_NAME };

  return {
    title: { default: global.defaultSeo.title, template: `%s | ${global.navigation.siteName}` },
    description: global.defaultSeo.description,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const global = await loadGlobal();
  const categories = global ? await loadServiceCategories() : null;

  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} ${quicksand.variable} ${anton.variable}`}
    >
      <body className="flex min-h-screen flex-col font-sans antialiased">
        {global ? (
          <Navbar
            navigation={withDynamicServicesDropdown(global.navigation, categories)}
            serviceCategories={categories}
          />
        ) : (
          <header className="border-b border-slate-200 p-4 text-center text-sm">{BRAND_NAME}</header>
        )}
        <main className="flex-1">{children}</main>
        {global && <Footer footer={global.footer} />}
        <FloatingChatButton />
      </body>
    </html>
  );
}

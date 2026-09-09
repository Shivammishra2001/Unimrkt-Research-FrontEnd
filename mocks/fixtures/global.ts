/**
 * Verbatim from backend/scripts/seed.ts's upsertGlobal() — same siteName,
 * nav tree, footer columns, social links, and default SEO copy the real
 * backend seeds.
 */
import type { StrapiGlobalResponse, StrapiLink, StrapiNavItem } from '@/models/strapi';
import { MOCK_IMAGES } from './media';

let nextLinkId = 1;
function link(label: string, href: string, isExternal: boolean, variant: StrapiLink['variant'] = 'link'): StrapiLink {
  nextLinkId += 1;
  return { id: nextLinkId, label, href, isExternal, variant };
}

let nextNavId = 1;
function navItem(
  label: string,
  href: string,
  children: StrapiNavItem['children'] = []
): StrapiNavItem {
  nextNavId += 1;
  return { id: nextNavId, label, href, isExternal: false, children };
}

let nextNavChildId = 1;
function navChild(label: string, href: string): StrapiNavItem['children'][number] {
  nextNavChildId += 1;
  return { id: nextNavChildId, label, href, isExternal: false };
}

const PRIMARY_NAV: StrapiNavItem[] = [
  navItem('About unimrkt', '/about'),
  navItem('Services', '/services', [
    navChild('Web Development', '/services/web-development'),
    navChild('UI/UX Design', '/services/ui-ux-design'),
    navChild('Cloud & DevOps', '/services/cloud-devops'),
  ]),
  navItem('Industries', '/#industries', [navChild('Nested route demo', '/about/cloud')]),
  navItem('Blogs', '/#blogs'),
  navItem('gallery', '/#gallery'),
  navItem('Contact', '/contact'),
];

export const MOCK_GLOBAL: StrapiGlobalResponse = {
  data: {
    id: 1,
    documentId: 'mock-global-1',
    siteName: 'Unimrkt Research',
    logo: MOCK_IMAGES.logoNav,
    logoDark: null,
    primaryNav: PRIMARY_NAV,
    navCta: link('Talk to Experts', '/contact', false, 'primary'),
    footerColumns: [
      {
        id: 1,
        heading: 'Our Company',
        links: [
          link('About Us', '/about', false),
          link('Contact Us', '/contact', false),
          link('Privacy Policy', '/privacy', false),
          link('Global Panel', '/#global-panel', false),
          link('Gallery', '/#gallery', false),
        ],
      },
      {
        id: 2,
        heading: 'Services',
        links: [
          link('Primary Research', '/services', false),
          link('Qualitative Research', '/services', false),
          link('Quantitative Research', '/services', false),
          link('Business Research', '/services', false),
          link('Research Support Functions', '/services', false),
        ],
      },
      {
        id: 3,
        heading: 'Quick Links',
        links: [
          link('Industries', '/#industries', false),
          link('Our Team', '/about', false),
          link('Careers', '/careers', false),
          link('Blogs', '/#blogs', false),
          link('Sitemap', '/sitemap', false),
        ],
      },
    ],
    socialLinks: [
      link('Facebook', 'https://facebook.com', true),
      link('X', 'https://x.com', true),
      link('LinkedIn', 'https://linkedin.com', true),
      link('Instagram', 'https://instagram.com', true),
    ],
    copyright: `Copyright © ${new Date().getFullYear()} Unimrkt Research All rights reserved.`,
    footerTagline:
      'Delivering global market research, data collection, and actionable insights that drive smarter business decisions.',
    defaultSeo: {
      id: 1,
      metaTitle: 'Unimrkt Research — Structured Market Data',
      metaDescription:
        'Unimrkt Research delivers reliable market intelligence, actionable insights, and data-driven strategies across 90+ countries and 22+ languages.',
      shareImage: null,
      keywords: null,
      preventIndexing: false,
    },
  },
  meta: {},
};

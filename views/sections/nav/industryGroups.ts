import type { IndustriesMenuModel, NavigationItemModel, ServicesMenuModel } from '@/models/domain';
import type { ServiceTreeItemModel } from '@/models/service';

/* Which nav item opens which mega-menu: the CMS "Menu type" decides; older data without it falls back to the URL. */
export const isServicesItem = (item: NavigationItemModel) => (item.menuType ? item.menuType === 'services_mega_menu' : item.href === '/services');
export const isIndustriesItem = (item: NavigationItemModel) =>
  item.menuType ? item.menuType === 'industries_mega_menu' : /industr/i.test(item.href) || /^industries$/i.test(item.label.trim());

/** Live Strapi industries when available; otherwise the nav item's own CMS children that point at an industry page. */
export function industriesFor(item: NavigationItemModel, industries: NavIndustry[] | null): NavIndustry[] {
  if (industries?.length) return industries;
  return item.children
    .map((c) => ({ title: c.label, slug: c.href.match(/^\/industries\/([^/?#]+)/)?.[1] ?? '' }))
    .filter((c) => c.slug);
}

export interface NavIndustry {
  slug: string;
  title: string;
}

export interface IndustryGroup {
  label: string;
  items: NavIndustry[];
}

/** Replaces {count} in a CMS label. */
export const withCount = (text: string, count: number) => text.replace(/\{count\}/g, String(count));

/* ------------------------------------------------------------ services */

/**
 * Global → Services Mega-Menu applied to the live category tree: categories listed there come first, in that order,
 * with their label / description overrides, minus any switched off; every other published category (e.g. one created
 * after the menu was set up) follows in tree order while "Auto-include new" is on. Sub-services always come live from
 * the tree, so a new sub-service appears under its parent automatically. No settings = the tree as is.
 */
export function applyServicesMenu(tree: ServiceTreeItemModel[], menu?: ServicesMenuModel): ServiceTreeItemModel[] {
  if (!menu || menu.categories.length === 0) return tree;
  const bySlug = new Map(tree.map((c) => [c.slug, c]));
  const listed = new Set(menu.categories.map((c) => c.slug));
  const ordered = menu.categories
    .filter((c) => c.isVisible && bySlug.has(c.slug))
    .map((c) => {
      const base = bySlug.get(c.slug)!;
      return { ...base, title: c.label || base.title, summary: c.description || base.summary };
    });
  const extras = menu.autoIncludeNew ? tree.filter((c) => !listed.has(c.slug)) : [];
  return [...ordered, ...extras];
}

/* ---------------------------------------------------------- industries */

/** Built-in sector buckets (slug match) — used only while Global → Industries Mega-Menu has no groups. */
const GROUPS: Array<{ label: string; match: RegExp }> = [
  { label: 'Automotive, Mobility & Industrial', match: /automotive|transport|aerospace|defen[cs]e|manufactur|chemical|construction|architecture|logistic/ },
  { label: 'Energy & Natural Resources', match: /energy|utilit|oil|gas|metal|mining|agri/ },
  { label: 'BFSI, Tech & Telecom', match: /bank|financ|fintech|insurance|telecom|\bit\b|^it-|technology|software/ },
  { label: 'Healthcare & Professional Services', match: /health|life-science|pharma|education|legal|professional|business-services|real-estate/ },
  { label: 'Consumer, Retail & Media', match: /fmcg|retail|cpg|food|beverage|commerce|marketplace|fashion|textile|media|entertainment|sport|travel|tourism|hospitality/ },
];

/**
 * Sector groups for the Industries mega-menu. With CMS groups: each group lists the published industries picked for
 * it (an unpublished or deleted pick simply drops out), and every published industry not picked anywhere — including
 * one created after the groups were set up — lands in the "Other" group, so nothing is ever missing. Without CMS
 * groups: the built-in slug buckets.
 */
export function groupIndustries(industries: NavIndustry[], menu?: IndustriesMenuModel): IndustryGroup[] {
  const otherLabel = menu?.otherGroupLabel || 'Other Industries';
  const sort = (items: NavIndustry[]) => [...items].sort((a, b) => a.title.localeCompare(b.title));

  if (menu && menu.groups.length > 0) {
    const bySlug = new Map(industries.map((i) => [i.slug, i]));
    const placed = new Set<string>();
    const groups: IndustryGroup[] = menu.groups.map((g) => {
      const items = g.slugs.filter((s) => bySlug.has(s) && !placed.has(s)).map((s) => bySlug.get(s)!);
      items.forEach((i) => placed.add(i.slug));
      return { label: g.label, items: sort(items) };
    });
    const other = industries.filter((i) => !placed.has(i.slug));
    if (other.length) groups.push({ label: otherLabel, items: sort(other) });
    return groups.filter((g) => g.items.length > 0);
  }

  const buckets = GROUPS.map((g) => ({ label: g.label, items: [] as NavIndustry[] }));
  const other: NavIndustry[] = [];
  for (const industry of industries) {
    const i = GROUPS.findIndex((g) => g.match.test(industry.slug));
    (i >= 0 ? buckets[i].items : other).push(industry);
  }
  const groups = buckets.filter((b) => b.items.length > 0).map((b) => ({ ...b, items: sort(b.items) }));
  if (other.length) groups.push({ label: otherLabel, items: sort(other) });
  return groups;
}

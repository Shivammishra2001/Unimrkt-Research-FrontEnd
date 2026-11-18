import type { NavigationItemModel } from '@/models/domain';

export const isServicesItem = (item: NavigationItemModel) => item.href === '/services';
export const isIndustriesItem = (item: NavigationItemModel) => /industr/i.test(item.href) || /^industries$/i.test(item.label.trim());

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

/** Sector buckets for the Industries mega-menu, matched on the CMS slug. Order = display order. Anything that matches
 * none (a new industry added in Strapi) lands in "Other Sectors", so every industry always appears. */
const GROUPS: Array<{ label: string; match: RegExp }> = [
  { label: 'Automotive, Mobility & Industrial', match: /automotive|transport|aerospace|defen[cs]e|manufactur|chemical|construction|architecture|logistic/ },
  { label: 'Energy & Natural Resources', match: /energy|utilit|oil|gas|metal|mining|agri/ },
  { label: 'BFSI, Tech & Telecom', match: /bank|financ|fintech|insurance|telecom|\bit\b|^it-|technology|software/ },
  { label: 'Healthcare & Professional Services', match: /health|life-science|pharma|education|legal|professional|business-services|real-estate/ },
  { label: 'Consumer, Retail & Media', match: /fmcg|retail|cpg|food|beverage|commerce|marketplace|fashion|textile|media|entertainment|sport|travel|tourism|hospitality/ },
];

export function groupIndustries(industries: NavIndustry[]): IndustryGroup[] {
  const buckets = GROUPS.map((g) => ({ label: g.label, items: [] as NavIndustry[] }));
  const other: NavIndustry[] = [];
  for (const industry of industries) {
    const i = GROUPS.findIndex((g) => g.match.test(industry.slug));
    (i >= 0 ? buckets[i].items : other).push(industry);
  }
  const groups = buckets.filter((b) => b.items.length > 0);
  if (other.length) groups.push({ label: 'Other Sectors', items: other });
  for (const g of groups) g.items.sort((a, b) => a.title.localeCompare(b.title));
  return groups;
}

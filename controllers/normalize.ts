/**
 * The ONLY file that knows Strapi's wire format, besides mocks/* (which
 * fabricate that same wire format). v4-vs-v5 differences are meant to be
 * branched here and nowhere else. Per FRONTEND_SPEC.md §4.2.
 */
import { toImageModel } from './image';
import type {
  StrapiBlock,
  StrapiFeatureItem,
  StrapiGlobal,
  StrapiLink,
  StrapiNavItem,
  StrapiPageResponse,
  StrapiPageSlugsResponse,
  StrapiGlobalResponse,
  StrapiSeo,
  StrapiTestimonial,
} from '@/models/strapi';
import type {
  BlockModel,
  FeatureModel,
  FooterModel,
  GlobalModel,
  LinkModel,
  NavigationItemModel,
  NavigationModel,
  PageModel,
  PageSlugModel,
  SeoModel,
  TestimonialModel,
} from '@/models/domain';
import type {
  StrapiServiceDetail,
  StrapiServiceDetailResponse,
  StrapiServiceListResponse,
  StrapiServiceSlugsResponse,
  StrapiServiceTreeResponse,
  ServiceDetail,
  ServiceSlugModel,
  ServiceSummary,
  ServiceTreeItemModel,
} from '@/models/service';
import type {
  StrapiIndustryDetailResponse,
  StrapiIndustryListResponse,
  StrapiIndustrySlugsResponse,
  IndustryDetail,
  IndustrySlugModel,
  IndustrySummary,
} from '@/models/industry';
// ---------------------------------------------------------------------------
// Shared primitives
// ---------------------------------------------------------------------------

export function normalizeLink(link: StrapiLink): LinkModel {
  return {
    id: `link-${link.id}`,
    label: link.label,
    href: link.href,
    isExternal: link.isExternal,
    variant: link.variant,
  };
}

export function normalizeNavItem(item: StrapiNavItem): NavigationItemModel {
  return {
    id: `nav-${item.id}`,
    label: item.label,
    href: item.href,
    isExternal: item.isExternal,
    showIndicator: item.showIndicator ?? false,
    // Strapi components cap nesting at one level — every child is
    // hardcoded to an empty children array rather than recursed further.
    children: (item.children ?? []).map((child) => ({
      id: `nav-${child.id}`,
      label: child.label,
      href: child.href,
      isExternal: child.isExternal,
      children: [],
      showIndicator: false,
    })),
  };
}

export function normalizeSeo(seo: StrapiSeo | null | undefined, fallbackTitle: string): SeoModel | undefined {
  if (!seo) return undefined;
  return {
    title: seo.metaTitle || fallbackTitle,
    description: seo.metaDescription,
    shareImage: toImageModel(seo.shareImage, fallbackTitle),
    keywords: seo.keywords
      ? seo.keywords
          .split(',')
          .map((k) => k.trim())
          .filter(Boolean)
      : [],
    noIndex: !!seo.preventIndexing,
  };
}

export function normalizeTestimonial(t: StrapiTestimonial): TestimonialModel {
  return {
    id: `testimonial-${t.id}`,
    quote: t.quote,
    authorName: t.authorName,
    authorRole: t.authorRole ?? undefined,
    company: t.company ?? undefined,
    avatar: toImageModel(t.avatar, t.authorName),
    companyLogo: toImageModel(t.companyLogo, t.company ?? t.authorName),
    rating: t.rating ?? 5,
  };
}

export function normalizeFeatureItem(item: StrapiFeatureItem): FeatureModel {
  return {
    id: `feature-${item.id}`,
    title: item.title,
    description: item.description,
    icon: toImageModel(item.icon, item.title),
    link: item.link ? normalizeLink(item.link) : undefined,
  };
}

// ---------------------------------------------------------------------------
// Blocks (dynamic zone)
// ---------------------------------------------------------------------------

export function normalizeBlock(block: StrapiBlock): BlockModel | undefined {
  const theme = block.theme ?? 'light';
  const anchorId = block.anchorId ?? undefined;
  const id = `${block.__component}-${block.id}`;

  switch (block.__component) {
    case 'blocks.hero': {
      // media/videoUrl are mutually exclusive — branch on the uploaded
      // file's real mime type, not an assumption; the same `media` field
      // accepts either an image or a video upload.
      const isVideo = block.media?.mime?.startsWith('video/') ?? false;
      return {
        kind: 'hero',
        id,
        anchorId,
        theme,
        eyebrow: block.eyebrow ?? undefined,
        heading: block.heading,
        subheading: block.subheading ?? undefined,
        media: isVideo ? undefined : toImageModel(block.media, block.heading),
        videoUrl: isVideo && block.media ? toImageModel(block.media, block.heading)?.src : undefined,
        mediaAlignment: block.mediaAlignment,
        actions: (block.actions ?? []).map(normalizeLink),
        sideMenu: (block.sideMenu ?? []).map((item) => ({
          id: `svc-${item.id}`,
          label: item.label,
          href: item.href,
          isActive: item.isActive ?? false,
        })),
        headingSize: block.headingSize ?? 'display',
        statValue: block.statValue ?? undefined,
        statLabel: block.statLabel ?? undefined,
      };
    }
    case 'blocks.content':
      return {
        kind: 'content',
        id,
        anchorId,
        theme,
        heading: block.heading ?? undefined,
        body: block.body,
        media: toImageModel(block.media, block.heading ?? 'Content image'),
        mediaAlignment: block.mediaAlignment,
        contactPrompt: block.contactPrompt ?? undefined,
        contactEmail: block.contactEmail ?? undefined,
      };
    case 'blocks.feature-grid':
      return {
        kind: 'featureGrid',
        id,
        anchorId,
        theme,
        heading: block.heading ?? undefined,
        subheading: block.subheading ?? undefined,
        columns: Number(block.columns) as 2 | 3 | 4,
        items: (block.items ?? []).map(normalizeFeatureItem),
      };
    case 'blocks.testimonials':
      return {
        kind: 'testimonials',
        id,
        anchorId,
        theme,
        heading: block.heading ?? undefined,
        subheading: block.subheading ?? undefined,
        layout: block.layout,
        // testimonials is a relation, not a repeatable component — guarded
        // because a published-status query can silently omit unpublished
        // entries, coming back as [] or the key missing entirely.
        items: (block.testimonials ?? []).map(normalizeTestimonial),
      };
    case 'blocks.cta':
      return {
        kind: 'cta',
        id,
        anchorId,
        theme,
        heading: block.heading,
        body: block.body ?? undefined,
        actions: (block.actions ?? []).map(normalizeLink),
        background: toImageModel(block.background, block.heading),
        backgroundColor: block.backgroundColor ?? undefined,
      };
    case 'blocks.stats-band':
      return {
        kind: 'statsBand',
        id,
        anchorId,
        theme,
        heading: block.heading ?? undefined,
        items: block.items.map((item) => ({ id: `stat-${item.id}`, value: item.value, label: item.label })),
      };
    case 'blocks.service-band':
      return {
        kind: 'serviceBand',
        id,
        anchorId,
        theme,
        heading: block.heading,
        body: block.body ?? undefined,
        background: toImageModel(block.background, block.heading),
        cta: block.cta ? normalizeLink(block.cta) : undefined,
        items: block.items.map((item) => ({
          id: `svc-${item.id}`,
          label: item.label,
          href: item.href,
          isActive: item.isActive ?? false,
          description: item.description ?? undefined,
        })),
      };
    case 'blocks.industry-grid':
      return {
        kind: 'industryGrid',
        id,
        anchorId,
        theme,
        heading: block.heading,
        subheading: block.subheading ?? undefined,
        background: toImageModel(block.background, block.heading),
        cta: block.cta ? normalizeLink(block.cta) : undefined,
        items: block.items.map((item) => ({
          id: `industry-${item.id}`,
          title: item.title,
          image: toImageModel(item.image, item.title),
          accentColor: item.accentColor ?? '#7f3856',
        })),
      };
    case 'blocks.media-gallery':
      return {
        kind: 'mediaGallery',
        id,
        anchorId,
        theme,
        heading: block.heading,
        subheading: block.subheading ?? undefined,
        actions: (block.actions ?? []).map(normalizeLink),
        items: block.items.map((item) => ({
          id: `media-${item.id}`,
          media: toImageModel(item.media, block.heading),
          size: item.size,
          videoUrl: item.videoUrl ?? undefined,
        })),
      };
    case 'blocks.faq':
      return {
        kind: 'faq',
        id,
        anchorId,
        theme,
        heading: block.heading,
        background: toImageModel(block.background, block.heading),
        items: block.items.map((item) => ({ id: `faq-${item.id}`, question: item.question, answer: item.answer })),
      };
    case 'blocks.blog-teaser':
      return {
        kind: 'blogTeaser',
        id,
        anchorId,
        theme,
        eyebrow: block.eyebrow ?? undefined,
        heading: block.heading,
        actions: (block.actions ?? []).map(normalizeLink),
        posts: block.posts.map((post) => ({
          id: `post-${post.id}`,
          title: post.title,
          excerpt: post.excerpt ?? undefined,
          image: toImageModel(post.image, post.title),
          href: post.href,
        })),
      };
    default:
      // An unknown __component from a newer Strapi deploy is dropped, not
      // crashed on — BlockDispatcher's dev diagnostic (Phase F3) only
      // fires for *known* kinds missing a registered View.
      return undefined;
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export function normalizePage(res: StrapiPageResponse): PageModel {
  const { data } = res;
  return {
    title: data.title,
    slug: data.slug,
    seo: normalizeSeo(data.seo, data.title),
    blocks: data.blocks.map(normalizeBlock).filter((b): b is BlockModel => !!b),
  };
}

export function normalizePageSlugs(res: StrapiPageSlugsResponse): PageSlugModel[] {
  return res.data.map((p) => ({ slug: p.slug, updatedAt: p.updatedAt }));
}

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------

function normalizeServiceSummaryFields(data: {
  slug: string;
  title: string;
  summary: string;
  thumbnail: StrapiServiceDetail['thumbnail'];
  basePrice: string | null;
}): ServiceSummary {
  return {
    slug: data.slug,
    title: data.title,
    summary: data.summary,
    thumbnail: toImageModel(data.thumbnail, data.title),
    basePrice: data.basePrice ?? undefined,
  };
}

export function normalizeServiceList(res: StrapiServiceListResponse): ServiceSummary[] {
  return res.data.map(normalizeServiceSummaryFields);
}

export function normalizeServiceDetail(res: StrapiServiceDetailResponse): ServiceDetail {
  const { data } = res;
  return {
    ...normalizeServiceSummaryFields(data),
    features: (data.features ?? []).map(normalizeFeatureItem),
    seo: normalizeSeo(data.seo, data.title),
    blocks: data.blocks.map(normalizeBlock).filter((b): b is BlockModel => !!b),
    // Category hierarchy (Google Sheet IA migration) — optional on the raw
    // type since the 3 demo services never set these.
    legacyUrl: data.legacyUrl ?? undefined,
    suggestedUrl: data.suggestedUrl ?? undefined,
    parent: data.parent ?? undefined,
    children: (data.children ?? []).map((c) => ({ slug: c.slug, title: c.title, summary: c.summary })),
  };
}

export function normalizeServiceSlugs(res: StrapiServiceSlugsResponse): ServiceSlugModel[] {
  return res.data.map((s) => ({ slug: s.slug, updatedAt: s.updatedAt }));
}

/** GET /services/tree — Services nav dropdown + category listing (Google
 * Sheet IA migration). Flattens each item's one level of children; never
 * recurses further (the sheet's Services data is exactly 2 levels deep
 * under a top-level category). */
export function normalizeServiceTree(res: StrapiServiceTreeResponse): ServiceTreeItemModel[] {
  return res.data.map((item) => ({
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    children: item.children.map((c) => ({ slug: c.slug, title: c.title, summary: c.summary })),
  }));
}

// ---------------------------------------------------------------------------
// Industry (Google Sheet IA migration)
// ---------------------------------------------------------------------------

function normalizeIndustrySummaryFields(data: {
  slug: string;
  title: string;
  summary: string | null;
  icon: StrapiIndustryDetailResponse['data']['icon'];
}): IndustrySummary {
  return {
    slug: data.slug,
    title: data.title,
    summary: data.summary ?? undefined,
    icon: toImageModel(data.icon, data.title),
  };
}

export function normalizeIndustryList(res: StrapiIndustryListResponse): IndustrySummary[] {
  return res.data.map(normalizeIndustrySummaryFields);
}

export function normalizeIndustryDetail(res: StrapiIndustryDetailResponse): IndustryDetail {
  const { data } = res;
  return {
    ...normalizeIndustrySummaryFields(data),
    legacyUrl: data.legacyUrl ?? undefined,
    suggestedUrl: data.suggestedUrl ?? undefined,
    seo: normalizeSeo(data.seo, data.title),
    blocks: data.blocks.map(normalizeBlock).filter((b): b is BlockModel => !!b),
  };
}

export function normalizeIndustrySlugs(res: StrapiIndustrySlugsResponse): IndustrySlugModel[] {
  return res.data.map((i) => ({ slug: i.slug, updatedAt: i.updatedAt }));
}


// ---------------------------------------------------------------------------
// Global
// ---------------------------------------------------------------------------

export function normalizeGlobal(res: StrapiGlobalResponse): GlobalModel {
  const data: StrapiGlobal = res.data;

  const navigation: NavigationModel = {
    siteName: data.siteName,
    // Non-null assertion — logo is a required field on the schema.
    logo: toImageModel(data.logo, data.siteName)!,
    logoDark: toImageModel(data.logoDark, data.siteName),
    items: data.primaryNav.map(normalizeNavItem),
    cta: data.navCta ? normalizeLink(data.navCta) : undefined,
  };

  const footer: FooterModel = {
    columns: data.footerColumns.map((col) => ({
      id: `footer-col-${col.id}`,
      heading: col.heading,
      links: col.links.map(normalizeLink),
    })),
    socialLinks: data.socialLinks.map(normalizeLink),
    copyright: data.copyright ?? undefined,
    logo: navigation.logo,
    tagline: data.footerTagline ?? undefined,
  };

  return {
    navigation,
    footer,
    // Non-null assertion — defaultSeo is a required field on the schema.
    defaultSeo: normalizeSeo(data.defaultSeo, data.siteName)!,
  };
}

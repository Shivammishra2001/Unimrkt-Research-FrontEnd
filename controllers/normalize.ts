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
  StrapiIndustryItem,
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
  IndustryItemModel,
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
  StrapiServiceStatItem,
  StrapiServiceTreeResponse,
  ServiceDetail,
  ServiceSlugModel,
  ServiceStatItemModel,
  ServiceSummary,
  ServiceTreeItemModel,
} from '@/models/service';
import type {
  StrapiIndustryDetailResponse,
  StrapiIndustryDetailCard,
  StrapiIndustryListResponse,
  StrapiIndustrySlugsResponse,
  StrapiTrustLogo,
  IndustryDetail,
  IndustryDetailCardModel,
  IndustrySlugModel,
  IndustrySummary,
  TrustLogoModel,
} from '@/models/industry';
import type { StrapiGalleryItemListResponse, GalleryImage } from '@/models/gallery';
import type { StrapiServicesPageResponse, ServicesPageSettings } from '@/models/servicesPage';
import type { StrapiOurCompanyPageResponse, OurCompanySettings } from '@/models/ourCompanyPage';
import type { StrapiContactPageResponse, StrapiOfficeLocation, ContactPageSettings, OfficeLocationModel } from '@/models/contactPage';
import type {
  StrapiBlogDetailResponse,
  StrapiBlogListResponse,
  StrapiBlogSlugsResponse,
  StrapiBlogSummary,
  StrapiBlocksContent,
  StrapiBlocksNode,
  BlogDetail,
  BlogSlugModel,
  BlogSummary,
} from '@/models/blog';
import type { StrapiCategory, StrapiCategoryListResponse, CategoryModel } from '@/models/category';
import type { FaqItemModel } from '@/models/domain';
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
    iconIdentifier: item.iconIdentifier ?? undefined,
    link: item.link ? normalizeLink(item.link) : undefined,
    statValue: item.statValue ?? undefined,
    statLabel: item.statLabel ?? undefined,
    // Existing feature-grid rows created before `order` existed have no
    // value for it at the DB level (a schema default only applies to new
    // rows) — falls back to 0, same as every other optional-turned-field
    // in this file.
    order: item.order ?? 0,
  };
}

/** blocks.industry-item — reused by both blocks.industry-grid (dynamic
 * zone) and the industries/[slug] detail page's Methodologies/Case
 * Studies grids (neither of which is a dynamic-zone block). */
export function normalizeIndustryItem(item: StrapiIndustryItem): IndustryItemModel {
  return {
    id: `industry-${item.id}`,
    title: item.title,
    image: toImageModel(item.image, item.title),
    accentColor: item.accentColor ?? '#7f3856',
  };
}

/** industries.detail-card — the recurring "title + short description +
 * either a photo or a line icon" card shape used by /industries/[slug]'s
 * Why-Research/Expertise/Challenges/Who-We-Serve grids. */
export function normalizeIndustryDetailCard(item: StrapiIndustryDetailCard): IndustryDetailCardModel {
  return {
    id: `industry-card-${item.id}`,
    title: item.title,
    description: item.description ?? undefined,
    image: toImageModel(item.image, item.title),
    icon: toImageModel(item.icon, item.title),
    iconIdentifier: item.iconIdentifier ?? undefined,
  };
}

function normalizeTrustLogo(item: StrapiTrustLogo): TrustLogoModel {
  return {
    id: `trust-logo-${item.id}`,
    name: item.name,
    image: toImageModel(item.image, item.name),
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
        items: block.items.map(normalizeIndustryItem),
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
        cta: block.cta ? normalizeLink(block.cta) : undefined,
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
    case 'blocks.why-choose-us':
      return {
        kind: 'whyChooseUs',
        id,
        anchorId,
        theme,
        eyebrow: block.eyebrow ?? undefined,
        heading: block.heading,
        subheading: block.subheading ?? undefined,
        description: block.description ?? undefined,
        // Editors reorder cards via each item's `order` field rather than
        // drag-and-drop in the CMS's repeatable-component UI.
        items: (block.items ?? []).map(normalizeFeatureItem).sort((a, b) => a.order - b.order),
      };
    case 'blocks.process-steps':
      return {
        kind: 'processSteps',
        id,
        anchorId,
        theme,
        eyebrow: block.eyebrow ?? undefined,
        heading: block.heading,
        subheading: block.subheading ?? undefined,
        steps: (block.steps ?? [])
          .map((step) => ({
            id: `step-${step.id}`,
            stepNumber: step.stepNumber ?? undefined,
            title: step.title,
            description: step.description,
            icon: toImageModel(step.icon, step.title),
            iconIdentifier: step.iconIdentifier ?? undefined,
            order: step.order ?? 0,
          }))
          .sort((a, b) => a.order - b.order),
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

function normalizeServiceStatItem(item: StrapiServiceStatItem): ServiceStatItemModel {
  return {
    id: `service-stat-${item.id}`,
    value: item.value,
    label: item.label,
    iconIdentifier: item.iconIdentifier ?? undefined,
  };
}

export function normalizeServiceDetail(res: StrapiServiceDetailResponse): ServiceDetail {
  const { data } = res;
  return {
    ...normalizeServiceSummaryFields(data),
    features: (data.features ?? []).map(normalizeFeatureItem),
    seo: normalizeSeo(data.seo, data.title),
    // Category hierarchy (Google Sheet IA migration) — optional on the raw
    // type since the 3 demo services never set these.
    legacyUrl: data.legacyUrl ?? undefined,
    suggestedUrl: data.suggestedUrl ?? undefined,
    parent: data.parent ?? undefined,
    children: (data.children ?? []).map((c) => ({ slug: c.slug, title: c.title, summary: c.summary })),

    heroEyebrow: data.heroEyebrow ?? undefined,
    heroHeading: data.heroHeading ?? undefined,
    heroSubheading: data.heroSubheading ?? undefined,
    heroImage: toImageModel(data.heroImage, data.heroHeading ?? data.title),
    heroActions: data.heroActions.map(normalizeLink),

    trustHeading: data.trustHeading ?? undefined,
    trustLogos: data.trustLogos.map(normalizeTrustLogo),

    overviewEyebrow: data.overviewEyebrow ?? undefined,
    overviewHeading: data.overviewHeading ?? undefined,
    overviewBody: data.overviewBody ?? undefined,
    overviewImage: toImageModel(data.overviewImage, data.overviewHeading ?? data.title),
    overviewFeatures: data.overviewFeatures.map(normalizeIndustryDetailCard),

    capabilitiesEyebrow: data.capabilitiesEyebrow ?? undefined,
    capabilitiesHeading: data.capabilitiesHeading ?? undefined,
    capabilitiesBody: data.capabilitiesBody ?? undefined,

    credentialsHeading: data.credentialsHeading ?? undefined,
    credentialsBody: data.credentialsBody ?? undefined,
    credentials: data.credentials.map(normalizeServiceStatItem),

    methodologiesEyebrow: data.methodologiesEyebrow ?? undefined,
    methodologiesHeading: data.methodologiesHeading ?? undefined,
    methodologies: data.methodologies.map(normalizeIndustryDetailCard),

    industriesEyebrow: data.industriesEyebrow ?? undefined,
    industriesHeading: data.industriesHeading ?? undefined,
    industriesBody: data.industriesBody ?? undefined,
    industriesServed: data.industriesServed.map(normalizeIndustryDetailCard),

    enquiryEyebrow: data.enquiryEyebrow ?? undefined,
    enquiryHeading: data.enquiryHeading ?? undefined,
    enquiryBody: data.enquiryBody ?? undefined,
    enquiryImage: toImageModel(data.enquiryImage, data.enquiryHeading ?? data.title),

    faqItems: data.faqItems.map((item): FaqItemModel => ({
      id: `service-faq-${item.id}`,
      question: item.question,
      answer: item.answer,
    })),

    aboutEyebrow: data.aboutEyebrow ?? undefined,
    aboutHeading: data.aboutHeading ?? undefined,
    aboutBody: data.aboutBody ?? undefined,
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
    thumbnail: toImageModel(item.thumbnail, item.title),
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

    heroEyebrow: data.heroEyebrow ?? undefined,
    heroHeading: data.heroHeading ?? undefined,
    heroSubheading: data.heroSubheading ?? undefined,
    heroImage: toImageModel(data.heroImage, data.heroHeading ?? data.title),
    heroActions: data.heroActions.map(normalizeLink),

    trustHeading: data.trustHeading ?? undefined,
    trustLogos: data.trustLogos.map(normalizeTrustLogo),

    whatWeDoEyebrow: data.whatWeDoEyebrow ?? undefined,
    whatWeDoHeading: data.whatWeDoHeading ?? undefined,
    whatWeDoBody: data.whatWeDoBody ?? undefined,
    whatWeDoCta: data.whatWeDoCta ? normalizeLink(data.whatWeDoCta) : undefined,
    whatWeDoImage: toImageModel(data.whatWeDoImage, data.whatWeDoHeading ?? data.title),

    whyResearchEyebrow: data.whyResearchEyebrow ?? undefined,
    whyResearchHeading: data.whyResearchHeading ?? undefined,
    whyResearchCards: data.whyResearchCards.map(normalizeIndustryDetailCard),

    expertiseEyebrow: data.expertiseEyebrow ?? undefined,
    expertiseHeading: data.expertiseHeading ?? undefined,
    expertiseItems: data.expertiseItems.map(normalizeIndustryDetailCard),

    challengesEyebrow: data.challengesEyebrow ?? undefined,
    challengesHeading: data.challengesHeading ?? undefined,
    challengesBody: data.challengesBody ?? undefined,
    challengesCards: data.challengesCards.map(normalizeIndustryDetailCard),

    whoWeServeEyebrow: data.whoWeServeEyebrow ?? undefined,
    whoWeServeHeading: data.whoWeServeHeading ?? undefined,
    whoWeServeCards: data.whoWeServeCards.map(normalizeIndustryDetailCard),

    methodologiesEyebrow: data.methodologiesEyebrow ?? undefined,
    methodologiesHeading: data.methodologiesHeading ?? undefined,
    methodologiesBody: data.methodologiesBody ?? undefined,
    methodologies: data.methodologies.map(normalizeIndustryItem),

    empowerEyebrow: data.empowerEyebrow ?? undefined,
    empowerHeading: data.empowerHeading ?? undefined,
    empowerBody: data.empowerBody ?? undefined,
    empowerCta: data.empowerCta ? normalizeLink(data.empowerCta) : undefined,
    empowerImage: toImageModel(data.empowerImage, data.empowerHeading ?? data.title),

    enquiryEyebrow: data.enquiryEyebrow ?? undefined,
    enquiryHeading: data.enquiryHeading ?? undefined,
    enquiryBody: data.enquiryBody ?? undefined,
    enquiryImage: toImageModel(data.enquiryImage, data.enquiryHeading ?? data.title),

    faqItems: data.faqItems.map((item): FaqItemModel => ({
      id: `industry-faq-${item.id}`,
      question: item.question,
      answer: item.answer,
    })),

    caseStudiesEyebrow: data.caseStudiesEyebrow ?? undefined,
    caseStudiesHeading: data.caseStudiesHeading ?? undefined,
    caseStudiesBody: data.caseStudiesBody ?? undefined,
    caseStudiesCta: data.caseStudiesCta ? normalizeLink(data.caseStudiesCta) : undefined,
    caseStudies: data.caseStudies.map(normalizeIndustryItem),

    aboutEyebrow: data.aboutEyebrow ?? undefined,
    aboutHeading: data.aboutHeading ?? undefined,
    aboutBody: data.aboutBody ?? undefined,
  };
}

export function normalizeIndustrySlugs(res: StrapiIndustrySlugsResponse): IndustrySlugModel[] {
  return res.data.map((i) => ({ slug: i.slug, updatedAt: i.updatedAt }));
}

// ---------------------------------------------------------------------------
// Gallery Item (/gallery page migration off its static fixture)
// ---------------------------------------------------------------------------

/** `gallery-item`'s `category` enum -> the filter-tab id GalleryView's
 * existing client-side filter already keys off (fixtures/gallery.json
 * used this same id scheme, so this is the one place that scheme has to
 * be kept in sync with the enum's exact label strings). */
const GALLERY_CATEGORY_IDS: Record<string, string> = {
  'Team & Culture': 'team-culture',
  'Research Process': 'research-process',
  'Field Work': 'field-work',
  'Client Interactions': 'client-interactions',
  'Events & Conferences': 'events-conferences',
};

export function normalizeGalleryItems(res: StrapiGalleryItemListResponse): GalleryImage[] {
  return res.data
    .map((item): GalleryImage | null => {
      const image = toImageModel(item.image, item.title);
      // No image relation set yet in the CMS — nothing to render, so this
      // entry is dropped rather than shown as a broken card.
      if (!image) return null;
      return {
        id: item.documentId ?? String(item.id),
        src: image.src,
        alt: image.alt,
        category: GALLERY_CATEGORY_IDS[item.category] ?? item.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        width: image.width,
        height: image.height,
        blurDataURL: image.blurDataURL,
      };
    })
    .filter((img): img is GalleryImage => img !== null);
}

// ---------------------------------------------------------------------------
// Category (dynamic replacement for blog's old fixed category enum)
// ---------------------------------------------------------------------------

export function normalizeCategory(data: StrapiCategory): CategoryModel {
  return {
    id: data.documentId ?? String(data.id),
    name: data.name,
    slug: data.slug,
    label: data.shortLabel || data.name,
  };
}

export function normalizeCategoryList(res: StrapiCategoryListResponse): CategoryModel[] {
  return res.data.map(normalizeCategory);
}

// ---------------------------------------------------------------------------
// Blog (/blogs page, Figma node 522:4719)
// ---------------------------------------------------------------------------

function normalizeBlogSummaryFields(data: StrapiBlogSummary): BlogSummary {
  return {
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    category: data.category ? normalizeCategory(data.category) : null,
    coverImage: toImageModel(data.coverImage, data.title),
    order: data.order ?? 0,
  };
}

export function normalizeBlogList(res: StrapiBlogListResponse): BlogSummary[] {
  return res.data.map(normalizeBlogSummaryFields);
}

/** Concatenates every text leaf in a Blocks tree — used only to estimate
 * read time (~200wpm), not for rendering (RichContent.tsx renders the
 * structured tree directly). */
function extractPlainText(nodes: StrapiBlocksContent): string {
  return nodes.map(nodeText).join(' ');
}
function nodeText(node: StrapiBlocksNode): string {
  if (node.type === 'text') return node.text;
  return node.children.map(nodeText).join(' ');
}

export function normalizeBlogDetail(res: StrapiBlogDetailResponse): BlogDetail {
  const { data } = res;
  const body = data.body ?? [];
  const wordCount = extractPlainText(body).split(/\s+/).filter(Boolean).length;
  return {
    ...normalizeBlogSummaryFields(data),
    body,
    faqItems: (data.faqItems ?? []).map((item): FaqItemModel => ({
      id: `blog-faq-${item.id}`,
      question: item.question,
      answer: item.answer,
    })),
    readTimeMinutes: Math.max(1, Math.round(wordCount / 200)),
    publishedAt: data.publishedAt ?? undefined,
    seo: normalizeSeo(data.seo, data.title),
  };
}

export function normalizeBlogSlugs(res: StrapiBlogSlugsResponse): BlogSlugModel[] {
  return res.data.map((b) => ({ slug: b.slug, updatedAt: b.updatedAt }));
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

// ---------------------------------------------------------------------------
// Services Page settings (singleType) — /services' hero/intro/value-props/
// workflow/FAQ/CTA copy.
// ---------------------------------------------------------------------------

export function normalizeServicesPageSettings(res: StrapiServicesPageResponse): ServicesPageSettings {
  const data = res.data;

  return {
    hero: data.hero
      ? {
          eyebrow: data.hero.eyebrow ?? undefined,
          heading: data.hero.heading,
          subheading: data.hero.subheading ?? undefined,
          media: toImageModel(data.hero.media, data.hero.heading),
          actions: (data.hero.actions ?? []).map(normalizeLink),
        }
      : undefined,
    introEyebrow: data.introEyebrow ?? undefined,
    introHeading: data.introHeading,
    introParagraph1: data.introParagraph1 ?? undefined,
    introParagraph2: data.introParagraph2 ?? undefined,
    valuePropsHeading: data.valuePropsHeading ?? undefined,
    valuePropsBody: data.valuePropsBody ?? undefined,
    valuePropsBackground: toImageModel(data.valuePropsBackground, data.valuePropsHeading ?? 'Value proposition background'),
    valueProps: (data.valueProps ?? []).map(normalizeFeatureItem).sort((a, b) => a.order - b.order),
    workflow: data.workflow
      ? {
          eyebrow: data.workflow.eyebrow ?? undefined,
          heading: data.workflow.heading,
          subheading: data.workflow.subheading ?? undefined,
          steps: (data.workflow.steps ?? [])
            .map((step) => ({
              id: `workflow-step-${step.id}`,
              stepNumber: step.stepNumber ?? undefined,
              title: step.title,
              description: step.description,
              icon: toImageModel(step.icon, step.title),
              iconIdentifier: step.iconIdentifier ?? undefined,
              order: step.order ?? 0,
            }))
            .sort((a, b) => a.order - b.order),
        }
      : undefined,
    faq: data.faq
      ? {
          heading: data.faq.heading,
          background: toImageModel(data.faq.background, data.faq.heading),
          items: (data.faq.items ?? []).map((item) => ({
            id: `services-faq-${item.id}`,
            question: item.question,
            answer: item.answer,
          })),
        }
      : undefined,
    cta: data.cta
      ? {
          heading: data.cta.heading,
          body: data.cta.body ?? undefined,
          actions: (data.cta.actions ?? []).map(normalizeLink),
          background: toImageModel(data.cta.background, data.cta.heading),
        }
      : undefined,
  };
}

// ---------------------------------------------------------------------------
// Our Company page (/our-company, Figma node 617:7561)
// ---------------------------------------------------------------------------

export function normalizeOurCompanyPageSettings(res: StrapiOurCompanyPageResponse): OurCompanySettings {
  const data = res.data;

  return {
    heroEyebrow: data.heroEyebrow ?? undefined,
    heroHeading: data.heroHeading ?? undefined,
    heroSubheading: data.heroSubheading ?? undefined,
    heroImage: toImageModel(data.heroImage, data.heroHeading ?? 'Our Company'),
    heroCta: data.heroCta ? normalizeLink(data.heroCta) : undefined,
    statsHeading: data.statsHeading ?? undefined,
    stats: (data.stats ?? []).map(normalizeServiceStatItem),
    aboutEyebrow: data.aboutEyebrow ?? undefined,
    aboutHeading: data.aboutHeading ?? undefined,
    aboutBody: data.aboutBody ?? undefined,
    aboutImage: toImageModel(data.aboutImage, data.aboutHeading ?? 'About Unimrkt'),
    insightsEyebrow: data.insightsEyebrow ?? undefined,
    insightsHeading: data.insightsHeading ?? undefined,
    insightsBody: data.insightsBody ?? undefined,
    insightsCards: (data.insightsCards ?? []).map(normalizeIndustryDetailCard),
    ecosystemEyebrow: data.ecosystemEyebrow ?? undefined,
    ecosystemHeading: data.ecosystemHeading ?? undefined,
    ecosystemSubtext: data.ecosystemSubtext ?? undefined,
    ecosystemCards: (data.ecosystemCards ?? []).map(normalizeIndustryDetailCard),
    valuesEyebrow: data.valuesEyebrow ?? undefined,
    valuesHeading: data.valuesHeading ?? undefined,
    valuesBody: data.valuesBody ?? undefined,
    valuesCards: (data.valuesCards ?? []).map(normalizeIndustryDetailCard),
    industriesEyebrow: data.industriesEyebrow ?? undefined,
    industriesHeading: data.industriesHeading ?? undefined,
    industriesBody: data.industriesBody ?? undefined,
    industriesCards: (data.industriesCards ?? []).map(normalizeIndustryDetailCard),
    faqItems: (data.faqItems ?? []).map((item) => ({
      id: `our-company-faq-${item.id}`,
      question: item.question,
      answer: item.answer,
    })),
    aboutCompanyEyebrow: data.aboutCompanyEyebrow ?? undefined,
    aboutCompanyHeading: data.aboutCompanyHeading ?? undefined,
    aboutCompanyBody: data.aboutCompanyBody ?? undefined,
    seo: normalizeSeo(data.seo, data.heroHeading ?? 'Our Company'),
  };
}

// ---------------------------------------------------------------------------
// Contact page (/contact, Figma node 637:10433)
// ---------------------------------------------------------------------------

function normalizeOfficeLocation(office: StrapiOfficeLocation): OfficeLocationModel {
  return {
    id: `office-${office.id}`,
    name: office.name,
    address: office.address,
    email: office.email,
    phone: office.phone,
    phoneLabel: office.phoneLabel ?? undefined,
    featured: office.featured ?? false,
    image: toImageModel(office.image, office.name),
  };
}

export function normalizeContactPageSettings(res: StrapiContactPageResponse): ContactPageSettings {
  const data = res.data;

  return {
    heroEyebrow: data.heroEyebrow ?? undefined,
    heroHeading: data.heroHeading ?? undefined,
    heroSubheading: data.heroSubheading ?? undefined,
    heroImage: toImageModel(data.heroImage, data.heroHeading ?? 'Contact'),
    heroCta: data.heroCta ? normalizeLink(data.heroCta) : undefined,
    statsHeading: data.statsHeading ?? undefined,
    stats: (data.stats ?? []).map(normalizeServiceStatItem),
    officeEyebrow: data.officeEyebrow ?? undefined,
    officeHeading: data.officeHeading ?? undefined,
    offices: (data.offices ?? []).map(normalizeOfficeLocation),
    formEyebrow: data.formEyebrow ?? undefined,
    formHeading: data.formHeading ?? undefined,
    formSubheading: data.formSubheading ?? undefined,
    formImage: toImageModel(data.formImage, data.formHeading ?? 'Contact form'),
    faqItems: (data.faqItems ?? []).map((item) => ({
      id: `contact-faq-${item.id}`,
      question: item.question,
      answer: item.answer,
    })),
    workWithUsHeading: data.workWithUsHeading ?? undefined,
    workWithUsBody: data.workWithUsBody ?? undefined,
    workWithUsCta: data.workWithUsCta ? normalizeLink(data.workWithUsCta) : undefined,
    workWithUsImage: toImageModel(data.workWithUsImage, data.workWithUsHeading ?? 'Work With unimrkt'),
    seo: normalizeSeo(data.seo, data.heroHeading ?? 'Contact'),
  };
}

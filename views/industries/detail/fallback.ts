/**
 * Template + graceful fallback resolver for /industries/[slug].
 *
 * Priority 1 (CMS first): every field below prefers the industry's own
 * Strapi data when present (the "Automotives" entry today — any other
 * industry once it's authored).
 * Priority 2 (graceful template fallback): when a field is empty, this
 * renders Figma node 384:6205's own structure with industry-agnostic,
 * `industry.title`-interpolated copy instead of hiding the section — so
 * every one of the 27 industries shows the full page layout, not just
 * the ones with authored content.
 *
 * The one deliberate exception is Case Studies: a "success story" is a
 * claim about a specific completed engagement, not a generic capability
 * description, so it stays CMS-only (see resolveCaseStudies below) —
 * fabricating one would misrepresent real client work, unlike the
 * capability/methodology copy elsewhere on this page.
 */
import type { IndustryDetail, IndustryDetailCardModel, TrustLogoModel } from '@/models/industry';
import type { FaqItemModel, IndustryItemModel, LinkModel } from '@/models/domain';

const CONTACT_LINK = (label: string, variant: LinkModel['variant'] = 'primary'): LinkModel => ({
  id: `fallback-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  label,
  href: '/contact',
  isExternal: false,
  variant,
});

function fallbackCard(idSuffix: string, title: string, description: string, iconIdentifier: string, imageSrc?: string): IndustryDetailCardModel {
  return {
    id: `fallback-${idSuffix}`,
    title,
    description,
    iconIdentifier,
    // Figma 384:6406-6408 draws a photo on each card; these are its generic business photos.
    ...(imageSrc ? { image: { src: imageSrc, alt: title, width: 900, height: 600 } } : {}),
  };
}

function fallbackIndustryItem(idSuffix: string, title: string, imageSrcId: string, image: IndustryItemModel['image']): IndustryItemModel {
  return { id: `fallback-${idSuffix}-${imageSrcId}`, title, image, accentColor: '#7f3856' };
}

export interface ResolvedContentBlock {
  eyebrow?: string;
  heading?: string;
  body?: string;
  cta?: LinkModel;
  image?: IndustryDetail['whatWeDoImage'];
}

export interface ResolvedIndustryDetail {
  title: string;
  hero: { eyebrow: string; heading: string; subheading: string; image?: IndustryDetail['heroImage']; actions: LinkModel[] };
  trust: { heading: string; logos: TrustLogoModel[] };
  whatWeDo: ResolvedContentBlock;
  whyResearch: { eyebrow: string; heading: string; cards: IndustryDetailCardModel[] };
  expertise: { eyebrow: string; heading: string; items: IndustryDetailCardModel[] };
  challenges: { eyebrow: string; heading: string; body: string; cards: IndustryDetailCardModel[] };
  whoWeServe: { eyebrow: string; heading: string; cards: IndustryDetailCardModel[] };
  methodologies: { eyebrow: string; heading: string; body: string; items: IndustryItemModel[] };
  empower: ResolvedContentBlock;
  enquiry: { eyebrow: string; heading: string; body: string; image?: IndustryDetail['enquiryImage'] };
  faqItems: FaqItemModel[];
  caseStudies: { eyebrow: string; heading: string; body: string; cta?: LinkModel; items: IndustryItemModel[] } | null;
  about: { eyebrow: string; heading: string; body: string };
}

// Sitewide-generic FAQ voice, matching the convention already used on
// /industries' own listing page (INDUSTRY_FAQ_ITEMS in
// IndustryListingView.tsx) — reused verbatim as the per-industry-page
// fallback rather than inventing a second generic FAQ voice.
const FALLBACK_FAQ_ITEMS: FaqItemModel[] = [
  {
    id: 'fallback-faq-methodologies',
    question: 'What research methodologies do you use for industry-specific studies?',
    answer:
      'We combine qualitative and quantitative methodologies — in-depth interviews, focus groups, CATI surveys, and online panels — tailored to each industry’s unique data needs.',
  },
  {
    id: 'fallback-faq-customization',
    question: 'Is your research approach customized for each industry?',
    answer:
      'Yes — every engagement is designed around the specific regulatory, competitive, and consumer dynamics of that industry rather than a one-size-fits-all template.',
  },
  {
    id: 'fallback-faq-engagement',
    question: 'How does an industry research engagement typically start?',
    answer:
      'It starts with a scoping conversation to understand your objectives, followed by a tailored methodology proposal — reach out via Talk to Our Experts to begin.',
  },
  {
    id: 'fallback-faq-quality',
    question: 'How do you ensure data quality across different industries?',
    answer:
      'Every engagement runs through robust quality control processes, trained interviewers, and industry-experienced analysts to keep findings accurate and reliable.',
  },
  {
    id: 'fallback-faq-value',
    question: 'How can this research help my business?',
    answer:
      'It helps you spot emerging trends earlier, benchmark against research best practices, and make market-entry and strategy decisions with more confidence.',
  },
];

/** "Agriculture & Agritech Market Research" -> "Agriculture & Agritech": the name without the generic
 * words the page templates append themselves ("... Research Services", "... Market Intelligence"). */
export const getCleanIndustryTitle = (name: string): string => {
  const words = name.split(' ').filter(Boolean);
  const lower = words.map((w) => w.toLowerCase());
  const kept: string[] = [];
  for (let i = 0; i < words.length; i++) {
    if (lower[i] === 'market' && lower[i + 1] === 'research') {
      i += 1;
      continue;
    }
    if (lower[i] === 'research') continue;
    kept.push(words[i]);
  }
  return kept.join(' ').trim();
};

const isWordChar = (c: string | undefined) => c !== undefined && c.toLowerCase() !== c.toUpperCase();

/** Swaps the full name for the clean one wherever a
 * template continues after it ("Our <name> Research Services"). A name that ends a string (the hero eyebrow) is kept. */
function tidyTitleEcho(text: string, title: string, clean: string): string {
  const out = text;
  const lowerTitle = title.toLowerCase();
  let result = '';
  let from = 0;
  for (let at = out.toLowerCase().indexOf(lowerTitle); at !== -1; at = out.toLowerCase().indexOf(lowerTitle, from)) {
    const end = at + title.length;
    const matched = out.slice(at, end);
    result += out.slice(from, at);
    if (out[end] === ' ' && isWordChar(out[end + 1])) {
      result += matched === matched.toUpperCase() ? clean.toUpperCase() : matched === matched.toLowerCase() ? clean.toLowerCase() : clean;
    } else {
      result += matched;
    }
    from = end;
  }
  return result + out.slice(from);
}

function tidyDeep<T>(value: T, title: string, clean: string): T {
  if (typeof value === 'string') return tidyTitleEcho(value, title, clean) as unknown as T;
  if (Array.isArray(value)) return value.map((v) => tidyDeep(v, title, clean)) as unknown as T;
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) out[k] = k === 'src' || k === 'href' || k === 'id' ? v : tidyDeep(v, title, clean);
    return out as T;
  }
  return value;
}

/** Every industry-name template on the page (hero, What We Do, About, Who We Serve ...) goes through here so a name that
 * already contains "Market Research" never reads "... Market Research Market Research" or "... Research Research". */
export function resolveIndustryDetail(industry: IndustryDetail): ResolvedIndustryDetail {
  const resolved = buildIndustryDetail(industry);
  const clean = getCleanIndustryTitle(industry.title);
  if (!clean || clean === industry.title) return resolved;
  return { ...tidyDeep(resolved, industry.title, clean), title: resolved.title };
}

function buildIndustryDetail(industry: IndustryDetail): ResolvedIndustryDetail {
  const { title } = industry;
  const titleLower = title.toLowerCase();

  return {
    title,

    hero: {
      eyebrow: industry.heroEyebrow || `${title.toUpperCase()} MARKET RESEARCH`,
      heading: industry.heroHeading || `Drive Innovation with Data-Driven ${title} Insights`,
      subheading:
        industry.heroSubheading ||
        `Helping organizations in the ${titleLower} sector make smarter, faster business decisions through reliable market intelligence and actionable insights.`,
      image: industry.heroImage ?? { src: '/images/industries/detail/hero-fallback.jpg', alt: '', width: 1900, height: 1000 },
      actions: industry.heroActions.length > 0 ? industry.heroActions : [CONTACT_LINK('Get a Custom Proposal', 'primary'), CONTACT_LINK('Talk to Our Experts', 'secondary')],
    },

    // Real company wordmarks aren't confirmed clients (see
    // IndustryDetailView's own note), so the fallback shell shows
    // generic, disclosed placeholder cards rather than any brand name —
    // still renders the full visual structure the Figma node shows.
    trust: {
      heading: industry.trustHeading || `Trusted by ${title} Leaders`,
      logos:
        industry.trustLogos.length > 0
          ? industry.trustLogos
          : Array.from({ length: 5 }, (_, i) => ({ id: `fallback-trust-${i}`, name: 'Industry Partner' })),
    },

    whatWeDo: {
      eyebrow: industry.whatWeDoEyebrow || 'What We Do',
      heading: industry.whatWeDoHeading || `Our ${title} Research Services`,
      body:
        industry.whatWeDoBody ||
        `Unimrkt Research helps organizations in the ${titleLower} sector make confident, data-driven decisions. Our expertise spans consumer behavior, market trends, competitive intelligence, and product validation.

Using research methodologies such as CATI, Online Surveys, In-Depth Interviews (IDIs), and Focus Group Discussions (FGDs) to deliver high-quality, accurate data tailored to your business objectives.`,
      cta: industry.whatWeDoCta || CONTACT_LINK('Talk to Our B2B Research Experts'),
      // The industry's own listing photo is the closest on-topic image until a dedicated one is uploaded.
      image: industry.whatWeDoImage ?? industry.icon ?? { src: '/images/industries/detail/hero-fallback.jpg', alt: title, width: 1900, height: 1000 },
    },

    whyResearch: {
      eyebrow: industry.whyResearchEyebrow || `Why ${title} Research?`,
      heading: industry.whyResearchHeading || 'Accelerate Growth with Industry Intelligence',
      cards:
        industry.whyResearchCards.length > 0
          ? industry.whyResearchCards
          : [
              fallbackCard('why-1', 'Understand Customer Preferences', 'Identify buying behavior, evolving trends, and customer expectations to build better products and services.', 'profile-2user', '/images/industries/detail/why-customer-preferences.jpg'),
              fallbackCard('why-2', 'Stay Ahead of Competitors', 'Benchmark pricing, offerings, and market positioning with real-time competitive intelligence.', 'chart', '/images/industries/detail/why-competitors.jpg'),
              fallbackCard('why-3', 'Improve Product Strategy', 'Validate concepts, evaluate demand, and reduce launch risk with research-backed decision making.', 'flash', '/images/industries/detail/why-product-strategy.jpg'),
            ],
    },

    expertise: {
      eyebrow: industry.expertiseEyebrow || 'Our Expertise',
      heading: industry.expertiseHeading || `Expertise Across the ${title} Ecosystem`,
      items:
        industry.expertiseItems.length > 0
          ? industry.expertiseItems
          : [
              fallbackCard('expertise-1', 'Market Analysis', '', 'chart'),
              fallbackCard('expertise-2', 'Consumer Insights', '', 'profile-2user'),
              fallbackCard('expertise-3', 'Competitive Landscape', '', 'mobility'),
              fallbackCard('expertise-4', 'Regulatory Environment', '', 'shield-tick'),
              fallbackCard('expertise-5', 'Emerging Technology', '', 'cpu'),
            ],
    },

    challenges: {
      eyebrow: industry.challengesEyebrow || 'Business Challenges We Cover',
      heading: industry.challengesHeading || 'Key Challenges We Solve',
      body:
        industry.challengesBody ||
        `The ${titleLower} sector is evolving rapidly amid shifting customer expectations, competitive pressure, and regulatory change. Unimrkt Research helps businesses navigate these challenges through reliable market intelligence and actionable insights.`,
      cards:
        industry.challengesCards.length > 0
          ? industry.challengesCards
          : [
              fallbackCard('challenge-1', 'Consumer Preferences', 'Understand evolving buying behavior and customer expectations.', 'profile-2user'),
              fallbackCard('challenge-2', 'Market Volatility', 'Track shifting demand, pricing pressure, and emerging trends.', 'flash'),
              fallbackCard('challenge-3', 'Competitive Intelligence', 'Monitor competitors, positioning, and market share.', 'chart'),
              fallbackCard('challenge-4', 'Regulatory & Market Dynamics', 'Stay informed about policy changes and industry developments.', 'shield-tick'),
            ],
    },

    whoWeServe: {
      eyebrow: industry.whoWeServeEyebrow || 'Who We Serve',
      heading: industry.whoWeServeHeading || `Supporting Every ${title} Segment`,
      cards:
        industry.whoWeServeCards.length > 0
          ? industry.whoWeServeCards
          : [
              fallbackCard('serve-1', 'Enterprises & Corporates', 'Helping large organizations understand market trends and customer expectations.', 'building'),
              fallbackCard('serve-2', 'Growing & Emerging Businesses', 'Supporting fast-moving companies with research to guide expansion.', 'flash'),
              fallbackCard('serve-3', 'Suppliers & Partners', 'Providing insight into demand, supply chains, and competitive positioning.', 'wrench'),
              fallbackCard('serve-4', 'Industry Associations & Regulators', 'Delivering data to inform policy and industry-wide standards.', 'shield-tick'),
            ],
    },

    methodologies: {
      eyebrow: industry.methodologiesEyebrow || 'Research Methodologies',
      heading: industry.methodologiesHeading || 'Proven Research Methodologies',
      body:
        industry.methodologiesBody ||
        `We combine qualitative and quantitative research methodologies to deliver accurate, reliable, and actionable ${titleLower} market insights tailored to your business objectives.`,
      items:
        industry.methodologies.length > 0
          ? industry.methodologies
          : [
              fallbackIndustryItem('method', 'CATI Surveys', '1', { src: '/images/industries/detail/method-cati.jpg', alt: 'CATI Surveys', width: 760, height: 591 }),
              fallbackIndustryItem('method', 'Online Surveys', '2', { src: '/images/industries/detail/method-online-surveys.jpg', alt: 'Online Surveys', width: 760, height: 591 }),
              fallbackIndustryItem('method', 'In-Depth Interviews (IDIs)', '3', { src: '/images/industries/detail/method-idis.jpg', alt: 'In-Depth Interviews', width: 760, height: 591 }),
              fallbackIndustryItem('method', 'Focus Group Discussions (FGDs)', '4', { src: '/images/industries/detail/method-fgds.jpg', alt: 'Focus Group Discussions', width: 760, height: 591 }),
            ],
    },

    empower: {
      eyebrow: industry.empowerEyebrow || `${title} Research`,
      heading: industry.empowerHeading || `Empower Your ${title} Business with Unimrkt Research`,
      body:
        industry.empowerBody ||
        `Unimrkt Research empowers organizations in the ${titleLower} sector with accurate market intelligence and actionable insights to support informed decision-making — helping you understand customer behavior, market trends, and competitive dynamics with confidence.`,
      cta: industry.empowerCta || CONTACT_LINK('Get Started with Unimrkt Research Today'),
      image: industry.empowerImage || { src: '/images/industries/detail/content-mechanics.png', alt: `${title} research team`, width: 900, height: 990 },
    },

    enquiry: {
      eyebrow: industry.enquiryEyebrow || 'Get a Free Quote!',
      heading: industry.enquiryHeading || "Let's Discuss Your Research Needs",
      body:
        industry.enquiryBody ||
        `Connect with our research experts to design customized solutions that deliver accurate insights, support informed decisions, and drive measurable business growth across your target ${titleLower} markets.`,
      image: industry.enquiryImage || { src: '/images/industries/detail/enquiry-bg.jpg', alt: '', width: 1920, height: 1080 },
    },

    faqItems: industry.faqItems.length > 0 ? industry.faqItems : FALLBACK_FAQ_ITEMS,

    // CMS-only, deliberately not templated — see file header comment.
    caseStudies:
      industry.caseStudiesHeading && industry.caseStudies.length > 0
        ? {
            eyebrow: industry.caseStudiesEyebrow || 'Case Studies',
            heading: industry.caseStudiesHeading,
            body: industry.caseStudiesBody || '',
            cta: industry.caseStudiesCta,
            items: industry.caseStudies,
          }
        : null,

    about: {
      eyebrow: industry.aboutEyebrow || `About Our ${title} Research`,
      heading: industry.aboutHeading || `Driving Innovation with ${title} Market Intelligence`,
      body:
        industry.aboutBody ||
        `The ${titleLower} sector is evolving rapidly, with shifting customer expectations, new technologies, and changing competitive dynamics. At Unimrkt Research, we provide comprehensive ${titleLower} market research that helps organizations make informed, data-driven decisions.\n\nLeveraging advanced research methodologies and deep industry expertise, we deliver actionable insights into consumer behavior, market trends, competitive landscapes, and emerging opportunities — helping ${titleLower} businesses reduce risk, accelerate innovation, and achieve sustainable growth.`,
    },
  };
}

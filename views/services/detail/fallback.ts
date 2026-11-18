/**
 * Template + graceful fallback resolver for /services/[slug] — mirrors
 * views/industries/detail/fallback.ts exactly (see that file's header
 * comment for the full rationale). Priority 1: each service's own Strapi
 * data. Priority 2: Figma node 474:5731's own structure with generic,
 * `service.title`-interpolated copy wherever a field is empty, so every
 * one of the ~35 seeded services renders the full page, not just
 * "Primary Research" (the only one with authored content so far).
 *
 * Capabilities is the one section with no dedicated CMS fields — it
 * reuses the existing, previously-always-empty `service.features`
 * field (`blocks.feature-item`) rather than adding a duplicate one.
 */
import type { ServiceDetail, ServiceStatItemModel } from '@/models/service';
import type { FaqItemModel, FeatureModel, LinkModel } from '@/models/domain';
import type { IndustryDetailCardModel, TrustLogoModel } from '@/models/industry';

const CONTACT_LINK = (label: string, variant: LinkModel['variant'] = 'primary'): LinkModel => ({
  id: `fallback-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  label,
  href: '/contact',
  isExternal: false,
  variant,
});

function fallbackCard(idSuffix: string, title: string, description: string, iconIdentifier: string): IndustryDetailCardModel {
  return { id: `fallback-${idSuffix}`, title, description, iconIdentifier };
}

function fallbackFeature(idSuffix: string, title: string, imageSrcId: string): FeatureModel {
  return {
    id: `fallback-capability-${idSuffix}`,
    title,
    description: '',
    order: 0,
    icon: { src: `/images/services/detail/${imageSrcId}`, alt: title, width: 900, height: 1125 },
  };
}

export interface ResolvedContentBlock {
  eyebrow?: string;
  heading?: string;
  body?: string;
  cta?: LinkModel;
  image?: ServiceDetail['heroImage'];
}

/** A capability photo card: the CMS feature, its hover copy and where its arrow links (the matching sub-service). */
export interface ResolvedCapability {
  id: string;
  title: string;
  description: string;
  image?: FeatureModel['icon'];
  href?: string;
}

/** Figma 474:5753-5767 "Trusted by Global Businesses" logos, at their drawn size — used only while the service has no
 * trust logos in the CMS. */
export const FIGMA_TRUST_LOGOS: Array<TrustLogoModel & { width: number; height: number }> = [
  { id: 'figma-logo-suzuki', name: 'Suzuki', width: 141, height: 27, image: { src: '/images/services/detail/logo-suzuki.webp', alt: 'Suzuki', width: 423, height: 81 } },
  { id: 'figma-logo-coca-cola', name: 'Coca-Cola', width: 113, height: 35, image: { src: '/images/services/detail/logo-coca-cola.webp', alt: 'Coca-Cola', width: 339, height: 105 } },
  { id: 'figma-logo-hdfc-bank', name: 'HDFC Bank', width: 161, height: 42, image: { src: '/images/services/detail/logo-hdfc-bank.webp', alt: 'HDFC Bank', width: 483, height: 126 } },
  { id: 'figma-logo-amazon', name: 'Amazon', width: 141, height: 41, image: { src: '/images/services/detail/logo-amazon.webp', alt: 'Amazon', width: 423, height: 123 } },
  { id: 'figma-logo-airtel', name: 'Airtel', width: 102, height: 42, image: { src: '/images/services/detail/logo-airtel.webp', alt: 'Airtel', width: 306, height: 126 } },
];

/** Hover copy Figma 727:7751-7760 gives each Primary Research capability card. */
const CAPABILITY_COPY: Record<string, string> = {
  'telephonic surveys': 'Efficient phone-based surveys capturing valuable respondent insights.',
  'online surveys': 'Fast, scalable online surveys reaching the right audiences anywhere.',
  'focus group discussions': 'Moderated group conversations that reveal deeper attitudes and motivations.',
  'cati surveys': 'Computer-assisted telephone interviews delivering structured, high-quality data.',
};

export interface ResolvedServiceDetail {
  title: string;
  hero: { eyebrow: string; heading: string; subheading: string; image?: ServiceDetail['heroImage']; actions: LinkModel[] };
  trust: { heading: string; logos: TrustLogoModel[] };
  overview: { eyebrow: string; heading: string; body: string; image?: ServiceDetail['overviewImage']; features: IndustryDetailCardModel[] };
  capabilities: { eyebrow: string; heading: string; body: string; items: ResolvedCapability[] };
  credentials: { heading: string; body: string; items: ServiceStatItemModel[] };
  methodologies: { eyebrow: string; heading: string; body: string; items: IndustryDetailCardModel[] };
  industries: { eyebrow: string; heading: string; body: string; items: IndustryDetailCardModel[] };
  enquiry: { eyebrow: string; heading: string; body: string; image?: ServiceDetail['enquiryImage'] };
  faqItems: FaqItemModel[];
  about: { eyebrow: string; heading: string; body: string };
}

const FALLBACK_FAQ_ITEMS: FaqItemModel[] = [
  {
    id: 'fallback-faq-what-is-it',
    question: 'What is this research service?',
    answer:
      'It’s a research offering delivered by Unimrkt Research, designed around your specific objectives and combined with the right mix of methodologies for your target audience.',
  },
  {
    id: 'fallback-faq-services-offered',
    question: 'What does Unimrkt Research offer as part of this service?',
    answer:
      'We tailor the fieldwork, sample design, and reporting to your objectives — reach out via Talk to Our Experts for a scoped recommendation.',
  },
  {
    id: 'fallback-faq-industries',
    question: 'Which industries does Unimrkt Research serve?',
    answer:
      'We work across automotive, healthcare, BFSI, retail, technology, manufacturing, energy, FMCG, telecom, and many other sectors.',
  },
  {
    id: 'fallback-faq-international',
    question: 'Can Unimrkt Research conduct international market research?',
    answer:
      'Yes — our research capabilities span 90+ countries and 22+ languages, combining global reach with local research expertise.',
  },
  {
    id: 'fallback-faq-data-quality',
    question: 'How does Unimrkt Research ensure data quality?',
    answer:
      'Every engagement runs through structured quality control — trained interviewers, live monitoring, and audited datasets — backed by ISO 20252 and ISO 27001 certified processes.',
  },
  {
    id: 'fallback-faq-why-choose',
    question: 'Why should businesses choose Unimrkt Research?',
    answer:
      '16+ years of research excellence, 450+ CATI workstations, and 250,000+ surveys completed annually, with a track record of turning first-hand data into confident business decisions.',
  },
  {
    id: 'fallback-faq-get-started',
    question: 'How can I get started with Unimrkt Research?',
    answer:
      'Reach out via our enquiry form or Talk to Our Experts, and a research specialist will help scope your study and next steps.',
  },
];

export function resolveServiceDetail(service: ServiceDetail): ResolvedServiceDetail {
  const { title } = service;
  const titleLower = title.toLowerCase();

  return {
    title,

    hero: {
      eyebrow: service.heroEyebrow || title.toUpperCase(),
      heading: service.heroHeading || `Real Conversations. Reliable Data. Better Decisions.`,
      subheading:
        service.heroSubheading ||
        `Collect first-hand market intelligence through customized ${titleLower} solutions that uncover customer opinions, validate business decisions, and fuel strategic growth.`,
      image: service.heroImage,
      actions: service.heroActions.length > 0 ? service.heroActions : [CONTACT_LINK('Get a Free Quote', 'primary'), CONTACT_LINK('Talk to Our Experts', 'secondary')],
    },

    // The service's own CMS logos win; until it has some, the five
    // logos Figma 474:5753-5767 draws.
    trust: {
      heading: service.trustHeading || 'Trusted by Global Businesses',
      logos: service.trustLogos.length > 0 ? service.trustLogos : FIGMA_TRUST_LOGOS,
    },

    overview: {
      eyebrow: service.overviewEyebrow || `About ${title}`,
      heading: service.overviewHeading || `First-Hand Insights That Power Better Business Decisions`,
      body:
        service.overviewBody ||
        `${title} enables organizations to collect reliable information directly from customers, businesses, and stakeholders. At Unimrkt Research, we design customized research programs using qualitative and quantitative methodologies to help businesses understand markets, validate ideas, measure customer experience, and uncover new opportunities. Our experienced research professionals combine global reach, advanced technology, and proven methodologies to deliver accurate, high-quality data tailored to every project.`,
      image: service.overviewImage,
      features:
        service.overviewFeatures.length > 0
          ? service.overviewFeatures
          : [
              fallbackCard('overview-1', 'Customized Research Solutions', '', 'shield-tick'),
              fallbackCard('overview-2', 'Experienced Research Team', '', 'profile-2user'),
              fallbackCard('overview-3', 'Accurate & Reliable Insights', '', 'medal-star'),
            ],
    },

    capabilities: {
      eyebrow: service.capabilitiesEyebrow || 'Research',
      heading: service.capabilitiesHeading || `Our ${title} Services`,
      body:
        service.capabilitiesBody ||
        `Explore our comprehensive ${titleLower} solutions, designed to collect accurate, first-hand data through proven methodologies, helping businesses gain actionable insights, understand markets, and make informed decisions.`,
      items: (service.features.length > 0
        ? service.features
        : [
              fallbackFeature('telephonic', 'Telephonic Surveys', 'capability-telephonic-surveys.jpg'),
              fallbackFeature('online', 'Online Surveys', 'capability-online-surveys.jpg'),
              fallbackFeature('focus-group', 'Focus Group Discussions', 'capability-focus-group-discussions.jpg'),
              fallbackFeature('cati', 'CATI Surveys', 'capability-cati-surveys.jpg'),
            ]
      ).map((feature): ResolvedCapability => {
        const key = feature.title.trim().toLowerCase();
        // A description that only repeats the title (as seeded) counts as empty.
        const own = feature.description && feature.description.trim().toLowerCase() !== key ? feature.description : '';
        const child = service.children.find((c) => c.title.trim().toLowerCase() === key);
        return {
          id: feature.id,
          title: feature.title,
          description: own || CAPABILITY_COPY[key] || `Explore our ${feature.title.toLowerCase()} capabilities.`,
          image: feature.icon,
          href: feature.link?.href ?? (child ? `/services/${child.slug}` : undefined),
        };
      }),
    },

    credentials: {
      heading: service.credentialsHeading || 'Why Unimrkt Research?',
      body:
        service.credentialsBody ||
        'Delivering accurate first-hand data through expert researchers, global reach, proven methodologies, and quality-driven processes, helping businesses make confident decisions and achieve sustainable growth.',
      items:
        service.credentials.length > 0
          ? service.credentials
          : [
              { id: 'fallback-credential-1', value: '450+', label: 'CATI stations team members', iconIdentifier: 'profile-2user' },
              { id: 'fallback-credential-2', value: 'On-time', label: 'project deliveries', iconIdentifier: 'clock' },
              { id: 'fallback-credential-3', value: '80%', label: 'Repeat business', iconIdentifier: 'clipboard-tick' },
              { id: 'fallback-credential-4', value: '250,000+ CATI', label: 'surveys completed every year', iconIdentifier: 'note' },
              { id: 'fallback-credential-5', value: 'State-of-the-art', label: 'CATI systems integrated with predictive dialers', iconIdentifier: 'call' },
              { id: 'fallback-credential-6', value: '35-40%', label: 'Average cost savings', iconIdentifier: 'rupee' },
              { id: 'fallback-credential-7', value: '300+', label: 'moderators with rich professional background', iconIdentifier: 'shield-tick' },
              { id: 'fallback-credential-8', value: 'ISO20252', label: '& ISO27001 certified', iconIdentifier: 'medal-star' },
              { id: 'fallback-credential-9', value: '1000+', label: 'projects of combined experience, with 100% QA audits', iconIdentifier: 'archive-book' },
              { id: 'fallback-credential-10', value: '30,000 sq. ft.', label: 'with the scalability of more than 450 seats', iconIdentifier: 'people' },
              { id: 'fallback-credential-11', value: '24*7', label: 'support with access to dedicated analysts', iconIdentifier: 'headphone' },
              { id: 'fallback-credential-12', value: 'ESOMAR', label: 'norms followed', iconIdentifier: 'user-tag' },
              { id: 'fallback-credential-13', value: '90 countries', label: '& over 22+ foreign languages for multi-industry research', iconIdentifier: 'global' },
              { id: 'fallback-credential-14', value: 'GDPR', label: 'compliant', iconIdentifier: 'security-user' },
              { id: 'fallback-credential-15', value: '16+', label: 'years of experience', iconIdentifier: 'star' },
            ] satisfies ServiceStatItemModel[],
    },

    methodologies: {
      eyebrow: service.methodologiesEyebrow || 'Process',
      heading: service.methodologiesHeading || 'Research Methodologies',
      // Service → Methodologies body; Figma 483:7163's copy is the fallback.
      body: service.methodologiesBody || 'We leverage proven qualitative and quantitative research methodologies to collect accurate, reliable data, delivering actionable insights that support smarter decisions, innovation, and sustainable business growth.',
      items:
        service.methodologies.length > 0
          ? service.methodologies
          : [
              fallbackCard('method-1', 'Understand Objectives', 'We start by clarifying your research questions and business goals so every methodology decision that follows is grounded in what you actually need to learn.', ''),
              fallbackCard('method-2', 'Research Design', 'We select and design the right mix of qualitative and quantitative methods, sample structure, and timeline for your specific objectives.', ''),
              fallbackCard('method-3', 'Questionnaire Development', 'We script and pilot-test every questionnaire to make sure it captures clean, unambiguous data before fieldwork begins.', ''),
              fallbackCard('method-4', 'Respondent Recruitment', 'We recruit and screen respondents against your target criteria, drawing on global panels and our own interviewer network.', ''),
            ],
    },

    industries: {
      eyebrow: service.industriesEyebrow || 'Our Industries',
      heading: service.industriesHeading || 'Industries We Support',
      body:
        service.industriesBody ||
        `Delivering tailored ${titleLower} solutions across diverse industries, helping businesses understand markets, uncover opportunities, and make confident, data-driven decisions with accurate insights.`,
      items:
        service.industriesServed.length > 0
          ? service.industriesServed
          : [
              fallbackCard('industry-automotive', 'Automotive', '', 'car'),
              fallbackCard('industry-healthcare', 'Healthcare', '', 'heart-pulse'),
              fallbackCard('industry-bfsi', 'BFSI', '', 'landmark'),
              fallbackCard('industry-retail', 'Retail', '', 'shopping-bag'),
              fallbackCard('industry-technology', 'Technology', '', 'cpu'),
              fallbackCard('industry-manufacturing', 'Manufacturing', '', 'factory'),
              fallbackCard('industry-energy', 'Energy', '', 'flash'),
              fallbackCard('industry-fmcg', 'FMCG', '', 'shopping-cart'),
              fallbackCard('industry-telecom', 'Telecom', '', 'radio'),
              fallbackCard('industry-more', '& More', '', 'more'),
            ],
    },

    enquiry: {
      eyebrow: service.enquiryEyebrow || 'Get a Free Quote!',
      heading: service.enquiryHeading || "Let's Discuss Your Research Needs",
      body:
        service.enquiryBody ||
        'Connect with our research experts to design customized solutions that deliver accurate insights, support informed decisions, and drive measurable business growth across your target markets.',
      image: service.enquiryImage || { src: '/images/industries/detail/enquiry-bg.jpg', alt: '', width: 1920, height: 1080 },
    },

    faqItems: service.faqItems.length > 0 ? service.faqItems : FALLBACK_FAQ_ITEMS,

    about: {
      eyebrow: service.aboutEyebrow || `About ${title}`,
      heading: service.aboutHeading || `Unlock Reliable Insights with Expert ${title}`,
      body:
        service.aboutBody ||
        `At Unimrkt Research, we specialize in delivering accurate, first-hand market intelligence through customized ${titleLower} solutions tailored to your unique business objectives. Our experienced team gathers high-quality data that empowers organizations to understand customer behavior, validate business strategies, and make confident, data-driven decisions.\n\nWith 16+ years of industry experience, 450+ advanced CATI workstations, research capabilities across 90+ countries, and support in 22+ languages, we combine global reach with deep local expertise. Our commitment to quality, precision, and innovation ensures every project delivers actionable insights that help businesses reduce risk, identify new opportunities, and achieve sustainable growth.`,
    },
  };
}

/**
 * Template + graceful fallback resolver for /contact — same architecture
 * as views/our-company/fallback.ts: Priority 1 is the CMS's own
 * `contact-page` singleType data; Priority 2 is Figma node 637:10433's
 * own verbatim copy (file foaJFuv0vRX8nD43o0ylgB), so the page always
 * renders in full even before an editor has touched the CMS record.
 *
 * One disclosed exception, matching what upsertContactPageSettings()
 * (backend/scripts/seed.ts) already documents: the 5 FAQ items' answers
 * are authored (the accordion is collapsed on canvas — only questions
 * are visible), same convention as every other FAQ section on this
 * site. The questions themselves are the node's own real, distinct
 * text — nothing here is invented.
 */
import type { ContactPageSettings } from '@/models/contactPage';
import type { FaqItemModel, LinkModel } from '@/models/domain';
import type { OfficeLocationModel } from '@/models/contactPage';
import type { ServiceStatItemModel } from '@/models/service';

const ASSET_DIR = '/images/contact';

function localImage(filename: string, alt: string, width: number, height: number) {
  return { src: `${ASSET_DIR}/${filename}`, alt, width, height };
}

const FALLBACK_HERO_CTA: LinkModel = { id: 'fallback-hero-cta', label: 'Start a Conversation', href: '#contact-form', isExternal: false, variant: 'primary' };

const FALLBACK_STATS: ServiceStatItemModel[] = [
  { id: 'fallback-stat-countries', value: '90+', label: 'Countries', iconIdentifier: 'global' },
  { id: 'fallback-stat-languages', value: '22+', label: 'Languages', iconIdentifier: 'language-circle' },
  { id: 'fallback-stat-cati', value: '450+', label: 'CATI Stations', iconIdentifier: 'call' },
  { id: 'fallback-stat-years', value: '16+', label: 'Years of Experience', iconIdentifier: 'medal-star' },
];

const FALLBACK_OFFICES: OfficeLocationModel[] = [
  {
    id: 'fallback-office-india',
    name: 'India Office',
    address: '5th floor, Nimai Tower, 412-415, Udyog Vihar, Phase IV, Gurugram, Haryana-122015',
    email: 'sales@unimrkt.com',
    phoneLabel: 'Sales & Business Queries:',
    phone: '+91 124 424 5210, +91 9870 377 557',
    featured: true,
    image: localImage('contact-india-gate.jpg', 'India Office', 750, 283),
  },
  {
    id: 'fallback-office-usa',
    name: 'United States of America',
    address: '98 Cuttermill Road Suite 466, Great Neck, NY 11021, USA',
    email: 'sales@unimrkt.com',
    phone: '+1.646.712.9302',
    featured: false,
  },
  {
    id: 'fallback-office-uk',
    name: 'United Kingdom',
    address: 'The Old Dairy, 12 Stephen Road, Headington, Oxford, Oxfordshire, United Kingdom OX3 9AY',
    email: 'sales@unimrkt.com',
    phone: '+1.646.712.9302',
    featured: false,
  },
];

const FALLBACK_FAQ_ITEMS: FaqItemModel[] = [
  { id: 'fallback-faq-contact', question: 'How can I contact Unimrkt Research for market research services?', answer: 'You can reach us through the contact form on this page, by emailing sales@unimrkt.com, or by calling any of our regional offices listed above — our team typically responds within one business day.' },
  { id: 'fallback-faq-services', question: 'What types of market research services does Unimrkt offer?', answer: 'We offer primary research, qualitative research, quantitative research, business research, and research support functions, spanning 90+ countries and 22+ languages.' },
  { id: 'fallback-faq-custom', question: 'Can I discuss a customized research requirement with your team?', answer: 'Absolutely — share a few details in the contact form and a research consultant will follow up to scope a study tailored to your specific requirement.' },
  { id: 'fallback-faq-offices', question: 'Where are Unimrkt Research offices located?', answer: 'We have offices in India (Gurugram), the United States (Great Neck, NY), and the United Kingdom (Oxford), with research capabilities extending across 90+ countries.' },
  { id: 'fallback-faq-work', question: 'How can I work with Unimrkt Research?', answer: "Whether you're looking to commission research or join our team, use the contact form above for client inquiries, or see the Work With Unimrkt section below for career opportunities." },
];

export interface ResolvedContact {
  hero: { eyebrow: string; heading: string; subheading: string; image: ContactPageSettings['heroImage']; cta: LinkModel };
  stats: { heading: string; items: ServiceStatItemModel[] };
  office: { eyebrow: string; heading: string; items: OfficeLocationModel[] };
  form: { eyebrow: string; heading: string; subheading: string; image: ContactPageSettings['formImage'] };
  faqItems: FaqItemModel[];
  workWithUs: { heading: string; body: string; cta: LinkModel; image: ContactPageSettings['workWithUsImage'] };
}

export function resolveContact(settings: ContactPageSettings): ResolvedContact {
  return {
    hero: {
      eyebrow: settings.heroEyebrow || 'Contact Us',
      heading: settings.heroHeading || 'Let’s Turn Your Business Questions Into Clear Answers',
      subheading: settings.heroSubheading || 'Tell us what you’re trying to understand. Our research experts will help you find the right path forward.',
      image: settings.heroImage || localImage('contact-hero-bg.jpg', 'Contact Unimrkt Research', 1900, 768),
      cta: settings.heroCta || FALLBACK_HERO_CTA,
    },
    stats: {
      heading: settings.statsHeading || 'Research at a Global Scale',
      items: settings.stats.length > 0 ? settings.stats : FALLBACK_STATS,
    },
    office: {
      eyebrow: settings.officeEyebrow || 'Office Address',
      heading: settings.officeHeading || 'Our Presence',
      items: settings.offices.length > 0 ? settings.offices : FALLBACK_OFFICES,
    },
    form: {
      eyebrow: settings.formEyebrow || 'Contact Form',
      heading: settings.formHeading || 'Let’s Team Up!',
      subheading: settings.formSubheading || 'Interested in high-end, extensive market research for your brand?',
      image: settings.formImage || localImage('contact-form-bg.jpg', 'Contact form', 1740, 455),
    },
    faqItems: settings.faqItems.length > 0 ? settings.faqItems : FALLBACK_FAQ_ITEMS,
    workWithUs: {
      heading: settings.workWithUsHeading || 'Work With unimrkt',
      body: settings.workWithUsBody || 'We offer the best infrastructure for our employees to learn and grow with us.',
      cta: settings.workWithUsCta || { id: 'fallback-work-with-us-cta', label: 'Apply Now', href: '/work-with-us', isExternal: false, variant: 'primary' },
      image: settings.workWithUsImage || localImage('contact-work-with-us-bg.jpg', 'Work With unimrkt', 1740, 455),
    },
  };
}

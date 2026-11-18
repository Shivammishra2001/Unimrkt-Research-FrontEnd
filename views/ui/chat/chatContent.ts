import type { ChatKeywordReplyModel, ChatQuickActionModel, ChatWidgetModel } from '@/models/domain';

/**
 * Built-in chat copy. Every Global → Chat Widget field in Strapi overrides its counterpart here; an empty field keeps
 * the built-in value. Figures match the rest of the site (90+ countries, 22+ languages, ISO 20252 & ISO 27001, offices
 * in Gurugram / Great Neck NY / Oxford). backend/scripts/seed-site-content.ts seeds the same copy into Strapi.
 */
export const DEFAULT_CHAT = {
  title: 'Chat with Unimrkt',
  status: 'Online',
  greeting: "👋 Hi there! I'm the Unimrkt Research assistant. Ask me about our services, coverage or industries — or request a callback and a research consultant will get in touch.",
  placeholder: 'Ask about CATI, healthcare, countries…',
  acknowledgement: "Thanks for your message! I don't have a ready answer for that one, but our research team does — leave your details and they'll get back to you, usually within one business day.",
  formButtonLabel: 'Request a Callback',
  proposalButtonLabel: 'Request Proposal →',
  formIntro: 'Share a few details and a research consultant will reach out, usually within one business day.',
  formSuccess: "Thanks {name}! Our research team will reach out on {contact} shortly.",
  serviceOptions: [
    'Primary Research (CATI/CAWI/CAPI)',
    'Qualitative Research',
    'Quantitative Research',
    'B2B / Healthcare Panels',
    'Business Research',
    'Other',
  ],
};

export const DEFAULT_QUICK_ACTIONS: ChatQuickActionModel[] = [
  {
    id: 'qa-callback',
    label: 'Request a Quote / Callback',
    action: 'lead_form',
    reply: "Great — let's get you a tailored quote. Share a few details below and a research consultant will call you back.",
    highlights: [],
    stats: [],
    showFormButton: false,
  },
  {
    id: 'qa-services',
    label: 'Our Research Services',
    action: 'reply',
    reply: 'We run end-to-end market research, from fieldwork to insight:',
    highlights: [
      'Primary research: CATI (telephonic), CAWI (online) and CAPI / intercept interviews',
      'Qualitative: focus group discussions, in-depth interviews, online bulletin boards',
      'Quantitative: large-sample surveys, survey programming, data processing & tabulation',
      'B2B & healthcare: verified professional and physician audiences',
      'Business research: competitor benchmarking and industry trend monitoring',
    ],
    stats: [],
    link: { label: 'Explore our services', href: '/services' },
    showFormButton: true,
  },
  {
    id: 'qa-coverage',
    label: 'Global Coverage & Quality',
    action: 'reply',
    reply: 'Multi-country fieldwork, run to certified quality standards:',
    highlights: [
      'Phone, online, face-to-face and hybrid fieldwork',
      'Offices in Gurugram (India), Great Neck NY (USA) and Oxford (UK)',
      'ESOMAR and MRSI standards, GDPR-compliant data handling',
      'Quality checks on every interview, before data reaches you',
    ],
    stats: ['90+ Countries', '22+ Languages', 'ISO 20252 & ISO 27001'],
    link: { label: 'About Unimrkt', href: '/our-company' },
    showFormButton: true,
  },
  {
    id: 'qa-industries',
    label: 'Industries We Serve',
    action: 'reply',
    reply: 'Sector-specific research across 27 industries, including:',
    highlights: [
      'Automotive, mobility & industrial',
      'Life sciences & healthcare',
      'BFSI, tech & telecom',
      'FMCG, retail, consumer & media',
      'Energy & natural resources',
    ],
    stats: ['27 Industries', '90+ Countries'],
    link: { label: 'View all industries', href: '/industries' },
    showFormButton: true,
  },
  {
    id: 'qa-careers',
    label: 'Careers & Partnerships',
    action: 'reply',
    reply: "Want to work with Unimrkt? Here's how:",
    highlights: [
      'Careers: roles across research, fieldwork, data processing and operations',
      'Respondents: join our global panel and share your views in studies',
      'Agencies & fieldwork partners: get in touch to collaborate on multi-country projects',
    ],
    stats: [],
    link: { label: 'Work with us', href: '/work-with-us' },
    showFormButton: false,
  },
];

export const DEFAULT_KEYWORD_REPLIES: ChatKeywordReplyModel[] = [
  {
    id: 'kw-lead',
    keywords: ['quote', 'price', 'pricing', 'cost', 'budget', 'call', 'callback', 'contact', 'proposal', 'study', 'studies', 'hire', 'rfp'],
    reply: "I can set that up — share your details below and our research team will come back with a tailored proposal.",
    highlights: [],
    opensForm: true,
  },
  {
    id: 'kw-primary',
    keywords: ['cati', 'cawi', 'capi', 'telephonic', 'phone survey', 'online survey', 'survey', 'fieldwork'],
    reply: 'Our primary research teams field studies in every major mode:',
    highlights: [
      'CATI: telephonic interviews by trained, multilingual interviewers',
      'CAWI: online surveys, programmed and hosted in-house',
      'CAPI: face-to-face and intercept interviews',
      'Survey programming, data processing and tabulation included',
    ],
    link: { label: 'CATI surveys', href: '/services/cati-surveys' },
    opensForm: false,
  },
  {
    id: 'kw-qual',
    keywords: ['qualitative', 'focus group', 'fgd', 'idi', 'in-depth', 'interview', 'bulletin board'],
    reply: 'Our qualitative research uncovers the "why" behind behaviour:',
    highlights: ['Focus group discussions (in person and online)', 'In-depth interviews with consumers and professionals', 'Online bulletin boards and in-home usage tests'],
    link: { label: 'Qualitative research', href: '/services/qualitative-research' },
    opensForm: false,
  },
  {
    id: 'kw-healthcare',
    keywords: ['healthcare', 'health', 'pharma', 'medical', 'physician', 'doctor', 'hcp', 'patient', 'life science'],
    reply: 'We run healthcare and life-sciences research with verified audiences:',
    highlights: ['Physicians, specialists and other HCPs', 'Patients and caregivers', 'Hospital, pharmacy and payer stakeholders'],
    link: { label: 'Life sciences & healthcare', href: '/industries/life-sciences-and-healthcare' },
    opensForm: false,
  },
  {
    id: 'kw-b2b',
    keywords: ['b2b', 'business to business', 'decision maker', 'panel', 'respondent', 'it decision'],
    reply: 'We reach hard-to-find B2B audiences across 90+ countries:',
    highlights: ['C-suite and IT decision makers', 'SMB owners and procurement leads', 'Industry specialists, screened against your criteria'],
    link: { label: 'Our global panel', href: '/services/global-panel' },
    opensForm: false,
  },
  {
    id: 'kw-coverage',
    keywords: ['country', 'countries', 'global', 'coverage', 'language', 'international', 'multi-country', 'region'],
    reply: 'We run fieldwork in 90+ countries and 22+ languages, managed from offices in India, the USA and the UK.',
    highlights: ['Phone, online, face-to-face and hybrid modes', 'Native-language interviewers and translation'],
    link: { label: 'About Unimrkt', href: '/our-company' },
    opensForm: false,
  },
  {
    id: 'kw-quality',
    keywords: ['iso', 'quality', 'gdpr', 'esomar', 'mrsi', 'certified', 'certification', 'compliance', 'security', 'privacy'],
    reply: 'Quality and data security are built into every project:',
    highlights: ['ISO 20252 (market research) and ISO 27001 (information security) certified', 'ESOMAR and MRSI standards', 'GDPR-compliant data handling'],
    link: { label: 'About Unimrkt', href: '/our-company' },
    opensForm: false,
  },
  {
    id: 'kw-careers',
    keywords: ['career', 'job', 'hiring', 'vacancy', 'intern', 'work with you', 'join your team'],
    reply: "We're always keen to meet researchers, interviewers and data specialists.",
    highlights: ['See open roles and apply on our Work With Us page'],
    link: { label: 'Work with us', href: '/work-with-us' },
    opensForm: false,
  },
  {
    id: 'kw-office',
    keywords: ['office', 'location', 'address', 'located', 'where are you', 'visit'],
    reply: 'Our offices:',
    highlights: ['Gurugram, India', 'Great Neck, New York, USA', 'Oxford, United Kingdom', 'Email: sales@unimrkt.com'],
    link: { label: 'Contact us', href: '/contact' },
    opensForm: false,
  },
  {
    id: 'kw-industries',
    keywords: ['industry', 'industries', 'sector', 'automotive', 'bfsi', 'banking', 'fmcg', 'retail', 'telecom'],
    reply: 'We serve 27 industries, from automotive and BFSI to FMCG, tech and healthcare.',
    highlights: [],
    link: { label: 'View all industries', href: '/industries' },
    opensForm: false,
  },
  {
    id: 'kw-services',
    keywords: ['service', 'services', 'research', 'what do you do', 'offer'],
    reply: 'We offer primary, qualitative, quantitative and business research, plus research support (programming, data processing, dashboards).',
    highlights: [],
    link: { label: 'Explore our services', href: '/services' },
    opensForm: false,
  },
];

/** Global → Chat Widget merged over the built-in copy, field by field. */
export function resolveChatContent(content?: ChatWidgetModel) {
  return {
    title: content?.title ?? DEFAULT_CHAT.title,
    status: content?.status ?? DEFAULT_CHAT.status,
    greeting: content?.greeting ?? DEFAULT_CHAT.greeting,
    placeholder: content?.placeholder ?? DEFAULT_CHAT.placeholder,
    acknowledgement: content?.acknowledgement ?? DEFAULT_CHAT.acknowledgement,
    formButtonLabel: content?.formButtonLabel ?? DEFAULT_CHAT.formButtonLabel,
    proposalButtonLabel: content?.proposalButtonLabel ?? DEFAULT_CHAT.proposalButtonLabel,
    formIntro: content?.formIntro ?? DEFAULT_CHAT.formIntro,
    formSuccess: content?.formSuccess ?? DEFAULT_CHAT.formSuccess,
    serviceOptions: content?.serviceOptions?.length ? content.serviceOptions : DEFAULT_CHAT.serviceOptions,
    quickActions: content?.quickActions.length ? content.quickActions : DEFAULT_QUICK_ACTIONS,
    keywordReplies: content?.keywordReplies?.length ? content.keywordReplies : DEFAULT_KEYWORD_REPLIES,
  };
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** First keyword reply whose keyword appears in `text`. Single words match at a word start (career → careers);
 * phrases match anywhere. */
export function matchKeywordReply(text: string, replies: ChatKeywordReplyModel[]): ChatKeywordReplyModel | null {
  const haystack = text.toLowerCase();
  for (const reply of replies) {
    for (const raw of reply.keywords) {
      const kw = raw.trim().toLowerCase();
      if (!kw) continue;
      const hit = /\s/.test(kw) ? haystack.includes(kw) : new RegExp(`(^|[^a-z0-9])${escapeRe(kw)}`).test(haystack);
      if (hit) return reply;
    }
  }
  return null;
}

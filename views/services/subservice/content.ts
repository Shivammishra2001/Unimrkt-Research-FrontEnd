import type { ImageModel, LinkModel, FaqItemModel } from '@/models/domain';
import type { ServiceDetail } from '@/models/service';

/**
 * Level-3 sub-service template (a service with a parent, e.g. Services > Primary Research > Telephonic Surveys) —
 * Figma node 859:15301. Strapi content wins wherever the Service has it (see resolveSubService); the copy below is only
 * the fallback for empty fields — Figma's exact copy for Telephonic Surveys, title-interpolated copy for every other
 * sub-service.
 */

const IMG = '/images/services/telephonic-surveys';
const ICON = '/icons/services/telephonic-surveys';
const img = (src: string, alt = '', width = 1400, height = 933): ImageModel => ({ src, alt, width, height });
const link = (id: string, label: string, href: string, variant: LinkModel['variant'] = 'primary'): LinkModel => ({ id, label, href, isExternal: false, variant });

export interface SubCard {
  title: string;
  body: string;
  icon?: string;
  image?: ImageModel;
}

export interface SubServiceContent {
  hero: { eyebrow: string; heading: string; subheading: string; image: ImageModel; actions: LinkModel[] };
  /** `icon` = a template SVG path; `iconIdentifier` = a CMS credential icon key (rendered like the Level-2 credentials). */
  stats: { heading: string; items: Array<{ value: string; label: string; icon?: string; iconIdentifier?: string }> };
  intro: { eyebrow: string; heading: string; body: string; image: ImageModel };
  why: { eyebrow: string; heading: string; items: SubCard[] };
  process: { eyebrow: string; heading: string; steps: SubCard[] };
  measure: { eyebrow: string; heading: string; body: string; items: SubCard[] };
  quality: { eyebrow: string; heading: string; body: string; image: ImageModel; items: SubCard[] };
  technology: { eyebrow: string; heading: string; body: string; panels: SubCard[] };
  faq: { heading: string; items: FaqItemModel[] };
  about: { eyebrow: string; heading: string; paragraphs: string[] };
}

const STAT_ICONS = [`${ICON}/stat-interviews.svg`, `${ICON}/stat-markets.svg`, `${ICON}/stat-languages.svg`, `${ICON}/stat-quality.svg`];
const WHY_ICONS = ['why-reach', 'why-speed', 'why-human', 'why-language', 'why-engagement', 'why-scalable'].map((n) => `${ICON}/${n}.svg`);
const PROCESS_ICONS = ['process-understand', 'process-design', 'process-recruit', 'process-interview'].map((n) => `${ICON}/${n}.svg`);
/** CMS iconIdentifier keys that name the Level-3 Figma pictograms (public/icons/services/telephonic-surveys/{key}.svg). */
const STAT_KEYS = new Set(['stat-interviews', 'stat-markets', 'stat-languages', 'stat-quality']);
const PROCESS_KEYS = new Set(['process-understand', 'process-design', 'process-recruit', 'process-interview']);
const QUALITY_ICONS =['quality-training', 'quality-sample', 'quality-monitoring', 'quality-responses', 'quality-checks', 'quality-security'].map((n) => `${ICON}/${n}.svg`);

/** Research areas, photos and copy are generic to every sub-service (Figma 859:14429-14507). Figma's own copy repeats
 * one description on four cards and titles two cards "Brand Research"; those slips are corrected here. */
const MEASURE: SubCard[] = [
  { title: 'Customer Experience', body: 'Measure satisfaction, pain points, expectations and service experiences.', image: img(`${IMG}/measure-customer-experience.webp`, 'Customer experience research') },
  { title: 'Brand Research', body: 'Understand awareness, consideration, perception and brand associations.', image: img(`${IMG}/measure-brand-research.webp`, 'Brand research') },
  { title: 'Market Research', body: 'Explore market dynamics, preferences, behaviours and purchase drivers.', image: img(`${IMG}/measure-market-research.webp`, 'Market research') },
  { title: 'Product Research', body: 'Test concepts, features, pricing and product experiences with the right users.', image: img(`${IMG}/measure-product-research.webp`, 'Product research') },
  { title: 'B2B Research', body: 'Reach decision-makers and professionals to understand business needs and buying journeys.', image: img(`${IMG}/measure-b2b-research.webp`, 'B2B research') },
  { title: 'Employee Research', body: 'Capture engagement, culture and workplace experience across your organisation.', image: img(`${IMG}/measure-employee-research.webp`, 'Employee research') },
];

/** Figma 859:12227-12225. Its "Centralized Data" variant repeats the Data Validation text; given its own line here. */
const TECH_PANELS: SubCard[] = [
  { title: 'Smart Survey Management', body: 'Structured questionnaires and controlled interview flows.', image: img(`${IMG}/cati-smart-survey-management.webp`, 'Smart survey management', 1259, 1002) },
  { title: 'Real-Time Monitoring', body: 'Track fieldwork progress and sample performance.', image: img(`${IMG}/cati-real-time-monitoring.webp`, 'Real-time monitoring', 1428, 977) },
  { title: 'Interview Controls', body: 'Maintain consistency across interviews and respondents.', image: img(`${IMG}/cati-interview-controls.webp`, 'Interview controls', 1497, 999) },
  { title: 'Data Validation', body: 'Built-in checks help identify incomplete or inconsistent responses.', image: img(`${IMG}/cati-data-validation.webp`, 'Data validation', 1478, 1013) },
  { title: 'Centralized Data', body: 'Every response captured in one secure, centrally managed system.', image: img(`${IMG}/cati-centralized-data.webp`, 'Centralized data', 885, 986) },
];

const TELEPHONIC: Omit<SubServiceContent, 'hero' | 'intro'> & { hero: Omit<SubServiceContent['hero'], 'image'>; intro: Omit<SubServiceContent['intro'], 'image'> } = {
  hero: {
    eyebrow: 'Telephonic Surveys',
    heading: 'Turn Conversations Into Actionable Insights',
    subheading: 'Reach the right respondents and capture reliable insights through professionally managed telephonic surveys.',
    actions: [link('sub-hero-quote', 'Get a Free Quote', '/contact')],
  },
  stats: {
    heading: 'Research Built Around Every Conversation',
    items: [
      { value: '100K+', label: 'CATI Interviews', icon: STAT_ICONS[0] },
      { value: '50+', label: 'Research Markets', icon: STAT_ICONS[1] },
      { value: 'Multi-Lingual', label: 'Interview Capabilities', icon: STAT_ICONS[2] },
      { value: 'Quality-Controlled', label: 'Every Stage', icon: STAT_ICONS[3] },
    ],
  },
  intro: {
    eyebrow: 'What Are Telephonic Surveys?',
    heading: 'Direct Access to the Voices That Matter',
    body: 'Telephonic surveys provide a structured and efficient way to connect directly with respondents and capture their opinions, experiences, preferences and behaviours.\n\nAt Unimrkt Research, our telephonic research programs combine trained interviewers, carefully designed questionnaires, respondent targeting and rigorous quality checks to deliver dependable primary research insights.\n\nWhether you need customer feedback, market intelligence, brand understanding or B2B research, our CATI capabilities help you collect meaningful data at scale.',
  },
  why: {
    eyebrow: 'Why Telephonic Surveys?',
    heading: 'When the Right Questions Need a Real Conversation',
    items: [
      { title: 'Wider Respondent Reach', body: 'Connect with respondents across geographies, demographics and hard-to-reach segments.', icon: WHY_ICONS[0] },
      { title: 'Faster Data Collection', body: 'Collect structured feedback efficiently without the logistical complexity of face-to-face fieldwork.', icon: WHY_ICONS[1] },
      { title: 'Human Interaction', body: 'Interviewers can clarify questions, manage responses and maintain a natural flow throughout the conversation.', icon: WHY_ICONS[2] },
      { title: 'Multi-Language Capability', body: 'Conduct interviews in languages respondents are most comfortable speaking.', icon: WHY_ICONS[3] },
      { title: 'Better Respondent Engagement', body: 'Personal interaction can help improve participation and response quality for suitable research audiences.', icon: WHY_ICONS[4] },
      { title: 'Scalable Research', body: 'Scale interviews up or down according to sample size, geography and research objectives.', icon: WHY_ICONS[5] },
    ],
  },
  process: {
    eyebrow: 'Our Telephonic Survey Process',
    heading: 'From Research Brief to Reliable Insights',
    steps: [
      { title: 'Understand', body: 'We begin by understanding your research goals, target audience, sample needs and key questions.', icon: PROCESS_ICONS[0] },
      { title: 'Design', body: 'Our research team structures the questionnaire and interview flow around the study objectives.', icon: PROCESS_ICONS[1] },
      { title: 'Recruit', body: 'We identify and reach relevant respondents based on the agreed sample criteria.', icon: PROCESS_ICONS[2] },
      { title: 'Interview', body: 'Trained interviewers conduct structured telephonic interviews using CATI-enabled workflows.', icon: PROCESS_ICONS[3] },
    ],
  },
  measure: {
    eyebrow: 'What We Can Measure',
    heading: 'Ask. Listen. Understand.',
    body: 'From brand perception to customer experience, our telephonic surveys help uncover the answers behind the numbers.',
    items: MEASURE,
  },
  quality: {
    eyebrow: 'Quality First',
    heading: 'Every Conversation Counts. Every Response Matters.',
    body: 'Reliable research starts with reliable data. Our quality framework is designed to maintain accuracy, consistency and respondent authenticity throughout the telephonic research process.',
    image: img(`${IMG}/quality-bg.webp`, '', 1900, 1010),
    items: [
      { title: 'Interviewer Training', body: 'Interviewers are trained on research goals and questionnaire flow.', icon: QUALITY_ICONS[0] },
      { title: 'Sample Validation', body: 'Respondents are screened against agreed research criteria.', icon: QUALITY_ICONS[1] },
      { title: 'Call Monitoring', body: 'Fieldwork is monitored to maintain interviewing standards.', icon: QUALITY_ICONS[2] },
      { title: 'Response Validation', body: 'Responses are reviewed for completeness and consistency.', icon: QUALITY_ICONS[3] },
      { title: 'Data Quality Checks', body: 'Structured checks identify anomalies and quality issues.', icon: QUALITY_ICONS[4] },
      { title: 'Secure Data Handling', body: 'Research data is securely managed to protect respondent privacy.', icon: QUALITY_ICONS[5] },
    ],
  },
  technology: {
    eyebrow: 'CATI Technology',
    heading: 'Human Conversations.\nTechnology-Enabled Research.',
    body: 'CATI combines interviewer-led conversations with technology for consistent, efficient research management.',
    panels: TECH_PANELS,
  },
  faq: {
    heading: 'Frequently Asked Questions',
    items: [
      { id: 'tel-faq-1', question: 'What are telephonic surveys?', answer: 'Telephonic surveys are structured interviews conducted by phone, where trained interviewers ask respondents a set questionnaire and record their answers — a fast, reliable way to collect first-hand data from a defined audience.' },
      { id: 'tel-faq-2', question: 'What is CATI?', answer: 'CATI (Computer-Assisted Telephone Interviewing) is the technology our interviewers use: the questionnaire runs on screen with routing, quotas and validation built in, so every interview follows the same flow and data is captured cleanly in real time.' },
      { id: 'tel-faq-3', question: 'When should I use a telephonic survey?', answer: 'They work well when you need to reach specific or hard-to-reach audiences, want interviewer-led clarification, need fast turnaround across geographies, or are researching B2B decision-makers who are easier to reach by phone.' },
      { id: 'tel-faq-4', question: 'Can you conduct surveys in multiple languages?', answer: 'Yes. Our interviewers conduct telephonic surveys in 22+ languages across 90+ countries, so respondents can answer in the language they are most comfortable with.' },
      { id: 'tel-faq-5', question: 'Can you reach B2B respondents?', answer: 'Yes. We regularly interview business decision-makers, professionals and specialist audiences, screening every respondent against the agreed criteria before the interview begins.' },
      { id: 'tel-faq-6', question: 'How do you ensure data quality?', answer: 'Through interviewer training, sample validation, live call monitoring, response validation and structured data-quality checks, backed by ISO 20252 and ISO 27001 certified processes.' },
    ],
  },
  about: {
    eyebrow: 'About Telephonic Surveys',
    heading: 'Direct Conversations. Deeper Insights.',
    paragraphs: [
      'Telephonic Surveys enable businesses to connect directly with their target audience and gather reliable, real-time insights through structured conversations. At Unimrkt Research, our trained interviewers use professionally designed questionnaires and robust research processes to capture meaningful responses from the right respondents.',
      'From customer feedback and brand perception to market understanding and B2B research, our telephonic survey solutions combine human interaction with technology-driven data collection to deliver accurate, actionable insights that support confident business decisions.',
    ],
  },
};

/** The same structure for any other sub-service, with its title worked in. */
function generic(title: string): typeof TELEPHONIC {
  const t = title;
  const tl = title.toLowerCase();
  return {
    hero: {
      eyebrow: t,
      heading: `Turn ${t} Into Actionable Insights`,
      subheading: `Reach the right respondents and capture reliable insights through professionally managed ${tl}.`,
      actions: [link('sub-hero-quote', 'Get a Free Quote', '/contact')],
    },
    stats: {
      heading: 'Research Built Around Every Project',
      items: [
        { value: '16+', label: 'Years of Research', icon: STAT_ICONS[0] },
        { value: '90+', label: 'Countries Covered', icon: STAT_ICONS[1] },
        { value: 'Multi-Lingual', label: 'Research Capabilities', icon: STAT_ICONS[2] },
        { value: 'Quality-Controlled', label: 'Every Stage', icon: STAT_ICONS[3] },
      ],
    },
    intro: {
      eyebrow: `What Are ${t}?`,
      heading: 'Direct Access to the Voices That Matter',
      body: `${t} give businesses a structured, reliable way to capture the opinions, experiences, preferences and behaviours of the people who matter to them.\n\nAt Unimrkt Research, our ${tl} programs combine experienced researchers, carefully designed research instruments, precise respondent targeting and rigorous quality checks to deliver dependable primary research insights.\n\nWhether you need customer feedback, market intelligence, brand understanding or B2B research, our ${tl} capabilities help you collect meaningful data at scale.`,
    },
    why: {
      eyebrow: `Why ${t}?`,
      heading: 'The Right Method for the Right Questions',
      items: [
        { title: 'Wider Respondent Reach', body: 'Connect with respondents across geographies, demographics and hard-to-reach segments.', icon: WHY_ICONS[0] },
        { title: 'Faster Data Collection', body: 'Collect structured feedback efficiently and keep fieldwork on schedule.', icon: WHY_ICONS[1] },
        { title: 'Expert Research Team', body: 'Experienced researchers manage every stage, from design to delivery.', icon: WHY_ICONS[2] },
        { title: 'Multi-Language Capability', body: 'Run research in the languages respondents are most comfortable with.', icon: WHY_ICONS[3] },
        { title: 'Better Respondent Engagement', body: 'Well-designed research experiences improve participation and response quality.', icon: WHY_ICONS[4] },
        { title: 'Scalable Research', body: 'Scale up or down according to sample size, geography and research objectives.', icon: WHY_ICONS[5] },
      ],
    },
    process: {
      eyebrow: `Our ${t} Process`,
      heading: 'From Research Brief to Reliable Insights',
      steps: [
        { title: 'Understand', body: 'We begin by understanding your research goals, target audience, sample needs and key questions.', icon: PROCESS_ICONS[0] },
        { title: 'Design', body: 'Our research team structures the research instrument and flow around the study objectives.', icon: PROCESS_ICONS[1] },
        { title: 'Recruit', body: 'We identify and reach relevant respondents based on the agreed sample criteria.', icon: PROCESS_ICONS[2] },
        { title: 'Collect', body: `Experienced teams run the ${tl} fieldwork with quality checks at every stage.`, icon: PROCESS_ICONS[3] },
      ],
    },
    measure: { eyebrow: 'What We Can Measure', heading: 'Ask. Listen. Understand.', body: `From brand perception to customer experience, our ${tl} help uncover the answers behind the numbers.`, items: MEASURE },
    quality: {
      eyebrow: 'Quality First',
      heading: 'Every Response Counts. Every Insight Matters.',
      body: `Reliable research starts with reliable data. Our quality framework is designed to maintain accuracy, consistency and respondent authenticity throughout every ${tl} project.`,
      image: img(`${IMG}/quality-bg.webp`, '', 1900, 1010),
      items: [
        { title: 'Researcher Training', body: 'Teams are trained on research goals and the study flow.', icon: QUALITY_ICONS[0] },
        { title: 'Sample Validation', body: 'Respondents are screened against agreed research criteria.', icon: QUALITY_ICONS[1] },
        { title: 'Fieldwork Monitoring', body: 'Fieldwork is monitored to maintain research standards.', icon: QUALITY_ICONS[2] },
        { title: 'Response Validation', body: 'Responses are reviewed for completeness and consistency.', icon: QUALITY_ICONS[3] },
        { title: 'Data Quality Checks', body: 'Structured checks identify anomalies and quality issues.', icon: QUALITY_ICONS[4] },
        { title: 'Secure Data Handling', body: 'Research data is securely managed to protect respondent privacy.', icon: QUALITY_ICONS[5] },
      ],
    },
    technology: { eyebrow: 'Research Technology', heading: 'Expert Researchers.\nTechnology-Enabled Research.', body: 'Our research platforms combine expert-led fieldwork with technology for consistent, efficient research management.', panels: TECH_PANELS },
    faq: {
      heading: 'Frequently Asked Questions',
      items: [
        { id: 'sub-faq-1', question: `What are ${tl}?`, answer: `${t} are a primary research method Unimrkt Research uses to collect first-hand data from a defined audience, designed around your objectives and quality-checked at every stage.` },
        { id: 'sub-faq-2', question: `When should I use ${tl}?`, answer: 'When you need reliable first-hand data from a specific audience — our team will recommend the right method, or combination of methods, for your objectives, timelines and budget.' },
        { id: 'sub-faq-3', question: 'Can you conduct research in multiple languages?', answer: 'Yes. We run research in 22+ languages across 90+ countries.' },
        { id: 'sub-faq-4', question: 'Can you reach B2B respondents?', answer: 'Yes. We regularly research business decision-makers, professionals and specialist audiences, screening every respondent against the agreed criteria.' },
        { id: 'sub-faq-5', question: 'How do you ensure data quality?', answer: 'Through team training, sample validation, fieldwork monitoring, response validation and structured data-quality checks, backed by ISO 20252 and ISO 27001 certified processes.' },
        { id: 'sub-faq-6', question: 'How can I get started?', answer: 'Get in touch through our contact page or the Get a Free Quote button and a research specialist will help scope your study.' },
      ],
    },
    about: {
      eyebrow: `About ${t}`,
      heading: 'Reliable Data. Deeper Insights.',
      paragraphs: [
        `${t} enable businesses to connect with their target audience and gather reliable insights through structured research. At Unimrkt Research, our experienced teams use professionally designed research instruments and robust processes to capture meaningful responses from the right respondents.`,
        `From customer feedback and brand perception to market understanding and B2B research, our ${tl} solutions combine research expertise with technology-driven data collection to deliver accurate, actionable insights that support confident business decisions.`,
      ],
    },
  };
}

/** Blank-line separated paragraphs (a single newline stays inside its paragraph). */
const paragraphsOf = (text: string) =>
  text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

/**
 * Strapi first, field by field: every section that has a matching Service field renders that field whenever it is
 * filled, and only an empty field falls back to the template copy (Figma copy for telephonic-surveys, title-interpolated
 * copy for every other sub-service — Telephonic text is never shown on another service).
 *
 *   hero        <- heroEyebrow / heroHeading / heroSubheading / heroImage / heroActions
 *   stats       <- credentialsHeading + credentials (value, label, iconIdentifier)
 *   intro       <- overviewEyebrow / overviewHeading / overviewBody / overviewImage
 *   process     <- methodologiesEyebrow / methodologiesHeading + methodologies (title, description, icon)
 *   faq         <- faqItems
 *   about       <- aboutEyebrow / aboutHeading / aboutBody
 *   why, measure, quality, technology have no Service fields yet, so they always use the template copy.
 */
export function resolveSubService(service: ServiceDetail): SubServiceContent {
  const telephonic = service.slug === 'telephonic-surveys';
  const c = telephonic ? TELEPHONIC : generic(service.title);
  const aboutParagraphs = service.aboutBody ? paragraphsOf(service.aboutBody) : [];

  return {
    ...c,
    hero: {
      eyebrow: service.heroEyebrow || c.hero.eyebrow,
      heading: service.heroHeading || c.hero.heading,
      subheading: service.heroSubheading || c.hero.subheading,
      image: service.heroImage ?? (telephonic ? img(`${IMG}/hero.webp`, '', 1900, 783) : img('/images/services/detail/primary-research-hero.jpg', '', 1920, 1344)),
      actions: service.heroActions.length > 0 ? service.heroActions : c.hero.actions,
    },
    stats:
      service.credentials.length > 0
        ? {
            heading: service.credentialsHeading || c.stats.heading,
            items: service.credentials.map((s) => ({
              value: s.value,
              label: s.label,
              // A `stat-*` key names one of the Figma stat pictograms; any other key renders like a Level-2 credential.
              ...(s.iconIdentifier && STAT_KEYS.has(s.iconIdentifier) ? { icon: `${ICON}/${s.iconIdentifier}.svg` } : { iconIdentifier: s.iconIdentifier }),
            })),
          }
        : { ...c.stats, heading: service.credentialsHeading || c.stats.heading },
    intro: {
      eyebrow: service.overviewEyebrow || c.intro.eyebrow,
      heading: service.overviewHeading || c.intro.heading,
      body: service.overviewBody || c.intro.body,
      image: service.overviewImage ?? (telephonic ? img(`${IMG}/intro.webp`, 'Telephonic survey interviewer', 1400, 976) : img('/images/services/detail/primary-research-overview.jpg', '', 1200, 840)),
    },
    process: {
      eyebrow: service.methodologiesEyebrow || c.process.eyebrow,
      heading: service.methodologiesHeading || c.process.heading,
      steps:
        service.methodologies.length > 0
          ? service.methodologies.map((m, i) => ({
              title: m.title,
              body: m.description ?? '',
              // An uploaded icon wins, then a `process-*` key naming one of the Figma pictograms, then the template's icon
              // for the step's position.
              icon:
                m.icon?.src ??
                (m.iconIdentifier && PROCESS_KEYS.has(m.iconIdentifier) ? `${ICON}/${m.iconIdentifier}.svg` : PROCESS_ICONS[i % PROCESS_ICONS.length]),
            }))
          : c.process.steps,
    },
    faq: { heading: c.faq.heading, items: service.faqItems.length > 0 ? service.faqItems : c.faq.items },
    about: {
      eyebrow: service.aboutEyebrow || c.about.eyebrow,
      heading: service.aboutHeading || c.about.heading,
      paragraphs: aboutParagraphs.length > 0 ? aboutParagraphs : c.about.paragraphs,
    },
  };
}

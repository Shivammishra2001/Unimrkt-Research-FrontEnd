import type { ImageModel, LinkModel, SeoModel } from '@/models/domain';
import type { IndustriesPageContent } from '@/models/industriesPage';

/**
 * /services listing copy — Figma 1231:77069 ("Services", 1900x11803). The live copy is the Strapi entry Pages >
 * Services (one `services-page.*` block per section, normalised in controllers/servicesListingPage.ts); every field
 * left empty there — or the whole page, before the entry exists — falls back to the Figma copy below. The backend
 * seed (backend/scripts/seed-data/services-page.json) is generated from this same object. Image fields are optional:
 * unset, each section draws the Figma asset that ships in /public. The service categories, industries, testimonials
 * and blog posts are separate Strapi collections.
 */

const link = (id: string, label: string, href: string, variant: LinkModel['variant']): LinkModel => ({ id, label, href, isExternal: false, variant });

export interface ServicesStat {
  id: string;
  value: string;
  label: string;
  /** Key into WHY_ICONS (views/services/listing/WhyChooseBand.tsx) — the built-in icon when no `icon` is uploaded. */
  iconIdentifier?: string;
  icon?: ImageModel;
}

export interface ServicesCoverageCard {
  title: string;
  body: string;
  /** Built-in icon file in /public/icons/services (by card position). */
  icon: string;
  /** Uploaded icon; replaces the built-in one. */
  iconImage?: ImageModel;
}

export interface ServicesListingContent {
  hero: { eyebrow: string; heading: string; subheading: string; image?: ImageModel; actions: LinkModel[] };
  intro: { eyebrow: string; heading: string; paragraphs: string[]; image?: ImageModel };
  showcase: { eyebrow: string; heading: string; body: string; /** Panel button label. */ ctaLabel: string };
  why: { heading: string; body: string; stats: ServicesStat[] };
  process: IndustriesPageContent['process'];
  band: { heading: string; body: string; cta: LinkModel; personImage?: ImageModel };
  coverage: { eyebrow: string; heading: string; body: string; cards: ServicesCoverageCard[] };
  industries: { eyebrow: string; heading: string; body: string };
  caseBand: {
    eyebrow: string;
    heading: string;
    body: string;
    cta: LinkModel;
    stats: { value: string; label: string; caption?: string }[];
    personImage?: ImageModel;
    chartImage?: ImageModel;
  };
  testimonials: { eyebrow: string; heading: string };
  faq: IndustriesPageContent['faq'];
  about: IndustriesPageContent['about'];
  finalCta: IndustriesPageContent['finalCta'];
  seo?: SeoModel;
}

export const SERVICES_LISTING_FALLBACK: ServicesListingContent = {
  hero: {
    eyebrow: 'Our Services',
    heading: 'Research Solutions That Drive Business Growth',
    subheading: 'Helping organizations transform data into actionable insights through comprehensive market research and business intelligence.',
    actions: [link('svc-hero-quote', 'Get a Free Quote', '/contact', 'primary'), link('svc-hero-experts', 'Talk to Our Experts', '/contact', 'ghost')],
  },
  intro: {
    eyebrow: 'About Our Services',
    heading: 'One Research Partner. Multiple Ways to Find the Answer.',
    paragraphs: [
      'At Unimrkt Research, we believe meaningful research starts with understanding the question behind the business challenge. Our services bring together primary research, qualitative and quantitative methodologies, business research and specialized research support to help organizations gain a deeper understanding of their customers, markets and opportunities.',
      'From exploring consumer needs and measuring market behaviour to evaluating new opportunities and understanding competitive landscapes, we design research solutions around your objectives, audience and market. Our experienced team combines the right methodology, structured processes and quality-focused execution to turn complex questions into reliable data and actionable insights.',
      'Whether you need to explore, measure, validate or understand, Unimrkt provides the research expertise and capabilities to help you move from questions to insights and insights to informed decisions.',
    ],
  },
  showcase: {
    eyebrow: 'Our Services',
    heading: 'End-to-End Market Research Solutions',
    body: 'From research design and respondent recruitment to data collection, analysis, and reporting, Unimrkt Research provides comprehensive market research solutions tailored to your business objectives. Our expert team delivers accurate, actionable insights that help organizations make informed decisions, uncover opportunities, and drive sustainable growth.',
    ctaLabel: 'Explore Research',
  },
  why: {
    heading: 'Why Choose Unimrkt?',
    body: 'With 16+ years of expertise, global research capabilities, advanced methodologies, and trusted data quality, Unimrkt delivers accurate insights that empower smarter business decisions and sustainable growth.',
    stats: [
      { id: 'why-years', value: '16+ Years', label: 'of Research Excellence', iconIdentifier: 'trophy' },
      { id: 'why-countries', value: '90+ Countries', label: 'Covered', iconIdentifier: 'global' },
      { id: 'why-languages', value: '22+ Languages', label: 'Supported', iconIdentifier: 'languages' },
      { id: 'why-experts', value: 'Experienced', label: 'Research Professionals', iconIdentifier: 'users' },
      { id: 'why-custom', value: 'Customized', label: 'Research Solutions', iconIdentifier: 'box' },
      { id: 'why-accurate', value: 'Accurate', label: '& Actionable Insights', iconIdentifier: 'shield-check' },
    ],
  },
  process: {
    eyebrow: 'Workflow',
    heading: 'Research Process',
    body: 'Our proven research process combines strategic planning, precise data collection, rigorous analysis, and actionable reporting to deliver reliable insights that support confident business decisions and measurable growth.',
    steps: [
      { title: 'Discover Your Objectives', body: 'Every successful research project starts with a clear understanding of the business challenge. We work closely with you to identify your goals, target audience, key questions and desired outcomes, creating a focused foundation for the right research approach and ensuring every insight contributes meaningfully to your business decisions.' },
      { title: 'Design the Research', body: 'Once objectives are clear, we develop the right research framework around your business needs. From methodology and audience definition to sample design, questionnaires and research tools, we carefully structure every element to ensure the study captures relevant information and delivers reliable, meaningful insights for confident decision-making.' },
      { title: 'Collect Quality Data', body: 'We use structured fieldwork processes, trained researchers and robust quality checks to collect accurate, reliable data from the right audiences. From respondent validation and interview monitoring to data consistency and verification, every stage is carefully managed to maintain research quality and provide a dependable foundation for meaningful insights.' },
      { title: 'Analyze & Validate', body: 'Once data is collected, we carefully analyze and validate the findings to identify meaningful patterns, trends and opportunities. Through rigorous review processes, quality checks and expert interpretation, we help ensure data consistency and relevance, turning information into reliable signals from noise and building a strong foundation for actionable recommendations.' },
    ],
  },
  band: {
    heading: 'Have a Question?\nLet’s Find the Answer.',
    body: 'Research solutions designed around your business objectives, audience and market.',
    cta: link('svc-band-cta', 'Start a Conversation', '/contact', 'primary'),
  },
  coverage: {
    eyebrow: 'Our Coverage',
    heading: 'Research Reach That Goes Beyond Markets',
    body: 'Our research capabilities span markets, industries, audiences and geographies, helping businesses build a deeper understanding of the people, trends and opportunities that matter most. From local and regional studies to complex multi-country research programs, Unimrkt Research delivers insights across diverse markets and business environments. We combine proven research methodologies, industry expertise, advanced technology and strong on-ground capabilities to design and execute research programs tailored to each business challenge. Whether you need to understand customer behaviour, evaluate market opportunities, assess brand perceptions or explore emerging trends, our teams provide reliable, actionable insights that support confident decisions and help organizations navigate changing markets with clarity.',
    cards: [
      { icon: 'coverage-global.svg', title: 'Global & Regional Markets', body: 'Our research capabilities extend across international, national, local and regional markets, helping businesses understand diverse market dynamics and customer behaviours. We combine local market knowledge with structured research methodologies to uncover relevant insights, identify emerging opportunities and support informed decisions across different geographies, audiences and business environments.' },
      { icon: 'coverage-audience.svg', title: 'Diverse Audiences', body: 'We connect research with the people who matter most to your business. From consumers and B2B decision-makers to professionals, healthcare audiences and specialised respondent groups, our capabilities help you gather relevant perspectives across audience segments. We use targeted recruitment and structured research approaches to understand attitudes, behaviours, needs and experiences, providing insights that support more informed business and marketing decisions.' },
      { icon: 'coverage-buildings.svg', title: 'Multiple Industries', body: 'Our research expertise spans diverse industries, enabling us to understand the unique challenges, audiences and market dynamics within each sector. From Banking & Finance and Healthcare to Consumer & Retail, Technology, Automotive, Media and B2B & Industrial markets, we develop research approaches that align with industry-specific objectives and help organizations uncover relevant insights and identify meaningful business opportunities.' },
      { icon: 'coverage-search.svg', title: 'Multiple Research Methods', body: 'We bring together a broad range of research methodologies to address different business questions and research objectives. Our capabilities include qualitative, quantitative, primary and business research, supported by specialised research functions. By selecting and combining the right methods, we create focused research programs that generate reliable data, deeper understanding and actionable insights aligned with your specific requirements.' },
    ],
  },
  industries: {
    eyebrow: 'Industries We Serve',
    heading: 'Research Expertise Across Diverse Industries',
    body: 'From financial services and healthcare to technology, retail and industrial markets, our research capabilities help organizations understand their customers, markets and business opportunities. We work across diverse sectors, tailoring research approaches to each industry’s unique challenges, audiences and decision-making needs. By combining the right methodologies, market expertise and quality-focused execution, we help businesses uncover meaningful insights and make more informed strategic decisions.',
  },
  caseBand: {
    eyebrow: 'Case Studies',
    heading: 'Turning Research\nInto Real-World Impact',
    body: 'Explore how Unimrkt Research helps organizations uncover insights, solve complex business challenges and make more informed decisions through data-driven research.',
    cta: link('svc-case-cta', 'Explore Case Studies', '/case-study', 'secondary'),
    stats: [
      { value: '50k +', label: 'Projects Delivered', caption: 'Delivering impactful research across diverse markets' },
      { value: '500+', label: 'Clients Served Across Diverse Industries' },
    ],
  },
  testimonials: { eyebrow: 'Client Success Stories', heading: 'Trusted Research Partner for Businesses Worldwide' },
  faq: {
    cta: link('svc-faq-cta', 'Browse Blogs', '/blogs', 'primary'),
    heading: 'Frequently Asked Questions',
    items: [
      { id: 'svc-faq-1', question: 'What research services does Unimrkt Research offer?', answer: 'We offer primary research, qualitative research, quantitative research, business research and research support functions — from study design and respondent recruitment through data collection, analysis and reporting — across B2B and B2C audiences.' },
      { id: 'svc-faq-2', question: 'How does Unimrkt choose the right research methodology?', answer: 'We start from your business objectives, target audience, timelines and budget, then recommend the method — or combination of methods — that will answer your question most reliably, explaining the trade-offs before fieldwork begins.' },
      { id: 'svc-faq-3', question: 'What is the difference between qualitative and quantitative research?', answer: 'Qualitative research explores the “why” behind attitudes and behaviour through interviews, focus groups and other in-depth conversations; quantitative research measures “how many” and “how much” through structured surveys and statistically robust samples.' },
      { id: 'svc-faq-4', question: 'Can Unimrkt conduct research across different industries?', answer: 'Yes. We run research across Banking & Finance, Healthcare, Consumer & Retail, Technology, Automotive, Media, B2B & Industrial and many more sectors, tailoring every study to the industry’s audiences and decision-making needs.' },
      { id: 'svc-faq-5', question: 'Does Unimrkt provide primary market research?', answer: 'Yes. Primary research is at the core of what we do — surveys, interviews, focus groups and fieldwork that collect first-hand data directly from the consumers, customers and decision-makers who matter to your business.' },
      { id: 'svc-faq-6', question: 'Does Unimrkt conduct research across multiple markets and geographies?', answer: 'Yes. We manage local, regional and multi-country programmes across 90+ countries and 22+ languages, combining local market knowledge with consistent research standards and quality checks.' },
      { id: 'svc-faq-7', question: 'Can Unimrkt customize a research solution for a specific business requirement?', answer: 'Every engagement is designed around your objectives. We shape the methodology, audience, sample, questionnaire and reporting to fit your specific requirement rather than offering one-size-fits-all packages.' },
      { id: 'svc-faq-8', question: 'How can I get started with a research project at Unimrkt?', answer: 'Get in touch through our contact page or the “Talk to Our Experts” button. Share your objectives and timeline, and our team will come back with a recommended approach and proposal.' },
    ],
  },
  about: {
    eyebrow: 'About Our Services',
    heading: 'Comprehensive Research Solutions For Smarter Business Decisions',
    paragraphs: [
      'At Unimrkt Research, we provide end-to-end market research services that empower businesses with accurate data, actionable insights, and strategic intelligence. From primary data collection and qualitative research to quantitative studies, business research, and research support functions, our tailored solutions help organizations understand markets, customers, and emerging opportunities.',
      'Backed by experienced researchers, advanced methodologies, and global capabilities, we deliver reliable research solutions across diverse industries. Whether you’re launching a new product, evaluating market opportunities, or strengthening your competitive position, Unimrkt Research provides the insights you need to make confident, data-driven decisions and achieve sustainable growth.',
    ],
  },
  finalCta: {
    heading: 'Start Your Research Journey',
    body: 'Partner with Unimrkt Research to uncover actionable market intelligence, understand your industry, and make confident business decisions.',
    action: link('svc-final-cta', 'Talk to Our Experts', '/contact', 'secondary'),
  },
};

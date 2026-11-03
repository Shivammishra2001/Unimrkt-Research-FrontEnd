import { HeroSection } from './HeroSection';
import { ContactStats } from './ContactStats';
import { ContactPresence } from './ContactPresence';
import { WhyWorkSection } from './WhyWorkSection';
import { HowItWorksSection } from './HowItWorksSection';
import { ContactFormSection } from './ContactFormSection';
import { resolveContact } from './fallback';
import { FaqView } from '@/views/sections/FaqView';
import { AboutServicesCta } from '@/views/industries/listing/AboutServicesCta';
import type { ContactPageSettings } from '@/models/contactPage';

/**
 * /contact — Figma node 637:10433 ("Contact", file foaJFuv0vRX8nD43o0ylgB). Navbar/Footer are global (app/layout.tsx;
 * the header floats over the hero on this route). Template + graceful fallback: `resolveContact()` (./fallback.ts)
 * prefers the CMS's `contact-page` singleType and falls back to the node's own verbatim copy wherever a field is empty.
 *
 * Sections, top to bottom, as drawn: Hero (+breadcrumb) / "Research at a Global Scale" stats / "Our Presence" map with the
 * office cards / "Why work with unimrkt?" / "How it works" steps / "Let's Team Up!" form / FAQ / "Have a Research
 * Question? Let's Talk." copy + the closing CTA band. The Why-work, How-it-works and closing copy are static text off the node.
 */
export function ContactView({ settings }: { settings: ContactPageSettings }) {
  const content = resolveContact(settings);

  return (
    <>
      <HeroSection hero={content.hero} />
      <ContactStats stats={content.stats} />
      <ContactPresence office={content.office} />
      <WhyWorkSection />
      <HowItWorksSection />
      <ContactFormSection form={content.form} />
      <FaqView
        index={0}
        variant="contact"
        block={{
          kind: 'faq',
          id: 'contact-faq',
          theme: 'light',
          heading: 'Frequently Asked Questions',
          background: { src: '/figma-home/faq-worldmap.png', alt: '', width: 1377, height: 787 },
          items: content.faqItems,
        }}
      />
      <AboutServicesCta
        detail
        compact
        about={{
          eyebrow: 'Contact Us',
          heading: 'Have a Research Question? Let’s Talk.',
          paragraphs: [
            'Tell us what you’re trying to understand—whether it’s a market opportunity, customer behaviour, industry trend, competitive landscape or a specific business challenge. Our team takes the time to understand your objectives, target audience and desired outcomes before recommending the right research approach, methodology and scope. From focused studies to complex multi-market research programs, we help businesses ask the right questions and uncover meaningful insights.',
            'Our capabilities span qualitative and quantitative research, B2B, healthcare, consumer research, CATI and global research across diverse industries and audiences. With experienced researchers, robust quality processes, technology-enabled execution and a global network, we deliver reliable insights that can support confident business decisions. Share your research requirement with us, and our experts will work with you to shape a practical, focused solution aligned with your goals, timelines and market needs. Let’s start a conversation and discover the right research path for your business.',
          ],
        }}
        finalCta={{
          heading: 'Start Your Research Journey',
          body: 'Partner with Unimrkt Research to uncover actionable market intelligence, understand your industry, and make confident business decisions.',
          action: { id: 'contact-final-cta', label: 'Talk to Our Experts', href: '/contact', isExternal: false, variant: 'secondary' },
        }}
      />
    </>
  );
}

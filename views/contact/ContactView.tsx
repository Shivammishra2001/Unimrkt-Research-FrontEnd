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
import type { ClosingBandsSettings } from '@/models/domain';
import { resolveClosingBands } from '@/views/sections/closingBands';

/**
 * /contact — Figma node 637:10433 ("Contact", file foaJFuv0vRX8nD43o0ylgB). Navbar/Footer are global (app/layout.tsx;
 * the header floats over the hero on this route). Template + graceful fallback: `resolveContact()` (./fallback.ts)
 * prefers the CMS's `contact-page` singleType and falls back to the node's own verbatim copy wherever a field is empty.
 *
 * Sections, top to bottom, as drawn: Hero (+breadcrumb) / "Research at a Global Scale" stats / "Our Presence" map with the
 * office cards / "Why work with unimrkt?" / "How it works" steps / "Let's Team Up!" form / FAQ / "Have a Research
 * Question? Let's Talk." copy + the closing CTA band. The Why-work, How-it-works and closing copy are static text off the node.
 */
export function ContactView({ settings, globalBands }: { settings: ContactPageSettings; globalBands?: ClosingBandsSettings }) {
  // Closing bands: this page's overrides (Pages → Contact), then Global Header, Footer & SEO, then the built-in copy.
  const bands = resolveClosingBands(globalBands, settings.closingBands);
  const content = resolveContact(settings);

  return (
    <>
      <HeroSection hero={content.hero} />
      <ContactStats stats={content.stats} />
      <ContactPresence office={content.office} />
      <WhyWorkSection content={content.why} />
      <HowItWorksSection content={content.how} />
      <ContactFormSection form={content.form} />
      <FaqView
        index={0}
        variant="contact"
        block={{
          kind: 'faq',
          id: 'contact-faq',
          theme: 'light',
          heading: bands.faq.heading,
          background: { src: '/figma-home/faq-worldmap.png', alt: '', width: 1377, height: 787 },
          items: content.faqItems,
        }}
      />
      <AboutServicesCta
        detail
        compact
        about={content.about}
        finalCta={{
          heading: bands.finalCta.heading,
          body: bands.finalCta.body,
          action: bands.finalCta.action,
        }}
      />
    </>
  );
}

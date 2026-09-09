import { Section } from '@/views/ui/Section';
import { Container } from '@/views/ui/Container';
import { Heading } from '@/views/ui/Heading';
import { Prose } from '@/views/ui/Prose';
import { Button } from '@/views/ui/Button';
import { IndustryCard } from './IndustryCard';
import type { IndustrySummary } from '@/models/industry';

const CLOSING_CTA_LINK = {
  id: 'industries-listing-cta',
  label: 'Talk to us',
  href: '/contact',
  isExternal: false,
  variant: 'secondary' as const,
};

/** /industries archive. Mirrors ServiceListingView's layout exactly. */
export function IndustryListingView({
  industries,
  heading = 'Industries',
  subheading = 'Market research and insights tailored to your sector.',
}: {
  industries: IndustrySummary[];
  heading?: string;
  subheading?: string;
}) {
  return (
    <>
      {/* !important needed to beat Section's own responsive py-* — this is
          the page's own first element, so it owns Navbar clearance. */}
      <Section theme="light" className="!pt-32 sm:!pt-36 pb-0">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Heading as="h1" size="display">
              {heading}
            </Heading>
            <Prose className="mt-4">{subheading}</Prose>
          </div>
        </Container>
      </Section>
      <Section theme="light">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => (
              <IndustryCard key={industry.slug} industry={industry} priority={i === 0} />
            ))}
          </div>
        </Container>
      </Section>
      <Section theme="accent">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Heading as="h2" size="h2">
              Don&apos;t see your industry?
            </Heading>
            <Prose className="mt-4 opacity-90">
              Tell us about your sector — we&apos;ll tailor a research approach to it.
            </Prose>
            <div className="mt-8 flex justify-center">
              <Button link={CLOSING_CTA_LINK} variant="secondary" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

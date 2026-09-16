import { Container } from '@/views/ui/Container';
import type { ResolvedPrivacyPolicy } from './fallback';

/** Preamble — Figma node 1114:50556 (y885-1256), directly under the
 * breadcrumb and above the "This Privacy Policy Defines and Regulates:"
 * table of contents. 5 paragraphs, verbatim, "\n\n"-split from the CMS
 * field. */
export function IntroSection({ introBody }: { introBody: ResolvedPrivacyPolicy['introBody'] }) {
  const paragraphs = introBody.split('\n\n');

  return (
    <section className="bg-white pt-16 sm:pt-20 lg:pt-24">
      <Container>
        <div className="flex flex-col gap-6">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-base leading-[1.9] text-heading opacity-80">
              {p}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}

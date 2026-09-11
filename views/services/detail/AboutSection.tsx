import { Container } from '@/views/ui/Container';
import { Prose } from '@/views/ui/Prose';
import type { ResolvedServiceDetail } from './fallback';

/** "About {Title}" (2nd instance) — Figma node 474:6038-6040
 * (y8110-8681), same eyebrow/heading/Prose pattern as /blogs',
 * /industries', and /industries/[slug]'s own "About" sections.
 * CMS-first, template-fallback; `aboutBody`'s 2 Figma paragraphs are
 * stored as one field, split on a blank line. */
export function AboutSection({ about }: { about: ResolvedServiceDetail['about'] }) {
  const paragraphs = about.body.split(/\n\s*\n/).filter(Boolean);

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-[850px] text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{about.eyebrow}</p>
          <h2 className="mt-3 capitalize text-[28px] font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
            {about.heading}
          </h2>
          {paragraphs.map((paragraph, i) => (
            <Prose key={i} className={`mx-auto max-w-4xl ${i === 0 ? 'mt-6' : 'mt-4'}`}>
              {paragraph}
            </Prose>
          ))}
        </div>
      </Container>
    </section>
  );
}

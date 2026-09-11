import { Globe, Users, Clock, ShieldCheck, Award, Languages, Sparkles, type LucideIcon } from 'lucide-react';
import { Section } from '@/views/ui/Section';
import { Container } from '@/views/ui/Container';
import { Heading } from '@/views/ui/Heading';
import { Prose } from '@/views/ui/Prose';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { Reveal } from '@/views/ui/Reveal';
import type { FeatureModel, WhyChooseUsModel } from '@/models/domain';

// Maps a CMS-set `iconIdentifier` fallback key to a bundled Lucide icon —
// used only when an editor hasn't uploaded an `icon` image. Figma node
// 617:7561's 4 seeded cards (Global Reach/Deep Expertise/Faster
// Decisions/Reliable Quality) map to these exact keys; any other/unknown
// identifier falls back to Sparkles rather than rendering nothing.
const ICON_MAP: Record<string, LucideIcon> = {
  global: Globe,
  'profile-2user': Users,
  timer: Clock,
  'shield-tick': ShieldCheck,
  award: Award,
  languages: Languages,
};

function FeatureIcon({ item }: { item: FeatureModel }) {
  if (item.icon) {
    return <StrapiImage image={item.icon} sizes="44px" className="size-11 object-contain" />;
  }
  const Icon = (item.iconIdentifier && ICON_MAP[item.iconIdentifier]) || Sparkles;
  return <Icon className="size-11 text-brand-600" strokeWidth={1.5} aria-hidden="true" />;
}

/**
 * blocks.why-choose-us — Figma node 617:7561 ("Why Businesses Choose
 * Unimrkt" / "Insights That Move Businesses Forward"). Cards match that
 * node's own white/rounded-[24px]/border-[#e0e0df]/shadow treatment
 * (the `blog` shadow token already carries the exact same
 * 6px_6px_54px_rgba(0,0,0,0.08) value used elsewhere in this codebase)
 * rather than the plain bordered box feature-grid's cards use — the two
 * blocks share an underlying component (blocks.feature-item) but not a
 * card style, so this View doesn't reuse FeatureGridView's markup.
 */
export function WhyChooseUsView({ block }: { block: WhyChooseUsModel; index: number }) {
  // The seeded instance runs on `accent` (node 617:7561's real section is
  // a full-bleed brand-gradient band, confirmed against an actual
  // screenshot, not just its layer metadata) — but the schema lets an
  // editor pick light/dark too, so the heading/eyebrow color follows
  // suit rather than assuming dark like CtaView/ServiceBandView do.
  // Heading hardcodes its own near-black `text-heading` regardless of
  // Section's theme, same fix CtaView/IndustryGridView apply; Prose has
  // no own color and already inherits Section's text-white correctly.
  const isDarkTheme = block.theme === 'dark' || block.theme === 'accent';

  return (
    <Section theme={block.theme} anchorId={block.anchorId}>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          {block.eyebrow && (
            <p
              className={`font-nav text-sm font-semibold uppercase tracking-[0.08em] ${isDarkTheme ? 'text-white' : 'text-brand-600'}`}
            >
              {block.eyebrow}
            </p>
          )}
          <Heading as="h2" size="h2" className={`mt-3 ${isDarkTheme ? 'text-white' : ''}`}>
            {block.heading}
          </Heading>
          {(block.subheading || block.description) && (
            <Prose className="mt-4">{block.subheading ?? block.description}</Prose>
          )}
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {block.items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.05}>
              <li className="flex h-full flex-col items-center gap-4 rounded-[24px] border border-[#e0e0df] bg-white p-8 text-center shadow-blog transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                <FeatureIcon item={item} />
                <Heading as="h3" size="h3" className="text-ink2">
                  {item.title}
                </Heading>
                <Prose className="text-sm opacity-70">{item.description}</Prose>
                {item.statValue && (
                  <p className="mt-auto pt-2 font-display text-3xl text-heading">
                    {item.statValue}
                    {item.statLabel && (
                      <span className="ml-2 align-middle text-xs font-sans font-semibold uppercase tracking-wide text-heading/60">
                        {item.statLabel}
                      </span>
                    )}
                  </p>
                )}
                {item.link && (
                  <a href={item.link.href} className="mt-auto text-brand-600 underline-offset-4 hover:underline">
                    {item.link.label}
                  </a>
                )}
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

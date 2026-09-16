import { HeroSection } from './HeroSection';
import { IntroSection } from './IntroSection';
import { TocSection } from './TocSection';
import { BodySection } from './BodySection';
import { resolvePrivacyPolicy } from './fallback';
import type { PrivacyPolicyPageSettings } from '@/models/privacyPolicyPage';

/**
 * /privacy-policy — Figma node 1114:50556 ("Privacy Policy", file
 * foaJFuv0vRX8nD43o0ylgB), the sole source of truth for this page.
 * Navbar/Footer/ChatWidget are global (app/layout.tsx). `resolvePrivacyPolicy()`
 * (./fallback.ts) is CMS-first, falling back per field to this node's own
 * verbatim copy.
 *
 * Renders every one of the node's own sections, top to bottom, and
 * nothing else: Hero (+breadcrumb) / preamble / "This Privacy Policy
 * Defines and Regulates:" table of contents (12 entries) / every clause
 * the node draws body copy for (What qualifies as Personal Data /
 * Lawful Collection and Use of Personal Data, with its purposes list,
 * legal-basis list, and 3 sub-sections). No footer lead-in or bottom CTA
 * is drawn on this node, so none is rendered.
 */
export function PrivacyPolicyView({ settings }: { settings: PrivacyPolicyPageSettings }) {
  const content = resolvePrivacyPolicy(settings);

  return (
    <>
      <HeroSection hero={content.hero} />
      <IntroSection introBody={content.introBody} />
      <TocSection toc={content.toc} />
      <BodySection content={content} />
    </>
  );
}

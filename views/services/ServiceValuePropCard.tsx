import { Trophy, Globe, Languages, Users, Box, ShieldCheck, Sparkles, type LucideIcon } from 'lucide-react';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { FeatureModel } from '@/models/domain';

// Figma node 561:3437-3519's 6 seeded cards map to these exact keys; any
// other/unknown identifier (or a future admin-added prop) falls back to
// Sparkles rather than rendering nothing.
const ICON_MAP: Record<string, LucideIcon> = {
  trophy: Trophy,
  global: Globe,
  languages: Languages,
  users: Users,
  box: Box,
  'shield-check': ShieldCheck,
};

/**
 * "Why Choose Unimrkt?" glass stat card — Figma node 561:3437 (and its 5
 * siblings): a maroon-tinted glass pill (`bg-[rgba(36,5,5,0.18)]`,
 * `border-[#ba4551]`, `backdrop-blur`) sitting over the section's dark
 * photo band, with a circular glass icon badge above bold stat text.
 * `statValue`/`statLabel` carry the two-line stat text; `icon`/
 * `iconIdentifier` are the same CMS-media-with-fallback pattern used
 * throughout this codebase (WhyChooseUsView, ProcessStepsView).
 */
export function ServiceValuePropCard({ prop }: { prop: FeatureModel }) {
  const Icon = (prop.iconIdentifier && ICON_MAP[prop.iconIdentifier]) || Sparkles;

  return (
    <div className="flex h-full flex-col items-center gap-4 rounded-[20px] border border-[#ba4551] bg-[rgba(36,5,5,0.18)] px-6 py-8 text-center backdrop-blur-[21px]">
      <div className="flex size-[70px] items-center justify-center rounded-full border border-[#ba4551]/60 bg-[rgba(36,5,5,0.18)] backdrop-blur-[21px]">
        {prop.icon ? (
          <StrapiImage image={prop.icon} sizes="24px" className="size-6 object-contain" />
        ) : (
          <Icon className="size-6 text-white" strokeWidth={1.5} aria-hidden="true" />
        )}
      </div>
      <div className="text-white">
        <p className="text-xl font-semibold">{prop.statValue}</p>
        <p className="mt-1 text-base opacity-80">{prop.statLabel}</p>
      </div>
    </div>
  );
}

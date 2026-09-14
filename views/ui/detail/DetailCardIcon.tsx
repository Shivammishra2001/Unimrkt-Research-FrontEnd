import {
  Users,
  Zap,
  BarChart3,
  ShieldCheck,
  Route,
  Factory,
  Bike,
  Cpu,
  Package,
  Car,
  Wrench,
  BatteryCharging,
  Building2,
  Clock,
  ClipboardCheck,
  FileText,
  Phone,
  IndianRupee,
  Award,
  Archive,
  UsersRound,
  Headphones,
  UserCog,
  Globe,
  UserCheck,
  Star,
  HeartPulse,
  Landmark,
  ShoppingBag,
  ShoppingCart,
  Radio,
  MoreHorizontal,
  Timer,
  Languages,
  FileSearch,
  Compass,
  Binary,
  Send,
  MessageCircle,
  Lightbulb,
  Share2,
  Scale,
  Eye,
  Brain,
  Handshake,
  Briefcase,
  Wallet,
  Pill,
  Bus,
  ListChecks,
  UtensilsCrossed,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { ImageModel } from '@/models/domain';

/** Maps a CMS-set `iconIdentifier` fallback key to a bundled Lucide icon
 * — used only when an editor hasn't uploaded an `icon` image. Same
 * convention as views/sections/WhyChooseUsView.tsx's ICON_MAP. Any
 * unknown identifier falls back to Sparkles rather than rendering
 * nothing. Shared by /industries/[slug] (384:6205), /services/[slug]
 * (474:5731), /our-company (617:7561), and /work-with-us (924:23216) —
 * keys are a superset of all four nodes' seeded identifiers. */
const ICON_MAP: Record<string, LucideIcon> = {
  // industries/[slug]
  'profile-2user': Users,
  flash: Zap,
  chart: BarChart3,
  'shield-tick': ShieldCheck,
  mobility: Route,
  factory: Factory,
  bike: Bike,
  cpu: Cpu,
  package: Package,
  car: Car,
  wrench: Wrench,
  'battery-charging': BatteryCharging,
  building: Building2,
  // services/[slug]
  clock: Clock,
  'clipboard-tick': ClipboardCheck,
  note: FileText,
  call: Phone,
  rupee: IndianRupee,
  'medal-star': Award,
  'archive-book': Archive,
  people: UsersRound,
  headphone: Headphones,
  'user-tag': UserCog,
  global: Globe,
  'security-user': UserCheck,
  star: Star,
  'heart-pulse': HeartPulse,
  landmark: Landmark,
  'shopping-bag': ShoppingBag,
  'shopping-cart': ShoppingCart,
  radio: Radio,
  more: MoreHorizontal,
  // our-company (Figma node 617:7561)
  timer: Timer,
  'language-circle': Languages,
  inspection: FileSearch,
  discovery: Compass,
  decode: Binary,
  timing: Send,
  chat: MessageCircle,
  idea: Lightbulb,
  teamwork: Users,
  network: Share2,
  ethics: Scale,
  transparency: Eye,
  intelligence: Brain,
  'cultural-diversity': Handshake,
  // work-with-us (Figma node 924:23216)
  briefcase: Briefcase,
  'wallet-add': Wallet,
  'pill-combination': Pill,
  transport: Bus,
  'task-square': ListChecks,
  dinner: UtensilsCrossed,
};

export interface DetailCardIconProps {
  icon?: ImageModel;
  iconIdentifier?: string;
  className?: string;
}

export function DetailCardIcon({ icon, iconIdentifier, className }: DetailCardIconProps) {
  if (icon) {
    return <StrapiImage image={icon} sizes="80px" className={className ?? 'size-16 object-contain'} />;
  }
  const Icon = (iconIdentifier && ICON_MAP[iconIdentifier]) || Sparkles;
  return <Icon className={className ?? 'size-16 text-brand-600'} strokeWidth={1.5} aria-hidden="true" />;
}

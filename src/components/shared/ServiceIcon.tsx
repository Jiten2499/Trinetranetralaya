import { Aperture, Baby, Droplets, Eye, Glasses, ScanEye, Shield, SunMedium, type LucideIcon } from "lucide-react";
import type { ServiceIconName } from "@/types/service";

const icons: Record<ServiceIconName, LucideIcon> = {
  exam: ScanEye,
  cataract: Eye,
  glaucoma: Aperture,
  retina: Eye,
  pediatric: Baby,
  lasik: SunMedium,
  cornea: Shield,
  "dry-eye": Droplets,
  optical: Glasses,
};

export function ServiceIcon({ name, className }: { name: ServiceIconName; className?: string }) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden="true" />;
}

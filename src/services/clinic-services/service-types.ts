import type { ClinicService } from "@/types/service";

export type { ClinicService } from "@/types/service";

export interface ClinicServiceProvider {
  getServices(): Promise<ClinicService[]>;
  getServiceBySlug(slug: string): Promise<ClinicService | null>;
}

import { apiFetch } from "@/services/api/api-client";
import type { ClinicServiceProvider } from "@/services/clinic-services/service-types";
import type { ClinicService } from "@/types/service";

/** Future ASP.NET Core provider. The API should return ClinicService objects. */
export const aspNetClinicServiceProvider: ClinicServiceProvider = {
  async getServices() {
    return apiFetch<ClinicService[]>("/api/services");
  },
  async getServiceBySlug(slug) {
    return apiFetch<ClinicService | null>(`/api/services/${encodeURIComponent(slug)}`);
  },
};

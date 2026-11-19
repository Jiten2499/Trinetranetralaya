import { services } from "@/data/services";
import type { ClinicServiceProvider } from "@/services/clinic-services/service-types";

export const localClinicServiceProvider: ClinicServiceProvider = {
  async getServices() {
    return services.filter((service) => service.isActive);
  },
  async getServiceBySlug(slug) {
    return services.find((service) => service.isActive && service.slug === slug) ?? null;
  },
};

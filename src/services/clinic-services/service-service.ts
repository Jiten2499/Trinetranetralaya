import { isAspNetProviderEnabled } from "@/services/api/api-client";
import { aspNetClinicServiceProvider } from "@/services/clinic-services/aspnet-service-provider";
import { localClinicServiceProvider } from "@/services/clinic-services/local-service-provider";
import type { ClinicServiceProvider } from "@/services/clinic-services/service-types";

function provider(): ClinicServiceProvider {
  return isAspNetProviderEnabled() ? aspNetClinicServiceProvider : localClinicServiceProvider;
}

export async function getServices() {
  return provider().getServices();
}

export async function getServiceBySlug(slug: string) {
  return provider().getServiceBySlug(slug);
}

export async function getFeaturedServices() {
  const services = await getServices();
  return services.filter((service) => service.featured);
}

export async function getServiceCategories() {
  const services = await getServices();
  return [...new Set(services.map((service) => service.category))];
}

export async function getRelatedServices(slugs: string[]) {
  const services = await getServices();
  return slugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));
}

import { facilities } from "@/data/facilities";
import { testimonials } from "@/data/testimonials";
import { siteConfig } from "@/config/site-config";

export async function getFacilities() {
  return facilities;
}

export async function getTestimonials() {
  if (!siteConfig.features.showSampleTestimonials) return [];
  return testimonials;
}

export async function getClinicProfile() {
  return {
    name: siteConfig.name,
    tagline: siteConfig.tagline,
    description: siteConfig.description,
    contact: siteConfig.contact,
    hours: siteConfig.hours,
    hoursConfirmed: siteConfig.hoursConfirmed,
  };
}

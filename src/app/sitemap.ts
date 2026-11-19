import type { MetadataRoute } from "next";
import { getDoctors } from "@/services/doctors/doctor-service";
import { getServices } from "@/services/clinic-services/service-service";
import { getPublishedArticles } from "@/services/blog/blog-repository";
import { getSiteUrl } from "@/lib/seo/metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getSiteUrl() ?? "http://localhost:3000";
  const staticPaths = [
    "",
    "/about",
    "/doctors",
    "/services",
    "/facilities",
    "/patient-guide",
    "/blog",
    "/faqs",
    "/contact",
    "/appointment",
    "/privacy-policy",
    "/terms-and-conditions",
    "/medical-disclaimer",
    "/accessibility",
  ];

  const [doctors, services, articles] = await Promise.all([getDoctors(), getServices(), getPublishedArticles({ perPage: 50 })]);
  const paths = [
    ...staticPaths,
    ...doctors.map((doctor) => `/doctors/${doctor.slug}`),
    ...services.map((service) => `/services/${service.slug}`),
    ...(articles.ok ? articles.posts.map((post) => `/blog/${post.slug}`) : []),
  ];

  return paths.map((path) => ({
    url: new URL(path || "/", origin).toString(),
    lastModified: "2026-11-19",
  }));
}

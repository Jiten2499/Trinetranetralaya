import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { getDoctorsBySlugs } from "@/services/doctors/doctor-service";
import { getRelatedServices, getServiceBySlug, getServices } from "@/services/clinic-services/service-service";
import { pageMetadata } from "@/lib/seo/metadata";

type ServicePageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.title,
    description: service.shortDescription,
    path: `/services/${service.slug}`,
    image: service.image,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();
  const [related, doctors] = await Promise.all([
    getRelatedServices(service.relatedSlugs),
    getDoctorsBySlugs(service.doctorSlugs),
  ]);

  return <ServiceDetail service={service} related={related} doctors={doctors} />;
}

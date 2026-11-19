import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/shared/Container";
import { CTASection } from "@/components/shared/CTASection";
import { FAQAccordion } from "@/components/ui/accordion";
import { ServiceDirectory } from "@/components/services/ServiceDirectory";
import { getFaqs } from "@/services/clinic/clinic-service";
import { getServiceCategories, getServices } from "@/services/clinic-services/service-service";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Eye Care Services",
  description: "Explore eye examinations, cataract, glaucoma, retina, children’s eye care, cornea, dry eye, and optical services at TriNetra Netralaya.",
  path: "/services",
});

export default async function ServicesPage() {
  const [services, categories, faqs] = await Promise.all([getServices(), getServiceCategories(), getFaqs()]);
  const featured = services.filter((service) => service.featured);

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Eye care services"
        description="Read what each visit is for, which symptoms deserve attention, and how the clinic approaches explanation and follow-up. Turn off any service the clinic does not provide."
        crumbs={[{ name: "Home", path: "/" }, { name: "Eye Care Services", path: "/services" }]}
      />
      <Container className="py-14">
        <h2 className="text-3xl">Featured services</h2>
        <ul className="mt-5 grid gap-4 md:grid-cols-2">
          {featured.map((service) => (
            <li key={service.id} className="rounded-2xl border border-border bg-background-secondary p-5">
              <h3 className="text-2xl">{service.title}</h3>
              <p className="mt-2 text-muted">{service.shortDescription}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <ServiceDirectory services={services} categories={categories} />
        </div>
        <div className="mt-14">
          <h2 className="text-3xl">Common questions</h2>
          <div className="mt-6">
            <FAQAccordion items={faqs.filter((item) => item.category === "Treatments" || item.category === "Eye Examinations").slice(0, 4)} />
          </div>
        </div>
      </Container>
      <CTASection />
    </>
  );
}

import Image from "next/image";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/shared/Container";
import { CTASection } from "@/components/shared/CTASection";
import { IllustrativeNote } from "@/components/shared/Notices";
import { getFacilities } from "@/services/clinic/content-service";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Facilities and Technology",
  description: "Examination rooms and eye-care equipment for TriNetra Netralaya to confirm before publication.",
  path: "/facilities",
});

export default async function FacilitiesPage() {
  const facilities = await getFacilities();

  return (
    <>
      <PageHero
        eyebrow="The clinic"
        title="Facilities and technology"
        description="Each item explains what the equipment is for. Nothing here is claimed as owned by the clinic until it is marked confirmed."
        crumbs={[{ name: "Home", path: "/" }, { name: "Facilities", path: "/facilities" }]}
      />
      <Container className="py-14">
        <IllustrativeNote />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {facilities.map((facility) => (
            <article key={facility.id} className="overflow-hidden rounded-2xl border border-border bg-surface">
              {facility.image ? (
                <div className="relative aspect-[16/10]">
                  <Image src={facility.image} alt={facility.imageAlt ?? ""} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
                </div>
              ) : (
                <div className="flex aspect-[16/10] items-center bg-background-secondary p-6 text-sm text-muted">
                  Photograph to be added by the clinic.
                </div>
              )}
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-action">
                  {facility.confirmed ? "Confirmed by the clinic" : "Pending confirmation"}
                </p>
                <h2 className="mt-2 text-2xl">{facility.title}</h2>
                <p className="mt-3 text-muted">{facility.description}</p>
                <p className="mt-3 text-sm"><strong className="font-semibold text-foreground">Purpose. </strong>{facility.purpose}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
      <CTASection />
    </>
  );
}

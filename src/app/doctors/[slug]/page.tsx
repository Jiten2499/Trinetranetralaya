import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { SampleBanner } from "@/components/shared/Notices";
import { CTASection } from "@/components/shared/CTASection";
import { Button } from "@/components/ui/button";
import { getDoctorBySlug, getDoctors } from "@/services/doctors/doctor-service";
import { pageMetadata, absoluteUrl } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/json-ld";

type DoctorPageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const doctors = await getDoctors();
  return doctors.map((doctor) => ({ slug: doctor.slug }));
}

export async function generateMetadata({ params }: DoctorPageProps) {
  const { slug } = await params;
  const doctor = await getDoctorBySlug(slug);
  if (!doctor) return {};
  return pageMetadata({
    title: doctor.isSample ? `${doctor.name} (sample profile)` : doctor.name,
    description: doctor.isSample
      ? "Sample doctor profile for layout demonstration. Not a verified clinician."
      : doctor.biography,
    path: `/doctors/${doctor.slug}`,
    image: doctor.image,
  });
}

export default async function DoctorProfilePage({ params }: DoctorPageProps) {
  const { slug } = await params;
  const doctor = await getDoctorBySlug(slug);
  if (!doctor) notFound();

  return (
    <>
      {doctor.isSample ? null : (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Physician",
            name: doctor.name,
            medicalSpecialty: doctor.specialization,
            url: absoluteUrl(`/doctors/${doctor.slug}`),
            ...(doctor.registration ? { identifier: doctor.registration } : {}),
          }}
        />
      )}
      <section className="border-b border-border bg-background-secondary">
        <Container className="py-12">
          <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Our Doctors", path: "/doctors" }, { name: doctor.name, path: `/doctors/${doctor.slug}` }]} />
        </Container>
      </section>
      <Container className="grid gap-10 py-12 lg:grid-cols-[18rem_1fr]">
        <div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-background-secondary">
            <Image src={doctor.image} alt={doctor.imageAlt} fill className="object-cover" priority sizes="(min-width: 1024px) 18rem, 100vw" />
          </div>
        </div>
        <div>
          {doctor.isSample ? <SampleBanner>This profile is not a real clinician. Do not book on the assumption that this person works at the clinic.</SampleBanner> : null}
          <h1 className="mt-4 text-4xl md:text-5xl">{doctor.name}</h1>
          <p className="mt-2 text-lg font-semibold text-action">{doctor.designation}</p>
          <p className="mt-2 text-muted">{doctor.specialization}</p>
          <dl className="mt-8 grid gap-5 sm:grid-cols-2">
            <Info title="Qualifications" text={doctor.qualifications.join(". ")} note="Not verified." />
            <Info title="Registration" text={doctor.registration ?? "Not published. Add a verified registration number or leave this blank."} />
            <Info title="Experience" text={doctor.experienceYears ? `${doctor.experienceYears} years` : "Years of experience are not shown until the clinic verifies them."} />
            <Info title="Languages" text={`${doctor.languages.join(", ")} — sample list, confirm with the clinic.`} />
            <Info title="Consultation schedule" text={doctor.schedule ?? "Clinic days will be published after the schedule is confirmed."} />
          </dl>
          <h2 className="mt-10 text-3xl">Biography</h2>
          <p className="mt-3 max-w-3xl text-muted">{doctor.biography}</p>
          <h2 className="mt-10 text-3xl">Areas of expertise</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {doctor.expertise.map((item) => (
              <li key={item} className="rounded-xl border border-border bg-surface px-4 py-3">{item}</li>
            ))}
          </ul>
          <Button href="/appointment" className="mt-8">Book an appointment</Button>
        </div>
      </Container>
      <CTASection />
    </>
  );
}

function Info({ title, text, note }: { title: string; text: string; note?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <dt className="text-sm font-semibold uppercase tracking-wide text-muted">{title}</dt>
      <dd className="mt-2">{text}</dd>
      {note ? <p className="mt-1 text-sm text-action">{note}</p> : null}
    </div>
  );
}

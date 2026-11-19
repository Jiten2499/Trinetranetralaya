import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { CTASection } from "@/components/shared/CTASection";
import { IllustrativeNote } from "@/components/shared/Notices";
import { FAQAccordion } from "@/components/ui/accordion";
import { ServiceImage } from "@/components/services/ServiceCard";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { JsonLd } from "@/lib/seo/json-ld";
import { absoluteUrl } from "@/lib/seo/metadata";
import type { ClinicService } from "@/types/service";
import type { Doctor } from "@/types/doctor";

export function ServiceDetail({ service, related, doctors }: { service: ClinicService; related: ClinicService[]; doctors: Doctor[] }) {
  const url = absoluteUrl(`/services/${service.slug}`);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: service.title,
          description: service.shortDescription,
          url,
        }}
      />
      <section className="border-b border-border bg-background-secondary">
        <Container className="grid items-center gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
          <div>
            <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Eye Care Services", path: "/services" }, { name: service.title, path: `/services/${service.slug}` }]} />
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-action">{service.category}</p>
            <h1 className="mt-3 text-4xl md:text-5xl">{service.title}</h1>
            <p className="mt-4 text-lg text-muted">{service.description}</p>
            <p className="mt-4 text-sm text-foreground">{service.availabilityNote}</p>
          </div>
          <ServiceImage service={service} priority />
        </Container>
      </section>
      <Container className="grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <article className="grid gap-10">
          <IllustrativeNote />
          <Section title="Introduction" body={service.overview} />
          <Section title="What is this about?" body={service.condition} />
          <ListSection title="Common symptoms" items={service.symptoms} />
          <ListSection title="Possible causes and risk factors" items={service.causes} />
          <ListSection title="How is it assessed?" items={service.diagnosis} />
          <div>
            <h2 className="text-3xl">Available approaches</h2>
            <div className="mt-4 grid gap-4">
              {service.treatments.map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-surface p-5">
                  <h3 className="text-xl">{item.title}</h3>
                  <p className="mt-2 text-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <ListSection title="When to consult an eye specialist" items={service.whenToConsult} />
          <div>
            <h2 className="text-3xl">Questions people ask</h2>
            <div className="mt-4">
              <FAQAccordion items={service.faqs.map((faq, index) => ({ id: `${service.slug}-${index}`, question: faq.question, answer: faq.answer }))} />
            </div>
          </div>
        </article>
        <aside className="h-fit rounded-2xl border border-border bg-surface p-5 lg:sticky lg:top-28">
          <h2 className="text-xl">Request a visit</h2>
          <p className="mt-2 text-sm text-muted">An enquiry is checked by the clinic. It does not confirm an appointment or a diagnosis.</p>
          <Link href="/appointment" className="mt-4 inline-flex h-11 items-center rounded-xl bg-action px-4 font-semibold text-primary-foreground">
            Book an appointment
          </Link>
        </aside>
      </Container>
      {doctors.length > 0 ? (
        <section className="bg-background-secondary py-14">
          <Container>
            <h2 className="text-3xl">Relevant sample profiles</h2>
            <p className="mt-2 max-w-2xl text-muted">These profiles are demonstration content linked to the topic. They are not a recommendation of a named clinician.</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
      {related.length > 0 ? (
        <section className="py-14">
          <Container>
            <h2 className="text-3xl">Related services</h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <li key={item.id} className="rounded-2xl border border-border bg-surface p-5">
                  <h3 className="text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.shortDescription}</p>
                  <Link href={`/services/${item.slug}`} className="mt-3 inline-flex font-semibold text-action">Learn more</Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
      <CTASection />
    </>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <section>
      <h2 className="text-3xl">{title}</h2>
      <p className="mt-3 text-muted">{body}</p>
    </section>
  );
}

function ListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h2 className="text-3xl">{title}</h2>
      <ul className="mt-4 grid gap-3">
        {items.map((item) => (
          <li key={item} className="rounded-xl border border-border bg-surface px-4 py-3">{item}</li>
        ))}
      </ul>
    </section>
  );
}

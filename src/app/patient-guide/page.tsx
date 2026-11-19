import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/shared/Container";
import { CTASection } from "@/components/shared/CTASection";
import { FAQAccordion } from "@/components/ui/accordion";
import { patientGuideSections } from "@/data/patient-guide";
import { getFaqs } from "@/services/clinic/clinic-service";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Patient Guide",
  description: "How to prepare for an eye examination at TriNetra Netralaya, what to bring, and what the website cannot decide for you.",
  path: "/patient-guide",
});

export default async function PatientGuidePage() {
  const faqs = await getFaqs();

  return (
    <>
      <PageHero
        eyebrow="Before you arrive"
        title="Patient guide"
        description="Practical information for a first visit, a child’s appointment, and the questions to ask. It is not a personal set of medical instructions."
        crumbs={[{ name: "Home", path: "/" }, { name: "Patient Guide", path: "/patient-guide" }]}
      />
      <Container className="py-14">
        <nav aria-label="On this page" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {patientGuideSections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="rounded-2xl border border-border bg-surface px-4 py-4 font-semibold hover:bg-background-secondary">
              {section.title}
            </a>
          ))}
        </nav>
        <div className="mt-12 grid gap-10">
          {patientGuideSections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="text-3xl">{section.title}</h2>
              <p className="mt-2 text-muted">{section.summary}</p>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-3 max-w-3xl text-muted">{paragraph}</p>
              ))}
              {section.points ? (
                <ul className="mt-4 grid gap-2">
                  {section.points.map((point) => (
                    <li key={point} className="rounded-xl border border-border bg-surface px-4 py-3">{point}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
        <div className="mt-14">
          <h2 className="text-3xl">Related questions</h2>
          <div className="mt-6">
            <FAQAccordion items={faqs.filter((item) => item.category === "Appointments").slice(0, 3)} />
          </div>
        </div>
      </Container>
      <CTASection />
    </>
  );
}

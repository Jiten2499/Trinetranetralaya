import { pageMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/shared/CTASection";
import { DraftNotice } from "@/components/shared/Notices";
import Image from "next/image";

export const metadata = pageMetadata({
  title: "About Us",
  description: "Learn how VisionCare Eye Clinic approaches examinations, explanations, and follow-up for patients and families.",
  path: "/about",
});

const values = [
  { title: "Clarity", text: "People should understand what was examined, what was found, and what happens next." },
  { title: "Respect", text: "Questions are welcome, including questions about whether a test or procedure is needed." },
  { title: "Carefulness", text: "A finding is explained in context. A single measurement is not treated as the whole story." },
  { title: "Access", text: "Enquiry routes stay simple: phone, email, WhatsApp, and a form that does not pretend to be a medical record." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the clinic"
        title="Eye care that leaves you better informed"
        description="VisionCare Eye Clinic is built around thorough examinations, plain-language explanations, and follow-up that patients can actually use."
        crumbs={[{ name: "Home", path: "/" }, { name: "About Us", path: "/about" }]}
      />
      <Container className="grid gap-12 py-14">
        <DraftNotice>Historical dates, founder names, and registration details are intentionally absent. Add only what the clinic can verify.</DraftNotice>
        <section className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">The clinic</h2>
            <p className="mt-4 text-muted">
              At VisionCare Eye Clinic, good vision is treated as part of ordinary life: reading a schoolbook, driving at dusk, recognising a grandchild, or working through a long day at a screen. The clinic’s work is to examine the eyes carefully and to explain the result without rushing the person who has to live with it.
            </p>
            <p className="mt-4 text-muted">
              This website introduces the services, the way a visit unfolds, and the questions worth asking. It does not replace the examination, and it does not publish claims the clinic has not confirmed.
            </p>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem]">
            <Image src="/images/pediatric-exam.jpg" alt="Illustrative photograph of a child undergoing a slit-lamp examination." fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        </section>
        <section>
          <h2 className="text-3xl">History</h2>
          <p className="mt-4 max-w-3xl text-muted">
            The clinic’s founding year, original location, and milestones should be written here by the people who were part of them. Until that text is supplied, this section stays a placeholder rather than an invented timeline.
          </p>
        </section>
        <section className="grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-2xl">Vision</h2>
            <p className="mt-3 text-muted">A community where people can have their eyes examined, understand the findings, and receive timely guidance — including a referral when another service is the safer choice.</p>
          </article>
          <article className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-2xl">Mission</h2>
            <p className="mt-3 text-muted">To provide accessible eye examinations, honest explanations, and coordinated follow-up for children and adults, using only the services and equipment the clinic can stand behind.</p>
          </article>
        </section>
        <section>
          <h2 className="text-3xl">Values</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {values.map((value) => (
              <article key={value.title} className="rounded-2xl bg-background-secondary p-5">
                <h3 className="text-xl">{value.title}</h3>
                <p className="mt-2 text-muted">{value.text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">How a visit is approached</h2>
            <p className="mt-4 text-muted">The clinician begins with the reason you came, then chooses tests that answer that question. Results are explained in everyday language. If a finding needs another specialist, that is said plainly.</p>
            <p className="mt-4 text-muted">Families are included when a child is the patient. Adults are invited to bring a companion if they want help remembering the plan.</p>
          </div>
          <div>
            <h2 className="text-3xl">Infrastructure</h2>
            <p className="mt-4 text-muted">Examination rooms, a slit lamp, and optical advice are the core of an eye clinic. Scanners, a visual field machine, and an operating theatre are listed on the facilities page only as items to confirm. Nothing on this website should be read as an inventory of equipment the clinic already owns.</p>
          </div>
        </section>
        <section>
          <h2 className="text-3xl">The medical team</h2>
          <p className="mt-4 max-w-3xl text-muted">Doctor profiles currently on the site are labelled samples. When the clinic adds real clinicians, each profile should include the name they practise under, verified qualifications, and a registration number only if it has been checked.</p>
        </section>
        <section>
          <h2 className="text-3xl">Why patients make an enquiry</h2>
          <p className="mt-4 max-w-3xl text-muted">People come for a first pair of glasses, a diabetic retinal check, a child’s turned eye, or a gradual blur that glasses no longer fix. The common thread is wanting a person, not a webpage, to look at the eye and explain it.</p>
        </section>
      </Container>
      <CTASection />
    </>
  );
}

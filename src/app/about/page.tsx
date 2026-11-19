import { pageMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/shared/CTASection";
import { DraftNotice } from "@/components/shared/Notices";
import { Button } from "@/components/ui/button";
import { ClinicGallery } from "@/components/shared/ClinicGallery";
import { clinicPhotos } from "@/data/clinic-gallery";
import Image from "next/image";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "TriNetra Netralaya Aakhaa Upachaar Kendra in Tulsipur 5, Dang, inaugurated on 14th Jestha 2079 BS, and its first branch in Ghorahi.",
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
        title="TriNetra Netralaya Aakhaa Upachaar Kendra"
        description="An eye-care centre in Tulsipur 5, Dang, with a first branch in Ghorahi."
        crumbs={[{ name: "Home", path: "/" }, { name: "About Us", path: "/about" }]}
      />
      <Container className="grid gap-12 py-14">
        <DraftNotice>Founder names and registration numbers are not published until the clinic supplies them.</DraftNotice>
        <section className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">The clinic</h2>
            <p className="mt-4 text-muted">
              TriNetra Netralaya Aakhaa Upachaar Kendra is in Tulsipur 5, Dang. The centre was inaugurated on 14th Jestha 2079 BS. Its work is to examine the eyes carefully and to explain the result without rushing the person who has to live with it.
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
          <h2 className="text-3xl">About</h2>
          <dl className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <dt className="text-sm font-semibold uppercase tracking-wide text-muted">Centre</dt>
              <dd className="mt-2 text-2xl">TriNetra Netralaya Aakhaa Upachaar Kendra</dd>
              <dd className="mt-2 text-muted">Tulsipur 5, Dang</dd>
              <dd className="mt-4 text-muted">Inaugurated on 14th Jestha 2079 BS</dd>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-6">
              <dt className="text-sm font-semibold uppercase tracking-wide text-muted">First branch</dt>
              <dd className="mt-2 text-2xl">Ghorahi</dd>
              <dd className="mt-2 text-muted">Ghorahi 15, Sadaka Bhibhag Road, Dang</dd>
              <dd className="mt-4 text-muted">Inaugurated on 3rd Shrawan 2083 BS</dd>
            </div>
          </dl>
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
          <p className="mt-4 max-w-3xl text-muted">
            Nikita KC is the clinic’s Consultant Pediatric Optometrist and Neuro Vision Therapist. Her qualifications are a Bachelor in Optometry from Rajiv Gandhi University of Health Sciences, Karnataka, India; Sankara College of Optometry, Bangalore; a Masters in Optometry from CTU, Punjab, India; Sankara College of Optometry, Ludhiana, India; and FASCO in Neuro Vision Therapy, India. The Tulsipur telephone is 9768862742, WhatsApp is 9868984602, and email is netralayatrinetra14@gmail.com. Other doctor cards remain labelled as samples until the clinic replaces them. A registration number is shown only after the clinic supplies one.
          </p>
          <Button href="/doctors/nikita-kc" className="mt-6">View Nikita KC’s profile</Button>
        </section>
        <ClinicGallery
          id="clinic-photographs"
          photos={clinicPhotos}
          title="Photographs from the clinic"
          description="These pictures were supplied by the clinic, including before-and-after photographs labeled neuro vision therapy or vision therapy. They show individual visits. They are not a promise that another person will have the same result, and the people in them are not named."
        />
        <section>
          <h2 className="text-3xl">Why patients make an enquiry</h2>
          <p className="mt-4 max-w-3xl text-muted">People come for a first pair of glasses, a diabetic retinal check, a child’s turned eye, or a gradual blur that glasses no longer fix. The common thread is wanting a person, not a webpage, to look at the eye and explain it.</p>
        </section>
      </Container>
      <CTASection />
    </>
  );
}

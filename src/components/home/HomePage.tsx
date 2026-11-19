import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { CalendarCheck, MessagesSquare, Stethoscope, UserRound } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTASection } from "@/components/shared/CTASection";
import { IllustrativeNote, SampleBanner } from "@/components/shared/Notices";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/services/ServiceCard";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { ArticleCard, BlogStatus } from "@/components/blog/ArticleCard";
import { FAQAccordion } from "@/components/ui/accordion";
import { ContactDetails, HoursCard } from "@/components/shared/ContactDetails";
import { getServices } from "@/services/clinic-services/service-service";
import { getDoctors } from "@/services/doctors/doctor-service";
import { getFacilities, getTestimonials } from "@/services/clinic/content-service";
import { ClinicGallery } from "@/components/shared/ClinicGallery";
import { clinicPhotos } from "@/data/clinic-gallery";
import { getFaqs } from "@/services/clinic/clinic-service";
import { getPublishedArticles } from "@/services/blog/blog-repository";

const trust = [
  { title: "Experienced eye specialists", text: "Profiles will show verified qualifications once the clinic adds them." },
  { title: "Modern diagnostic technology", text: "Equipment is listed for the clinic to confirm before any device is claimed as available." },
  { title: "Personalised patient care", text: "Visits are planned around the question you came with, with time to explain the findings." },
  { title: "Comprehensive eye services", text: "Examinations, condition reviews, children’s care, and optical advice can be explored from one place." },
];

const reasons = [
  { title: "Patient-focused visits", text: "The examination starts with your symptoms and the tasks that matter to you, then moves to the tests that answer that question." },
  { title: "A clear look at the eye", text: "Slit-lamp examination and, where confirmed, imaging help explain what is happening rather than leaving you with a number." },
  { title: "Guidance you can follow", text: "You should leave knowing whether the next step is glasses, monitoring, treatment, or a referral." },
  { title: "Straightforward enquiries", text: "Appointment requests go to the clinic for confirmation. The website does not pretend a slot is booked." },
  { title: "Plain-language communication", text: "Findings are explained without asking you to interpret a report on your own." },
];

const journey = [
  { icon: MessagesSquare, title: "Contact the clinic", text: "Call, email, or send a WhatsApp enquiry with the service you need." },
  { icon: CalendarCheck, title: "Schedule your visit", text: "The team confirms a date after checking who is available." },
  { icon: Stethoscope, title: "Meet the eye specialist", text: "Bring your glasses, medicines, and previous reports." },
  { icon: UserRound, title: "Receive guidance", text: "Leave with an explanation, a plan for follow-up, and written advice when a procedure is involved." },
];

export async function HomePage() {
  const [services, doctors, facilities, testimonials, faqs] = await Promise.all([
    getServices(),
    getDoctors(),
    getFacilities(),
    getTestimonials(),
    getFaqs(),
  ]);
  const homeFaqs = faqs.slice(0, 5);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute right-0 top-8 hidden h-72 w-72 rounded-full bg-secondary/40 lg:block" aria-hidden="true" />
        <Container className="grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-action">Eye care</p>
            <h1 className="mt-4 max-w-xl text-5xl leading-[1.05] md:text-6xl">Better Vision. Brighter Everyday.</h1>
            <p className="mt-5 max-w-xl text-lg text-muted">
              Comprehensive eye care, modern diagnostic technology, and compassionate treatment to help you and your family enjoy healthier vision.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/appointment" size="lg">Book Appointment</Button>
              <Button href="/services" variant="outline" size="lg">Explore Our Services</Button>
            </div>
            <ul className="mt-8 grid gap-3 text-sm sm:grid-cols-3">
              <li className="rounded-xl border border-border bg-surface px-3 py-3">Examinations for all ages</li>
              <li className="rounded-xl border border-border bg-surface px-3 py-3">Explanations in plain language</li>
              <li className="rounded-xl border border-border bg-surface px-3 py-3">Enquiries confirmed by the clinic</li>
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -left-4 top-8 hidden h-[88%] w-[88%] rounded-[2rem] bg-secondary/50 lg:block" aria-hidden="true" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border bg-background-secondary shadow-[var(--shadow)]">
              <Image
                src="/images/hero-exam.jpg"
                alt="Illustrative photograph of a clinician examining a patient’s eyes with a slit lamp."
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
            </div>
            <div className="absolute -left-2 bottom-6 max-w-xs rounded-2xl border border-border bg-surface p-4 shadow-[var(--shadow)] sm:left-[-1.5rem]">
              <p className="font-semibold">Care for children and adults</p>
              <p className="mt-1 text-sm text-muted">From a first childhood check to later-life changes in vision.</p>
            </div>
          </div>
        </Container>
      </section>

      <Container className="pb-6">
        <IllustrativeNote />
        <ul className="mt-6 grid overflow-hidden rounded-2xl border border-border bg-border shadow-[var(--shadow)] sm:grid-cols-2 lg:grid-cols-4 lg:gap-px">
          {trust.map((item) => (
            <li key={item.title} className="bg-surface p-5">
              <h2 className="text-xl">{item.title}</h2>
              <p className="mt-2 text-sm text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </Container>

      <section className="py-16 md:py-20">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Services"
              title="Eye care, explained clearly"
              description="Each service page describes the condition, how it is assessed, and when to seek care. The clinic should switch off any service it does not provide."
            />
            <Button href="/services" variant="outline">View all services</Button>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-background-secondary py-16 md:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem]">
            <Image src="/images/clinician-notes.jpg" alt="Illustrative photograph of a clinician beside diagnostic eye equipment." fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div>
            <SectionHeading
              eyebrow="The clinic"
              title="A calm place to understand your eyes"
              description="TriNetra Netralaya is being prepared as a patient-facing site for examinations, explanations, and follow-up. The history, address, and team credentials on these pages are ready for the clinic to replace with verified details."
            />
            <p className="mt-4 text-muted">
              Good vision supports school, work, driving, and the ordinary pleasure of recognising a face across a room. The clinic’s role is to examine carefully, say what was found, and agree a next step you can actually follow.
            </p>
            <Button href="/about" className="mt-6">Learn more</Button>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="Specialists"
            title={doctors.some((doctor) => !doctor.isSample) ? "Our consultant" : "Meet the sample profiles"}
            description={
              doctors.some((doctor) => !doctor.isSample)
                ? "Nikita KC is the clinic’s Consultant Pediatric Optometrist and Neuro Vision Therapist. Cards marked Sample profile are not members of the team."
                : "These cards show the layout only. They are not verified clinicians and must be replaced before launch."
            }
          />
          {doctors.some((doctor) => doctor.isSample) ? (
            <div className="mt-6">
              <SampleBanner>Cards marked Sample profile use placeholder names and portraits.</SampleBanner>
            </div>
          ) : null}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-16 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Why patients enquire" title="What the visit is designed to feel like" />
          <ol className="divide-y divide-border border-y border-border">
            {reasons.map((reason, index) => (
              <li key={reason.title} className="grid gap-3 py-5 sm:grid-cols-[4rem_1fr]">
                <span className="font-display text-3xl text-primary">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-2xl">{reason.title}</h3>
                  <p className="mt-1 text-muted">{reason.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <SectionHeading eyebrow="Facilities" title="Rooms and equipment to confirm" description="Only items the clinic verifies should remain. Photographs are illustrative." />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {facilities.filter((item) => item.image).slice(0, 3).map((item) => (
              <article key={item.id} className="overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="relative aspect-[4/3]">
                  <Image src={item.image ?? ""} alt={item.imageAlt ?? ""} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-action">Pending confirmation</p>
                  <h3 className="mt-2 text-2xl">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.purpose}</p>
                </div>
              </article>
            ))}
          </div>
          <Button href="/facilities" variant="outline" className="mt-6">View facilities</Button>
        </Container>
      </section>

      <section className="bg-background-secondary py-16 md:py-20">
        <Container>
          <SectionHeading eyebrow="Your visit" title="A simple path from enquiry to follow-up" align="center" />
          <ol className="mt-10 grid gap-5 md:grid-cols-4">
            {journey.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-border bg-surface p-5">
                <step.icon className="size-6 text-action" aria-hidden="true" />
                <p className="mt-4 text-sm font-semibold text-muted">Step {index + 1}</p>
                <h3 className="mt-1 text-xl">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <ClinicGallery
            photos={clinicPhotos}
            title="Photographs from the clinic"
            description="Before-and-after pictures and visits at the clinic. These are individual photographs supplied by the clinic, not a promised result."
          />
          <Button href="/about#clinic-photographs" variant="outline" className="mt-8">See them on the about page</Button>
        </Container>
      </section>

      {testimonials.length > 0 ? (
        <section className="py-16 md:py-20">
          <Container>
            <SectionHeading eyebrow="Stories" title="Sample testimonials" description="These quotations are not patient reviews. Remove them, or replace them with feedback the clinic has permission to publish." />
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {testimonials.map((item) => (
                <figure key={item.id} className="rounded-2xl border border-border bg-surface p-6">
                  <figcaption className="text-xs font-semibold uppercase tracking-wide text-action">Sample — not a verified review</figcaption>
                  <blockquote className="mt-3 text-lg">{item.quote}</blockquote>
                  <p className="mt-4 text-sm font-semibold">{item.name}</p>
                  <p className="text-sm text-muted">{item.context}</p>
                </figure>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <Suspense fallback={<div className="px-4 py-16 text-center text-muted">Loading articles…</div>}>
        <BlogPreview />
      </Suspense>

      <section className="bg-background-secondary py-16 md:py-20">
        <Container className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <SectionHeading eyebrow="Questions" title="Before you visit" />
            <Button href="/faqs" variant="outline" className="mt-6">All FAQs</Button>
          </div>
          <FAQAccordion items={homeFaqs} />
        </Container>
      </section>

      <CTASection />

      <section className="py-16 md:py-20">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-3xl">Visit the clinic</h2>
            <p className="mt-3 text-muted">The Tulsipur telephone, WhatsApp number, and email are listed here. Opening hours are still to be confirmed.</p>
            <div className="mt-6">
              <ContactDetails />
            </div>
          </div>
          <HoursCard />
        </Container>
      </section>
    </>
  );
}

async function BlogPreview() {
  const result = await getPublishedArticles({ page: 1, perPage: 3 });
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Journal" title="Eye health articles" description="Published from WordPress so the clinic can add articles without changing the website." />
          <Link href="/blog" className="font-semibold text-action">View all articles</Link>
        </div>
        <div className="mt-8">
          {result.ok ? (
            result.posts.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-3">
                {result.posts.map((post) => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <p className="text-muted">No published articles were returned.</p>
            )
          ) : (
            <BlogStatus error={result.error} />
          )}
        </div>
      </Container>
    </section>
  );
}

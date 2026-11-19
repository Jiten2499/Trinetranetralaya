import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/shared/Container";
import { AppointmentForm } from "@/components/appointment/AppointmentForm";
import { getDoctors } from "@/services/doctors/doctor-service";
import { getServices } from "@/services/clinic-services/service-service";
import { isHttpsUrl } from "@/lib/utils";
import { isWhatsAppConfigured } from "@/lib/contact-links";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Book an Appointment",
  description: "Send an appointment enquiry to VisionCare Eye Clinic. The clinic confirms availability. The website does not reserve a time.",
  path: "/appointment",
});

export default async function AppointmentPage() {
  const [services, doctors] = await Promise.all([getServices(), getDoctors()]);
  const schedulingUrl = process.env.SCHEDULING_EMBED_URL?.trim() ?? "";
  const showScheduler = isHttpsUrl(schedulingUrl);

  return (
    <>
      <PageHero
        eyebrow="Appointments"
        title="Request an appointment"
        description="Tell the clinic which service you need and when you would like to come. A team member confirms the time. Submitting this form does not book the slot."
        crumbs={[{ name: "Home", path: "/" }, { name: "Book an Appointment", path: "/appointment" }]}
      />
      <Container className="grid gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <AppointmentForm
            whatsappReady={isWhatsAppConfigured()}
            services={services.map((service) => ({ id: service.slug, label: service.title }))}
            doctors={doctors.map((doctor) => ({
              id: doctor.slug,
              label: doctor.isSample ? `${doctor.name} (sample profile)` : doctor.name,
            }))}
          />
        </div>
        <aside className="h-fit rounded-2xl bg-background-secondary p-6">
          <h2 className="text-2xl">What happens next</h2>
          <ol className="mt-4 grid gap-3 text-sm text-muted">
            <li>1. Your enquiry is prepared for the clinic.</li>
            <li>2. Until a booking API is connected, WhatsApp opens so you can send it yourself.</li>
            <li>3. The clinic replies to confirm or suggest another time.</li>
          </ol>
        </aside>
      </Container>
      {showScheduler ? (
        <Container className="pb-14">
          <h2 className="text-3xl">Online scheduling</h2>
          <p className="mt-2 text-muted">A scheduling page has been configured. Use it only if the clinic has told you this calendar is live.</p>
          <iframe title="Clinic scheduling calendar" src={schedulingUrl} className="mt-6 h-[40rem] w-full rounded-2xl border border-border" />
        </Container>
      ) : null}
    </>
  );
}

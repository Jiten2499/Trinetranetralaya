import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/shared/Container";
import { SampleBanner } from "@/components/shared/Notices";
import { CTASection } from "@/components/shared/CTASection";
import { DoctorDirectory } from "@/components/doctors/DoctorDirectory";
import { getDoctorSpecialties, getDoctors } from "@/services/doctors/doctor-service";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Our Doctors",
  description: "Sample ophthalmology profiles showing how VisionCare will present verified clinicians, qualifications, and areas of care.",
  path: "/doctors",
});

export default async function DoctorsPage() {
  const doctors = await getDoctors();
  const specialties = getDoctorSpecialties(doctors);

  return (
    <>
      <PageHero
        eyebrow="Clinical team"
        title="Our doctors"
        description="These profiles demonstrate the layout. Every card is marked as a sample until the clinic replaces it with a verified clinician."
        crumbs={[{ name: "Home", path: "/" }, { name: "Our Doctors", path: "/doctors" }]}
      />
      <Container className="py-14">
        <SampleBanner>Names, portraits, and qualifications are fictional placeholders. Registration numbers and years of experience are omitted because they have not been verified.</SampleBanner>
        <div className="mt-8">
          <DoctorDirectory doctors={doctors} specialties={specialties} />
        </div>
      </Container>
      <CTASection title="Request a consultation" description="Choose a service and, if you wish, a preferred sample profile. The clinic confirms the actual clinician and time." />
    </>
  );
}

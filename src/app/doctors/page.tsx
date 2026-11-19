import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/shared/Container";
import { SampleBanner } from "@/components/shared/Notices";
import { CTASection } from "@/components/shared/CTASection";
import { DoctorDirectory } from "@/components/doctors/DoctorDirectory";
import { getDoctorSpecialties, getDoctors } from "@/services/doctors/doctor-service";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Our Doctors",
  description: "Nikita KC, Consultant Pediatric Optometrist and Neuro Vision Therapist, with the qualification supplied by the clinic. Other cards are sample profiles.",
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
        description="Nikita KC is the clinic’s consultant. Cards marked Sample profile are layout placeholders, not members of the team."
        crumbs={[{ name: "Home", path: "/" }, { name: "Our Doctors", path: "/doctors" }]}
      />
      <Container className="py-14">
        <SampleBanner>Cards marked Sample profile use placeholder names and portraits. They are not clinicians at the clinic.</SampleBanner>
        <div className="mt-8">
          <DoctorDirectory doctors={doctors} specialties={specialties} />
        </div>
      </Container>
      <CTASection title="Request a consultation" description="You can ask for a consultation with Nikita KC. The clinic confirms the time." />
    </>
  );
}

import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/shared/Container";
import { ContactDetails, HoursCard } from "@/components/shared/ContactDetails";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapPanel } from "@/components/shared/MapPanel";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { getSocialLinks } from "@/lib/contact-links";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: "Call, email, or message VisionCare Eye Clinic. The contact form sends a message only when a delivery service is configured.",
  path: "/contact",
});

export default function ContactPage() {
  const socials = getSocialLinks();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We're Here to Help You See Better."
        description="Ask about an appointment, a report, or how to reach the clinic. For sudden vision loss, injury, or severe eye pain, go to emergency care rather than waiting on this form."
        crumbs={[{ name: "Home", path: "/" }, { name: "Contact Us", path: "/contact" }]}
      />
      <Container className="grid gap-10 py-14 lg:grid-cols-2">
        <ContactDetails />
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-2xl">Send a message</h2>
          <div className="mt-5">
            <ContactForm />
          </div>
        </div>
      </Container>
      <Container className="pb-14">
        <MapPanel />
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <HoursCard />
          <section className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-2xl">Social media</h2>
            {socials.length > 0 ? (
              <div className="mt-4">
                <SocialLinks tone="dark" />
              </div>
            ) : (
              <p className="mt-3 text-muted">Social profiles will appear here after their addresses are added in the site configuration.</p>
            )}
          </section>
        </div>
      </Container>
    </>
  );
}

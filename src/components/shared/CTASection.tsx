import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";

export function CTASection({
  title = "Your Vision Deserves the Best Care.",
  description = "Request a visit and the clinic team will contact you to confirm a time. An enquiry is not a confirmed appointment.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-footer text-footer-foreground">
      <Container className="grid gap-8 py-16 md:grid-cols-[1.4fr_auto] md:items-center md:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-secondary">Appointments</p>
          <h2 className="mt-3 text-3xl text-footer-foreground md:text-4xl">{title}</h2>
          <p className="mt-4 max-w-xl text-footer-muted">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/appointment" size="lg">
            Book an Appointment
          </Button>
          <Button href="/contact" variant="inverse" size="lg">
            Contact Us
          </Button>
        </div>
      </Container>
    </section>
  );
}

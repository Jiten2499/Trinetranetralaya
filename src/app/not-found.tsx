import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-action">404</p>
      <h1 className="mt-3 max-w-xl text-4xl md:text-5xl">This page is not on the clinic website.</h1>
      <p className="mt-4 max-w-xl text-lg text-muted">The address may have changed, or the page may never have existed. You can return home or look through the eye care services.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/">Back to homepage</Button>
        <Button href="/services" variant="outline">Explore services</Button>
      </div>
      <p className="mt-6 text-sm">
        Or go to the <Link href="/contact" className="font-semibold text-action">contact page</Link>.
      </p>
    </Container>
  );
}

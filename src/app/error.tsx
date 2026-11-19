"use client";

import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="py-24">
      <h1 className="text-4xl">Something went wrong</h1>
      <p className="mt-4 max-w-xl text-muted">Please try the page again. If you need the clinic now, use the phone, email, or WhatsApp details on the contact page rather than this error screen.</p>
      <div className="mt-8 flex gap-3">
        <Button type="button" onClick={() => reset()}>Try again</Button>
        <Button href="/contact" variant="outline">Contact the clinic</Button>
      </div>
    </Container>
  );
}

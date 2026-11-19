"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormValues } from "@/services/contact/contact-schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Status = "idle" | "submitting" | "success" | "not_configured" | "failed" | "invalid";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { fullName: "", phone: "", email: "", subject: "", message: "", consent: false },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as { ok?: boolean; code?: string };
      if (data.ok) {
        setStatus("success");
        form.reset();
        return;
      }
      if (data.code === "not_configured") setStatus("not_configured");
      else if (data.code === "invalid") setStatus("invalid");
      else setStatus("failed");
    } catch {
      setStatus("failed");
    }
  }

  const errors = form.formState.errors;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="grid gap-5" aria-describedby="contact-form-note">
      <p id="contact-form-note" className="text-sm text-muted">
        Please do not include diagnoses, eye photographs, or detailed medical history. For urgent symptoms, use emergency care.
      </p>
      <Field label="Full name" error={errors.fullName?.message} id="fullName">
        <Input id="fullName" autoComplete="name" aria-invalid={Boolean(errors.fullName)} {...form.register("fullName")} />
      </Field>
      <Field label="Phone number" error={errors.phone?.message} id="phone">
        <Input id="phone" type="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} {...form.register("phone")} />
      </Field>
      <Field label="Email (optional)" error={errors.email?.message} id="email">
        <Input id="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} {...form.register("email")} />
      </Field>
      <Field label="Subject" error={errors.subject?.message} id="subject">
        <Input id="subject" aria-invalid={Boolean(errors.subject)} {...form.register("subject")} />
      </Field>
      <Field label="Message" error={errors.message?.message} id="message">
        <Textarea id="message" aria-invalid={Boolean(errors.message)} {...form.register("message")} />
      </Field>
      <div>
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" className="mt-1 size-5 accent-action" {...form.register("consent")} />
          <span>
            I agree that this enquiry may be used to reply to me, as described in the <Link href="/privacy-policy" className="font-semibold text-action">privacy policy</Link>.
          </span>
        </label>
        {errors.consent ? <p className="mt-2 text-sm text-danger" role="alert">{errors.consent.message}</p> : null}
      </div>
      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
      <div aria-live="polite" className="text-sm">
        {status === "success" ? <p className="text-success">Your message has been sent. The clinic will reply using the details you provided.</p> : null}
        {status === "not_configured" ? (
          <p>This form is not connected to a delivery service yet. Please call, email, or use WhatsApp. Nothing was submitted.</p>
        ) : null}
        {status === "failed" ? <p className="text-danger" role="alert">The message could not be delivered. Please use phone, email, or WhatsApp instead.</p> : null}
        {status === "invalid" ? <p className="text-danger" role="alert">Please check the highlighted fields.</p> : null}
      </div>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="mt-2">{children}</div>
      {error ? <p id={`${id}-error`} className="mt-1 text-sm text-danger" role="alert">{error}</p> : null}
    </div>
  );
}

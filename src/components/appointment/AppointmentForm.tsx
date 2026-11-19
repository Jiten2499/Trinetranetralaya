"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { appointmentSchema, type AppointmentFormValues } from "@/services/appointments/appointment-schema";
import { submitAppointmentEnquiry } from "@/services/appointments/appointment-actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Option {
  id: string;
  label: string;
}

export function AppointmentForm({
  services,
  doctors,
  whatsappReady,
}: {
  services: Option[];
  doctors: Option[];
  whatsappReady: boolean;
}) {
  const [feedback, setFeedback] = useState("");
  const [link, setLink] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      serviceId: "",
      doctorId: "",
      patientName: "",
      phone: "",
      preferredDate: "",
      preferredTime: "",
      patientType: "new",
      message: "",
    },
  });

  async function onSubmit(values: AppointmentFormValues) {
    setPending(true);
    setLink(null);
    const result = await submitAppointmentEnquiry({ ...values, doctorId: values.doctorId || undefined, message: values.message || undefined });
    setPending(false);
    setFeedback(result.message);
    if (result.mode === "whatsapp") {
      setLink(result.url);
      window.open(result.url, "_blank", "noopener,noreferrer");
    }
  }

  const errors = form.formState.errors;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="grid gap-5">
      <p className="rounded-2xl bg-background-secondary px-4 py-3 text-sm">
        Your appointment request will be shared with our clinic team. The clinic will contact you to confirm availability.
      </p>
      {!whatsappReady ? (
        <p className="text-sm">WhatsApp is not configured yet. You can review the form, but the enquiry cannot be sent until a clinic number is added. Phone and email remain on the contact page.</p>
      ) : null}
      <div>
        <Label htmlFor="serviceId">Eye care service</Label>
        <select id="serviceId" className="mt-2 h-12 w-full rounded-xl border border-border bg-surface px-4" {...form.register("serviceId")}>
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>{service.label}</option>
          ))}
        </select>
        {errors.serviceId ? <p className="mt-1 text-sm text-danger" role="alert">{errors.serviceId.message}</p> : null}
      </div>
      <div>
        <Label htmlFor="doctorId">Preferred doctor (optional)</Label>
        <select id="doctorId" className="mt-2 h-12 w-full rounded-xl border border-border bg-surface px-4" {...form.register("doctorId")}>
          <option value="">No preference</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>{doctor.label}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="patientName">Patient name</Label>
          <Input id="patientName" className="mt-2" autoComplete="name" {...form.register("patientName")} />
          {errors.patientName ? <p className="mt-1 text-sm text-danger" role="alert">{errors.patientName.message}</p> : null}
        </div>
        <div>
          <Label htmlFor="appointment-phone">Mobile number</Label>
          <Input id="appointment-phone" className="mt-2" type="tel" autoComplete="tel" {...form.register("phone")} />
          {errors.phone ? <p className="mt-1 text-sm text-danger" role="alert">{errors.phone.message}</p> : null}
        </div>
        <div>
          <Label htmlFor="preferredDate">Preferred date</Label>
          <Input id="preferredDate" className="mt-2" type="date" {...form.register("preferredDate")} />
          {errors.preferredDate ? <p className="mt-1 text-sm text-danger" role="alert">{errors.preferredDate.message}</p> : null}
        </div>
        <div>
          <Label htmlFor="preferredTime">Preferred time</Label>
          <select id="preferredTime" className="mt-2 h-12 w-full rounded-xl border border-border bg-surface px-4" {...form.register("preferredTime")}>
            <option value="">Select a time</option>
            <option value="Morning (9:00–12:00)">Morning (9:00–12:00)</option>
            <option value="Afternoon (12:00–15:00)">Afternoon (12:00–15:00)</option>
            <option value="Late afternoon (15:00–17:00)">Late afternoon (15:00–17:00)</option>
          </select>
          {errors.preferredTime ? <p className="mt-1 text-sm text-danger" role="alert">{errors.preferredTime.message}</p> : null}
        </div>
      </div>
      <fieldset>
        <legend className="text-sm font-semibold">Have you visited before?</legend>
        <div className="mt-2 flex flex-wrap gap-4">
          <label className="flex items-center gap-2"><input type="radio" value="new" {...form.register("patientType")} /> New patient</label>
          <label className="flex items-center gap-2"><input type="radio" value="existing" {...form.register("patientType")} /> Existing patient</label>
        </div>
        {errors.patientType ? <p className="mt-1 text-sm text-danger" role="alert">{errors.patientType.message}</p> : null}
      </fieldset>
      <div>
        <Label htmlFor="appointment-message">Optional note</Label>
        <Textarea id="appointment-message" className="mt-2" placeholder="A practical note, such as needing a ground-floor room. Please do not include a detailed medical history." {...form.register("message")} />
        {errors.message ? <p className="mt-1 text-sm text-danger" role="alert">{errors.message.message}</p> : null}
      </div>
      <Button type="submit" disabled={pending}>{pending ? "Preparing…" : "Send appointment enquiry"}</Button>
      <div aria-live="polite" className="text-sm">
        {feedback ? <p>{feedback}</p> : null}
        {link ? (
          <a href={link} className="mt-2 inline-flex font-semibold text-action" target="_blank" rel="noopener noreferrer">
            Open WhatsApp if it did not open automatically
          </a>
        ) : null}
      </div>
    </form>
  );
}

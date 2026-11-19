"use server";

import { getDoctorBySlug } from "@/services/doctors/doctor-service";
import { getServiceBySlug } from "@/services/clinic-services/service-service";
import { isAspNetProviderEnabled } from "@/services/api/api-client";
import { appointmentSchema } from "@/services/appointments/appointment-schema";
import { aspNetAppointmentProvider } from "@/services/appointments/aspnet-appointment-provider";
import { whatsAppAppointmentProvider } from "@/services/appointments/whatsapp-appointment-provider";
import type { AppointmentSubmissionResult } from "@/types/content";

export async function submitAppointmentEnquiry(input: unknown): Promise<AppointmentSubmissionResult> {
  const parsed = appointmentSchema.safeParse(input);
  if (!parsed.success) {
    return { mode: "invalid", message: "Please check the form and try again." };
  }

  const service = await getServiceBySlug(parsed.data.serviceId);
  if (!service) {
    return { mode: "invalid", message: "Please choose a service the clinic lists." };
  }

  const doctor = parsed.data.doctorId ? await getDoctorBySlug(parsed.data.doctorId) : null;
  if (parsed.data.doctorId && !doctor) {
    return { mode: "invalid", message: "Please choose a listed doctor or leave the field as no preference." };
  }

  const provider = isAspNetProviderEnabled() ? aspNetAppointmentProvider : whatsAppAppointmentProvider;

  return provider.submit({
    serviceId: service.slug,
    serviceName: service.title,
    doctorId: doctor?.slug,
    doctorName: doctor?.name,
    patientName: parsed.data.patientName,
    phone: parsed.data.phone,
    preferredDate: parsed.data.preferredDate,
    preferredTime: parsed.data.preferredTime,
    patientType: parsed.data.patientType,
    message: parsed.data.message,
  });
}

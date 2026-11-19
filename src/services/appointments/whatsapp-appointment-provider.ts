import { buildAppointmentMessage, buildWhatsAppUrl } from "@/lib/contact-links";
import type { AppointmentProvider } from "@/services/appointments/appointment-types";

const readyMessage =
  "WhatsApp should open with your enquiry. The clinic will contact you to confirm availability. This is not a confirmed appointment.";

export const whatsAppAppointmentProvider: AppointmentProvider = {
  async submit(request) {
    const url = buildWhatsAppUrl(buildAppointmentMessage(request));
    if (!url) {
      return {
        mode: "unavailable",
        message:
          "WhatsApp is not configured yet. Please call or email the clinic using the details on the contact page. Your enquiry was not sent.",
      };
    }
    return { mode: "whatsapp", url, message: readyMessage };
  },
};

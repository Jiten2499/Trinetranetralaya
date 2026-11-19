import { ApiError, apiFetch } from "@/services/api/api-client";
import type { AppointmentProvider } from "@/services/appointments/appointment-types";

/**
 * Future provider. Expects POST /api/appointments to accept an AppointmentRequest
 * and return { id: string }. It must not be described to patients as a confirmed booking.
 */
export const aspNetAppointmentProvider: AppointmentProvider = {
  async submit(request) {
    try {
      const result = await apiFetch<{ id?: string }>("/api/appointments", {
        method: "POST",
        body: JSON.stringify(request),
      });
      return {
        mode: "submitted",
        reference: result.id,
        message:
          "Your enquiry was received. The clinic will contact you to confirm availability. This is not a confirmed appointment.",
      };
    } catch (error) {
      const message =
        error instanceof ApiError
          ? "The appointment service could not accept the enquiry. Please call or email the clinic."
          : "The appointment service is unavailable. Please call or email the clinic.";
      return { mode: "unavailable", message };
    }
  },
};

import type { AppointmentRequest, AppointmentSubmissionResult } from "@/types/content";

export interface AppointmentProvider {
  submit(request: AppointmentRequest): Promise<AppointmentSubmissionResult>;
}

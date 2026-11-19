import type { Doctor } from "@/types/doctor";

export type { Doctor, DoctorSummary } from "@/types/doctor";

export interface DoctorProvider {
  getDoctors(): Promise<Doctor[]>;
  getDoctorBySlug(slug: string): Promise<Doctor | null>;
}

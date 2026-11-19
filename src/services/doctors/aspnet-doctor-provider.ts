import { apiFetch } from "@/services/api/api-client";
import type { Doctor } from "@/types/doctor";
import type { DoctorProvider } from "@/services/doctors/doctor-types";

/**
 * Future ASP.NET Core provider. Selected only when DATA_PROVIDER=aspnet
 * and NEXT_PUBLIC_API_BASE_URL is set. The API should return Doctor objects.
 */
export const aspNetDoctorProvider: DoctorProvider = {
  async getDoctors() {
    return apiFetch<Doctor[]>("/api/doctors");
  },
  async getDoctorBySlug(slug) {
    return apiFetch<Doctor | null>(`/api/doctors/${encodeURIComponent(slug)}`);
  },
};

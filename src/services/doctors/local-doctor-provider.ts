import { doctors } from "@/data/doctors";
import type { DoctorProvider } from "@/services/doctors/doctor-types";

export const localDoctorProvider: DoctorProvider = {
  async getDoctors() {
    return doctors.filter((doctor) => doctor.isActive);
  },
  async getDoctorBySlug(slug) {
    return doctors.find((doctor) => doctor.isActive && doctor.slug === slug) ?? null;
  },
};

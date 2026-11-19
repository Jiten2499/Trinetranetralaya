import { isAspNetProviderEnabled } from "@/services/api/api-client";
import { aspNetDoctorProvider } from "@/services/doctors/aspnet-doctor-provider";
import { localDoctorProvider } from "@/services/doctors/local-doctor-provider";
import type { DoctorProvider } from "@/services/doctors/doctor-types";

function provider(): DoctorProvider {
  return isAspNetProviderEnabled() ? aspNetDoctorProvider : localDoctorProvider;
}

export async function getDoctors() {
  return provider().getDoctors();
}

export async function getDoctorBySlug(slug: string) {
  return provider().getDoctorBySlug(slug);
}

export async function getDoctorsBySlugs(slugs: string[]) {
  const doctors = await getDoctors();
  return slugs
    .map((slug) => doctors.find((doctor) => doctor.slug === slug))
    .filter((doctor): doctor is NonNullable<typeof doctor> => Boolean(doctor));
}

export function getDoctorSpecialties(doctors: Awaited<ReturnType<typeof getDoctors>>) {
  return [...new Set(doctors.flatMap((doctor) => doctor.specialties))].sort();
}

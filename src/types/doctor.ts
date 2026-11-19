export interface Doctor {
  id: string;
  slug: string;
  name: string;
  designation: string;
  qualifications: string[];
  registration: string | null;
  specialization: string;
  specialties: string[];
  biography: string;
  image: string;
  imageAlt: string;
  experienceYears: number | null;
  expertise: string[];
  languages: string[];
  schedule: string | null;
  isActive: boolean;
  isSample: boolean;
}

export interface DoctorSummary {
  id: string;
  slug: string;
  name: string;
  designation: string;
  specialization: string;
  specialties: string[];
  image: string;
  imageAlt: string;
  isSample: boolean;
}

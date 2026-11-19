export type ServiceIconName =
  | "exam"
  | "cataract"
  | "glaucoma"
  | "retina"
  | "pediatric"
  | "lasik"
  | "cornea"
  | "dry-eye"
  | "optical";

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceTreatment {
  title: string;
  description: string;
}

export interface ClinicService {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: ServiceIconName;
  category: string;
  isActive: boolean;
  featured: boolean;
  availabilityNote: string;
  overview: string;
  condition: string;
  symptoms: string[];
  causes: string[];
  diagnosis: string[];
  treatments: ServiceTreatment[];
  whenToConsult: string[];
  relatedSlugs: string[];
  faqs: ServiceFaq[];
  doctorSlugs: string[];
}

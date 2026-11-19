export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  context: string;
  isSample: true;
}

export interface Facility {
  id: string;
  title: string;
  description: string;
  purpose: string;
  image: string | null;
  imageAlt: string | null;
  confirmed: boolean;
}

export interface GuideSection {
  id: string;
  title: string;
  summary: string;
  paragraphs: string[];
  points?: string[];
}

export interface PolicySection {
  heading: string;
  paragraphs: string[];
}

export interface AppointmentRequest {
  serviceId: string;
  serviceName: string;
  doctorId?: string;
  doctorName?: string;
  patientName: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  patientType: "new" | "existing";
  message?: string;
}

export type AppointmentSubmissionResult =
  | { mode: "whatsapp"; url: string; message: string }
  | { mode: "submitted"; reference?: string; message: string }
  | { mode: "unavailable"; message: string }
  | { mode: "invalid"; message: string };

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  publishedAt: string;
  updatedAt: string;
  authorName: string | null;
  medicalReviewer: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
  categories: BlogCategory[];
  seoTitle: string | null;
  seoDescription: string | null;
}

export interface BlogQuery {
  page?: number;
  perPage?: number;
  search?: string;
  category?: string;
  after?: string;
}

export interface BlogListSuccess {
  ok: true;
  posts: BlogPost[];
  page: number;
  perPage: number;
  total: number | null;
  totalPages: number | null;
  hasNextPage: boolean;
  endCursor: string | null;
}

export type BlogListResponse =
  | BlogListSuccess
  | { ok: false; error: "not_configured" | "unavailable" };

export type BlogArticleResponse =
  | { ok: true; post: BlogPost }
  | { ok: false; error: "not_configured" | "unavailable" | "not_found" };

export type BlogCategoryResponse =
  | { ok: true; categories: BlogCategory[] }
  | { ok: false; error: "not_configured" | "unavailable" };

import { faqs } from "@/data/faqs";
import type { FaqItem } from "@/types/content";

export async function getFaqs(): Promise<FaqItem[]> {
  return faqs;
}

export async function getFaqsByCategory(category: string): Promise<FaqItem[]> {
  return faqs.filter((item) => item.category === category);
}

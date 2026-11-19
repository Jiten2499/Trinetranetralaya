import type { Testimonial } from "@/types/content";

export const testimonials: Testimonial[] = [
  {
    id: "sample-1",
    quote:
      "Sample quotation for the layout only. Replace this card with a review the clinic has permission to publish, or remove the testimonial section.",
    name: "Sample Patient A",
    context: "Sample visit type: routine eye examination",
    isSample: true,
  },
  {
    id: "sample-2",
    quote:
      "Sample quotation describing a calm explanation of a test result. This is not feedback from a real patient and must not be presented as one.",
    name: "Sample Patient B",
    context: "Sample visit type: family appointment",
    isSample: true,
  },
  {
    id: "sample-3",
    quote:
      "Sample quotation about understanding the next step after an examination. Delete this text before the website goes live unless a verified review replaces it.",
    name: "Sample Patient C",
    context: "Sample visit type: follow-up discussion",
    isSample: true,
  },
];

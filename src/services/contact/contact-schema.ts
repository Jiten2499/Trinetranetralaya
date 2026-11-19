import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(80),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a phone number.")
    .max(20)
    .regex(/^[+\d][\d\s()-]{6,}$/, "Please enter a valid phone number."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .or(z.literal(""))
    .optional(),
  subject: z.string().trim().min(3, "Please add a short subject.").max(120),
  message: z
    .string()
    .trim()
    .min(10, "Please enter a message of at least 10 characters.")
    .max(1000, "Please keep the message under 1000 characters."),
  consent: z.boolean().refine((value) => value, {
    message: "Please confirm you agree to the privacy notice.",
  }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

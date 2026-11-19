import { z } from "zod";

export const appointmentSchema = z.object({
  serviceId: z.string().min(1, "Please choose a service."),
  doctorId: z.string().optional(),
  patientName: z.string().trim().min(2, "Please enter the patient’s name.").max(80),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a mobile number.")
    .max(20)
    .regex(/^[+\d][\d\s()-]{6,}$/, "Please enter a valid mobile number."),
  preferredDate: z.string().min(1, "Please choose a preferred date."),
  preferredTime: z.string().min(1, "Please choose a preferred time."),
  patientType: z.enum(["new", "existing"], { message: "Please say if you are a new or existing patient." }),
  message: z.string().trim().max(500, "Please keep the note under 500 characters.").optional(),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;

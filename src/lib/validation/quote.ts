import { z } from "zod";

/** Server-side quote form schema. Use this in Server Actions even if the UI also validates. */
export const quoteSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(120),
  email: z.string().trim().email("Enter a valid email"),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(40),
  service: z.string().trim().min(1, "Select a service"),
  location: z.string().trim().min(1, "Project location is required").max(200),
  details: z.string().trim().min(1, "Project details are required").max(5000),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

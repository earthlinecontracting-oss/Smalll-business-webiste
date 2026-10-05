import { z } from "zod";

import { services } from "@/config/site";

export const quoteServiceOptions = [
  ...services.map((service) => service.name),
  "Other / Multiple",
] as const;

export type QuoteFieldName =
  | "fullName"
  | "email"
  | "phone"
  | "service"
  | "location"
  | "details";

export type QuoteFormValues = Record<QuoteFieldName, string>;

const optionalService = z
  .string()
  .refine(
    (value) => value === "" || (quoteServiceOptions as readonly string[]).includes(value),
    "Select a service",
  );

/** Server-side quote form schema. Use this in Server Actions even if the UI also validates. */
export const quoteSchema = z.object({
  fullName: z.string().trim().min(1, "First name is required").max(120),
  email: z.string().trim().email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .max(40)
    .refine((value) => value === "" || value.length >= 7, "Enter a valid phone number"),
  service: optionalService,
  location: z.string().trim().max(200),
  details: z.string().trim().max(5000),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export const emptyQuoteValues: QuoteFormValues = {
  fullName: "",
  email: "",
  phone: "",
  service: "",
  location: "",
  details: "",
};

export function quoteValuesFromFormData(formData: FormData): QuoteFormValues {
  return {
    fullName: String(formData.get("fullName") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    service: String(formData.get("service") ?? ""),
    location: String(formData.get("location") ?? ""),
    details: String(formData.get("details") ?? ""),
  };
}

import { z } from "zod";

import { services } from "@/config/site";
import { formString, stripHtml, stripHtmlPreserveNewlines } from "@/lib/sanitize";

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
  .transform((value) => stripHtml(value))
  .refine(
    (value) => value === "" || (quoteServiceOptions as readonly string[]).includes(value),
    "Select a service",
  );

function isValidOptionalPhone(value: string): boolean {
  if (value === "") {
    return true;
  }

  if (!/^[+()0-9.\-\s]+$/.test(value)) {
    return false;
  }

  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

/** Server-side quote form schema. Use this in Server Actions even if the UI also validates. */
export const quoteSchema = z.object({
  fullName: z
    .string()
    .transform((value) => stripHtml(value))
    .pipe(z.string().min(1, "First name is required").max(120)),
  email: z
    .string()
    .transform((value) => stripHtml(value).toLowerCase())
    .pipe(z.string().email("Enter a valid email").max(254)),
  phone: z
    .string()
    .transform((value) => stripHtml(value))
    .pipe(
      z
        .string()
        .max(40)
        .refine(isValidOptionalPhone, "Enter a valid phone number"),
    ),
  service: optionalService,
  location: z
    .string()
    .transform((value) => stripHtml(value))
    .pipe(z.string().max(200)),
  details: z
    .string()
    .transform((value) => stripHtmlPreserveNewlines(value))
    .pipe(z.string().max(5000)),
});

export const turnstileTokenSchema = z
  .string()
  .transform((value) => value.trim())
  .pipe(z.string().min(1).max(8192));

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
    fullName: formString(formData, "fullName"),
    email: formString(formData, "email"),
    phone: formString(formData, "phone"),
    service: formString(formData, "service"),
    location: formString(formData, "location"),
    details: formString(formData, "details"),
  };
}

export function sanitizedQuoteValues(values: QuoteFormValues): QuoteFormValues {
  return {
    fullName: stripHtml(values.fullName).slice(0, 120),
    email: stripHtml(values.email).slice(0, 254),
    phone: stripHtml(values.phone).slice(0, 40),
    location: stripHtml(values.location).slice(0, 200),
    details: stripHtmlPreserveNewlines(values.details).slice(0, 5000),
    service: (quoteServiceOptions as readonly string[]).includes(stripHtml(values.service))
      ? stripHtml(values.service)
      : "",
  };
}

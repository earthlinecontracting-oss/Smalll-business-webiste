import { z } from "zod";

import { services } from "@/config/services";
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
  | "details"
  | "consent";

export type QuoteFormValues = Record<QuoteFieldName, string>;

function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Server-side quote form schema. Keep this light so real customers are not blocked. */
export const quoteSchema = z.object({
  fullName: z
    .string()
    .transform((value) => stripHtml(value))
    .pipe(z.string().min(1, "Please enter your first name.").max(120)),
  email: z
    .string()
    .transform((value) => stripHtml(value).toLowerCase())
    .pipe(
      z
        .string()
        .min(1, "Please enter your email.")
        .max(254)
        .refine(looksLikeEmail, "Please enter a valid email."),
    ),
  phone: z
    .string()
    .transform((value) => stripHtml(value))
    .pipe(z.string().max(40)),
  service: z.string().transform((value) => {
    const clean = stripHtml(value);
    return (quoteServiceOptions as readonly string[]).includes(clean) ? clean : "";
  }),
  location: z
    .string()
    .transform((value) => stripHtml(value))
    .pipe(z.string().max(200)),
  details: z
    .string()
    .transform((value) => stripHtmlPreserveNewlines(value))
    .pipe(z.string().max(5000)),
  consent: z.literal("on", { error: "Please tick the box so we can reply to you." }),
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
  consent: "",
};

export function quoteValuesFromFormData(formData: FormData): QuoteFormValues {
  return {
    fullName: formString(formData, "fullName"),
    email: formString(formData, "email"),
    phone: formString(formData, "phone"),
    service: formString(formData, "service"),
    location: formString(formData, "location"),
    details: formString(formData, "details"),
    consent: formString(formData, "consent") === "on" ? "on" : "",
  };
}

export function sanitizedQuoteValues(values: QuoteFormValues): QuoteFormValues {
  return {
    fullName: stripHtml(values.fullName).slice(0, 120),
    email: stripHtml(values.email).slice(0, 254),
    phone: stripHtml(values.phone).slice(0, 40),
    location: stripHtml(values.location).slice(0, 200),
    details: stripHtmlPreserveNewlines(values.details).slice(0, 5000),
    consent: values.consent === "on" ? "on" : "",
    service: (quoteServiceOptions as readonly string[]).includes(stripHtml(values.service))
      ? stripHtml(values.service)
      : "",
  };
}

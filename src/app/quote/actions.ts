"use server";

import { sendEmail } from "@/lib/email";
import { allowQuoteAttempt } from "@/lib/rate-limit";
import { escapeHtml, formString } from "@/lib/sanitize";
import { verifyTurnstileToken } from "@/lib/turnstile";
import {
  quoteSchema,
  quoteValuesFromFormData,
  sanitizedQuoteValues,
  turnstileTokenSchema,
  type QuoteFieldName,
  type QuoteFormValues,
} from "@/lib/validation/quote";
import { site } from "@/config/site";

export type QuoteFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Partial<Record<QuoteFieldName, string>>;
  values: QuoteFormValues;
};

function blankOr(value: string, fallback = "Not provided") {
  return value.trim() ? value.trim() : fallback;
}

function quoteEmailBodies(input: {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  location: string;
  details: string;
}): { text: string; html: string } {
  const lines = [
    ["Name", input.fullName],
    ["Email", input.email],
    ["Phone", blankOr(input.phone)],
    ["Service", blankOr(input.service)],
    ["Location", blankOr(input.location)],
  ] as const;

  const details = blankOr(input.details, "No extra details.");

  const text = [
    `New quote request for ${site.name}`,
    ...lines.map(([label, value]) => `${label}: ${value}`),
    "",
    details,
  ].join("\n");

  const html = [
    `<p>New quote request for ${escapeHtml(site.name)}</p>`,
    "<ul>",
    ...lines.map(
      ([label, value]) => `<li><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</li>`,
    ),
    "</ul>",
    `<p>${escapeHtml(details).replace(/\n/g, "<br />")}</p>`,
  ].join("");

  return { text, html };
}

export async function submitQuote(
  _previous: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  const rawValues = quoteValuesFromFormData(formData);
  const values = sanitizedQuoteValues(rawValues);
  const parsed = quoteSchema.safeParse(rawValues);

  if (!parsed.success) {
    const fieldErrors: QuoteFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !(key in fieldErrors)) {
        fieldErrors[key as QuoteFieldName] = issue.message;
      }
    }

    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors,
      values,
    };
  }

  const { fullName, email, phone, service, location, details } = parsed.data;
  const turnstileParsed = turnstileTokenSchema.safeParse(
    formString(formData, "cf-turnstile-response"),
  );
  const turnstileOk =
    turnstileParsed.success && (await verifyTurnstileToken(turnstileParsed.data));

  if (!turnstileOk) {
    return {
      status: "error",
      message: "Please complete the security check and try again.",
      fieldErrors: {},
      values: parsed.data,
    };
  }

  const allowed = await allowQuoteAttempt();
  if (!allowed) {
    return {
      status: "error",
      message: `Too many quote requests. Please wait a bit, or call ${site.phone}.`,
      fieldErrors: {},
      values: parsed.data,
    };
  }

  try {
    const body = quoteEmailBodies({ fullName, email, phone, service, location, details });
    await sendEmail({
      subject: `New quote request${service ? `: ${service}` : ""}`,
      replyTo: email,
      text: body.text,
      html: body.html,
    });
  } catch (error) {
    console.error("Quote form email failed.");
    if (error instanceof Error) {
      console.error(error.message);
    }
    return {
      status: "error",
      message: `We could not send the form. Please call ${site.phone}.`,
      fieldErrors: {},
      values: parsed.data,
    };
  }

  return {
    status: "success",
    message: `Thanks, ${fullName}. We will get back to you. For a faster reply, call ${site.phone}.`,
    fieldErrors: {},
    values: parsed.data,
  };
}

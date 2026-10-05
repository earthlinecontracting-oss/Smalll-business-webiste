"use server";

import { sendEmail } from "@/lib/email";
import {
  quoteSchema,
  quoteValuesFromFormData,
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

export async function submitQuote(
  previous: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  const values = quoteValuesFromFormData(formData);
  const parsed = quoteSchema.safeParse(values);

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

  try {
    await sendEmail({
      subject: `New quote request${service ? `: ${service}` : ""}`,
      replyTo: email,
      text: [
        `New quote request for ${site.name}`,
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${blankOr(phone)}`,
        `Service: ${blankOr(service)}`,
        `Location: ${blankOr(location)}`,
        "",
        blankOr(details, "No extra details."),
      ].join("\n"),
    });
  } catch (error) {
    console.error("Quote form email failed.", error);
    return {
      status: "error",
      message: `We could not send the form. Please call ${site.phone}.`,
      fieldErrors: {},
      values,
    };
  }

  return {
    status: "success",
    message: `Thanks, ${fullName}. We will get back to you. For a faster reply, call ${site.phone}.`,
    fieldErrors: {},
    values: previous.values,
  };
}

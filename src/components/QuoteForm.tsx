"use client";

import { useActionState } from "react";

import { Button } from "@/components/Button";
import { submitQuote, type QuoteFormState } from "@/app/quote/actions";
import { emptyQuoteValues, quoteServiceOptions } from "@/lib/validation/quote";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

const initialQuoteState: QuoteFormState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  values: emptyQuoteValues,
};

const fieldClass =
  "mt-1 w-full rounded-md border border-ink/15 bg-cream px-3 py-2.5 text-ink placeholder:text-muted/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

export function QuoteForm() {
  const [state, action, pending] = useActionState(submitQuote, initialQuoteState);
  const values = state.values;

  if (state.status === "success") {
    return (
      <div
        className="rounded-lg border border-gold bg-card p-6"
        role="status"
        aria-live="polite"
      >
        <h2 className="font-display text-xl uppercase tracking-wide text-ink">Request sent</h2>
        <p className="mt-3 text-muted">{state.message}</p>
        <a
          href={site.phoneHref}
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-gold px-5 py-3 text-center text-sm font-semibold uppercase tracking-wide text-ink sm:w-auto"
        >
          {site.callLabel}
          <span className="sr-only"> {site.phone}</span>
        </a>
      </div>
    );
  }

  return (
    <form
      action={action}
      id="quote-form"
      className="rounded-lg border border-ink/10 bg-card p-5 sm:p-6"
      noValidate
      key={`${state.status}-${state.message}-${values.fullName}-${values.email}-${values.phone}-${values.service}-${values.location}-${values.details}`}
    >
      {state.message ? (
        <p className="mb-4 rounded-md border border-earth/40 bg-cream px-3 py-2 text-sm text-earth" role="alert">
          {state.message}
        </p>
      ) : null}

      <p className="mb-4 text-sm text-muted">Only first name and email are required.</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="text-sm font-semibold text-ink">
            First name <span className="text-earth">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            autoComplete="given-name"
            required
            defaultValue={values.fullName}
            className={fieldClass}
          />
          <FieldError message={state.fieldErrors.fullName} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-ink">
            Email <span className="text-earth">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={values.email}
            className={fieldClass}
          />
          <FieldError message={state.fieldErrors.email} />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-semibold text-ink">
            Phone <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={values.phone}
            className={fieldClass}
          />
          <FieldError message={state.fieldErrors.phone} />
        </div>
        <div>
          <label htmlFor="service" className="text-sm font-semibold text-ink">
            Service needed <span className="font-normal text-muted">(optional)</span>
          </label>
          <select id="service" name="service" defaultValue={values.service} className={fieldClass}>
            <option value="">Select a service</option>
            {quoteServiceOptions.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          <FieldError message={state.fieldErrors.service} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="location" className="text-sm font-semibold text-ink">
            Project location <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="location"
            name="location"
            placeholder="Surrey neighbourhood or address"
            defaultValue={values.location}
            className={fieldClass}
          />
          <FieldError message={state.fieldErrors.location} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="details" className="text-sm font-semibold text-ink">
            Project details <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea
            id="details"
            name="details"
            rows={5}
            defaultValue={values.details}
            className={cn(fieldClass, "resize-y")}
          />
          <FieldError message={state.fieldErrors.details} />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button type="submit" disabled={pending}>
          {pending ? "Sending…" : "Send quote request"}
        </Button>
        <Button href={site.phoneHref} variant="secondary">
          {site.callLabel} instead
          <span className="sr-only"> at {site.phone}</span>
        </Button>
      </div>
    </form>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-1 text-sm text-earth">{message}</p>;
}

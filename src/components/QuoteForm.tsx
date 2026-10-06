"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import Script from "next/script";

import { Button } from "@/components/Button";
import { submitQuote, type QuoteFormState } from "@/app/quote/actions";
import { emptyQuoteValues, quoteServiceOptions } from "@/lib/validation/quote";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { publicEnv } from "@/lib/env.public";

const initialQuoteState: QuoteFormState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  values: emptyQuoteValues,
};

const fieldClass =
  "mt-1 w-full rounded-md border border-ink/15 bg-cream px-3 py-2.5 text-ink placeholder:text-muted/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

const errorFieldClass = "border-earth/60";

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: { sitekey: string; theme?: string }) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

export function QuoteForm({ nonce }: { nonce?: string }) {
  const [state, action, pending] = useActionState(submitQuote, initialQuoteState);
  const values = state.values;
  const fieldErrors = Object.values(state.fieldErrors).filter(Boolean);

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
    >
      {state.message ? (
        <div
          className="mb-4 rounded-md border border-earth/40 bg-cream px-3 py-2 text-sm text-earth"
          role="alert"
        >
          <p>{state.message}</p>
          {fieldErrors.length > 0 ? (
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {fieldErrors.map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          ) : null}
        </div>
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
            aria-invalid={Boolean(state.fieldErrors.fullName)}
            className={cn(fieldClass, state.fieldErrors.fullName && errorFieldClass)}
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
            aria-invalid={Boolean(state.fieldErrors.email)}
            className={cn(fieldClass, state.fieldErrors.email && errorFieldClass)}
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
        </div>
      </div>

      <TurnstileField nonce={nonce} resetKey={state.status === "error" ? state.message : ""} />

      <div className="mt-6">
        <label htmlFor="consent" className="flex gap-3 text-sm text-ink">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            value="on"
            required
            defaultChecked={values.consent === "on"}
            className="mt-1 size-4 shrink-0 accent-gold"
          />
          <span>
            I agree that {site.name} can use this information to reply to my quote request.{" "}
            <span className="text-earth">*</span>
          </span>
        </label>
        <p className="mt-2 pl-7 text-sm text-muted">
          See our{" "}
          <a
            href={site.privacyHref}
            className="font-semibold text-ink underline decoration-gold underline-offset-4"
          >
            Privacy Policy
          </a>
          .
        </p>
        <FieldError message={state.fieldErrors.consent} />
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

function TurnstileField({ nonce, resetKey }: { nonce?: string; resetKey: string }) {
  const widgetId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const turnstileId = useRef<string | null>(null);

  function mountWidget() {
    if (!containerRef.current || !window.turnstile || turnstileId.current) {
      return;
    }

    turnstileId.current = window.turnstile.render(containerRef.current, {
      sitekey: publicEnv.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
      theme: "light",
    });
  }

  useEffect(() => {
    mountWidget();
  }, []);

  useEffect(() => {
    if (!resetKey || !turnstileId.current || !window.turnstile) {
      return;
    }

    window.turnstile.reset(turnstileId.current);
  }, [resetKey]);

  return (
    <div className="mt-6">
      <p className="sr-only" id={`${widgetId}-label`}>
        Security check
      </p>
      <div ref={containerRef} aria-labelledby={`${widgetId}-label`} />
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        nonce={nonce}
        onLoad={mountWidget}
      />
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-1 text-sm text-earth">{message}</p>;
}

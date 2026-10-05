import type { Metadata } from "next";

import { Section } from "@/components/Section";
import { pages } from "@/config/seo";
import { site } from "@/config/site";

export const metadata: Metadata = pages.privacy;

export default function PrivacyPage() {
  return (
    <Section
      id="privacy"
      eyebrow="PIPEDA"
      title="Privacy Policy"
      description={`This page explains how ${site.name} handles personal information in plain language.`}
    >
      <div className="max-w-3xl space-y-10 text-base leading-relaxed text-muted sm:text-lg">
        <section className="space-y-3" aria-labelledby="privacy-who">
          <h2 id="privacy-who" className="font-display text-xl uppercase tracking-wide text-ink">
            Who we are
          </h2>
          <p>
            {site.name} is a local earthworks business in {site.address}. We work across{" "}
            {site.serviceArea}. {site.contactName} is the person who handles quote requests and
            questions about this policy.
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="privacy-collect">
          <h2 id="privacy-collect" className="font-display text-xl uppercase tracking-wide text-ink">
            What we collect and why
          </h2>
          <p>
            When you use the quote form, we collect the information you type in: your name, email,
            phone number (if you give one), project location (address, neighbourhood, or postal
            code), the service you choose, and any project details. First name and email are
            required so we can reply. The rest is optional.
          </p>
          <p>
            We use this only to respond to your quote request and, if we take the job, to provide
            earthworks services. We do not use it for marketing lists, and we do not sell or share
            personal information with other companies for their own use.
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="privacy-handle">
          <h2 id="privacy-handle" className="font-display text-xl uppercase tracking-wide text-ink">
            How we handle it
          </h2>
          <p>
            The form is sent by email to our business inbox through Resend, the service that
            delivers that message. Cloudflare Turnstile runs a spam check on the form so bots have a
            harder time filling it in. We also limit how often the form can be sent from the same
            connection by storing a one-way hash of the IP address — never the raw IP itself.
          </p>
          <p>
            Resend and Cloudflare act as service providers so we can run the website. They only get
            what they need to send the email or run the spam check. We do not sell personal
            information, and we do not share it except as needed to reply to you, do the work you
            asked for, or if the law requires it.
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="privacy-analytics">
          <h2 id="privacy-analytics" className="font-display text-xl uppercase tracking-wide text-ink">
            Cookies and analytics
          </h2>
          <p>
            This site does not use tracking cookies, and we do not currently run visitor analytics.
            If we add analytics later, it will be a privacy-friendly option without tracking cookies.
            The contact page map is provided by Google Maps when you open that page.
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="privacy-keep">
          <h2 id="privacy-keep" className="font-display text-xl uppercase tracking-wide text-ink">
            How long we keep it
          </h2>
          <p>
            Quote emails are kept in our business inbox for up to two years, then deleted. If we
            take on the job, we may keep what we need while the work is underway and for a
            reasonable time after for our records. You can ask us to delete a quote request sooner.
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="privacy-rights">
          <h2 id="privacy-rights" className="font-display text-xl uppercase tracking-wide text-ink">
            Access, correction, and deletion
          </h2>
          <p>
            You can ask to see the personal information we have about you, to correct it, or to
            delete it. Email {site.contactName} at{" "}
            <a
              className="break-all font-semibold text-ink underline decoration-gold underline-offset-4"
              href={`mailto:${site.email}`}
            >
              {site.email}
            </a>
            . We will respond as promptly as we reasonably can.
          </p>
        </section>

        <section className="space-y-3" aria-labelledby="privacy-contact">
          <h2 id="privacy-contact" className="font-display text-xl uppercase tracking-wide text-ink">
            How to reach us
          </h2>
          <address className="not-italic">
            <p>{site.name}</p>
            <p>{site.address}</p>
            <p>
              <a
                className="font-semibold text-ink underline decoration-gold underline-offset-4"
                href={site.phoneHref}
              >
                {site.phone}
              </a>
            </p>
            <p>
              <a
                className="break-all font-semibold text-ink underline decoration-gold underline-offset-4"
                href={`mailto:${site.email}`}
              >
                {site.email}
              </a>
            </p>
          </address>
          <p>This policy was last updated on {site.privacyUpdated}.</p>
        </section>
      </div>
    </Section>
  );
}

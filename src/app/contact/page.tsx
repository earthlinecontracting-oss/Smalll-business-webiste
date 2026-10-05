import type { Metadata } from "next";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { pages } from "@/config/seo";
import { site } from "@/config/site";

export const metadata: Metadata = pages.contact;

export default function ContactPage() {
  return (
    <Section
      id="contact"
      eyebrow="Get in touch"
      title="Contact"
      description={`Ask ${site.contactName} about your next earthworks job in ${site.serviceArea}.`}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title={site.name}>
          <address className="not-italic">
            <p>{site.address}</p>
            <p className="mt-3">
              <a className="font-semibold text-ink underline decoration-gold underline-offset-4" href={site.phoneHref}>
                {site.phone}
              </a>
            </p>
            <p className="mt-2">
              <a
                className="break-all font-semibold text-ink underline decoration-gold underline-offset-4"
                href={`mailto:${site.email}`}
              >
                {site.email}
              </a>
            </p>
          </address>
          <div className="mt-6">
            <h3 className="font-display text-base font-semibold uppercase tracking-wide text-ink">Hours</h3>
            <ul className="mt-2 space-y-2">
              {site.hours.map((entry) => (
                <li key={entry.days}>
                  <span className="block font-semibold text-ink">{entry.days}</span>
                  {entry.time}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={site.quoteHref}>{site.quoteLabel}</Button>
            <Button href={site.phoneHref} variant="secondary">
              {site.callLabel}
              <span className="sr-only"> {site.phone}</span>
            </Button>
          </div>
        </Card>

        <div>
          <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-ink">
            Service area map
          </h2>
          <p className="mt-2 text-sm text-muted sm:text-base">
            We work across {site.serviceArea}. The map is centered on {site.address}.
          </p>
          <div className="mt-4 overflow-hidden rounded-lg border border-gold/30 bg-card shadow-sm">
            <iframe
              title={`Map of ${site.serviceArea}`}
              src={site.mapEmbedSrc}
              className="h-64 w-full border-0 sm:h-80 lg:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

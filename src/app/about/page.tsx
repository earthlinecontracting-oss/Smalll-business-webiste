import type { Metadata } from "next";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { site, sellingPoints, team } from "@/config/site";
import { pages } from "@/config/seo";

export const metadata: Metadata = pages.about;

export default function AboutPage() {
  return (
    <>
      <Section
        id="story"
        eyebrow="About us"
        title="Our story"
        description={site.tagline}
      >
        <div className="max-w-3xl space-y-4 text-base leading-relaxed text-muted sm:text-lg">
          {site.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={site.quoteHref}>{site.quoteLabel}</Button>
          <Button href="/contact" variant="secondary">
            Contact
          </Button>
        </div>
      </Section>

      <Section
        id="team"
        eyebrow="People"
        title="The team"
        description={`${site.contactName} is the person to call about earthworks in ${site.address}.`}
        headingLevel="h2"
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {team.map((member) => (
            <li key={member.name}>
              <Card title={member.name} headingLevel="h3">
                <p className="font-semibold uppercase tracking-wide text-gold-dark">{member.role}</p>
                <p className="mt-2">{member.bio}</p>
                <p className="mt-4">
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
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="values"
        eyebrow="How we work"
        title="Values"
        description="What you can expect on every Earthline job."
        headingLevel="h2"
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {sellingPoints.map((value) => (
            <li key={value.title}>
              <Card title={value.title} headingLevel="h3">
                {value.description}
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="service-area"
        eyebrow="Where we work"
        title="Service area"
        description={`We cover ${site.serviceArea}, with most jobs in and around ${site.address}.`}
        headingLevel="h2"
      >
        <ul className="flex flex-wrap gap-2">
          {site.serviceAreaPlaces.map((place) => (
            <li
              key={place}
              className="rounded-md border border-gold/40 bg-card px-4 py-2 text-sm font-semibold uppercase tracking-wide text-ink"
            >
              {place}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-muted">
          Not sure if your site is in range? Call {site.contactName} or send the address through the quote form.
        </p>
        <div className="mt-8">
          <Button href="/contact" variant="secondary">
            See map and hours
          </Button>
        </div>
      </Section>
    </>
  );
}

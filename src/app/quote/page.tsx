import type { Metadata } from "next";
import { headers } from "next/headers";

import { QuoteForm } from "@/components/QuoteForm";
import { Section } from "@/components/Section";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Get a Quote",
  description: `Request a free earthworks estimate from ${site.name} in ${site.serviceArea}.`,
};

export default async function QuotePage() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <Section
      id="quote"
      eyebrow="Free estimate"
      title="Request a quote"
      description={`First name and email are enough to start, or call ${site.contactName} at ${site.phone}.`}
    >
      <QuoteForm nonce={nonce} />
    </Section>
  );
}

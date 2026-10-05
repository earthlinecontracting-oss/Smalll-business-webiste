import type { Metadata } from "next";
import { headers } from "next/headers";

import { QuoteForm } from "@/components/QuoteForm";
import { Section } from "@/components/Section";
import { pages } from "@/config/seo";
import { site } from "@/config/site";

export const metadata: Metadata = pages.quote;

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

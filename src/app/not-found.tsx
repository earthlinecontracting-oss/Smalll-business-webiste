import type { Metadata } from "next";

import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { pageSeo } from "@/config/seo";
import { site } from "@/config/site";

export const metadata: Metadata = {
  ...pageSeo({
    path: "/404",
    title: "Page not found",
    description:
      "That page is not on the Earthline Contracting site. See excavation and site prep services in Surrey and the Lower Mainland, BC.",
  }),
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Section
      id="not-found"
      eyebrow="404"
      title="Page not found"
      description={`The page you asked for is not on ${site.name}. Check the address, or go back to the home page.`}
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button href="/">Back to home</Button>
        <Button href="/contact" variant="secondary">
          Contact
        </Button>
      </div>
    </Section>
  );
}

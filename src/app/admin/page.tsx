import type { Metadata } from "next";

import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Admin",
  description: `Internal tools for ${site.name}. Not a public customer page.`,
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <Section
      id="admin"
      eyebrow="Internal"
      title="Admin"
      description="Placeholder admin area. Protect this route with authentication before adding data tools."
    >
      <Card title="Not secured yet">Do not put private data here until authentication is in place.</Card>
    </Section>
  );
}

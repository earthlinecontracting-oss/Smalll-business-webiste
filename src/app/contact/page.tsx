import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { site } from "@/config/site";

export default function ContactPage() {
  return (
    <Section
      id="contact"
      title="Contact"
      description="Placeholder contact page."
    >
      <Card title={site.name}>
        <p>{site.address}</p>
        <p>
          <a href={site.phoneHref}>{site.phone}</a>
        </p>
        <p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </Card>
    </Section>
  );
}

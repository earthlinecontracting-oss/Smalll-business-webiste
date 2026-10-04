import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { site } from "@/config/site";

export default function HomePage() {
  return (
    <Section
      id="home"
      title={site.name}
      description="Empty starter home page. Business copy will go here."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Card title="Next step">
          Replace this placeholder with the public landing page.
        </Card>
        <Card title="Site config">
          Name, phone, email, and service area are edited in{" "}
          <code>src/config/site.ts</code>.
        </Card>
      </div>
      <div className="mt-8">
        <Button href="/quote">Get a quote</Button>
      </div>
    </Section>
  );
}

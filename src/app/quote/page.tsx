import { Card } from "@/components/Card";
import { Section } from "@/components/Section";

export default function QuotePage() {
  return (
    <Section
      id="quote"
      title="Request a quote"
      description="Placeholder quote page. The form will post through a Server Action and Zod."
    >
      <Card title="Coming soon">Quote form is not wired up yet.</Card>
    </Section>
  );
}

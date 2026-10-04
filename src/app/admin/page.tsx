import { Card } from "@/components/Card";
import { Section } from "@/components/Section";

export default function AdminPage() {
  return (
    <Section
      id="admin"
      title="Admin"
      description="Placeholder admin area. Protect this route with Supabase Auth before adding data tools."
    >
      <Card title="Not secured yet">Do not put private data here until authentication is in place.</Card>
    </Section>
  );
}

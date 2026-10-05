"use client";

import { Button } from "@/components/Button";
import { Section } from "@/components/Section";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Section
      id="error"
      eyebrow="Something went wrong"
      title="That page could not be loaded"
      description="Please try again. If it keeps happening, call us and we will help you from there."
    >
      <Button type="button" onClick={() => reset()}>
        Try again
      </Button>
    </Section>
  );
}

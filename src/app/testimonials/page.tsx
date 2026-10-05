import type { Metadata } from "next";

import { PageCta } from "@/components/PageCta";
import { Section } from "@/components/Section";
import { TestimonialCard } from "@/components/TestimonialCard";
import { site } from "@/config/site";
import { testimonials } from "@/config/testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
  description: `What clients say about ${site.name} in ${site.serviceArea}.`,
};

export default function TestimonialsPage() {
  return (
    <>
      <Section
        id="testimonials"
        eyebrow="Clients"
        title="Testimonials"
        description={`Reviews from earthworks jobs around ${site.serviceArea}.`}
      >
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <li key={`${testimonial.customer_name}-${testimonial.location}`}>
              <TestimonialCard testimonial={testimonial} />
            </li>
          ))}
        </ul>
      </Section>
      <PageCta />
    </>
  );
}

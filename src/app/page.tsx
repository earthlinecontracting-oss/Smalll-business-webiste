import type { Metadata } from "next";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { GalleryGrid } from "@/components/GalleryGrid";
import { Hero } from "@/components/Hero";
import { PageCta } from "@/components/PageCta";
import { Section } from "@/components/Section";
import { TestimonialCard } from "@/components/TestimonialCard";
import { gallery } from "@/config/gallery";
import { audiences, sellingPoints, site } from "@/config/site";
import { pages } from "@/config/seo";
import { testimonials } from "@/config/testimonials";

const previewTestimonials = testimonials.slice(0, 3);
const previewGallery = gallery.slice(0, 6);

export const metadata: Metadata = pages.home;

export default function HomePage() {
  return (
    <>
      <Hero />
      <Section
        id="audiences"
        eyebrow={site.shortName}
        title="Residential and commercial"
        description={site.tagline}
        headingLevel="h2"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {audiences.map((audience) => (
            <Card key={audience.name} title={audience.name} headingLevel="h3">
              {audience.description}
            </Card>
          ))}
        </div>
      </Section>
      <Section
        id="why-us"
        eyebrow="Why Earthline"
        title="How we work"
        description="Clear quotes, local crews, and insured earthworks across Surrey and Langley."
        headingLevel="h2"
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {sellingPoints.map((point) => (
            <li key={point.title}>
              <Card title={point.title} headingLevel="h3">
                {point.description}
              </Card>
            </li>
          ))}
        </ul>
      </Section>
      <Section
        id="recent-work"
        eyebrow="Recent work"
        title="From the job site"
        description="A few of the latest photos. Open the gallery for the full set."
        headingLevel="h2"
      >
        <GalleryGrid items={previewGallery} showFilters={false} />
        <div className="mt-8">
          <Button href="/gallery" variant="secondary">
            View gallery
          </Button>
        </div>
      </Section>
      <Section
        id="testimonials-preview"
        eyebrow="Clients"
        title="What customers say"
        description="A few notes from recent jobs. Read more on the testimonials page."
        headingLevel="h2"
      >
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {previewTestimonials.map((testimonial) => (
            <li key={`${testimonial.customer_name}-${testimonial.location}`}>
              <TestimonialCard testimonial={testimonial} />
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button href="/testimonials" variant="secondary">
            All testimonials
          </Button>
        </div>
      </Section>
      <PageCta />
    </>
  );
}

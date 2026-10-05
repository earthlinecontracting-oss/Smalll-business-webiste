import type { Metadata } from "next";

import { Card } from "@/components/Card";
import { PageCta } from "@/components/PageCta";
import { Section } from "@/components/Section";
import { audiences, services, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Earthworks services from ${site.name} throughout ${site.serviceArea}.`,
};

export default function ServicesPage() {
  return (
    <>
      <Section
        id="services"
        eyebrow="Our services"
        title="Earthworks for every stage"
        description={`Commercial and residential earthworks throughout ${site.serviceArea}.`}
      >
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          {audiences.map((audience) => (
            <Card key={audience.name} title={audience.name}>
              {audience.description}
            </Card>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <Card key={service.name} title={service.name} headingLevel="h3">
              {service.description}
            </Card>
          ))}
        </div>
      </Section>
      <PageCta description="Not sure which service you need? Send the job details and we will help narrow it down." />
    </>
  );
}

import Image from "next/image";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { site } from "@/config/site";

export function Hero() {
  return (
    <section className="relative isolate min-h-[22rem] overflow-hidden bg-ink text-cream sm:min-h-[28rem]" aria-labelledby="home-heading">
      <Image
        src="/images/work-excavation.jpg"
        alt="Excavation equipment working a graded job site in Surrey, British Columbia"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_35%]"
      />
      <div className="absolute inset-0 bg-ink/70" aria-hidden="true" />
      <Container className="relative py-16 sm:py-20 lg:py-28">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">{site.address}</p>
        <h1
          id="home-heading"
          className="max-w-3xl text-balance font-display text-3xl font-semibold uppercase tracking-wide sm:text-4xl lg:text-5xl"
        >
          {site.headline}
        </h1>
        <span className="mt-4 block h-1 w-16 bg-gold" aria-hidden="true" />
        <p className="mt-5 max-w-xl text-base text-cream/90 sm:text-lg">{site.tagline}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={site.quoteHref}>{site.heroQuoteLabel}</Button>
          <Button href="/services" variant="secondary">
            Our services
          </Button>
        </div>
      </Container>
    </section>
  );
}

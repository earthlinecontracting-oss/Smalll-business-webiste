import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { site } from "@/config/site";

type PageCtaProps = {
  description?: string;
};

export function PageCta({
  description = `Tell ${site.contactName} about the job, or call for a free estimate in ${site.serviceArea}.`,
}: PageCtaProps) {
  return (
    <Section
      id="get-a-quote"
      eyebrow="Next step"
      title="Ready for a quote"
      description={description}
      headingLevel="h2"
      className="border-t border-gold/30 bg-card/40"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button href={site.quoteHref}>{site.heroQuoteLabel}</Button>
        <Button href={site.phoneHref} variant="secondary">
          {site.callLabel}
          <span className="sr-only"> {site.phone}</span>
        </Button>
      </div>
    </Section>
  );
}

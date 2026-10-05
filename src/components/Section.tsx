import type { ReactNode } from "react";

import { Container } from "@/components/Container";
import { cn } from "@/lib/cn";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  headingLevel?: "h1" | "h2";
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  headingLevel = "h1",
}: SectionProps) {
  const headingId = id ? `${id}-heading` : undefined;
  const Heading = headingLevel;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("py-12 sm:py-16", className)}
    >
      <Container>
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
            {eyebrow}
          </p>
        ) : null}
        <Heading
          id={headingId}
          className="max-w-4xl text-balance break-words font-display text-2xl font-semibold uppercase tracking-wide text-ink sm:text-3xl lg:text-4xl"
        >
          {title}
        </Heading>
        <span className="mt-3 block h-1 w-16 bg-gold" aria-hidden="true" />
        {description ? (
          <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">{description}</p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </section>
  );
}

import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type CardProps = {
  title: string;
  children: ReactNode;
  className?: string;
  headingLevel?: "h2" | "h3";
};

export function Card({ title, children, className, headingLevel = "h2" }: CardProps) {
  const Heading = headingLevel;
  return (
    <article
      className={cn(
        "rounded-lg border border-ink/10 bg-card p-5 shadow-sm sm:p-6",
        "min-w-0 border-t-4 border-t-gold",
        className,
      )}
    >
      <Heading className="font-display text-lg font-semibold uppercase tracking-wide text-ink">
        {title}
      </Heading>
      <div className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{children}</div>
    </article>
  );
}

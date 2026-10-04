import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export function Section({ id, title, description, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-heading` : undefined} className="py-12">
      <h1 id={id ? `${id}-heading` : undefined} className="text-3xl font-semibold tracking-tight">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 max-w-2xl text-neutral-600">{description}</p>
      ) : null}
      {children ? <div className="mt-8">{children}</div> : null}
    </section>
  );
}

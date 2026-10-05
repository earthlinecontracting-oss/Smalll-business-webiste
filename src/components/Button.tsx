import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClass: Record<Variant, string> = {
  primary:
    "bg-gold text-ink hover:bg-gold-dark focus-visible:outline-gold",
  secondary:
    "border border-gold bg-ink text-cream hover:bg-olive focus-visible:outline-gold",
};

function classes(variant: Variant, className: string | undefined) {
  return cn(
    "inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-5 py-2.5 text-center text-sm font-semibold uppercase tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
    variantClass[variant],
    className,
  );
}

export function Button(props: ButtonProps) {
  if (props.href) {
    const className = classes(props.variant ?? "primary", props.className);
    const external =
      props.href.startsWith("tel:") ||
      props.href.startsWith("mailto:") ||
      props.href.startsWith("http://") ||
      props.href.startsWith("https://");

    if (external) {
      return (
        <a href={props.href} className={className}>
          {props.children}
        </a>
      );
    }

    return (
      <Link href={props.href} className={className}>
        {props.children}
      </Link>
    );
  }

  const { children, className, variant, ...rest } = props;

  return (
    <button type="button" className={classes(variant ?? "primary", className)} {...rest}>
      {children}
    </button>
  );
}

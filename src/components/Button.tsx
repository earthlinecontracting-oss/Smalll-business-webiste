import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

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
    "bg-neutral-900 text-white hover:bg-neutral-700 focus-visible:outline-neutral-900",
  secondary:
    "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50 focus-visible:outline-neutral-900",
};

function classes(variant: Variant, className: string | undefined) {
  return [
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
    variantClass[variant],
    className ?? "",
  ]
    .join(" ")
    .trim();
}

export function Button(props: ButtonProps) {
  if (props.href) {
    return (
      <Link href={props.href} className={classes(props.variant ?? "primary", props.className)}>
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

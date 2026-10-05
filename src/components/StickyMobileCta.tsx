"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { site } from "@/config/site";
import { cn } from "@/lib/cn";

export function StickyMobileCta() {
  const pathname = usePathname();
  const quoteHref = pathname === site.quoteHref ? `${site.quoteHref}#quote-form` : site.quoteHref;

  return (
    <div className="xl:hidden">
      <nav
        aria-label="Call or get a quote"
        className="fixed inset-x-0 bottom-0 z-[55] border-t-2 border-gold bg-ink/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(28,24,20,0.25)] backdrop-blur"
      >
        <div className="grid grid-cols-2 gap-2 px-3 py-2.5">
          <a
            href={site.phoneHref}
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-gold bg-ink text-sm font-semibold uppercase tracking-wide text-cream"
          >
            {site.callLabel}
            <span className="sr-only"> {site.phone}</span>
          </a>
          <Link
            href={quoteHref}
            className={cn(
              "inline-flex min-h-12 items-center justify-center rounded-md bg-gold text-sm font-semibold uppercase tracking-wide text-ink",
            )}
          >
            {site.quoteLabel}
          </Link>
        </div>
      </nav>
    </div>
  );
}

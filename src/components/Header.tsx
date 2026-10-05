import Link from "next/link";

import { BrandMark } from "@/components/BrandMark";
import { PrimaryNav } from "@/components/PrimaryNav";
import { site } from "@/config/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-gold bg-ink/95 text-cream backdrop-blur">
      <div className="relative mx-auto flex w-full max-w-[90rem] items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 text-cream"
          aria-label={`${site.name} home`}
        >
          <BrandMark className="h-10 w-10 shrink-0" />
          <span className="min-w-0 leading-tight">
            <span className="block font-display text-lg uppercase tracking-[0.14em] sm:text-xl">
              {site.shortName}
            </span>
            <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-gold">
              Contracting
            </span>
          </span>
        </Link>
        <PrimaryNav />
      </div>
    </header>
  );
}

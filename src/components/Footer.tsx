import Link from "next/link";

import { BrandMark } from "@/components/BrandMark";
import { Container } from "@/components/Container";
import { navItems, site } from "@/config/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-gold bg-ink pb-[calc(5.5rem+env(safe-area-inset-bottom))] text-cream xl:pb-0">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex gap-3 sm:col-span-2 lg:col-span-1">
          <BrandMark className="h-12 w-12 shrink-0" />
          <div>
            <p className="break-words font-display text-xl uppercase tracking-wide">{site.name}</p>
            <p className="mt-2 text-sm text-cream/80">{site.serviceArea}</p>
          </div>
        </div>

        <div className="min-w-0">
          <h2 className="font-display text-sm uppercase tracking-[0.18em] text-gold">Contact</h2>
          <address className="mt-3 not-italic text-sm leading-relaxed">
            <p>
              <a className="text-gold hover:underline" href={site.phoneHref}>
                {site.phone}
              </a>
            </p>
            <p className="mt-2">
              <a className="break-all text-gold hover:underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
            <p className="mt-2 text-cream/80">{site.address}</p>
          </address>
        </div>

        <div>
          <h2 className="font-display text-sm uppercase tracking-[0.18em] text-gold">Hours</h2>
          <ul className="mt-3 space-y-2 text-sm text-cream/80">
            {site.hours.map((entry) => (
              <li key={entry.days}>
                <span className="block font-semibold text-cream">{entry.days}</span>
                {entry.time}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm uppercase tracking-[0.18em] text-gold">Explore</h2>
          <nav aria-label="Footer" className="mt-3">
            <ul className="space-y-2 text-sm uppercase tracking-wide">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-cream/80 hover:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={site.quoteHref} className="text-gold hover:underline">
                  {site.quoteLabel}
                </Link>
              </li>
              <li>
                <Link href={site.privacyHref} className="text-cream/80 hover:text-gold">
                  {site.privacyLabel}
                </Link>
              </li>
            </ul>
          </nav>
          <ul className="mt-6 flex flex-wrap gap-4 text-sm">
            {site.social.map((network) => (
              <li key={network.name}>
                <a
                  href={network.href}
                  className="text-gold hover:underline"
                  rel="noreferrer"
                  target="_blank"
                >
                  {network.name}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="border-t border-gold/20 py-6">
        <p className="text-sm text-cream/70">
          © {site.copyrightYear} {site.name}. All rights reserved.{" "}
          <Link href={site.privacyHref} className="text-gold hover:underline">
            {site.privacyLabel}
          </Link>
        </p>
      </Container>
    </footer>
  );
}

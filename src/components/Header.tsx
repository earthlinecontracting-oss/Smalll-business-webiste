import Link from "next/link";

import { Button } from "@/components/Button";
import { navItems, site } from "@/config/site";

export function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="font-semibold text-neutral-900">
          {site.name}
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center gap-4 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-neutral-700 hover:text-neutral-900">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button href="/quote">Get a quote</Button>
      </div>
    </header>
  );
}

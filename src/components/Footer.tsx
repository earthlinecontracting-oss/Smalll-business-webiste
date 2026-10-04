import Link from "next/link";

import { navItems, site } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-semibold text-neutral-900">{site.name}</p>
          <p className="mt-2 text-sm text-neutral-600">{site.serviceArea}</p>
          <p className="mt-1 text-sm text-neutral-600">
            <a href={site.phoneHref}>{site.phone}</a>
            {" · "}
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-4 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-neutral-700 hover:text-neutral-900">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}

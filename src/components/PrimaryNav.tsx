"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/Button";
import { navItems, site } from "@/config/site";
import { cn } from "@/lib/cn";

const focusableSelector = 'a[href], button:not([disabled])';

export function PrimaryNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();
  const titleId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const dialog = dialogRef.current;
    const toggle = toggleRef.current;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusables = () =>
      dialog ? Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector)) : [];

    const items = focusables();
    items[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const list = focusables();
      if (list.length === 0) {
        return;
      }

      const first = list[0];
      const last = list[list.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      (toggle ?? previous)?.focus();
    };
  }, [open]);

  return (
    <div className="flex items-center gap-3">
      <nav className="hidden xl:block" aria-label="Primary">
        <ul className="flex items-center gap-4">
          {navItems.map((item) => {
            const current = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "whitespace-nowrap text-sm font-semibold uppercase tracking-wide text-cream/90 hover:text-gold",
                    current && "text-gold",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="hidden xl:block">
        <Button href={site.quoteHref} className="px-4">{site.quoteLabel}</Button>
      </div>

      <button
        ref={toggleRef}
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-gold/40 text-cream hover:border-gold xl:hidden"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="dialog"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span aria-hidden="true" className="flex flex-col gap-1.5">
          <span className={cn("block h-0.5 w-5 bg-gold transition", open && "translate-y-2 rotate-45")} />
          <span className={cn("block h-0.5 w-5 bg-gold transition", open && "opacity-0")} />
          <span className={cn("block h-0.5 w-5 bg-gold transition", open && "-translate-y-2 -rotate-45")} />
        </span>
      </button>

      {open ? (
        <div className="xl:hidden">
          <button
            type="button"
            tabIndex={-1}
            className="fixed inset-0 z-40 bg-ink/70"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div
            ref={dialogRef}
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="absolute right-4 top-[calc(100%+0.5rem)] z-50 w-[min(20rem,calc(100vw-2rem))] rounded-md border border-gold/40 bg-ink p-4 shadow-lg"
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.preventDefault();
                setOpen(false);
              }
            }}
          >
            <h2 id={titleId} className="sr-only">
              Site menu
            </h2>
            <nav aria-label="Primary">
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const current = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={current ? "page" : undefined}
                        className={cn(
                          "block min-h-11 rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wide text-cream/90 hover:bg-cream/5 hover:text-gold",
                          current && "text-gold",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="mt-4">
              <Button href={site.quoteHref} className="w-full">
                {site.quoteLabel}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

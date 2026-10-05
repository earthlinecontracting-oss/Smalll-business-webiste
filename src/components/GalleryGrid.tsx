"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useMemo, useState } from "react";

import { Button } from "@/components/Button";
import type { GalleryItem } from "@/config/gallery";
import { cn } from "@/lib/cn";

type GalleryGridProps = {
  items: GalleryItem[];
  showFilters?: boolean;
};

export function GalleryGrid({ items, showFilters = true }: GalleryGridProps) {
  const categories = useMemo(() => {
    const unique = [...new Set(items.map((item) => item.category))];
    unique.sort((a, b) => a.localeCompare(b));
    return unique;
  }, [items]);

  const [category, setCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogTitleId = useId();

  const visible = useMemo(() => {
    if (category === "All") {
      return items;
    }
    return items.filter((item) => item.category === category);
  }, [category, items]);

  const closeLightbox = useCallback(() => {
    setOpenIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setOpenIndex((current) => {
      if (current === null || visible.length === 0) {
        return current;
      }
      return (current + visible.length - 1) % visible.length;
    });
  }, [visible.length]);

  const showNext = useCallback(() => {
    setOpenIndex((current) => {
      if (current === null || visible.length === 0) {
        return current;
      }
      return (current + 1) % visible.length;
    });
  }, [visible.length]);

  useEffect(() => {
    if (openIndex === null) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeLightbox, openIndex, showNext, showPrevious]);

  if (items.length === 0) {
    return (
      <p className="rounded-md border border-gold/30 bg-card p-6 text-muted">
        Photos will appear here after the Drive gallery is synced at build time.
      </p>
    );
  }

  const openItem = openIndex === null ? null : visible[openIndex];

  return (
    <div>
      {showFilters && categories.length > 1 ? (
        <div
          className="mb-6 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter gallery by category"
        >
          {["All", ...categories].map((name) => {
            const selected = category === name;
            return (
              <button
                key={name}
                type="button"
                aria-pressed={selected}
                aria-label={name === "All" ? "Show all photos" : `Show ${name} photos`}
                onClick={() => {
                  setCategory(name);
                  setOpenIndex(null);
                }}
                className={cn(
                  "min-h-11 rounded-md border px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors",
                  selected
                    ? "border-gold bg-gold text-ink"
                    : "border-gold/40 bg-card text-ink hover:bg-gold/20",
                )}
              >
                {name}
              </button>
            );
          })}
        </div>
      ) : null}

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item, index) => (
          <li key={`${item.file}-${item.category}`}>
            <button
              type="button"
              className="group block w-full overflow-hidden rounded-md border border-gold/20 bg-card text-left shadow-sm"
              onClick={() => setOpenIndex(index)}
              aria-label={`Open photo: ${item.alt}`}
            >
              <span className="relative block aspect-[4/3] bg-ink/5">
                <Image
                  src={item.file}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </span>
              <span className="block px-3 py-3">
                <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-gold-dark">
                  {item.category}
                </span>
                <span className="mt-1 block text-sm text-ink">{item.caption}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {openItem ? (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/90 p-3 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogTitleId}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeLightbox();
            }
          }}
        >
          <div className="relative z-10 flex max-h-[min(92dvh,52rem)] w-full max-w-5xl flex-col gap-3 overflow-y-auto rounded-md bg-ink p-3 sm:gap-4 sm:p-4">
            <div className="flex items-start justify-between gap-3 text-cream">
              <div className="min-w-0">
                <p id={dialogTitleId} className="font-display text-lg uppercase tracking-wide sm:text-xl">
                  {openItem.caption}
                </p>
                <p className="mt-1 text-sm text-gold">{openItem.category}</p>
              </div>
              <Button variant="secondary" onClick={closeLightbox} autoFocus>
                Close
              </Button>
            </div>
            <div className="relative aspect-[4/3] min-h-48 w-full overflow-hidden rounded-md bg-black">
              <Image
                src={openItem.file}
                alt={openItem.alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
            {visible.length > 1 ? (
              <div className="grid grid-cols-2 gap-3">
                <Button variant="secondary" onClick={showPrevious} aria-label="Previous photo">
                  Previous
                </Button>
                <Button variant="secondary" onClick={showNext} aria-label="Next photo">
                  Next
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

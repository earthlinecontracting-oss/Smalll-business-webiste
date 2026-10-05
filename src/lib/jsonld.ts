import { services } from "@/config/services";
import { site } from "@/config/site";
import { publicEnv } from "@/lib/env.public";

function siteOrigin(): string {
  return publicEnv.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
}

function absoluteUrl(path: string): string {
  return `${siteOrigin()}${path.startsWith("/") ? path : `/${path}`}`;
}

export function contractorId(): string {
  return `${siteOrigin()}/#contractor`;
}

function telephone(): string {
  const digits = site.phoneHref.replace(/^tel:/, "");
  return digits.startsWith("+") ? digits : `+${digits.replace(/\D/g, "")}`;
}

type JsonLdRecord = Record<string, unknown>;

export function contractorJsonLd(): JsonLdRecord {
  const data: JsonLdRecord = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": contractorId(),
    name: site.name,
    url: siteOrigin(),
    logo: absoluteUrl("/icon-192.png"),
    image: absoluteUrl("/og-image.jpg"),
    telephone: telephone(),
    email: site.email,
    areaServed: site.serviceAreaPlaces.map((city) => ({
      "@type": "City",
      name: city,
    })),
    openingHoursSpecification: site.hours.flatMap((entry) => {
      if (!("opens" in entry) || !("closes" in entry) || !("dayOfWeek" in entry)) {
        return [];
      }

      return [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [...entry.dayOfWeek],
          opens: entry.opens,
          closes: entry.closes,
        },
      ];
    }),
    sameAs: site.social.map((network) => network.href),
  };

  if (site.publicStreetAddress.trim()) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: site.publicStreetAddress.trim(),
      addressLocality: site.address,
      addressCountry: "CA",
    };
  }

  return data;
}

export function servicesJsonLd(): JsonLdRecord {
  return {
    "@context": "https://schema.org",
    "@graph": services.map((service) => ({
      "@type": "Service",
      name: service.name,
      description: service.description,
      provider: {
        "@id": contractorId(),
      },
      areaServed: site.serviceAreaPlaces.map((city) => ({
        "@type": "City",
        name: city,
      })),
    })),
  };
}

export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

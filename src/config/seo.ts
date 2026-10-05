import type { Metadata } from "next";

import { site } from "@/config/site";

const TITLE_LIMIT = 60;
const DESCRIPTION_LIMIT = 155;
const brand = site.name;

export const ogImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: `${brand} excavation and site prep in ${site.address}`,
} as const;

export const publicPagePaths = [
  "/",
  "/about",
  "/services",
  "/gallery",
  "/testimonials",
  "/contact",
  site.quoteHref,
  site.privacyHref,
] as const;

export const homeTitle = `Excavation & Site Prep in Surrey | ${brand}`;
export const homeDescription =
  "Earthline Contracting does excavation, demolition, and site prep for homes and businesses in Surrey and the Lower Mainland, BC.";

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  absolute?: boolean;
};

function assertSeoLimits(fullTitle: string, description: string) {
  if (fullTitle.length > TITLE_LIMIT) {
    throw new Error(`SEO title is ${fullTitle.length} characters (max ${TITLE_LIMIT}): ${fullTitle}`);
  }
  if (description.length > DESCRIPTION_LIMIT) {
    throw new Error(
      `SEO description is ${description.length} characters (max ${DESCRIPTION_LIMIT}): ${description}`,
    );
  }
}

export function pageSeo({ title, description, path, absolute = false }: PageSeoInput): Metadata {
  const fullTitle = absolute ? title : `${title} | ${brand}`;
  assertSeoLimits(fullTitle, description);

  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      type: "website",
      locale: "en_CA",
      siteName: brand,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
  };
}

export const pages = {
  home: pageSeo({
    absolute: true,
    path: "/",
    title: homeTitle,
    description: homeDescription,
  }),
  about: pageSeo({
    path: "/about",
    title: "Local Earthworks in Surrey",
    description:
      "Meet the Surrey crew behind Earthline Contracting. Local excavation, demolition, and site prep across the Lower Mainland, BC.",
  }),
  services: pageSeo({
    path: "/services",
    title: "Excavation in Surrey, BC",
    description:
      "Excavation, demolition, site prep, utilities, and land clearing from Earthline Contracting in Surrey and the Lower Mainland, BC.",
  }),
  gallery: pageSeo({
    path: "/gallery",
    title: "Site Prep Photos in Surrey",
    description:
      "Photos of Earthline Contracting jobs: excavation, site prep, trenching, and land clearing around Surrey and the Lower Mainland, BC.",
  }),
  testimonials: pageSeo({
    path: "/testimonials",
    title: "Surrey Earthworks Reviews",
    description:
      "What clients say about Earthline Contracting earthworks, excavation, and site prep in Surrey and the Lower Mainland, BC.",
  }),
  contact: pageSeo({
    path: "/contact",
    title: "Contact in Surrey, BC",
    description: `Call ${site.contactName} or email Earthline Contracting in ${site.address} for excavation, demolition, and site prep across the Lower Mainland.`,
  }),
  quote: pageSeo({
    path: site.quoteHref,
    title: "Free Quote in Surrey, BC",
    description:
      "Request a free quote for excavation, demolition, or site prep from Earthline Contracting in Surrey and the Lower Mainland, BC.",
  }),
  privacy: pageSeo({
    path: site.privacyHref,
    title: "Privacy Policy",
    description:
      "How Earthline Contracting in Surrey, BC collects and uses quote-form details. Ask for access, correction, or deletion anytime.",
  }),
} satisfies Record<string, Metadata>;

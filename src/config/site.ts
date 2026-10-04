/**
 * Business details live here so pages and components do not hard-code them.
 * Edit this file when the name, phone, address, or service area changes.
 */
export const site = {
  name: "Earthline Contracting EV",
  shortName: "Earthline",
  tagline: "Placeholder tagline — update in src/config/site.ts",
  phone: "+1 (555) 010-0000",
  phoneHref: "tel:+15550100000",
  email: "hello@example.com",
  address: "Address coming soon",
  serviceArea: "Service area coming soon",
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
  },
} as const;

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/quote", label: "Quote" },
  { href: "/contact", label: "Contact" },
] as const;

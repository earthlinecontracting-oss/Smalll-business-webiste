/**
 * Business details live here so pages and components do not hard-code them.
 * Edit this file when the name, phone, address, or service area changes.
 */
export const site = {
  name: "Earthline Contracting",
  shortName: "Earthline",
  tagline: "Commercial and residential earthworks across Surrey, BC.",
  contactName: "Harmeet",
  phone: "+1 (778) 865-4600",
  phoneHref: "tel:+17788654600",
  email: "earthlinecontracting@gmail.com",
  address: "Surrey, BC",
  serviceArea: "Surrey and the Lower Mainland, BC",
  hours: [
    { days: "Monday – Saturday", time: "7:00am – 6:00pm" },
    { days: "Sunday", time: "By appointment" },
  ],
  social: [
    { name: "Facebook", href: "https://www.facebook.com/" },
    { name: "Instagram", href: "https://www.instagram.com/" },
  ],
  quoteHref: "/quote",
  quoteLabel: "Get a Quote",
  heroQuoteLabel: "Get a Free Quote",
  callLabel: "Call",
  headline: "Excavation, demolition, and site prep done right",
  copyrightYear: 2026,
  mapEmbedSrc:
    "https://maps.google.com/maps?q=Surrey,+BC,+Canada&z=10&hl=en&output=embed",
  story: [
    "Earthline Contracting is a local earthworks crew based in Surrey, BC. We take on excavation, demolition, site prep, and related groundwork for homes and commercial lots across the Lower Mainland.",
    "Jobs stay straightforward: a clear quote, a crew that shows up, and a site left ready for the next trade. Whether it is a backyard trench or a larger lot, we keep the same standard of care.",
  ],
  serviceAreaPlaces: [
    "Surrey",
    "Langley",
    "Delta",
    "White Rock",
    "New Westminster",
    "Burnaby",
  ],
} as const;

export const team = [
  {
    name: site.contactName,
    role: "Owner",
    bio: `${site.contactName} runs ${site.shortName} day to day — estimates, scheduling, and work on site. Call or email directly about your next job.`,
  },
] as const;

export const audiences = [
  {
    name: "Residential",
    description: "Home builds, yards, driveways, and smaller site jobs done cleanly.",
  },
  {
    name: "Commercial",
    description: "Lots, access, and earthworks support for business and development sites.",
  },
] as const;

export const services = [
  {
    name: "Utilities",
    description: "Trenching and utility prep for residential and commercial sites.",
    featured: true,
  },
  {
    name: "Excavation",
    description: "Site digging, grading, and material removal for all project types.",
    featured: true,
  },
  {
    name: "Demolition",
    description: "Safe take-down of small structures, concrete, and site obstacles.",
    featured: true,
  },
  {
    name: "Civil Work",
    description: "Drainage, grading, and civil support for local construction jobs.",
    featured: true,
  },
  {
    name: "Draintile",
    description: "Drain tile install for wet yards, foundations, and site drainage.",
    featured: false,
  },
  {
    name: "Trucking",
    description: "Hauling soil, gravel, debris, and fill to and from the job site.",
    featured: false,
  },
  {
    name: "Backfill",
    description: "Compacted backfill after footings, utilities, and demolition work.",
    featured: false,
  },
  {
    name: "Site Prep",
    description: "Ready your lot for build with grading, cleanup, and access work.",
    featured: true,
  },
  {
    name: "Land Clearing",
    description: "Brush, debris, and overgrowth removal before construction.",
    featured: true,
  },
  {
    name: "Preloading",
    description: "Preload fill to settle ground before building on soft soils.",
    featured: false,
  },
  {
    name: "Lock Block",
    description: "Lock-block walls and retaining structures for grades and access.",
    featured: false,
  },
] as const;

export const sellingPoints = [
  {
    title: "Free estimates",
    description: "Clear quotes after we hear the scope and see the site when needed.",
  },
  {
    title: "Residential and commercial",
    description: "Backyard jobs through to larger lots and development site work.",
  },
  {
    title: "Surrey and the Lower Mainland",
    description: "Local earthworks across Surrey, Langley, and nearby cities.",
  },
  {
    title: "Licensed and insured",
    description: "Insured earthworks for homes and businesses across Surrey and Langley.",
  },
] as const;

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
] as const;

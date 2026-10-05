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

export type Service = (typeof services)[number];

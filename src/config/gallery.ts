import generated from "@/config/gallery.generated.json";

export type GalleryItem = {
  file: string;
  caption: string;
  category: string;
  alt: string;
};

/**
 * Hand-curated gallery until Drive sync is configured.
 * Files live in public/gallery/. A successful `npm run sync-gallery` replaces
 * src/config/gallery.generated.json and the hashed WebP files in public/gallery.
 */
export const localGallery: GalleryItem[] = [
  {
    file: "/gallery/work-excavation.jpg",
    caption: "Excavation",
    category: "Excavation",
    alt: "Excavation equipment working a graded job site",
  },
  {
    file: "/gallery/work-site-prep.jpg",
    caption: "Site prep",
    category: "Site Prep",
    alt: "Lot cleared and graded during site preparation",
  },
  {
    file: "/gallery/work-trenching.jpg",
    caption: "Trenching",
    category: "Utilities",
    alt: "Open trench prepared for utilities",
  },
  {
    file: "/gallery/work-civil.jpg",
    caption: "Civil work",
    category: "Civil Work",
    alt: "Civil earthworks and grading on a construction site",
  },
  {
    file: "/gallery/work-clearing.jpg",
    caption: "Land clearing",
    category: "Land Clearing",
    alt: "Land clearing with brush and debris removed from a lot",
  },
];

const synced = generated as GalleryItem[];

export const gallery = synced.length > 0 ? synced : localGallery;

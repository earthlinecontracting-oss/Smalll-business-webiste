import generated from "@/config/gallery.generated.json";

export type GalleryItem = {
  file: string;
  caption: string;
  category: string;
  alt: string;
};

const localWork: GalleryItem[] = [
  {
    file: "/images/work-excavation.jpg",
    caption: "Excavation",
    category: "Excavation",
    alt: "Excavation equipment working a graded job site",
  },
  {
    file: "/images/work-site-prep.jpg",
    caption: "Site prep",
    category: "Site Prep",
    alt: "Lot cleared and graded during site preparation",
  },
  {
    file: "/images/work-trenching.jpg",
    caption: "Trenching",
    category: "Utilities",
    alt: "Open trench prepared for utilities",
  },
  {
    file: "/images/work-civil.jpg",
    caption: "Civil work",
    category: "Civil Work",
    alt: "Civil earthworks and grading on a construction site",
  },
  {
    file: "/images/work-clearing.jpg",
    caption: "Land clearing",
    category: "Land Clearing",
    alt: "Land clearing with brush and debris removed from a lot",
  },
];

const synced = generated as GalleryItem[];

export const gallery = synced.length > 0 ? synced : localWork;

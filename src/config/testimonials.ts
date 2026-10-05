export type StarRating = 1 | 2 | 3 | 4 | 5;

export type Testimonial = {
  customer_name: string;
  location: string;
  rating: StarRating;
  quote: string;
};

/** Replace these sample quotes with real customer feedback. */
export const testimonials: Testimonial[] = [
  {
    customer_name: "A. Patel",
    location: "Surrey",
    rating: 5,
    quote:
      "They prepped our lot quickly, kept us posted, and left the site ready for the next crew.",
  },
  {
    customer_name: "J. Nguyen",
    location: "Langley",
    rating: 5,
    quote:
      "Needed a small demolition and haul-away. Showed up when they said they would and the work was clean.",
  },
  {
    customer_name: "M. Singh",
    location: "Newton",
    rating: 4,
    quote:
      "Good communication on a trenching job. Fair quote and the drainage work has held up.",
  },
];

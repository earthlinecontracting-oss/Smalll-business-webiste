import type { Testimonial } from "@/config/testimonials";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { customer_name, location, rating, quote } = testimonial;

  return (
    <figure className="flex h-full flex-col rounded-lg border border-ink/10 border-t-4 border-t-gold bg-card p-5 sm:p-6">
      <StarRating value={rating} />
      <blockquote className="mt-4 flex-1 text-base leading-relaxed text-ink">
        <p>“{quote}”</p>
      </blockquote>
      <figcaption className="mt-4 text-sm text-muted">
        <span className="font-semibold text-ink">{customer_name}</span>
        <span className="mx-1.5" aria-hidden="true">
          ·
        </span>
        <span>{location}</span>
      </figcaption>
    </figure>
  );
}

function StarRating({ value }: { value: Testimonial["rating"] }) {
  return (
    <p className="flex items-center gap-1 text-gold">
      <span className="sr-only">{`Rated ${value} out of 5 stars`}</span>
      {Array.from({ length: 5 }, (_, index) => {
        const filled = index < value;
        return (
          <span key={index} aria-hidden="true" className={filled ? "text-gold" : "text-ink/20"}>
            ★
          </span>
        );
      })}
    </p>
  );
}

import { Quote, Star } from "lucide-react";

import type { Review } from "@/config/site";
import { initials } from "@/lib/format";

export interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <figure className="flex h-full w-[300px] shrink-0 flex-col justify-between gap-4 rounded-2xl border border-neutral-200 bg-neutral-100 p-3 shadow md:w-[328px] md:rounded-3xl lg:w-[360px] lg:p-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Quote
            className="size-5 fill-primary-500 text-primary-500"
            aria-hidden="true"
          />
          <span
            className="flex gap-1"
            role="img"
            aria-label={`${review.rating} out of 5 stars`}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                aria-hidden="true"
                className={
                  i < review.rating
                    ? "size-4 fill-warning-500 text-warning-500"
                    : "size-4 fill-neutral-200 text-neutral-200"
                }
              />
            ))}
          </span>
        </div>
        <blockquote className="line-clamp-4 text-sh6 text-primary-900 lg:text-sh2">
          “{review.quote}”
        </blockquote>
      </div>
      <figcaption className="flex items-center gap-4">
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-150 text-xs font-semibold text-primary-600 md:text-base"
          aria-hidden="true"
        >
          {initials(review.name)}
        </span>
        <span>
          <span className="block text-xs font-medium text-neutral-500 lg:text-sm">
            {review.name}
          </span>
          <span className="block text-[10px] text-neutral-500 lg:text-sm">
            {review.city} • {review.category}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

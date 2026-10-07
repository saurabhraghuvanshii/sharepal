import type { Review } from "@/config/site";

import { ReviewCard } from "./ReviewCard";

export interface ReviewsProps {
  reviews: readonly Review[];
  stats: readonly { value: string; label: string }[];
}

/**
 * "Served more than 1 Lakh Orders" marquee + stats strip. The track is duplicated for a
 * seamless loop (copy hidden from AT); it pauses on hover/focus and becomes a plain
 * scrollable row under prefers-reduced-motion.
 */
export function Reviews({ reviews, stats }: ReviewsProps) {
  return (
    <section
      aria-labelledby="reviews-title"
      className="flex flex-col gap-5 bg-gray-100 py-8 lg:gap-12 lg:py-12"
    >
      <h2
        id="reviews-title"
        className="px-4 text-center font-ubuntu text-d7 md:text-d4"
      >
        Served more than{" "}
        <span className="text-decorative-orange">1 Lakh Orders</span>
      </h2>

      <div className="group overflow-x-auto py-3 motion-safe:overflow-hidden">
        <div className="flex w-max gap-5 px-4 group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-safe:animate-marquee motion-safe:px-0">
          <ul
            className="flex gap-5 motion-safe:pl-5"
            aria-label="Customer reviews"
          >
            {reviews.map((review) => (
              <li key={review.name}>
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>
          <ul
            className="hidden gap-5 motion-safe:flex"
            aria-hidden="true"
            inert
          >
            {reviews.map((review) => (
              <li key={review.name}>
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <dl className="container grid w-full grid-cols-3 gap-3 border-y-2 border-neutral-150 py-4 md:gap-6 md:py-6">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse gap-2">
            <dt className="text-center text-xs text-gray-800 capitalize sm:text-xl">
              {stat.label}
            </dt>
            <dd className="bg-review-gradient bg-clip-text text-center font-ubuntu text-2xl font-bold text-transparent md:py-3 lg:text-6xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

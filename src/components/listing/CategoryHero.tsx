import { BadgeCheck, Gamepad2, Joystick } from "lucide-react";

export interface CategoryHeroProps {
  title: string;
  subtitle: string;
  brands: readonly string[];
  trustPoints: readonly string[];
}

/**
 * Purple gradient banner from the original. Decorative product renders are proprietary,
 * so lucide gaming icons stand in at the same positions.
 */
export function CategoryHero({
  title,
  subtitle,
  brands,
  trustPoints,
}: CategoryHeroProps) {
  return (
    <section
      aria-labelledby="category-hero-title"
      className="container px-2 pt-3 md:px-4 md:pt-5 lg:px-6"
    >
      <div className="relative flex min-h-[150px] w-full items-center justify-center overflow-hidden rounded-xl bg-gaming-hero shadow-lg md:min-h-[228px] md:shadow-none">
        <Gamepad2
          aria-hidden="true"
          className="absolute -bottom-6 -left-4 hidden size-40 -rotate-12 text-gray-100/10 md:block xl:size-56"
        />
        <Joystick
          aria-hidden="true"
          className="absolute -right-4 -bottom-8 size-32 rotate-12 text-gray-100/10 md:size-40 xl:size-56"
        />
        <div className="relative z-10 flex w-full flex-col items-start gap-1.5 px-4 py-5 text-gray-100 md:items-center md:gap-3 md:text-center">
          <h1
            id="category-hero-title"
            className="font-ubuntu text-h5 leading-tight font-bold tracking-tight capitalize drop-shadow-lg md:text-d5"
          >
            {title}
          </h1>
          <p className="w-[80%] text-b4 font-bold drop-shadow-md md:max-w-[70%] lg:text-sh1 xl:text-h6">
            {subtitle}
          </p>
          <ul
            className="mt-1 flex flex-wrap items-center gap-2 md:mt-3 md:justify-center md:gap-3"
            aria-label="Brands"
          >
            {brands.map((brandName, index) => (
              <li key={brandName} className="flex items-center gap-2 md:gap-3">
                {index > 0 && (
                  <span
                    className="h-4 w-0.5 rounded-full bg-category-purple opacity-70 md:h-6 md:w-[3px]"
                    aria-hidden="true"
                  />
                )}
                <span className="font-ubuntu text-xs font-bold tracking-wide text-gray-100/90 uppercase md:text-sm">
                  {brandName}
                </span>
              </li>
            ))}
          </ul>
          <ul
            className="mt-2 hidden flex-wrap justify-center gap-2 md:flex"
            aria-label="Why rent with us"
          >
            {trustPoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-1.5 rounded-full bg-gray-100/15 px-3 py-1 text-b6 text-gray-100 backdrop-blur-sm"
              >
                <BadgeCheck
                  className="size-3.5 text-secondary-500"
                  aria-hidden="true"
                />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

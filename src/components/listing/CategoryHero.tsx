import Image from "next/image";

export interface CategoryHeroProps {
  title: string;
  subtitle: string;
  brands: readonly string[];
  /** Decorative product shots flanking the copy (URLs from product-list.json). */
  leftImage?: string;
  rightImage?: string;
}

/**
 * Purple gradient banner from the original, sized to the product grid's column.
 * The original's character artwork is proprietary, so real product photos from the
 * JSON flank the copy as tilted tiles (their white backgrounds read as cards).
 */
export function CategoryHero({
  title,
  subtitle,
  brands,
  leftImage,
  rightImage,
}: CategoryHeroProps) {
  return (
    <div className="relative flex min-h-[150px] w-full items-center overflow-hidden rounded-xl bg-gaming-hero shadow-lg md:min-h-[228px] md:rounded-2xl md:shadow-none">
      {leftImage && (
        <div className="absolute top-1/2 left-[4%] hidden aspect-square w-[15%] max-w-44 -translate-y-1/2 -rotate-6 overflow-hidden rounded-3xl bg-gray-100 shadow-medium ring-4 ring-gray-100/20 transition-transform duration-500 hover:-rotate-3 md:block">
          <Image
            src={leftImage}
            alt=""
            fill
            preload
            sizes="(min-width: 1024px) 176px, 15vw"
            className="object-contain p-2"
          />
        </div>
      )}
      {rightImage && (
        <div className="absolute top-1/2 right-[4%] aspect-square w-[26%] max-w-44 -translate-y-1/2 rotate-6 overflow-hidden rounded-2xl bg-gray-100 shadow-medium ring-4 ring-gray-100/20 transition-transform duration-500 hover:rotate-3 md:w-[15%] md:rounded-3xl">
          <Image
            src={rightImage}
            alt=""
            fill
            preload
            sizes="(min-width: 1024px) 176px, 26vw"
            className="object-contain p-2"
          />
        </div>
      )}

      <div className="relative z-10 flex w-full flex-col items-start gap-1.5 py-5 pr-[34%] pl-4 text-gray-100 md:items-center md:gap-3 md:px-[22%] md:text-center">
        <h1
          id="category-hero-title"
          className="font-ubuntu text-h5 leading-tight font-bold tracking-tight capitalize drop-shadow-lg md:text-d5"
        >
          {title}
        </h1>
        <p className="text-b4 font-bold drop-shadow-md lg:text-sh1 xl:text-h6">
          {subtitle}
        </p>
        <ul
          className="mt-1 flex flex-wrap items-center gap-2 md:mt-2 md:justify-center md:gap-4"
          aria-label="Brands"
        >
          {brands.map((brandName, index) => (
            <li key={brandName} className="flex items-center gap-2 md:gap-4">
              {index > 0 && (
                <span
                  className="h-4 w-px rounded-full bg-gray-100/40 md:h-6"
                  aria-hidden="true"
                />
              )}
              <span className="font-ubuntu text-xs font-bold tracking-wide text-gray-100/90 uppercase md:text-base">
                {brandName}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

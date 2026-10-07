import { MapPin } from "lucide-react";

import type { City, LinkItem } from "@/config/site";

export interface RelatedLinksProps {
  categories: readonly LinkItem[];
  cities: readonly City[];
  cityHref: (city: City) => string;
  currentCity: string;
}

export function RelatedLinks({
  categories,
  cities,
  cityHref,
  currentCity,
}: RelatedLinksProps) {
  return (
    <section
      aria-labelledby="related-title"
      className="container flex flex-col gap-6 pb-12"
    >
      <h2 id="related-title" className="sr-only">
        Related pages
      </h2>
      <div>
        <h3 className="mb-3 text-sh3 text-neutral-900">Explore more on rent</h3>
        <ul className="flex flex-wrap gap-2">
          {categories.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block rounded-full border border-neutral-200 bg-gray-100 px-4 py-2 text-b4 text-neutral-700 transition-colors duration-300 hover:border-primary-250 hover:text-primary-500"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="mb-3 text-sh3 text-neutral-900">
          Gaming gadgets on rent in other cities
        </h3>
        <ul className="flex flex-wrap gap-2">
          {cities
            .filter((city) => city.slug !== currentCity)
            .map((city) => (
              <li key={city.slug}>
                <a
                  href={cityHref(city)}
                  className="flex items-center gap-1.5 rounded-full border border-neutral-200 bg-gray-100 px-4 py-2 text-b4 text-neutral-700 transition-colors duration-300 hover:border-primary-250 hover:text-primary-500"
                >
                  <MapPin className="size-3.5" aria-hidden="true" />
                  {city.name}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { CategoryHero } from "@/components/listing/CategoryHero";
import { ListingClient } from "@/components/listing/ListingClient";
import { ListingFallback } from "@/components/listing/ListingFallback";
import { Benefits } from "@/components/sections/Benefits";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { Reviews } from "@/components/sections/Reviews";
import { SeoContent } from "@/components/sections/SeoContent";
import {
  benefits,
  brand,
  categoryPages,
  cities,
  DEFAULT_CITY,
  FAQ_VISIBLE_COUNT,
  faqs,
  howItWorks,
  LIVE_SITE,
  relatedCategories,
  reviews,
  seoContent,
  SITE_URL,
  stats,
} from "@/config/site";
import { getFacets, getProductsByCategory, sortProducts } from "@/lib/products";

const PAGE_SIZE = 12;

/** Only the Bangalore gaming listing is backed by data/product-list.json. */
const SUPPORTED_CITIES = [DEFAULT_CITY];

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED_CITIES.flatMap((city) =>
    Object.keys(categoryPages).map((category) => ({ city, category })),
  );
}

function resolve(citySlug: string, categorySlug: string) {
  const city = SUPPORTED_CITIES.includes(citySlug)
    ? cities.find((c) => c.slug === citySlug)
    : undefined;
  const category = categoryPages[categorySlug];
  return city && category ? { city, category } : null;
}

export async function generateMetadata({
  params,
}: PageProps<"/[city]/[category]">): Promise<Metadata> {
  const { city: citySlug, category: categorySlug } = await params;
  const page = resolve(citySlug, categorySlug);
  if (!page) return {};
  const { city, category } = page;
  const path = `/${city.slug}/${category.slug}`;
  const title = category.metaTitle(city.name);
  const description = category.metaDescription(city.name);
  return {
    title,
    description,
    keywords: category.keywords(city.name),
    alternates: { canonical: path },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: path,
      siteName: brand.name,
      title,
      description,
      locale: "en_IN",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CategoryPage({
  params,
}: PageProps<"/[city]/[category]">) {
  const { city: citySlug, category: categorySlug } = await params;
  const page = resolve(citySlug, categorySlug);
  if (!page) notFound();
  const { city, category } = page;

  const products = getProductsByCategory(category.slug);
  const path = `/${city.slug}/${category.slug}`;
  const defaultOrder = sortProducts(products, "popular");

  // Banner photos: the top "Racing & Remote Play" product on the left, top PS5 combo on
  // the right (falls back to the most popular products if a group is missing).
  const covers = getFacets(products).subcategories;
  const leftImage =
    covers.find((s) => s.slug === "accessories")?.image ??
    defaultOrder[1]?.image;
  const rightImage =
    covers.find((s) => s.slug === "ps5-combos")?.image ??
    defaultOrder[0]?.image;
  const hero = (
    <CategoryHero
      title={category.heroTitle}
      subtitle={category.heroSubtitle}
      brands={category.heroBrands}
      leftImage={leftImage}
      rightImage={rightImage}
    />
  );

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${category.breadcrumbLabel} in ${city.name}`,
    url: new URL(path, SITE_URL).toString(),
    numberOfItems: defaultOrder.length,
    itemListElement: defaultOrder.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        image: product.image,
        brand: { "@type": "Brand", name: brand.name },
        ...(product.rating > 0 && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            bestRating: 5,
            ratingCount: product.booked_count,
          },
        }),
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: product.per_day_rent,
          availability:
            product.out_of_stock || product.tag === "Vote to Launch"
              ? "https://schema.org/OutOfStock"
              : "https://schema.org/InStock",
        },
      },
    })),
  };

  return (
    <>
      <Suspense
        fallback={
          <ListingFallback
            products={defaultOrder}
            title={category.listTitle}
            pageSize={PAGE_SIZE}
            hero={hero}
          />
        }
      >
        <ListingClient
          products={products}
          title={category.listTitle}
          pageSize={PAGE_SIZE}
          hero={hero}
        />
      </Suspense>
      <FaqAccordion faqs={faqs} visibleCount={FAQ_VISIBLE_COUNT} />
      <Reviews reviews={reviews} stats={stats} />
      <HowItWorks steps={howItWorks} />
      <Benefits items={benefits} />
      <SeoContent title={seoContent.title} paragraphs={seoContent.paragraphs} />
      <RelatedLinks
        categories={relatedCategories}
        cities={cities}
        currentCity={city.slug}
        cityHref={(c) => `${LIVE_SITE}/${c.slug}/${category.slug}`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}

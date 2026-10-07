"use client";

import { Bell, BellRing, Check, Heart, Plus, Vote } from "lucide-react";

import { useRental } from "@/components/layout/RentalProvider";
import { useCart } from "@/hooks/useCart";
import { useStoredIds } from "@/hooks/useStoredIds";
import { cn } from "@/lib/cn";
import { rentalDays } from "@/lib/dates";
import { formatCount, formatINR } from "@/lib/format";
import type { Product, ProductTag } from "@/types/product";

import { ProductImage } from "./ProductImage";

export interface ProductCardProps {
  product: Product;
  preloadImage?: boolean;
}

const WISHLIST_KEY = "sharepal:wishlist";
const NOTIFY_KEY = "sharepal:notify";
const VOTES_KEY = "sharepal:votes";

const TAG_STYLES: Record<Exclude<ProductTag, "">, string> = {
  Trending: "border-warning-600 text-warning-600",
  New: "border-success-600 text-success-600",
  "Vote to Launch": "border-category-purple text-category-purple",
};

const roundButton =
  "flex size-11 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95 md:size-12";

/**
 * Listing card after the owner's screenshot: white image tile with an outlined tag,
 * name, divider, rent line + price + GST chip, and a round action button.
 */
export function ProductCard({
  product,
  preloadImage = false,
}: ProductCardProps) {
  const { dates, openDatePicker } = useRental();
  const wishlist = useStoredIds(WISHLIST_KEY);
  const cart = useCart();
  const notify = useStoredIds(NOTIFY_KEY);
  const votes = useStoredIds(VOTES_KEY);

  const isLaunch = product.tag === "Vote to Launch";
  const isOut = product.out_of_stock && !isLaunch;
  const inCart = cart.has(product.id);
  const wished = wishlist.has(product.id);
  const voted = votes.has(product.id);
  const notifying = notify.has(product.id);
  const titleId = `product-${product.id}-title`;

  // Flat estimate: per-day rent × chargeable days (the live long-rental discount isn't in the data).
  const days = dates ? rentalDays(dates.delivery, dates.pickup) : 0;
  const price = days > 0 ? product.per_day_rent * days : product.per_day_rent;

  return (
    <article
      id={`product-${product.id}`}
      aria-labelledby={titleId}
      className="group relative flex h-full scroll-mt-40 flex-col rounded-3xl target:ring-2 target:ring-primary-500 target:ring-offset-4"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 transition-[box-shadow,transform] duration-300 group-hover:-translate-y-1 group-hover:shadow-medium md:rounded-3xl">
        <ProductImage
          src={product.image}
          alt={product.name}
          preload={preloadImage}
          dimmed={isOut}
        />

        {product.tag && (
          <span
            className={cn(
              "absolute top-2 left-2 rounded-lg border-2 bg-gray-100 px-2 py-0.5 text-[11px] leading-4 font-semibold md:top-3 md:left-3 md:px-2.5 md:text-[13px]",
              TAG_STYLES[product.tag],
            )}
          >
            {product.tag}
          </span>
        )}

        {isOut && (
          <span className="absolute inset-x-0 bottom-3 mx-auto w-max rounded-full bg-neutral-900/80 px-3 py-1 text-[11px] font-semibold text-gray-100 md:text-xs">
            Out of stock
          </span>
        )}

        <button
          type="button"
          onClick={() => wishlist.toggle(product.id)}
          aria-pressed={wished}
          aria-label={
            wished
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          className={cn(
            "absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-gray-100/90 text-neutral-400 transition-[opacity,color,transform] duration-300 hover:scale-110 hover:text-destructive-500 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none md:top-3 md:right-3",
            // Desktop: reveal on hover to keep the tile clean, like the original.
            !wished && "md:opacity-0 md:group-hover:opacity-100",
          )}
        >
          <Heart
            className={cn(
              "size-4",
              wished && "fill-destructive-500 text-destructive-500",
            )}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-1 pt-3 md:px-2 md:pt-4">
        <h3
          id={titleId}
          className="line-clamp-2 min-h-10 text-sh5 text-neutral-900 md:min-h-12 md:text-[1.0625rem] md:leading-6 md:font-semibold"
        >
          {product.name}
        </h3>

        <div className="mt-2 flex flex-1 items-end justify-between gap-2 border-t border-neutral-200 pt-2.5">
          <div className="min-w-0">
            {isLaunch ? (
              <>
                <p className="text-b6 text-neutral-500 md:text-b4">
                  Launching soon
                </p>
                <p className="mt-0.5 text-sh4 text-neutral-900 md:text-h6">
                  {formatCount(product.booked_count + (voted ? 1 : 0))}+ votes
                </p>
              </>
            ) : (
              <>
                <p className="text-b6 text-neutral-500 md:text-b4">
                  {days > 0 ? (
                    <>
                      Rent for{" "}
                      <strong className="font-semibold text-neutral-900">
                        {days}
                      </strong>{" "}
                      {days === 1 ? "day" : "days"}
                    </>
                  ) : (
                    "Rent per day"
                  )}
                </p>
                <p
                  className={cn(
                    "mt-0.5 font-inter text-sh4 md:text-h6",
                    isOut ? "text-neutral-400" : "text-neutral-900",
                  )}
                >
                  {formatINR(price)}
                </p>
                <span className="mt-1 inline-block rounded-sm bg-secondary-500 px-1.5 py-px text-[10px] leading-4 font-semibold text-secondary-900 md:px-2 md:text-xs">
                  Incl. of GST
                </span>
              </>
            )}
          </div>

          {isLaunch ? (
            <button
              type="button"
              onClick={() => votes.toggle(product.id)}
              aria-pressed={voted}
              aria-label={
                voted
                  ? `Remove vote for ${product.name}`
                  : `Vote to launch ${product.name}`
              }
              className={cn(
                roundButton,
                voted
                  ? "border-category-purple bg-category-purple text-gray-100"
                  : "border-category-purple text-category-purple hover:bg-category-purple hover:text-gray-100",
              )}
            >
              {voted ? (
                <Check className="size-5" aria-hidden="true" />
              ) : (
                <Vote className="size-5" aria-hidden="true" />
              )}
            </button>
          ) : isOut ? (
            <button
              type="button"
              onClick={() => notify.toggle(product.id)}
              aria-pressed={notifying}
              aria-label={
                notifying
                  ? `Stop notifications for ${product.name}`
                  : `Notify me when ${product.name} is back in stock`
              }
              className={cn(
                roundButton,
                notifying
                  ? "border-primary-900 bg-primary-900 text-gray-100"
                  : "border-neutral-300 text-neutral-500 hover:border-primary-900 hover:text-primary-900",
              )}
            >
              {notifying ? (
                <BellRing className="size-5" aria-hidden="true" />
              ) : (
                <Bell className="size-5" aria-hidden="true" />
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                cart.add(product.id);
                if (!dates) openDatePicker();
              }}
              aria-label={
                inCart
                  ? `${product.name} is in your cart`
                  : `Add ${product.name} to cart`
              }
              className={cn(
                roundButton,
                inCart
                  ? "border-primary-900 bg-primary-900 text-gray-100"
                  : "border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-gray-100",
              )}
            >
              {inCart ? (
                <Check className="size-5" aria-hidden="true" />
              ) : (
                <Plus className="size-5" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

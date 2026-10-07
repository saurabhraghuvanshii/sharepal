"use client";

import {
  CalendarClock,
  CalendarPlus,
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  ShoppingCart,
  TicketPercent,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useId, useState } from "react";

import { Button, Sheet } from "@/components/ui";
import { coupons, LIVE_SITE } from "@/config/site";
import { MAX_QTY, useCart } from "@/hooks/useCart";
import { cn } from "@/lib/cn";
import { applyCoupon } from "@/lib/coupon";
import { formatOrdinalDate, rentalDays } from "@/lib/dates";
import { formatINR } from "@/lib/format";
import { subcategoryLabelOf } from "@/lib/products";
import type { ProductSummary } from "@/types/product";

import { useRental } from "./RentalProvider";

export interface CartSheetProps {
  open: boolean;
  onClose: () => void;
  products: readonly ProductSummary[];
}

/** Local-only cart after the owner's screenshot (no backend in this build). */
export function CartSheet({ open, onClose, products }: CartSheetProps) {
  const cart = useCart();
  const { dates, openDatePicker } = useRental();
  const [couponInput, setCouponInput] = useState("");
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [showCoupons, setShowCoupons] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const couponListId = useId();
  const breakdownId = useId();

  const days = dates ? rentalDays(dates.delivery, dates.pickup) : 0;
  const items = cart.lines.flatMap((line) => {
    const product = products.find((p) => p.id === line.id);
    return product
      ? [
          {
            product,
            qty: line.qty,
            total: product.per_day_rent * Math.max(days, 1) * line.qty,
          },
        ]
      : [];
  });
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);

  // Re-validate the applied coupon against the current subtotal on every render.
  const applied = appliedCode
    ? applyCoupon(appliedCode, subtotal, coupons)
    : null;
  const discount = applied?.ok ? applied.discount : 0;
  const total = subtotal - discount;

  function tryCoupon(code: string) {
    const result = applyCoupon(code, subtotal, coupons);
    setCouponMessage(result.message);
    setAppliedCode(result.ok ? result.coupon.code : null);
    if (result.ok) setCouponInput(result.coupon.code);
  }

  const footer = items.length > 0 && (
    <div className="flex flex-col gap-3">
      {/* Rental dates */}
      <div className="flex items-center gap-2 rounded-full border-2 border-neutral-200 py-1 pr-1 pl-4 text-b6 text-neutral-700 md:text-b4">
        <span className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-0.5">
          <span className="flex items-center gap-1.5">
            <CalendarClock
              className="size-4 shrink-0 text-neutral-900"
              aria-hidden="true"
            />
            Delivery Date:{" "}
            <strong className="font-semibold text-neutral-900">
              {dates ? formatOrdinalDate(dates.delivery) : "—"}
            </strong>
          </span>
          <span
            className="hidden h-4 w-px bg-neutral-250 sm:block"
            aria-hidden="true"
          />
          <span className="flex items-center gap-1.5">
            <CalendarClock
              className="size-4 shrink-0 text-neutral-900"
              aria-hidden="true"
            />
            Pickup Date:{" "}
            <strong className="font-semibold text-neutral-900">
              {dates ? formatOrdinalDate(dates.pickup) : "—"}
            </strong>
          </span>
        </span>
        <button
          type="button"
          onClick={openDatePicker}
          className="flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-primary-900 px-4 text-sm font-semibold text-gray-100 transition-colors hover:bg-primary-800 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 focus-visible:outline-none"
        >
          <CalendarPlus className="size-4" aria-hidden="true" />
          {dates ? "Edit" : "Select"}
        </button>
      </div>

      {/* Coupon */}
      <div className="flex flex-col items-end gap-1.5">
        <form
          className="flex w-full items-center gap-2 rounded-full border-2 border-neutral-200 py-1 pr-1 pl-3 focus-within:border-primary-500 sm:w-[21rem]"
          onSubmit={(event) => {
            event.preventDefault();
            if (couponInput.trim()) tryCoupon(couponInput);
          }}
        >
          <TicketPercent
            className="size-5 shrink-0 text-neutral-700"
            aria-hidden="true"
          />
          <label htmlFor="coupon-code" className="sr-only">
            Coupon code
          </label>
          <input
            id="coupon-code"
            value={couponInput}
            onChange={(event) => {
              setCouponInput(event.target.value);
              setCouponMessage(null);
            }}
            placeholder="Enter coupon code"
            autoComplete="off"
            className="h-8 min-w-0 flex-1 bg-transparent text-b4 text-neutral-900 uppercase placeholder:text-neutral-400 placeholder:normal-case focus:outline-none"
          />
          {applied?.ok ? (
            <button
              type="button"
              onClick={() => {
                setAppliedCode(null);
                setCouponInput("");
                setCouponMessage(null);
              }}
              className="h-8 rounded-full px-4 text-sm font-semibold text-destructive-600 hover:bg-destructive-100"
            >
              Remove
            </button>
          ) : (
            <button
              type="submit"
              disabled={!couponInput.trim()}
              className="h-8 rounded-full bg-primary-900 px-5 text-sm font-semibold text-gray-100 transition-colors hover:bg-primary-800 disabled:bg-neutral-300"
            >
              Apply
            </button>
          )}
        </form>
        {(couponMessage || (appliedCode && applied && !applied.ok)) && (
          <p
            role="status"
            className={cn(
              "text-right text-b6",
              applied?.ok ? "text-success-600" : "text-destructive-600",
            )}
          >
            {appliedCode && applied && !applied.ok
              ? applied.message
              : couponMessage}
          </p>
        )}
        <button
          type="button"
          aria-expanded={showCoupons}
          aria-controls={couponListId}
          onClick={() => setShowCoupons((v) => !v)}
          className="flex items-center gap-0.5 text-sh7 text-primary-500 hover:underline"
        >
          View Coupons
          <ChevronDown
            className={cn(
              "size-3.5 transition-transform",
              showCoupons && "rotate-180",
            )}
            aria-hidden="true"
          />
        </button>
        {showCoupons && (
          <ul id={couponListId} className="flex w-full flex-col gap-2">
            {coupons.map((c) => (
              <li
                key={c.code}
                className="flex items-center justify-between gap-3 rounded-2xl border border-dashed border-primary-250 bg-primary-100 px-3 py-2"
              >
                <span className="min-w-0">
                  <span className="block text-sh5 text-primary-900">
                    {c.code}
                  </span>
                  <span className="block text-b6 text-neutral-500">
                    {c.percent}% off on orders above {formatINR(c.minOrder)} ·
                    max {formatINR(c.maxDiscount)}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => tryCoupon(c.code)}
                  className="h-8 shrink-0 rounded-full bg-primary-500 px-4 text-sm font-semibold text-gray-100 hover:bg-primary-600"
                >
                  Apply
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Totals */}
      <div className="border-t border-neutral-200 pt-3">
        {showBreakdown && (
          <dl id={breakdownId} className="mb-3 flex flex-col gap-1.5 text-b4">
            <div className="flex justify-between text-neutral-500">
              <dt>
                Rent{" "}
                {days > 0
                  ? `for ${days} ${days === 1 ? "day" : "days"}`
                  : "per day"}
              </dt>
              <dd className="text-neutral-900">{formatINR(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-neutral-500">
              <dt>Delivery & pickup</dt>
              <dd className="text-success-600">Free</dd>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-neutral-500">
                <dt>Coupon ({appliedCode})</dt>
                <dd className="text-success-600">− {formatINR(discount)}</dd>
              </div>
            )}
          </dl>
        )}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
          <button
            type="button"
            aria-expanded={showBreakdown}
            aria-controls={breakdownId}
            onClick={() => setShowBreakdown((v) => !v)}
            className="min-w-0 text-left"
          >
            <span className="flex items-center gap-1 text-h6 whitespace-nowrap text-neutral-900 md:text-h5">
              Total Charges
              <ChevronUp
                className={cn(
                  "size-4 transition-transform",
                  !showBreakdown && "rotate-180",
                )}
                aria-hidden="true"
              />
            </span>
            <span className="block text-b6 text-neutral-500">
              Price incl. of all taxes
            </span>
          </button>
          <p className="ml-auto font-inter text-h4 font-bold text-neutral-900 md:text-[1.75rem]">
            {formatINR(total)}
            {days === 0 && (
              <span className="text-b4 font-medium text-neutral-500">/day</span>
            )}
          </p>
          {dates ? (
            <a
              href={LIVE_SITE}
              className="flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-primary-500 px-5 text-sm font-semibold text-gray-100 transition-colors hover:bg-primary-600 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto md:text-base"
            >
              <ShoppingCart className="size-4" aria-hidden="true" />
              Go to Checkout
            </a>
          ) : (
            <button
              type="button"
              onClick={openDatePicker}
              className="flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-primary-500 px-5 text-sm font-semibold text-gray-100 transition-colors hover:bg-primary-600 sm:w-auto md:text-base"
            >
              <CalendarPlus className="size-4" aria-hidden="true" />
              Select Dates
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Cart Items"
      side="right"
      closeAtStart
      className="md:w-[40rem]"
      bodyClassName="bg-page pt-6"
      headerAside={
        <span className="rounded-full bg-neutral-150 px-3 py-1.5 text-sh7 text-neutral-500">
          {items.length} Items added
        </span>
      }
      footer={footer}
    >
      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-primary-100 text-primary-500">
            <ShoppingCart className="size-6" aria-hidden="true" />
          </span>
          <p className="text-sh3 text-primary-900">Your cart is empty</p>
          <p className="text-b4 text-neutral-500">
            Add a console or combo to get started.
          </p>
          <Button variant="soft" onClick={onClose}>
            Browse gaming gadgets
          </Button>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map(({ product, qty, total: lineTotal }) => (
            <li
              key={product.id}
              className="flex gap-4 rounded-2xl bg-gray-100 p-3"
            >
              <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100 md:size-24">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="96px"
                  className="object-contain p-1.5"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sh4 text-neutral-900">
                      {product.name}
                    </p>
                    <p className="text-b6 text-neutral-500">
                      {subcategoryLabelOf(product) ?? "Gaming Console"}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sh4 text-neutral-900">
                      {formatINR(lineTotal)}
                    </p>
                    <p className="text-b6 text-neutral-500">
                      {days > 0
                        ? `Rent for ${days} ${days === 1 ? "day" : "days"}`
                        : "Rent per day"}
                    </p>
                  </div>
                </div>
                <div className="mt-1 flex items-center gap-4">
                  <div
                    role="group"
                    aria-label={`Quantity for ${product.name}`}
                    className="flex h-8 items-center gap-1 rounded-full border-2 border-primary-900 px-1"
                  >
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      disabled={qty <= 1}
                      onClick={() => cart.setQty(product.id, qty - 1)}
                      className="flex size-6 items-center justify-center rounded-full text-primary-500 hover:bg-primary-100 disabled:text-neutral-300 disabled:hover:bg-transparent"
                    >
                      <Minus className="size-3.5" aria-hidden="true" />
                    </button>
                    <span
                      className="min-w-4 text-center text-sh5 text-neutral-900"
                      aria-live="polite"
                    >
                      {qty}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      disabled={qty >= MAX_QTY}
                      onClick={() => cart.setQty(product.id, qty + 1)}
                      className="flex size-6 items-center justify-center rounded-full text-primary-500 hover:bg-primary-100 disabled:text-neutral-300 disabled:hover:bg-transparent"
                    >
                      <Plus className="size-3.5" aria-hidden="true" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => cart.remove(product.id)}
                    aria-label={`Remove ${product.name} from cart`}
                    className="flex size-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-destructive-100 hover:text-destructive-600"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Sheet>
  );
}

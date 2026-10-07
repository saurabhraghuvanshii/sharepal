import type { Coupon } from "@/config/site";

import { formatINR } from "./format";

export type CouponResult =
  | { ok: true; coupon: Coupon; discount: number; message: string }
  | { ok: false; message: string };

/** Validates a code against the known coupons for the given subtotal. */
export function applyCoupon(
  code: string,
  subtotal: number,
  coupons: readonly Coupon[],
): CouponResult {
  const coupon = coupons.find((c) => c.code === code.trim().toUpperCase());
  if (!coupon) return { ok: false, message: "This coupon code isn't valid." };
  if (subtotal < coupon.minOrder) {
    return {
      ok: false,
      message: `Add ${formatINR(coupon.minOrder - subtotal)} more to use ${coupon.code} (orders above ${formatINR(coupon.minOrder)}).`,
    };
  }
  const discount = Math.min(
    Math.round((subtotal * coupon.percent) / 100),
    coupon.maxDiscount,
  );
  return {
    ok: true,
    coupon,
    discount,
    message: `${coupon.code} applied — you save ${formatINR(discount)}.`,
  };
}

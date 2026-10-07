const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** Formats a rupee amount for display, rounding to whole rupees (e.g. 158.25 → "₹158"). */
export function formatINR(amount: number): string {
  return inrFormatter.format(Math.round(amount));
}

/** Compact Indian-style count: 649 → "649", 2527 → "2.5K", 10000 → "10K". */
export function formatCount(count: number): string {
  if (count < 1000) return String(count);
  const thousands = count / 1000;
  return `${Number.isInteger(thousands) ? thousands : thousands.toFixed(1)}K`;
}

/** Two-letter initials for avatar chips: "Satyaki B" → "SB". */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

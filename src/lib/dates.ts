const DAY_MS = 86_400_000;

function parse(iso: string): Date {
  const [y = 0, m = 1, d = 1] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function addDays(iso: string, days: number): string {
  return toISODate(new Date(parse(iso).getTime() + days * DAY_MS));
}

export function todayISO(): string {
  const now = new Date();
  return toISODate(
    new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())),
  );
}

/**
 * Chargeable rental days per SharePal's FAQ: rental starts the day after delivery and
 * ends the day before pickup (deliver 5th, return 8th → 2 days).
 */
export function rentalDays(delivery: string, pickup: string): number {
  return Math.max(
    0,
    Math.round((parse(pickup).getTime() - parse(delivery).getTime()) / DAY_MS) -
      1,
  );
}

const shortDate = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

export function formatShortDate(iso: string): string {
  return shortDate.format(parse(iso));
}

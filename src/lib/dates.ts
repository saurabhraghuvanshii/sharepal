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

/** First day of the month containing `iso`, as an ISO date. */
export function startOfMonth(iso: string): string {
  return `${iso.slice(0, 7)}-01`;
}

export function addMonths(iso: string, months: number): string {
  const d = parse(startOfMonth(iso));
  return toISODate(
    new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + months, 1)),
  );
}

export function isSameMonth(a: string, b: string): boolean {
  return a.slice(0, 7) === b.slice(0, 7);
}

export interface CalendarDay {
  iso: string;
  day: number;
  inMonth: boolean;
}

/** Sunday-first weeks covering the month of `monthISO`, padded with adjacent-month days. */
export function monthWeeks(monthISO: string): CalendarDay[][] {
  const first = parse(startOfMonth(monthISO));
  const gridStart = addDays(toISODate(first), -first.getUTCDay());
  const month = first.getUTCMonth();
  const weeks: CalendarDay[][] = [];
  for (let w = 0; w < 6; w += 1) {
    const week: CalendarDay[] = [];
    for (let d = 0; d < 7; d += 1) {
      const iso = addDays(gridStart, w * 7 + d);
      const date = parse(iso);
      week.push({
        iso,
        day: date.getUTCDate(),
        inMonth: date.getUTCMonth() === month,
      });
    }
    // Drop a trailing week that belongs entirely to the next month.
    if (w > 3 && week.every((day) => !day.inMonth)) break;
    weeks.push(week);
  }
  return weeks;
}

export const WEEKDAY_LABELS = [
  "Su",
  "Mo",
  "Tu",
  "We",
  "Th",
  "Fr",
  "Sa",
] as const;

const monthTitle = new Intl.DateTimeFormat("en-IN", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatMonthTitle(iso: string): string {
  return monthTitle.format(parse(iso));
}

const longDate = new Intl.DateTimeFormat("en-IN", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatLongDate(iso: string): string {
  return longDate.format(parse(iso));
}

/** Same day-of-month `months` away, clamped to that month's length (31 Jan + 1 → 28/29 Feb). */
export function shiftMonthKeepDay(iso: string, months: number): string {
  const d = parse(iso);
  const target = new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + months, 1),
  );
  const daysInTarget = new Date(
    Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0),
  ).getUTCDate();
  target.setUTCDate(Math.min(d.getUTCDate(), daysInTarget));
  return toISODate(target);
}

function ordinal(n: number): string {
  const rem100 = n % 100;
  if (rem100 >= 11 && rem100 <= 13) return `${n}th`;
  return `${n}${({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[n % 10] ?? "th"}`;
}

const monthShort = new Intl.DateTimeFormat("en-IN", {
  month: "short",
  timeZone: "UTC",
});

/** "2026-11-01" → "1st Nov". */
export function formatOrdinalDate(iso: string): string {
  const d = parse(iso);
  return `${ordinal(d.getUTCDate())} ${monthShort.format(d)}`;
}

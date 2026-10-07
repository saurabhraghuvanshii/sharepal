"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/cn";
import {
  addDays,
  addMonths,
  formatLongDate,
  formatMonthTitle,
  isSameMonth,
  monthWeeks,
  shiftMonthKeepDay,
  startOfMonth,
  WEEKDAY_LABELS,
} from "@/lib/dates";

export interface RangeCalendarProps {
  start: string | null;
  end: string | null;
  /** Earliest selectable day (ISO). */
  min: string;
  /** Latest selectable day (ISO). */
  max: string;
  /** Extra per-day disable rule, e.g. days too close to the start. */
  isDisabled?: (iso: string) => boolean;
  /** When true, hovering previews the range from `start`. */
  previewRange: boolean;
  onSelect: (iso: string) => void;
  className?: string;
}

/**
 * Two-month range calendar (one month below md). Days are buttons in a roving-tabindex
 * grid: arrows move by day/week, Home/End to week edges, PageUp/PageDown by month.
 */
export function RangeCalendar({
  start,
  end,
  min,
  max,
  isDisabled,
  previewRange,
  onSelect,
  className,
}: RangeCalendarProps) {
  const twoMonths = useMediaQuery("(min-width: 768px)");
  const monthCount = twoMonths ? 2 : 1;
  const [view, setView] = useState(() => startOfMonth(start ?? min));
  const [focused, setFocused] = useState(() => start ?? min);
  const [hovered, setHovered] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const keyboardMove = useRef(false);

  const months = Array.from({ length: monthCount }, (_, i) =>
    addMonths(view, i),
  );
  const canPrev = view > startOfMonth(min);
  const canNext = addMonths(view, monthCount) <= startOfMonth(max);

  const disabled = (iso: string) =>
    iso < min || iso > max || (isDisabled?.(iso) ?? false);

  const rangeEnd =
    end ??
    (previewRange && hovered && start && hovered > start ? hovered : null);

  // Move DOM focus only after a keyboard move, never on open or pointer use.
  useEffect(() => {
    if (!keyboardMove.current) return;
    keyboardMove.current = false;
    gridRef.current
      ?.querySelector<HTMLButtonElement>(`[data-date="${focused}"]`)
      ?.focus();
  }, [focused, view]);

  function moveFocus(next: string) {
    const clamped = next < min ? min : next > max ? max : next;
    keyboardMove.current = true;
    setFocused(clamped);
    const last = addMonths(view, monthCount - 1);
    if (clamped < view) setView(startOfMonth(clamped));
    else if (!isSameMonth(clamped, last) && clamped > last)
      setView(addMonths(startOfMonth(clamped), -(monthCount - 1)));
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, iso: string) {
    const weekday = new Date(`${iso}T00:00:00Z`).getUTCDay();
    const moves: Record<string, string> = {
      ArrowLeft: addDays(iso, -1),
      ArrowRight: addDays(iso, 1),
      ArrowUp: addDays(iso, -7),
      ArrowDown: addDays(iso, 7),
      Home: addDays(iso, -weekday),
      End: addDays(iso, 6 - weekday),
      PageUp: shiftMonthKeepDay(iso, -1),
      PageDown: shiftMonthKeepDay(iso, 1),
    };
    const next = moves[event.key];
    if (!next) return;
    event.preventDefault();
    moveFocus(next);
  }

  function shiftView(delta: number) {
    const nextView = addMonths(view, delta);
    setView(nextView);
    if (!isSameMonth(focused, nextView))
      setFocused(nextView < min ? min : nextView);
  }

  return (
    <div
      ref={gridRef}
      className={cn("relative rounded-3xl bg-gray-100 p-4 md:p-7", className)}
      onPointerLeave={() => setHovered(null)}
    >
      <button
        type="button"
        onClick={() => shiftView(-1)}
        disabled={!canPrev}
        aria-label="Previous month"
        className="absolute top-4 left-4 flex size-8 items-center justify-center rounded-full border border-neutral-200 bg-gray-100 text-neutral-500 transition-colors hover:bg-neutral-150 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none disabled:opacity-40 md:top-6 md:left-7"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => shiftView(1)}
        disabled={!canNext}
        aria-label="Next month"
        className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full border border-neutral-200 bg-gray-100 text-neutral-500 transition-colors hover:bg-neutral-150 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none disabled:opacity-40 md:top-6 md:right-7"
      >
        <ChevronRight className="size-4" aria-hidden="true" />
      </button>

      <div className="grid gap-8 md:grid-cols-2">
        {months.map((month) => (
          <div key={month}>
            <h3 className="mb-3 flex h-8 items-center justify-center text-[15px] font-medium text-neutral-900">
              {formatMonthTitle(month)}
            </h3>
            <table
              role="grid"
              aria-label={formatMonthTitle(month)}
              className="w-full border-collapse"
            >
              <thead>
                <tr>
                  {WEEKDAY_LABELS.map((label) => (
                    <th
                      key={label}
                      scope="col"
                      className="pb-2 text-center text-xs font-medium text-neutral-500"
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {monthWeeks(month).map((week) => (
                  <tr key={week[0]?.iso}>
                    {week.map((day) => {
                      if (!day.inMonth) {
                        return (
                          <td
                            key={day.iso}
                            aria-hidden="true"
                            className="h-11 text-center text-[15px] text-neutral-300 md:h-14"
                          >
                            {day.day}
                          </td>
                        );
                      }
                      const isStart = day.iso === start;
                      const isEnd = day.iso === rangeEnd;
                      const inRange =
                        start !== null &&
                        rangeEnd !== null &&
                        day.iso > start &&
                        day.iso < rangeEnd;
                      const off = disabled(day.iso);
                      return (
                        <td
                          key={day.iso}
                          role="gridcell"
                          aria-selected={isStart || isEnd || inRange}
                          className={cn(
                            "h-11 p-0 text-center md:h-14",
                            inRange && "bg-primary-100",
                            isStart &&
                              rangeEnd &&
                              "bg-gradient-to-r from-transparent from-50% to-primary-100 to-50%",
                            isEnd &&
                              start &&
                              "bg-gradient-to-l from-transparent from-50% to-primary-100 to-50%",
                          )}
                        >
                          <button
                            type="button"
                            data-date={day.iso}
                            tabIndex={day.iso === focused ? 0 : -1}
                            disabled={off}
                            aria-label={`${formatLongDate(day.iso)}${isStart ? ", delivery date" : ""}${isEnd && end ? ", pickup date" : ""}`}
                            aria-pressed={isStart || (isEnd && end !== null)}
                            onClick={() => {
                              setFocused(day.iso);
                              onSelect(day.iso);
                            }}
                            onPointerEnter={() => setHovered(day.iso)}
                            onFocus={() => setFocused(day.iso)}
                            onKeyDown={(event) => onKeyDown(event, day.iso)}
                            className={cn(
                              "mx-auto flex size-10 items-center justify-center rounded-full text-[15px] transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 focus-visible:outline-none md:size-11",
                              off
                                ? "cursor-not-allowed text-neutral-300"
                                : "text-neutral-900 hover:bg-primary-150",
                              (isStart || isEnd) &&
                                "bg-primary-500 font-semibold text-gray-100 hover:bg-primary-600",
                              inRange && "text-primary-800",
                            )}
                          >
                            {day.day}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

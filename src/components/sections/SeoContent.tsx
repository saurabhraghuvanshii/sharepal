"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import { cn } from "@/lib/cn";

export interface SeoContentProps {
  title: string;
  paragraphs: readonly string[];
}

/** Long-form copy collapsed to a preview; full text stays in the DOM for crawlers. */
export function SeoContent({ title, paragraphs }: SeoContentProps) {
  const [expanded, setExpanded] = useState(false);
  const bodyId = useId();

  return (
    <section
      aria-labelledby={`${bodyId}-title`}
      className="container py-8 md:py-10"
    >
      <h2
        id={`${bodyId}-title`}
        className="text-h5 text-neutral-900 md:text-h4"
      >
        {title}
      </h2>
      <div
        id={bodyId}
        className={cn(
          "relative mt-3 flex flex-col gap-3 overflow-hidden text-b4 text-neutral-500 transition-[max-height] duration-500 md:text-b3",
          expanded ? "max-h-[80rem]" : "max-h-24",
        )}
      >
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
        {!expanded && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-page to-transparent"
            aria-hidden="true"
          />
        )}
      </div>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={bodyId}
        onClick={() => setExpanded((v) => !v)}
        className="mt-3 inline-flex items-center gap-1 rounded-full text-sh5 text-primary-500 hover:underline focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
      >
        {expanded ? "Read less" : "Read more"}
        <ChevronDown
          className={cn(
            "size-4 transition-transform duration-200",
            expanded && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
    </section>
  );
}

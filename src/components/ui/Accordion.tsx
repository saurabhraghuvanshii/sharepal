"use client";

import { ChevronDown } from "lucide-react";
import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { cn } from "@/lib/cn";

export interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
}

export interface AccordionProps {
  items: readonly AccordionItem[];
  /** Allow several panels open at once. */
  multiple?: boolean;
  defaultOpen?: readonly string[];
  headingLevel?: "h3" | "h4";
  className?: string;
  itemClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

/**
 * WAI-ARIA accordion: buttons inside headings, `aria-expanded`/`aria-controls`,
 * ArrowUp/ArrowDown/Home/End move focus between triggers. Height animates via grid rows.
 */
export function Accordion({
  items,
  multiple = false,
  defaultOpen = [],
  headingLevel: Heading = "h3",
  className,
  itemClassName,
  triggerClassName,
  contentClassName,
}: AccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<ReadonlySet<string>>(
    () => new Set(defaultOpen),
  );
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  function toggle(id: string) {
    setOpen((current) => {
      const next = new Set(multiple ? current : []);
      if (current.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = items.length - 1;
    const target =
      event.key === "ArrowDown"
        ? index === last
          ? 0
          : index + 1
        : event.key === "ArrowUp"
          ? index === 0
            ? last
            : index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (target === null) return;
    event.preventDefault();
    triggers.current[target]?.focus();
  }

  return (
    <div className={cn("w-full", className)}>
      {items.map((item, index) => {
        const isOpen = open.has(item.id);
        const triggerId = `${baseId}-trigger-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;
        return (
          <div
            key={item.id}
            data-state={isOpen ? "open" : "closed"}
            className={cn("transition-colors duration-300", itemClassName)}
          >
            <Heading className="flex">
              <button
                ref={(node) => {
                  triggers.current[index] = node;
                }}
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={cn(
                  "flex flex-1 items-center justify-between gap-4 py-4 text-left focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none focus-visible:ring-inset",
                  triggerClassName,
                )}
              >
                <span>{item.title}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "size-4 shrink-0 text-neutral-400 transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows] duration-200 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className={cn("pb-4", contentClassName)}>
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";

type SheetSide = "left" | "right" | "bottom";

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  side?: SheetSide;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

const panelBySide: Record<SheetSide, string> = {
  left: "mr-auto h-dvh max-h-dvh w-[min(22rem,88vw)] rounded-r-3xl animate-sheet-in-left",
  right:
    "ml-auto h-dvh max-h-dvh w-[min(24rem,92vw)] rounded-l-3xl animate-sheet-in-right",
  bottom:
    "mt-auto max-h-[88dvh] w-full max-w-full rounded-t-3xl animate-sheet-in-bottom",
};

/**
 * Drawer built on the native `<dialog>` element: `showModal()` gives us a real focus trap,
 * inert background and Escape-to-close. Focus returns to the opener on close.
 */
export function Sheet({
  open,
  onClose,
  title,
  side = "right",
  children,
  footer,
  className,
}: SheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      const opener = document.activeElement as HTMLElement | null;
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = "";
        if (dialog.open) dialog.close();
        opener?.focus?.();
      };
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={cn(
        "m-0 flex-col overflow-hidden border-none bg-gray-100 p-0 text-neutral-900 shadow-medium backdrop:bg-primary-900/50 backdrop:backdrop-blur-[2px] open:flex",
        "max-w-none",
        panelBySide[side],
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-neutral-200 px-5 py-4">
        <h2 id={titleId} className="text-h6 text-primary-900">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex size-9 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-150 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
        {children}
      </div>
      {footer && (
        <div className="border-t border-neutral-200 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {footer}
        </div>
      )}
    </dialog>
  );
}

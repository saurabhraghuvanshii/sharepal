import { cn } from "@/lib/cn";
import { formatINR } from "@/lib/format";

export interface PriceProps {
  amount: number;
  unit?: "day" | "month";
  muted?: boolean;
  className?: string;
}

export function Price({
  amount,
  unit = "day",
  muted = false,
  className,
}: PriceProps) {
  return (
    <p className={cn("flex items-baseline gap-0.5", className)}>
      <span
        className={cn(
          "font-ubuntu text-sh4 md:text-h6",
          muted ? "text-neutral-400" : "text-primary-900",
        )}
      >
        {formatINR(amount)}
      </span>
      <span className="text-b6 text-neutral-400 md:text-b4">/{unit}</span>
    </p>
  );
}

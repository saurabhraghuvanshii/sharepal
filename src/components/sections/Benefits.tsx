import {
  BadgeCheck,
  PackageCheck,
  Truck,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export interface BenefitsProps {
  items: readonly { title: string; body: string }[];
}

const ICONS: readonly LucideIcon[] = [Wallet, Truck, PackageCheck, BadgeCheck];

export function Benefits({ items }: BenefitsProps) {
  return (
    <section
      aria-labelledby="benefits-title"
      className="bg-primary-900 py-10 md:py-14"
    >
      <div className="container">
        <h2 id="benefits-title" className="text-h4 text-gray-100 md:text-h2">
          Why rent with <span className="text-secondary-500">SharePal</span>
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = ICONS[index % ICONS.length] ?? BadgeCheck;
            return (
              <li
                key={item.title}
                className="flex flex-col gap-2 rounded-3xl border border-primary-700 bg-primary-850 p-4 md:p-5"
              >
                <Icon
                  className="size-6 text-secondary-500"
                  aria-hidden="true"
                />
                <h3 className="text-sh5 text-gray-100 md:text-sh3">
                  {item.title}
                </h3>
                <p className="text-b6 text-primary-200 md:text-b4">
                  {item.body}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

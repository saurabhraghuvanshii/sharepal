import {
  CalendarCheck,
  Gamepad2,
  MousePointerClick,
  Truck,
  type LucideIcon,
} from "lucide-react";

export interface HowItWorksProps {
  steps: readonly { title: string; body: string }[];
}

const ICONS: readonly LucideIcon[] = [
  MousePointerClick,
  CalendarCheck,
  Truck,
  Gamepad2,
];

export function HowItWorks({ steps }: HowItWorksProps) {
  return (
    <section aria-labelledby="how-title" className="container py-10 md:py-14">
      <h2 id="how-title" className="text-h4 text-neutral-900 md:text-h2">
        How renting works
      </h2>
      <ol className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = ICONS[index % ICONS.length] ?? Gamepad2;
          return (
            <li
              key={step.title}
              className="relative flex flex-col gap-3 rounded-3xl bg-gray-100 p-5 shadow transition-shadow duration-300 hover:shadow-soft"
            >
              <span className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-500">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <span
                  className="font-ubuntu text-h3 text-neutral-200"
                  aria-hidden="true"
                >
                  0{index + 1}
                </span>
              </span>
              <h3 className="text-sh3 text-primary-900">{step.title}</h3>
              <p className="text-b4 text-neutral-500">{step.body}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

"use client";

import { useState } from "react";

import { Accordion, Button } from "@/components/ui";
import type { Faq } from "@/config/site";

export interface FaqAccordionProps {
  faqs: readonly Faq[];
  visibleCount: number;
}

export function FaqAccordion({ faqs, visibleCount }: FaqAccordionProps) {
  const [showAll, setShowAll] = useState(false);
  const shown = showAll ? faqs : faqs.slice(0, visibleCount);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <section
      aria-labelledby="faq-title"
      className="container my-10 rounded-3xl bg-gray-100 p-4 py-10 md:p-6 md:py-10"
    >
      <div className="flex flex-col items-start gap-2">
        <h2 id="faq-title" className="py-2 text-h4 text-neutral-900 md:text-h2">
          Frequently Asked Questions (FAQs)
        </h2>
        <Accordion
          items={shown.map((faq) => ({
            id: faq.id,
            title: faq.question,
            content: (
              <p className="text-b4 text-neutral-500 md:text-b3">
                {faq.answer}
              </p>
            ),
          }))}
          itemClassName="rounded-xl transition-colors duration-300 hover:bg-gray-150 data-[state=open]:bg-gray-150"
          triggerClassName="rounded-xl px-4 text-sh4 text-primary-900 md:text-sh3"
          contentClassName="px-4"
        />
        {faqs.length > visibleCount && (
          <Button
            variant="soft"
            className="mt-2 w-full font-semibold md:text-base"
            aria-expanded={showAll}
            onClick={() => setShowAll((v) => !v)}
          >
            {showAll ? "View fewer FAQ's" : "View more FAQ's"}
          </Button>
        )}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
}

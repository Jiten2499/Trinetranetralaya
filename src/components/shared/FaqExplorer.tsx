"use client";

import { useMemo, useState } from "react";
import { FAQAccordion } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { faqCategories } from "@/data/faqs";
import type { FaqItem } from "@/types/content";

export function FaqExplorer({ items }: { items: FaqItem[] }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      const categoryMatch = category === "All" || item.category === category;
      const textMatch = !needle || `${item.question} ${item.answer}`.toLowerCase().includes(needle);
      return categoryMatch && textMatch;
    });
  }, [category, items, query]);

  return (
    <div>
      <label htmlFor="faq-search" className="text-sm font-semibold">Search questions</label>
      <Input id="faq-search" value={query} onChange={(event) => setQuery(event.target.value)} className="mt-2 max-w-xl" placeholder="Search eye care, appointments, payments…" />
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="FAQ categories">
        {["All", ...faqCategories].map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
            className={category === item ? "h-11 rounded-xl bg-action px-4 text-sm font-semibold text-primary-foreground" : "h-11 rounded-xl border border-border bg-surface px-4 text-sm font-semibold"}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-8">
        <FAQAccordion items={visible} />
      </div>
    </div>
  );
}

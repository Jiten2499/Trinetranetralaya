"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

export function FAQAccordion({
  items,
  defaultValue,
}: {
  items: Array<{ id: string; question: string; answer: string }>;
  defaultValue?: string;
}) {
  if (items.length === 0) {
    return <p className="text-muted">No questions match that search.</p>;
  }

  return (
    <Accordion.Root type="single" collapsible defaultValue={defaultValue} className="divide-y divide-border rounded-2xl border border-border bg-surface">
      {items.map((item) => (
        <Accordion.Item key={item.id} value={item.id} className="px-5">
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold text-foreground">
              {item.question}
              <ChevronDown className="size-5 shrink-0 text-action transition-transform group-data-[state=open]:rotate-180" aria-hidden="true" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden pb-5 text-muted data-[state=closed]:animate-none">
            {item.answer}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

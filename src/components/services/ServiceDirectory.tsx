"use client";

import { useMemo, useState } from "react";
import { ServiceCard } from "@/components/services/ServiceCard";
import type { ClinicService } from "@/types/service";

export function ServiceDirectory({ services, categories }: { services: ClinicService[]; categories: string[] }) {
  const [category, setCategory] = useState("All");
  const visible = useMemo(
    () => (category === "All" ? services : services.filter((service) => service.category === category)),
    [category, services],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter services">
        {["All", ...categories].map((item) => {
          const selected = item === category;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={selected}
              onClick={() => setCategory(item)}
              className={selected ? "h-11 rounded-xl bg-action px-4 text-sm font-semibold text-primary-foreground" : "h-11 rounded-xl border border-border bg-surface px-4 text-sm font-semibold"}
            >
              {item}
            </button>
          );
        })}
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}

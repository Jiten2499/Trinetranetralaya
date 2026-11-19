"use client";

import { useMemo, useState } from "react";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import type { Doctor } from "@/types/doctor";

export function DoctorDirectory({ doctors, specialties }: { doctors: Doctor[]; specialties: string[] }) {
  const [specialty, setSpecialty] = useState("All");
  const visible = useMemo(
    () => (specialty === "All" ? doctors : doctors.filter((doctor) => doctor.specialties.includes(specialty))),
    [doctors, specialty],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by specialty">
        {["All", ...specialties].map((item) => {
          const selected = item === specialty;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={selected}
              onClick={() => setSpecialty(item)}
              className={selected ? "h-11 rounded-xl bg-action px-4 text-sm font-semibold text-primary-foreground" : "h-11 rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground"}
            >
              {item}
            </button>
          );
        })}
      </div>
      {visible.length === 0 ? (
        <p className="mt-8 text-muted">No profiles match that specialty.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
}

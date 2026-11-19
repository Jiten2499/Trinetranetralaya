import Image from "next/image";
import Link from "next/link";
import type { Doctor } from "@/types/doctor";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow)]">
      <div className="relative aspect-[4/5] bg-background-secondary">
        <Image
          src={doctor.image}
          alt={doctor.imageAlt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        {doctor.isSample ? (
          <p className="absolute left-3 top-3 rounded-lg bg-footer px-2.5 py-1 text-xs font-semibold text-footer-foreground">
            Sample profile
          </p>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-2xl">{doctor.name}</h3>
        <p className="mt-1 text-sm font-semibold text-action">{doctor.designation}</p>
        <p className="mt-3 text-sm text-muted">{doctor.specialization}</p>
        {doctor.isSample ? (
          <p className="mt-3 text-sm text-muted">Qualifications shown here are placeholders until the clinic verifies them.</p>
        ) : (
          <ul className="mt-3 grid gap-1 text-sm text-muted">
            {doctor.qualifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        <Link href={`/doctors/${doctor.slug}`} className="mt-4 font-semibold text-action">
          View profile
        </Link>
      </div>
    </article>
  );
}

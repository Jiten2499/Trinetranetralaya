import Image from "next/image";
import Link from "next/link";
import { ServiceIcon } from "@/components/shared/ServiceIcon";
import type { ClinicService } from "@/types/service";

export function ServiceCard({ service }: { service: ClinicService }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow)]">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex size-12 items-center justify-center rounded-xl bg-background-secondary text-action">
          <ServiceIcon name={service.icon} className="size-6" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-muted">{service.category}</span>
      </div>
      <h3 className="mt-4 text-2xl">{service.title}</h3>
      <p className="mt-2 flex-1 text-muted">{service.shortDescription}</p>
      <Link href={`/services/${service.slug}`} className="mt-4 font-semibold text-action">
        Learn more
      </Link>
    </article>
  );
}

export function ServiceImage({ service, priority = false }: { service: ClinicService; priority?: boolean }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-background-secondary">
      <Image src={service.image} alt={service.imageAlt} fill className="object-cover" priority={priority} sizes="(min-width: 1024px) 40vw, 100vw" />
    </div>
  );
}

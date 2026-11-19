import Image from "next/image";
import type { ClinicPhoto } from "@/data/clinic-gallery";

export function ClinicGallery({
  photos,
  title,
  description,
  id,
}: {
  photos: ClinicPhoto[];
  title: string;
  description: string;
  id?: string;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-3xl">{title}</h2>
      <p className="mt-4 max-w-3xl text-muted">{description}</p>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo) => (
          <li key={photo.id} className="overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="relative aspect-[3/4] bg-background-secondary">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </div>
            <p className="p-4 text-sm text-muted">{photo.caption}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

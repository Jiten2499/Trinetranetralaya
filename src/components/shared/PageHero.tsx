import { Container } from "@/components/shared/Container";
import { Breadcrumb, type Crumb } from "@/components/shared/Breadcrumb";

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  crumbs: Crumb[];
}) {
  return (
    <section className="border-b border-border bg-background-secondary">
      <Container className="py-12 md:py-16">
        <Breadcrumb items={crumbs} />
        {eyebrow ? <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-action">{eyebrow}</p> : null}
        <h1 className="mt-3 max-w-3xl text-4xl text-balance md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{description}</p>
      </Container>
    </section>
  );
}

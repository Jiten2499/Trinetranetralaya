import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/shared/Container";
import type { PolicySection } from "@/types/content";
import type { Crumb } from "@/components/shared/Breadcrumb";

export function PolicyLayout({
  title,
  description,
  path,
  sections,
}: {
  title: string;
  description: string;
  path: string;
  sections: PolicySection[];
}) {
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: title, path },
  ];

  return (
    <>
      <PageHero title={title} description={description} crumbs={crumbs} />
      <Container className="grid gap-8 py-14">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-2xl">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 max-w-3xl text-muted">{paragraph}</p>
            ))}
          </section>
        ))}
      </Container>
    </>
  );
}

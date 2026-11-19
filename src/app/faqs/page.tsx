import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/shared/Container";
import { FaqExplorer } from "@/components/shared/FaqExplorer";
import { getFaqs } from "@/services/clinic/clinic-service";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "FAQs",
  description: "Answers to common questions about eye examinations, appointments, children’s vision, and clinic information.",
  path: "/faqs",
});

export default async function FaqsPage() {
  const faqs = await getFaqs();

  return (
    <>
      <PageHero
        eyebrow="Help"
        title="Frequently asked questions"
        description="Search by topic. These answers are general. They do not replace advice given after an examination."
        crumbs={[{ name: "Home", path: "/" }, { name: "FAQs", path: "/faqs" }]}
      />
      <Container className="py-14">
        <FaqExplorer items={faqs} />
      </Container>
    </>
  );
}

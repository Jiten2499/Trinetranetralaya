import { PolicyLayout } from "@/components/shared/PolicyLayout";
import { accessibilitySections } from "@/data/policies";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Accessibility",
  description: "Accessibility aims and a way to report barriers on the TriNetra Netralaya website.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <PolicyLayout
      title="Accessibility"
      description="How this website is built to be readable and operable, and how to tell the clinic if something gets in the way."
      path="/accessibility"
      sections={accessibilitySections}
    />
  );
}

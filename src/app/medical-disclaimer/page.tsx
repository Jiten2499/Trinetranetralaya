import { PolicyLayout } from "@/components/shared/PolicyLayout";
import { disclaimerSections } from "@/data/policies";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Medical Disclaimer",
  description: "Website information from TriNetra Netralaya is educational and does not replace an eye examination.",
  path: "/medical-disclaimer",
});

export default function DisclaimerPage() {
  return (
    <PolicyLayout
      title="Medical Disclaimer"
      description="Please read this before using articles or forms to make a decision about your eyes."
      path="/medical-disclaimer"
      sections={disclaimerSections}
    />
  );
}

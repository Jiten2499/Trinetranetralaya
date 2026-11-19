import { PolicyLayout } from "@/components/shared/PolicyLayout";
import { termsSections } from "@/data/policies";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Terms and Conditions",
  description: "Draft terms for using the VisionCare Eye Clinic website and sending an appointment enquiry.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <PolicyLayout
      title="Terms and Conditions"
      description="Rules for using this website. They do not create a medical appointment by themselves."
      path="/terms-and-conditions"
      sections={termsSections}
    />
  );
}

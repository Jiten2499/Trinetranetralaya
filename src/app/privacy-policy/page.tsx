import { PolicyLayout } from "@/components/shared/PolicyLayout";
import { privacySections } from "@/data/policies";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How VisionCare Eye Clinic’s website handles contact details, enquiries, and third-party services.",
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      description="A draft explanation of what the website collects and why. The clinic must approve the final text."
      path="/privacy-policy"
      sections={privacySections}
    />
  );
}

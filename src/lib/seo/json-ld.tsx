import { siteConfig } from "@/config/site-config";
import { getSocialLinks } from "@/lib/contact-links";
import { absoluteUrl } from "@/lib/seo/metadata";
import { hasText } from "@/lib/utils";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function ClinicJsonLd() {
  const url = absoluteUrl("/") ?? undefined;
  const sameAs = getSocialLinks()
    .filter((item) => item.id !== "whatsapp")
    .map((item) => item.href);

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: siteConfig.name,
    description: siteConfig.description,
    medicalSpecialty: "Ophthalmology",
    url,
  };

  if (hasText(siteConfig.contact.phone)) data.telephone = siteConfig.contact.phone;
  if (hasText(siteConfig.contact.email)) data.email = siteConfig.contact.email;
  if (hasText(siteConfig.contact.address) && hasText(siteConfig.contact.city)) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      addressLocality: siteConfig.contact.city,
      addressCountry: siteConfig.contact.country,
    };
  }
  if (sameAs.length > 0) data.sameAs = sameAs;

  return <JsonLd data={data} />;
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ name: string; path: string }>;
}) {
  const origin = absoluteUrl("/");
  if (!origin) return null;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  );
}

export function organizationSameAs(): string[] {
  return getSocialLinks().map((item) => item.href);
}

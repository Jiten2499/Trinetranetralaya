import { HomePage } from "@/components/home/HomePage";
import { ClinicJsonLd } from "@/lib/seo/json-ld";
import { siteConfig } from "@/config/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} | ${siteConfig.tagline}` },
  description: siteConfig.description,
};

export default function Page() {
  return (
    <>
      <ClinicJsonLd />
      <HomePage />
    </>
  );
}

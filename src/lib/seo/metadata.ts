import type { Metadata } from "next";
import { siteConfig } from "@/config/site-config";

export function getSiteUrl(): string | null {
  const value = siteConfig.url.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.origin;
  } catch {
    return null;
  }
}

export function absoluteUrl(path: string): string | undefined {
  const origin = getSiteUrl();
  if (!origin) return undefined;
  return new URL(path, origin).toString();
}

export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const canonical = absoluteUrl(path) ?? path;
  const imageUrl = image ? absoluteUrl(image) ?? image : undefined;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      locale: "en_US",
      type,
      images: imageUrl ? [{ url: imageUrl, alt: title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

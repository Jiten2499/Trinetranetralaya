import type { Metadata, Viewport } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { Suspense } from "react";
import { siteConfig } from "@/config/site-config";
import { getActiveTheme, themeConfig } from "@/config/theme-config";
import { getServices } from "@/services/clinic-services/service-service";
import { getCopyrightYear } from "@/lib/copyright-year";
import { Header, HeaderFallback } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteUrl } from "@/lib/seo/metadata";
import "@/styles/globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const theme = getActiveTheme();
const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: theme.colors.background,
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [services, year] = await Promise.all([getServices(), getCopyrightYear()]);

  return (
    <html lang="en" data-theme={themeConfig.active} className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <a href="#main" className="skip-link">Skip to content</a>
        <Suspense fallback={<HeaderFallback />}>
          <Header
            services={services.map((service) => ({
              href: `/services/${service.slug}`,
              title: service.title,
              description: service.shortDescription,
            }))}
          />
        </Suspense>
        <main id="main">{children}</main>
        <Footer year={year} />
      </body>
    </html>
  );
}

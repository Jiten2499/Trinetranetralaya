import Link from "next/link";
import { siteConfig } from "@/config/site-config";
import { footerQuickLinks, footerResourceLinks, legalLinks } from "@/config/navigation-config";
import { Logo } from "@/components/shared/Logo";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { ContactDetails } from "@/components/shared/ContactDetails";

export function Footer({ year }: { year: number }) {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div>
          <Logo tone="light" />
          <p className="mt-4 text-sm leading-6 text-footer-muted">{siteConfig.description}</p>
          <p className="mt-3 font-display text-lg text-secondary">{siteConfig.tagline}</p>
          <div className="mt-5">
            <SocialLinks />
          </div>
        </div>
        <FooterColumn title="Quick links" links={footerQuickLinks} />
        <FooterColumn title="Patient resources" links={footerResourceLinks} />
        <div>
          <h2 className="text-base font-semibold text-footer-foreground">Contact</h2>
          <div className="mt-4 text-sm">
            <ContactDetails showHours tone="light" />
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-sm text-footer-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-footer-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: Array<{ href: string; label: string }> }) {
  return (
    <div>
      <h2 className="text-base font-semibold text-footer-foreground">{title}</h2>
      <ul className="mt-4 grid gap-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-footer-muted hover:text-footer-foreground">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

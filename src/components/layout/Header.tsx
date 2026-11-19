"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { mainNavigation } from "@/config/navigation-config";
import { siteConfig } from "@/config/site-config";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import {
  buildContactMessage,
  formatHoursSummary,
  getPhoneHref,
  getPhoneLabel,
  getWhatsAppHref,
} from "@/lib/contact-links";
import { cn } from "@/lib/utils";

export interface ServiceNavItem {
  href: string;
  title: string;
  description: string;
}

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header({ services }: { services: ServiceNavItem[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const phoneHref = getPhoneHref();
  const whatsappHref = getWhatsAppHref(buildContactMessage("an eye care enquiry", "a patient"));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <header className={cn("sticky top-0 z-40 border-b bg-background", scrolled ? "border-border shadow-[var(--shadow)]" : "border-transparent")}>
        <div className={cn("hidden overflow-hidden bg-footer text-footer-foreground lg:block", scrolled ? "max-h-0" : "max-h-12")}>
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-2 text-sm">
            <p>
              {siteConfig.contact.city || siteConfig.contact.country} · {formatHoursSummary()}
            </p>
            <p className="flex items-center gap-4">
              {phoneHref ? <a href={phoneHref}>{getPhoneLabel()}</a> : <span>Phone to be added</span>}
              {siteConfig.contact.email ? <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> : <span>Email to be added</span>}
            </p>
          </div>
        </div>
        <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" aria-label={`${siteConfig.name} home`}>
            <Logo compact />
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {mainNavigation.map((item) =>
              item.href === "/services" ? (
                <div key={item.href} className="relative" onMouseLeave={() => setServicesOpen(false)}>
                  <button
                    type="button"
                    className={cn(
                      "inline-flex h-11 items-center rounded-lg px-3 text-sm font-semibold",
                      isCurrent(pathname, item.href) ? "text-action" : "text-foreground",
                    )}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    aria-controls="services-menu"
                    onClick={() => setServicesOpen((open) => !open)}
                    onMouseEnter={() => setServicesOpen(true)}
                  >
                    Eye Care Services
                  </button>
                  {servicesOpen ? (
                    <div id="services-menu" className="absolute left-0 top-full z-50 w-[36rem] pt-3" role="region" aria-label="Eye care services">
                      <div className="rounded-2xl border border-border bg-surface p-4 shadow-[var(--shadow)]">
                        <div className="grid grid-cols-2 gap-2">
                          {services.map((service) => (
                            <Link
                              key={service.href}
                              href={service.href}
                              className="rounded-xl px-3 py-3 hover:bg-background-secondary"
                              onClick={() => setServicesOpen(false)}
                            >
                              <span className="block font-semibold text-foreground">{service.title}</span>
                              <span className="mt-1 block text-sm text-muted">{service.description}</span>
                            </Link>
                          ))}
                        </div>
                        <Link href="/services" className="mt-3 inline-flex px-3 text-sm font-semibold text-action" onClick={() => setServicesOpen(false)}>
                          View all services
                        </Link>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                  className={cn(
                    "inline-flex h-11 items-center rounded-lg px-3 text-sm font-semibold",
                    isCurrent(pathname, item.href) ? "text-action" : "text-foreground hover:text-action",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <div className="flex items-center gap-2">
            {phoneHref ? (
              <a href={phoneHref} className="inline-flex size-11 items-center justify-center rounded-xl border border-border lg:hidden" aria-label={`Call ${getPhoneLabel()}`}>
                <Phone className="size-5" aria-hidden="true" />
              </a>
            ) : null}
            {whatsappHref ? (
              <a href={whatsappHref} className="inline-flex size-11 items-center justify-center rounded-xl border border-border lg:hidden" aria-label="WhatsApp the clinic" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-5" aria-hidden="true" />
              </a>
            ) : null}
            <Button href="/appointment" className="hidden sm:inline-flex">
              Book Appointment
            </Button>
            <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
              <Dialog.Trigger className="inline-flex size-11 items-center justify-center rounded-xl border border-border lg:hidden" aria-label="Open menu">
                <Menu className="size-5" aria-hidden="true" />
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/40" />
                <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,22rem)] flex-col bg-surface shadow-xl outline-none" aria-describedby={undefined}>
                  <motion.div
                    className="flex h-full flex-col"
                    initial={reduceMotion ? false : { x: 24 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between border-b border-border px-4 py-4">
                      <Dialog.Title className="font-display text-lg">Menu</Dialog.Title>
                      <Dialog.Close className="inline-flex size-11 items-center justify-center rounded-xl border border-border" aria-label="Close menu">
                        <X className="size-5" aria-hidden="true" />
                      </Dialog.Close>
                    </div>
                    <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile">
                      <ul className="grid gap-1">
                        {mainNavigation.map((item) =>
                          item.href === "/services" ? (
                            <li key={item.href}>
                              <button
                                type="button"
                                className="flex h-12 w-full items-center justify-between rounded-xl px-3 text-left font-semibold"
                                aria-expanded={mobileServicesOpen}
                                onClick={() => setMobileServicesOpen((open) => !open)}
                              >
                                Eye Care Services
                                <span aria-hidden="true">{mobileServicesOpen ? "−" : "+"}</span>
                              </button>
                              {mobileServicesOpen ? (
                                <ul className="mb-2 grid gap-1 pl-3">
                                  {services.map((service) => (
                                    <li key={service.href}>
                                      <Link href={service.href} className="block rounded-xl px-3 py-3 text-sm hover:bg-background-secondary" onClick={() => setMobileOpen(false)}>
                                        {service.title}
                                      </Link>
                                    </li>
                                  ))}
                                  <li>
                                    <Link href="/services" className="block rounded-xl px-3 py-3 text-sm font-semibold text-action" onClick={() => setMobileOpen(false)}>
                                      View all services
                                    </Link>
                                  </li>
                                </ul>
                              ) : null}
                            </li>
                          ) : (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                                className="flex h-12 items-center rounded-xl px-3 font-semibold hover:bg-background-secondary"
                                onClick={() => setMobileOpen(false)}
                              >
                                {item.label}
                              </Link>
                            </li>
                          ),
                        )}
                      </ul>
                    </nav>
                    <div className="border-t border-border p-4">
                      <Button href="/appointment" className="w-full" onClick={() => setMobileOpen(false)}>
                        Book Appointment
                      </Button>
                    </div>
                  </motion.div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </header>
    </MotionConfig>
  );
}

export function HeaderFallback() {
  return (
    <div className="sticky top-0 z-40 border-b border-transparent bg-background">
      <div className="hidden h-10 bg-footer lg:block" />
      <div className="mx-auto h-[4.5rem] max-w-6xl" />
    </div>
  );
}

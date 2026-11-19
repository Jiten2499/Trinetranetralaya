export interface NavLink {
  label: string;
  href: string;
}

export const mainNavigation: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Doctors", href: "/doctors" },
  { label: "Eye Care Services", href: "/services" },
  { label: "Facilities", href: "/facilities" },
  { label: "Patient Guide", href: "/patient-guide" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export const footerQuickLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Doctors", href: "/doctors" },
  { label: "Eye Care Services", href: "/services" },
  { label: "Facilities", href: "/facilities" },
  { label: "Patient Guide", href: "/patient-guide" },
];

export const footerResourceLinks: NavLink[] = [
  { label: "Blog", href: "/blog" },
  { label: "FAQs", href: "/faqs" },
  { label: "Appointment Information", href: "/appointment" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Medical Disclaimer", href: "/medical-disclaimer" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
  { label: "Medical Disclaimer", href: "/medical-disclaimer" },
  { label: "Accessibility", href: "/accessibility" },
];

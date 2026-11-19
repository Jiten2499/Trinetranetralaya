import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site-config";
import {
  buildContactMessage,
  formatDayHours,
  formatHoursSummary,
  getAddressLines,
  getDirectionsUrl,
  getEmailHref,
  getPhoneHref,
  getPhoneLabel,
  getWhatsAppHref,
  getWhatsAppLabel,
} from "@/lib/contact-links";
import { Button } from "@/components/ui/button";

export function ContactDetails({
  showHours = true,
  tone = "dark",
}: {
  showHours?: boolean;
  tone?: "dark" | "light";
}) {
  const phoneHref = getPhoneHref();
  const emailHref = getEmailHref();
  const whatsappHref = getWhatsAppHref(buildContactMessage("an eye care enquiry", "a patient"));
  const directions = getDirectionsUrl();

  return (
    <div className="grid gap-4">
      <Detail icon={<Phone className="size-5" aria-hidden="true" />} label="Tulsipur telephone" tone={tone}>
        {phoneHref ? (
          <a href={phoneHref} className={tone === "light" ? "font-semibold text-secondary" : "font-semibold text-action"}>
            {getPhoneLabel()}
          </a>
        ) : (
          <span>{getPhoneLabel()}</span>
        )}
      </Detail>
      <Detail icon={<Mail className="size-5" aria-hidden="true" />} label="Email" tone={tone}>
        {emailHref ? (
          <a href={emailHref} className={tone === "light" ? "font-semibold text-secondary" : "font-semibold text-action"}>
            {siteConfig.contact.email}
          </a>
        ) : (
          <span>Email address to be added</span>
        )}
      </Detail>
      <Detail icon={<MessageCircle className="size-5" aria-hidden="true" />} label="WhatsApp" tone={tone}>
        {whatsappHref ? (
          <a href={whatsappHref} className={tone === "light" ? "font-semibold text-secondary" : "font-semibold text-action"} target="_blank" rel="noopener noreferrer">
            {getWhatsAppLabel()}
          </a>
        ) : (
          <span>WhatsApp number to be added</span>
        )}
      </Detail>
      <Detail icon={<MapPin className="size-5" aria-hidden="true" />} label="Address" tone={tone}>
        {getAddressLines().map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </Detail>
      {showHours ? (
        <Detail icon={<Clock className="size-5" aria-hidden="true" />} label="Opening hours" tone={tone}>
          <span>{formatHoursSummary()}</span>
        </Detail>
      ) : null}
      {directions ? (
        <Button href={directions} external variant={tone === "light" ? "inverse" : "outline"} className="mt-2 w-fit">
          Get Directions
        </Button>
      ) : (
        <p className={tone === "light" ? "text-sm text-footer-muted" : "text-sm text-muted"}>
          A directions link will appear after the clinic location is added.
        </p>
      )}
    </div>
  );
}

function Detail({
  icon,
  label,
  children,
  tone = "dark",
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <div className="flex gap-3">
      <span className={tone === "light" ? "mt-1 text-secondary" : "mt-1 text-action"}>{icon}</span>
      <div>
        <p className={tone === "light" ? "text-sm font-semibold uppercase tracking-wide text-footer-muted" : "text-sm font-semibold uppercase tracking-wide text-muted"}>
          {label}
        </p>
        <div className={tone === "light" ? "text-footer-foreground" : "text-foreground"}>{children}</div>
      </div>
    </div>
  );
}

export function HoursCard() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow)]">
      <h2 className="text-2xl">Opening hours</h2>
      {!siteConfig.hoursConfirmed ? (
        <p className="mt-2 text-sm text-muted">Sample schedule — confirm these hours before publication.</p>
      ) : null}
      <ul className="mt-5 divide-y divide-border">
        {siteConfig.hours.map((day) => (
          <li key={day.day} className="flex items-center justify-between gap-4 py-3">
            <span className="font-semibold">{day.day}</span>
            <span className="text-muted">{formatDayHours(day)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

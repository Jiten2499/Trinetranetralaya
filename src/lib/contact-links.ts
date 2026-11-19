import { siteConfig } from "@/config/site-config";
import { getConfiguredDirectionsUrl } from "@/lib/map";
import { hasText, isHttpUrl } from "@/lib/utils";

export interface AppointmentMessageInput {
  serviceName: string;
  doctorName?: string;
  patientName: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  patientType: "new" | "existing";
  message?: string;
}

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

export function isWhatsAppConfigured(number = siteConfig.contact.whatsapp): boolean {
  return digitsOnly(number).length >= 8;
}

export function buildWhatsAppUrl(
  message: string,
  number = siteConfig.contact.whatsapp,
): string | null {
  const digits = digitsOnly(number);
  if (digits.length < 8) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function buildAppointmentMessage(input: AppointmentMessageInput): string {
  const lines = [
    `Hello ${siteConfig.name}, I would like to enquire about an appointment.`,
    `Service: ${input.serviceName}`,
    input.doctorName ? `Preferred doctor: ${input.doctorName}` : "Preferred doctor: no preference",
    `Name: ${input.patientName}`,
    `Mobile: ${input.phone}`,
    `Preferred date: ${input.preferredDate}`,
    `Preferred time: ${input.preferredTime}`,
    `Patient type: ${input.patientType === "new" ? "New patient" : "Existing patient"}`,
    input.message?.trim() ? `Note: ${input.message.trim()}` : null,
    "I understand this message is an enquiry and not a confirmed appointment.",
  ].filter((line): line is string => Boolean(line));

  return lines.join("\n");
}

export function buildContactMessage(subject: string, name: string): string {
  return `Hello ${siteConfig.name}, my name is ${name}. I would like to ask about: ${subject}.`;
}

export function getPhoneHref(phone = siteConfig.contact.phone): string | null {
  const trimmed = phone.trim();
  if (!trimmed) return null;
  const compact = trimmed.replace(/[^\d+]/g, "");
  if (compact.replace(/\D/g, "").length < 7) return null;
  return `tel:${compact}`;
}

export function getEmailHref(email = siteConfig.contact.email): string | null {
  const trimmed = email.trim();
  if (!trimmed || !trimmed.includes("@")) return null;
  return `mailto:${trimmed}`;
}

export function getPhoneLabel(): string {
  if (hasText(siteConfig.contact.phoneDisplay)) return siteConfig.contact.phoneDisplay;
  if (hasText(siteConfig.contact.phone)) return siteConfig.contact.phone;
  return "Telephone number to be added";
}

export function getWhatsAppLabel(number = siteConfig.contact.whatsapp): string {
  const digits = digitsOnly(number);
  if (digits.startsWith("977") && digits.length === 13) return digits.slice(3);
  if (digits.length >= 8) return digits;
  return "WhatsApp number to be added";
}

export function getAddressLines(): string[] {
  const lines = [
    siteConfig.contact.address.trim(),
    [siteConfig.contact.city.trim(), siteConfig.contact.country.trim()].filter(Boolean).join(", "),
  ].filter(Boolean);
  return lines.length > 0 ? lines : ["Clinic address to be confirmed"];
}

export function getDirectionsUrl(): string | null {
  return getConfiguredDirectionsUrl();
}

export function getWhatsAppHref(message: string): string | null {
  return buildWhatsAppUrl(message);
}

export interface SocialLink {
  id: keyof typeof siteConfig.social;
  label: string;
  href: string;
}

const socialLabels: Record<keyof typeof siteConfig.social, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
  whatsapp: "WhatsApp",
};

export function getSocialLinks(): SocialLink[] {
  return (Object.keys(siteConfig.social) as Array<keyof typeof siteConfig.social>)
    .map((id) => {
      const href = siteConfig.social[id].trim();
      if (id === "whatsapp") {
        const wa = buildWhatsAppUrl(`Hello ${siteConfig.name}, I would like to enquire about eye care.`);
        return wa ? { id, label: socialLabels[id], href: wa } : null;
      }
      return isHttpUrl(href) ? { id, label: socialLabels[id], href } : null;
    })
    .filter((item): item is SocialLink => item !== null);
}

export function formatClock(value: string): string {
  const [hourText, minuteText] = value.split(":");
  const hour = Number(hourText);
  const minute = Number(minuteText);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return value;
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute.toString().padStart(2, "0")} ${suffix}`;
}

export function formatDayHours(day: (typeof siteConfig.hours)[number]): string {
  if (day.closed || !day.opens || !day.closes) return "Closed";
  return `${formatClock(day.opens)} – ${formatClock(day.closes)}`;
}

export function formatHoursSummary(): string {
  if (!siteConfig.hoursConfirmed) return "Opening hours to be confirmed";
  const openDays = siteConfig.hours.filter((day) => !day.closed && day.opens && day.closes);
  if (openDays.length === 0) return "Hours available on request";
  const first = openDays[0];
  const same = openDays.every((day) => day.opens === first.opens && day.closes === first.closes);
  if (!same || !first.opens || !first.closes) return "See opening hours";
  const start = openDays[0]?.day.slice(0, 3);
  const end = openDays[openDays.length - 1]?.day.slice(0, 3);
  const span = start === end ? start : `${start}–${end}`;
  return `${span}, ${formatClock(first.opens)}–${formatClock(first.closes)}`;
}

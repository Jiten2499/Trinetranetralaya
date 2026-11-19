import { getSocialLinks, type SocialLink } from "@/lib/contact-links";

function Icon({ id }: { id: SocialLink["id"] }) {
  const common = { viewBox: "0 0 24 24", className: "size-4", "aria-hidden": true as const, fill: "currentColor" };
  switch (id) {
    case "facebook":
      return (
        <svg {...common}>
          <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 4.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm6.2-.9a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1zM12 9.2A2.8 2.8 0 1 1 9.2 12 2.8 2.8 0 0 1 12 9.2z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <path d="M23 12.2s0-3.2-.4-4.6a3 3 0 0 0-2.1-2.1C18.9 5 12 5 12 5s-6.9 0-8.5.5a3 3 0 0 0-2.1 2.1C1 9 1 12.2 1 12.2s0 3.2.4 4.6a3 3 0 0 0 2.1 2.1C5.1 19.4 12 19.4 12 19.4s6.9 0 8.5-.5a3 3 0 0 0 2.1-2.1c.4-1.4.4-4.6.4-4.6zM9.8 15.5v-6.6l6.2 3.3z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M6.5 9H3.7v11h2.8zM5.1 3.6A1.7 1.7 0 1 0 5.1 7a1.7 1.7 0 0 0 0-3.4zM20.3 13.3c0-3-1.6-4.4-3.8-4.4a3.3 3.3 0 0 0-3 1.6h-.1V9H10.7c0 1.7 0 11 0 11h2.8v-6.1c0-.3 0-.7.1-1a1.8 1.8 0 0 1 1.7-1.2c1.2 0 1.7.9 1.7 2.2V20h2.8z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...common}>
          <path d="M14 3c.4 2.4 1.8 4.1 4.2 4.4v2.5a7 7 0 0 1-4.1-1.3v6.6a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v2.7a3 3 0 1 0 2.1 2.9V3z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M19.1 4.9A9.7 9.7 0 0 0 2.1 14.6L1 20.8l6.3-1.1A9.7 9.7 0 0 0 19.1 4.9zm-7.2 15a8 8 0 0 1-4.1-1.1l-.3-.2-3.7.7.7-3.6-.2-.3a8 8 0 1 1 7.6 4.5zm4.4-6-1.2-.6c-.2-.1-1.2-.6-1.4-.6s-.3 0-.5.3-.6.6-.7.8-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.5.2-.3a.4.4 0 0 0 0-.4l-.6-1.4c-.2-.4-.3-.3-.5-.3h-.4a.8.8 0 0 0-.6.3 2.4 2.4 0 0 0-.8 1.8 4.2 4.2 0 0 0 .9 2.2 9.6 9.6 0 0 0 3.6 3.2 4 4 0 0 0 2.5.7 2.2 2.2 0 0 0 1.5-1 1.8 1.8 0 0 0 .1-1.1c-.1-.1-.3-.2-.5-.3z" />
        </svg>
      );
  }
}

export function SocialLinks({ tone = "light" }: { tone?: "light" | "dark" }) {
  const links = getSocialLinks();
  if (links.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {links.map((link) => (
        <li key={link.id}>
          <a
            href={link.href}
            className={
              tone === "light"
                ? "inline-flex size-11 items-center justify-center rounded-xl border border-white/15 text-footer-foreground hover:bg-white/10"
                : "inline-flex size-11 items-center justify-center rounded-xl border border-border text-foreground hover:bg-background-secondary"
            }
            aria-label={link.label}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon id={link.id} />
          </a>
        </li>
      ))}
    </ul>
  );
}

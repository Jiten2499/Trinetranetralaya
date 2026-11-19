import { siteConfig } from "@/config/site-config";
import { cn } from "@/lib/utils";

export function Logo({
  tone = "dark",
  compact = false,
}: {
  tone?: "dark" | "light";
  compact?: boolean;
}) {
  const light = tone === "light";

  return (
    <span className="flex items-center gap-3">
      <svg viewBox="0 0 40 40" className="size-10 shrink-0" aria-hidden="true">
        <rect width="40" height="40" rx="12" fill={light ? "#243E58" : "#182F45"} />
        <path
          d="M6 20.5c4.2-6.2 8.4-8.5 14-8.5s9.8 2.3 14 8.5c-4.2 6.2-8.4 8.5-14 8.5s-9.8-2.3-14-8.5z"
          fill="none"
          stroke="#F4A261"
          strokeWidth="1.8"
        />
        <circle cx="20" cy="20.5" r="4.2" fill="#E66A35" />
        <circle cx="21.2" cy="19.2" r="1.3" fill="#FFF9F3" />
      </svg>
      <span className="min-w-0">
        <span className={cn("block font-display text-lg leading-none", light ? "text-footer-foreground" : "text-foreground")}>
          {compact ? siteConfig.shortName : siteConfig.name}
        </span>
        <span className={cn("mt-1 block text-xs tracking-wide", light ? "text-footer-muted" : "text-muted")}>
          Eye clinic
        </span>
      </span>
    </span>
  );
}

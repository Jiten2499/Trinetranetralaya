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
  const [first, ...rest] = siteConfig.name.split(" ");
  const second = rest.join(" ");
  const mark = light ? "#243E58" : "#182F45";

  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 40 40" className="size-11 shrink-0" aria-hidden="true">
        <rect width="40" height="40" rx="13" fill={mark} />
        <path
          d="M7 21c4-6 8-8.2 13-8.2S29 15 33 21c-4 6-8 8.2-13 8.2S11 27 7 21z"
          fill="none"
          stroke="#F4A261"
          strokeWidth="1.8"
        />
        <circle cx="20" cy="21" r="4.1" fill="#E66A35" />
        <circle cx="21.3" cy="19.7" r="1.25" fill="#FFF9F3" />
        <circle cx="13.2" cy="11.2" r="1.35" fill="#F4A261" />
        <circle cx="20" cy="9.4" r="1.55" fill="#F4A261" />
        <circle cx="26.8" cy="11.2" r="1.35" fill="#F4A261" />
      </svg>
      <span className="min-w-0">
        <span className={cn("block font-display text-[1.15rem] leading-none tracking-tight sm:text-[1.3rem]", light ? "text-footer-foreground" : "text-foreground")}>
          {first}
        </span>
        {second ? (
          <span className={cn("mt-0.5 block font-display text-[1.15rem] leading-none tracking-tight sm:text-[1.3rem]", light ? "text-secondary" : "text-action")}>
            {second}
          </span>
        ) : null}
        {compact ? null : (
          <span className={cn("mt-1.5 block text-[0.65rem] font-semibold uppercase tracking-[0.14em]", light ? "text-footer-muted" : "text-muted")}>
            Aakhaa Upachaar Kendra
          </span>
        )}
      </span>
    </span>
  );
}

import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-xl border border-border bg-surface px-4 text-base text-foreground placeholder:text-muted",
        className,
      )}
      {...props}
    />
  );
}

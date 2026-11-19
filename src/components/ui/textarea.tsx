import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-36 w-full rounded-xl border border-border bg-surface px-4 py-3 text-base text-foreground placeholder:text-muted",
        className,
      )}
      {...props}
    />
  );
}

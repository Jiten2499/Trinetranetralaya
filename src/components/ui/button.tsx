import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-action text-primary-foreground hover:bg-action-hover",
        secondary: "bg-secondary text-secondary-foreground hover:brightness-95",
        outline: "border border-border bg-surface text-foreground hover:bg-background-secondary",
        inverse: "border border-white/30 bg-surface text-foreground hover:bg-background-secondary",
        ghost: "text-foreground hover:bg-background-secondary",
      },
      size: {
        default: "h-11 px-5 text-base",
        lg: "h-12 px-6 text-base",
        sm: "h-10 px-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonStyle = VariantProps<typeof buttonVariants>;

type ButtonProps = ButtonStyle & {
  className?: string;
  children: React.ReactNode;
  href?: string;
  external?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "href" | "children">;

export function Button({
  href,
  external,
  variant,
  size,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (href) {
    const isExternal = external || /^(https?:|tel:|mailto:)/.test(href);
    const onClick = props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement> | undefined;
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          onClick={onClick}
          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}

export { buttonVariants };

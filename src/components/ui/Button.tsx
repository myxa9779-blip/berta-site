import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "light";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  showArrow?: boolean;
  className?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white hover:bg-[#b80f16] focus-visible:ring-accent",
  secondary: "border border-ink/20 bg-white text-ink hover:border-ink hover:bg-mist focus-visible:ring-ink",
  ghost: "text-ink hover:bg-ink/5 focus-visible:ring-ink",
  light: "border border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white hover:text-ink focus-visible:ring-white",
};

export function Button({
  children,
  href,
  variant = "primary",
  showArrow = false,
  className = "",
  ...buttonProps
}: ButtonProps) {
  const classes = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variants[variant]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {showArrow && <ArrowUpRight aria-hidden="true" className="h-4 w-4" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...buttonProps}>
      {content}
    </button>
  );
}

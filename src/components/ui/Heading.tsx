import type { ReactNode } from "react";

interface HeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

export function Heading({ eyebrow, title, description, align = "left", tone = "light", className = "" }: HeadingProps) {
  const alignment = align === "center" ? "mx-auto items-center text-center" : "items-start";
  const titleColor = tone === "dark" ? "text-white" : "text-ink";
  const descriptionColor = tone === "dark" ? "text-white/70" : "text-steel";

  return (
    <div className={`flex max-w-4xl flex-col ${alignment} ${className}`}>
      {eyebrow && <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-accent">{eyebrow}</p>}
      <h2 className={`text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-6xl ${titleColor}`}>
        {title}
      </h2>
      {description && <p className={`mt-6 max-w-2xl text-pretty text-base leading-7 sm:text-lg ${descriptionColor}`}>{description}</p>}
    </div>
  );
}

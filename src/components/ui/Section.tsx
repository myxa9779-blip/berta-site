import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className = "", id }: SectionProps) {
  return (
    <section id={id} className={`py-20 sm:py-24 lg:py-32 ${className}`}>
      {children}
    </section>
  );
}

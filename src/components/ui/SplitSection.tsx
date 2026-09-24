import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

interface SplitSectionProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  id?: string;
  bodyClassName?: string;
}

export function SplitSection({
  eyebrow,
  title,
  description,
  action,
  children,
  id,
  bodyClassName = "",
}: SplitSectionProps) {
  return (
    <section id={id}>
      <div className="bg-[#0b1620] py-16 sm:py-20 lg:py-24">
        <Container className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Heading tone="dark" eyebrow={eyebrow} title={title} />
          {action}
        </Container>
      </div>
      <div className="bg-[#7e7e83] py-16 sm:py-20 lg:py-24">
        <Container className={bodyClassName}>
          {description ? (
            <p className="mb-12 max-w-2xl text-pretty text-base leading-7 text-white sm:text-lg">
              {description}
            </p>
          ) : null}
          {children}
        </Container>
      </div>
    </section>
  );
}

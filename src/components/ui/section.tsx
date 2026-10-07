import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { Container } from "./container";

type SectionProps = {
  readonly children: ReactNode;
  readonly id?: string;
  readonly label?: string;
  readonly className?: string;
  readonly containerClassName?: string;
};

export function Section({
  children,
  id,
  label,
  className,
  containerClassName,
}: SectionProps) {
  return (
    <section
      aria-label={label}
      className={cn("section", className)}
      id={id}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

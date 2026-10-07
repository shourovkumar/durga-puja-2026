import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type TextProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

type HeadingProps = TextProps & {
  readonly id?: string;
};

export function Eyebrow({ children, className }: TextProps) {
  return (
    <p
      className={cn("type-label", className)}
    >
      {children}
    </p>
  );
}

export function DisplayHeading({ children, className, id }: HeadingProps) {
  return (
    <h1
      className={cn("type-display", className)}
      id={id}
    >
      {children}
    </h1>
  );
}

export function BodyText({ children, className }: TextProps) {
  return (
    <p className={cn("type-body", className)}>{children}</p>
  );
}

export function SectionHeading({ children, className, id }: HeadingProps) {
  return (
    <h2 className={cn("type-section", className)} id={id}>
      {children}
    </h2>
  );
}

export function BengaliText({ children, className }: TextProps) {
  return (
    <p className={cn("type-bengali", className)} lang="bn">
      {children}
    </p>
  );
}

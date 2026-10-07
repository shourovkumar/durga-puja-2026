import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type ButtonLinkProps = {
  readonly children: ReactNode;
  readonly href: string;
  readonly variant?: "primary" | "secondary";
  readonly className?: string;
};

export function ButtonLink({
  children,
  href,
  variant = "primary",
  className,
}: ButtonLinkProps) {
  return (
    <a className={cn("button-link", `button-link--${variant}`, className)} href={href}>
      {children}
      <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.6} />
    </a>
  );
}

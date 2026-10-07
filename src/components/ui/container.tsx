import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type ContainerProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return <div className={cn("site-container", className)}>{children}</div>;
}

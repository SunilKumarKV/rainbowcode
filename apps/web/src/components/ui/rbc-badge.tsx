import type { HTMLAttributes, ReactNode } from "react";
import { rbcBadge } from "@/lib/design-system/ui-tokens";

type RbcBadgeVariant = "neutral" | "success" | "warning" | "info";

type RbcBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  readonly variant?: RbcBadgeVariant;
  readonly children: ReactNode;
};

export function RbcBadge({
  variant = "neutral",
  className = "",
  children,
  ...props
}: RbcBadgeProps) {
  return (
    <span
      className={`${rbcBadge.base} ${rbcBadge[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
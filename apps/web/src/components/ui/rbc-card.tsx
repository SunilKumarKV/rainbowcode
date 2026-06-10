import type { HTMLAttributes, ReactNode } from "react";
import { rbcSurface } from "@/lib/design-system/ui-tokens";

type RbcCardProps = HTMLAttributes<HTMLDivElement> & {
  readonly children: ReactNode;
};

export function RbcCard({ className = "", children, ...props }: RbcCardProps) {
  return (
    <div
      className={`rounded-3xl ${rbcSurface.card} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
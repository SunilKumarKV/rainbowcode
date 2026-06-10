import type { ButtonHTMLAttributes, ReactNode } from "react";
import { rbcButton } from "@/lib/design-system/ui-tokens";

type RbcButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type RbcButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  readonly variant?: RbcButtonVariant;
  readonly children: ReactNode;
};

export function RbcButton({
  variant = "secondary",
  className = "",
  children,
  ...props
}: RbcButtonProps) {
  return (
    <button
      type="button"
      className={`${rbcButton.base} ${rbcButton[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
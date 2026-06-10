import type { HTMLAttributes, ReactNode } from "react";
import { rbcSurface } from "@/lib/design-system/ui-tokens";

type RbcPanelProps = HTMLAttributes<HTMLElement> & {
  readonly title?: string;
  readonly eyebrow?: string;
  readonly children: ReactNode;
};

export function RbcPanel({
  title,
  eyebrow,
  className = "",
  children,
  ...props
}: RbcPanelProps) {
  return (
    <section
      className={`rounded-2xl p-4 ${rbcSurface.panel} ${className}`}
      {...props}
    >
      {eyebrow === undefined ? null : (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">
          {eyebrow}
        </p>
      )}

      {title === undefined ? null : (
        <h2 className="mt-1 text-sm font-semibold text-slate-950 dark:text-white">
          {title}
        </h2>
      )}

      <div className={title === undefined && eyebrow === undefined ? "" : "mt-4"}>
        {children}
      </div>
    </section>
  );
}
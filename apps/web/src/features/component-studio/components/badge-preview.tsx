"use client";

import { useComponentStudioStore } from "@/features/component-studio/store/component-studio-store";

const badgeSizeClassMap = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
  lg: "px-3 py-1.5 text-sm",
} as const;

const badgeVariantClassMap = {
  primary: "bg-[var(--color-primary)] text-white",
  secondary: "bg-[var(--color-secondary)] text-white",
  success: "bg-[var(--color-success)] text-white",
  warning: "bg-[var(--color-warning)] text-slate-950",
  destructive: "bg-[var(--color-destructive)] text-white",
  outline:
    "border border-[var(--color-primary)] bg-transparent text-[var(--color-primary)]",
} as const;

export function BadgePreview() {
  const badgeDefinition = useComponentStudioStore(
    (state) => state.badgeDefinition,
  );

  const previewLabel =
    badgeDefinition.label.trim().length > 0 ? badgeDefinition.label : "Badge";

  return (
    <section
      aria-label="Badge component preview"
      className="w-full max-w-xl rounded-[var(--radius-xl)] rbc-surface-card p-8 text-center"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--theme-text-subtle)]">
        Badge Preview
      </p>

      <h2 className="mt-2 text-2xl font-bold text-[var(--surface-foreground)]">
        Badge Builder
      </h2>

      <p className="mt-2 text-sm text-[var(--theme-text-muted)]">
        Theme-token powered status and label badges.
      </p>

      <div className="mt-8 flex justify-center">
        <span
          className={`inline-flex items-center rounded-[var(--radius-${badgeDefinition.radius})] font-semibold ${badgeSizeClassMap[badgeDefinition.size]} ${badgeVariantClassMap[badgeDefinition.variant]}`}
        >
          {previewLabel}
        </span>
      </div>
    </section>
  );
}

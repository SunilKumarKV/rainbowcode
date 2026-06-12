"use client";

import { useComponentStudioStore } from "@/features/component-studio/store/component-studio-store";

const sizeClassMap = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
} as const;

const variantClassMap = {
  primary:
    "bg-[var(--color-primary)] text-[var(--surface-on-primary)] hover:opacity-90 focus-visible:ring-[var(--color-primary)]",
  secondary:
    "bg-[var(--color-secondary)] text-[var(--surface-on-secondary)] hover:opacity-90 focus-visible:ring-[var(--color-secondary)]",
  outline:
    "border border-[var(--color-primary)] bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--surface-on-primary)] focus-visible:ring-[var(--color-primary)]",
} as const;

export function ButtonPreview() {
  const buttonDefinition = useComponentStudioStore(
    (state) => state.buttonDefinition,
  );

  const previewLabel =
    buttonDefinition.label.trim().length > 0
      ? buttonDefinition.label
      : "Button Label";

  return (
    <section
      aria-label="Button component preview"
      className="w-full max-w-xl rounded-[var(--radius-xl)] rbc-surface-card p-8 text-center"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--theme-text-subtle)]">
        Component Preview
      </p>

      <h2 className="mt-2 text-2xl font-bold text-[var(--surface-foreground)]">
        Button Builder
      </h2>

      <p className="mt-2 text-sm text-[var(--theme-text-muted)]">
        Theme-token powered React button preview.
      </p>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          className={`inline-flex items-center justify-center rounded-[var(--radius-${buttonDefinition.radius})] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${sizeClassMap[buttonDefinition.size]} ${variantClassMap[buttonDefinition.variant]}`}
        >
          {previewLabel}
        </button>
      </div>
    </section>
  );
}

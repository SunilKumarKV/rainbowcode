"use client";

import { useComponentStudioStore } from "@/features/component-studio/store/component-studio-store";

const inputSizeClassMap = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base",
} as const;

const inputVariantClassMap = {
  default:
    "border border-[var(--theme-border-soft)] bg-[var(--surface-panel-strong)] text-[var(--surface-foreground)] placeholder:text-[var(--theme-text-subtle)]",
  filled:
    "border border-transparent bg-[var(--surface-muted)] text-[var(--surface-foreground)] placeholder:text-[var(--theme-text-muted)]",
  outline:
    "border border-[var(--color-primary)] bg-transparent text-[var(--surface-foreground)] placeholder:text-[var(--theme-text-subtle)]",
} as const;

export function InputPreview() {
  const inputDefinition = useComponentStudioStore(
    (state) => state.inputDefinition,
  );

  const label =
    inputDefinition.label.trim().length > 0
      ? inputDefinition.label
      : "Input label";

  const placeholder =
    inputDefinition.placeholder.trim().length > 0
      ? inputDefinition.placeholder
      : "Placeholder text";

  const helperText =
    inputDefinition.helperText.trim().length > 0
      ? inputDefinition.helperText
      : "Helper text appears here.";

  return (
    <section
      aria-label="Input component preview"
      className="w-full max-w-xl rounded-[var(--radius-xl)] rbc-surface-card p-8"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--theme-text-subtle)]">
        Input Preview
      </p>

      <label className="mt-6 block">
        <span className="text-sm font-medium text-[var(--surface-foreground)]">
          {label}
        </span>

        <input
          type="text"
          placeholder={placeholder}
          disabled={inputDefinition.disabled}
          className={`mt-2 w-full rounded-[var(--radius-${inputDefinition.radius})] outline-none transition focus:ring-2 focus:ring-[var(--theme-focus-ring)] disabled:cursor-not-allowed disabled:opacity-60 ${inputSizeClassMap[inputDefinition.size]} ${inputVariantClassMap[inputDefinition.variant]}`}
        />

        <span className="mt-2 block text-xs text-[var(--theme-text-muted)]">
          {helperText}
        </span>
      </label>
    </section>
  );
}

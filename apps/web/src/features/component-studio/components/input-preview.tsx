"use client";

import { useComponentStudioStore } from "@/features/component-studio/store/component-studio-store";

const inputSizeClassMap = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base",
} as const;

const inputVariantClassMap = {
  default:
    "border border-slate-300 bg-white text-slate-950 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white",
  filled:
    "border border-transparent bg-slate-100 text-slate-950 placeholder:text-slate-500 dark:bg-slate-900 dark:text-white",
  outline:
    "border border-[var(--color-primary)] bg-transparent text-slate-950 placeholder:text-slate-400 dark:text-white",
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
      className="w-full max-w-xl rounded-[var(--radius-xl)] border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-950"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        Input Preview
      </p>

      <label className="mt-6 block">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </span>

        <input
          type="text"
          placeholder={placeholder}
          disabled={inputDefinition.disabled}
          className={`mt-2 w-full rounded-[var(--radius-${inputDefinition.radius})] outline-none transition focus:ring-2 focus:ring-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-60 ${inputSizeClassMap[inputDefinition.size]} ${inputVariantClassMap[inputDefinition.variant]}`}
        />

        <span className="mt-2 block text-xs text-slate-500">
          {helperText}
        </span>
      </label>
    </section>
  );
}
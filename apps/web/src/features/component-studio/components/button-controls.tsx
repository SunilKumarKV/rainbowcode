"use client";

import { useComponentStudioStore } from "@/features/component-studio/store/component-studio-store";
import type {
  ButtonRadius,
  ButtonSize,
  ButtonVariant,
} from "@/features/component-studio/types/component-definition";

const variants: readonly ButtonVariant[] = ["primary", "secondary", "outline"];
const sizes: readonly ButtonSize[] = ["sm", "md", "lg"];
const radii: readonly ButtonRadius[] = ["sm", "md", "lg", "xl"];

export function ButtonControls() {
  const buttonDefinition = useComponentStudioStore(
    (state) => state.buttonDefinition,
  );
  const updateButton = useComponentStudioStore((state) => state.updateButton);
  const resetButton = useComponentStudioStore((state) => state.resetButton);

  return (
    <section className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-950 dark:text-white">
            Button
          </h3>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Configure the selected button component.
          </p>
        </div>

        <button
          type="button"
          onClick={resetButton}
          className="rounded-lg px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:text-slate-300 dark:hover:bg-slate-900"
        >
          Reset
        </button>
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <label
            htmlFor="button-label"
            className="text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            Label
          </label>
          <input
            id="button-label"
            type="text"
            value={buttonDefinition.label}
            onChange={(event) =>
              updateButton({ label: event.currentTarget.value })
            }
            className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none focus:bg-white focus:ring-2 focus:ring-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:ring-slate-700"
          />
        </div>

        <div>
          <label
            htmlFor="button-variant"
            className="text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            Variant
          </label>
          <select
            id="button-variant"
            value={buttonDefinition.variant}
            onChange={(event) =>
              updateButton({
                variant: event.currentTarget.value as ButtonVariant,
              })
            }
            className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none focus:bg-white focus:ring-2 focus:ring-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:ring-slate-700"
          >
            {variants.map((variant) => (
              <option key={variant} value={variant}>
                {variant}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="button-size"
            className="text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            Size
          </label>
          <select
            id="button-size"
            value={buttonDefinition.size}
            onChange={(event) =>
              updateButton({
                size: event.currentTarget.value as ButtonSize,
              })
            }
            className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none focus:bg-white focus:ring-2 focus:ring-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:ring-slate-700"
          >
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="button-radius"
            className="text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            Radius
          </label>
          <select
            id="button-radius"
            value={buttonDefinition.radius}
            onChange={(event) =>
              updateButton({
                radius: event.currentTarget.value as ButtonRadius,
              })
            }
            className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none focus:bg-white focus:ring-2 focus:ring-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:ring-slate-700"
          >
            {radii.map((radius) => (
              <option key={radius} value={radius}>
                {radius}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
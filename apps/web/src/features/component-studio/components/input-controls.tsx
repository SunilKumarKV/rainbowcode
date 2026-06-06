"use client";

import { inputPresets } from "@/features/component-studio/presets/input-presets";
import { useComponentStudioStore } from "@/features/component-studio/store/component-studio-store";
import type {
  InputRadius,
  InputSize,
  InputVariant,
} from "@/features/component-studio/types/component-definition";

const variants: readonly InputVariant[] = ["default", "filled", "outline"];
const sizes: readonly InputSize[] = ["sm", "md", "lg"];
const radii: readonly InputRadius[] = ["sm", "md", "lg", "xl"];

export function InputControls() {
  const inputDefinition = useComponentStudioStore(
    (state) => state.inputDefinition,
  );
  const updateInput = useComponentStudioStore((state) => state.updateInput);
  const resetInput = useComponentStudioStore((state) => state.resetInput);

  return (
    <section className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-950 dark:text-white">
            Input
          </h3>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Configure the selected input component.
          </p>
        </div>

        <button
          type="button"
          onClick={resetInput}
          className="rounded-lg px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:text-slate-300 dark:hover:bg-slate-900"
        >
          Reset
        </button>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 p-3 dark:border-slate-800">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
          Presets
        </p>

        <div className="mt-3 grid gap-2">
          {inputPresets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => updateInput(preset.definition)}
              className="rounded-xl border border-slate-200 p-3 text-left transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:hover:bg-slate-900"
            >
              <span className="block text-sm font-semibold text-slate-900 dark:text-white">
                {preset.name}
              </span>
              <span className="mt-1 block text-xs leading-5 text-slate-500">
                {preset.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <label
            htmlFor="input-label"
            className="text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            Label
          </label>
          <input
            id="input-label"
            type="text"
            value={inputDefinition.label}
            onChange={(event) =>
              updateInput({ label: event.currentTarget.value })
            }
            className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none focus:bg-white focus:ring-2 focus:ring-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:ring-slate-700"
          />
        </div>

        <div>
          <label
            htmlFor="input-placeholder"
            className="text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            Placeholder
          </label>
          <input
            id="input-placeholder"
            type="text"
            value={inputDefinition.placeholder}
            onChange={(event) =>
              updateInput({ placeholder: event.currentTarget.value })
            }
            className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none focus:bg-white focus:ring-2 focus:ring-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:ring-slate-700"
          />
        </div>

        <div>
          <label
            htmlFor="input-helper"
            className="text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            Helper text
          </label>
          <textarea
            id="input-helper"
            value={inputDefinition.helperText}
            onChange={(event) =>
              updateInput({ helperText: event.currentTarget.value })
            }
            rows={3}
            className="mt-1 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-950 outline-none focus:bg-white focus:ring-2 focus:ring-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:ring-slate-700"
          />
        </div>

        <div>
          <label
            htmlFor="input-variant"
            className="text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            Variant
          </label>
          <select
            id="input-variant"
            value={inputDefinition.variant}
            onChange={(event) =>
              updateInput({
                variant: event.currentTarget.value as InputVariant,
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
            htmlFor="input-size"
            className="text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            Size
          </label>
          <select
            id="input-size"
            value={inputDefinition.size}
            onChange={(event) =>
              updateInput({
                size: event.currentTarget.value as InputSize,
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
            htmlFor="input-radius"
            className="text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            Radius
          </label>
          <select
            id="input-radius"
            value={inputDefinition.radius}
            onChange={(event) =>
              updateInput({
                radius: event.currentTarget.value as InputRadius,
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

        <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
          <div>
            <label
              htmlFor="input-disabled"
              className="text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              Disabled
            </label>
            <p className="mt-1 text-xs text-slate-500">
              Disable user interaction.
            </p>
          </div>

          <input
            id="input-disabled"
            type="checkbox"
            checked={inputDefinition.disabled}
            onChange={(event) =>
              updateInput({ disabled: event.currentTarget.checked })
            }
            className="size-4 accent-slate-950 dark:accent-white"
          />
        </div>
      </div>
    </section>
  );
}
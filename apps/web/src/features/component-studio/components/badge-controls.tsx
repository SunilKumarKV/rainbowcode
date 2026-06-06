"use client";

import { useComponentStudioStore } from "@/features/component-studio/store/component-studio-store";
import type {
  BadgeRadius,
  BadgeSize,
  BadgeVariant,
} from "@/features/component-studio/types/component-definition";

const variants: readonly BadgeVariant[] = [
  "primary",
  "secondary",
  "success",
  "warning",
  "destructive",
  "outline",
];

const sizes: readonly BadgeSize[] = ["sm", "md", "lg"];
const radii: readonly BadgeRadius[] = ["sm", "md", "lg", "xl"];

export function BadgeControls() {
  const badgeDefinition = useComponentStudioStore(
    (state) => state.badgeDefinition,
  );
  const updateBadge = useComponentStudioStore((state) => state.updateBadge);
  const resetBadge = useComponentStudioStore((state) => state.resetBadge);

  return (
    <section className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-950 dark:text-white">
            Badge
          </h3>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Configure the selected badge component.
          </p>
        </div>

        <button
          type="button"
          onClick={resetBadge}
          className="rounded-lg px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:text-slate-300 dark:hover:bg-slate-900"
        >
          Reset
        </button>
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <label
            htmlFor="badge-label"
            className="text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            Label
          </label>
          <input
            id="badge-label"
            type="text"
            value={badgeDefinition.label}
            onChange={(event) =>
              updateBadge({ label: event.currentTarget.value })
            }
            className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none focus:bg-white focus:ring-2 focus:ring-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:ring-slate-700"
          />
        </div>

        <div>
          <label
            htmlFor="badge-variant"
            className="text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            Variant
          </label>
          <select
            id="badge-variant"
            value={badgeDefinition.variant}
            onChange={(event) =>
              updateBadge({
                variant: event.currentTarget.value as BadgeVariant,
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
            htmlFor="badge-size"
            className="text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            Size
          </label>
          <select
            id="badge-size"
            value={badgeDefinition.size}
            onChange={(event) =>
              updateBadge({
                size: event.currentTarget.value as BadgeSize,
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
            htmlFor="badge-radius"
            className="text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            Radius
          </label>
          <select
            id="badge-radius"
            value={badgeDefinition.radius}
            onChange={(event) =>
              updateBadge({
                radius: event.currentTarget.value as BadgeRadius,
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
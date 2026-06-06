"use client";

import { useComponentStudioStore } from "@/features/component-studio/store/component-studio-store";
import type {
  CardRadius,
  CardVariant,
} from "@/features/component-studio/types/component-definition";

const variants: readonly CardVariant[] = ["simple", "feature", "pricing"];
const radii: readonly CardRadius[] = ["sm", "md", "lg", "xl"];

export function CardControls() {
  const cardDefinition = useComponentStudioStore((state) => state.cardDefinition);
  const updateCard = useComponentStudioStore((state) => state.updateCard);
  const resetCard = useComponentStudioStore((state) => state.resetCard);

  return (
    <section className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-950 dark:text-white">
            Card
          </h3>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Configure the selected card component.
          </p>
        </div>

        <button
          type="button"
          onClick={resetCard}
          className="rounded-lg px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:text-slate-300 dark:hover:bg-slate-900"
        >
          Reset
        </button>
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <label
            htmlFor="card-title"
            className="text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            Title
          </label>
          <input
            id="card-title"
            type="text"
            value={cardDefinition.title}
            onChange={(event) =>
              updateCard({ title: event.currentTarget.value })
            }
            className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none focus:bg-white focus:ring-2 focus:ring-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:ring-slate-700"
          />
        </div>

        <div>
          <label
            htmlFor="card-description"
            className="text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            Description
          </label>
          <textarea
            id="card-description"
            value={cardDefinition.description}
            onChange={(event) =>
              updateCard({ description: event.currentTarget.value })
            }
            rows={4}
            className="mt-1 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-950 outline-none focus:bg-white focus:ring-2 focus:ring-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:ring-slate-700"
          />
        </div>

        <div>
          <label
            htmlFor="card-variant"
            className="text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            Variant
          </label>
          <select
            id="card-variant"
            value={cardDefinition.variant}
            onChange={(event) =>
              updateCard({
                variant: event.currentTarget.value as CardVariant,
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
            htmlFor="card-radius"
            className="text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            Radius
          </label>
          <select
            id="card-radius"
            value={cardDefinition.radius}
            onChange={(event) =>
              updateCard({
                radius: event.currentTarget.value as CardRadius,
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
              htmlFor="card-show-action"
              className="text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              Show action
            </label>
            <p className="mt-1 text-xs text-slate-500">
              Toggle the card action button.
            </p>
          </div>

          <input
            id="card-show-action"
            type="checkbox"
            checked={cardDefinition.showAction}
            onChange={(event) =>
              updateCard({ showAction: event.currentTarget.checked })
            }
            className="size-4 accent-slate-950 dark:accent-white"
          />
        </div>

        {cardDefinition.showAction ? (
          <div>
            <label
              htmlFor="card-action-label"
              className="text-xs font-medium text-slate-600 dark:text-slate-400"
            >
              Action label
            </label>
            <input
              id="card-action-label"
              type="text"
              value={cardDefinition.actionLabel}
              onChange={(event) =>
                updateCard({ actionLabel: event.currentTarget.value })
              }
              className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none focus:bg-white focus:ring-2 focus:ring-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:ring-slate-700"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
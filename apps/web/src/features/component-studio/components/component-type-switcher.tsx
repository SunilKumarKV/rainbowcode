"use client";

import { useComponentStudioStore } from "@/features/component-studio/store/component-studio-store";
import type { ComponentType } from "@/features/component-studio/types/component-definition";
import { getComponentMetadata } from "@/features/component-studio/utils/component-labels";

const componentTypes: readonly ComponentType[] = [
  "button",
  "card",
  "input",
  "badge",
];

export function ComponentTypeSwitcher() {
  const selectedComponent = useComponentStudioStore(
    (state) => state.selectedComponent,
  );
  const setSelectedComponent = useComponentStudioStore(
    (state) => state.setSelectedComponent,
  );
  const selectedMetadata = getComponentMetadata(selectedComponent);

  return (
    <section className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
      <label
        htmlFor="component-type"
        className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
      >
        Component
      </label>

      <select
        id="component-type"
        value={selectedComponent}
        onChange={(event) =>
          setSelectedComponent(event.currentTarget.value as ComponentType)
        }
        className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none focus:bg-white focus:ring-2 focus:ring-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:ring-slate-700"
      >
        {componentTypes.map((componentType) => {
          const metadata = getComponentMetadata(componentType);

          return (
            <option key={componentType} value={componentType}>
              {metadata.label}
            </option>
          );
        })}
      </select>

      <p className="mt-3 text-xs leading-5 text-slate-500">
        {selectedMetadata.description}
      </p>
    </section>
  );
}
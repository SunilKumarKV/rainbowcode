"use client";

import { useComponentStudioStore } from "@/features/component-studio/store/component-studio-store";
import type { ComponentType } from "@/features/component-studio/types/component-definition";

const componentTypes: readonly {
  readonly label: string;
  readonly value: ComponentType;
}[] = [
  { label: "Button", value: "button" },
  { label: "Card", value: "card" },
];

export function ComponentTypeSwitcher() {
  const selectedComponent = useComponentStudioStore(
    (state) => state.selectedComponent,
  );
  const setSelectedComponent = useComponentStudioStore(
    (state) => state.setSelectedComponent,
  );

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
        {componentTypes.map((componentType) => (
          <option key={componentType.value} value={componentType.value}>
            {componentType.label}
          </option>
        ))}
      </select>
    </section>
  );
}
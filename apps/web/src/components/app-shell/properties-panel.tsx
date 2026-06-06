"use client";

import { ComponentStudioPanel } from "@/features/component-studio/components/component-studio-panel";
import { ThemeStudioPanel } from "@/features/theme-studio/components/theme-studio-panel";

export function PropertiesPanel() {
  return (
    <aside
      aria-label="Properties panel"
      className="hidden w-80 shrink-0 overflow-y-auto border-l border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 xl:block"
    >
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Studios
        </p>
        <h2 className="mt-1 text-lg font-bold text-slate-950 dark:text-white">
          Properties
        </h2>
      </div>

      <div className="space-y-4">
        <ComponentStudioPanel />
        <ThemeStudioPanel />
      </div>
    </aside>
  );
}
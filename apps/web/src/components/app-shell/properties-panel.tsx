"use client";

import { ComponentStudioPanel } from "@/features/component-studio/components/component-studio-panel";
import { ThemeStudioPanel } from "@/features/theme-studio/components/theme-studio-panel";

export function PropertiesPanel() {
  return (
    <div className="space-y-3">
      <section className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">
              Inspector
            </p>
            <h2 className="mt-1 text-sm font-black text-slate-950 dark:text-white">
              Design Controls
            </h2>
          </div>

          <span className="rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-black text-indigo-700 ring-1 ring-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:ring-indigo-900">
            Live
          </span>
        </div>
      </section>

      <ThemeStudioPanel />
      <ComponentStudioPanel />
    </div>
  );
}
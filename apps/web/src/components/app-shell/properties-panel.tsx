"use client";

import { ComponentStudioPanel } from "@/features/component-studio/components/component-studio-panel";
import { ThemeStudioPanel } from "@/features/theme-studio/components/theme-studio-panel";

export function PropertiesPanel() {
  return (
    <div className="space-y-3">
      <section className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">
          Inspector
        </p>
        <h2 className="mt-1 text-sm font-black text-slate-950 dark:text-white">
          Studio Controls
        </h2>
        <p className="mt-2 text-xs leading-5 text-slate-500">
          Theme and component controls stay here while the canvas remains focused.
        </p>
      </section>

      <ThemeStudioPanel />
      <ComponentStudioPanel />
    </div>
  );
}
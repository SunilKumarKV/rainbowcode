"use client";

import { CanvasStudioPanel } from "@/features/canvas-studio/components/canvas-studio-panel";

export function Workspace() {
  return (
    <section
      aria-label="Main editor workspace"
      className="relative h-full min-h-0 overflow-hidden rbc-editor-grid"
    >
      <div className="absolute left-4 top-4 z-20 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/90">
        <span className="text-xs font-black text-slate-950 dark:text-white">
          Canvas Studio
        </span>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-black text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-900">
          V1 Ready
        </span>
        <span className="hidden text-xs text-slate-500 sm:inline">
          Build visual layouts and export code
        </span>
      </div>

      <div className="h-full overflow-auto p-4 pt-20">
        <div className="mx-auto min-w-[980px] max-w-[1320px]">
          <CanvasStudioPanel />
        </div>
      </div>
    </section>
  );
}
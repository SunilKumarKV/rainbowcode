"use client";

import { CanvasStudioPanel } from "@/features/canvas-studio/components/canvas-studio-panel";

export function Workspace() {
  return (
    <main className="min-h-full bg-slate-100 p-4 dark:bg-slate-950 md:p-6">
      <section
        aria-label="Main editing workspace"
        className="min-h-[620px] rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-6"
      >
        <div className="mb-4 flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 dark:border-slate-800 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Canvas Studio
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
              Visual Design Canvas
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Add, select, move, and delete visual elements.
            </p>
          </div>

          <div className="flex gap-2 text-xs text-slate-500">
            <span className="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700">
              Konva
            </span>
            <span className="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700">
              Live Canvas
            </span>
          </div>
        </div>

        <CanvasStudioPanel />
      </section>
    </main>
  );
}
"use client";

import { RbcBadge } from "@/components/ui/rbc-badge";
import { CanvasStudioPanel } from "@/features/canvas-studio/components/canvas-studio-panel";

export function Workspace() {
  return (
    <section
      aria-label="Main editing workspace"
      className="mx-auto flex min-h-full w-full max-w-[1500px] flex-col gap-3"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <RbcBadge variant="success">Canvas V1</RbcBadge>
            <RbcBadge variant="info">Design System Polish</RbcBadge>
          </div>
          <h1 className="mt-2 text-xl font-black tracking-tight text-slate-950 dark:text-white">
            Canvas Studio
          </h1>
        </div>

        <p className="max-w-xl text-sm leading-6 text-slate-500">
          Editor-first workspace for visual layout, grouping, templates,
          import/export, and generated code.
        </p>
      </div>

      <CanvasStudioPanel />
    </section>
  );
}
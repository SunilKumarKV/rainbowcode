"use client";

import { RbcBadge } from "@/components/ui/rbc-badge";
import { RbcCard } from "@/components/ui/rbc-card";
import { CanvasStudioPanel } from "@/features/canvas-studio/components/canvas-studio-panel";

export function Workspace() {
  return (
    <RbcCard className="overflow-hidden p-0">
      <section
        aria-label="Main editing workspace"
        className="relative overflow-hidden p-4 sm:p-6"
      >
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-20 h-40 w-40 rounded-full bg-fuchsia-400/10 blur-3xl" />

        <div className="relative z-10 mb-5 flex flex-col justify-between gap-4 border-b border-slate-200/80 pb-5 dark:border-slate-800 md:flex-row md:items-start">
          <div>
            <div className="flex flex-wrap gap-2">
              <RbcBadge variant="success">Canvas V1 Ready</RbcBadge>
              <RbcBadge variant="info">Design System Phase</RbcBadge>
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
              Visual Design Canvas
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              Build layouts visually with nodes, groups, templates, snap grid,
              undo/redo, import/export, and production-ready generated code.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <RbcBadge variant="neutral">Konva</RbcBadge>
            <RbcBadge variant="neutral">Live Canvas</RbcBadge>
            <RbcBadge variant="neutral">Code Export</RbcBadge>
          </div>
        </div>

        <div className="relative z-10">
          <CanvasStudioPanel />
        </div>
      </section>
    </RbcCard>
  );
}
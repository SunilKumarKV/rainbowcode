"use client";

import { CanvasStage } from "@/features/canvas-studio/components/canvas-stage";
import { CanvasToolbar } from "@/features/canvas-studio/components/canvas-toolbar";
import { useCanvasStore } from "@/features/canvas-studio/store/canvas-store";

export function CanvasStudioPanel() {
  const nodes = useCanvasStore((state) => state.nodes);
  const selectedNodeId = useCanvasStore((state) => state.selectedNodeId);

  return (
    <section
      aria-label="Canvas Studio"
      className="space-y-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
    >
      <CanvasToolbar />

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-400">
        <span>Nodes: {nodes.length}</span>
        <span>
          Selected:{" "}
          {selectedNodeId === null ? "None" : selectedNodeId.split("-")[0]}
        </span>
      </div>

      <CanvasStage />
    </section>
  );
}
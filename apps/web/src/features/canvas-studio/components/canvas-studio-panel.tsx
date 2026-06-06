"use client";

import { CanvasLayersPanel } from "@/features/canvas-studio/components/canvas-layers-panel";
import { CanvasStage } from "@/features/canvas-studio/components/canvas-stage";
import { CanvasToolbar } from "@/features/canvas-studio/components/canvas-toolbar";
import { useCanvasKeyboardShortcuts } from "@/features/canvas-studio/hooks/use-canvas-keyboard-shortcuts";
import { useCanvasStore } from "@/features/canvas-studio/store/canvas-store";

export function CanvasStudioPanel() {
  useCanvasKeyboardShortcuts();

  const nodes = useCanvasStore((state) => state.nodes);
  const selectedNodeId = useCanvasStore((state) => state.selectedNodeId);
  const zoom = useCanvasStore((state) => state.zoom);

  return (
    <section
      aria-label="Canvas Studio"
      className="space-y-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
    >
      <CanvasToolbar />

      <div className="grid gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-400 md:grid-cols-3">
        <span>Nodes: {nodes.length}</span>
        <span>
          Selected:{" "}
          {selectedNodeId === null ? "None" : selectedNodeId.split("-")[0]}
        </span>
        <span>Zoom: {Math.round(zoom * 100)}%</span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-3 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950">
        Shortcuts:{" "}
        <kbd className="rounded border border-slate-200 px-1.5 py-0.5 dark:border-slate-700">
          Delete
        </kbd>{" "}
        remove selected,{" "}
        <kbd className="rounded border border-slate-200 px-1.5 py-0.5 dark:border-slate-700">
          Esc
        </kbd>{" "}
        clear selection,{" "}
        <kbd className="rounded border border-slate-200 px-1.5 py-0.5 dark:border-slate-700">
          Cmd/Ctrl + +
        </kbd>{" "}
        zoom in,{" "}
        <kbd className="rounded border border-slate-200 px-1.5 py-0.5 dark:border-slate-700">
          Cmd/Ctrl + -
        </kbd>{" "}
        zoom out,{" "}
        <kbd className="rounded border border-slate-200 px-1.5 py-0.5 dark:border-slate-700">
          Cmd/Ctrl + 0
        </kbd>{" "}
        reset zoom.
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
        <CanvasStage />
        <CanvasLayersPanel />
      </div>
    </section>
  );
}
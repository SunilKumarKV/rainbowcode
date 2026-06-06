"use client";

import { useCanvasStore } from "@/features/canvas-studio/store/canvas-store";

export function CanvasToolbar() {
  const addRectangle = useCanvasStore((state) => state.addRectangle);
  const addText = useCanvasStore((state) => state.addText);
  const deleteSelectedNode = useCanvasStore((state) => state.deleteSelectedNode);
  const resetCanvas = useCanvasStore((state) => state.resetCanvas);
  const selectedNodeId = useCanvasStore((state) => state.selectedNodeId);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Canvas Studio
        </p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Draw, select, move, and delete visual nodes.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={addRectangle}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          Add Rectangle
        </button>

        <button
          type="button"
          onClick={addText}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          Add Text
        </button>

        <button
          type="button"
          onClick={deleteSelectedNode}
          disabled={selectedNodeId === null}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          Delete
        </button>

        <button
          type="button"
          onClick={resetCanvas}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
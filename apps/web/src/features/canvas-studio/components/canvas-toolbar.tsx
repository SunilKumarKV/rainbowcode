"use client";

import { useCanvasStore } from "@/features/canvas-studio/store/canvas-store";
import type { CanvasTemplateId } from "@/features/canvas-studio/templates/canvas-templates";

export function CanvasToolbar() {
  const addRectangle = useCanvasStore((state) => state.addRectangle);
  const addText = useCanvasStore((state) => state.addText);
  const duplicateSelectedNodes = useCanvasStore(
    (state) => state.duplicateSelectedNodes,
  );
  const groupSelectedNodes = useCanvasStore((state) => state.groupSelectedNodes);
  const ungroupSelectedNodes = useCanvasStore(
    (state) => state.ungroupSelectedNodes,
  );
  const bringSelectedForward = useCanvasStore(
    (state) => state.bringSelectedForward,
  );
  const sendSelectedBackward = useCanvasStore(
    (state) => state.sendSelectedBackward,
  );
  const deleteSelectedNode = useCanvasStore((state) => state.deleteSelectedNode);
  const resetCanvas = useCanvasStore((state) => state.resetCanvas);
  const applyTemplate = useCanvasStore((state) => state.applyTemplate);
  const undo = useCanvasStore((state) => state.undo);
  const redo = useCanvasStore((state) => state.redo);
  const canUndo = useCanvasStore((state) => state.canUndo);
  const canRedo = useCanvasStore((state) => state.canRedo);
  const nodes = useCanvasStore((state) => state.nodes);
  const selectedNodeIds = useCanvasStore((state) => state.selectedNodeIds);
  const zoom = useCanvasStore((state) => state.zoom);
  const zoomIn = useCanvasStore((state) => state.zoomIn);
  const zoomOut = useCanvasStore((state) => state.zoomOut);
  const resetZoom = useCanvasStore((state) => state.resetZoom);

  const hasSelection = selectedNodeIds.length > 0;
  const canGroup = selectedNodeIds.length > 1;
  const canUngroup = nodes.some(
    (node) => node.type === "group" && selectedNodeIds.includes(node.id),
  );

  function handleTemplateChange(
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void {
    const templateId = event.currentTarget.value as CanvasTemplateId | "";

    if (templateId !== "") {
      applyTemplate(templateId);
      event.currentTarget.value = "";
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Canvas Studio
        </p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Draw, select, move, resize, duplicate, group, ungroup, reorder, and
          zoom visual nodes.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <select
          aria-label="Apply canvas template"
          defaultValue=""
          onChange={handleTemplateChange}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
        >
          <option value="" disabled>
            Templates
          </option>
          <option value="hero">Hero Section</option>
          <option value="pricing-card">Pricing Card</option>
        </select>

        <button
          type="button"
          onClick={undo}
          disabled={!canUndo}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          Undo
        </button>

        <button
          type="button"
          onClick={redo}
          disabled={!canRedo}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          Redo
        </button>

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
          onClick={duplicateSelectedNodes}
          disabled={!hasSelection}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          Duplicate
        </button>

        <button
          type="button"
          onClick={groupSelectedNodes}
          disabled={!canGroup}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          Group
        </button>

        <button
          type="button"
          onClick={ungroupSelectedNodes}
          disabled={!canUngroup}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          Ungroup
        </button>

        <button
          type="button"
          onClick={bringSelectedForward}
          disabled={!hasSelection}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          Forward
        </button>

        <button
          type="button"
          onClick={sendSelectedBackward}
          disabled={!hasSelection}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          Backward
        </button>

        <div className="flex items-center gap-1 rounded-xl border border-slate-200 px-2 dark:border-slate-800">
          <button
            type="button"
            onClick={zoomOut}
            aria-label="Zoom out"
            className="px-2 py-2 text-sm font-medium text-slate-700 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:text-slate-200"
          >
            −
          </button>

          <button
            type="button"
            onClick={resetZoom}
            className="min-w-14 px-2 py-2 text-xs font-semibold text-slate-600 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:text-slate-300"
          >
            {Math.round(zoom * 100)}%
          </button>

          <button
            type="button"
            onClick={zoomIn}
            aria-label="Zoom in"
            className="px-2 py-2 text-sm font-medium text-slate-700 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:text-slate-200"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={deleteSelectedNode}
          disabled={!hasSelection}
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
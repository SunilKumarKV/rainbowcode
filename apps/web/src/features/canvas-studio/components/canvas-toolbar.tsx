"use client";

import { RbcButton } from "@/components/ui/rbc-button";
import { useCanvasStore } from "@/features/canvas-studio/store/canvas-store";
import type { CanvasTemplateId } from "@/features/canvas-studio/templates/canvas-templates";

export function CanvasToolbar() {
  const addRectangle = useCanvasStore((state) => state.addRectangle);
  const addText = useCanvasStore((state) => state.addText);
  const duplicateSelectedNodes = useCanvasStore(
    (state) => state.duplicateSelectedNodes,
  );
  const copySelectedNodes = useCanvasStore((state) => state.copySelectedNodes);
  const pasteCopiedNodes = useCanvasStore((state) => state.pasteCopiedNodes);
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
  const clipboardNodeIds = useCanvasStore((state) => state.clipboardNodeIds);
  const snapToGridEnabled = useCanvasStore((state) => state.snapToGridEnabled);
  const toggleSnapToGrid = useCanvasStore((state) => state.toggleSnapToGrid);
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
    <div className="overflow-hidden rounded-[28px] border border-white/70 bg-white/76 shadow-[0_18px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/74">
      <div className="flex flex-col gap-4 border-b border-slate-200/70 px-4 py-4 dark:border-slate-800 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">
            Canvas Tools
          </p>
          <h2 className="mt-1 text-lg font-black tracking-tight text-slate-950 dark:text-white">
            Visual Editor Actions
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Create, organize, align, duplicate, and export your layout.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="canvas-template-select" className="sr-only">
            Apply canvas template
          </label>
          <select
            id="canvas-template-select"
            defaultValue=""
            onChange={handleTemplateChange}
            className="h-10 rounded-2xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            <option value="" disabled>
              Apply template
            </option>
            <option value="hero">Hero Section</option>
            <option value="pricing-card">Pricing Card</option>
          </select>

          <RbcButton variant="secondary" onClick={undo} disabled={!canUndo}>
            Undo
          </RbcButton>

          <RbcButton variant="secondary" onClick={redo} disabled={!canRedo}>
            Redo
          </RbcButton>

          <RbcButton
            variant={snapToGridEnabled ? "primary" : "secondary"}
            onClick={toggleSnapToGrid}
            aria-pressed={snapToGridEnabled}
          >
            Snap {snapToGridEnabled ? "On" : "Off"}
          </RbcButton>
        </div>
      </div>

      <div className="grid gap-3 p-4 xl:grid-cols-4">
        <section
          aria-label="Create canvas objects"
          className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-900/60"
        >
          <p className="px-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Create
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <RbcButton variant="primary" onClick={addRectangle}>
              Rectangle
            </RbcButton>
            <RbcButton variant="secondary" onClick={addText}>
              Text
            </RbcButton>
          </div>
        </section>

        <section
          aria-label="Canvas clipboard actions"
          className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-900/60"
        >
          <p className="px-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Clipboard
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <RbcButton
              variant="secondary"
              onClick={copySelectedNodes}
              disabled={!hasSelection}
            >
              Copy
            </RbcButton>
            <RbcButton
              variant="secondary"
              onClick={pasteCopiedNodes}
              disabled={clipboardNodeIds.length === 0}
            >
              Paste
            </RbcButton>
            <RbcButton
              variant="secondary"
              onClick={duplicateSelectedNodes}
              disabled={!hasSelection}
            >
              Duplicate
            </RbcButton>
          </div>
        </section>

        <section
          aria-label="Canvas structure actions"
          className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-900/60"
        >
          <p className="px-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Structure
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <RbcButton
              variant="secondary"
              onClick={groupSelectedNodes}
              disabled={!canGroup}
            >
              Group
            </RbcButton>
            <RbcButton
              variant="secondary"
              onClick={ungroupSelectedNodes}
              disabled={!canUngroup}
            >
              Ungroup
            </RbcButton>
            <RbcButton
              variant="secondary"
              onClick={bringSelectedForward}
              disabled={!hasSelection}
            >
              Forward
            </RbcButton>
            <RbcButton
              variant="secondary"
              onClick={sendSelectedBackward}
              disabled={!hasSelection}
            >
              Backward
            </RbcButton>
          </div>
        </section>

        <section
          aria-label="Canvas view and destructive actions"
          className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-900/60"
        >
          <p className="px-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            View
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <RbcButton variant="secondary" onClick={zoomOut} aria-label="Zoom out">
              −
            </RbcButton>

            <button
              type="button"
              onClick={resetZoom}
              aria-label="Reset zoom"
              className="h-10 min-w-16 rounded-xl border border-slate-200 bg-white px-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
            >
              {Math.round(zoom * 100)}%
            </button>

            <RbcButton variant="secondary" onClick={zoomIn} aria-label="Zoom in">
              +
            </RbcButton>

            <RbcButton
              variant="danger"
              onClick={deleteSelectedNode}
              disabled={!hasSelection}
            >
              Delete
            </RbcButton>

            <RbcButton variant="ghost" onClick={resetCanvas}>
              Reset
            </RbcButton>
          </div>
        </section>
      </div>
    </div>
  );
}
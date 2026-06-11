"use client";

import { useCanvasStore } from "@/features/canvas-studio/store/canvas-store";
import type { CanvasTemplateId } from "@/features/canvas-studio/templates/canvas-templates";

type ToolButtonProps = {
  readonly label: string;
  readonly active?: boolean;
  readonly disabled?: boolean;
  readonly danger?: boolean;
  readonly onClick: () => void;
};

function ToolButton({
  label,
  active = false,
  disabled = false,
  danger = false,
  onClick,
}: ToolButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`h-9 rounded-xl px-3 text-xs font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? "bg-slate-950 text-white shadow-sm dark:bg-white dark:text-slate-950"
          : danger
            ? "text-red-600 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/50"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

function Divider() {
  return <span className="h-6 w-px bg-slate-200 dark:bg-slate-800" />;
}

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
    <div className="sticky top-3 z-40 mx-auto flex max-w-max flex-wrap items-center gap-1 rounded-2xl border border-slate-200 bg-white/92 p-1.5 shadow-2xl backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/92">
      <label htmlFor="canvas-template-select" className="sr-only">
        Apply canvas template
      </label>

      <select
        id="canvas-template-select"
        defaultValue=""
        onChange={handleTemplateChange}
        className="h-9 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-black text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
      >
        <option value="" disabled>
          Templates
        </option>
        <option value="hero">Hero Section</option>
        <option value="pricing-card">Pricing Card</option>
      </select>

      <Divider />

      <ToolButton label="Rect" onClick={addRectangle} active />
      <ToolButton label="Text" onClick={addText} />

      <Divider />

      <ToolButton label="Undo" onClick={undo} disabled={!canUndo} />
      <ToolButton label="Redo" onClick={redo} disabled={!canRedo} />

      <Divider />

      <ToolButton
        label="Copy"
        onClick={copySelectedNodes}
        disabled={!hasSelection}
      />
      <ToolButton
        label="Paste"
        onClick={pasteCopiedNodes}
        disabled={clipboardNodeIds.length === 0}
      />
      <ToolButton
        label="Duplicate"
        onClick={duplicateSelectedNodes}
        disabled={!hasSelection}
      />

      <Divider />

      <ToolButton label="Group" onClick={groupSelectedNodes} disabled={!canGroup} />
      <ToolButton
        label="Ungroup"
        onClick={ungroupSelectedNodes}
        disabled={!canUngroup}
      />
      <ToolButton
        label="Forward"
        onClick={bringSelectedForward}
        disabled={!hasSelection}
      />
      <ToolButton
        label="Backward"
        onClick={sendSelectedBackward}
        disabled={!hasSelection}
      />

      <Divider />

      <ToolButton
        label={snapToGridEnabled ? "Snap On" : "Snap Off"}
        onClick={toggleSnapToGrid}
        active={snapToGridEnabled}
      />

      <ToolButton label="−" onClick={zoomOut} />
      <button
        type="button"
        onClick={resetZoom}
        aria-label="Reset zoom"
        className="h-9 min-w-14 rounded-xl px-3 text-xs font-black text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
      >
        {Math.round(zoom * 100)}%
      </button>
      <ToolButton label="+" onClick={zoomIn} />

      <Divider />

      <ToolButton
        label="Delete"
        onClick={deleteSelectedNode}
        disabled={!hasSelection}
        danger
      />
      <ToolButton label="Reset" onClick={resetCanvas} danger />
    </div>
  );
}
"use client";

import { useCanvasStore } from "@/features/canvas-studio/store/canvas-store";
import { getCanvasNodeLabel } from "@/features/canvas-studio/utils/canvas-node-label";

export function CanvasLayersPanel() {
  const nodes = useCanvasStore((state) => state.nodes);
  const selectedNodeId = useCanvasStore((state) => state.selectedNodeId);
  const selectNode = useCanvasStore((state) => state.selectNode);
  const deleteSelectedNode = useCanvasStore((state) => state.deleteSelectedNode);

  return (
    <aside
      aria-label="Canvas layers"
      className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Layers
          </p>
          <h3 className="mt-1 text-sm font-semibold text-slate-950 dark:text-white">
            Canvas Nodes
          </h3>
        </div>

        <button
          type="button"
          onClick={deleteSelectedNode}
          disabled={selectedNodeId === null}
          className="rounded-lg px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:text-slate-300 dark:hover:bg-slate-900"
        >
          Delete
        </button>
      </div>

      {nodes.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-500 dark:border-slate-800">
          No layers yet. Add a rectangle or text node.
        </div>
      ) : (
        <div className="mt-4 space-y-2">
          {nodes.map((node, index) => {
            const isSelected = selectedNodeId === node.id;

            return (
              <button
                key={node.id}
                type="button"
                onClick={() => selectNode(node.id)}
                className={`w-full rounded-xl border p-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
                  isSelected
                    ? "border-slate-900 bg-slate-100 dark:border-white dark:bg-slate-900"
                    : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                }`}
              >
                <span className="block text-sm font-semibold text-slate-900 dark:text-white">
                  {getCanvasNodeLabel(node, index)}
                </span>
                <span className="mt-1 block text-xs text-slate-500">
                  {node.type} · {Math.round(node.width)}×{Math.round(node.height)}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </aside>
  );
}
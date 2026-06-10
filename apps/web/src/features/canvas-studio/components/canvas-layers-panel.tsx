"use client";

import { RbcBadge } from "@/components/ui/rbc-badge";
import { RbcButton } from "@/components/ui/rbc-button";
import { useCanvasStore } from "@/features/canvas-studio/store/canvas-store";
import { getCanvasNodeLabel } from "@/features/canvas-studio/utils/canvas-node-label";

function LayersEmptyState() {
  const addRectangle = useCanvasStore((state) => state.addRectangle);
  const addText = useCanvasStore((state) => state.addText);
  const applyTemplate = useCanvasStore((state) => state.applyTemplate);

  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center dark:border-slate-800 dark:bg-slate-900/60">
      <div className="mx-auto grid size-10 place-items-center rounded-2xl bg-white text-lg shadow-sm dark:bg-slate-950">
        ◇
      </div>

      <h3 className="mt-3 text-sm font-black text-slate-950 dark:text-white">
        No layers yet
      </h3>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        Add a node or apply a template to start building your visual hierarchy.
      </p>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <RbcButton variant="primary" onClick={() => applyTemplate("hero")}>
          Template
        </RbcButton>
        <RbcButton variant="secondary" onClick={addRectangle}>
          Rectangle
        </RbcButton>
        <RbcButton variant="ghost" onClick={addText}>
          Text
        </RbcButton>
      </div>
    </div>
  );
}

export function CanvasLayersPanel() {
  const nodes = useCanvasStore((state) => state.nodes);
  const selectedNodeIds = useCanvasStore((state) => state.selectedNodeIds);
  const selectNode = useCanvasStore((state) => state.selectNode);

  return (
    <section
      aria-label="Canvas layers"
      className="overflow-hidden rounded-[28px] border border-white/70 bg-white/78 shadow-[0_18px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/76"
    >
      <div className="flex items-center justify-between gap-3 border-b border-slate-200/70 px-4 py-4 dark:border-slate-800">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">
            Layers
          </p>
          <h2 className="mt-1 text-sm font-black text-slate-950 dark:text-white">
            Canvas hierarchy
          </h2>
        </div>

        <RbcBadge variant={nodes.length > 0 ? "success" : "neutral"}>
          {nodes.length}
        </RbcBadge>
      </div>

      <div className="p-4">
        {nodes.length === 0 ? (
          <LayersEmptyState />
        ) : (
          <div className="space-y-2">
            {[...nodes].reverse().map((node, reversedIndex) => {
              const index = nodes.length - reversedIndex - 1;
              const isSelected = selectedNodeIds.includes(node.id);

              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => selectNode(node.id)}
                  className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    isSelected
                      ? "border-indigo-300 bg-indigo-50 shadow-sm dark:border-indigo-800 dark:bg-indigo-950/50"
                      : "border-slate-200 bg-slate-50 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-900/70"
                  }`}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold text-slate-950 dark:text-white">
                      {getCanvasNodeLabel(node, index)}
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-500">
                      {node.type} · {Math.round(node.width)}×
                      {Math.round(node.height)}
                    </span>
                  </span>

                  <RbcBadge variant={isSelected ? "info" : "neutral"}>
                    {isSelected ? "Selected" : `#${index + 1}`}
                  </RbcBadge>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
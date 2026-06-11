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
        Add objects or apply a template to create your layer hierarchy.
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
  const duplicateSelectedNodes = useCanvasStore(
    (state) => state.duplicateSelectedNodes,
  );
  const deleteSelectedNode = useCanvasStore((state) => state.deleteSelectedNode);
  const bringSelectedForward = useCanvasStore(
    (state) => state.bringSelectedForward,
  );
  const sendSelectedBackward = useCanvasStore(
    (state) => state.sendSelectedBackward,
  );

  const hasSelection = selectedNodeIds.length > 0;

  return (
    <section
      aria-label="Canvas layers"
      className="overflow-hidden rounded-[28px] border border-white/70 bg-white/78 shadow-[0_18px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/76"
    >
      <div className="border-b border-slate-200/70 px-4 py-4 dark:border-slate-800">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">
              Layers
            </p>
            <h2 className="mt-1 text-sm font-black text-slate-950 dark:text-white">
              Object hierarchy
            </h2>
          </div>

          <RbcBadge variant={nodes.length > 0 ? "success" : "neutral"}>
            {nodes.length}
          </RbcBadge>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={bringSelectedForward}
            disabled={!hasSelection}
            className="h-9 rounded-xl border border-slate-200 bg-slate-50 text-xs font-black text-slate-600 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            Bring Forward
          </button>

          <button
            type="button"
            onClick={sendSelectedBackward}
            disabled={!hasSelection}
            className="h-9 rounded-xl border border-slate-200 bg-slate-50 text-xs font-black text-slate-600 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            Send Back
          </button>
        </div>
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
                  className={`group flex w-full items-center justify-between gap-3 rounded-2xl border px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    isSelected
                      ? "border-indigo-300 bg-indigo-50 shadow-sm dark:border-indigo-800 dark:bg-indigo-950/50"
                      : "border-slate-200 bg-slate-50 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-900/70"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={`grid size-8 shrink-0 place-items-center rounded-xl text-[10px] font-black ${
                        node.type === "text"
                          ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                          : node.type === "group"
                            ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                            : "bg-white text-slate-700 shadow-sm dark:bg-slate-950 dark:text-slate-300"
                      }`}
                    >
                      {node.type === "text"
                        ? "T"
                        : node.type === "group"
                          ? "G"
                          : "R"}
                    </span>

                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold text-slate-950 dark:text-white">
                        {getCanvasNodeLabel(node, index)}
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        {node.type} · {Math.round(node.x)}, {Math.round(node.y)}
                      </span>
                    </span>
                  </span>

                  <span className="flex shrink-0 items-center gap-2">
                    {isSelected ? (
                      <>
                        <span
                          role="status"
                          className="hidden rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-black text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 sm:inline"
                        >
                          Selected
                        </span>

                        <span
                          onClick={(event) => {
                            event.stopPropagation();
                            duplicateSelectedNodes();
                          }}
                          className="rounded-lg px-2 py-1 text-[10px] font-black text-slate-500 hover:bg-white dark:hover:bg-slate-800"
                          role="button"
                          tabIndex={0}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              event.stopPropagation();
                              duplicateSelectedNodes();
                            }
                          }}
                        >
                          Dup
                        </span>

                        <span
                          onClick={(event) => {
                            event.stopPropagation();
                            deleteSelectedNode();
                          }}
                          className="rounded-lg px-2 py-1 text-[10px] font-black text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50"
                          role="button"
                          tabIndex={0}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              event.stopPropagation();
                              deleteSelectedNode();
                            }
                          }}
                        >
                          Del
                        </span>
                      </>
                    ) : (
                      <RbcBadge variant="neutral">#{index + 1}</RbcBadge>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
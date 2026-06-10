"use client";

import { useCanvasStore } from "@/features/canvas-studio/store/canvas-store";
import { getCanvasReadinessItems } from "@/features/canvas-studio/utils/canvas-readiness";

export function CanvasStatusPanel() {
  const nodes = useCanvasStore((state) => state.nodes);
  const selectedNodeIds = useCanvasStore((state) => state.selectedNodeIds);
  const zoom = useCanvasStore((state) => state.zoom);
  const snapToGridEnabled = useCanvasStore((state) => state.snapToGridEnabled);
  const canUndo = useCanvasStore((state) => state.canUndo);
  const canRedo = useCanvasStore((state) => state.canRedo);

  const items = getCanvasReadinessItems({
    nodesCount: nodes.length,
    selectedCount: selectedNodeIds.length,
    zoomPercent: Math.round(zoom * 100),
    snapToGridEnabled,
    canUndo,
    canRedo,
  });

  return (
    <section
      aria-label="Canvas status"
      className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Canvas V1 Status
          </p>
          <h3 className="mt-1 text-sm font-semibold text-slate-950 dark:text-white">
            Editor readiness
          </h3>
        </div>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          V1 QA Mode
        </span>
      </div>

      <dl className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900"
          >
            <dt className="text-xs text-slate-500">{item.label}</dt>
            <dd className="mt-1 text-sm font-semibold text-slate-950 dark:text-white">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        Manual QA before Brand Studio: verify desktop, tablet, mobile, keyboard
        navigation, dark mode, export/import, undo/redo, snap grid, grouping,
        and generated code.
      </p>
    </section>
  );
}
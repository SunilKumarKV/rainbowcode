"use client";

import { RbcBadge } from "@/components/ui/rbc-badge";
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
      className="overflow-hidden rounded-[28px] border border-white/70 bg-white/74 shadow-[0_18px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/74"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/70 px-4 py-4 dark:border-slate-800">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">
            Editor Health
          </p>
          <h3 className="mt-1 text-lg font-black tracking-tight text-slate-950 dark:text-white">
            Canvas Readiness
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Live state for selection, snap grid, history, and export readiness.
          </p>
        </div>

        <RbcBadge variant="success">Production Flow</RbcBadge>
      </div>

      <dl className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/60"
          >
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              {item.label}
            </dt>
            <dd className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
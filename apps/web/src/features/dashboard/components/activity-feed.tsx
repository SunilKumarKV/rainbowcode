"use client";

import { useCanvasStore } from "@/features/canvas-studio/store/canvas-store";

export function ActivityFeed() {
  const nodeCount = useCanvasStore((state) => state.nodes.length);
  const exportItems = [
    "Brand kit JSON",
    "Theme CSS variables",
    "Theme JSON tokens",
    "Theme Tailwind theme",
    "Component TSX bundle",
    nodeCount > 0 ? "Canvas TSX and JSON" : "Canvas TSX and JSON after first node",
  ] as const;

  return (
    <section
      aria-labelledby="export-readiness-title"
      className="rounded-[28px] border border-white/70 bg-white/82 p-5 shadow-[0_18px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/76"
    >
      <p className="text-xs font-black uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">
        Exports
      </p>

      <h2
        id="export-readiness-title"
        className="mt-1 text-xl font-black tracking-tight text-slate-950 dark:text-white"
      >
        Export readiness
      </h2>

      <div className="mt-5 space-y-3">
        {exportItems.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/70"
          >
            <span className="size-2 rounded-full bg-indigo-500" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

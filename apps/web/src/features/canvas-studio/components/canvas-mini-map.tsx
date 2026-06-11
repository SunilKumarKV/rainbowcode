"use client";

import type { CanvasNode } from "@/features/canvas-studio/types/canvas-node";

type CanvasMiniMapProps = {
  readonly nodes: readonly CanvasNode[];
  readonly canvasWidth: number;
  readonly canvasHeight: number;
};

export function CanvasMiniMap({
  nodes,
  canvasWidth,
  canvasHeight,
}: CanvasMiniMapProps) {
  const scale = 0.14;

  return (
    <aside
      aria-label="Canvas mini map"
      className="absolute bottom-5 right-5 z-30 hidden rounded-2xl border border-white/15 bg-slate-950/82 p-3 shadow-2xl backdrop-blur-2xl lg:block"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Mini Map
        </p>

        <span className="text-[10px] font-bold text-slate-500">
          {nodes.length} nodes
        </span>
      </div>

      <div
        className="relative mt-3 overflow-hidden rounded-xl border border-white/10 bg-white"
        style={{
          width: canvasWidth * scale,
          height: canvasHeight * scale,
        }}
      >
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`absolute rounded-sm ${
              node.type === "text"
                ? "bg-slate-950"
                : node.type === "group"
                  ? "border border-indigo-500 bg-indigo-500/10"
                  : "bg-indigo-500"
            }`}
            style={{
              left: node.x * scale,
              top: node.y * scale,
              width: Math.max(2, node.width * scale),
              height: Math.max(2, node.height * scale),
            }}
          />
        ))}
      </div>
    </aside>
  );
}
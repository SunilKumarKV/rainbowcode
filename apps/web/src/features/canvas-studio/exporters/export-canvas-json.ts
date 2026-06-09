import type { CanvasNode } from "@/features/canvas-studio/types/canvas-node";

export type CanvasJsonExport = {
  readonly version: 1;
  readonly exportedAt: string;
  readonly nodes: readonly CanvasNode[];
};

export function exportCanvasJson(nodes: readonly CanvasNode[]): string {
  const payload: CanvasJsonExport = {
    version: 1,
    exportedAt: new Date().toISOString(),
    nodes,
  };

  return `${JSON.stringify(payload, null, 2)}\n`;
}
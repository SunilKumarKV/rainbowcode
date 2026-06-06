import type { CanvasNode } from "@/features/canvas-studio/types/canvas-node";

export function clampCanvasNodeSize(value: number): number {
  return Math.max(24, Math.round(value));
}

export function resizeCanvasNode(
  node: CanvasNode,
  size: { readonly width: number; readonly height: number },
): CanvasNode {
  return {
    ...node,
    width: clampCanvasNodeSize(size.width),
    height: clampCanvasNodeSize(size.height),
  };
}
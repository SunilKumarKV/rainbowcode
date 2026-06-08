import type { CanvasNode } from "@/features/canvas-studio/types/canvas-node";

export function getCanvasNodeLabel(node: CanvasNode, index: number): string {
  const layerNumber = index + 1;

  if (node.type === "rectangle") {
    return `Rectangle ${layerNumber}`;
  }

  if (node.type === "group") {
    return `Group ${layerNumber}`;
  }

  return node.text.trim().length > 0 ? node.text : `Text ${layerNumber}`;
}
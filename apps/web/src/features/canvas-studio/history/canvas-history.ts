import type { CanvasNode } from "@/features/canvas-studio/types/canvas-node";

export type CanvasHistorySnapshot = {
  readonly nodes: readonly CanvasNode[];
  readonly selectedNodeIds: readonly string[];
};

export type CanvasHistoryState = {
  readonly past: readonly CanvasHistorySnapshot[];
  readonly future: readonly CanvasHistorySnapshot[];
};

export function createCanvasSnapshot(
  nodes: readonly CanvasNode[],
  selectedNodeIds: readonly string[],
): CanvasHistorySnapshot {
  return {
    nodes: nodes.map((node) => ({ ...node })),
    selectedNodeIds: [...selectedNodeIds],
  };
}

export function pushCanvasHistory(
  history: CanvasHistoryState,
  snapshot: CanvasHistorySnapshot,
): CanvasHistoryState {
  return {
    past: [...history.past, snapshot],
    future: [],
  };
}
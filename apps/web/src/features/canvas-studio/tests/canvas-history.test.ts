import { describe, expect, it } from "vitest";
import {
  createCanvasSnapshot,
  pushCanvasHistory,
} from "@/features/canvas-studio/history/canvas-history";
import type { CanvasNode } from "@/features/canvas-studio/types/canvas-node";

const nodes: readonly CanvasNode[] = [
  {
    id: "rectangle-1",
    type: "rectangle",
    x: 10,
    y: 20,
    width: 100,
    height: 80,
    fill: "var(--color-primary)",
    radius: 12,
  },
];

describe("canvas history", () => {
  it("creates a canvas snapshot", () => {
    const snapshot = createCanvasSnapshot(nodes, ["rectangle-1"]);

    expect(snapshot.nodes).toEqual(nodes);
    expect(snapshot.selectedNodeIds).toEqual(["rectangle-1"]);
  });

  it("pushes history and clears future", () => {
    const snapshot = createCanvasSnapshot(nodes, []);

    const history = pushCanvasHistory(
      {
        past: [],
        future: [snapshot],
      },
      snapshot,
    );

    expect(history.past).toHaveLength(1);
    expect(history.future).toHaveLength(0);
  });
});
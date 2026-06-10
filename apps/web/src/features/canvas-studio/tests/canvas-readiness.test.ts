import { describe, expect, it } from "vitest";
import { getCanvasReadinessItems } from "@/features/canvas-studio/utils/canvas-readiness";

describe("getCanvasReadinessItems", () => {
  it("returns canvas readiness labels", () => {
    const items = getCanvasReadinessItems({
      nodesCount: 3,
      selectedCount: 1,
      zoomPercent: 100,
      snapToGridEnabled: true,
      canUndo: true,
      canRedo: false,
    });

    expect(items).toEqual([
      { label: "Nodes", value: "3" },
      { label: "Selected", value: "1" },
      { label: "Zoom", value: "100%" },
      { label: "Snap", value: "On" },
      { label: "Undo", value: "Ready" },
      { label: "Redo", value: "Empty" },
    ]);
  });
});
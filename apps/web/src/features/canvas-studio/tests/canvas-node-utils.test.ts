import { describe, expect, it } from "vitest";
import { resizeCanvasNode } from "@/features/canvas-studio/utils/canvas-node-utils";
import type { CanvasNode } from "@/features/canvas-studio/types/canvas-node";

const rectangleNode: CanvasNode = {
  id: "rectangle-test",
  type: "rectangle",
  x: 0,
  y: 0,
  width: 100,
  height: 80,
  fill: "var(--color-primary)",
  radius: 16,
};

describe("resizeCanvasNode", () => {
  it("updates node width and height", () => {
    const resized = resizeCanvasNode(rectangleNode, {
      width: 240,
      height: 160,
    });

    expect(resized.width).toBe(240);
    expect(resized.height).toBe(160);
  });

  it("clamps minimum size", () => {
    const resized = resizeCanvasNode(rectangleNode, {
      width: 8,
      height: 12,
    });

    expect(resized.width).toBe(24);
    expect(resized.height).toBe(24);
  });
});
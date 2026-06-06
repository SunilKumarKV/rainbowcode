import { describe, expect, it } from "vitest";
import { getCanvasNodeLabel } from "@/features/canvas-studio/utils/canvas-node-label";
import type { CanvasNode } from "@/features/canvas-studio/types/canvas-node";

describe("getCanvasNodeLabel", () => {
  it("returns rectangle layer label", () => {
    const node: CanvasNode = {
      id: "rectangle-1",
      type: "rectangle",
      x: 0,
      y: 0,
      width: 100,
      height: 80,
      fill: "var(--color-primary)",
      radius: 16,
    };

    expect(getCanvasNodeLabel(node, 0)).toBe("Rectangle 1");
  });

  it("returns text content as layer label", () => {
    const node: CanvasNode = {
      id: "text-1",
      type: "text",
      x: 0,
      y: 0,
      width: 200,
      height: 48,
      text: "Hero Title",
      fontSize: 24,
      fill: "var(--color-foreground)",
    };

    expect(getCanvasNodeLabel(node, 1)).toBe("Hero Title");
  });

  it("returns fallback text label when text is empty", () => {
    const node: CanvasNode = {
      id: "text-2",
      type: "text",
      x: 0,
      y: 0,
      width: 200,
      height: 48,
      text: "   ",
      fontSize: 24,
      fill: "var(--color-foreground)",
    };

    expect(getCanvasNodeLabel(node, 2)).toBe("Text 3");
  });
});
import { describe, expect, it } from "vitest";
import { exportCanvasJson } from "@/features/canvas-studio/exporters/export-canvas-json";
import type { CanvasNode } from "@/features/canvas-studio/types/canvas-node";

const nodes: readonly CanvasNode[] = [
  {
    id: "rectangle-1",
    type: "rectangle",
    x: 10,
    y: 20,
    width: 180,
    height: 100,
    fill: "var(--color-primary)",
    radius: 16,
  },
  {
    id: "text-1",
    type: "text",
    x: 40,
    y: 60,
    width: 220,
    height: 48,
    text: "Hello RainbowCode",
    fontSize: 24,
    fill: "var(--color-foreground)",
  },
  {
    id: "group-1",
    type: "group",
    x: 10,
    y: 20,
    width: 250,
    height: 120,
    childNodeIds: ["rectangle-1", "text-1"],
  },
];

describe("exportCanvasJson", () => {
  it("exports canvas JSON with version and nodes", () => {
    const output = exportCanvasJson(nodes);
    const parsed = JSON.parse(output) as {
      readonly version: number;
      readonly exportedAt: string;
      readonly nodes: readonly CanvasNode[];
    };

    expect(parsed.version).toBe(1);
    expect(parsed.exportedAt).toEqual(expect.any(String));
    expect(parsed.nodes).toEqual(nodes);
  });

  it("adds trailing newline", () => {
    const output = exportCanvasJson(nodes);

    expect(output.endsWith("\n")).toBe(true);
  });
});